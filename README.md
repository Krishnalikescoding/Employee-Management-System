# 🗂️ Employee Management System

A responsive Employee Management System built with **React.js** and **Vite**, featuring a clean dark-themed UI for both Admin and Employee dashboards.

---

## ✨ Features

### 👨‍💼 Admin Dashboard
- Create and assign tasks to employees
- View all tasks assigned by you in a scrollable task list
- Track task status — New, Accepted, Completed, Failed

### 👷 Employee Dashboard
- View assigned tasks with urgency levels and due dates
- Task status overview — New, Accepted, Completed, Failed

### 🎨 UI/UX
- Clean dark theme throughout (`#111` / `#1a1a1a`)
- Fully responsive — Desktop, Tablet and Mobile
- Scrollable task list without full page scroll
- Two-column form layout on desktop

---

## 🛠️ Tech Stack

| Technology        | Usage                       |
|-------------------|-----------------------------|
| React.js          | Frontend framework          |
| Vite              | Build tool                  |
| CSS3              | Styling & responsive design |
| React Context API | State management            |

---

## 📁 Project Structure

```
src/
├── assets/
├── components/
│   ├── Auth/
│   │   └── Login.jsx
│   ├── Dashboard/
│   │   ├── AdminDashboard.jsx
│   │   └── EmployeeDashboard.jsx
│   ├── other/
|   |   |__ AdminDashBoardTaskList.jsx
│   │   ├── Header.jsx
│   │   ├── TaskNumber.jsx
│   │   └── CreateTaskForm.jsx
│   └── TaskList/
│       ├── TaskList.jsx
│       ├── NewTask.jsx
│       ├── AcceptTask.jsx
│       ├── CompleteTask.jsx
│       └── FailedTask.jsx
├── context/
        |__ AuthProvider.jsx
├── css/
│   ├── Login.css
│   ├── Header.css
│   ├── TaskNumber.css
│   ├── TaskList.css
│   ├── CreateTaskForm.css
│   └── AdminDashBoardTaskList.css
├── pages/
├── utils/
├── App.jsx
└── main.jsx
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js installed
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/krishnalikescoding/employee-management-system.git
```

2. Navigate to the project folder
```bash
cd emp-management
```

3. Install dependencies
```bash
npm install
```

4. Start the development server
```bash
npm run dev
```

5. Open your browser and visit `http://localhost:5173`

---

## 🔮 Future Plans

- [ ] Backend integration with Node.js + MySQL
- [ ] Authentication with JWT
- [ ] Real-time task updates
- [ ] Email notifications
- [ ] Admin analytics dashboard

---

## 👨‍💻 Author

**Krishna Gupta**
- Portfolio: [krishnaguptadev.netlify.app](https://krishnaguptadev.netlify.app/)
- LinkedIn: [krishna-gupta-169a02370](https://www.linkedin.com/in/krishna-gupta-169a02370/)
- Email: guptakrishnadhananjay@gmail.com
