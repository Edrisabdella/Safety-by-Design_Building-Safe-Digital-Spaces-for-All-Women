# Safety-by-Design_Building-Safe-Digital-Spaces-for-All-Women

## SafeSpace is a modern, responsive, and user-centered web application designed to protect and empower **women and girls across Africa** by providing emergency tools, community support, and digital safety resources. It was built for the **Power Learn Project Pan‑African Hackathon**, contributing to the theme **“UNiTE to End Digital Violence Against All Women and Girls.”**

-# 🛡️ SafeSpace - Digital Safety Platform

![SafeSpace Logo](https://img.shields.io/badge/SafeSpace-Digital%20Safety%20Platform-red)
![Hackathon](https://img.shields.io/badge/Power%20Learn%20Project-Hackathon-blue)
![MERN Stack](https://img.shields.io/badge/Stack-MERN-green)
![License](https://img.shields.io/badge/License-MIT-yellow)

## 📖 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Quick Start](#-quick-start)
- [Installation](#-installation)
- [Environment Variables](#-environment-variables)
- [API Documentation](#-api-documentation)
- [Deployment](#-deployment)
- [Testing](#-testing)
- [Contributing](#-contributing)
- [License](#-license)
- [Developer](#-developer)

## 🎯 Overview

**SafeSpace** is a comprehensive digital safety platform designed specifically for women and girls in Africa, addressing the unique challenges they face in digital spaces. Built for the **Power Learn Project Hackathon** under the theme **"Safety by Design"**, our platform integrates safety features directly into the user experience rather than adding them as an afterthought.

### 🌟 Hackathon Alignment

- **Theme**: Safety by Design
- **Focus**: UNiTE to End Digital Violence Against All Women and Girls
- **Mission**: Create technology that protects and empowers

## ✨ Features

### 🚨 Emergency Safety Features

- **One-Touch Emergency Alerts** - Instant notifications to trusted contacts
- **Live Location Sharing** - Real-time location during emergencies
- **Safety Network** - Manage emergency contacts and trusted people
- **Multiple Alert Types** - Immediate danger, suspicious activity, safety check-ins

### 🛡️ Safety by Design

- **Privacy-First Architecture** - Data encryption and secure storage
- **Location-Based Safety** - Safe zones and area alerts
- **Digital Literacy Resources** - Educational materials and guides
- **Community Support** - Connect with local safety resources

### 📱 User Experience

- **Progressive Web App** - Works offline and installable
- **Mobile-First Design** - Optimized for all devices
- **Real-time Notifications** - Instant alerts and updates

## 🛠️ Tech Stack

### Frontend

- **React 18** - Modern UI library
- **Vite** - Fast build tool
- **Redux Toolkit** - State management
- **Tailwind CSS** - Utility-first styling
- **React Hook Form** - Form handling
- **React Router** - Navigation
- **Socket.io Client** - Real-time features

### Backend

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM library
- **JWT** - Authentication
- **Socket.io** - Real-time communication
- **Bcrypt** - Password hashing

### DevOps & Tools

- **Render** - Deployment platform
- **MongoDB Atlas** - Cloud database
- **Jest** - Testing framework
- **Git** - Version control

## 🚀 Quick Start

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (Atlas or local)
- Git

### 1. Clone Repository

```bash
git clone https://github.com/Edrisabdella/Safety-by-Design_Building-Safe-Digital-Spaces-for-All-Women.git
cd Safety-by-Design_Building-Safe-Digital-Spaces-for-All-Women
---
2. Backend Setup
bash
cd backend
npm install
cp .env.example .env
# Edit .env with your configuration
npm run dev
3. Frontend Setup
bash
cd frontend
npm install
cp .env
npm run dev


📥 Installation
Backend Setup
1. Navigate to Backend
bash
cd backend
2. Install Dependencies
bash
npm install
3. Environment Configuration
Create .env file:

env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb+srv://edrisabdella178_db_user:<saf***>@safety-by-design.fg8ive4.mongodb.net/safespace?appName=SAFETY-BY-DESIGN
JWT_SECRET=safespace123
JWT_EXPIRES_IN=90d
FRONTEND_URL=http://localhost:3000
4. Start Backend
bash
# Development
npm run dev

# Production
npm start
Frontend Setup
1. Navigate to Frontend
bash
cd frontend
2. Install Dependencies
bash
npm install
3. Environment Configuration
Create .env file:

env
VITE_API_URL=http://localhost:5000
VITE_APP_NAME=SafeSpace
4. Start Frontend
bash
# Development
npm run dev

# Build for production
npm run build 

🚀 Deployment
Render Deployment
1. Backend Deployment
Connect GitHub repository to Render

Create Web Service

Set build command: cd backend && npm install

Set start command: cd backend && npm start

Add environment variables

2. Frontend Deployment
Create Static Site on Render

Set build command: cd frontend && npm install && npm run build

Set publish directory: frontend/dist

Add environment variables

Environment Variables for Production
env
# Backend
NODE_ENV=production
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/safespace
JWT_SECRET=your_production_jwt_secret
FRONTEND_URL=https://your-frontend-url.onrender.com

# Frontend
VITE_API_URL=https://your-backend-url.onrender.com
🧪 Testing
Run Tests
bash
# Backend tests
cd backend
npm test

# Frontend tests
cd frontend
npm test

# Test coverage
npm run test:coverage
🤝 Contributing
We welcome contributions! Please follow these steps:

1. Fork the Repository
bash
git clone https://github.com/Edrisabdella/Safety-by-Design_Building-Safe-Digital-Spaces-for-All-Women.git
2. Create Feature Branch
bash
git checkout -b feature/amazing-feature
3. Commit Changes
bash
git commit -m 'Add some amazing feature'
4. Push to Branch
bash
git push origin feature/amazing-feature
5. Open Pull Request
🔒 Security Features
Data Protection
Password Hashing - Bcrypt with salt rounds

JWT Tokens - Secure authentication

Input Validation - Prevent injection attacks

Privacy Controls
Location Privacy - Granular location sharing

Data Minimization - Collect only essential data

User Consent - Explicit permissions required

🌍 Regional Focus
Africa-Specific Features
Local Emergency Numbers - Country-specific hotlines

Regional Languages - Multi-language support

Cultural Sensitivity - Context-aware design

Offline Capability - Limited connectivity support

👨‍💻 ## Developer Information
Edris Abdella Nuure
Full Stack Developer & Safety Advocate

https://ibb.co/RT6rny3B

📍 Location: Dire Dawa, Ethiopia
📧 Email: edrisabdella178@gmail.com
📱 Phone: +251905131051
💼 LinkedIn: Edris Abdella
🐙 GitHub: Edrisabdella  

### 🔗 Contact Links
- **Email:** edrisabdella178@gmail.com  
- **Phone:** +251905131051  
- **GitHub:** https://github.com/Edrisabdella  
- **LinkedIn:** https://www.linkedin.com/in/edris-abdella-7aa521177  


About the Developer
Passionate about creating technology that makes a real difference in people's lives, especially for women and girls in Africa who face unique digital safety challenges.

🆘 Emergency Contacts
Ethiopia-Specific
Police: 991

Ambulance: 907

Fire: 939

Women's Help: +251116677889

<div align="center">
🛡️ Built with ❤️ for a Safer Digital Africa
"Safety isn't just a slogan; it's something we create together through technology, community, and courage."

Report Bug • Request Feature • Contact Developer

</div> ```


## 🧡 Acknowledgements
- **Power Learn Project (PLP)**  
- **UN Women – UNiTE Campaign**  
- **16 Days of Activism Against Gender-Based Violence**  
- Women & Girls across Africa who inspired this project  

---

## 📜 License
This project is free to use, modify, and improve for educational and safety‑driven purposes.

---
