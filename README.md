#  LinkVault – Secure Link-Based Sharing Application

**Name:** Arnab Sanyal  
**Roll Number:** 25CS60D06  
**Course:** Design Lab, IIT Kharagpur  
**Assignment:** Full Stack Take-Home Assignment  
**Semester:** Spring 2026  

---

## Project Overview

LinkVault is a secure, link-based web application that allows users to upload **either text or a file** and share it with others using a **unique generated link**.  
The uploaded content is **not publicly accessible** and can only be viewed by users who have the exact link.

Each link automatically **expires after a fixed time**, after which the content becomes inaccessible.

This project is inspired by platforms like Pastebin and Google Drive’s link-sharing feature.

---

## Features

- Upload **plain text or any file** (one at a time)
- Generate a **unique, hard-to-guess link**
- Share content securely using the link
- **Live expiry countdown timer** on the content page
- Automatic content invalidation after expiry
- Clean, colorful, and user-friendly interface
- No login or authentication required

---

## Tech Stack Used

### Frontend
- React (with Vite)
- JavaScript (ES6)
- Inline CSS for UI styling

### Backend
- Node.js
- Express.js

### Database
- SQLite (SQL-based lightweight database)

### Other Tools
- Multer (for file uploads)
- Axios (for API requests)

---

## Folder Structure

```
LinkVault/
├── backend/
│   ├── database/
│   │   └── db.js
│   ├── routes/
│   │   └── shareRoutes.js
│   ├── uploads/
│   ├── index.js
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Upload.jsx
│   │   │   └── View.jsx
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   ├── vite.config.mjs
│   └── package.json
│
└── README.md
```

---

## How to Run the Project (Local Setup)

### 1️) Start the Backend

```bash
cd backend
npm install
npm start
```

Backend runs on:  
`http://localhost:5000`

---

###  2) Start the Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on:  
`http://localhost:5173`

---

### 3) Open in Browser

```
http://localhost:5173
```

---

##  API Endpoints (High Level)

| Method | Endpoint | Description |
|------|---------|------------|
| POST | `/api/upload` | Upload text or file |
| GET  | `/api/view/:id` | View or download content using link |

---

##  Data Flow Explanation

1. User uploads text or file from the frontend.
2. Frontend sends data to backend via REST API.
3. Backend stores metadata in SQLite database.
4. Files are stored locally on the server.
5. Backend generates a unique link and returns it.
6. User accesses content only through the generated link.
7. A timer checks expiry and disables access after expiration.

---

##  Screenshots

### Home Page

![Upload Page]([screenshots/screenshot-upload.png](https://github.com/reach-arnab/LinkVault_25CS60D06/blob/main/screenshot-upload.png))






### Link Generated After Upload

![Generated Link]([screenshots/screenshot-link.png](https://github.com/reach-arnab/LinkVault_25CS60D06/blob/main/screenshot-link.png))




### Content View with Expiry Timer

![Expiry Timer]([screenshots/screenshot-expiry.png](https://github.com/reach-arnab/LinkVault_25CS60D06/blob/main/screenshot-expiry.png))




---




## Assumptions & Limitations

- Only one upload (text or file) is allowed per link.
- Default expiry time is fixed (10 minutes).
- Files are stored locally (not on cloud storage).
- No authentication system is implemented.

---

## Conclusion

LinkVault demonstrates a complete **full-stack web application** with secure content sharing, expiry handling, and a responsive UI.  
The project focuses on simplicity, security, and usability while following the given assignment constraints.

---

**End of README**



