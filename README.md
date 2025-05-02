# Samriddhi Setu - Community Hub

A full-stack community hub platform where users can create posts, upvote/downvote, and interact through comments — built using **Next.js**, **Ant Design**, **Node.js**, and **MySQL**.

---

## 🚀 Features

- 📝 Create, edit, and delete posts
- 👍 Upvote / 👎 Downvote functionality
- 💬 Nested comment system
- 📤 Share post options
- 💻 Responsive UI using Ant Design
- 🔗 RESTful APIs built with Express
- 🛠️ MySQL for robust data management

---

## 🧱 Tech Stack

| Frontend | Backend | Database |
|----------|---------|----------|
| Next.js  | Node.js + Express | MySQL |
| Ant Design | REST APIs | Sequelize (optional) |

---

## 📁 Project Structure

```bash
├── frontend/         # Next.js + Ant Design UI
├── backend/          # Express.js API
└── database/         # MySQL schema / seed



# 🌐 Samriddhi Setu - Community Hub Platform

Welcome to **Samriddhi Setu**, a vibrant and collaborative community hub platform designed to enable meaningful discussions, resource sharing, and networking among users. Built with a modern full-stack architecture, this project combines real-time features with a clean UI for a seamless user experience.

---

## 📽️ Demo Video

▶️ [Watch the Project Demo](https://www.youtube.com/watch?v=ai2jwY-szeU)

---

## 🚀 Tech Stack

**Frontend:**
- [Next.js](https://nextjs.org/) (React Framework)
- [TypeScript](https://www.typescriptlang.org/) (Strongly-typed JS)
- [Tailwind CSS](https://tailwindcss.com/) (Utility-first styling)
- Clean, responsive UI with modular components

**Backend:**
- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [MySQL](https://www.mysql.com/) for relational data
- [Socket.IO](https://socket.io/) for real-time communication (live comments, updates)
- REST API with file upload support using [Multer](https://github.com/expressjs/multer)

**Tools & Testing:**
- [Postman](https://www.postman.com/) for API testing and development
- RESTful architecture for seamless frontend-backend integration

---

## ✨ Key Features

- 🔐 **User Registration & Login**
- 📝 **Create & View Posts** (with optional image uploads)
- 💬 **Commenting System** (supports threaded replies)
- 👍 **Voting Mechanism** for posts
- 📢 **Real-Time Updates** using Socket.IO
- 🎨 **Category Filtering** for organized content
- 🔎 **Search & Discover Posts**
- 🧩 **Modular Components** for reusability and clean code

---

## 🗂️ Folder Structure Overview



samriddhi-setu/
├── backend/ # Node.js + Express + MySQL API
│ ├── routes/
│ ├── models/
│ └── controllers/
├── frontend/ # Next.js + Tailwind CSS app
│ ├── components/
│ ├── pages/
│ └── styles/
├── database/ # SQL scripts and schema
└── README.md

yaml
Copy
Edit

---

## 🔧 Setup Instructions

1. **Clone the repo**
   ```bash
   git clone https://github.com/your-username/samriddhi-setu.git
   cd samriddhi-setu
Setup Backend

bash
Copy
Edit
cd backend
npm install
npm run dev
Setup Frontend

bash
Copy
Edit
cd ../frontend
npm install
npm run dev
Database Setup

Import the SQL schema from /database/schema.sql into MySQL

Update DB credentials in backend .env

📎 API Testing (via Postman)
Use /api/users, /api/posts, /api/comments, /api/votes endpoints

File uploads tested via multipart/form-data

Token-auth routes available if JWT added

📹 Project Video
📺 Watch here: https://www.youtube.com/watch?v=ai2jwY-szeU

🙌 Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.


