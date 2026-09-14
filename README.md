# Portfolio Website — Full Stack (React + Express)

This repository contains the Assignment 2 React frontend extended with a Node.js/Express backend (Assignment 3), which serves project data and handles contact form submissions.

> **Note on folder naming:** The assignment brief refers to the backend folder as `/server`. In this repository the backend lives in `/backend` instead — functionally identical, just a different folder name.

## Project Structure

```
Portfolio/
├── frontend/          # React + Vite frontend (Assignment 2)
│   ├── src/
│   └── .env.example
└── backend/           # Express backend (Assignment 3)
    ├── backend.js
    ├── routes/
    │   ├── projects.js
    │   └── contact.js
    ├── middleware/
    │   └── errorHandler.js
    ├── data/
    │   ├── projects.js
    │   └── contacts.json
    └── .env.example
```

## Data Storage

This project uses **file-based storage**, not a database:
- Project data is a static JS array in `backend/data/projects.js`.
- Contact form submissions are persisted to `backend/data/contacts.json`, read and written using Node's `fs` module.

No ORM or database was used, per the assignment's constraints — an in-memory/file-based approach was sufficient for this scope.

## Setup & Run Instructions

### Backend

```bash
cd backend
npm install
cp .env.example .env   # then edit values if needed
npm run dev            # starts server with nodemon on the port set in .env
```

The backend runs on `http://localhost:5000` by default.

### Frontend

```bash
cd frontend
npm install
cp .env.example .env   # then edit values if needed
npm run dev            # starts Vite dev server
```

The frontend runs on `http://localhost:5173` by default.

**Both servers must be running simultaneously** for the app to work — the frontend fetches live data from the backend.

## Environment Variables

### backend/.env.example
```
PORT=5000
CORS_ORIGIN=http://localhost:5173
```

- `PORT` — port the Express server listens on.
- `CORS_ORIGIN` — the exact origin (protocol + host + port) allowed to make cross-origin requests. Must match the frontend's dev server URL exactly, or requests will be blocked by the browser's CORS policy.

### frontend/.env.example
```
VITE_API_URL=http://localhost:5000/api
```

- `VITE_API_URL` — base URL the frontend uses to reach the backend API.

No secrets are committed in either `.env` file — only `.env.example` templates are tracked in git.

## API Endpoints

### `GET /`
Health check.

**Response — 200**
```json
{ "status": "ok" }
```

---

### `GET /api/projects`
Returns all projects.

**Response — 200**
```json
[
  {
    "id": "portfolio",
    "title": "Portfolio Website",
    "description": "A responsive personal portfolio website...",
    "techStack": ["HTML", "CSS", "JavaScript"],
    "image": "/images/w1.jpg",
    "github": "#",
    "live": "#"
  }
]
```

---

### `GET /api/projects/:id`
Returns a single project by id.

**Success — 200**
```json
{
  "id": "weather",
  "title": "Weather App",
  "description": "A weather forecasting application...",
  "techStack": ["HTML", "CSS", "JavaScript"],
  "image": "/images/w3.jpg",
  "github": "#",
  "live": "#"
}
```

**Failure — 404** (unknown id)
```json
{ "error": "Project not found" }
```

---

### `POST /api/contact`
Accepts and stores a contact form submission.

**Request body**
```json
{
  "name": "Revati Gite",
  "email": "revati@example.com",
  "message": "Hello, I'd like to connect."
}
```

**Success — 201**
```json
{
  "message": "Message submitted successfully!",
  "submission": {
    "id": "1758012345678",
    "name": "Revati Gite",
    "email": "revati@example.com",
    "message": "Hello, I'd like to connect.",
    "submittedAt": "2026-09-14T12:34:56.789Z"
  }
}
```

**Failure — 400** (examples)
```json
{ "error": "Name is required" }
```
```json
{ "error": "Enter a valid email" }
```
```json
{ "error": "Message is required" }
```

---

### `GET /api/contact`
Returns all stored contact submissions.

> ⚠️ **This endpoint is intentionally open with no authentication**, as permitted by the assignment for verification purposes only. It should not be exposed without auth in a real production deployment.

**Response — 200**
```json
[
  {
    "id": "1758012345678",
    "name": "Revati Gite",
    "email": "revati@example.com",
    "message": "Hello, I'd like to connect.",
    "submittedAt": "2026-09-14T12:34:56.789Z"
  }
]
```

---

### `GET /api/anything-undefined`
Any undefined route.

**Response — 404**
```json
{ "error": "Route /api/anything-undefined not found" }
```

## Error Handling

- A catch-all `notFound` middleware returns a JSON 404 for any route that doesn't match a defined endpoint.
- A global `errorHandler` middleware catches thrown/unhandled errors, logs them server-side, and always returns a JSON error body (never a raw HTML stack trace) with an appropriate status code. The server continues running after an error.

## CORS

CORS is enabled via the `cors` npm package, restricted to the origin set in `CORS_ORIGIN` in `backend/.env`. This must exactly match the frontend's dev server URL (protocol, host, and port) or the browser will block requests with a CORS error.

## API Testing

All 7 backend behaviors (health check, list projects, single project success/failure, contact submit success/failure, list submissions, undefined route) are covered by curl commands in [`api-tests.md`](./api-tests.md), including failure cases for each validated endpoint.

## AI Assistance Disclosure

Per the assignment's academic integrity policy, the following AI-assisted debugging was used and is disclosed here:
- Used Claude (Anthropic) to debug a CORS misconfiguration where `CORS_ORIGIN` in the backend `.env` did not match the frontend's actual dev server port, causing all API requests to be blocked.
- Used Claude to fix a `.gitignore` issue where the frontend's `.gitignore` did not exclude `.env`, and to correctly untrack an already-committed `.env` file and `contacts.json` from git history using `git rm --cached`.
- Used Claude to troubleshoot an `npm run dev` `ENOENT` error caused by running the command from the wrong directory.
- No full solution code (routes, components, or business logic) was generated by AI — all backend routes, validation logic, and React data-fetching code were written independently.
