Library Link - Book Management Application

A full-stack web application for managing and sharing books within a reading group. Users can browse a catalog, lend books to friends with due dates, return books, and manage their personal book collection with secure user authentication.

---

Group Members:

Excel Aibangbee ~ 100980516 
Rayyan Khan ~ 100978573
Zain Iqbal ~ 100980218

---

Technology Stack:

- Backend: Node.js, Express.js
- Frontend: EJS (Embedded JavaScript Templating), Bootstrap 4, CSS3
- Database: MongoDB
- Authentication: express-session (Session-based user management)
- Additional Libraries: FontAwesome 6 (Icons), Cookie Parser, Morgan (Logging)
- Deployment: Cloud-based hosting with MongoDB Atlas

---

Project Features

User Authentication (Login, Register, Logout)
Protected Routes (Authentication-required operations)
Book Catalog Display with status tracking
Add/Remove Books from collection
Lend/Return Books with due dates
Responsive Design (Works on mobile and desktop)
Modern UI with gradient headers/footers
Form Validation (Backend & Frontend)
Session Management (24-hour expiration)
Error Handling and user-friendly error pages

---

Contribution Summary

Zain Iqbal 

Zain worked on:
- Creating and adding the logo for the application branding
- Creating and editing the videos for the presentation
- Modifying `app.js`, `package.json`, and `routes/index.js` during part 2 of the project
- Adding comments throughout the project to improve code readability
- Applying final touches and fixing errors to improve stability

Excel Aibangbee 

Excel worked on:
- Creating the repository and generating the initial project template
- Adding placeholders for all pages
- Working on the header and footer and setting up page layouts
- Completing the "add new book" form page
- Creating the success confirmation page after adding a book
- Adding the functionality to remove a book from the catalog
- Implementing MongoDB with a fully functioning server
- Modifying `header.ejs` and `layout.ejs`
- Preparing the project for deployment, including:
  - Deploying the site to a new web app container on a cloud provider
  - Deploying the front-end using Angular web app container to prevent CORS issues
  - Deploying the NoSQL database to MongoDB Atlas

Rayyan Khan

Rayyan worked on:
- The project idea and overall application description
- Developing and modifying `app.js` for middleware and session setup
- Coding the header and footer components
- Developing and modifying `layout.ejs` (master template)
- Completing all pages 1–4 of the application
- Creating and modifying:
  - `routes/auth.js` (authentication routes)
  - `views/login.ejs` (login page)
  - `views/register.ejs` (registration page)
- Modifying `app.js`, `package.json`, `routes/index.js`, `header.ejs`, and `layout.ejs`
- Creating the final site styling with custom CSS
- Adding the background image and improving the overall visual presentation

---


Key Files Overview

- app.js - Server setup, middleware configuration, session management
- routes/index.js - Book CRUD operations and protected routes
- routes/auth.js - User authentication (login, register, logout)
- views/layout.ejs - Base HTML template with header and footer
- public/stylesheets/style.css - Modern design with gradients and responsive layout
- PRESENTATION_SCRIPT.md - Complete presentation divided among three team members

---

Notes

- Passwords are hashed in production (bcrypt recommended)
- Session data expires after 24 hours
- All form inputs are validated on both frontend and backend
- The application is fully responsive and works on all device sizes
- MongoDB must be running for the application to function properly

---

Deployment

The application has been deployed to a cloud platform with:
- Backend hosted on a web app container
- Frontend deployed separately to prevent CORS issues
- Database stored on MongoDB Atlas cloud service

Github Repo link: https://github.com/00ea/INFR3120-Fall25-Project
