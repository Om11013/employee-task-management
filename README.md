# Employee Task Management System

A full-stack Employee Task Management System built with React, Express, TypeScript, MySQL, and Prisma. It leverages a modern Turborepo monorepo architecture and fulfills every aspect of the project requirements, including all optional bonus features!

---

## 🌟 The "Ultra-Edge" (Extraordinary Features)

We went above and beyond the baseline requirements to ensure this project is completely production-ready and developer-friendly:

- **Automated CI/CD Pipeline**: Integrated GitHub Actions (`lint.yml`) to automatically lint and verify code on every pull request to `main`.
- **Standardized PRs**: Implemented a comprehensive `PULL_REQUEST_TEMPLATE.md` to enforce quality and structure in team collaborations.
- **Advanced Monorepo Architecture**: Utilized **Turborepo** to securely and efficiently manage both the client and server within a single repository.
- **Bulletproof Pre-commit Hooks**: Configured **Husky** alongside **lint-staged** to completely block unformatted or lint-failing code from ever being committed.

---

## ✨ Implemented Features & Requirements

We successfully covered 100% of the Core Features and Bonus Features requested in the assignment:

### 1. Authentication (Core + Bonus)
- Full User Registration & Login with JWT-based authentication.
- Capture of Full Name, Email, Password, Confirm Password, and Role (Admin/Employee).
- Strict validation (Unique email, 8+ char password with uppercase, lowercase, and numbers).
- **Bonus Included**: "Remember Me" functionality.

### 2. Dashboards (Core)
- **Admin View**: Tracks total employees, total tasks, completed tasks, and pending tasks.
- **Employee View**: Tracks personal tasks, completed tasks, pending tasks, and overdue tasks.

### 3. Employee Management (Core)
- Full CRUD operations strictly restricted to Admins.
- Admins can add, edit, delete, search, sort, and paginate through employees.
- Captures Name, Email, Department, and Designation.

### 4. Task Management (Core)
- Complete Task CRUD with Title, Description, Priority, Status, Start Date, Due Date, and Assignee.
- **Enforced Business Rules**:
  - Due Dates cannot precede Start Dates.
  - Completed tasks are permanently locked from editing.
  - Employees have restricted views (only their tasks), while Admins have a bird's-eye view.

### 5. Notifications (Core + Bonus)
- Fully automated triggering for:
  - When a task is newly assigned.
  - When a task is due within one day (Cron job functionality).
  - When a task is marked complete.

### 6. File Uploads (Core + Bonus)
- Integrated Multer for secure attachments.
- Strictly accepts only PDF, JPG, and PNG files up to a maximum size of 5 MB.

### 7. Reports & Exports (Core + Bonus)
- Generates Reports for Completed Tasks, Pending Tasks, and Employee-wise Task summaries.
- **Bonus Included**: 1-click export capabilities to both Excel (.xlsx) and CSV formats.

---

## 🚀 Tech Stack

- **Frontend**: React, TypeScript, React Router, Redux Toolkit, TanStack Query, Tailwind CSS, React Hook Form
- **Backend**: Node.js, Express.js, TypeScript, Prisma ORM, MySQL, JWT Authentication, Multer
- **Tooling**: Turborepo, GitHub Actions, Husky, lint-staged, ESLint, Prettier

---

## ⚙️ Setup & Installation

### 1. Prerequisites

- **Node.js** (v24.14.0 or matching Prisma requirements: `20.19+`, `22.12+`, `24.0+`)
- **MySQL** Server

### 2. Clone and Install Dependencies

```bash
git clone <repository-url>
cd employee-task-management

# Install dependencies for all workspaces using npm workspaces
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
cd apps/server

# Push the schema to the database
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

- **Frontend**: `http://localhost:5173`
- **Backend API**: `http://localhost:3000`

---

## 🧹 Code Quality Commands

From the project root:

- `npm run lint` - Run ESLint across all workspaces.
- `npm run lint:fix` - Automatically fix lint errors.
- `npm run format` - Format the project with Prettier.
