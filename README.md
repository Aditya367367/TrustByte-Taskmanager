# TrustByte Task Manager

A full-stack productivity app to manage your tasks, track progress, and update your profile. Built with **React**, **Express.js**, **MongoDB**, and **TailwindCSS**.

---

## 🚀 Features

- **Authentication:** Signup, Login, Logout
- **Task Management:** Add, edit, delete, and view your tasks (with optional image upload)
- **Profile:** Update your profile info and picture
- **Testimonials:** Leave and view testimonials
- **Progress Tracking:** Visualize your completed and pending tasks
- **Responsive UI:** Works on desktop and mobile, with modern design
- **Reusable Components:** Navbar, Footer, Task Card, Modal, etc.

---

## 🛠️ Tech Stack

- **Frontend:** React 19, TailwindCSS, Axios, React Router
- **Backend:** Express.js, MongoDB (Mongoose), JWT, Multer
- **Deployment:** Vercel (Frontend), Render (Backend)

---

## 📂 Project Structure

```
trustbyte/
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── uploads/
│   ├── .env
│   ├── package.json
│   └── server.js
└── frontend/
    ├── public/
    ├── src/
    │   ├── assets/
    │   ├── components/
    │   ├── pages/
    │   ├── utils/
    │   ├── App.js
    │   └── index.js
    ├── .env
    ├── package.json
    └── tailwind.config.js
```

---

## ⚙️ Local Setup

### 1. **Clone the Repository**

```sh
git clone https://github.com/Aditya367367/TrustByte-Taskmanager.git
cd TrustByte-Taskmanager
```

### 2. **Backend Setup**

```sh
cd backend
npm install
```

- Create a `.env` file in `/backend` (see `.env.example` or below):

  ```
  PORT=4000
  MONGO_URI=mongodb://127.0.0.1:27017/trustbyte
  JWT_SECRET=your_jwt_secret
  CLIENT_URL=http://localhost:3000
  ```

- Start the backend server:

  ```sh
  npm run dev
  # or
  npm start
  ```

### 3. **Frontend Setup**

```sh
cd ../frontend
npm install
```

- Create a `.env` file in `/frontend`:

  ```
  REACT_APP_API_URL=http://localhost:4000/api
  ```

- Start the frontend:

  ```sh
  npm start
  ```

- The app will be available at [http://localhost:3000](http://localhost:3000)

---

## 🖼️ Image Uploads

- Uploaded images are stored in `/backend/uploads/`.
- Make sure this folder exists and is **not** gitignored for local development.
- Images are served at `http://localhost:4000/uploads/<filename>`.

---

## 📝 API Endpoints

- `POST /api/auth/signup` — Register
- `POST /api/auth/login` — Login
- `GET /api/auth/me` — Get current user
- `PUT /api/auth/profile` — Update profile
- `GET /api/tasks` — List tasks
- `POST /api/tasks` — Add task (with optional image)
- `PUT /api/tasks/:id` — Update task
- `DELETE /api/tasks/:id` — Delete task
- `GET /api/testimonials` — List testimonials

---


## 📚 Documentation

- [API Reference](./API.md)



## 🧩 Reusable Components

- **Navbar:** Navigation and user actions
- **Footer:** App info and links
- **Task Card:** Task display with image
- **Modal/Form:** For adding/editing tasks and testimonials

---

## 🌐 Deployment

- **Frontend:** [https://trustbyte.vercel.app/](https://trustbyte.vercel.app/)
- **Backend:** (Deploy `/backend` to Render or similar)
- Update `.env` files with your deployed URLs

---

## 📄 License

MIT

---

## 🙏 Credits

- [React](https://react.dev/)
- [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [TailwindCSS](https://tailwindcss.com/)
- [Lucide Icons](https://lucide.dev/)

---

## 💡 Author

Made with ❤️ by **Aditya Chauhan**

- [GitHub: Aditya367367/TrustByte-Taskmanager](https://github.com/Aditya367367/TrustByte-Taskmanager)

---

## 🏁 Live Demo

- **Frontend:** [https://trustbyte.vercel.app/](https://trustbyte.vercel.app/)
