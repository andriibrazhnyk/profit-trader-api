# ProfitTrader API

A NestJS-based trading platform API with real-time quotes, profit tracking, user authentication, and order management.

## Prerequisites

- Node.js (v22)
- PostgreSQL database
- npm

## Quick Start

### Local Development

#### 1. Install Dependencies

```bash
npm install
```

#### 2. Environment Setup

Create a `.env` file in the root directory:

```bash
# App Configuration
PORT=8000
TYPEORM_LOGGING=false

# Database
TYPEORM_URL=postgresql://username:password@localhost:5432/db_name

# JWT Secret
JWT_SECRET=your-secret-key-here
JWT_ACCESS_TOKEN_TTL=1h

# Quotes
QUOTE_PROVIDER=liveRates
```

#### 3. Run database migrations

```bash
npm run migration:run
```

#### 4. Start Development Server

```bash
npm run start:dev
```

The API will be available at `http://localhost:8000`

### Docker

#### 1. Copy the environment file:

```bash
cp .env.example .env
```

#### 2. Start the application:

```bash
docker-compose up --build
```

#### 3. Run migrations (first time only):

```bash
docker-compose exec app npm run migration:run
```

The API will be available at `http://localhost:8000`

## API Documentation

Once the server is running, visit `http://localhost:8000/docs` for Swagger documentation.

## Project Structure

- `src/auth/` - Authentication and authorization
- `src/users/` - User management
- `src/quotes/` - Quote and rate services
- `src/orders/` - Order management
- `src/config/` - Application configuration

## Quote Providers

You can choose which quote provider to use by setting the `QUOTE_PROVIDER` environment variable in your `.env` file:

- `liveRates` — Fetches real-time quotes from an external API https://live-rates.com (default). It allows only 3 requests per hour.
- `fake` — Returns static, mock quotes for testing and development
