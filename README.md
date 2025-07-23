# 🧩 DesX - web based UI Builder

DesX is a full-stack MERN-based web application that allows users to design UI mockups visually using a canvas, and export them as PNGs or save them in a database. Think of it as a light and creative UI prototyping tool built for frontend developers and designers.

## 🌟 Features

- 🎨 Canvas-based UI builder using Fabric.js
- ✂️ Crop functionality for images
- 💾 Save canvas design as a PNG
- 📤 Save designs to MongoDB
- 🗃️ View all your saved designs
- ⚙️ Tech Stack: React + Node.js + Express + MongoDB

---

## 🖥️ Demo

🚧 Coming soon! You can clone the repo and run locally to explore.

---

## 🛠️ Tech Stack

| Tech           | Purpose                          |
|----------------|----------------------------------|
| React          | Frontend                         |
| Fabric.js      | Canvas element manipulation      |
| Express.js     | Backend API                      |
| Node.js        | Backend runtime                  |
| MongoDB        | Database                         |
| Mongoose       | MongoDB ODM                      |
| HTML + CSS     | Styling and layout               |

---

## 📁 Project Structure

```bash
desx/
├── client/                # React frontend
│   ├── src/               # App pages (Home, Saved, etc.)
│       ├── components/    # Reusable components
│       └── App.jsx
│
├── server/            # Node.js + Express backend
│   ├── models/        # Mongoose schemas
│   ├── routes/        # API routes
│   └── index.js
│
└── README.md
```

## 🚀 Getting Started
### 1. Clone the repository
```bash
git clone https://github.com/shivam-paul-19/desx.git
cd desx
```
### 2. install frontend dependencies
```bash
cd client
npm install
```
### 3. install server dependencies
```bash
cd ../server
npm install
```
### 4. Set up .env
In the server/ folder, create a .env file and add:
```bash
MAIL_PASS = your_mailing_password
COOKIE_SECRET_CODE = your_cookie_secret_key
MONGO_URL = your_mongo_url
```
### 5. Run the app
For server
```bash
cd server
node index.js
```
For client
```bash
cd client
npm run dev
```
