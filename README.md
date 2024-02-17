
# Introduction

Welcome to our Node.js Express Application, designed to manage orders and user interactions in a streamlined and efficient manner. This application serves as a backend solution, leveraging TypeScript, Prisma ORM for MySQL, and Express.js to provide a robust API for handling user management, order processing, and order details.

# Technologies and Frameworks Used

- **Node.js & Express.js**: For creating a scalable server-side application.
- **TypeScript**: Used for writing maintainable and type-safe code.
- **Prisma ORM**: For database interactions, with MySQL as the database provider.
- **JWT (JSON Web Tokens)**: For secure authentication and authorization.

# Project Structure

Our project includes several key components:

- **Controllers** (`OrderController.ts`, `OrderDetailController.ts`, `User.ts`): Handle HTTP request routing and logic.
- **Models** (`order.model.ts`, `orderDetail.model.ts`): Define the structure for `Order` and `OrderDetail`.
- **Services** (`OrderService.ts`, `OrderDetailService.ts`): Contain business logic for data handling.
- **Middleware** (`auth.ts`): Containt authentication process for User Token.
- **Types** (`order.types.ts`, `orderDetail.types.ts`): TypeScript type definitions for orders and order details.
- **User Management** (`User.ts`): Handles user-related operations.
- **Utils** (`jwt.ts`, `PasswordUtils.ts`, `PrismaClients.ts`): Utility functions for various operations.
- **Prisma Schema** (`schema.prisma`): Database schema and model definitions.

# Getting Started

## Installation

To get started, clone the repository and install the dependencies:

```bash
git clone github.com/omermohammed9/E-commerce-TS-Prisma-MySQL
cd Tsc-Prisma-MySQL
npm install
```

## Setup

Configure your environment variables for database access and JWT secrets:

```env
DATABASE_URL="your-database-connection-string"
JWT_SECRET="your-secret-key"
```

## Running the Application

Start the application in development mode:

```bash
npm run dev
```

# Contributing

Contributions to this project are welcome. Please ensure to follow the provided coding standards and submit your pull requests for review.

# License

This project is licensed under the [MIT License](LICENSE).
