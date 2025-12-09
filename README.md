# 📌 CodeXLive — Real-Time Collaborative Code Editor

CodeXLive is a real-time collaborative coding platform built with **React (Vite)**, **Node.js**, **Socket.io**, and the **JDoodle Compiler API**.  
Multiple users can join a room, write code together, and run programs in various languages — all in real time.

---

## 🚀 Features

### 📝 Real-Time Collaborative Editor  
- Multiple users can edit code in the same room  
- Changes sync instantly using **Socket.io**

### 💻 Multi-Language Code Compiler  
Supports languages like:  
`Python3`, `Java`, `C`, `C++`, `NodeJS`, `Go`, `Ruby`, `PHP`, `Swift`, `Rust`, `SQL`, `C#`, `Bash`, and more  
- Execution powered by **JDoodle API**  
- Output displayed in a bottom panel

### 🎨 Light / Dark Mode  
- Switchable CodeMirror themes

### 👥 Active User List  
- Shows all users connected to the same room in real time

### 🔗 Sharable Room IDs  
- Generate unique Room IDs  
- Copy and share easily

---

## 🏗 Tech Stack

### Frontend
- React (Vite)
- CodeMirror 5
- Bootstrap
- React Hot Toast
- Socket.io-client
- Axios

### Backend
- Node.js
- Express
- Socket.io
- Axios (JDoodle API)
- CORS

---

## 📂 Project Structure

CodeXLive/
│
├── client/
│ ├── public/
│ ├── src/
│ │ ├── components/
│ │ ├── Actions.js
│ │ ├── Socket.js
│ │ ├── App.jsx
│ │ ├── main.jsx
│ │ ├── index.css
│ ├── vite.config.js
│ └── package.json
│
└── server/
├── Actions.js
├── index.js
├── .env
└── package.json



---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository

```bash
git clone https://github.com/your-username/CodeXLive.git
cd CodeXLive


#Backend Setup (Server)
cd server
npm install


*Create .env in server/:

PORT=5000
JDOODLE_CLIENT_ID=your_id
JDOODLE_CLIENT_SECRET=your_secret


* Run Server
node index.js

** Server URL
http://localhost:5000


## Frontend Setup (client)
cd client
npm install

** Create .env in client/:
VITE_BACKEND_URL=http://localhost:5000


** Run frontend:
npm run dev

**frontend Url
http://localhost:3000


##Environment Variables Summary
PORT=5000
JDOODLE_CLIENT_ID=
JDOODLE_CLIENT_SECRET=

**Client
VITE_BACKEND_URL=http://localhost:5000
