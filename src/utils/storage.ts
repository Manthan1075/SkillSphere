/**
 * LocalStorage utility module for SkillSphere
 */

export const STORAGE_KEYS = {
  USERS: 'skillsphere_users',
  CURRENT_USER: 'skillsphere_current_user',
  ENROLLMENTS: 'skillsphere_enrollments',
  PROGRESS: 'skillsphere_progress',
  WISHLIST: 'skillsphere_wishlist',
  ACTIVITIES: 'skillsphere_activities',
  THEME: 'skillsphere_theme',
  RECENT_COURSES: 'skillsphere_recent_courses',
} as const;

export function getFromStorage<T>(key: string, defaultValue: T): T {
  try {
    const item = localStorage.getItem(key);
    if (!item) return defaultValue;
    return JSON.parse(item) as T;
  } catch (error) {
    console.error(`Error reading ${key} from localStorage:`, error);
    return defaultValue;
  }
}

export function saveToStorage<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error saving ${key} to localStorage:`, error);
  }
}

export function removeFromStorage(key: string): void {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(`Error removing ${key} from localStorage:`, error);
  }
}

export function updateStorage<T>(key: string, updater: (prev: T) => T, defaultValue: T): T {
  const current = getFromStorage<T>(key, defaultValue);
  const updated = updater(current);
  saveToStorage(key, updated);
  return updated;
}
