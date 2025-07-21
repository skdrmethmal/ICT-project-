# Hotelza AI – Smart Hotel Booking Platform 💼🏨

**Author:** Methmal Deshapriya  
**Project:** AIDF Final Project  
**Type:** Full-Stack AI-Integrated Hotel Booking System

Hotelza AI is a feature-rich hotel booking platform designed to modernize the reservation experience through AI-powered search, secure payments, smart dashboards, and real-time support. The system empowers users with seamless hotel discovery, booking, and review functionality, while also offering admins tools to manage listings and interact with users efficiently.

---

## 🎯 Key Features

- 🔐 **Secure User Authentication** – Powered by Clerk
- 🧠 **AI Hotel Search** – Uses OpenAI + MongoDB Vector Search
- 💳 **Stripe Payments** – Safe and easy checkout with webhooks
- 📅 **Booking Management** – View, track, and cancel bookings
- ⭐ **Review & Rating System** – Enabled only after valid bookings
- 📊 **User Dashboard** – See bookings, reviews, stats, and activity
- 🤖 **24/7 Chatbot Assistant** – Built using OpenAI GPT-4
- 🧹 **Daily DB Cleanup** – Scheduled task to remove stale data
- 🆘 **Help Center with Admin Replies** – Request help and receive email responses
- 🗺️ **Planned: Google Maps Integration**
- 🔔 **Planned: Real-time chat + in-app notifications**
- 🌐 **Planned: SaaS version for hotel owners**
- 📱 **Planned: Mobile app for iOS & Android**

---

## 🧰 Tech Stack

### 🔹 Frontend

- React.js (Vite)
- Redux Toolkit & RTK Query
- Tailwind CSS + ShadCN UI
- React Router
- Clerk Authentication
- Stripe.js / React Stripe.js
- OpenAI (via fetch)
- React Hook Form + Zod Validation

### 🔹 Backend

- Node.js & Express.js
- TypeScript
- MongoDB Atlas (Mongoose + Vector Search)
- Clerk Middleware
- Stripe Payment API & Webhooks
- OpenAI API (Chat & Embeddings)
- Nodemailer (Emails)
- node-cron (Scheduled Tasks)
- node-cache (In-memory Caching)

---

## 📦 How to Run the Project Locally

### 🖥️ Backend

```bash
cd aidf-back-end
npm install
npm run dev
```

### 📺 Frontend

```bash
cd aidf-front-end/reactapp
npm install
npm run dev
```
