# Project Startup Guide

This document provides instructions on how to boot up both the Express backend and the Nuxt frontend simultaneously for development.

## Prerequisites

- Ensure you have [Node.js](https://nodejs.org/) installed.
- Ensure all dependencies are installed in both the root and frontend directories.
  - Root: `npm install`
  - Frontend: `cd frontend && npm install`

---

## Step-by-Step Startup

To run the full system, you will need **two separate terminal instances**.

### 1. Start the Express Backend
In your first terminal instance, navigate to the project root directory and run:

```bash
npm run dev
```
- **Backend URL:** [http://localhost:5000](http://localhost:5000)
- **Database:** Prisma will connect to your MySQL instance defined in `src/.env`.

### 2. Start the Nuxt Frontend
In your second terminal instance, navigate to the `frontend` directory and run:

```bash
cd frontend
npm run dev
```
- **Frontend URL:** [http://localhost:3000](http://localhost:3000)
- **CORS Config:** The backend is configured to allow requests from this origin.

---

## Communication Details
- The frontend is configured via `frontend/.env` to point to `http://localhost:5000`.
- The backend has CORS enabled strictly for `http://localhost:3000`.
