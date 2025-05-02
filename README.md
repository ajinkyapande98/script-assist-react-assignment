# React Todo App with Star Wars API Integration

A modern, responsive React application with authentication and Star Wars API integration.

## Features

### Todo Management
- Add, edit, and delete todos
- Mark todos as completed
- Filter to view only completed todos
- Responsive design for all device sizes
- Persistent storage using localStorage

### Authentication
- Login with username/password
- Access control for protected routes
- Persistent login state across sessions
- User profile display

### Star Wars API Integration
- List of Star Wars characters with pagination
- Search functionality for finding characters
- Detailed view of character information
- Integration with films data for enriched content
- Deep linking for sharing character profiles

## Technologies Used

- **React 18** with TypeScript for type safety
- **Vite** for fast development and optimized production builds
- **Zustand** for state management with persistence
- **React Query** for data fetching and caching
- **Mantine UI** for beautiful, accessible components
- **React Router** for navigation and deep linking
- **SWAPI** (Star Wars API) for character and film data
- **SASS** for styling
- **Tabler Icons** for consistent iconography

## Getting Started

### Demo Users
- Username: `demo`, Password: `password`
- Username: `test`, Password: `test123`

### Development

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Start the development server:
   ```
   npm run dev
   ```
4. Build for production:
   ```
   npm run build
   ```

## Project Structure

- `src/components/` - Reusable UI components
- `src/pages/` - Application pages
- `src/store/` - Zustand store for state management
- `src/api/` - API integration with SWAPI
- `src/theme/` - Mantine theme configuration

## Screenshots

_Add screenshots of your application here_

## Deployment

This application can be easily deployed to platforms like Vercel, Netlify, or Render.

## License

MIT

## Author

_Your Name_ 