## Cabzy
### Demo Video
**Link** : https://drive.google.com/file/d/1amAReByLrouy9o7CT8Ag38IDiLieICEL/view?usp=sharing
### Deployment
**Link** : https://cabzy-taxi-service-frontend.onrender.com/


- You can make new ID for both , user & captain both

**Existing Ids**:-
-For User :- test@user.com Password:- test1234
-For Captain:- test@cap.com Password:- testcap123



### Please wait for 1-2 minutes for logging In , Because I am using free version of render , which sleeps after 15 minutes of inactivity and it take almost 1-2 minutes to restart the server



# 🚕 Cabzy Taxi Platform

A modern, scalable, and production-ready full-stack ride-hailing platform. Cabzy connects riders and drivers in real time, offering seamless booking, live tracking, and a delightful user experience.

---

## 📚 Table of Contents

1. [📘 Project Overview](#-project-overview)
2. [🛠️ Tech Stack](#️-tech-stack)
3. [📁 Project Structure](#-project-structure)
4. [🚀 Getting Started](#-getting-started)
5. [🔑 Environment Configuration](#-environment-configuration)
6. [📡 System Architecture](#-system-architecture)
7. [🧠 Best Practices](#-best-practices)
8. [📄 License](#-license)
9. [🙌 Contributing](#-contributing)

---

## 📘 Project Overview

Cabzy is a full-featured taxi booking platform that provides:

- **Dual Authentication System**: Separate registration/login for users and captains (drivers)
- **Real-Time Ride Management**: Live booking, tracking, and status updates
- **Dynamic Pricing**: Intelligent fare calculation based on distance
- **Trip History**: Complete ride records for both users and drivers
- **Responsive UI**: Optimized for all device sizes
- **Modular Architecture**: Clean separation between frontend and backend

**Key Features:**
- Real-time ride matching using WebSockets
- Interactive map integration with HERE Maps
- JWT-based authentication with secure token storage
- Comprehensive error handling and validation
- Scalable backend architecture

👉 For detailed implementation, refer to:
- [`/Frontend/README.md`](./Frontend/README.md)
- [`/Backend/README.md`](./Backend/README.md)

---

## 🛠️ Tech Stack

### **Frontend**
| Technology       | Purpose                                  |
|------------------|------------------------------------------|
| React.js (Vite)  | Core UI framework                        |
| Tailwind CSS     | Utility-first styling                    |
| React Router     | Client-side routing                      |
| Context API      | Global state management                  |
| Axios            | HTTP requests to backend                 |
| HERE Maps SDK    | Interactive maps and geolocation         |
| Socket.IO Client | Real-time communication                  |
| GSAP             | Smooth animations                        |

### **Backend**
| Technology       | Purpose                                  |
|------------------|------------------------------------------|
| Node.js          | JavaScript runtime                       |
| Express.js       | Web application framework                |
| MongoDB          | NoSQL database                           |
| JWT              | Authentication tokens                    |
| Socket.IO        | Real-time bidirectional communication    |
| Mongoose         | MongoDB object modeling                  |
| Bcrypt           | Password hashing                         |

### **DevOps & Tools**
| Technology       | Purpose                                  |
|------------------|------------------------------------------|
| Render           | Cloud hosting platform                   |
| GitHub Actions   | CI/CD automation                         |
| ESLint + Prettier| Code quality and formatting              |
| Nodemon          | Development server reloading             |
| Postman          | API testing                              |

---

## 📁 Project Structure

```bash
cabzy/
├── Frontend/ # Frontend application
│ ├── src/
│ │ ├── assets/ # Static resources (images, icons)
│ │ ├── components/ # Reusable UI components
│ │ ├── context/ # Global state (Auth, Socket, etc.)
│ │ ├── pages/ # Route components
│ │ ├── utils/ # Helper functions
│ │ ├── App.jsx # Main application component
│ │ └── main.jsx # Application entry point
│ ├── public/ # Public assets
│ ├── .env # Frontend environment variables
│ ├── index.html # Base HTML template
│ └── README.md # Frontend documentation
│
├── Backend/ # Backend application
│ ├── src/
│ │ ├── config/ # Configuration files
│ │ ├── controllers/ # Route handlers
│ │ ├── models/ # MongoDB schemas
│ │ ├── routes/ # API endpoints
│ │ ├── services/ # Business logic
│ │ ├── sockets/ # Real-time communication
│ │ ├── utils/ # Helper functions
│ │ └── index.js # Server entry point
│ ├── .env # Backend environment variables
│ └── README.md # Backend documentation
│
├── .gitignore # Git exclusion rules
├── package.json # Root project scripts
└── README.md # Project overview (this file)
```


---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18.x or higher)
- MongoDB (v6.x or higher)
- Git

### Installation
1. Clone the repository:
```bash
git clone https://github.com/your-username/cabzy.git
cd cabzy
```
2. Install dependencies for both frontend and backend:
```bash
# Install root dependencies
npm install

# Install frontend dependencies
cd client && npm install

# Install backend dependencies
cd ../server && npm install
```

3. Set up environment variables:

```bash
# Frontend configuration
cd client
cp .env.example .env
# Edit .env with your actual values

# Backend configuration
cd ../server
cp .env.example .env
# Edit .env with your actual values
```
4. Start the development environment:

```bash
# From project root (runs both frontend and backend)
npm run dev

# Alternatively, run separately:
# Frontend: cd client && npm run dev
# Backend: cd server && npm run dev
```

5. Access the application:
- Frontend: http://localhost:5173
- Backend API: http://localhost:3000

---
## 🧠 Best Practices

### ⚙️ Architectural Principles

| Practice                | Implementation Details                                              |
|-------------------------|----------------------------------------------------------------------|
| **Component-Based UI**  | Reusable React components with single responsibility                |
| **RESTful API Design**  | Resource-oriented endpoints (GET/POST/PUT/DELETE)                   |
| **Modular Structure**   | Clear separation between UI and business logic                      |
| **Environment Separation** | Strict division between dev/prod configurations                 |

---

<p align="center">
  <img src="/Authentication workflow.png" alt="Centered Logo" width="900" />
</p>

---

### 🔐 Security

- ✅ JWT authentication with **HTTP-only cookies**
- 🔐 Password hashing using **bcrypt** (salt rounds: 12)
- 🛡️ Input validation on **all API endpoints**
- 🕒 Secure token storage with **expiration (default: 1 day)**

---

### 🚀 Performance

- 🧩 Lazy loading of React components
- ⚡ Database indexing for frequent queries
- 🔄 WebSocket optimization for minimal latency
- 📦 Caching of frequent API responses

---

### 🔧 Maintainability

- 📏 Consistent code style with **ESLint/Prettier**
- 🪵 Comprehensive **error logging**
- 🧠 Meaningful **commit messages**
- 📘 Detailed API documentation *(see `/server/README.md`)*

---

### 🎨 UI/UX

- 📱 **Mobile-first** responsive design
- ♿ Accessible components with **ARIA attributes**
- 🧭 Intuitive **navigation patterns**
- 🔄 Real-time feedback for **user actions**

---

## 📄 License

This project is licensed under the **MIT License** – see the [LICENSE](./LICENSE) file for details.

---

## 🙌 Contributing

We welcome contributions! Please follow these guidelines:

### 📌 Branch Naming

- `feature/your-feature` – New features  
- `fix/your-fix` – Bug fixes  
- `docs/your-docs-update` – Documentation  

---

### 🛠️ Development Workflow

```bash
git checkout main
git pull origin main
git checkout -b feature/your-feature
# Make your changes
git add .
git commit -m "Description of changes"
git push origin feature/your-feature
```
---
### ✅ Code Standards

- Follow existing patterns and styles  
- Write **meaningful commit messages**  
- Include **tests** for new features  
- Update **documentation** when needed  

---

### 📥 Pull Requests

- Reference related issues  
- Provide a **clear description** of changes  
- Ensure **all tests pass**  
- Verify **no conflicts** with base branch  

---





