# 📝 TaskApp

A full-stack **Task Management Application** built using the **MERN (MongoDB, Express.js, React.js, Node.js)** stack.  
This app allows users to create, view, edit, delete, and manage tasks with authentication and priority-based organization.

---

## 🚀 Project Description

**TaskApp** is a productivity tool designed to help users efficiently organize their tasks.  
It supports **user authentication**, **task creation**, **editing**, **deletion**, and **status updates**.  
Tasks can be assigned priorities (e.g., High, Medium, Low), and users can easily move tasks between these priority lists.  
Each priority level is visually represented with distinct colors for quick identification.

---

## ⚙️ Key Functionalities

1. **Task Creation**

   - Users can create new tasks using a form with fields for title, description, due date, and priority.
   - New tasks are automatically added to the respective priority list.

2. **Task List with Pagination (AJAX)**

   - Displays all tasks dynamically using pagination for better performance.
   - Each task entry shows its title, due date, and current status (Pending/Completed).

3. **Task Details Page**

   - A dedicated page to view complete task details including description and due date.

4. **Task Editing**

   - Users can update existing tasks (title, description, due date, priority).

5. **Task Deletion**

   - Option to delete a task with a confirmation dialogue before removal.

6. **Task Status Update**

   - Mark tasks as completed or change their current status.

7. **User Authentication System**

   - Only authorized users can access the application.
   - Authenticated users can:
     - Create, view, edit, and delete tasks
     - Add/remove users
     - Assign tasks to specific users
     - View only their assigned tasks

8. **Priority Management**

   - Move tasks between High, Medium, and Low priority lists.

9. **Visual Representation**
   - Each priority list is color-coded for quick visual distinction.

---

## 🎥 Project Demo

📺 **Demo Video:** [Watch the demo](.TaskApp\Project-Recording.mp4)

<video src="./Project-Recording.mp4" controls width="600"></video>

---

## 🧩 Tech Stack

| Category           | Technology                                     |
| ------------------ | ---------------------------------------------- |
| **Frontend**       | React.js, Axios, HTML5, CSS3, JavaScript (ES6) |
| **Backend**        | Node.js, Express.js                            |
| **Database**       | MongoDB (Mongoose ODM)                         |
| **Authentication** | JWT (JSON Web Token), bcrypt.js                |
| **Other Tools**    | Git, GitHub, Postman, npm                      |

---

## ⚙️ Installation & Setup Guide

Follow these steps to set up and run the project locally:

### 1. Clone the Repository and install the dependencies

```bash
git clone https://github.com/theritikyadav11/TaskApp.git
cd TaskApp
```

### 2. Install both client and server Dependencies

```bash
# Backend
cd backend
npm install

# Frontend
cd frontend
npm install
```

### 3. Configure Environment Variables

Create a .env file inside the server folder and include:

```bash
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

### 4. Run the Application

Open two terminals — one for the backend and one for the frontend.

```bash
# Start Backend
cd backend
node server.js

# Start Frontend
cd frontend
npm start
```

The app will now be available at:
👉 Frontend: http://localhost:3000

👉 Backend: http://localhost:5000

---

## 📜 License

This project is licensed under the MIT License — you are free to use, modify, and distribute it with attribution.

---
