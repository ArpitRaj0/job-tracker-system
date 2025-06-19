# 💼 Job Tracker System

A full-stack job application tracking system built with **MERN stack**, featuring:

- 🔐 JWT-based authentication
- 🧑‍💻 Applicant + Admin panels
- 📋 Job CRUD with status tracking
- 🔍 Filters by job status
- 📧 Email notifications (Mailtrap)
- 🎨 Responsive UI with polished UX

---

## 🚀 Live Demo

https://job-tracker-system.onrender.com (RENDER)
job-tracker-system.vercel.app (VERCEL)



---

## 🛠️ Tech Stack

| Layer      | Tech                  |
|------------|-----------------------|
| Frontend   | React, React Router |
| Backend    | Node.js, Express      |
| Database   | MongoDB Atlas         |
| Auth       | JWT (Token-Based)     |
| Styling    | CSS / Inline Styles   |
| Mail       | Nodemailer + Mailtrap |

---

## 🔐 Features

### ✅ Authentication
- User signup / login
- Admin login with role-based access
- Auth middleware for protected routes

### ✅ Job Management
- Add, edit, delete jobs
- Job fields: company, role, status, date, notes
- Status options: `"Applied"`, `"Interview"`, `"Offer"`, `"Rejected"`, `"Accepted"`

### ✅ Dashboard
- View job list (card layout)
- Filter by job status
- Update or delete applications

### ✅ Admin Panel
- View all users and job stats
- Access restricted via admin role

### ✅ Email Notifications
- Email sent when job status is updated
- Configured using **Mailtrap.io** for testing

---

## ⚙️ Getting Started

### 🔧 Clone & Install

```bash
git clone https://github.com/ArpitRaj0/job-tracker-system.git
cd job-tracker-system ```

###Backend Setup
cd backend
npm install

##FRONT END SETUP
cd ../frontend
npm install
npm start


