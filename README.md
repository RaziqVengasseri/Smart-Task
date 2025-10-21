
# 🧠 SmartTask – Personal Task Management System

**SmartTask** is a lightweight, secure, and highly responsive full-stack task management application designed to help professionals efficiently organize, prioritize, and track their daily responsibilities.

Built as a **Single Page Application (SPA)** using **React** for a smooth and dynamic experience, SmartTask is powered by a robust **Express.js** backend for scalable and secure data handling.

---

## 💡 Overview

SmartTask provides a **personal productivity workspace** that enhances efficiency, simplifies workflows, and ensures deadlines are met consistently.

It features a **modern dark theme** and a **responsive design**, ensuring a seamless experience across desktop, tablet, and mobile devices.

---

## 🚀 Key Features

### 🎨 Frontend (React)

* **Secure Authentication** with JWT and session persistence.
* **Dashboard** displaying real-time statistics: total tasks, completed %, and priorities.
* **Task Management (CRUD)** – Create, Edit, Delete, and Update tasks dynamically.
* **Advanced Filters** for task status, priority, and due date.
* **Profile Management** for updating user details securely.
* **Optimized Performance** using React Hooks (`useMemo`, `useEffect`, and Context API`).

### ⚙️ Backend (Express.js)

* **RESTful API** for authentication and task operations.
* **JWT Authentication Middleware** for route protection.
* **MongoDB Integration** via Mongoose with strong schema validation.
* **Password Hashing** using bcryptjs for data security.
* **Clean Folder Separation** for scalability and maintainability.

---

## 🧩 Technology Stack

| Component    | Technology                           | Role                                 |
| ------------ | ------------------------------------ | ------------------------------------ |
| **Frontend** | React (Hooks, Context), React Router | UI, routing, and state management    |
| **Styling**  | Tailwind CSS, Lucide Icons           | Responsive dark-themed UI            |
| **Backend**  | Node.js, Express.js                  | API, middleware, and business logic  |
| **Database** | MongoDB (Mongoose)                   | Data persistence and modeling        |
| **Security** | JWT, bcryptjs                        | Authentication and password hashing  |
| **HTTP**     | Axios (FE), Cors (BE)                | API requests and cross-origin access |

---

## 📁 Folder Structure

### 🖥️ Backend (`/backend`)

```
backend/
├── config/
│   └── db.js                # MongoDB connection setup
├── controllers/
│   ├── taskController.js    # Logic for CRUD task operations
│   └── userController.js    # Handles registration, login, profile
├── middleware/
│   └── auth.js              # JWT authentication middleware
├── models/
│   ├── taskModel.js         # Task schema definition
│   └── userModel.js         # User schema definition
├── routes/
│   ├── taskRoute.js         # Task-related API routes
│   └── userRoute.js         # User-related API routes
├── .env                     # Environment variables
├── package.json             # Backend dependencies
├── server.js                # Entry point for Express server
└── node_modules/
```

---

### 🌐 Frontend (`/frontend`)

```
frontend/
├── public/
│   ├── vite.svg
│   └── react.svg
├── src/
│   ├── assets/
│   │   ├── dummy.jsx
│   │   └── react.svg
│   ├── components/
│   │   ├── AddTask.jsx
│   │   ├── CompletedTasks.jsx
│   │   ├── Layout.jsx
│   │   ├── Login.jsx
│   │   ├── Navbar.jsx
│   │   ├── PendingTasks.jsx
│   │   ├── Profile.jsx
│   │   ├── Sidebar.jsx
│   │   ├── SignUp.jsx
│   │   └── TaskItem.jsx
│   ├── pages/
│   │   ├── Complete.jsx
│   │   ├── Dashboard.jsx
│   │   └── Pending.jsx
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
├── vite.config.js
└── .gitignore
```

---

## ⚙️ Setup and Installation

### 1️⃣ Prerequisites

Install:

* [Node.js (LTS)](https://nodejs.org/)
* [MongoDB](https://www.mongodb.com/) (local or MongoDB Atlas)

---

### 2️⃣ Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend/` folder:

```env
PORT=4000
MONGO_URI=mongodb+srv://<username>:<password>@<cluster-url>/smarttask_db?retryWrites=true&w=majority
JWT_SECRET=a_very_long_and_secret_key
```

Run the backend:

```bash
npm start
# Server runs on http://localhost:4000
```

---

### 3️⃣ Frontend Setup

```bash
cd ../frontend
npm install
npm run dev
# App runs on http://localhost:5173
```

---

## 🧠 API Endpoints

### 🔐 **User Routes**

| Method | Endpoint              | Description                     | Auth Required |
| ------ | --------------------- | ------------------------------- | ------------- |
| `POST` | `/api/users/register` | Register a new user             | ❌             |
| `POST` | `/api/users/login`    | Login user and get JWT          | ❌             |
| `GET`  | `/api/users/profile`  | Get logged-in user profile      | ✅             |
| `PUT`  | `/api/users/profile`  | Update user details or password | ✅             |

---

### 🧾 **Task Routes**

| Method   | Endpoint         | Description                          | Auth Required |
| -------- | ---------------- | ------------------------------------ | ------------- |
| `GET`    | `/api/tasks`     | Get all tasks for the logged-in user | ✅             |
| `POST`   | `/api/tasks`     | Create a new task                    | ✅             |
| `PUT`    | `/api/tasks/:id` | Update a specific task               | ✅             |
| `DELETE` | `/api/tasks/:id` | Delete a specific task               | ✅             |

---

### 🛡️ **Authentication Middleware**

Every protected route runs through `authMiddleware`:

* Extracts the JWT token from the `Authorization` header.
* Verifies it using the `JWT_SECRET`.
* Attaches `req.user` (decoded token data) for downstream controllers.
* Returns `401 Unauthorized` for invalid or missing tokens.

---

## ✅ Verification and Testing

1. **Sign Up** → Create an account and verify it appears in MongoDB.
2. **Login** → Check JWT token in browser’s Local Storage.
3. **Task Operations** → Add, Edit, Delete tasks and check DB updates.
4. **Security Test** → Access tasks without token → should return `401 Unauthorized`.

---

## 🧾 License

This project is developed for **educational and portfolio** purposes.
You are free to modify and use it under the **MIT License**.

---

## 💬 Author

**Mohammed Raziq V**
🎓 B.Tech CSE @ IIIT K| 💻 MERN Stack Developer
🌐 Passionate about clean architecture & modern web solutions

