import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { ApolloServer } from 'apollo-server-express';
import { createServer } from 'http';
import { Server as SocketIOServer } from 'socket.io';
import { PrismaClient } from '@prisma/client';
import mongoose from 'mongoose';
import Redis from 'redis';

import { typeDefs } from './graphql/typeDefs';
import { resolvers } from './graphql/resolvers';
import { authRoutes } from './routes/auth';
import { courseRoutes } from './routes/courses';
import { authMiddleware } from './middleware/auth';

// Load environment variables
dotenv.config();

const app = express();
const httpServer = createServer(app);
const io = new SocketIOServer(httpServer, {
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

// Initialize database clients
const prisma = new PrismaClient();
const redis = Redis.createClient({
  url: process.env.REDIS_URL || 'redis://localhost:6379',
  password: process.env.REDIS_PASSWORD,
});

// Middleware
app.use(helmet());
app.use(
  cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
  })
);
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/courses', authMiddleware, courseRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// GraphQL Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }: { req: any }) => ({
    prisma,
    redis,
    user: req.user,
  }),
});

async function startServer() {
  try {
    // Connect to databases
    await prisma.$connect();
    console.log('✅ Connected to PostgreSQL');

    await mongoose.connect(
      process.env.MONGODB_URL ||
        'mongodb://localhost:27017/industry_training_platform'
    );
    console.log('✅ Connected to MongoDB');

    await redis.connect();
    console.log('✅ Connected to Redis');

    // Start Apollo Server
    await server.start();
    server.applyMiddleware({ app: app as any, path: '/graphql' });

    // Socket.IO connection handling
    io.on('connection', socket => {
      console.log('User connected:', socket.id);

      socket.on('join-course', courseId => {
        socket.join(`course-${courseId}`);
        console.log(`User ${socket.id} joined course ${courseId}`);
      });

      socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
      });
    });

    const PORT = process.env.PORT || 4000;
    httpServer.listen(PORT, () => {
      console.log(`🚀 Server ready at http://localhost:${PORT}`);
      console.log(
        `🚀 GraphQL endpoint: http://localhost:${PORT}${server.graphqlPath}`
      );
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('Shutting down gracefully...');
  await prisma.$disconnect();
  await mongoose.disconnect();
  await redis.disconnect();
  process.exit(0);
});

startServer();
