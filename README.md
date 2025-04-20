# Task Manager Backend (Node.js + Express + MongoDB)

This is the backend server for the Task Manager app, built using **Node.js**, **Express**, and **MongoDB**. It handles user authentication using **JWT** and provides REST APIs to manage tasks.

## 🔧 Tech Stack

- Node.js
- Express.js
- MongoDB (with Mongoose)
- JSON Web Tokens (JWT) for authentication
- dotenv for environment variable management

---

## 🛠️ Setup Instructions

### 1. Clone the repository

```bash```
git clone https://github.com/yourusername/task-manager-backend.git
cd task-manager-backend

# 2. Install dependencies
npm install

# 3. Create a .env file
PORT=3000
JWT_SECRET=your_jwt_secret_key
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/taskdb

# 🚀 Running the Server
npm run dev   # for development using nodemon
npm start     # for production


