# Backend Architecture

```
src
│
├── config/
│   ├── env.ts
│   ├── db.ts
│   └── logger.ts
│
├── modules/
│   ├── auth/
│   │   ├── auth.controller.ts
│   │   ├── auth.service.ts
│   │   ├── auth.repository.ts
│   │   ├── auth.routes.ts
│   │   ├── auth.validation.ts
│   │   └── auth.types.ts
│   │
│   ├── employees/
│   │
│   ├── tasks/
│   │
│   ├── reports/
│   │
│   ├── notifications/
│   │
│   └── dashboard/
│
├── middleware/
│   ├── auth.middleware.ts
│   ├── role.middleware.ts
│   ├── validation.middleware.ts
│   ├── upload.middleware.ts
│   ├── error.middleware.ts
│   └── notFound.middleware.ts
│
├── shared/
│   ├── constants/
│   ├── enums/
│   ├── errors/
│   ├── helpers/
│   ├── interfaces/
│   ├── types/
│   └── utils/
│
├── routes/
│   └── index.ts
│
├── app.ts
└── server.ts
```

---

## Module Structure

Each feature follows the same structure.

```
tasks/

task.controller.ts

task.service.ts

task.repository.ts

task.validation.ts

task.routes.ts

task.types.ts
```

---

## Responsibilities

### Controller

- Receive Request
- Validate Input
- Call Service
- Return Response

No business logic.

---

### Service

Contains all business rules.

Examples

- Due date validation
- Completed task restriction
- Dashboard calculations
- Report generation

---

### Repository

Responsible only for database communication.

No business logic.

---

### Validation

Contains Zod/Joi schemas.

---

### Middleware

- Authentication
- Authorization
- Validation
- Upload
- Global Error Handling

---

## Request Flow

Client

↓

Routes

↓

Validation

↓

Authentication

↓

Controller

↓

Service

↓

Repository

↓

Database

↓

Controller

↓

Response

---

## API Response Format

Success

```json
{
  "success": true,
  "message": "Employee created successfully.",
  "data": {}
}
```

Error

```json
{
  "success": false,
  "message": "Validation failed.",
  "errors": []
}
```
