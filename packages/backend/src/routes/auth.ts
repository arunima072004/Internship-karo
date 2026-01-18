import { Router, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import { UserRegistrationSchema, UserLoginSchema, UserProfileUpdateSchema } from '@itp/shared/schemas';
import { authMiddleware } from '../middleware/auth';

const prisma = new PrismaClient();
export const authRoutes = Router();

// JWT configuration
const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret';
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'fallback-refresh-secret';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '15m';
const JWT_REFRESH_EXPIRES_IN = process.env.JWT_REFRESH_EXPIRES_IN || '7d';

// Helper function to generate tokens
const generateTokens = (userId: string, email: string) => {
  const accessToken = jwt.sign(
    { userId, email, type: 'access' },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );
  
  const refreshToken = jwt.sign(
    { userId, email, type: 'refresh' },
    JWT_REFRESH_SECRET,
    { expiresIn: JWT_REFRESH_EXPIRES_IN }
  );
  
  return { accessToken, refreshToken };
};

// User Registration
authRoutes.post('/register', async (req: Request, res: Response) => {
  try {
    // Validate input
    const validatedData = UserRegistrationSchema.parse(req.body);
    
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: validatedData.email }
    });
    
    if (existingUser) {
      return res.status(400).json({
        success: false,
        error: 'User with this email already exists'
      });
    }
    
    // Hash password
    const saltRounds = 12;
    const passwordHash = await bcrypt.hash(validatedData.password, saltRounds);
    
    // Create user
    const user = await prisma.user.create({
      data: {
        email: validatedData.email,
        passwordHash,
        firstName: validatedData.firstName,
        lastName: validatedData.lastName,
        experienceLevel: validatedData.experienceLevel,
        subscriptionStatus: 'FREE',
        lastActive: new Date(),
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        experienceLevel: true,
        subscriptionStatus: true,
        createdAt: true,
      }
    });
    
    // Generate tokens
    const { accessToken, refreshToken } = generateTokens(user.id, user.email);
    
    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: {
        user,
        tokens: {
          accessToken,
          refreshToken,
          expiresIn: JWT_EXPIRES_IN
        }
      }
    });
    
  } catch (error: any) {
    console.error('Registration error:', error);
    
    if (error.name === 'ZodError') {
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: error.errors
      });
    }
    
    res.status(500).json({
      success: false,
      error: 'Internal server error during registration'
    });
  }
});

// User Login
authRoutes.post('/login', async (req: Request, res: Response) => {
  try {
    // Validate input
    const validatedData = UserLoginSchema.parse(req.body);
    
    // Find user
    const user = await prisma.user.findUnique({
      where: { email: validatedData.email },
      select: {
        id: true,
        email: true,
        passwordHash: true,
        firstName: true,
        lastName: true,
        experienceLevel: true,
        subscriptionStatus: true,
        createdAt: true,
      }
    });
    
    if (!user) {
      return res.status(401).json({
        success: false,
        error: 'Invalid email or password'
      });
    }
    
    // Verify password
    const isPasswordValid = await bcrypt.compare(validatedData.password, user.passwordHash);
    
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        error: 'Invalid email or password'
      });
    }
    
    // Update last active
    await prisma.user.update({
      where: { id: user.id },
      data: { lastActive: new Date() }
    });
    
    // Generate tokens
    const { accessToken, refreshToken } = generateTokens(user.id, user.email);
    
    // Remove password hash from response
    const { passwordHash, ...userWithoutPassword } = user;
    
    res.json({
      success: true,
      message: 'Login successful',
      data: {
        user: userWithoutPassword,
        tokens: {
          accessToken,
          refreshToken,
          expiresIn: JWT_EXPIRES_IN
        }
      }
    });
    
  } catch (error: any) {
    console.error('Login error:', error);
    
    if (error.name === 'ZodError') {
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: error.errors
      });
    }
    
    res.status(500).json({
      success: false,
      error: 'Internal server error during login'
    });
  }
});

// Token Refresh
authRoutes.post('/refresh', async (req: Request, res: Response) => {
  try {
    const { refreshToken } = req.body;
    
    if (!refreshToken) {
      return res.status(401).json({
        success: false,
        error: 'Refresh token is required'
      });
    }
    
    // Verify refresh token
    const decoded = jwt.verify(refreshToken, JWT_REFRESH_SECRET) as any;
    
    if (decoded.type !== 'refresh') {
      return res.status(401).json({
        success: false,
        error: 'Invalid token type'
      });
    }
    
    // Check if user still exists
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        experienceLevel: true,
        subscriptionStatus: true,
      }
    });
    
    if (!user) {
      return res.status(401).json({
        success: false,
        error: 'User not found'
      });
    }
    
    // Generate new tokens
    const { accessToken, refreshToken: newRefreshToken } = generateTokens(user.id, user.email);
    
    res.json({
      success: true,
      message: 'Tokens refreshed successfully',
      data: {
        user,
        tokens: {
          accessToken,
          refreshToken: newRefreshToken,
          expiresIn: JWT_EXPIRES_IN
        }
      }
    });
    
  } catch (error: any) {
    console.error('Token refresh error:', error);
    
    if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        error: 'Invalid or expired refresh token'
      });
    }
    
    res.status(500).json({
      success: false,
      error: 'Internal server error during token refresh'
    });
  }
});

// Get Current User Profile
authRoutes.get('/profile', authMiddleware, async (req: any, res: Response) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.userId },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        avatar: true,
        bio: true,
        currentRole: true,
        experienceLevel: true,
        location: true,
        linkedinProfile: true,
        portfolioUrl: true,
        subscriptionStatus: true,
        createdAt: true,
        updatedAt: true,
        lastActive: true,
      }
    });
    
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }
    
    res.json({
      success: true,
      data: { user }
    });
    
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

// Update User Profile
authRoutes.put('/profile', authMiddleware, async (req: any, res: Response) => {
  try {
    // Validate input
    const validatedData = UserProfileUpdateSchema.parse(req.body);
    
    // Update user profile
    const updatedUser = await prisma.user.update({
      where: { id: req.user.userId },
      data: {
        ...validatedData,
        updatedAt: new Date(),
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        avatar: true,
        bio: true,
        currentRole: true,
        experienceLevel: true,
        location: true,
        linkedinProfile: true,
        portfolioUrl: true,
        subscriptionStatus: true,
        updatedAt: true,
      }
    });
    
    res.json({
      success: true,
      message: 'Profile updated successfully',
      data: { user: updatedUser }
    });
    
  } catch (error: any) {
    console.error('Profile update error:', error);
    
    if (error.name === 'ZodError') {
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: error.errors
      });
    }
    
    res.status(500).json({
      success: false,
      error: 'Internal server error during profile update'
    });
  }
});

// Logout (Optional - mainly for client-side token cleanup)
authRoutes.post('/logout', authMiddleware, async (req: any, res: Response) => {
  try {
    // Update last active time
    await prisma.user.update({
      where: { id: req.user.userId },
      data: { lastActive: new Date() }
    });
    
    res.json({
      success: true,
      message: 'Logged out successfully'
    });
    
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error during logout'
    });
  }
});
