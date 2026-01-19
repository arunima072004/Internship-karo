# Industry Training Platform

A comprehensive learning ecosystem that bridges the gap between academic education and industry requirements, combining traditional e-learning with cutting-edge technologies including AI personalization, VR/AR experiences, blockchain credentials, and real-time industry integration.

## Architecture

This project follows a microservices architecture with:

- **Frontend**: React 18 with TypeScript, Tailwind CSS, and Framer Motion
- **Backend**: Node.js with Express, GraphQL, and Socket.io
- **Databases**: PostgreSQL (primary), MongoDB (content/analytics), Redis (caching)
- **AI/ML**: TensorFlow.js, OpenAI integration
- **Blockchain**: Ethereum/Polygon for credentials

## Project Structure

```
industry-training-platform/
├── packages/
│   ├── shared/          # Shared types and utilities
│   ├── frontend/        # React web application
│   └── backend/         # Node.js API services
├── docker-compose.yml   # Development environment
└── package.json         # Workspace configuration
```

## Quick Start

### Prerequisites

- Node.js 18+
- Docker and Docker Compose
- npm 9+

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd industry-training-platform
```

2. Install dependencies:
```bash
npm install
```

3. Start the development environment:
```bash
# Start databases
npm run docker:up

# Start development servers
npm run dev
```

4. Set up the database:
```bash
# Run database migrations
npm run db:migrate

# Seed initial data
npm run db:seed
```

### Environment Setup

1. Copy environment files:
```bash
cp packages/backend/.env.example packages/backend/.env
```

2. Update the `.env` file with your configuration values.

## Development

### Available Scripts

- `npm run dev` - Start both frontend and backend in development mode
- `npm run build` - Build all packages for production
- `npm run test` - Run tests across all packages
- `npm run lint` - Lint all packages
- `npm run format` - Format code with Prettier
- `npm run docker:up` - Start development databases
- `npm run docker:down` - Stop development databases

### Database Management

- `npm run db:migrate` - Run Prisma migrations
- `npm run db:seed` - Seed database with initial data
- `npm run generate` - Generate Prisma client

## Services

### Frontend (Port 3000)
- React application with modern UI
- Real-time features with Socket.io
- GraphQL integration with Apollo Client

### Backend (Port 4000)
- REST API endpoints
- GraphQL endpoint at `/graphql`
- WebSocket connections for real-time features

### Databases
- PostgreSQL (Port 5432) - Primary relational data
- MongoDB (Port 27017) - Content and analytics
- Redis (Port 6379) - Caching and sessions
- Adminer (Port 8080) - Database administration

## Features

### Core Learning Platform
- Course catalog and discovery
- Interactive learning content
- Progress tracking and analytics
- Assessment and certification system

### Advanced Features
- AI-powered personalization
- VR/AR learning environments
- Blockchain-verified credentials
- Job placement assistance
- Real-time collaboration

### Technical Features
- Microservices architecture
- Real-time updates with WebSockets
- Comprehensive caching strategy
- Mobile-responsive PWA
- Accessibility compliance

## Testing

The platform uses a dual testing approach:

- **Unit Tests**: Specific examples and integration points
- **Property-Based Tests**: Universal properties across all inputs

Run tests with:
```bash
npm run test
```

## Deployment

### Production Build
```bash
npm run build
```

### Docker Production
```bash
docker-compose -f docker-compose.prod.yml up -d
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support and questions, please open an issue in the GitHub repository.
