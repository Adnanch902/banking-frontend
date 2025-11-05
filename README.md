# Banking Frontend Application

A modern React-based web application for managing banking customers, accounts, and transactions. Built with React, React Bootstrap, and integrated with a Spring Boot backend API.

## Features

- **Customer Management**: Create and inquire customer information
- **Account Operations**: Create accounts, deposit, withdraw, and close accounts
- **Transaction History**: View detailed transaction history for any account
- **Customer Overview**: View all customers with their associated accounts
- **Modern UI**: Responsive design using React Bootstrap
- **Error Handling**: Comprehensive error boundaries and user-friendly error messages
- **Toast Notifications**: Real-time feedback for user actions
- **Accessibility**: ARIA labels and keyboard navigation support

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Access to the backend banking API (default: `http://localhost:8080/api`)

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd banking-frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory (see Environment Variables section)

4. Start the development server:
```bash
npm start
```

The application will open at [http://localhost:3000](http://localhost:3000)

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# API Configuration
REACT_APP_API_BASE_URL=http://localhost:8080/api

# Authentication (for auto-login feature)
REACT_APP_AUTH_USERNAME=admin
REACT_APP_AUTH_PASSWORD=adminpass
```

**Note**: For production, set these via your deployment platform's environment variables. Never commit actual credentials to version control.

## Available Scripts

### `npm start`
Runs the app in development mode at [http://localhost:3000](http://localhost:3000). The page will reload automatically when you make changes.

### `npm test`
Launches the test runner in interactive watch mode. Run with `--watchAll=false` to run tests once.

### `npm run build`
Builds the app for production to the `build` folder. The build is optimized and minified for best performance.

### `npm run eject`
**Note: This is a one-way operation!** Ejects from Create React App to get full control over configuration.

## Project Structure

```
banking-frontend/
├── public/                 # Static files
├── src/
│   ├── components/        # React components
│   │   ├── Account.js     # Account operations
│   │   ├── AccountHistory.js
│   │   ├── CreateCustomer.js
│   │   ├── CustomersWithAccounts.js
│   │   ├── EmptyState.js  # Reusable empty state
│   │   ├── ErrorBoundary.js
│   │   ├── Home.js
│   │   ├── InquireCustomer.js
│   │   ├── Loading.js     # Loading component
│   │   ├── NotFound.js    # 404 page
│   │   └── ToastContainer.js # Toast notifications
│   ├── constants/         # Constants and configuration
│   │   └── index.js
│   ├── hooks/             # Custom React hooks
│   │   ├── useAccountHistory.js
│   │   ├── useAccountOperations.js
│   │   └── useCreateCustomer.js
│   ├── services/          # API services
│   │   └── customerApi.js
│   ├── utils/             # Utility functions
│   │   ├── errorHandler.js
│   │   ├── formatters.js
│   │   └── validation.js
│   ├── App.js             # Main app component
│   └── index.js           # Entry point
├── .env.example           # Environment variables template
├── Dockerfile             # Docker configuration
└── package.json
```

## API Integration

The application communicates with a Spring Boot backend API. All API calls are centralized in `src/services/customerApi.js`.

### Endpoints Used

- `POST /api/auth/login` - Authentication
- `POST /api/customers` - Create customer
- `GET /api/customers/{id}` - Get customer
- `GET /api/customers/all` - Get all customers with accounts
- `POST /api/accounts` - Create account
- `POST /api/accounts/close/{number}` - Inquire account
- `POST /api/accounts/deposit` - Deposit funds
- `POST /api/accounts/withdraw` - Withdraw funds
- `POST /api/accounts/close/{number}` - Close account
- `GET /api/accounts/{number}` - Get transaction history

### Authentication

The application uses JWT (JSON Web Tokens) for authentication. Tokens are automatically attached to API requests via Axios interceptors. If no token exists, the app automatically authenticates using configured credentials.

## Development Guidelines

### Code Style

- Use functional components with hooks
- Follow React best practices
- Use PropTypes for type checking
- Implement proper error handling
- Add loading states for async operations

### Adding New Features

1. Create components in `src/components/`
2. Add API calls to `src/services/customerApi.js`
3. Create custom hooks in `src/hooks/` for reusable logic
4. Add constants to `src/constants/index.js`
5. Add utility functions to `src/utils/`

### Testing

Write tests for:
- Component rendering
- User interactions
- Form validation
- API calls (mocked)

Example:
```bash
npm test -- --watchAll=false --coverage
```

## Docker Deployment

### Build Docker Image
```bash
docker build -f src/Dockerfile -t banking-frontend .
```

### Run Container
```bash
docker run -p 80:80 \
  -e REACT_APP_API_BASE_URL=http://your-api-url/api \
  banking-frontend
```

The Dockerfile uses a multi-stage build:
1. Build stage: Compiles the React app
2. Production stage: Serves via nginx

## CI/CD

The project includes a GitHub Actions workflow (`.github/workflows/ci-cd.yml`) that:
- Runs tests
- Builds the Docker image
- Pushes to GitHub Container Registry (GHCR)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Create a feature branch
2. Make your changes
3. Add tests if applicable
4. Submit a pull request

## License

[Add your license here]

## Support

For issues and questions, please open an issue on the repository.
