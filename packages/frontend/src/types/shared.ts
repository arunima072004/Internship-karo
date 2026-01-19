/**
 * Shared types for the frontend application
 * These types were previously imported from @itp/shared
 */

export enum ExperienceLevel {
  BEGINNER = 'BEGINNER',
  INTERMEDIATE = 'INTERMEDIATE', 
  ADVANCED = 'ADVANCED',
  EXPERT = 'EXPERT'
}

export interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  avatar?: string;
  bio?: string;
  currentRole?: string;
  experienceLevel: ExperienceLevel;
  location?: string;
  linkedinProfile?: string;
  portfolioUrl?: string;
  subscriptionStatus: string;
  createdAt: string;
  updatedAt?: string;
  lastActive?: string;
}