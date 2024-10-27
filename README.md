# Catalog Management Dashboard

## Description

This project implements a dashboard for managing client catalogs, allowing users to view, add, update, and delete catalog information.

## Features

- View catalogs in a table
- Add new catalogs
- Update existing catalogs
- Delete catalogs

## Tech Stack

- Frontend:
  - TypeScript + React
  - Vite for build tooling
  - shadcn/ui for pre-built components
  - Tailwind CSS for styling
  - React Query for state management and API calls
- Backend:
  - TypeScript
  - NestJS framework
  - TypeORM for database operations
- Database: MySQL

## Setup and Installation

### Database Setup

1. Install MySQL if you haven't already.
2. Create a new database named `catalog_db`:
   ```sql
   CREATE DATABASE catalog_db;
   USE catalog_db;
   ```
3. The default MySQL username is 'root'. If you need to set a password or use a different user, update the `.env` file in the backend directory with your database credentials.

### Backend

1. Navigate to the backend directory:
   ```
   cd backend
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file in the backend directory:
   ```
   touch .env
   ```
4. Open the `.env` file in a text editor and add the following content, adjusting the values as needed:

   ```
   PORT=3000

   # Database
   DB_HOST=localhost
   DB_PORT=3306
   DB_USERNAME=root
   DB_PASSWORD=your_password
   DB_DATABASE=catalog_db
   ```

   Replace `your_password` with your actual MySQL password.

5. Save the `.env` file.
6. Run database migrations:
   ```
   npm run typeorm migration:run
   ```
7. Start the development server:
   ```
   npm run start:dev
   ```

Note: Make sure to run these queries only in a development or testing environment, not in production.

### Frontend

1. Navigate to the frontend directory:
   ```
   cd frontend
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env.local` file in the frontend directory:
   ```
   touch .env.local
   ```
4. Open the `.env.local` file in a text editor and add the following content:
   ```
   VITE_PORT=3000
   VITE_BASE_URL="http://localhost:${VITE_PORT}/"
   VITE_API_ROUTE="api/catalog"
   ```
5. Save the `.env.local` file.
6. Start the development server:
   ```
   npm run dev
   ```

## API Documentation

The API endpoints are available at `http://localhost:3000/api/catalog`:

- GET `/`: Retrieve all catalogs
- GET `/:id`: Retrieve a specific catalog
- POST `/`: Create a new catalog
- PATCH `/:id`: Update an existing catalog
- DELETE `/:id`: Delete a catalog

## Project Structure

### Backend

The backend is structured following NestJS conventions:

- `src/catalog/`: Contains the main catalog module
  - `entities/`: Database entity definitions
  - `dto/`: Data Transfer Objects for input validation
  - `catalog.controller.ts`: API route definitions
  - `catalog.service.ts`: Business logic implementation
  - `catalog.module.ts`: Module definition

### Frontend

The frontend is organized as follows:

- `src/components/`: Reusable React components
- `src/features/`: Feature-specific components and hooks
- `src/hooks/`: Custom React hooks
- `src/lib/`: Utility functions and shared code
- `src/types/`: TypeScript type definitions

## License

This project is licensed under the GNU Affero General Public License v3.0 (AGPL-3.0) - see the [LICENSE](LICENSE) file for details.
