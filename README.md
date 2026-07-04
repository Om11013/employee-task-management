# Employee Task Management System

A full-stack Employee Task Management System built as part of a Full Stack Developer assessment. The application enables administrators to manage employees and tasks while allowing employees to track and update their assigned work.

The project is built using a modern MERN-inspired architecture with React, Express, TypeScript, MySQL, and Prisma in a Turborepo monorepo.

---

## 🚀 Tech Stack

### Frontend

- React
- TypeScript
- React Router
- Redux Toolkit
- TanStack Query
- Tailwind CSS
- React Hook Form

### Backend

- Node.js
- Express.js
- TypeScript
- Prisma ORM
- MySQL
- JWT Authentication
- Multer (File Uploads)

### Development & Tooling

- Turborepo
- ESLint
- Prettier
- Husky
- lint-staged

---

## 📂 Project Structure

```text
employee-task-management/
│
├── apps/
│   ├── client/              # React application
│   └── server/              # Express API
│
├── packages/                # Shared packages/configurations
│
├── docs/
│   ├── database-schema.md
│   ├── backend-architecture.md
│   └── architecture-diagram.drawio
│
├── package.json
├── turbo.json
└── README.md
```

---

## ✨ Features

### Authentication

- User Registration
- User Login
- JWT Authentication
- Remember Me
- Logout
- Role-based Access Control (Admin & Employee)

### Dashboard

#### Admin

- Total Employees
- Total Tasks
- Completed Tasks
- Pending Tasks

#### Employee

- My Tasks
- Completed Tasks
- Pending Tasks
- Overdue Tasks

### Employee Management

- Create Employee
- Update Employee
- Delete Employee
- Search Employees
- Sort Employees
- Pagination

### Task Management

- Create Tasks
- Assign Tasks
- Update Tasks
- Delete Tasks
- View Tasks
- Status Management
- Priority Management

### Notifications

- Task Assigned
- Due Soon
- Task Completed

### File Upload

- PDF
- JPG
- PNG
- Maximum File Size: 5 MB

### Reports

- Completed Tasks
- Pending Tasks
- Employee-wise Tasks
- Export to Excel
- Export to CSV

---

## 🗄 Database

Database: **MySQL**

ORM: **Prisma**

Main Entities:

- Users
- Employees
- Tasks
- Notifications
- Attachments

Refer to `docs/database-schema.md` for the complete schema.

---

## 🏗 Backend Architecture

The backend follows a modular architecture.

```text
src/
│
├── config/
├── modules/
│   ├── auth/
│   ├── employees/
│   ├── tasks/
│   ├── dashboard/
│   ├── reports/
│   └── notifications/
│
├── middleware/
├── routes/
├── shared/
│
├── app.ts
└── server.ts
```

Each module contains:

```text
controller
service
repository
validation
routes
types
```

---

## ⚙️ Installation

### Clone the repository

```bash
git clone <repository-url>
cd employee-task-management
```

### Install dependencies

```bash
npm install
```

### Install dependencies for all workspaces

```bash
npm install --workspaces
```

---

## 🔧 Environment Variables

Create a `.env` file inside `apps/server`.

```env
DATABASE_URL=mysql://root:password@localhost:3306/task_management

JWT_SECRET=your_secret_key

PORT=5000
```

---

## 🛢 Database Setup

Create the database.

```sql
CREATE DATABASE task_management;
```

Generate the Prisma client.

```bash
npx prisma generate
```

Run migrations.

```bash
npx prisma migrate dev
```

---

## ▶️ Running the Project

Start all applications.

```bash
npm run dev
```

Build all applications.

```bash
npm run build
```

---

## 🧹 Code Quality

Run ESLint.

```bash
npm run lint
```

Automatically fix lint issues.

```bash
npm run lint:fix
```

Format the project.

```bash
npm run format
```

---

## 📋 API Modules

### Authentication

- POST /register
- POST /login
- POST /logout

### Employees

- GET /employees
- GET /employees/:id
- POST /employees
- PUT /employees/:id
- DELETE /employees/:id

### Tasks

- GET /tasks
- GET /tasks/:id
- POST /tasks
- PUT /tasks/:id
- DELETE /tasks/:id

### Reports

- GET /reports

---

## 📌 Business Rules

- Email must be unique.
- Password must contain at least 8 characters, one uppercase letter, one lowercase letter, and one number.
- Due Date cannot be earlier than Start Date.
- Completed tasks cannot be edited.
- Employees can only access their own tasks.
- Administrators can access all employees and tasks.

---

## 📄 Deliverables

- Source Code
- Database Schema
- Architecture Diagram
- README
- SQL Script
- Demo Video

---

## 👨‍💻 Author

**Om Poonjani**
