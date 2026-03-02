# SentraERP Frontend

Production-grade ERP frontend for SentraCore LLC - cybersecurity, compliance, risk management, and managed services.

## Tech Stack

- **React 18** with TypeScript
- **Vite** for build tooling
- **Material UI** for component library
- **React Router** for routing
- **Zustand** for state management
- **Axios** for API communication

## Features

- JWT-based authentication with automatic token refresh
- Role-based access control (Admin, Finance, HR, Operations, Compliance)
- Responsive enterprise UI with dark/light theme support
- Feature-based architecture for scalability
- Centralized API client with error handling
- Protected routes and permission guards

## Quick Start

### Prerequisites

- Node.js 18+ and npm/yarn
- Django backend running on `http://localhost:8000`

### Installation

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.development

# Start development server
npm run dev
```

The application will be available at `http://localhost:3000`

### Build for Production

```bash
npm run build
```

Output will be in the `dist/` directory.

## Project Structure

```
src/
├── api/                    # API client and services
│   ├── client.ts          # Axios instance with interceptors
│   ├── endpoints.ts       # API endpoint constants
│   └── services/          # Feature-specific API services
├── components/            # Reusable components
│   ├── common/           # Generic components
│   └── layout/           # Layout components
├── features/             # Feature modules
│   ├── auth/            # Authentication
│   ├── dashboard/       # Main dashboard
│   ├── finance/         # Finance module
│   ├── operations/      # Operations module
│   ├── compliance/      # Compliance module
│   └── users/           # User management
├── hooks/               # Custom React hooks
├── store/               # Zustand stores
├── types/               # TypeScript type definitions
├── utils/               # Utility functions
├── App.tsx             # Root component
├── main.tsx            # Entry point
├── router.tsx          # Route configuration
└── theme.ts            # MUI theme configuration
```

## Environment Variables

Create a `.env.development` file:

```
VITE_API_URL=http://localhost:8000
VITE_API_TIMEOUT=30000
VITE_APP_NAME=SentraERP
```

## Authentication

The app uses JWT authentication with:
- Access tokens (short-lived, stored in localStorage)
- Refresh tokens (longer-lived, stored in sessionStorage)
- Automatic token refresh via Axios interceptors

## Available Modules

- **Dashboard**: Overview of key metrics and system status
- **Finance**: Invoice and payment management (Admin, Finance roles)
- **Operations**: Project and task management (Admin, Operations roles)
- **Compliance**: Audit and risk assessment (Admin, Compliance roles)
- **Users**: User management (Admin only)

## Development

### Adding a New Module

1. Create feature folder in `src/features/[module-name]/`
2. Add module components
3. Create API service in `src/api/services/`
4. Add routes in `src/router.tsx`
5. Add navigation item in `src/components/layout/Sidebar.tsx`

### Code Style

- Use TypeScript strict mode
- Follow Material UI design patterns
- Keep components focused and composable
- Centralize API calls in service layer
- Use Zustand for global state only

## Security Considerations

- Never store sensitive data in localStorage
- All authentication logic handled by backend
- Frontend validates UI flow only
- Role checks enforced at route and component level
- Backend must validate all requests and permissions

## Production Deployment

1. Update `.env.production` with production API URL
2. Run `npm run build`
3. Deploy `dist/` folder to static hosting (Netlify, Vercel, S3, etc.)
4. Configure proxy/CORS on backend for production domain

## Support

For issues or questions, contact the development team at SentraCore LLC.

## License

Proprietary - SentraCore LLC
#
