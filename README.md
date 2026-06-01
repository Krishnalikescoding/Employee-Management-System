# Manthan Workforce — Employee Management System

A full-stack employee task management platform for **Manthan Infotech**. Admins create and assign work; employees track, filter, and update tasks from a responsive dashboard.

Built with **React**, **Node.js**, **Express**, and **MySQL**.

---

## Features

### Admin dashboard
- Create and assign tasks to employees
- Set priority, status, due date/time, category tags, and estimated completion
- Attach files and reference links to tasks
- View all tasks across the team
- Check employee workload before assigning

### Employee dashboard
- View assigned tasks with priority and status badges
- Filter tasks by priority and status
- Mark tasks as **completed** or **failed**
- In-app notification banner for new assignments and reminders
- Task overview counts (todo, in progress, completed, etc.)

### Platform
- JWT authentication with role-based access (`admin` / `employee`)
- Protected routes — admins and employees see separate dashboards
- Optional “stay signed in” (localStorage vs sessionStorage)
- REST API with MySQL persistence
- Responsive UI with a shared design system

---

## Tech stack

| Layer | Technologies |
|-------|----------------|
| **Frontend** | React 19, Vite, React Router, Tailwind CSS 4 |
| **Backend** | Node.js, Express, JWT, Multer |
| **Database** | MySQL |
| **Deployment** | Netlify (frontend), any Node host for API (Render, Railway, etc.) |

---

## Project structure

```
Employee-Management-System/
├── emp-management/          # React frontend (Vite)
│   ├── src/
│   │   ├── api/               # API client
│   │   ├── components/        # UI components
│   │   ├── context/           # AuthProvider
│   │   ├── hooks/             # useTaskFilters, etc.
│   │   └── constants/         # Branding, task options
│   └── netlify.toml
├── backend/                   # Express API + MySQL schema
│   ├── database/
│   │   ├── 01_phase1_schema_and_seed.sql
│   │   └── 02_task_enhancements.sql
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── middleware/
│   │   └── config/
│   └── scripts/               # DB setup & migrations
└── SETUP.md                   # Detailed setup & troubleshooting
```

---

## Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)
- [MySQL](https://www.mysql.com/) — XAMPP, MySQL Workbench, or standalone install
- Git

---

## Getting started

### 1. Clone the repository

```bash
git clone https://github.com/Krishnalikescoding/Employee-Management-System.git
cd Employee-Management-System
```

### 2. Start MySQL

Start the MySQL service (e.g. via **XAMPP Control Panel** → Start **MySQL**).

### 3. Set up the database

```bash
cd backend
npm install
npm run db:setup
```

You should see: `Database "employee_management" is ready.`

To reset everything: `npm run db:reset`  
After pulling schema updates: `npm run db:migrate`

### 4. Configure the backend

Copy the example env file and edit if needed:

```bash
cp .env.example .env
```

Default XAMPP settings use `root` with an empty password. Update `DB_PASSWORD` if yours differs.

```env
PORT=5000
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=
DB_NAME=employee_management
JWT_SECRET=change_this_to_a_long_random_string
CLIENT_URL=http://localhost:5173
```

### 5. Start the API

```bash
npm run dev
```

API runs at **https://manthan-infotech-workforce.onrender.com** (deployed) or **http://localhost:5000** (local `backend/`)

Verify: open **https://manthan-infotech-workforce.onrender.com/api/health** — expect `{"status":"ok","database":"connected"}`

### 6. Start the frontend

In a second terminal:

```bash
cd emp-management
npm install
cp .env.example .env
npm run dev
```

App runs at **http://localhost:5173**

---

## Demo credentials

| Role | Email | Password |
|------|-------|----------|
| Admin | `admin@gmail.com` | `mi@123` |
| Employee | `empganesh@gmail.com` | `emp1@123` |
| Employee | `empsaurav@gmail.com` | `emp2@123` |

- Admin → `/admin`
- Employee → `/employee`

Log in from `/` first. Opening `/admin` or `/employee` directly without a session redirects to login.

---

## Daily workflow

Keep these three things running:

1. **MySQL** service
2. Backend — `cd backend && npm run dev`
3. Frontend — `cd emp-management && npm run dev`

---

## API reference

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| `GET` | `/api/health` | Public | Server and database health check |
| `POST` | `/api/auth/login` | Public | Login with `{ email, password }` |
| `GET` | `/api/auth/me` | Auth | Current user profile |
| `GET` | `/api/tasks/my` | Employee | Tasks assigned to logged-in user |
| `GET` | `/api/tasks/all` | Admin | All tasks |
| `POST` | `/api/tasks` | Admin | Create task (multipart: fields + files) |
| `PATCH` | `/api/tasks/:id/status` | Employee | Update status `{ action: "completed" \| "failed" }` |
| `GET` | `/api/users/employees` | Admin | List employees for assignment |
| `GET` | `/api/users/employees/:id/workload` | Admin | Active task count for an employee |
| `GET` | `/api/notifications` | Auth | Dashboard notifications |
| `PATCH` | `/api/notifications/read` | Auth | Mark notifications as read |

Protected routes require: `Authorization: Bearer <token>`

---

## Deployment

### Frontend (Netlify)

1. Connect the `emp-management` folder (or set build command / publish directory).
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Add environment variable: `VITE_API_URL=https://manthan-infotech-workforce.onrender.com`
5. Redeploy after changing env vars (Vite bakes them in at build time).

SPA routing is handled via `netlify.toml` and `public/_redirects`.

### Backend (Render)

| Setting | Value |
|---------|--------|
| **Root Directory** | `backend` |
| **Build Command** | `npm install` |
| **Start Command** | `npm start` |

Do **not** use `node backend/index.js` — that causes `backend/backend/index.js` not found.

This repo includes [`render.yaml`](./render.yaml) for one-click settings. Set these environment variables on the host:

- `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`
- `JWT_SECRET`
- `CLIENT_URL` — your Netlify URL (comma-separated if you also allow localhost)

---

## Troubleshooting

| Problem | Fix |
|---------|-----|
| `database: disconnected` | Start MySQL; run `npm run db:setup` in `backend/` |
| Login fails | Check `backend/.env` credentials; confirm users exist in DB |
| CORS error | Add your frontend URL to `CLIENT_URL` in `backend/.env` |
| Blank admin/employee page | Log in from `/` first |
| API unreachable from Netlify | Set `VITE_API_URL` to your live API URL and redeploy |

See [SETUP.md](./SETUP.md) for more detailed setup options and troubleshooting.

---

## Scripts

### Frontend (`emp-management/`)

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite dev server |
| `npm run build` | Production build |
| `npm run preview` | Preview production build |

### Backend (`backend/`)

| Command | Description |
|---------|-------------|
| `npm run dev` | Start API with file watching |
| `npm start` | Start API (production) |
| `npm run db:setup` | Create database and seed users |
| `npm run db:reset` | Drop and recreate database |
| `npm run db:migrate` | Apply task schema enhancements |

---

## Author

**Krishna Gupta**

- Portfolio: [krishnaguptadev.netlify.app](https://krishnaguptadev.netlify.app/)
- LinkedIn: [krishna-gupta-169a02370](https://www.linkedin.com/in/krishna-gupta-169a02370/)
- GitHub: [Krishnalikescoding](https://github.com/Krishnalikescoding)
- Email: guptakrishnadhananjay@gmail.com

---

## License

This project was built as a learning / portfolio project. Use and modify freely for educational purposes.
