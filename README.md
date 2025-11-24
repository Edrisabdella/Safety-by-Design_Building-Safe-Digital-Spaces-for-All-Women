# Safety-by-Design_Building-Safe-Digital-Spaces-for-All-Women
Safety by Design_Coding Safety for All Women and Girls Hackathon_SafeSpace - Complete MERN Stack Project.

# 🛡️ SafeSpace – Digital Safety Platform for Women & Girls
**Safety by Design | Power Learn Project – Coding Safety for Women & Girls Hackathon**

SafeSpace is a modern, responsive, and user-centered web application designed to protect and empower **women and girls across Africa** by providing emergency tools, community support, and digital safety resources. It was built for the **Power Learn Project Pan‑African Hackathon**, contributing to the theme **“UNiTE to End Digital Violence Against All Women and Girls.”**

---

## 🚀 Features

### 🔴 1. Emergency Alert System
- One‑tap emergency button  
- Real‑time location sharing  
- Multiple alert types:
  - Immediate Danger  
  - Suspicious Activity  
  - Safety Check‑In  
- Optional custom message field  
- Uses browser Geolocation API  

### 🟣 2. Personal Safety Network
- Add and manage trusted emergency contacts  
- Notify contacts instantly  

### 🔐 3. Privacy-First User Experience
- Clean, accessible UI with encrypted form handling (backend-ready)  
- User data protection-first design  

### 📚 4. Safety Resources
- Regional emergency hotlines  
- Guides and educational materials  
- Africa-wide digital safety map UI  

### 🧭 5. Smart Navigation & UI Enhancements
- Smooth scrolling  
- Automatic active‑link highlighting  
- Responsive layout  
- Mobile‑first design  

---

## 🖥️ Demo Structure & Sections

### ✔️ Hero Section  
Intro to SafeSpace + quick action buttons (Get Started / Login)

### ✔️ Features Section  
Cards showing platform capabilities

### ✔️ About Section  
Overview of mission, hackathon theme, and core focus areas

### ✔️ Developer Section  
Profile of the project creator (Edris Abdella Nuure)

### ✔️ Safety Modals  
- Login  
- Register  
- Forgot Password  
- Emergency alert modal  

---

## 📂 Project Structure

```
.
├── index.html         # Main application file
├── README.md          # Documentation file (this file)
└── assets/            # (Optional) images, icons, media files
```

---

## 🛠️ Technologies Used

### Frontend
- HTML5  
- CSS3  
- Bootstrap 5.3  
- JavaScript (Vanilla JS)  
- Font Awesome  

### External Resources
- Google Fonts (Inter)
- SVG favicon
- Bootstrap CDN
- Font Awesome CDN

---

## ⚙️ How the System Works

### 1. Emergency Alert Logic
When the emergency button is clicked:

```js
navigator.geolocation.getCurrentPosition(...)
```

If location is available → coordinates are included  
If not → fallback alert is sent

### 2. Modal Authentication
Front-end UI for:
- Login  
- Create Account  
- Password Reset  

(Backend integration required)

### 3. UI Behavior Scripts
- Scroll animation  
- Navbar color change  
- Active menu highlighting  
- Form event handling  

---

## 🧪 Running the Project Locally

### Option 1 — Direct Open
Simply double‑click:
```
index.html
```

### Option 2 — VS Code Live Server
1. Install **Live Server** extension  
2. Right‑click `index.html`  
3. Select **Open with Live Server**

---

## 🌍 Deployment Options

### GitHub Pages
1. Push the project to GitHub  
2. Go to **Settings → Pages**  
3. Select:
```
Branch: main
Folder: /root
```

### Netlify / Vercel
- Drag & drop the folder  
**OR**
- Connect repo → auto-deploy  

---

## 📈 Future Enhancements (Planned Features)

| Feature | Status | Technology |
|--------|--------|------------|
| User Authentication | Planned | Node.js + Express |
| SMS/Email Alerts | Planned | Twilio / Firebase |
| Real-time Safety Map | Planned | LeafletJS / Maps API |
| Admin Dashboard | Planned | React / Next.js |
| Contact Management | Planned | MongoDB |

---

## 👨‍💻 Developer Information

**Name:** *Edris Abdella Nuure*  
**Role:** Full Stack Developer  
**Location:** Dire Dawa, Ethiopia  

### 🔗 Contact Links
- **Email:** edrisabdella178@gmail.com  
- **Phone:** +251905131051  
- **GitHub:** https://github.com/Edrisabdella  
- **LinkedIn:** https://www.linkedin.com/in/edris-abdella-7aa521177  

---

## 🧡 Acknowledgements
- **Power Learn Project (PLP)**  
- **UN Women – UNiTE Campaign**  
- **16 Days of Activism Against Gender-Based Violence**  
- Women & Girls across Africa who inspired this project  

---

## 📜 License
This project is free to use, modify, and improve for educational and safety‑driven purposes.

---
