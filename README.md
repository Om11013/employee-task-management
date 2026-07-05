# Employee Task Management System

A full-stack Employee Task Management System built with React, Express, TypeScript, MySQL, and Prisma in a Turborepo monorepo. It features role-based access control, comprehensive task tracking, employee management, real-time notifications, file attachments, and reporting.

---

## 🚀 Tech Stack

- **Frontend**: React, TypeScript, React Router, Redux Toolkit, TanStack Query, Tailwind CSS, React Hook Form
- **Backend**: Node.js, Express.js, TypeScript, Prisma ORM, MySQL, JWT Authentication, Multer
- **Tooling**: Turborepo, ESLint, Prettier, Husky, lint-staged

---

## ⚙️ Setup & Installation

### 1. Prerequisites

- **Node.js** (v24.14.0 or matching Prisma requirements: `20.19+`, `22.12+`, `24.0+`)
- **MySQL** Server

### 2. Clone and Install Dependencies

```bash
git clone <repository-url>
cd employee-task-management

# Install dependencies for all workspaces
npm install
```

### 3. Environment Configuration

Create a `.env` file in `apps/server`:

```env
DATABASE_URL=mysql://root:password@localhost:3306/task_management
JWT_SECRET=your_secret_key
PORT=3000
```

### 4. Database Initialization

Run the following commands to create the database schema and generate the Prisma client:

```bash
# Enter the server workspace
cd apps/server

# Push the schema to the database (or use migrate dev)
npx prisma db push

# Generate Prisma Client
npx prisma generate
```

### 5. Running the Application

Return to the root directory to start the monorepo:

```bash
cd ../..
npm run dev
```

- **Frontend**: Runs on `http://localhost:5173` (Vite Default)
- **Backend**: Runs on `http://localhost:3000`

---

## ✨ Key Features

- **Role-Based Access**: Admins manage employees and all tasks. Employees view and update their assigned tasks.
- **Task Management**: Create, assign, update status/priority, and filter tasks.
- **Reporting**: Dynamic dashboards and exportable CSV/Excel reports.
- **Attachments**: Secure file uploading (PDF, JPG, PNG).
- **Notifications**: Automated alerts for newly assigned, due soon, and completed tasks.

---

## 🧹 Code Quality Commands

From the project root:

- `npm run lint` - Run ESLint across all workspaces.
- `npm run lint:fix` - Automatically fix lint errors.
- `npm run format` - Format the project with Prettier.

---

**Author:** Om Poonjani
