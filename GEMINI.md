# ChatIA Project Context

## Project Overview
**ChatIA** is a full-stack multi-channel CRM and WhatsApp marketing platform. It is likely a derivative or customized version of open-source projects like "Whaticket". It allows businesses to manage customer support, create chatbots, and handle marketing campaigns via WhatsApp and other channels.

**Key Features:**
*   **Multi-agent Support:** Manage multiple users and departments.
*   **WhatsApp Integration:** Uses `Baileys` library for direct WhatsApp connection.
*   **Kanban Board:** Ticket management workflow.
*   **Chatbot/Flow Builder:** Visual or logic-based flow for automated responses.
*   **Campaign Management:** Bulk messaging and scheduling.

## Architecture & Tech Stack

### Backend (`/backend`)
*   **Runtime:** Node.js (TypeScript)
*   **Framework:** Express.js
*   **Database:** PostgreSQL (via Sequelize ORM)
*   **Queues:** Redis + Bull (for message sending, campaign processing)
*   **Real-time:** Socket.io (client-server communication)
*   **WhatsApp Lib:** `@whiskeysockets/baileys`
*   **Entry Point:** `src/server.ts` (starts Express and Socket.io)

### Frontend (`/frontend`)
*   **Framework:** React 17
*   **Build Tool:** Craco (Create React App Configuration Override)
*   **UI Library:** Material UI (v4/v5 hybrid), Bootstrap
*   **State Management:** Zustand, React Context
*   **Data Fetching:** React Query
*   **Routing:** React Router DOM v5

### Infrastructure
*   **Containerization:** Docker & Docker Compose
*   **Process Management:** PM2 (via `ecosystem.config.js`) / Docker
*   **Reverse Proxy:** Nginx (inside frontend container)

## Setup & Installation

### Option 1: Automated Docker Setup (Recommended for Production)
The project includes an automated installer script.
```bash
./install.sh
```
This script will:
1.  Check for Docker/Docker Compose.
2.  Prompt for configuration (Company Name, URLs, Passwords).
3.  Generate `.env` files for root and backend.
4.  Build and start containers via `docker-compose`.

### Option 2: Manual Docker Run
Ensure `.env` files are created in root and `backend/` (see `install.sh` logic or `.env.example`).
```bash
docker-compose build
docker-compose up -d
```

### Option 3: Local Development (No Docker)
You will need a local PostgreSQL and Redis instance running.

**1. Backend Setup:**
```bash
cd backend
cp .env.example .env  # Edit .env with local DB/Redis creds
npm install
npm run db:migrate    # Run database migrations
npm run db:seed       # Seed default data (admin user)
npm run dev:server    # Start with ts-node-dev
```

**2. Frontend Setup:**
```bash
cd frontend
cp .env.example .env  # Set REACT_APP_BACKEND_URL
npm install
npm start             # Starts dev server on port 3000 (or next available)
```

## Key Commands

### Backend
| Command | Description |
| :--- | :--- |
| `npm run dev:server` | Start development server with hot-reload. |
| `npm start` | Start production server (compiled JS). |
| `npm run build` | Compile TypeScript to `dist/`. |
| `npm run db:migrate` | Run pending migrations. |
| `npm run db:seed` | Seed database with initial data. |
| `npm test` | Run Jest tests. |

### Frontend
| Command | Description |
| :--- | :--- |
| `npm start` | Start React development server. |
| `npm run build` | Build for production. |

### Docker
| Command | Description |
| :--- | :--- |
| `docker-compose up -d` | Start all services in background. |
| `docker-compose logs -f` | View logs. |
| `docker-compose down` | Stop and remove containers. |

## Directory Structure Highlights

*   **`backend/src/controllers`**: Handles HTTP requests.
*   **`backend/src/services`**: Business logic (WbotServices, TicketServices, etc.).
*   **`backend/src/database`**: Sequelize migrations and seeds.
*   **`backend/src/libs`**: Shared libraries (Socket, Queue, Cache).
*   **`frontend/src/pages`**: React page components.
*   **`frontend/src/components`**: Reusable UI components.
*   **`frontend/src/context`**: Global state contexts (Auth, Toast, etc.).

## Development Conventions

*   **TypeScript:** Backend is strictly typed. Use interfaces/types in `src/models` or local files.
*   **Conventions:**
    *   Services should handle database interactions, not Controllers.
    *   Use `AppError` for error handling in backend.
    *   Frontend uses functional components with Hooks.
*   **Environment:**
    *   `NODE_ENV` controls logging and error details.
    *   Database credentials and JWT secrets must be in `.env`.
