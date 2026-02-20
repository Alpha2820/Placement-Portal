# Placement Portal

This repository contains the full-stack **Placement Portal** application with two main folders:

- `client` – React frontend built with Vite & Tailwind CSS
- `server` – Node.js/Express backend API with MongoDB

All necessary setup information is contained within this single README; no additional READMEs are required.

---

## 📁 Repository Layout

```
placement-portal/
├─ client/            # React Vite frontend
├─ server/            # Express backend API
└─ README.md          # This file (overview & instructions)
```

The sections below consolidate all the key steps and information you need to run the full system.

---

## 🚀 Getting Both Sides Running

### 1. Clone the project

```bash
git clone <repo-url> placement-portal
cd placement-portal
```

### 2. Setup the backend (server)

```bash
cd server
npm install
```

1. Create a `.env` file in the `server` folder containing the required variables:
   - `PORT`, `MONGODB_URI`, `JWT_SECRET`, `ADMIN_SECRET`, `SUPERADMIN_SECRET`
   - Cloudinary credentials for file uploads
   - `NODE_ENV` (use `development` locally)
2. Start the API:
   - Development (auto‑reload ✔): `npm run dev`
   - Production: `npm start`

The server will expose `http://localhost:5000` by default.

### 3. Setup the frontend (client)

```bash
cd ../client
npm install
```

The client uses environment variables for the API base URL. Create a `.env` file in `client/` with:

```
VITE_API_BASE_URL=http://localhost:5000/api
```

Start the dev server:

```bash
npm run dev
```

Vite will launch the application at `http://localhost:3000`.

### 4. Access the app

- Frontend UI: http://localhost:3000
- Backend API health check: http://localhost:5000/

Use a tool like Postman or the frontend to exercise registration, login, placement submissions, and administration features.

---

## 🛠️ Technology Summary

| Layer   | Key Tools & Libraries                       |
|---------|---------------------------------------------|
| Client  | React, Vite, Tailwind CSS, React Router, Axios |
| Server  | Node.js, Express, MongoDB, Mongoose, JWT, Cloudinary |

Both sides include linting configurations for consistent code style.

---

## 📚 Resources & Documentation

All necessary documentation is contained in this file.  

- Use `npm run lint` inside `client` to check code quality.
- Backend utilities include `utils/makeAdmin.js` for manual admin promotion.

---

## 👍 Tips & Best Practices

- Run frontend and backend concurrently (e.g., using separate terminals or a process manager).
- Keep secrets out of version control; use environment variables or a secrets manager.
- Use separate MongoDB databases for development and production to avoid data conflicts.
- Regularly update dependency versions and re-run tests when available.

---

## 🙌 Contribution

Feel free to open issues or submit pull requests. Follow existing coding conventions, and update this README when adding new features or instructions.

Enjoy building with the Placement Portal! 🎓🚀