# Task Management System

## Overview

This project is a full-stack **Task Management System** developed for the **ADM400-31: Web Programming Senior Project** course at the California Institute of Applied Technology.

The application allows users to register, log in, and manage personal tasks — including adding, editing, deleting, filtering, and marking them as complete.

## Features

- User registration and login (JWT-based)
- Add, edit, and delete tasks
- Task attributes: title, due date, priority
- Task completion toggling
- Search, filter, and sort tasks
- Per-user task separation
- Clean UI built with Bootstrap

---

## Tech Stack

### Frontend:

- React
- React Router DOM
- Bootstrap 5
- Axios

### Backend:

- Node.js
- Express
- MongoDB (via Mongoose)
- JSON Web Tokens (JWT)
- Bcrypt for password hashing
- CORS & dotenv

---

## Setup Instructions

### Prerequisites

- Node.js & npm
- MongoDB installed locally or Atlas account
- VS Code (recommended)

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/task-management-system.git
cd task-management-system
```

### 2. Install Backend Dependencies

```bash
cd backend
npm install
```

### 3. Set up `.env` File in `/backend`

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/tms
JWT_SECRET=your_secret_key
```

### 4. Start Backend Server

```bash
npm run dev
```

### 5. Install Frontend Dependencies

```bash
cd ../frontend
npm install
```

### 6. Start React App

```bash
npm start
```

---

## Folder Structure

```
task-management-system/
├── backend/
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   ├── middleware/
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── App.js
├── README.md
└── .env
```

---

## Author

**Randall Carbonel**  
California Institute of Applied Technology  
ADM400-31: Web Programming Senior Project  
Spring 2025

---

## License

This project is for educational use only.
