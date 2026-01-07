# Task Distribution System (MERN Stack)

A recruiter-friendly, full-stack app that solves a common ops problem: **take an uploaded work/lead list, validate it, distribute it fairly across agents, and keep assignments stored and accessible**.

---

## What this project does

- **Admin dashboard** to **add / view / delete** agent accounts
- **Upload a list** (CSV/Excel supported server-side) and **distribute tasks evenly**
- **Validation-first pipeline** (required columns + row checks) before storing anything
- **Persisted assignments** stored in **MongoDB** for traceability
- **Authentication** with a JWT stored in an **HTTP-only cookie**

---

## How distribution works

- The server parses the uploaded file and validates:
  - Required columns: `FirstName`, `Phone`, `Notes`
  - Row integrity (name present, phone numeric, notes exists)
- It then loads up to **5 agent users** from MongoDB (`role: 'agent'`).
- Tasks are assigned using a **bucket-based distribution**:
  - Creates 5 equal buckets and distributes rows round-robin into them
  - Buckets are then assigned to available agents (supports 1-5 agents)
  - This ensures balanced workload even with fewer than 5 agents

---

## Tech stack

### Frontend (client)
- React + TypeScript (Vite)
- Tailwind CSS (theme tokens)
- Radix UI primitives (Dialog, Tabs, etc.)
- Zod + React Hook Form for validation
- Sonner for toasts
- Axios (`withCredentials`) for cookie auth

### Backend (server)
- Bun runtime (hot reload)
- Express (API)
- cookie-parser + CORS (credentials)
- Multer for uploads
- csv-parser + xlsx for parsing
- MongoDB via Mongoose
- JWT signing via `jose`

---

## Project structure

- `client/` → React app
- `server/` → Express API (running on Bun)
- `server/uploads/` → uploaded files storage

---

## Running locally

### 1) Start MongoDB
Make sure MongoDB is running locally.

> Current connection string in code: `mongodb://localhost:27017/<DB_NAME>`

### 2) Start the server
```bash
cd server
bun install / bun install --frozen-lockfile (recommended)
bun run dev
```
Server runs on: `http://localhost:3000`

(Optional) Seed demo users (if you want the system to be usable immediately):
```bash
bun run seed
```

### 3) Start the client
```bash
cd client
bun install / bun install --frozen-lockfile (recommended)
bun run dev
```
Client runs on: `http://localhost:5173`

---

## 🔌 API overview

- `POST /api/login` → login and set cookie
- `POST /api/logout` → clear cookie
- `GET /api/dashboard` → authorization check for protected routes
- `POST /api/add-agents` → create agent
- `GET /api/agents` → list agents
- `DELETE /api/delete-agent` → delete agent
- `POST /api/distribution` → upload + validate + distribute

---

## 📄 Sample upload format

The backend expects these column headers **exactly**:

- `FirstName`
- `Phone`
- `Notes`

Tip: there’s a sample file at `client/dummy.csv`.

---

## What I’d highlight in an interview

- Balanced task assignment with a clear, testable strategy (round-robin)
- End-to-end validation: file → schema → database writes
- Secure-by-default auth pattern (HTTP-only cookie)
- Clean separation: controllers/routes/middleware on the server, reusable UI components on the client

---

## Notes

- Server supports **CSV/XLSX/XLS**, but the current client upload UI enforces **CSV only**.
- Distribution works with **1-5 agents** in the database (optimal with 5 for balanced distribution).

---

## 📬 Contact

LinkedIn: https://www.linkedin.com/in/teja21