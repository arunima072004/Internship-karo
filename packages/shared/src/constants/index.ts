// Application constants for Industry Training Platform

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/api/auth/login',
    REGISTER: '/api/auth/register',
    REFRESH: '/api/auth/refresh',
    LOGOUT: '/api/auth/logout',
    PROFILE: '/api/auth/profile',
  },
  COURSES: {
    BASE: '/api/courses',
    SEARCH: '/api/courses/search',
    ENROLL: '/api/courses/:id/enroll',
    PROGRESS: '/api/courses/:id/progress',
    RECOMMENDATIONS: '/api/courses/recommendations',
  },
  ASSESSMENTS: {
    BASE: '/api/assessments',
    SUBMIT: '/api/assessments/:id/submit',
    RESULTS: '/api/assessments/:id/results',
  },
  CERTIFICATES: {
    BASE: '/api/certificates',
    VERIFY: '/api/certificates/verify/:id',
    DOWNLOAD: '/api/certificates/:id/download',
  },
  JOBS: {
    BASE: '/api/jobs',
    SEARCH: '/api/jobs/search',
    APPLY: '/api/jobs/:id/apply',
    MATCHES: '/api/jobs/matches',
  },
  ANALYTICS: {
    BASE: '/api/analytics',
    LEARNING: '/api/analytics/learning',
    PERFORMANCE: '/api/analytics/performance',
  },
} as const;

export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 20,
  MAX_LIMIT: 100,
} as const;

export const VALIDATION = {
  PASSWORD_MIN_LENGTH: 8,
  USERNAME_MIN_LENGTH: 3,
  USERNAME_MAX_LENGTH: 30,
  BIO_MAX_LENGTH: 500,
  COURSE_TITLE_MAX_LENGTH: 100,
  COURSE_DESCRIPTION_MAX_LENGTH: 1000,
} as const;

export const TIMEOUTS = {
  API_REQUEST: 30000, // 30 seconds
  FILE_UPLOAD: 300000, // 5 minutes
  VIDEO_STREAM: 60000, // 1 minute
} as const;

export const FILE_LIMITS = {
  AVATAR_MAX_SIZE: 5 * 1024 * 1024, // 5MB
  DOCUMENT_MAX_SIZE: 50 * 1024 * 1024, // 50MB
  VIDEO_MAX_SIZE: 500 * 1024 * 1024, // 500MB
  ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/webp'],
  ALLOWED_DOCUMENT_TYPES: [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  ],
  ALLOWED_VIDEO_TYPES: ['video/mp4', 'video/webm', 'video/ogg'],
} as const;

export const CACHE_KEYS = {
  USER_PROFILE: 'user:profile:',
  COURSE_CATALOG: 'courses:catalog',
  COURSE_DETAILS: 'course:details:',
  USER_ENROLLMENTS: 'user:enrollments:',
  RECOMMENDATIONS: 'user:recommendations:',
  ANALYTICS: 'analytics:',
} as const;

export const CACHE_TTL = {
  SHORT: 300, // 5 minutes
  MEDIUM: 1800, // 30 minutes
  LONG: 3600, // 1 hour
  VERY_LONG: 86400, // 24 hours
} as const;

export const SUBSCRIPTION_FEATURES = {
  FREE: ['basic_courses', 'community_access', 'basic_certificates'],
  BASIC: [
    'all_courses',
    'priority_support',
    'advanced_certificates',
    'job_matching',
  ],
  PREMIUM: [
    'ai_personalization',
    'vr_experiences',
    'mentor_access',
    'career_coaching',
    'blockchain_certificates',
  ],
  ENTERPRISE: [
    'custom_content',
    'team_management',
    'advanced_analytics',
    'api_access',
    'dedicated_support',
  ],
} as const;

export const SKILL_CATEGORIES = [
  'Technical',
  'Soft Skills',
  'Leadership',
  'Communication',
  'Project Management',
  'Data Analysis',
  'Design',
  'Marketing',
  'Sales',
  'Finance',
  'Operations',
  'Strategy',
] as const;

export const INDUSTRY_TAGS = [
  'Technology',
  'Healthcare',
  'Finance',
  'Education',
  'Manufacturing',
  'Retail',
  'Consulting',
  'Media',
  'Government',
  'Non-profit',
  'Startup',
  'Enterprise',
] as const;

export const NOTIFICATION_TYPES = {
  COURSE_UPDATE: 'course_update',
  ASSESSMENT_DUE: 'assessment_due',
  CERTIFICATE_EARNED: 'certificate_earned',
  JOB_MATCH: 'job_match',
  MENTOR_MESSAGE: 'mentor_message',
  SYSTEM_ANNOUNCEMENT: 'system_announcement',
} as const;

export const ERROR_CODES = {
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  AUTHENTICATION_ERROR: 'AUTHENTICATION_ERROR',
  AUTHORIZATION_ERROR: 'AUTHORIZATION_ERROR',
  NOT_FOUND: 'NOT_FOUND',
  CONFLICT: 'CONFLICT',
  RATE_LIMIT_EXCEEDED: 'RATE_LIMIT_EXCEEDED',
  INTERNAL_SERVER_ERROR: 'INTERNAL_SERVER_ERROR',
  SERVICE_UNAVAILABLE: 'SERVICE_UNAVAILABLE',
} as const;

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  TOO_MANY_REQUESTS: 429,
  INTERNAL_SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503,
} as const;
