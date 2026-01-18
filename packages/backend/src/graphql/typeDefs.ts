import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type User {
    id: ID!
    email: String!
    firstName: String
    lastName: String
    profile: UserProfile
    createdAt: String!
  }

  type UserProfile {
    bio: String
    currentRole: String
    experienceLevel: ExperienceLevel!
    location: String
    linkedinProfile: String
    portfolioUrl: String
  }

  type Course {
    id: ID!
    title: String!
    slug: String!
    description: String!
    difficulty: DifficultyLevel!
    estimatedHours: Int!
    enrollmentCount: Int!
    completionRate: Float!
    averageRating: Float!
    status: CourseStatus!
    createdAt: String!
  }

  enum ExperienceLevel {
    BEGINNER
    INTERMEDIATE
    ADVANCED
    EXPERT
  }

  enum DifficultyLevel {
    BEGINNER
    INTERMEDIATE
    ADVANCED
  }

  enum CourseStatus {
    DRAFT
    PUBLISHED
    ARCHIVED
  }

  type Query {
    me: User
    courses: [Course!]!
    course(id: ID!): Course
  }

  type Mutation {
    login(email: String!, password: String!): AuthPayload!
    register(input: RegisterInput!): AuthPayload!
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  input RegisterInput {
    email: String!
    password: String!
    firstName: String!
    lastName: String!
    experienceLevel: ExperienceLevel!
  }
`;
