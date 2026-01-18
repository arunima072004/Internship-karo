import { z } from 'zod';
import {
  ExperienceLevel,
  DifficultyLevel,
  LessonType,
  AssessmentType,
} from '../types';

// User schemas
export const UserRegistrationSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  experienceLevel: z.nativeEnum(ExperienceLevel),
});

export const UserLoginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

export const UserProfileUpdateSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  bio: z.string().optional(),
  currentRole: z.string().optional(),
  location: z.string().optional(),
  linkedinProfile: z.string().url().optional(),
  portfolioUrl: z.string().url().optional(),
});

// Course schemas
export const CourseCreationSchema = z.object({
  title: z.string().min(1, 'Course title is required'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  longDescription: z.string().optional(),
  difficulty: z.nativeEnum(DifficultyLevel),
  estimatedHours: z.number().positive('Estimated hours must be positive'),
  language: z.string().default('en'),
  skillsTargeted: z
    .array(z.string())
    .min(1, 'At least one skill must be targeted'),
});

export const ModuleCreationSchema = z.object({
  title: z.string().min(1, 'Module title is required'),
  description: z.string().optional(),
  orderIndex: z.number().int().nonnegative(),
  estimatedDuration: z.number().positive('Duration must be positive'),
});

export const LessonCreationSchema = z.object({
  title: z.string().min(1, 'Lesson title is required'),
  type: z.nativeEnum(LessonType),
  duration: z.number().positive('Duration must be positive'),
  orderIndex: z.number().int().nonnegative(),
  isOptional: z.boolean().default(false),
  content: z.object({
    type: z.nativeEnum(LessonType),
    data: z.any(),
    metadata: z.record(z.any()).optional(),
  }),
});

// Assessment schemas
export const AssessmentCreationSchema = z.object({
  title: z.string().min(1, 'Assessment title is required'),
  description: z.string().optional(),
  type: z.nativeEnum(AssessmentType),
  passingScore: z.number().int().min(0).max(100),
  maxAttempts: z.number().int().positive().default(3),
  timeLimit: z.number().int().positive().optional(),
  isProctored: z.boolean().default(false),
});

export const QuestionSchema = z.object({
  type: z.enum([
    'MULTIPLE_CHOICE',
    'TRUE_FALSE',
    'SHORT_ANSWER',
    'ESSAY',
    'CODE',
  ]),
  question: z.string().min(1, 'Question text is required'),
  options: z.array(z.string()).optional(),
  correctAnswer: z.union([z.string(), z.array(z.string())]),
  explanation: z.string().optional(),
  points: z.number().positive().default(1),
});

// Search and filter schemas
export const CourseSearchSchema = z.object({
  query: z.string().optional(),
  difficulty: z.nativeEnum(DifficultyLevel).optional(),
  skills: z.array(z.string()).optional(),
  duration: z
    .object({
      min: z.number().optional(),
      max: z.number().optional(),
    })
    .optional(),
  rating: z.number().min(1).max(5).optional(),
  page: z.number().int().positive().default(1),
  limit: z.number().int().positive().max(50).default(20),
});

// Enrollment schemas
export const EnrollmentSchema = z.object({
  courseId: z.string().cuid('Invalid course ID'),
});

// Progress tracking schemas
export const ProgressUpdateSchema = z.object({
  lessonId: z.string().cuid('Invalid lesson ID'),
  timeSpent: z.number().nonnegative('Time spent cannot be negative'),
  completed: z.boolean().default(false),
});

// Assessment submission schemas
export const AssessmentSubmissionSchema = z.object({
  assessmentId: z.string().cuid('Invalid assessment ID'),
  answers: z.array(
    z.object({
      questionId: z.string(),
      answer: z.union([z.string(), z.array(z.string())]),
    })
  ),
});

// API response schemas
export const ApiResponseSchema = z.object({
  success: z.boolean(),
  data: z.any().optional(),
  error: z.string().optional(),
  message: z.string().optional(),
});

export const PaginatedResponseSchema = z.object({
  data: z.array(z.any()),
  pagination: z.object({
    page: z.number(),
    limit: z.number(),
    total: z.number(),
    totalPages: z.number(),
  }),
});

// Export types inferred from schemas
export type UserRegistration = z.infer<typeof UserRegistrationSchema>;
export type UserLogin = z.infer<typeof UserLoginSchema>;
export type UserProfileUpdate = z.infer<typeof UserProfileUpdateSchema>;
export type CourseCreation = z.infer<typeof CourseCreationSchema>;
export type ModuleCreation = z.infer<typeof ModuleCreationSchema>;
export type LessonCreation = z.infer<typeof LessonCreationSchema>;
export type AssessmentCreation = z.infer<typeof AssessmentCreationSchema>;
export type CourseSearch = z.infer<typeof CourseSearchSchema>;
export type Enrollment = z.infer<typeof EnrollmentSchema>;
export type ProgressUpdate = z.infer<typeof ProgressUpdateSchema>;
export type AssessmentSubmission = z.infer<typeof AssessmentSubmissionSchema>;
export type ApiResponse = z.infer<typeof ApiResponseSchema>;
export type PaginatedResponse = z.infer<typeof PaginatedResponseSchema>;
