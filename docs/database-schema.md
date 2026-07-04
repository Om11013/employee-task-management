# Employee Task Management System - Database Schema

## Entity Relationship

Users (1) -------- (0..1) Employees
Employees (1) ---- (_) Tasks
Tasks (1) -------- (_) Notifications
Tasks (1) -------- (*) Attachments

---

## users

| Column     | Type                     | Constraints               |
| ---------- | ------------------------ | ------------------------- |
| id         | INT                      | PK, AUTO_INCREMENT        |
| full_name  | VARCHAR(100)             | NOT NULL                  |
| email      | VARCHAR(255)             | UNIQUE, NOT NULL          |
| password   | VARCHAR(255)             | NOT NULL                  |
| role       | ENUM('ADMIN','EMPLOYEE') | NOT NULL                  |
| created_at | TIMESTAMP                | DEFAULT CURRENT_TIMESTAMP |
| updated_at | TIMESTAMP                | DEFAULT CURRENT_TIMESTAMP |

Purpose:
Stores all authenticated users.

---

## employees

| Column      | Type         | Constraints               |
| ----------- | ------------ | ------------------------- |
| id          | INT          | PK, AUTO_INCREMENT        |
| user_id     | INT          | FK → users.id             |
| department  | VARCHAR(100) | NOT NULL                  |
| designation | VARCHAR(100) | NOT NULL                  |
| created_at  | TIMESTAMP    | DEFAULT CURRENT_TIMESTAMP |
| updated_at  | TIMESTAMP    | DEFAULT CURRENT_TIMESTAMP |

Purpose:
Additional information for employees.

---

## tasks

| Column               | Type                                      | Constraints       |
| -------------------- | ----------------------------------------- | ----------------- |
| id                   | INT                                       | PK                |
| title                | VARCHAR(255)                              | NOT NULL          |
| description          | TEXT                                      |                   |
| priority             | ENUM('LOW','MEDIUM','HIGH')               | NOT NULL          |
| status               | ENUM('PENDING','IN_PROGRESS','COMPLETED') |                   |
| start_date           | DATE                                      |                   |
| due_date             | DATE                                      |                   |
| assigned_employee_id | INT                                       | FK → employees.id |
| created_by           | INT                                       | FK → users.id     |
| completed_at         | DATETIME                                  | NULL              |
| created_at           | TIMESTAMP                                 |                   |
| updated_at           | TIMESTAMP                                 |                   |

Business Rules

- Due Date >= Start Date
- Completed tasks cannot be edited.

---

## notifications

| Column     | Type                               | Constraints   |
| ---------- | ---------------------------------- | ------------- |
| id         | INT                                | PK            |
| user_id    | INT                                | FK            |
| task_id    | INT                                | FK            |
| type       | ENUM('ASSIGNED','DUE','COMPLETED') |
| message    | TEXT                               |
| is_read    | BOOLEAN                            | DEFAULT FALSE |
| created_at | TIMESTAMP                          |

Purpose

Stores user notifications.

---

## attachments

| Column     | Type         | Constraints |
| ---------- | ------------ | ----------- |
| id         | INT          | PK          |
| task_id    | INT          | FK          |
| file_name  | VARCHAR(255) |
| file_url   | VARCHAR(255) |
| file_type  | VARCHAR(20)  |
| file_size  | INT          |
| created_at | TIMESTAMP    |

Purpose

Stores uploaded task documents.

Allowed Types

- PDF
- JPG
- PNG

Maximum Size

5 MB
