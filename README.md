# CIS Project

This project was developed during my internship at **UltraCodes**, using **React.js**, **Node.js**, **Express.js**, and **PostgreSQL** with **Prisma ORM**. The backend follows a **Modular and Layered Architecture**.

---

## Features

- Modular and Layered backend architecture
- RESTful APIs built with Express.js
- PostgreSQL database using Prisma ORM
- React.js frontend
- JWT-based authentication
- File uploads (product images)
- Role-based access control

---

## Tech Stack

- **Frontend:** React.js, Vite
- **Backend:** Node.js, Express.js, TypeScript
- **Database:** PostgreSQL with Prisma ORM
- **Authentication:** JWT
- **Containerization:** Docker & Docker Compose

---

## Environment Variables

Create `.env.production` and `.env.development` files at the root of the project. Example:

```env
# Backend / App
NODE_ENV=production
PORT=8080
DATABASE_URL=postgresql://postgres:postgres@database:5432/CIS?schema=public
ACCESS_TOKEN_SECRET=
REFRESH_TOKEN_SECRET=

# PostgreSQL
POSTGRES_DB=CIS
POSTGRES_USER=postgres
POSTGRES_HOST_AUTH_METHOD=trust


