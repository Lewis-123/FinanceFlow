# FinanceFlow - Personal Finance Tracker

## Live Application

https://financeflow-x6r0.onrender.com

## GitHub Repository

https://github.com/Lewis-123/FinanceFlow.git

---

# Project Overview

FinanceFlow is a full-stack personal finance management application built using Node.js, Express.js, MongoDB, and Handlebars (HBS).

The application allows users to securely manage income and expenses, view transaction history, search transactions, and monitor financial activities through a dashboard.

---

# Features

## Authentication

- User registration
- User login
- GitHub OAuth authentication
- Logout functionality
- Password hashing using bcrypt
- Session-based authentication

## CRUD Functionality

Users can:

- Create transactions
- Read transactions
- Update transactions
- Delete transactions

## Dashboard Analytics

Includes:

- Total balance
- Total income
- Total expenses
- Transaction count
- Recent transactions

## Additional Feature

Transaction search allows users to search records by title and category.

---

# Technologies Used

Backend:
- Node.js
- Express.js
- MongoDB
- Mongoose

Frontend:
- HTML5
- CSS3
- Bootstrap 5
- Handlebars

Authentication:
- Passport.js
- GitHub OAuth
- Express Session
- bcrypt

Deployment:
- Render
- MongoDB Atlas

---

# Installation

```bash
git clone https://github.com/Lewis-123/FinanceFlow.git

cd FinanceFlow

npm install

npm start
```

Environment variables:

```env
MONGO_URI=your_mongodb_connection_string
SESSION_SECRET=your_session_secret
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
GITHUB_CALLBACK_URL=http://localhost:3000/users/github/callback
```

---

# Project Structure

```text
FinanceFlow
├── app.js
├── bin
├── config
├── middleware
├── models
├── routes
├── views
├── public
├── package.json
└── README.md
```

---

# Deployment

Live URL:

https://financeflow-x6r0.onrender.com

Hosted using Render with MongoDB Atlas as the database service.

---

# Security Features

- Password encryption
- Protected routes
- Session authentication
- Environment variable protection
- User-specific transaction access

---

# Author

Lewis

GitHub:
https://github.com/Lewis-123

---

# Assignment Requirements Completed

- Express application
- HBS templating engine
- MongoDB database
- User registration
- User login
- GitHub authentication
- CRUD functionality
- Additional feature implementation
- Cloud deployment
- GitHub version control
