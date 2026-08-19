import { Course, CategoryInfo, Instructor } from '../types';

export const INSTRUCTORS: Record<string, Instructor> = {
  sarah_chen: {
    id: 'sarah_chen',
    name: 'Sarah Chen',
    role: 'Principal Full Stack Engineer & Tech Lead',
    bio: 'Former Staff Engineer at Google and Netflix with 12+ years building distributed React and Node.js systems. Passionate about project-based learning.',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400',
    rating: 4.9,
    studentsCount: 38400,
    coursesCount: 5,
    socials: {
      twitter: 'https://twitter.com',
      linkedin: 'https://linkedin.com',
      github: 'https://github.com'
    }
  },
  alex_rivera: {
    id: 'alex_rivera',
    name: 'Alex Rivera',
    role: 'Growth Marketing Director & SEO Strategist',
    bio: 'Spearheaded digital acquisition strategies for top Y Combinator startups, scaling organic traffic past 10M monthly visits. Google Certified Partner.',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
    rating: 4.85,
    studentsCount: 29200,
    coursesCount: 4,
    socials: {
      twitter: 'https://twitter.com',
      linkedin: 'https://linkedin.com',
      website: 'https://skillssphere.io'
    }
  },
  elena_rostova: {
    id: 'elena_rostova',
    name: 'Elena Rostova',
    role: 'Head of Product Design & Design Systems Lead',
    bio: 'Award-winning design architect who created design systems for fintech unicorns. Figma community advocate and mentor to over 15,000 designers.',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400',
    rating: 4.92,
    studentsCount: 44100,
    coursesCount: 6,
    socials: {
      twitter: 'https://twitter.com',
      linkedin: 'https://linkedin.com',
      website: 'https://dribbble.com'
    }
  },
  david_miller: {
    id: 'david_miller',
    name: 'Dr. David Miller',
    role: 'Chief AI Researcher & Python Specialist',
    bio: 'Ph.D. in Machine Learning from Stanford. Former senior research scientist at DeepMind. Focuses on pragmatic Python and deep neural networks.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
    rating: 4.94,
    studentsCount: 52000,
    coursesCount: 8,
    socials: {
      github: 'https://github.com',
      linkedin: 'https://linkedin.com'
    }
  },
  marcus_vance: {
    id: 'marcus_vance',
    name: 'Marcus Vance',
    role: 'Solutions Architect & DevOps Consultant',
    bio: 'AWS Certified Solutions Architect Professional and Kubernetes administrator. Helping enterprises migrate to cloud-native microservices.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400',
    rating: 4.88,
    studentsCount: 21500,
    coursesCount: 5,
    socials: {
      linkedin: 'https://linkedin.com',
      github: 'https://github.com'
    }
  },
  priya_patel: {
    id: 'priya_patel',
    name: 'Priya Patel',
    role: 'Lead Business Analyst & Financial Modeler',
    bio: 'Ex-McKinsey consultant specializing in executive dashboards, predictive Excel modeling, and data-driven business intelligence.',
    avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=400',
    rating: 4.91,
    studentsCount: 31800,
    coursesCount: 5,
    socials: {
      linkedin: 'https://linkedin.com'
    }
  }
};

export const CATEGORIES: CategoryInfo[] = [
  {
    id: 'web-dev',
    name: 'Web Development',
    iconName: 'Code',
    description: 'HTML, CSS, React, Next.js, Node.js, and Full-Stack Engineering',
    courseCount: 24,
    color: 'from-blue-500/10 to-indigo-500/10 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800',
    accentColor: '#3b82f6'
  },
  {
    id: 'digital-marketing',
    name: 'Digital Marketing',
    iconName: 'TrendingUp',
    description: 'SEO, Google Ads, Content Strategy, Social Media & Email Funnels',
    courseCount: 18,
    color: 'from-emerald-500/10 to-teal-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800',
    accentColor: '#10b981'
  },
  {
    id: 'ui-ux',
    name: 'UI/UX Design',
    iconName: 'Figma',
    description: 'Figma, Design Systems, User Research, Prototyping & Wireframing',
    courseCount: 16,
    color: 'from-purple-500/10 to-pink-500/10 text-purple-600 dark:text-purple-400 border-purple-200 dark:border-purple-800',
    accentColor: '#8b5cf6'
  },
  {
    id: 'data-science',
    name: 'Data Science',
    iconName: 'BarChart3',
    description: 'Python, SQL, Tableau, Pandas, Data Visualization & Statistics',
    courseCount: 20,
    color: 'from-amber-500/10 to-orange-500/10 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-800',
    accentColor: '#f59e0b'
  },
  {
    id: 'ai-ml',
    name: 'AI & Machine Learning',
    iconName: 'Brain',
    description: 'Generative AI, LLMs, Neural Networks, PyTorch & Deep Learning',
    courseCount: 15,
    color: 'from-cyan-500/10 to-blue-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-200 dark:border-cyan-800',
    accentColor: '#06b6d4'
  },
  {
    id: 'programming',
    name: 'Programming',
    iconName: 'Terminal',
    description: 'Python, JavaScript, TypeScript, Go, Rust & Computer Science Basics',
    courseCount: 22,
    color: 'from-rose-500/10 to-red-500/10 text-rose-600 dark:text-rose-400 border-rose-200 dark:border-rose-800',
    accentColor: '#f43f5e'
  },
  {
    id: 'cloud-computing',
    name: 'Cloud Computing',
    iconName: 'Cloud',
    description: 'AWS, Azure, Docker, Kubernetes, CI/CD & Cloud Architecture',
    courseCount: 14,
    color: 'from-sky-500/10 to-blue-500/10 text-sky-600 dark:text-sky-400 border-sky-200 dark:border-sky-800',
    accentColor: '#0ea5e9'
  },
  {
    id: 'business',
    name: 'Business',
    iconName: 'Briefcase',
    description: 'Financial Modeling, Agile Product Management & Startup Strategy',
    courseCount: 12,
    color: 'from-violet-500/10 to-indigo-500/10 text-violet-600 dark:text-violet-400 border-violet-200 dark:border-violet-800',
    accentColor: '#7c3aed'
  }
];

export const COURSES_DATA: Course[] = [
  {
    id: 'mern-stack-development',
    title: 'Complete MERN Stack Development: Zero to Production',
    slug: 'complete-mern-stack-development',
    headline: 'Master modern full-stack development by building 4 real-world projects with MongoDB, Express, React, and Node.js.',
    description: 'Become a job-ready full-stack developer. This comprehensive masterclass takes you from core fundamentals to building and deploying robust enterprise-grade applications. You will learn modern React 19 architecture, RESTful API design with Express, MongoDB indexing and aggregation, JWT authentication, Redux Toolkit state management, and continuous deployment to cloud environments.',
    category: 'Web Development',
    level: 'Intermediate',
    language: 'English',
    instructor: INSTRUCTORS.sarah_chen,
    rating: 4.9,
    ratingCount: 2480,
    studentsCount: 14890,
    duration: '38h 15m',
    totalLessons: 32,
    price: 3999,
    originalPrice: 9999,
    discountPercentage: 60,
    thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=800',
    previewVideo: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    featured: true,
    bestseller: true,
    trending: true,
    certificateOffered: true,
    lastUpdated: 'August 2026',
    skills: ['React', 'Node.js', 'Express.js', 'MongoDB', 'REST APIs', 'JWT Auth', 'Tailwind CSS', 'Docker'],
    learningOutcomes: [
      'Build scalable, production-grade full-stack web apps from scratch',
      'Architect clean RESTful backend APIs with Express and Node.js',
      'Model complex relationships and optimize queries in MongoDB with Mongoose',
      'Implement robust authentication, refresh tokens, and role-based authorization',
      'Deploy full-stack applications with environment variables and CI/CD pipelines',
      'Apply industry best practices for error handling, validation, and security'
    ],
    requirements: [
      'Basic knowledge of JavaScript (ES6 syntax) and HTML/CSS',
      'A computer with Node.js installed (installation guide included)',
      'Eagerness to write code and build real-world web applications'
    ],
    targetAudience: [
      'Front-end developers wanting to become full-stack engineers',
      'Students looking to build impressive portfolio projects for technical interviews',
      'Backend developers looking to master modern React and UI state handling'
    ],
    modules: [
      {
        id: 'mod-1',
        title: 'Module 1: Foundations & Architecture Setup',
        description: 'Understanding full-stack architecture, environment setup, and Monorepo setup.',
        lessons: [
          {
            id: 'les-1-1',
            title: 'Welcome to SkillSphere & Course Roadmap',
            duration: '08:30',
            durationMinutes: 8.5,
            description: 'Course orientation, downloadable starter code repository, and community discord access.',
            previewFree: true,
            resources: [{ name: 'Course Syllabus PDF', url: '#', size: '1.2 MB' }]
          },
          {
            id: 'les-1-2',
            title: 'Modern Full-Stack Architecture Explained',
            duration: '14:20',
            durationMinutes: 14.3,
            description: 'How client SPAs, REST APIs, database servers, and caching layers interact in production.',
            previewFree: true
          },
          {
            id: 'les-1-3',
            title: 'Configuring Node.js, Express & ES Modules',
            duration: '18:45',
            durationMinutes: 18.7,
            description: 'Setting up the server environment with TypeScript, nodemon, and structured routing.'
          },
          {
            id: 'les-1-4',
            title: 'MongoDB Atlas Cluster Setup & Mongoose Schemas',
            duration: '22:10',
            durationMinutes: 22.1,
            description: 'Connecting to cloud database, creating schemas, indexes, and validation rules.'
          }
        ]
      },
      {
        id: 'mod-2',
        title: 'Module 2: Building the RESTful API & Authentication',
        description: 'Building secure backend endpoints, middleware, JWT verification and password hashing.',
        lessons: [
          {
            id: 'les-2-1',
            title: 'REST API Design Principles & HTTP Status Codes',
            duration: '16:15',
            durationMinutes: 16.2,
            description: 'Clean endpoint structure, idempotency, JSON formatting, and status code consistency.'
          },
          {
            id: 'les-2-2',
            title: 'User Registration, Bcrypt Hashing & Validation',
            duration: '24:40',
            durationMinutes: 24.6,
            description: 'Sanitizing inputs with Zod/Joi and securely hashing passwords.'
          },
          {
            id: 'les-2-3',
            title: 'JWT Tokens, Refresh Cookies & Protected Middleware',
            duration: '26:50',
            durationMinutes: 26.8,
            description: 'Issuing JWTs, storing secure HTTP-only cookies, and verifying auth headers.'
          },
          {
            id: 'les-2-4',
            title: 'Handling Errors Globally with Custom Middleware',
            duration: '15:10',
            durationMinutes: 15.1,
            description: 'Centralized error handler class, async wrapper functions, and structured error logs.'
          }
        ]
      },
      {
        id: 'mod-3',
        title: 'Module 3: Modern React Frontend & State Management',
        description: 'Crafting responsive UI, custom hooks, and dynamic data fetching.',
        lessons: [
          {
            id: 'les-3-1',
            title: 'Vite React Architecture & Tailwind CSS Setup',
            duration: '19:30',
            durationMinutes: 19.5,
            description: 'Structuring components, layout wrappers, and design tokens.'
          },
          {
            id: 'les-3-2',
            title: 'Global Auth State with React Context & Reducers',
            duration: '25:00',
            durationMinutes: 25.0,
            description: 'Managing session state, login/logout synchronization, and persistent storage.'
          },
          {
            id: 'les-3-3',
            title: 'Building Interactive Product & Course Dashboards',
            duration: '28:15',
            durationMinutes: 28.2,
            description: 'Filtering, search inputs, pagination components, and skeleton loading states.'
          },
          {
            id: 'les-3-4',
            title: 'Optimistic UI Updates & Error Boundary Handling',
            duration: '21:40',
            durationMinutes: 21.6,
            description: 'Making the UI snappy with instant feedback and graceful crash recovery.'
          }
        ]
      },
      {
        id: 'mod-4',
        title: 'Module 4: Production Deployment & DevOps',
        description: 'Building production assets, Dockerizing applications, and deploying to cloud.',
        lessons: [
          {
            id: 'les-4-1',
            title: 'Optimizing Production Builds & Bundle Analysis',
            duration: '17:20',
            durationMinutes: 17.3,
            description: 'Tree shaking, code splitting, dynamic imports, and asset compression.'
          },
          {
            id: 'les-4-2',
            title: 'Writing Production Dockerfiles for MERN Apps',
            duration: '23:45',
            durationMinutes: 23.7,
            description: 'Multi-stage builds, caching layers, and minimal production containers.'
          },
          {
            id: 'les-4-3',
            title: 'Deploying to Cloud & Environment Variables',
            duration: '20:10',
            durationMinutes: 20.1,
            description: 'Setting up DNS, SSL certificates, environment configs, and health check monitoring.'
          },
          {
            id: 'les-4-4',
            title: 'Course Capstone Project Review & Graduation 🎉',
            duration: '12:00',
            durationMinutes: 12.0,
            description: 'Final walkthrough, certificate issuance, and next steps in your engineering career.'
          }
        ]
      }
    ],
    reviews: [
      {
        id: 'rev-1',
        userName: 'Jordan Lee',
        userAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200',
        rating: 5,
        date: '2 weeks ago',
        comment: 'This course is gold. Sarah explains the backend concepts so clearly and the hands-on project gave me something real to discuss during my junior developer interviews!',
        helpfulCount: 42
      },
      {
        id: 'rev-2',
        userName: 'Maya Sharma',
        userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200',
        rating: 5,
        date: '1 month ago',
        comment: 'The JWT auth module alone saved me weeks of debugging on my college project. 10/10 recommend to anyone serious about modern web dev.',
        helpfulCount: 29
      }
    ]
  },
  {
    id: 'digital-marketing-masterclass',
    title: 'Digital Marketing Masterclass: SEO, Ads, & Social Growth',
    slug: 'digital-marketing-masterclass',
    headline: 'Master modern omnichannel digital marketing, high-converting ad campaigns, SEO ranking, and data-driven marketing analytics.',
    description: 'Transform your marketing skills with practical strategies used by top growth hackers. Learn how to craft customer avatars, conduct keyword research, build high-converting sales funnels, run profitable Google Ads and Meta campaigns, and analyze conversion metrics with Google Analytics 4. Essential for marketers, entrepreneurs, and digital marketing college students.',
    category: 'Digital Marketing',
    level: 'All Levels',
    language: 'English',
    instructor: INSTRUCTORS.alex_rivera,
    rating: 4.88,
    ratingCount: 1930,
    studentsCount: 18200,
    duration: '26h 40m',
    totalLessons: 24,
    price: 2999,
    originalPrice: 7999,
    discountPercentage: 63,
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
    featured: true,
    bestseller: true,
    certificateOffered: true,
    lastUpdated: 'July 2026',
    skills: ['SEO Strategy', 'Google Ads', 'Meta Ads', 'Google Analytics 4', 'Content Funnels', 'Copywriting', 'Email Marketing'],
    learningOutcomes: [
      'Drive targeted organic traffic with on-page, off-page, and technical SEO',
      'Create and optimize high-ROI PPC campaigns in Google Search & Display',
      'Design targeted ad funnels on Meta (Facebook & Instagram)',
      'Analyze user journeys and attribution models with Google Analytics 4',
      'Write persuasive, conversion-focused copywriting for landing pages',
      'Build automated email sequences that turn leads into paying customers'
    ],
    requirements: [
      'No prior marketing experience required',
      'A computer with internet access to explore marketing tools'
    ],
    targetAudience: [
      'College students working on Digital Marketing coursework or presentations',
      'Entrepreneurs and small business owners looking to scale customer acquisition',
      'Junior marketers aiming to upgrade their strategic and technical skill set'
    ],
    modules: [
      {
        id: 'dm-mod-1',
        title: 'Module 1: Modern Digital Marketing Strategy & Buyer Personas',
        lessons: [
          {
            id: 'dm-1-1',
            title: 'The Digital Marketing Ecosystem & Growth Funnels',
            duration: '12:15',
            durationMinutes: 12.2,
            description: 'Understanding TOFU, MOFU, and BOFU customer acquisition funnels.',
            previewFree: true
          },
          {
            id: 'dm-1-2',
            title: 'Constructing Data-Driven Customer Avatars',
            duration: '15:40',
            durationMinutes: 15.6,
            description: 'Psychographics, pain points, and buyer intent mapping.'
          },
          {
            id: 'dm-1-3',
            title: 'Competitor Analysis & Value Proposition Design',
            duration: '18:10',
            durationMinutes: 18.1,
            description: 'Auditing competitors using Semrush, SpyFu, and Meta Ad Library.'
          }
        ]
      },
      {
        id: 'dm-mod-2',
        title: 'Module 2: Search Engine Optimization (SEO) Domination',
        lessons: [
          {
            id: 'dm-2-1',
            title: 'Keyword Research & Search Intent Mastery',
            duration: '22:30',
            durationMinutes: 22.5,
            description: 'Finding high-intent, low-difficulty search queries that convert.'
          },
          {
            id: 'dm-2-2',
            title: 'On-Page SEO: Headings, Metadata & Content Optimization',
            duration: '26:00',
            durationMinutes: 26.0,
            description: 'Structuring content for search engine crawlers and human readers.'
          },
          {
            id: 'dm-2-3',
            title: 'Technical SEO: Core Web Vitals & Site Speed',
            duration: '20:15',
            durationMinutes: 20.2,
            description: 'Fixing indexation issues, XML sitemaps, and mobile responsiveness.'
          }
        ]
      },
      {
        id: 'dm-mod-3',
        title: 'Module 3: Paid Advertising & Performance Marketing',
        lessons: [
          {
            id: 'dm-3-1',
            title: 'Google Ads: Search Campaign Setup & Bidding Strategies',
            duration: '25:40',
            durationMinutes: 25.6,
            description: 'Match types, quality score optimization, and negative keywords.'
          },
          {
            id: 'dm-3-2',
            title: 'Meta Ads: Pixel Tracking & Lookalike Audiences',
            duration: '28:10',
            durationMinutes: 28.1,
            description: 'Custom audiences, retargeting sequences, and creative testing.'
          },
          {
            id: 'dm-3-3',
            title: 'Marketing Analytics & ROI Reporting Dashboard',
            duration: '19:50',
            durationMinutes: 19.8,
            description: 'Building executive marketing reports with Looker Studio.'
          }
        ]
      }
    ],
    reviews: [
      {
        id: 'dm-rev-1',
        userName: 'Chloe Bennett',
        userAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200',
        rating: 5,
        date: '3 weeks ago',
        comment: 'As a business student, this course provided the exact real-world framework I needed for my college marketing capstone. Fantastic teacher!',
        helpfulCount: 38
      }
    ]
  },
  {
    id: 'ui-ux-design-figma',
    title: 'UI/UX Design Masterclass: From Wireframes to Figma Design Systems',
    slug: 'ui-ux-design-figma',
    headline: 'Design intuitive, beautiful user interfaces and scalable design systems using modern Figma techniques and user research.',
    description: 'Learn product design from the ground up. This course covers the entire UI/UX lifecycle: empathizing with users, creating information architecture, building low and high-fidelity wireframes, mastering Auto Layout, components, variants, variables, interactive prototyping in Figma, and running usability tests.',
    category: 'UI/UX Design',
    level: 'Beginner',
    language: 'English',
    instructor: INSTRUCTORS.elena_rostova,
    rating: 4.95,
    ratingCount: 3120,
    studentsCount: 22400,
    duration: '24h 50m',
    totalLessons: 28,
    price: 3499,
    originalPrice: 8999,
    discountPercentage: 61,
    thumbnail: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&q=80&w=800',
    featured: true,
    bestseller: true,
    trending: true,
    certificateOffered: true,
    lastUpdated: 'August 2026',
    skills: ['Figma', 'Design Systems', 'Auto Layout', 'Prototyping', 'User Research', 'Wireframing', 'Color Theory', 'Typography'],
    learningOutcomes: [
      'Master Figma tools, Auto Layout, Variables, and Component Sets',
      'Build comprehensive, token-driven Design Systems for multi-brand platforms',
      'Conduct user interviews, persona mapping, and heuristic evaluations',
      'Create high-fidelity interactive micro-interactions and realistic prototypes',
      'Handoff design specs seamlessly to frontend engineering teams'
    ],
    requirements: [
      'No design background required',
      'Free Figma account (browser-based or desktop app)'
    ],
    targetAudience: [
      'Beginners wanting to launch a career as a Product or UI/UX Designer',
      'Frontend developers wanting to improve their visual design taste',
      'Product managers creating clickable concepts and prototypes'
    ],
    modules: [
      {
        id: 'ux-mod-1',
        title: 'Module 1: User Experience Foundations & Research',
        lessons: [
          {
            id: 'ux-1-1',
            title: 'The UX Double Diamond Framework',
            duration: '11:20',
            durationMinutes: 11.3,
            description: 'Discover, Define, Develop, Deliver design thinking process.',
            previewFree: true
          },
          {
            id: 'ux-1-2',
            title: 'User Personas & Journey Mapping',
            duration: '16:45',
            durationMinutes: 16.7,
            description: 'Transforming interview insights into actionable empathy maps.'
          },
          {
            id: 'ux-1-3',
            title: 'Information Architecture & Card Sorting',
            duration: '14:30',
            durationMinutes: 14.5,
            description: 'Site maps, hierarchical navigation, and content taxonomy.'
          }
        ]
      },
      {
        id: 'ux-mod-2',
        title: 'Module 2: Figma Deep Dive & UI Design Principles',
        lessons: [
          {
            id: 'ux-2-1',
            title: 'Figma Auto Layout 5.0 & Responsive Constraints',
            duration: '22:15',
            durationMinutes: 22.2,
            description: 'Building flexible cards and navigation bars that adapt to any screen size.',
            previewFree: true
          },
          {
            id: 'ux-2-2',
            title: 'Typography Scales & Mathematical Spacing Systems',
            duration: '19:40',
            durationMinutes: 19.6,
            description: 'Harmonic font ratios, line heights, and 4pt/8pt grid systems.'
          },
          {
            id: 'ux-2-3',
            title: 'Building Reusable Components & Interactive Variants',
            duration: '27:50',
            durationMinutes: 27.8,
            description: 'Component properties, nested instances, and state toggles.'
          }
        ]
      }
    ],
    reviews: [
      {
        id: 'ux-rev-1',
        userName: 'Lucas Hernandez',
        userAvatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200',
        rating: 5,
        date: '1 week ago',
        comment: 'Elena is an exceptional instructor. The Figma tips and design system workflow helped me redesign my whole portfolio.',
        helpfulCount: 51
      }
    ]
  },
  {
    id: 'python-for-beginners',
    title: 'Python for Beginners: Practical Coding & Automation',
    slug: 'python-for-beginners',
    headline: 'Learn Python programming step-by-step with interactive coding exercises, web scraping, and real-life automation scripts.',
    description: 'The friendliest and most comprehensive Python course for complete beginners. Master core programming concepts: variables, data structures, loops, functions, object-oriented programming (OOP), file manipulation, and web scraping with BeautifulSoup. Build 5 practical desktop utilities and automation tools.',
    category: 'Programming',
    level: 'Beginner',
    language: 'English',
    instructor: INSTRUCTORS.david_miller,
    rating: 4.92,
    ratingCount: 4210,
    studentsCount: 36500,
    duration: '21h 30m',
    totalLessons: 26,
    price: 0, // Free course
    originalPrice: 3999,
    discountPercentage: 100,
    thumbnail: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?auto=format&fit=crop&q=80&w=800',
    featured: true,
    bestseller: true,
    certificateOffered: true,
    lastUpdated: 'August 2026',
    skills: ['Python 3', 'Data Structures', 'OOP', 'Web Scraping', 'File Handling', 'Automation', 'APIs'],
    learningOutcomes: [
      'Write clean, readable Python 3 scripts with solid coding conventions',
      'Understand lists, dictionaries, tuples, sets, and comprehension patterns',
      'Automate repetitive daily tasks like file renaming and data parsing',
      'Scrape live data from websites using Requests and BeautifulSoup',
      'Build a functional portfolio of beginner-friendly Python applications'
    ],
    requirements: [
      'No prior programming knowledge needed',
      'A computer running Windows, macOS, or Linux'
    ],
    targetAudience: [
      'Complete beginners wanting to learn their first programming language',
      'Non-engineers looking to automate spreadsheet and repetitive work tasks',
      'Students preparing for university computer science fundamentals'
    ],
    modules: [
      {
        id: 'py-mod-1',
        title: 'Module 1: Python Basics & Core Data Structures',
        lessons: [
          {
            id: 'py-1-1',
            title: 'Installing Python & VS Code Workspace',
            duration: '10:00',
            durationMinutes: 10.0,
            description: 'Setting up Python 3 interpreter, extensions, and running your first script.',
            previewFree: true
          },
          {
            id: 'py-1-2',
            title: 'Variables, Types, and Math Operators',
            duration: '15:20',
            durationMinutes: 15.3,
            description: 'Strings, integers, floats, booleans, and string formatting.'
          },
          {
            id: 'py-1-3',
            title: 'Lists, Dictionaries & Nested Structures',
            duration: '22:15',
            durationMinutes: 22.2,
            description: 'Indexing, slicing, appending, and key-value mapping.'
          }
        ]
      },
      {
        id: 'py-mod-2',
        title: 'Module 2: Loops, Functions & Automation Scripts',
        lessons: [
          {
            id: 'py-2-1',
            title: 'For Loops, While Loops, and List Comprehensions',
            duration: '18:40',
            durationMinutes: 18.6,
            description: 'Iterating through data and writing compact one-line transformations.'
          },
          {
            id: 'py-2-2',
            title: 'Writing Modular Reusable Functions',
            duration: '16:50',
            durationMinutes: 16.8,
            description: 'Arguments, default parameters, return values, and docstrings.'
          },
          {
            id: 'py-2-3',
            title: 'Mini Project: Web Scraper for Tech Jobs',
            duration: '28:30',
            durationMinutes: 28.5,
            description: 'Extracting live job listings, parsing HTML, and exporting to CSV.'
          }
        ]
      }
    ],
    reviews: [
      {
        id: 'py-rev-1',
        userName: 'Aria Montgomery',
        userAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=200',
        rating: 5,
        date: '2 weeks ago',
        comment: 'I never thought I could code until Dr. Miller explained it with simple real-life analogies. The fact that this course is free is unbelievable!',
        helpfulCount: 64
      }
    ]
  },
  {
    id: 'data-analytics-excel-sql',
    title: 'Data Analytics & Business Intelligence with Excel & SQL',
    slug: 'data-analytics-excel-sql',
    headline: 'Master advanced Excel formulas, Power Query, pivot tables, and relational SQL queries to turn raw data into executive business insights.',
    description: 'Transform numbers into strategic business decisions. This course teaches you everything required to land a Business Analyst or Data Analyst role. You will learn advanced Excel (XLOOKUP, INDEX/MATCH, Dynamic Arrays), Power Query data transformation, SQL SELECT queries, joins, aggregations, window functions, and interactive dashboard design.',
    category: 'Data Science',
    level: 'Intermediate',
    language: 'English',
    instructor: INSTRUCTORS.priya_patel,
    rating: 4.89,
    ratingCount: 1680,
    studentsCount: 15900,
    duration: '22h 15m',
    totalLessons: 24,
    price: 2499,
    originalPrice: 6999,
    discountPercentage: 64,
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800',
    featured: true,
    bestseller: false,
    certificateOffered: true,
    lastUpdated: 'July 2026',
    skills: ['Advanced Excel', 'SQL Queries', 'Power Query', 'Data Cleaning', 'Pivot Tables', 'Dashboard Design', 'Business Analysis'],
    learningOutcomes: [
      'Master advanced Excel logic: XLOOKUP, Nested IF, FILTER, UNIQUE',
      'Clean and automate messy multi-file datasets with Power Query',
      'Write complex multi-table SQL JOIN queries and subqueries',
      'Use SQL Window functions (ROW_NUMBER, RANK, LAG/LEAD) for financial trends',
      'Design clean, C-suite ready interactive executive dashboards'
    ],
    requirements: [
      'Basic familiarity with Microsoft Excel or Google Sheets',
      'No previous SQL knowledge needed'
    ],
    targetAudience: [
      'Business, finance, and marketing students wanting practical data skills',
      'Professionals aiming to transition into Business Analyst or Data Analyst roles',
      'Operations managers looking to automate routine weekly reporting'
    ],
    modules: [
      {
        id: 'da-mod-1',
        title: 'Module 1: Advanced Excel & Automated Data Modeling',
        lessons: [
          {
            id: 'da-1-1',
            title: 'Modern Formula Architecture: XLOOKUP & Dynamic Arrays',
            duration: '14:20',
            durationMinutes: 14.3,
            description: 'Replacing old VLOOKUP with robust lookup logic.',
            previewFree: true
          },
          {
            id: 'da-1-2',
            title: 'Power Query: ETL Pipeline in 5 Minutes',
            duration: '22:00',
            durationMinutes: 22.0,
            description: 'Importing, unpivoting, merging, and cleaning dirty datasets.'
          },
          {
            id: 'da-1-3',
            title: 'Designing High-Impact Executive Dashboards',
            duration: '26:45',
            durationMinutes: 26.7,
            description: 'Color palettes, KPI cards, dynamic slicers, and chart selection.'
          }
        ]
      },
      {
        id: 'da-mod-2',
        title: 'Module 2: SQL Fundamentals to Advanced Aggregations',
        lessons: [
          {
            id: 'da-2-1',
            title: 'Relational Database Concepts & SELECT Statements',
            duration: '16:30',
            durationMinutes: 16.5,
            description: 'Filtering with WHERE, sorting with ORDER BY, and limiting outputs.'
          },
          {
            id: 'da-2-2',
            title: 'Mastering INNER, LEFT, RIGHT, and FULL OUTER JOINs',
            duration: '24:10',
            durationMinutes: 24.1,
            description: 'Connecting multi-table ecommerce schemas accurately.'
          }
        ]
      }
    ],
    reviews: [
      {
        id: 'da-rev-1',
        userName: 'Daniel Kim',
        userAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
        rating: 5,
        date: '2 weeks ago',
        comment: 'Priya makes SQL feel intuitive. The sample business datasets and capstone dashboard exercise are top-tier.',
        helpfulCount: 23
      }
    ]
  },
  {
    id: 'javascript-zero-to-advanced',
    title: 'JavaScript Modern Masterclass: From Zero to Advanced',
    slug: 'javascript-zero-to-advanced',
    headline: 'Deep dive into modern ES6+ JavaScript, asynchronous programming, DOM manipulation, closures, prototypes, and browser APIs.',
    description: 'Master JavaScript the right way. This deep-dive masterclass takes you behind the scenes of the JavaScript engine: call stack, event loop, hoisting, lexical scoping, closures, promises, async/await, modules, and building 6 interactive browser applications from scratch without any external frameworks.',
    category: 'Web Development',
    level: 'All Levels',
    language: 'English',
    instructor: INSTRUCTORS.sarah_chen,
    rating: 4.93,
    ratingCount: 3890,
    studentsCount: 28400,
    duration: '32h 45m',
    totalLessons: 30,
    price: 2999,
    originalPrice: 8499,
    discountPercentage: 65,
    thumbnail: 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?auto=format&fit=crop&q=80&w=800',
    featured: true,
    bestseller: false,
    trending: true,
    certificateOffered: true,
    lastUpdated: 'August 2026',
    skills: ['JavaScript ES6+', 'Async/Await', 'DOM Manipulation', 'Event Loop', 'Closures', 'Object Oriented JS', 'Web APIs'],
    learningOutcomes: [
      'Understand how JavaScript actually runs under the hood in V8',
      'Master asynchronous code with Promises, Async/Await, and Fetch API',
      'Manipulate the DOM dynamically with efficient event delegation',
      'Harness closure, functional programming, and pure functions',
      'Build real-world browser applications with zero dependencies'
    ],
    requirements: [
      'Basic HTML and CSS knowledge is helpful but not strictly required',
      'Any web browser and a text editor'
    ],
    targetAudience: [
      'Web development beginners wanting a rock-solid JS foundation',
      'React or Vue developers who struggle with vanilla JS fundamentals',
      'Developers preparing for technical JavaScript interview questions'
    ],
    modules: [
      {
        id: 'js-mod-1',
        title: 'Module 1: JavaScript Engine & Core Logic',
        lessons: [
          {
            id: 'js-1-1',
            title: 'How JavaScript Works: Execution Context & Call Stack',
            duration: '15:10',
            durationMinutes: 15.1,
            description: 'Memory creation phase, code execution, and variable hoisting.',
            previewFree: true
          },
          {
            id: 'js-1-2',
            title: 'Scope Chain, Lexical Scoping & Closures in Depth',
            duration: '21:30',
            durationMinutes: 21.5,
            description: 'Why closures are JavaScript superpowers with practical patterns.'
          },
          {
            id: 'js-1-3',
            title: 'The "this" Keyword, Call, Apply, and Bind',
            duration: '18:50',
            durationMinutes: 18.8,
            description: 'Explicit, implicit, and arrow function binding rules.'
          }
        ]
      },
      {
        id: 'js-mod-2',
        title: 'Module 2: Asynchronous JS & Browser APIs',
        lessons: [
          {
            id: 'js-2-1',
            title: 'Event Loop, Microtask Queue & Macrotask Queue',
            duration: '20:10',
            durationMinutes: 20.1,
            description: 'Visualizing how setTimeout, Promises, and UI rendering prioritize.'
          },
          {
            id: 'js-2-2',
            title: 'Promises, Async/Await & Robust Error Handling',
            duration: '25:40',
            durationMinutes: 25.6,
            description: 'Consuming APIs with fetch, handling errors, and Promise.allSettled.'
          }
        ]
      }
    ],
    reviews: [
      {
        id: 'js-rev-1',
        userName: 'Tom Bradley',
        userAvatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&q=80&w=200',
        rating: 5,
        date: '3 weeks ago',
        comment: 'The visual diagrams of the event loop finally made async programming click for me. Essential course for web devs!',
        helpfulCount: 45
      }
    ]
  },
  {
    id: 'ai-prompt-engineering-genai',
    title: 'Generative AI & Prompt Engineering Masterclass',
    slug: 'ai-prompt-engineering-genai',
    headline: 'Harness the power of LLMs, multimodal AI models, context caching, and autonomous agents for modern business workflows.',
    description: 'Step into the future of artificial intelligence. Discover how to engineer high-precision prompts, design agentic workflows, utilize chain-of-thought and few-shot reasoning, integrate AI into web applications, and build automated generative content pipelines.',
    category: 'AI & Machine Learning',
    level: 'All Levels',
    language: 'English',
    instructor: INSTRUCTORS.david_miller,
    rating: 4.96,
    ratingCount: 2890,
    studentsCount: 24100,
    duration: '18h 40m',
    totalLessons: 20,
    price: 3999,
    originalPrice: 10999,
    discountPercentage: 64,
    thumbnail: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800',
    featured: false,
    bestseller: true,
    trending: true,
    certificateOffered: true,
    lastUpdated: 'August 2026',
    skills: ['Prompt Engineering', 'LLM Architecture', 'Autonomous Agents', 'RAG Systems', 'Multimodal AI', 'Workflow Automation'],
    learningOutcomes: [
      'Master zero-shot, few-shot, and chain-of-thought prompting frameworks',
      'Build autonomous AI agents with function calling and tool execution',
      'Understand embeddings, vector databases, and RAG architectures',
      'Automate content production, code generation, and market research'
    ],
    requirements: [
      'Curiosity about generative artificial intelligence',
      'No advanced math or coding prerequisite'
    ],
    targetAudience: [
      'Students and researchers wanting to leverage AI productivity',
      'Marketers creating high-scale generative content systems',
      'Engineers building LLM-integrated modern applications'
    ],
    modules: [
      {
        id: 'ai-mod-1',
        title: 'Module 1: Prompt Engineering Principles & Frameworks',
        lessons: [
          {
            id: 'ai-1-1',
            title: 'LLM Foundations: Tokens, Temperature & Context Windows',
            duration: '14:00',
            durationMinutes: 14.0,
            description: 'How modern generative language models process input text.',
            previewFree: true
          },
          {
            id: 'ai-1-2',
            title: 'The CREATE Framework for Precision Prompting',
            duration: '18:30',
            durationMinutes: 18.5,
            description: 'Character, Request, Examples, Adjustments, Type of Output, Extras.'
          }
        ]
      }
    ],
    reviews: [
      {
        id: 'ai-rev-1',
        userName: 'Siddharth Nair',
        userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
        rating: 5,
        date: '1 week ago',
        comment: 'Changed how I work every single day. The RAG architecture breakdown is exceptionally lucid.',
        helpfulCount: 31
      }
    ]
  },
  {
    id: 'aws-cloud-practitioner-architect',
    title: 'AWS Cloud Solutions Architect: Complete Hands-on Guide',
    slug: 'aws-cloud-practitioner-architect',
    headline: 'Deploy highly available, fault-tolerant cloud architectures with AWS EC2, S3, RDS, Lambda, VPC, and CloudFront.',
    description: 'Prepare for real-world cloud engineering and AWS Solutions Architect certification. Hands-on labs configuring virtual private clouds (VPC), IAM security policies, serverless computing with Lambda, containerized deployments with ECS, and resilient multi-region infrastructure.',
    category: 'Cloud Computing',
    level: 'Intermediate',
    language: 'English',
    instructor: INSTRUCTORS.marcus_vance,
    rating: 4.87,
    ratingCount: 1420,
    studentsCount: 12900,
    duration: '29h 10m',
    totalLessons: 27,
    price: 3999,
    originalPrice: 9999,
    discountPercentage: 60,
    thumbnail: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800',
    featured: false,
    bestseller: false,
    certificateOffered: true,
    lastUpdated: 'July 2026',
    skills: ['AWS Cloud', 'EC2 & S3', 'Serverless Lambda', 'VPC Networking', 'IAM Security', 'RDS Databases', 'CloudFormation'],
    learningOutcomes: [
      'Architect secure, cost-optimized, and resilient cloud infrastructures',
      'Configure custom Virtual Private Clouds (VPC) with public/private subnets',
      'Deploy serverless microservices with AWS Lambda and API Gateway',
      'Pass the AWS Certified Solutions Architect Associate exam'
    ],
    requirements: [
      'Basic networking and operating system understanding',
      'Free-tier AWS account'
    ],
    targetAudience: [
      'System administrators and developers transitioning to cloud computing',
      'Students preparing for official AWS certifications'
    ],
    modules: [
      {
        id: 'aws-mod-1',
        title: 'Module 1: AWS Global Infrastructure & IAM Security',
        lessons: [
          {
            id: 'aws-1-1',
            title: 'Regions, Availability Zones & Edge Locations',
            duration: '13:40',
            durationMinutes: 13.6,
            description: 'Designing for high availability across physical geographic zones.',
            previewFree: true
          },
          {
            id: 'aws-1-2',
            title: 'IAM Users, Groups, Roles & Least-Privilege Policies',
            duration: '21:15',
            durationMinutes: 21.2,
            description: 'Securing cloud resources with granular policy rules.'
          }
        ]
      }
    ],
    reviews: [
      {
        id: 'aws-rev-1',
        userName: 'Ethan Wright',
        userAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
        rating: 5,
        date: '1 month ago',
        comment: 'Marcus breaks down complex cloud networking concepts into simple, memorable steps. Passed my AWS exam on the first attempt!',
        helpfulCount: 27
      }
    ]
  },
  {
    id: 'startup-business-strategy',
    title: 'Startup Strategy, Agile Management & Venture Growth',
    slug: 'startup-business-strategy',
    headline: 'Learn how to validate product ideas, manage agile sprint cycles, build unit-economic models, and pitch to venture capital investors.',
    description: 'Designed for ambitious founders and future business leaders. Learn market sizing (TAM/SAM/SOM), product-market fit metrics, agile Scrum frameworks, CAC/LTV unit economics, financial runway planning, and pitch deck storytelling that wins investor checks.',
    category: 'Business',
    level: 'Beginner',
    language: 'English',
    instructor: INSTRUCTORS.priya_patel,
    rating: 4.86,
    ratingCount: 980,
    studentsCount: 9800,
    duration: '16h 20m',
    totalLessons: 18,
    price: 1999,
    originalPrice: 5999,
    discountPercentage: 67,
    thumbnail: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=800',
    featured: false,
    bestseller: false,
    certificateOffered: true,
    lastUpdated: 'June 2026',
    skills: ['Business Strategy', 'Financial Modeling', 'Agile Scrum', 'Pitch Deck Design', 'Unit Economics', 'Venture Capital'],
    learningOutcomes: [
      'Validate startup concepts rapidly with minimal capital expenditure',
      'Calculate customer acquisition cost (CAC), LTV, and churn rates',
      'Run effective sprint planning and retrospective rituals with Scrum',
      'Create winning pitch decks for angel and seed investment rounds'
    ],
    requirements: [
      'An interest in entrepreneurship and business management'
    ],
    targetAudience: [
      'Aspiring entrepreneurs, MBA students, and startup product leaders'
    ],
    modules: [
      {
        id: 'biz-mod-1',
        title: 'Module 1: Opportunity Discovery & Market Sizing',
        lessons: [
          {
            id: 'biz-1-1',
            title: 'De-Risking Startup Ideas with Lean Validation',
            duration: '15:20',
            durationMinutes: 15.3,
            description: 'Customer discovery interviews and smoke tests.',
            previewFree: true
          }
        ]
      }
    ],
    reviews: [
      {
        id: 'biz  -rev-1',
        userName: 'Valerie Adams',
        userAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200',
        rating: 5,
        date: '2 months ago',
        comment: 'The financial modeling templates alone are worth 10x the course price. Invaluable for my startup team.',
        helpfulCount: 19
      }
    ]
  },
  {
    id: 'nextjs-fullstack-mastery',
    title: 'Next.js 15 & React Server Components Masterclass',
    slug: 'nextjs-fullstack-mastery',
    headline: 'Build blistering fast web apps with Next.js App Router, Server Actions, SSR, streaming suspense, and Supabase / Prisma.',
    description: 'Unlock the cutting edge of modern web development. Master Next.js 15 App Router architecture, Server Components, client-server data boundary, caching strategies, optimistic mutations with Server Actions, and authentication with Auth.js.',
    category: 'Web Development',
    level: 'Advanced',
    language: 'English',
    instructor: INSTRUCTORS.sarah_chen,
    rating: 4.97,
    ratingCount: 1850,
    studentsCount: 11200,
    duration: '25h 15m',
    totalLessons: 24,
    price: 4499,
    originalPrice: 11999,
    discountPercentage: 63,
    thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800',
    featured: false,
    bestseller: true,
    certificateOffered: true,
    lastUpdated: 'August 2026',
    skills: ['Next.js 15', 'React Server Components', 'Server Actions', 'Streaming SSR', 'TypeScript', 'Tailwind CSS', 'PostgreSQL'],
    learningOutcomes: [
      'Understand the mental model behind React Server Components (RSC)',
      'Perform secure mutations without separate API endpoints using Server Actions',
      'Optimize Web Vitals with streaming UI suspense and parallel routes',
      'Deploy enterprise Next.js applications on global edge networks'
    ],
    requirements: [
      'Intermediate familiarity with React and modern JavaScript'
    ],
    targetAudience: [
      'React developers looking to upgrade to modern full-stack Next.js'
    ],
    modules: [
      {
        id: 'next-mod-1',
        title: 'Module 1: The New Next.js Mental Model',
        lessons: [
          {
            id: 'next-1-1',
            title: 'Server Components vs Client Components Explained',
            duration: '16:40',
            durationMinutes: 16.6,
            description: 'Zero bundle size, server-side secrets, and composition patterns.',
            previewFree: true
          }
        ]
      }
    ],
    reviews: [
      {
        id: 'next-rev-1',
        userName: 'Zack Morris',
        userAvatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200',
        rating: 5,
        date: '1 week ago',
        comment: 'Sarah is unmatched when it comes to deep technical clarity. The Next.js caching chapter resolved all my confusion.',
        helpfulCount: 39
      }
    ]
  },
  {
    id: 'cybersecurity-ethical-hacking',
    title: 'Cybersecurity & Ethical Hacking: Defend & Attack',
    slug: 'cybersecurity-ethical-hacking',
    headline: 'Master penetration testing, network defense, vulnerability assessment, and incident response with hands-on Kali Linux labs.',
    description: 'Become a cybersecurity professional. This intensive course covers network security fundamentals, OWASP Top 10 vulnerabilities, penetration testing methodologies, Kali Linux tools, Wireshark packet analysis, Metasploit exploitation frameworks, web application security, social engineering defense, and building a security operations playbook.',
    category: 'Cloud Computing',
    level: 'Intermediate',
    language: 'English',
    instructor: INSTRUCTORS.marcus_vance,
    rating: 4.91,
    ratingCount: 1890,
    studentsCount: 16700,
    duration: '34h 20m',
    totalLessons: 30,
    price: 4499,
    originalPrice: 11999,
    discountPercentage: 63,
    thumbnail: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800',
    featured: true,
    bestseller: true,
    trending: true,
    certificateOffered: true,
    lastUpdated: 'August 2026',
    skills: ['Kali Linux', 'Penetration Testing', 'Wireshark', 'Metasploit', 'OWASP Top 10', 'Network Security', 'Incident Response'],
    learningOutcomes: [
      'Perform professional penetration tests on networks and web applications',
      'Identify and exploit OWASP Top 10 vulnerabilities in real scenarios',
      'Use Kali Linux, Nmap, Burp Suite, and Metasploit like a pro',
      'Build enterprise-grade security incident response playbooks',
      'Defend against social engineering, phishing, and ransomware attacks'
    ],
    requirements: [
      'Basic understanding of networking (TCP/IP, DNS, HTTP)',
      'A computer capable of running virtual machines (8GB+ RAM recommended)'
    ],
    targetAudience: [
      'IT professionals transitioning into cybersecurity roles',
      'Students preparing for CompTIA Security+ or CEH certification',
      'Developers wanting to write more secure application code'
    ],
    modules: [
      {
        id: 'cyber-mod-1',
        title: 'Module 1: Security Foundations & Threat Landscape',
        lessons: [
          {
            id: 'cyber-1-1',
            title: 'The Cybersecurity Kill Chain & ATT&CK Framework',
            duration: '16:30',
            durationMinutes: 16.5,
            description: 'Understanding adversary tactics, techniques, and procedures.',
            previewFree: true
          },
          {
            id: 'cyber-1-2',
            title: 'Setting Up Your Hacking Lab: Kali Linux & VulnHub',
            duration: '22:15',
            durationMinutes: 22.2,
            description: 'Configuring isolated virtual lab environments for safe practice.'
          },
          {
            id: 'cyber-1-3',
            title: 'Network Reconnaissance with Nmap & Netcat',
            duration: '24:40',
            durationMinutes: 24.6,
            description: 'Port scanning, service enumeration, and OS fingerprinting.'
          }
        ]
      },
      {
        id: 'cyber-mod-2',
        title: 'Module 2: Web Application Exploitation & Defense',
        lessons: [
          {
            id: 'cyber-2-1',
            title: 'SQL Injection: Manual & Automated Exploitation',
            duration: '28:10',
            durationMinutes: 28.1,
            description: 'Detecting and exploiting injection flaws with sqlmap and Burp Suite.'
          },
          {
            id: 'cyber-2-2',
            title: 'Cross-Site Scripting (XSS) & CSRF Attack Patterns',
            duration: '21:50',
            durationMinutes: 21.8,
            description: 'Reflected, stored, and DOM-based XSS with practical defenses.'
          },
          {
            id: 'cyber-2-3',
            title: 'Building a Web Application Firewall (WAF) Strategy',
            duration: '19:30',
            durationMinutes: 19.5,
            description: 'ModSecurity rules, rate limiting, and input sanitization.'
          }
        ]
      }
    ],
    reviews: [
      {
        id: 'cyber-rev-1',
        userName: 'Rahul Mehta',
        userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
        rating: 5,
        date: '1 week ago',
        comment: 'The hands-on Kali Linux labs are incredible. Marcus walks you through real exploitation scenarios step by step. Passed my CEH exam!',
        helpfulCount: 47
      }
    ]
  },
  {
    id: 'react-native-mobile-apps',
    title: 'React Native & Expo: Build Production Mobile Apps',
    slug: 'react-native-mobile-apps',
    headline: 'Build cross-platform iOS and Android apps with React Native, Expo, TypeScript, and native device APIs.',
    description: 'Ship real mobile apps to the App Store and Google Play. This project-based course covers React Native core components, Expo managed workflow, navigation with React Navigation, state management with Zustand, native device APIs (camera, location, notifications), offline storage with SQLite, and deploying production builds with EAS Build.',
    category: 'Web Development',
    level: 'Intermediate',
    language: 'English',
    instructor: INSTRUCTORS.sarah_chen,
    rating: 4.88,
    ratingCount: 1640,
    studentsCount: 13200,
    duration: '28h 45m',
    totalLessons: 26,
    price: 3499,
    originalPrice: 9499,
    discountPercentage: 63,
    thumbnail: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=800',
    featured: false,
    bestseller: true,
    trending: true,
    certificateOffered: true,
    lastUpdated: 'August 2026',
    skills: ['React Native', 'Expo', 'TypeScript', 'React Navigation', 'Zustand', 'Native APIs', 'EAS Build', 'SQLite'],
    learningOutcomes: [
      'Build and deploy cross-platform mobile apps for iOS and Android',
      'Master React Native core components and platform-specific styling',
      'Implement complex navigation flows with stack, tab, and drawer navigators',
      'Access native device features: camera, GPS, push notifications, and biometrics',
      'Publish production apps using Expo EAS Build and Submit'
    ],
    requirements: [
      'Intermediate knowledge of React and JavaScript/TypeScript',
      'A computer with Node.js installed and a smartphone for testing'
    ],
    targetAudience: [
      'React developers wanting to expand into mobile development',
      'Entrepreneurs who want to build their own mobile app MVP',
      'Mobile developers transitioning from native iOS/Android to cross-platform'
    ],
    modules: [
      {
        id: 'rn-mod-1',
        title: 'Module 1: React Native & Expo Foundations',
        lessons: [
          {
            id: 'rn-1-1',
            title: 'React Native Architecture: Bridge vs New Architecture',
            duration: '14:20',
            durationMinutes: 14.3,
            description: 'How React Native renders to native views and the new Fabric renderer.',
            previewFree: true
          },
          {
            id: 'rn-1-2',
            title: 'Core Components: View, Text, ScrollView & FlatList',
            duration: '20:45',
            durationMinutes: 20.7,
            description: 'Building responsive layouts with Flexbox and platform-specific components.'
          },
          {
            id: 'rn-1-3',
            title: 'Styling Patterns & Responsive Design in RN',
            duration: '18:30',
            durationMinutes: 18.5,
            description: 'StyleSheet API, dynamic styles, and handling different screen sizes.'
          }
        ]
      },
      {
        id: 'rn-mod-2',
        title: 'Module 2: Navigation, State & Native APIs',
        lessons: [
          {
            id: 'rn-2-1',
            title: 'React Navigation: Stack, Tab & Drawer Navigators',
            duration: '25:10',
            durationMinutes: 25.1,
            description: 'Building complex navigation flows with deep linking support.'
          },
          {
            id: 'rn-2-2',
            title: 'Camera, Location & Push Notifications Integration',
            duration: '28:40',
            durationMinutes: 28.6,
            description: 'Accessing hardware features with Expo modules and permissions.'
          },
          {
            id: 'rn-2-3',
            title: 'Deploying to App Store & Google Play with EAS',
            duration: '22:00',
            durationMinutes: 22.0,
            description: 'Building production binaries, signing, and submitting for review.'
          }
        ]
      }
    ],
    reviews: [
      {
        id: 'rn-rev-1',
        userName: 'Ananya Gupta',
        userAvatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=200',
        rating: 5,
        date: '2 weeks ago',
        comment: 'Finally shipped my first app to both stores! Sarah makes the entire React Native ecosystem feel approachable and fun.',
        helpfulCount: 36
      }
    ]
  },
  {
    id: 'deep-learning-pytorch',
    title: 'Deep Learning with PyTorch: Neural Networks Masterclass',
    slug: 'deep-learning-pytorch',
    headline: 'Build and train neural networks from scratch using PyTorch — CNNs, RNNs, Transformers, GANs, and model deployment.',
    description: 'Dive deep into neural network architectures with hands-on PyTorch implementations. This course covers tensor operations, automatic differentiation, building custom datasets and dataloaders, convolutional neural networks for image classification, recurrent networks for sequence modeling, attention mechanisms and Transformers, generative adversarial networks, transfer learning, and deploying models with TorchServe and ONNX.',
    category: 'AI & Machine Learning',
    level: 'Advanced',
    language: 'English',
    instructor: INSTRUCTORS.david_miller,
    rating: 4.95,
    ratingCount: 2340,
    studentsCount: 19800,
    duration: '36h 30m',
    totalLessons: 34,
    price: 4999,
    originalPrice: 12999,
    discountPercentage: 62,
    thumbnail: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&q=80&w=800',
    featured: true,
    bestseller: true,
    trending: true,
    certificateOffered: true,
    lastUpdated: 'August 2026',
    skills: ['PyTorch', 'CNNs', 'RNNs', 'Transformers', 'GANs', 'Transfer Learning', 'TorchServe', 'CUDA'],
    learningOutcomes: [
      'Build neural networks from scratch using PyTorch tensors and autograd',
      'Implement CNNs for image classification, object detection, and segmentation',
      'Design sequence models with LSTMs, GRUs, and attention mechanisms',
      'Understand and implement the Transformer architecture from the ground up',
      'Deploy trained models to production with TorchServe and ONNX Runtime'
    ],
    requirements: [
      'Solid Python programming skills and familiarity with NumPy',
      'Basic understanding of linear algebra and calculus (derivatives)',
      'GPU recommended but not required (Google Colab can be used)'
    ],
    targetAudience: [
      'Data scientists wanting to master deep learning with PyTorch',
      'ML engineers transitioning from TensorFlow or scikit-learn',
      'Researchers implementing state-of-the-art papers from scratch'
    ],
    modules: [
      {
        id: 'dl-mod-1',
        title: 'Module 1: PyTorch Fundamentals & Neural Network Basics',
        lessons: [
          {
            id: 'dl-1-1',
            title: 'Tensors, Autograd & Computational Graphs',
            duration: '18:40',
            durationMinutes: 18.6,
            description: 'Understanding automatic differentiation and gradient computation in PyTorch.',
            previewFree: true
          },
          {
            id: 'dl-1-2',
            title: 'Building Your First Neural Network from Scratch',
            duration: '26:15',
            durationMinutes: 26.2,
            description: 'Linear layers, activation functions, loss functions, and optimizers.'
          },
          {
            id: 'dl-1-3',
            title: 'Custom Datasets, DataLoaders & Data Augmentation',
            duration: '22:50',
            durationMinutes: 22.8,
            description: 'Building efficient data pipelines with transforms and batching.'
          }
        ]
      },
      {
        id: 'dl-mod-2',
        title: 'Module 2: CNNs, Transformers & Advanced Architectures',
        lessons: [
          {
            id: 'dl-2-1',
            title: 'Convolutional Neural Networks: From LeNet to ResNet',
            duration: '30:20',
            durationMinutes: 30.3,
            description: 'Convolution operations, pooling, batch normalization, and skip connections.'
          },
          {
            id: 'dl-2-2',
            title: 'The Transformer Architecture: Attention Is All You Need',
            duration: '34:10',
            durationMinutes: 34.1,
            description: 'Multi-head self-attention, positional encoding, and encoder-decoder stacks.'
          },
          {
            id: 'dl-2-3',
            title: 'Model Deployment with TorchServe & ONNX',
            duration: '24:30',
            durationMinutes: 24.5,
            description: 'Exporting models, creating inference endpoints, and optimizing latency.'
          }
        ]
      }
    ],
    reviews: [
      {
        id: 'dl-rev-1',
        userName: 'Vikram Singh',
        userAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
        rating: 5,
        date: '1 week ago',
        comment: 'Dr. Miller\'s Transformer implementation from scratch is the single best explanation I\'ve found anywhere. This course is a masterpiece.',
        helpfulCount: 58
      }
    ]
  },
  {
    id: 'docker-kubernetes-devops',
    title: 'Docker & Kubernetes: Complete DevOps Engineering',
    slug: 'docker-kubernetes-devops',
    headline: 'Master containerization with Docker and orchestration with Kubernetes — CI/CD pipelines, Helm charts, and production deployments.',
    description: 'Become a DevOps engineer from scratch. This hands-on course covers Docker fundamentals, multi-stage builds, Docker Compose for local development, Kubernetes architecture and objects (Pods, Deployments, Services, Ingress), Helm package management, CI/CD with GitHub Actions and ArgoCD, monitoring with Prometheus and Grafana, and deploying to EKS/GKE.',
    category: 'Cloud Computing',
    level: 'Intermediate',
    language: 'English',
    instructor: INSTRUCTORS.marcus_vance,
    rating: 4.90,
    ratingCount: 1780,
    studentsCount: 14500,
    duration: '31h 15m',
    totalLessons: 28,
    price: 3999,
    originalPrice: 10999,
    discountPercentage: 64,
    thumbnail: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?auto=format&fit=crop&q=80&w=800',
    featured: false,
    bestseller: true,
    certificateOffered: true,
    lastUpdated: 'July 2026',
    skills: ['Docker', 'Kubernetes', 'Helm', 'GitHub Actions', 'ArgoCD', 'Prometheus', 'Grafana', 'CI/CD'],
    learningOutcomes: [
      'Containerize any application with optimized multi-stage Dockerfiles',
      'Deploy and manage microservices on Kubernetes clusters',
      'Build production CI/CD pipelines with GitHub Actions and ArgoCD',
      'Monitor infrastructure with Prometheus, Grafana, and alerting rules',
      'Manage Kubernetes packages with Helm charts and Kustomize'
    ],
    requirements: [
      'Basic command line and Linux terminal skills',
      'Familiarity with at least one programming language'
    ],
    targetAudience: [
      'Developers wanting to add DevOps and infrastructure skills',
      'System administrators transitioning to cloud-native operations',
      'Teams adopting microservices and container-based architectures'
    ],
    modules: [
      {
        id: 'devops-mod-1',
        title: 'Module 1: Docker Mastery & Container Fundamentals',
        lessons: [
          {
            id: 'devops-1-1',
            title: 'Containers vs VMs: Understanding Docker Architecture',
            duration: '13:50',
            durationMinutes: 13.8,
            description: 'How containers use namespaces, cgroups, and union filesystems.',
            previewFree: true
          },
          {
            id: 'devops-1-2',
            title: 'Writing Production Dockerfiles & Multi-Stage Builds',
            duration: '24:20',
            durationMinutes: 24.3,
            description: 'Layer caching, security scanning, and minimal base images.'
          },
          {
            id: 'devops-1-3',
            title: 'Docker Compose for Multi-Service Local Development',
            duration: '20:15',
            durationMinutes: 20.2,
            description: 'Orchestrating databases, caches, and APIs in development.'
          }
        ]
      },
      {
        id: 'devops-mod-2',
        title: 'Module 2: Kubernetes Architecture & Production Deployments',
        lessons: [
          {
            id: 'devops-2-1',
            title: 'Kubernetes Objects: Pods, Deployments, Services & Ingress',
            duration: '28:30',
            durationMinutes: 28.5,
            description: 'Declarative resource management and rolling update strategies.'
          },
          {
            id: 'devops-2-2',
            title: 'Helm Charts & Templated Kubernetes Deployments',
            duration: '22:10',
            durationMinutes: 22.1,
            description: 'Packaging, versioning, and managing application releases.'
          },
          {
            id: 'devops-2-3',
            title: 'GitOps with ArgoCD & Automated Rollbacks',
            duration: '25:40',
            durationMinutes: 25.6,
            description: 'Implementing continuous deployment with Git as single source of truth.'
          }
        ]
      }
    ],
    reviews: [
      {
        id: 'devops-rev-1',
        userName: 'Neha Joshi',
        userAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200',
        rating: 5,
        date: '3 weeks ago',
        comment: 'The best Docker + K8s course out there. Marcus makes even complex networking topics understandable. My team adopted ArgoCD right after I finished this!',
        helpfulCount: 41
      }
    ]
  },
  {
    id: 'social-media-content-strategy',
    title: 'Social Media Marketing & Content Strategy Bootcamp',
    slug: 'social-media-content-strategy',
    headline: 'Build a powerful brand presence on Instagram, LinkedIn, YouTube, and TikTok with data-driven content strategies.',
    description: 'Master the art and science of social media marketing. Learn platform-specific algorithms, content calendar planning, viral content frameworks, community engagement tactics, influencer collaboration strategies, social commerce funnels, and advanced analytics for measuring ROI across all major social platforms.',
    category: 'Digital Marketing',
    level: 'Beginner',
    language: 'English',
    instructor: INSTRUCTORS.alex_rivera,
    rating: 4.87,
    ratingCount: 1420,
    studentsCount: 15800,
    duration: '19h 30m',
    totalLessons: 22,
    price: 2499,
    originalPrice: 6999,
    discountPercentage: 64,
    thumbnail: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=800',
    featured: false,
    bestseller: false,
    trending: true,
    certificateOffered: true,
    lastUpdated: 'July 2026',
    skills: ['Instagram Marketing', 'LinkedIn Growth', 'YouTube SEO', 'TikTok Strategy', 'Content Calendar', 'Community Building', 'Social Analytics'],
    learningOutcomes: [
      'Decode platform algorithms and optimize content for maximum reach',
      'Create a 90-day content calendar with proven viral frameworks',
      'Build engaged communities that convert followers into customers',
      'Run influencer marketing campaigns with measurable ROI',
      'Analyze social metrics and optimize campaigns with data insights'
    ],
    requirements: [
      'Active accounts on at least one social media platform',
      'No prior marketing experience needed'
    ],
    targetAudience: [
      'Small business owners wanting to grow their social presence',
      'Aspiring content creators and influencers',
      'Marketing students looking for practical social media skills'
    ],
    modules: [
      {
        id: 'social-mod-1',
        title: 'Module 1: Platform Algorithms & Content Frameworks',
        lessons: [
          {
            id: 'social-1-1',
            title: 'How Social Algorithms Work: Reach, Engagement & Virality',
            duration: '15:20',
            durationMinutes: 15.3,
            description: 'Understanding content distribution mechanics on each platform.',
            previewFree: true
          },
          {
            id: 'social-1-2',
            title: 'The Content Pillar Strategy & 90-Day Calendar',
            duration: '19:45',
            durationMinutes: 19.7,
            description: 'Planning consistent, diverse content that serves your brand goals.'
          },
          {
            id: 'social-1-3',
            title: 'Viral Content Hooks & Storytelling Frameworks',
            duration: '17:30',
            durationMinutes: 17.5,
            description: 'Psychological triggers and narrative structures that drive shares.'
          }
        ]
      },
      {
        id: 'social-mod-2',
        title: 'Module 2: Growth Tactics & Social Commerce',
        lessons: [
          {
            id: 'social-2-1',
            title: 'Instagram Reels & Carousel Strategy for Growth',
            duration: '22:10',
            durationMinutes: 22.1,
            description: 'Creating thumb-stopping content that converts viewers to followers.'
          },
          {
            id: 'social-2-2',
            title: 'LinkedIn Thought Leadership & B2B Lead Generation',
            duration: '18:40',
            durationMinutes: 18.6,
            description: 'Building authority, newsletter growth, and inbound sales pipelines.'
          },
          {
            id: 'social-2-3',
            title: 'Social Analytics Dashboard & ROI Measurement',
            duration: '20:15',
            durationMinutes: 20.2,
            description: 'Tracking KPIs, attribution models, and reporting for stakeholders.'
          }
        ]
      }
    ],
    reviews: [
      {
        id: 'social-rev-1',
        userName: 'Priya Reddy',
        userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200',
        rating: 5,
        date: '2 weeks ago',
        comment: 'Alex\'s content calendar framework completely transformed my Instagram strategy. Went from 500 to 15K followers in 3 months!',
        helpfulCount: 52
      }
    ]
  },
  {
    id: 'figma-advanced-design-systems',
    title: 'Advanced Design Systems & Multi-Brand Architecture in Figma',
    slug: 'figma-advanced-design-systems',
    headline: 'Architect enterprise-grade design systems with Figma variables, multi-brand theming, token pipelines, and automated documentation.',
    description: 'Level up from individual UI design to architecting scalable design systems used by entire product organizations. This advanced course covers Figma variables and modes, multi-brand token architecture, automated design-to-code token pipelines with Style Dictionary, component API design principles, accessibility-first component libraries, and maintaining design system governance at scale.',
    category: 'UI/UX Design',
    level: 'Advanced',
    language: 'English',
    instructor: INSTRUCTORS.elena_rostova,
    rating: 4.94,
    ratingCount: 1290,
    studentsCount: 8900,
    duration: '22h 40m',
    totalLessons: 22,
    price: 3999,
    originalPrice: 10999,
    discountPercentage: 64,
    thumbnail: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?auto=format&fit=crop&q=80&w=800',
    featured: false,
    bestseller: false,
    certificateOffered: true,
    lastUpdated: 'August 2026',
    skills: ['Design Systems', 'Figma Variables', 'Token Pipelines', 'Style Dictionary', 'Multi-Brand Theming', 'Accessibility', 'Component API Design'],
    learningOutcomes: [
      'Architect token-driven design systems supporting multiple brands and themes',
      'Use Figma variables and modes for light/dark and brand-switching workflows',
      'Build automated design-to-code token pipelines with Style Dictionary',
      'Design accessible, API-first component libraries that scale across teams',
      'Establish design system governance, contribution models, and documentation'
    ],
    requirements: [
      'Intermediate Figma skills (Auto Layout, Components, Variants)',
      'Understanding of basic design principles and color theory'
    ],
    targetAudience: [
      'Senior designers building or maintaining organizational design systems',
      'Design engineers bridging design and frontend development',
      'Product leads standardizing UI consistency across multiple products'
    ],
    modules: [
      {
        id: 'ds-mod-1',
        title: 'Module 1: Token Architecture & Figma Variables',
        lessons: [
          {
            id: 'ds-1-1',
            title: 'Design Token Taxonomy: Primitive, Semantic & Component Tokens',
            duration: '17:30',
            durationMinutes: 17.5,
            description: 'Structuring a three-tier token system for maximum flexibility.',
            previewFree: true
          },
          {
            id: 'ds-1-2',
            title: 'Figma Variables & Modes for Multi-Brand Theming',
            duration: '24:15',
            durationMinutes: 24.2,
            description: 'Setting up brand-switching, dark mode, and responsive breakpoints.'
          },
          {
            id: 'ds-1-3',
            title: 'Style Dictionary: Automated Token-to-Code Pipelines',
            duration: '21:40',
            durationMinutes: 21.6,
            description: 'Exporting tokens to CSS, iOS, and Android codebases automatically.'
          }
        ]
      },
      {
        id: 'ds-mod-2',
        title: 'Module 2: Component API Design & Governance',
        lessons: [
          {
            id: 'ds-2-1',
            title: 'Designing Component APIs: Props, Slots & Composition Patterns',
            duration: '26:20',
            durationMinutes: 26.3,
            description: 'Making components flexible yet constrained for consistent usage.'
          },
          {
            id: 'ds-2-2',
            title: 'Accessibility-First Component Libraries',
            duration: '20:50',
            durationMinutes: 20.8,
            description: 'WCAG compliance, focus management, and screen reader testing.'
          },
          {
            id: 'ds-2-3',
            title: 'Design System Governance & Team Contribution Models',
            duration: '18:10',
            durationMinutes: 18.1,
            description: 'RFC processes, versioning strategies, and change communication.'
          }
        ]
      }
    ],
    reviews: [
      {
        id: 'ds-rev-1',
        userName: 'Sophie Williams',
        userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
        rating: 5,
        date: '1 month ago',
        comment: 'Elena\'s token architecture approach saved our team months of refactoring. The Style Dictionary pipeline chapter is pure gold for design engineers.',
        helpfulCount: 44
      }
    ]
  }
];

export const TESTIMONIALS = [
  {
    id: 'test-1',
    name: 'Jessica Reynolds',
    role: 'Frontend Developer at Stripe',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200',
    collegeOrCompany: 'UC Berkeley Alum',
    rating: 5,
    quote: 'SkillSphere completely transformed my coding journey. Instead of boring slides, building real-world projects helped me land my dream software engineering role in less than 6 months.'
  },
  {
    id: 'test-2',
    name: 'Devon Vance',
    role: 'Digital Marketing Strategist',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
    collegeOrCompany: 'NYU Stern School of Business',
    rating: 5,
    quote: 'As a digital marketing student preparing my final college capstone, SkillSphere gave me actionable frameworks on SEO, ad funnels, and analytics that blew my professors away.'
  },
  {
    id: 'test-3',
    name: 'Amara Okafor',
    role: 'Product Designer at Figma Community',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
    collegeOrCompany: 'Design Tech Institute',
    rating: 5,
    quote: 'The design systems course by Elena is world-class. The structured curriculum and interactive lesson tracking kept me motivated from day one.'
  }
];

export const TRUST_STATS = [
  { label: 'Active Learners', value: '10,000+', icon: 'Users' },
  { label: 'Structured Courses', value: '100+', icon: 'BookOpen' },
  { label: 'Industry Mentors', value: '50+', icon: 'GraduationCap' },
  { label: 'Student Satisfaction', value: '95%', icon: 'Award' }
];

export const WHY_SKILLSPHERE = [
  {
    id: 'why-1',
    title: 'Learn From Top Experts',
    description: 'Courses created and taught by senior engineers, seasoned marketers, and lead product designers at leading tech firms.',
    icon: 'Sparkles',
    badge: 'Expert-Led'
  },
  {
    id: 'why-2',
    title: 'Build Practical Projects',
    description: 'Skip passive lectures. Build real-world portfolio applications, campaigns, and design systems from start to finish.',
    icon: 'Code2',
    badge: 'Hands-On'
  },
  {
    id: 'why-3',
    title: 'Learn at Your Own Pace',
    description: 'Lifetime access to all enrolled courses with automatic progress tracking, resume-where-you-left-off, and offline notes.',
    icon: 'Clock',
    badge: 'Self-Paced'
  },
  {
    id: 'why-4',
    title: 'Career-Focused Skills',
    description: 'Curriculums aligned directly with real job requirements, complete with industry-recognized certificates of completion.',
    icon: 'Briefcase',
    badge: 'Job-Ready'
  }
];

export const HOW_IT_WORKS_STEPS = [
  {
    step: '01',
    title: 'Choose a Course',
    description: 'Browse our curated catalog across development, design, digital marketing, AI, and business.'
  },
  {
    step: '02',
    title: 'Learn & Practice',
    description: 'Watch bite-sized lessons, complete interactive checkpoints, and build real projects.'
  },
  {
    step: '03',
    title: 'Build Your Future',
    description: 'Earn your verified SkillSphere certificate, showcase your portfolio, and accelerate your career.'
  }
];
