# E-commerce Full-Stack Platform (Nuxt 3 + Express + Prisma + MySQL)

## The Journey: How It Was vs. How It Is

### 🌱 How It Was
Initially, this project started as a purely **Back-end API solution**. It was built to manage orders and user interactions efficiently, leveraging **Express.js**, **TypeScript**, and **Prisma ORM** with **MySQL**. It handled basic user management, order processing, and secure authentication using JSON Web Tokens (JWT).

### 🚀 How It Is Now
The project has rapidly evolved into a **comprehensive, production-ready full-stack e-commerce application**. 

We have transitioned from a headless API to a complete digital storefront by integrating a modern, responsive frontend and significantly hardening the backend architecture. 

**Key Enhancements Include:**
- **Modern Storefront**: A sleek, reactive UI built from the ground up with **Nuxt 3**, **Vue.js**, and **Tailwind CSS**.
- **Admin Dashboard**: A fully functional admin panel to manage products, categories, and track customer orders in real-time.
- **Robust State Management**: Integrated **Pinia** with persistent storage for seamless cart management and user authentication.
- **Advanced Security**: Upgraded to a **Dual-Token (Access & Refresh) System** for enhanced security without sacrificing user experience.
- **Enterprise-Grade Backend**: Added **Swagger/OpenAPI** documentation, persistent request/error logging with **Winston**, and automated tasks via **Cron**.

---

## 🛠️ Technology Stack

### Frontend
- **Nuxt 3 & Vue 3**: For server-side rendering, routing, and dynamic UI components.
- **Tailwind CSS & Headless UI**: For rapid, accessible, and highly customizable styling.
- **Pinia**: For robust, persistent global state management (Cart, Auth).
- **Zod**: For runtime form validation.

### Backend
- **Node.js & Express.js**: For creating a highly scalable server-side application.
- **TypeScript**: Ensuring end-to-end type safety and maintainable code.
- **Prisma ORM**: Streamlined database interactions and migrations.
- **MySQL**: Relational database for structured, ACID-compliant data storage.
- **JWT**: Secure authentication utilizing short-lived access tokens and secure, HTTP-only refresh tokens.
- **Winston & Swagger**: For logging and API documentation.

---

## 📂 Project Structure

- **`/frontend`**: The Nuxt 3 application containing all UI components, pages, stores (Pinia), and composables.
- **`/src`**: The Express backend containing controllers, routes, middleware, and Prisma models.
- **`/src/prisma`**: Database schema (`schema.prisma`) and seeding scripts.
- **`/logs`**: Generated application logs powered by Winston.

---

## 🚀 Getting Started

### 1. Prerequisites
Ensure you have the following installed:
- Node.js (v18+ recommended)
- MySQL Server

### 2. Installation
Clone the repository and install dependencies for both the backend and frontend:

```bash
git clone https://github.com/omermohammed9/E-commerce-TS-Prisma-MySQL.git
cd E-commerce-TS-Prisma-MySQL

# Install backend dependencies
npm install

# Install frontend dependencies
cd frontend
npm install
cd ..
```

### 3. Environment Setup
Copy the example environment files and configure your credentials.

**Backend (`.env` in root):**
```env
PORT=3000
DATABASE_URL="mysql://USER:PASSWORD@localhost:3306/ecommerce_db"
JWT_SECRET="your-access-secret"
REFRESH_TOKEN_SECRET="your-refresh-secret"
FRONTEND_URL="http://localhost:3001"
```

**Frontend (`frontend/.env`):**
```env
NUXT_PUBLIC_API_BASE=http://localhost:3000/api
```

### 4. Database Initialization
Run Prisma migrations and seed the database with initial data (Admin and User accounts, sample products):

```bash
npx prisma migrate dev
npm run seed
```

### 5. Running the Application

**Start the Backend Server:**
```bash
npm run dev
```

**Start the Frontend Server:**
Open a new terminal window:
```bash
cd frontend
npm run dev
```

Your storefront will be available at `http://localhost:3001`, and the API runs on `http://localhost:3000`. API documentation can be accessed at `http://localhost:3000/api-docs`.

---

## 🤝 Contributing
Contributions to this project are welcome! Please ensure you follow the provided coding standards and submit your pull requests for review.

## 📄 License
This project is licensed under the [MIT License](LICENSE).
