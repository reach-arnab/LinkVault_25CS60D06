# LinkVault Pro

Secure Link-Based File & Text Sharing System

**Sqn Ldr Arnab Sanyal**\
Roll No: 25CS60D06\
Design Lab -- IIT Kharagpur\
Spring 2026

------------------------------------------------------------------------

## Project Overview

LinkVault Pro is a secure full-stack web application that allows users
to upload text or files and generate a unique shareable link. The
content is accessible only via the exact link and supports multiple
advanced security controls.

This project was built as part of the Design Lab take-home assignment.

The system supports:

-   Authentication using JWT
-   Password-protected links
-   One-time view links
-   Maximum view limits
-   Automatic expiry
-   Background cleanup of expired content
-   Owner-based manual deletion
-   File size validation
-   Secure link generation

------------------------------------------------------------------------

## Tech Stack

### Frontend

-   React (Vite)
-   Axios

### Backend

-   Node.js
-   Express.js
-   JWT (jsonwebtoken)
-   bcrypt (password hashing)
-   Multer (file uploads)
-   node-cron (background job)

### Database

-   SQLite

------------------------------------------------------------------------

## Features Implemented

### Core Features

-   Upload text OR file (one per share)
-   Unique 24-character NanoID link generation
-   Secure access via link only
-   Default expiry of 10 minutes
-   Graceful handling of expired links
-   No public listing or search

### Bonus Features (Implemented)

-   Password-protected links
-   One-time view links
-   Maximum view count limit
-   Manual delete (owner only)
-   Authentication & user accounts
-   File size limit (5MB)
-   Background cron job for expiry cleanup
-   User-based access control

------------------------------------------------------------------------

## Application Screenshots

### Login Page

![Login Page](./screenshots/login.png)

### Register Page

![Register Page](./screenshots/register.png)

### Dashboard

![Dashboard](./screenshots/dashboard.png)

### Upload Page

![Upload Page](./screenshots/upload.png)

### Generated Link

![Generated Link](./screenshots/generated-link.png)

### Password Protected View

![Password View](./screenshots/password-view.png)

### Expiry Timer View

![Expiry View](./screenshots/expiry-view.png)

------------------------------------------------------------------------

## Setup Instructions

### Clone Repository

    git clone <your-repo-url>
    cd LinkVault

### Backend Setup

    cd backend
    npm install
    node server.js

Server runs at:

    http://localhost:5000

### Frontend Setup

    cd frontend
    npm install
    npm run dev

Frontend runs at:

    http://localhost:5173

------------------------------------------------------------------------

## Security Decisions

-   JWT used for stateless authentication
-   Passwords hashed using bcrypt
-   Link IDs generated using nanoid (24 chars)
-   No incremental IDs exposed
-   File upload limited to 5MB
-   Expiry checked at access time
-   Background cron marks expired links deleted
-   Owner-based deletion enforced via userId verification

------------------------------------------------------------------------

## Conclusion

LinkVault Pro is a secure and scalable link-based sharing system
implementing both core requirements and all bonus features. The project
demonstrates full-stack integration, authentication, access control,
file handling, and security best practices.
