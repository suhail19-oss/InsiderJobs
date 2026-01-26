# 💼 InsiderJobs – Job Portal Platform

🔗 **Live Demo:** https://insider-jobs-sandy.vercel.app/

InsiderJobs is a **full-stack job portal web application** that connects candidates with recruiters through a secure, role-based system. The platform is designed with **production-level monitoring, authentication, and email workflows**.

---

## 🧠 Overview

InsiderJobs simulates a real-world recruitment platform featuring:
- Dual authentication systems (Clerk & JWT)
- Role-based access control
- Email notifications
- Error monitoring and performance tracking using **Sentry**

The project emphasizes **scalability, reliability, and real-world engineering practices**.

---

## ✨ Key Features

### 👤 Candidate Features
- Sign up & login using **Clerk authentication**
- Browse available job listings
- Apply for jobs
- Receive application confirmation emails

### 🧑‍💼 Recruiter Features
- Secure **JWT-based authentication**
- Create and manage job postings
- Toggle job visibility (public/private)
- Review candidate applications

### 📧 Email Integration
- Automated emails using **Resend**
- Application confirmation notifications

### 🔐 Security & Monitoring
- Role-based authorization
- Protected API routes
- Centralized error tracking with **Sentry**
- Production error logging and debugging support

---

## 🛠 Tech Stack

### Frontend
- React
- Tailwind CSS
- Vercel (Deployment)

### Backend
- Node.js
- Express.js

### Database
- MongoDB

### Authentication & Services
- Clerk (Candidate Authentication)
- JWT (Recruiter Authentication)
- Resend (Email Service)
- **Sentry (Error Monitoring & Performance Tracking)**
