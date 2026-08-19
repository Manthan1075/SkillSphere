import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { User } from '../types';
import { getFromStorage, saveToStorage, removeFromStorage, STORAGE_KEYS } from '../utils/storage';
import { useToast } from './ToastContext';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string, rememberMe?: boolean) => Promise<{ success: boolean; message?: string }>;
  signup: (name: string, email: string, password: string) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
  updateProfile: (data: Partial<Pick<User, 'name' | 'email' | 'avatar' | 'headline' | 'bio'>>) => Promise<{ success: boolean; message?: string }>;
  seedDemoAccount: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Initial demo user for instant testing & evaluation
export const DEMO_USER: User = {
  id: 'user_demo_101',
  name: 'Alex Morgan',
  email: 'alex.morgan@skillsphere.com',
  password: 'password123',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
  headline: 'Full-Stack Enthusiast & Digital Marketer',
  bio: 'Learning new tech stacks to build future-ready web products and marketing engines.',
  createdAt: '2026-01-15T10:00:00.000Z',
  enrolledCourses: ['mern-stack-development', 'ui-ux-design-figma'],
  wishlist: ['digital-marketing-masterclass', 'ai-prompt-engineering-genai'],
  progress: {
    'mern-stack-development': {
      courseId: 'mern-stack-development',
      completedLessonIds: ['les-1-1', 'les-1-2', 'les-1-3'],
      lastAccessedLessonId: 'les-1-4',
      lastAccessedAt: '2026-08-18T14:30:00.000Z',
      completedPercentage: 25,
      isCompleted: false
    },
    'ui-ux-design-figma': {
      courseId: 'ui-ux-design-figma',
      completedLessonIds: ['ux-1-1', 'ux-1-2', 'ux-1-3', 'ux-2-1', 'ux-2-2', 'ux-2-3'],
      lastAccessedLessonId: 'ux-2-3',
      lastAccessedAt: '2026-08-17T11:00:00.000Z',
      completedPercentage: 100,
      isCompleted: true,
      completedAt: '2026-08-17T11:45:00.000Z'
    }
  }
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { showSuccess, showError, showInfo } = useToast();

  // Initialize and seed if no users exist
  useEffect(() => {
    try {
      const storedUsers = getFromStorage<User[]>(STORAGE_KEYS.USERS, []);
      if (storedUsers.length === 0) {
        saveToStorage(STORAGE_KEYS.USERS, [DEMO_USER]);
      }

      const storedCurrentUser = getFromStorage<User | null>(STORAGE_KEYS.CURRENT_USER, null);
      if (storedCurrentUser) {
        setUser(storedCurrentUser);
      }
    } catch (e) {
      console.error('Failed to initialize auth state', e);
    } finally {
      setIsLoading(false);
    }

    // Listen to cross-tab storage changes
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === STORAGE_KEYS.CURRENT_USER) {
        const updated = e.newValue ? JSON.parse(e.newValue) : null;
        setUser(updated);
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const signup = async (name: string, email: string, password: string) => {
    try {
      const trimmedEmail = email.trim().toLowerCase();
      const trimmedName = name.trim();

      // Validation
      if (!trimmedName || !trimmedEmail || !password) {
        showError('Registration Error', 'All fields are required.');
        return { success: false, message: 'All fields are required.' };
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(trimmedEmail)) {
        showError('Invalid Email', 'Please provide a valid email address.');
        return { success: false, message: 'Invalid email address.' };
      }

      if (password.length < 6) {
        showError('Weak Password', 'Password must be at least 6 characters.');
        return { success: false, message: 'Password must be at least 6 characters.' };
      }

      const allUsers = getFromStorage<User[]>(STORAGE_KEYS.USERS, [DEMO_USER]);
      const existingUser = allUsers.find((u) => u.email.toLowerCase() === trimmedEmail);

      if (existingUser) {
        showError('Account Exists', 'An account with this email already exists.');
        return { success: false, message: 'Email already exists.' };
      }

      const newUser: User = {
        id: `user_${Date.now()}`,
        name: trimmedName,
        email: trimmedEmail,
        password,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(trimmedName)}`,
        headline: 'Lifelong Learner at SkillSphere',
        bio: 'Passionate about acquiring practical career-ready skills.',
        createdAt: new Date().toISOString(),
        enrolledCourses: [],
        wishlist: [],
        progress: {}
      };

      const updatedUsers = [...allUsers, newUser];
      saveToStorage(STORAGE_KEYS.USERS, updatedUsers);
      saveToStorage(STORAGE_KEYS.CURRENT_USER, newUser);
      setUser(newUser);

      showSuccess('Account Created 🎉', `Welcome to SkillSphere, ${newUser.name}!`);
      return { success: true };
    } catch (err) {
      console.error('Signup error', err);
      showError('Signup Failed', 'An unexpected error occurred. Please try again.');
      return { success: false, message: 'Failed to sign up.' };
    }
  };

  const login = async (email: string, password: string, _rememberMe = true) => {
    try {
      const trimmedEmail = email.trim().toLowerCase();

      if (!trimmedEmail || !password) {
        showError('Missing Fields', 'Please enter both your email and password.');
        return { success: false, message: 'Email and password required.' };
      }

      const allUsers = getFromStorage<User[]>(STORAGE_KEYS.USERS, [DEMO_USER]);
      const foundUser = allUsers.find((u) => u.email.toLowerCase() === trimmedEmail);

      if (!foundUser || foundUser.password !== password) {
        showError('Invalid Credentials', 'The email or password you entered is incorrect.');
        return { success: false, message: 'Invalid email or password.' };
      }

      saveToStorage(STORAGE_KEYS.CURRENT_USER, foundUser);
      setUser(foundUser);

      showSuccess('Welcome Back!', `Glad to see you again, ${foundUser.name}!`);
      return { success: true };
    } catch (err) {
      console.error('Login error', err);
      showError('Login Error', 'Failed to log in. Please try again.');
      return { success: false, message: 'Login failed.' };
    }
  };

  const logout = useCallback(() => {
    removeFromStorage(STORAGE_KEYS.CURRENT_USER);
    setUser(null);
    showInfo('Logged Out', 'You have been successfully logged out.');
  }, [showInfo]);

  const updateProfile = async (data: Partial<Pick<User, 'name' | 'email' | 'avatar' | 'headline' | 'bio'>>) => {
    if (!user) {
      showError('Unauthorized', 'Please log in to update your profile.');
      return { success: false, message: 'Not logged in.' };
    }

    try {
      const updatedUser: User = {
        ...user,
        ...data,
      };

      // Update in users list
      const allUsers = getFromStorage<User[]>(STORAGE_KEYS.USERS, [DEMO_USER]);
      const updatedList = allUsers.map((u) => (u.id === user.id ? updatedUser : u));

      saveToStorage(STORAGE_KEYS.USERS, updatedList);
      saveToStorage(STORAGE_KEYS.CURRENT_USER, updatedUser);
      setUser(updatedUser);

      showSuccess('Profile Updated', 'Your profile details have been saved.');
      return { success: true };
    } catch (err) {
      console.error('Update profile error', err);
      showError('Update Failed', 'Could not save profile changes.');
      return { success: false, message: 'Failed to update profile.' };
    }
  };

  const seedDemoAccount = () => {
    saveToStorage(STORAGE_KEYS.CURRENT_USER, DEMO_USER);
    setUser(DEMO_USER);
    showSuccess('Demo Account Active', 'Logged in as Alex Morgan with active sample courses.');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        signup,
        logout,
        updateProfile,
        seedDemoAccount,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
