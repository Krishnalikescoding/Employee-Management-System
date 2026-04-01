export const employees = [
    {
        "id": 1,
        "email": "rahul@gmail.com",
        "password": "123",
        "firstName": "Rahul",
        "tasks": [
            {
                "active": true,
                "newTask": true,
                "completed": false,
                "failed": false,
                "taskTitle": "Build Login Page",
                "taskDescription": "Create a responsive login page with email and password fields matching the dark theme.",
                "taskDate": "2026-04-05",
                "category": "Development"
            },
            {
                "active": true,
                "newTask": false,
                "completed": true,
                "failed": false,
                "taskTitle": "Design Dashboard UI",
                "taskDescription": "Design a clean dark-themed dashboard layout for both admin and employee views.",
                "taskDate": "2026-03-28",
                "category": "Design"
            },
            {
                "active": false,
                "newTask": false,
                "completed": false,
                "failed": true,
                "taskTitle": "Write API Documentation",
                "taskDescription": "Document all REST API endpoints for the employee management system.",
                "taskDate": "2026-03-20",
                "category": "Documentation"
            }
        ]
    },
    {
        "id": 2,
        "email": "priya@gmail.com",
        "password": "123",
        "firstName": "Priya",
        "tasks": [
            {
                "active": true,
                "newTask": true,
                "completed": false,
                "failed": false,
                "taskTitle": "Create Database Schema",
                "taskDescription": "Design and implement the MySQL database schema for storing employee and task data.",
                "taskDate": "2026-04-08",
                "category": "Database"
            },
            {
                "active": true,
                "newTask": false,
                "completed": true,
                "failed": false,
                "taskTitle": "Setup React Project",
                "taskDescription": "Initialize the React + Vite project with folder structure and install required dependencies.",
                "taskDate": "2026-03-15",
                "category": "Development"
            },
            {
                "active": true,
                "newTask": false,
                "completed": true,
                "failed": false,
                "taskTitle": "Design Color Palette",
                "taskDescription": "Finalize the dark theme color palette to be used consistently across all components.",
                "taskDate": "2026-03-18",
                "category": "Design"
            },
            {
                "active": true,
                "newTask": true,
                "completed": false,
                "failed": false,
                "taskTitle": "Implement Context API",
                "taskDescription": "Set up React Context API for global state management of auth and task data.",
                "taskDate": "2026-04-10",
                "category": "Development"
            }
        ]
    },
    {
        "id": 3,
        "email": "amit@gmail.com",
        "password": "123",
        "firstName": "Amit",
        "tasks": [
            {
                "active": true,
                "newTask": false,
                "completed": true,
                "failed": false,
                "taskTitle": "Fix Responsive Issues",
                "taskDescription": "Fix layout breaking issues on mobile and tablet views across all pages.",
                "taskDate": "2026-03-30",
                "category": "Design"
            },
            {
                "active": false,
                "newTask": false,
                "completed": false,
                "failed": true,
                "taskTitle": "Integrate Email Notifications",
                "taskDescription": "Integrate NodeMailer to send email notifications when a task is assigned to an employee.",
                "taskDate": "2026-03-27",
                "category": "Development"
            },
            {
                "active": true,
                "newTask": true,
                "completed": false,
                "failed": false,
                "taskTitle": "Code Review",
                "taskDescription": "Review pull requests from team members and provide constructive feedback.",
                "taskDate": "2026-04-09",
                "category": "Management"
            },
            {
                "active": true,
                "newTask": false,
                "completed": true,
                "failed": false,
                "taskTitle": "Optimize CSS",
                "taskDescription": "Refactor and optimize all CSS files to remove redundant styles and improve performance.",
                "taskDate": "2026-03-19",
                "category": "Design"
            }
        ]
    },
    {
        "id": 4,
        "email": "sneha@gmail.com",
        "password": "123",
        "firstName": "Sneha",
        "tasks": [
            {
                "active": true,
                "newTask": true,
                "completed": false,
                "failed": false,
                "taskTitle": "Create Admin Task List",
                "taskDescription": "Build the admin task list component showing all tasks assigned with status badges.",
                "taskDate": "2026-04-07",
                "category": "Development"
            },
            {
                "active": true,
                "newTask": false,
                "completed": true,
                "failed": false,
                "taskTitle": "Setup Git Repository",
                "taskDescription": "Initialize the Git repository, set up branching strategy and push initial codebase.",
                "taskDate": "2026-03-14",
                "category": "DevOps"
            },
            {
                "active": false,
                "newTask": false,
                "completed": false,
                "failed": true,
                "taskTitle": "Performance Audit",
                "taskDescription": "Run a Lighthouse audit on the app and fix all performance and accessibility issues.",
                "taskDate": "2026-03-26",
                "category": "Testing"
            },
            {
                "active": true,
                "newTask": true,
                "completed": false,
                "failed": false,
                "taskTitle": "Add Form Validation",
                "taskDescription": "Add client-side validation to all forms including login and create task form.",
                "taskDate": "2026-04-11",
                "category": "Development"
            },
            {
                "active": true,
                "newTask": true,
                "completed": false,
                "failed": false,
                "taskTitle": "Implement Logout",
                "taskDescription": "Implement logout functionality that clears context state and redirects to login page.",
                "taskDate": "2026-04-12",
                "category": "Development"
            }
        ]
    },
    {
        "id": 5,
        "email": "vikram@gmail.com",
        "password": "123",
        "firstName": "Vikram",
        "tasks": [
            {
                "active": true,
                "newTask": true,
                "completed": false,
                "failed": false,
                "taskTitle": "Setup CI/CD Pipeline",
                "taskDescription": "Configure GitHub Actions for automated testing and deployment on every push to main.",
                "taskDate": "2026-04-13",
                "category": "DevOps"
            },
            {
                "active": true,
                "newTask": false,
                "completed": true,
                "failed": false,
                "taskTitle": "Design Task Status Badges",
                "taskDescription": "Design color coded status badges for New, Active, Completed and Failed task states.",
                "taskDate": "2026-03-17",
                "category": "Design"
            },
            {
                "active": true,
                "newTask": true,
                "completed": false,
                "failed": false,
                "taskTitle": "Add Dark Mode Toggle",
                "taskDescription": "Implement a toggle to switch between dark and light themes across the entire app.",
                "taskDate": "2026-04-14",
                "category": "Design"
            },
            {
                "active": true,
                "newTask": false,
                "completed": true,
                "failed": false,
                "taskTitle": "Fix Import Errors",
                "taskDescription": "Resolve all broken imports and missing component references across the project.",
                "taskDate": "2026-03-31",
                "category": "Development"
            },
            {
                "active": true,
                "newTask": true,
                "completed": false,
                "failed": false,
                "taskTitle": "Implement Search Filter",
                "taskDescription": "Add a search bar to filter tasks by title or category in the admin task list.",
                "taskDate": "2026-04-15",
                "category": "Development"
            },
            {
                "active": false,
                "newTask": false,
                "completed": false,
                "failed": true,
                "taskTitle": "Write Integration Tests",
                "taskDescription": "Write integration tests for the login flow and task creation flow using React Testing Library.",
                "taskDate": "2026-03-24",
                "category": "Testing"
            }
        ]
    }
]

export const admin = [
    {
        "id": 1,
        "email": "admin@gmail.com",
        "password": "mi@123",
        "firstName": "Admin"
    }
]


export const setLocalStorage = () => {
    localStorage.removeItem('employees')
    localStorage.removeItem('admin')
    localStorage.setItem('employees', JSON.stringify(employees))
    localStorage.setItem('admin', JSON.stringify(admin))
}

export const getLocalStorage = () => {
    const employees = JSON.parse(localStorage.getItem('employees'))
    const admin = JSON.parse(localStorage.getItem('admin'))
    
    return (employees, admin)
}