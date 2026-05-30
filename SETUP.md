# Employee Management System — Full setup guide

## What was built

| Phase | What |
|-------|------|
| **1** | MySQL database `employee_management` (users + tasks) |
| **2** | Node.js API at `backend/` (login, JWT, tasks) |
| **3** | React app calls API instead of mock localStorage |

---

## Step-by-step: start everything

### Step 1 — Start XAMPP MySQL

1. Open **XAMPP Control Panel**
2. Click **Start** next to **MySQL** (green = running)
3. Apache is optional for this project (only needed for phpMyAdmin)

---

### Step 2 — Create the database (one time)

**You do NOT need phpMyAdmin.** phpMyAdmin is only a visual tool. Your project connects directly to **MySQL**.

#### Option A — Easiest (no phpMyAdmin): Node script

1. Start **MySQL** in XAMPP (green next to MySQL)
2. Run:

```bash
cd backend
npm run db:setup
```

You should see: `Database "employee_management" is ready.`

If you see **"already set up"** — that is fine; the database was created on an earlier run.

To wipe everything and recreate: `npm run db:reset`

#### Option B — MySQL Workbench (or any SQL client on your laptop)

1. Install [MySQL Workbench](https://dev.mysql.com/downloads/workbench/) if you don't have it
2. Connect: Host `localhost`, Port `3306`, User `root`, Password *(empty for default XAMPP)*
3. Open `backend/database/01_phase1_schema_and_seed.sql` → execute all (lightning icon)

#### Option C — XAMPP MySQL command line

```powershell
cd C:\xampp\mysql\bin
.\mysql.exe -u root -e "source D:/KRISHNA/DESKTOP/React-course/Employee-Management-System/backend/database/01_phase1_schema_and_seed.sql"
```

(Adjust the path if your project folder is different.)

#### Option D — phpMyAdmin (only if Apache works)

`http://localhost/phpmyadmin` needs **Apache** started in XAMPP.  
404 error = Apache not running, XAMPP not installed, or phpMyAdmin missing — **use Option A instead.**

---

**Using standalone MySQL on your laptop (not XAMPP)?**  
Yes, that works. Update `backend/.env`:

```
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=employee_management
```

Then run `npm run db:setup` from the `backend` folder.

---

### Step 3 — Configure backend (one time)

1. Open folder: `backend/`
2. File `.env` already exists. Edit if your MySQL password is not empty:

```
DB_PASSWORD=your_mysql_password
```

Default XAMPP: user `root`, password empty.

3. Install dependencies:

```bash
cd backend
npm install
```

---

### Step 4 — Start the backend API

```bash
cd backend
npm run dev
```

You should see: `API server running at http://localhost:5000`

Test in browser: `http://localhost:5000/api/health`  
Should show: `{"status":"ok","database":"connected"}`

Keep this terminal open.

---

### Step 5 — Start the React frontend

Open a **second** terminal:

```bash
cd emp-management
npm install
npm run dev
```

Open: `http://localhost:5173`

---

### Step 6 — Log in

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@gmail.com | mi@123 |
| Employee | empganesh@gmail.com | emp1@123 |
| Employee | empsaurav@gmail.com | emp2@123 |

- Admin → `/admin`
- Employee → `/employee` (shows tasks from database)

---

## Daily workflow (after first setup)

You need **3 things running**:

1. XAMPP **MySQL** — Start
2. Backend — `cd backend` → `npm run dev`
3. Frontend — `cd emp-management` → `npm run dev`

---

## API endpoints

| Method | URL | Purpose |
|--------|-----|---------|
| GET | `/api/health` | Check server + DB |
| POST | `/api/auth/login` | Login `{ email, password }` |
| GET | `/api/auth/me` | Current user (needs token) |
| GET | `/api/tasks/my` | Employee tasks |
| GET | `/api/tasks/all` | Admin task list |
| GET | `/api/users/employees` | Admin — list employees for assign dropdown |
| POST | `/api/tasks` | Admin — create task (multipart: fields + files) |
| PATCH | `/api/tasks/:id/status` | Employee — `{ action: "completed" \| "failed" }` |
| GET | `/api/users/employees/:id/workload` | Admin — active task count |
| GET | `/api/notifications` | Dashboard alerts for employee |

**After pulling updates, run once:**
```bash
cd backend
npm install
npm run db:migrate
```
This rebuilds the tasks table (removes dummy tasks) and adds priority, status, tags, attachments, etc.

---

## Troubleshooting

| Problem | Fix |
|---------|-----|
| `database: disconnected` | Start MySQL in XAMPP; run SQL script again |
| Login fails | Check `.env` DB_PASSWORD; verify users table has data |
| CORS error | `CLIENT_URL` in `backend/.env` must be `http://localhost:5173` |
| White admin page | Log in from `/` first; do not open `/admin` directly |
| phpMyAdmin 404 | Skip phpMyAdmin; use `npm run db:setup` in `backend/` folder |
| phpMyAdmin white | Start Apache in XAMPP; or use `npm run db:setup` instead |
