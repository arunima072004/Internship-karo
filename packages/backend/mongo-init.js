// MongoDB initialization script for Industry Training Platform
// This script runs when the MongoDB container starts

db = db.getSiblingDB('industry_training_platform');

// Create collections for content management and analytics
db.createCollection('course_content', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['courseId', 'contentType', 'data'],
      properties: {
        courseId: {
          bsonType: 'string',
          description: 'Course ID from PostgreSQL',
        },
        contentType: {
          bsonType: 'string',
          enum: ['video', 'document', 'interactive', 'vr_scenario'],
          description: 'Type of content',
        },
        data: {
          bsonType: 'object',
          description: 'Content data specific to content type',
        },
        metadata: {
          bsonType: 'object',
          description: 'Additional metadata for content',
        },
        createdAt: {
          bsonType: 'date',
          description: 'Creation timestamp',
        },
        updatedAt: {
          bsonType: 'date',
          description: 'Last update timestamp',
        },
      },
    },
  },
});

db.createCollection('learning_analytics', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['userId', 'eventType', 'timestamp'],
      properties: {
        userId: {
          bsonType: 'string',
          description: 'User ID from PostgreSQL',
        },
        eventType: {
          bsonType: 'string',
          enum: [
            'page_view',
            'video_play',
            'video_pause',
            'quiz_attempt',
            'interaction',
          ],
          description: 'Type of learning event',
        },
        eventData: {
          bsonType: 'object',
          description: 'Event-specific data',
        },
        sessionId: {
          bsonType: 'string',
          description: 'Learning session identifier',
        },
        timestamp: {
          bsonType: 'date',
          description: 'Event timestamp',
        },
      },
    },
  },
});

db.createCollection('ai_recommendations', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['userId', 'recommendationType', 'recommendations'],
      properties: {
        userId: {
          bsonType: 'string',
          description: 'User ID from PostgreSQL',
        },
        recommendationType: {
          bsonType: 'string',
          enum: ['course', 'learning_path', 'content', 'skill'],
          description: 'Type of recommendation',
        },
        recommendations: {
          bsonType: 'array',
          description: 'Array of recommendation objects',
        },
        confidence: {
          bsonType: 'double',
          minimum: 0,
          maximum: 1,
          description: 'Confidence score for recommendations',
        },
        generatedAt: {
          bsonType: 'date',
          description: 'When recommendations were generated',
        },
        expiresAt: {
          bsonType: 'date',
          description: 'When recommendations expire',
        },
      },
    },
  },
});

db.createCollection('vr_sessions', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['userId', 'scenarioId', 'sessionData'],
      properties: {
        userId: {
          bsonType: 'string',
          description: 'User ID from PostgreSQL',
        },
        scenarioId: {
          bsonType: 'string',
          description: 'VR scenario identifier',
        },
        sessionData: {
          bsonType: 'object',
          description: 'VR session interaction data',
        },
        performance: {
          bsonType: 'object',
          description: 'Performance metrics for the session',
        },
        startTime: {
          bsonType: 'date',
          description: 'Session start time',
        },
        endTime: {
          bsonType: 'date',
          description: 'Session end time',
        },
      },
    },
  },
});

// Create indexes for better query performance
db.course_content.createIndex({ courseId: 1, contentType: 1 });
db.learning_analytics.createIndex({ userId: 1, timestamp: -1 });
db.learning_analytics.createIndex({ eventType: 1, timestamp: -1 });
db.ai_recommendations.createIndex({ userId: 1, recommendationType: 1 });
db.ai_recommendations.createIndex({ expiresAt: 1 }, { expireAfterSeconds: 0 });
db.vr_sessions.createIndex({ userId: 1, startTime: -1 });

// Create user for application
db.createUser({
  user: 'itp_app_user',
  pwd: 'itp_app_password',
  roles: [
    {
      role: 'readWrite',
      db: 'industry_training_platform',
    },
  ],
});

print('MongoDB initialization completed successfully');
