# Cabzy Taxi Platform – Frontend

A modern, scalable, and responsive frontend for the **Cabzy Taxi Platform**. Built with React.js and industry best practices, this application delivers a seamless experience for both riders and drivers.

---

## Table of Contents
1. [Project Overview](#project-overview)
2. [Tech Stack Used](#tech-stack-used)
3. [Folder Structure](#folder-structure)
4. [Getting Started / Installation Instructions](#getting-started--installation-instructions)
5. [Available Scripts](#available-scripts)
6. [API Integration Info](#api-integration-info)
7. [Example API Calls](#example-api-calls)
8. [Environment Variables](#environment-variables)
9. [Best Practices Followed](#best-practices-followed)
10. [Contribution Guide](#contribution-guide)

---

## Project Overview

**Cabzy Taxi Platform** is a full-featured ride-hailing solution. The frontend is responsible for:

- User and Captain (driver) authentication and onboarding
- Real-time ride booking, fare estimation, and live tracking
- Interactive map integration for pickup/dropoff selection
- Responsive UI for both riders and captains
- Real-time notifications and ride status updates via WebSockets

**Goals:**
- Deliver a fast, intuitive, and reliable user experience
- Maintain a scalable and maintainable codebase
- Ensure seamless integration with the backend API

---

## Tech Stack Used

| Technology      | Purpose                                  |
|-----------------|------------------------------------------|
| React.js        | UI library for building components       |
| Tailwind CSS    | Utility-first CSS framework              |
| Axios           | Promise-based HTTP client                |
| React Router    | Declarative routing                      |
| GSAP            | Animation library                        |
| Socket.IO Client| Real-time communication                  |
| HERE Maps SDK   | Interactive maps and geolocation         |
| Vite            | Fast development/build tool              |
| ESLint & Prettier| Code quality and formatting             |

---

## Folder Structure

```
src/
│
├── assets/            # Static images and icons
├── components/        # Reusable React components (UI panels, forms, etc.)
├── context/           # React Contexts for global state (user, captain, socket)
├── pages/             # Top-level route components (Home, Login, etc.)
├── App.jsx            # Main app component with routing
├── index.css          # Tailwind and global styles
├── main.jsx           # Entry point, context providers, router
└── App.css            # Additional app-specific styles
```

- **assets/**: Contains all images and static resources.
- **components/**: Modular UI components (e.g., ride panels, toggles, popups).
- **context/**: Context providers for user, captain, and socket state.
- **pages/**: Route-level components for each main screen.
- **App.jsx**: Sets up routing and page layout.
- **main.jsx**: Bootstraps the app, wraps with providers.

---

## Getting Started / Installation Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-org/cabzy-frontend.git
cd cabzy-frontend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root of the frontend directory:

```env
VITE_BASE_URL=http://localhost:3000
VITE_HERE_MAPS_API_KEY=your_here_maps_api_key
```

### 4. Run Locally

```bash
npm run dev
```

The app will be available at [http://localhost:5173](http://localhost:5173) (default Vite port).

---

## Available Scripts

| Script            | Description                                      |
|-------------------|--------------------------------------------------|
| `npm run dev`     | Start the development server (with hot reload)   |
| `npm run build`   | Build the app for production (output in `dist/`) |
| `npm run preview` | Preview the production build locally             |
| `npm run lint`    | Run ESLint for code quality checks               |
| `npm run format`  | Format code using Prettier                       |

---

## API Integration Info

- **Base URL**: Set via `VITE_BASE_URL` in `.env`
- **HTTP Client**: [Axios](https://axios-http.com/)
- **Authentication**: JWT tokens stored in `localStorage`, sent via `Authorization: Bearer <token>`
- **WebSockets**: Real-time updates via Socket.IO, using the same base URL

---

## Example API Calls

### 1. User Login

**Endpoint:** `/users/login`  
**Method:** `POST`  
**Headers:** `Content-Type: application/json`  
**Body:**
```json
{
  "email": "user@example.com",
  "password": "yourpassword"
}
```

**Success Response:**
```json
{
  "user": {
    "_id": "userId",
    "fullname": { "firstname": "John", "lastname": "Doe" },
    "email": "user@example.com"
  },
  "token": "jwt_token"
}
```

**Error Response:**
```json
{
  "error": "Invalid credentials"
}
```

---

### 2. Booking a Ride

**Endpoint:** `/rides/create`  
**Method:** `POST`  
**Headers:**  
- `Authorization: Bearer <token>`
- `Content-Type: application/json`

**Body:**
```json
{
  "pickup": "28.6448,77.2167",
  "destination": "28.5355,77.3910",
  "vehicleType": "car"
}
```

**Success Response:**
```json
{
  "_id": "rideId",
  "pickup": "Connaught Place, Delhi",
  "destination": "Noida City Center",
  "fare": 250,
  "status": "pending",
  ...
}
```

**Error Response:**
```json
{
  "error": "No drivers available"
}
```

---

### 3. Get Fare Estimate

**Endpoint:** `/rides/get-fare`  
**Method:** `GET`  
**Headers:** `Authorization: Bearer <token>`  
**Query Params:**
```
pickup=28.6448,77.2167&destination=28.5355,77.3910
```

**Success Response:**
```json
{
  "car": 250,
  "auto": 180,
  "bike": 120
}
```

---

## Environment Variables

| Variable                   | Description                                 |
|----------------------------|---------------------------------------------|
| `VITE_BASE_URL`            | Base URL for backend API and Socket.IO      |
| `VITE_HERE_MAPS_API_KEY`   | HERE Maps JavaScript API key                |

**How to set:**  
Create a `.env` file in the project root and add the variables as shown above.

---

## Best Practices Followed

- **Component-Based Architecture:** All UI is modular and reusable.
- **Responsive Design:** Mobile-first, works on all screen sizes.
- **State Management:** Uses React Context for global state (user, captain, socket).
- **Performance:** Code splitting, lazy loading, and optimized rendering.
- **Real-Time Updates:** WebSocket integration for instant ride status.
- **Security:** JWT-based authentication, sensitive data never exposed.
- **Code Quality:** ESLint and Prettier enforced, consistent code style.
- **Accessibility:** Semantic HTML and ARIA attributes where applicable.

---

## Contribution Guide

We welcome contributions! Please follow these guidelines:

1. **Branch Naming:**  
   - Feature: `feature/<short-description>`
   - Bugfix: `bugfix/<short-description>`
   - Docs: `docs/<short-description>`

2. **Pull Requests:**  
   - Reference related issues in the PR description.
   - Ensure all code passes linting and builds successfully.
   - Add/Update tests for new features or bug fixes.
   - Use clear, descriptive commit messages.

3. **Code Reviews:**  
   - All PRs require at least one approval before merging.
   - Address all review comments before requesting re-review.

4. **Issue Reporting:**  
   - Use GitHub Issues for bugs, feature requests, or questions.
   - Provide clear steps to reproduce bugs.

---

**Questions?**  
Open an issue or contact the maintainers.

---

  

