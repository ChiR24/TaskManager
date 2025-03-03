
# Task Manager Application

A full-stack task management application built with Express, React, and PostgreSQL.

## Features

- Create, read, update, and delete tasks
- Mark tasks as completed
- Responsive UI with modern design

## Tech Stack

### Backend
- Node.js with Express
- TypeScript
- Drizzle ORM
- PostgreSQL database

### Frontend
- React
- TypeScript
- Tailwind CSS
- Shadcn UI components
- React Query for data fetching

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- PostgreSQL database

### Installation

1. Clone the repository:
```bash
git clone <your-repository-url>
```

2. Install dependencies:
```bash
npm install
```

3. Set up your database:
```bash
npm run db:push
```

### Development

Run the development server:
```bash
npm run dev
```

This will start both the backend API server and frontend development server concurrently using Vite.

### Production Build

Build the application:
```bash
npm run build
```

Start the production server:
```bash
npm run start
```

## API Endpoints

| Method | Endpoint       | Description          |
|--------|----------------|----------------------|
| GET    | /api/tasks     | Get all tasks        |
| POST   | /api/tasks     | Create a new task    |
| PATCH  | /api/tasks/:id | Update a task by ID  |
| DELETE | /api/tasks/:id | Delete a task by ID  |

## Project Structure

```
├── client/             # Frontend code
│   ├── src/
│   │   ├── components/ # React components
│   │   ├── pages/      # Page components
│   │   ├── lib/        # Utility functions
│   │   └── main.tsx    # Entry point
├── server/             # Backend code
│   ├── index.ts        # Express server setup
│   ├── routes.ts       # API routes
│   ├── storage.ts      # Database operations
│   └── db.ts           # Database connection
└── shared/             # Shared code
    └── schema.ts       # Database schema
```

## License

MIT
