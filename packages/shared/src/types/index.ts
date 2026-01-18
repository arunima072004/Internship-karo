// Core domain types for Industry Training Platform

export interface User {
  id: string;
  email: string;
  profile: UserProfile;
  preferences: UserPreferences;
  subscription: Subscription;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserProfile {
  firstName?: string;
  lastName?: string;
  avatar?: string;
  bio?: string;
  currentRole?: string;
  experienceLevel: ExperienceLevel;
  careerGoals: CareerGoal[];
  location?: string;
  linkedinProfile?: string;
  portfolioUrl?: string;
}

export interface UserPreferences {
  learningStyle: LearningStyle;
  notificationSettings: NotificationSettings;
  privacySettings: PrivacySettings;
  accessibilityNeeds: AccessibilitySettings;
}

export interface Course {
  id: string;
  title: string;
  slug: string;
  description: string;
  longDescription?: string;
  instructor: Instructor;
  modules: Module[];
  skillsTargeted: Skill[];
  difficulty: DifficultyLevel;
  estimatedHours: number;
  language: string;
  pricing: CoursePricing;
  ratings: CourseRating;
  enrollmentCount: number;
  completionRate: number;
  lastUpdated: Date;
  status: CourseStatus;
}

export interface Module {
  id: string;
  courseId: string;
  title: string;
  description?: string;
  orderIndex: number;
  lessons: Lesson[];
  estimatedDuration: number;
}

export interface Lesson {
  id: string;
  moduleId: string;
  title: string;
  type: LessonType;
  content: LessonContent;
  duration: number;
  orderIndex: number;
  isOptional: boolean;
}

export interface Assessment {
  id: string;
  courseId: string;
  title: string;
  description?: string;
  type: AssessmentType;
  questions: Question[];
  passingScore: number;
  maxAttempts: number;
  timeLimit?: number;
  isProctored: boolean;
}

export interface Certificate {
  id: string;
  userId: string;
  courseId: string;
  credentialId: string;
  issueDate: Date;
  expirationDate?: Date;
  blockchainHash?: string;
  verificationUrl: string;
  skills: CertifiedSkill[];
  status: CertificateStatus;
}

// Enums
export enum ExperienceLevel {
  BEGINNER = 'BEGINNER',
  INTERMEDIATE = 'INTERMEDIATE',
  ADVANCED = 'ADVANCED',
  EXPERT = 'EXPERT',
}

export enum DifficultyLevel {
  BEGINNER = 'BEGINNER',
  INTERMEDIATE = 'INTERMEDIATE',
  ADVANCED = 'ADVANCED',
}

export enum SubscriptionStatus {
  FREE = 'FREE',
  BASIC = 'BASIC',
  PREMIUM = 'PREMIUM',
  ENTERPRISE = 'ENTERPRISE',
}

export enum CourseStatus {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED',
  ARCHIVED = 'ARCHIVED',
}

export enum LessonType {
  VIDEO = 'VIDEO',
  TEXT = 'TEXT',
  INTERACTIVE = 'INTERACTIVE',
  QUIZ = 'QUIZ',
  ASSIGNMENT = 'ASSIGNMENT',
  LIVE_SESSION = 'LIVE_SESSION',
}

export enum AssessmentType {
  QUIZ = 'QUIZ',
  ASSIGNMENT = 'ASSIGNMENT',
  PROJECT = 'PROJECT',
  PRACTICAL = 'PRACTICAL',
  CERTIFICATION = 'CERTIFICATION',
}

export enum CertificateStatus {
  ACTIVE = 'ACTIVE',
  EXPIRED = 'EXPIRED',
  REVOKED = 'REVOKED',
}

export enum SkillLevel {
  BEGINNER = 'BEGINNER',
  INTERMEDIATE = 'INTERMEDIATE',
  ADVANCED = 'ADVANCED',
  EXPERT = 'EXPERT',
}

// Supporting interfaces
export interface LearningStyle {
  visualPreference: number;
  auditoryPreference: number;
  kinestheticPreference: number;
  readingPreference: number;
  pacePreference: PaceType;
  complexityTolerance: number;
}

export interface Instructor {
  id: string;
  name: string;
  bio: string;
  expertise: string[];
  rating: number;
  avatar?: string;
}

export interface Skill {
  id: string;
  name: string;
  description?: string;
  category: string;
  industryRelevance: string[];
}

export interface Question {
  id: string;
  type: QuestionType;
  question: string;
  options?: string[];
  correctAnswer: string | string[];
  explanation?: string;
  points: number;
}

export interface CertifiedSkill {
  skillId: string;
  level: SkillLevel;
  verifiedAt: Date;
}

export interface CareerGoal {
  id: string;
  title: string;
  description: string;
  targetDate?: Date;
  priority: Priority;
}

export interface CoursePricing {
  type: PricingType;
  amount?: number;
  currency?: string;
  subscriptionTier?: SubscriptionStatus;
}

export interface CourseRating {
  average: number;
  count: number;
  distribution: RatingDistribution;
}

export interface LessonContent {
  type: LessonType;
  data: any; // Content-specific data structure
  metadata?: Record<string, any>;
}

export interface NotificationSettings {
  email: boolean;
  push: boolean;
  sms: boolean;
  courseUpdates: boolean;
  assessmentReminders: boolean;
  jobAlerts: boolean;
}

export interface PrivacySettings {
  profileVisibility: VisibilityLevel;
  showProgress: boolean;
  showCertifications: boolean;
  allowRecommendations: boolean;
}

export interface AccessibilitySettings {
  screenReader: boolean;
  highContrast: boolean;
  largeText: boolean;
  keyboardNavigation: boolean;
  closedCaptions: boolean;
}

export interface Subscription {
  status: SubscriptionStatus;
  startDate: Date;
  endDate?: Date;
  autoRenew: boolean;
  features: string[];
}

// Additional enums
export enum PaceType {
  SLOW = 'SLOW',
  NORMAL = 'NORMAL',
  FAST = 'FAST',
}

export enum QuestionType {
  MULTIPLE_CHOICE = 'MULTIPLE_CHOICE',
  TRUE_FALSE = 'TRUE_FALSE',
  SHORT_ANSWER = 'SHORT_ANSWER',
  ESSAY = 'ESSAY',
  CODE = 'CODE',
}

export enum Priority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
}

export enum PricingType {
  FREE = 'FREE',
  ONE_TIME = 'ONE_TIME',
  SUBSCRIPTION = 'SUBSCRIPTION',
}

export enum VisibilityLevel {
  PUBLIC = 'PUBLIC',
  PRIVATE = 'PRIVATE',
  CONNECTIONS = 'CONNECTIONS',
}

export interface RatingDistribution {
  1: number;
  2: number;
  3: number;
  4: number;
  5: number;
}
