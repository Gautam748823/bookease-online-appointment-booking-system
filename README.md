
<h1 align="center"> BookEase</h1>

<h3 align="center">
Smart Online Appointment Booking System
</h3>

<p align="center">
A modern Full-Stack Appointment Booking System built using React, Node.js, Express.js, and Supabase that enables users to schedule appointments with dynamic time-slot management and an admin dashboard.
</p>

<p align="center">

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-22-339933?logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-Backend-000000?logo=express)
![Supabase](https://img.shields.io/badge/Database-Supabase-3ECF8E?logo=supabase)
![Vercel](https://img.shields.io/badge/Frontend-Vercel-000000?logo=vercel)
![Render](https://img.shields.io/badge/Backend-Render-46E3B7?logo=render)
![License](https://img.shields.io/badge/License-MIT-blue)

</p>



# 📷 Project Preview

<img width="1571" height="923" alt="image" src="https://github.com/user-attachments/assets/588c74a1-ab06-4712-8de8-492bd73aac0f" />


---

#  Live Demo

###  Frontend

https://bookease-online-appointment-booking.vercel.app/

###  Backend API

https://bookease-backend-3hxz.onrender.com/

---

#  Table of Contents

- Features
- Tech Stack
- Project Structure
- Installation
- Run Locally
- API Endpoints
- Author

---

#  Features

- 📅 Online Appointment Booking
- ⏰ Dynamic Time Slot Management
- 🏥 Multiple Healthcare Services
- 🔐 Admin Authentication
- 📊 Appointment Dashboard
- 📱 Fully Responsive UI
- ⚡ REST API Architecture
- ☁ Cloud Deployment

---

#  Tech Stack

| Category | Technology |
|-----------|------------|
| **Frontend** | React.js, Vite, React Router DOM, Axios |
| **Backend** | Node.js, Express.js |
| **Database** | Supabase (PostgreSQL) |
| **Deployment** | Vercel (Frontend), Render (Backend) |
| **Version Control** | Git, GitHub |
| **API Testing** | Postman |
| **Language** | JavaScript (ES6+) |
| **Styling** | CSS3 |

---

#  Project Structure

```text
BookEase/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── database/
│   ├── routes/
│   ├── .env.example
│   ├── package.json
│   └── server.js
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── styles/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
├── docs/
├── .gitignore
└── README.md
````

---

#  Installation

Clone the repository

```bash
git clone https://github.com/Gautam748823/bookease-online-appointment-booking-system.git

cd bookease-online-appointment-booking-system
```

Install Backend

```bash
cd backend
npm install
```

Install Frontend

```bash
cd frontend
npm install
```

---

#  Run Locally

### Backend

```bash
cd backend
npm run dev
```

### Frontend

```bash
cd frontend
npm run dev
```

---

#  REST API Endpoints

| Method | Endpoint                            | Description          |
| ------ | ----------------------------------- | -------------------- |
| GET    | `/api/appointments`                 | Get all appointments |
| POST   | `/api/appointments`                 | Book an appointment  |
| GET    | `/api/appointments/available-slots` | Get available slots  |
| PUT    | `/api/appointments/:id`             | Update appointment   |
| DELETE | `/api/appointments/:id`             | Delete appointment   |

---

#  Future Scope

* Google Authentication
* OTP Verification
* Email Notifications
* SMS Notifications
* Online Payments
* Doctor Dashboard
* Patient Dashboard
* Calendar Integration
* AI Appointment Recommendations
* Mobile Application

---

#  Author

**Gautam Kumar**

GitHub

https://github.com/Gautam748823

Project

BookEase – Smart Online Appointment Booking System

---

#  Support

If you found this project useful, consider giving it a ⭐ on GitHub.

---

#  License

This project is licensed under the **MIT License**.

```
```
