# OPD Queue Tracker — Real-Time OPD Wait-Time Prediction

> Real-time OPD wait-time prediction using crowdsourced patient check-ins for government hospitals in India.

## 📌 Problem Statement

Overcrowded Outpatient Departments (OPDs) in government hospitals lead to long, unpredictable waiting hours. OPD Queue Tracker provides live queue updates, estimated wait-time predictions, and real-time synchronization between patients and hospital administrators.

## 🚀 Live Application

- **Frontend (Vercel):** https://opd-queue-tracker.vercel.app
- **Backend API (Render):** https://opd-queue-tracker-backend.onrender.com

## 🖼️ Application Screenshots

![Home Page](docs/home.png)
![Live Queue](docs/queue.png)

## 🛠️ Tech Stack

- **Frontend:** React, Vite, Tailwind CSS, Framer Motion, Socket.io-client
- **Backend:** Node.js, Express.js, Socket.io, JWT Authentication
- **Database:** MongoDB Atlas
- **Hosting:** Vercel (Frontend) + Render (Backend)

## ✨ Key Features

- 🏥 Live queue tracking with real-time updates
- 📱 QR code patient check-in
- ⏱️ Wait-time prediction formula
- 🛡️ Admin dashboard with mark-served functionality
- 🟢 Colour-coded queue status indicators (Green / Yellow / Red)

## 💻 Local Setup Instructions

```bash
# Clone the repository
git clone [https://github.com/suku-web/opd-queue-tracker.git](https://github.com/suku-web/opd-queue-tracker.git)

# Setup Backend
cd backend
npm install
npm start

# Setup Frontend
cd ../frontend
npm install
npm run dev
```
