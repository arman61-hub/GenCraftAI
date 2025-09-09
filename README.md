# 🤖 GenCraftAI – Your Creative AI SaaS Hub 🚀

**GenCraftAI** is a modern, full-stack SaaS platform that empowers users to generate **blogs, article titles, resume reviews, and visuals** — all in one place. Built with a **React frontend** and a **Node.js/Express backend**, GenCraftAI integrates cutting-edge AI models to deliver creative and productive solutions seamlessly. 

---

## 🌐 Live Demo
> 🔗 [GenCraftAI](https://gen-craft-ai.vercel.app/)

---

## 📚 Table of Contents
- [✨ Features](#-features)
- [📦 Project Structure](#-project-structure)
- [🛠 Technologies Used](#-technologies-used)
- [🚀 Installation](#-installation)
- [🕹 Usage Guide](#-usage-guide)
- [📢 API Endpoints (Backend)](#-api-endpoints-backend)
- [🤝 Contributing](#-contributing)
- [📄 Motivation](#-motivation)

---

## ✨ Features

### 📝 Content Generation
- Generate SEO-friendly blog posts and articles using advanced AI models
- Craft engaging titles and summaries for articles

### 🧾 Resume Review
- AI-powered resume parser and reviewer for instant feedback and formatting

### 🖼️ Visual Creation
- Create AI-generated images and visual assets from text prompts
- Edit and refine visuals with built-in tools

### 🔐 Authentication & Access
- Secure logins and user roles via Clerk and JWT

### 📄 Markdown Support
- Supports rich markdown for blog and resume previews

---

## 📦 Project Structure


```
📁 GenCraftAI/
├── 📁 client/
│   ├── 📁 public/
│   ├── 📁 src/
│   │   ├── 📁 assets/
│   │   ├── 📁 components/
│   │   ├── 📁 pages/
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── .env
│   └── index.html
|
├── 📁 server/
│   ├── 📁 configs/
│   ├── 📁 controllers/
│   ├── 📁 middlewares/
│   ├── 📁 routes/
│   ├── .env
│   └── server.js
|
└── README.md
```

---


---

## 🛠 Technologies Used

### 🔧 Backend
- Node.js, Express.js
- NeonDatabase (Postgres)
- OpenAI API, Gemini API
- ClipDrop API (Visual Generation)
- Cloudinary, Multer
- JWT Auth, Clerk-react
- PDF parser
- CORS, Axios

### 🎨 Frontend
- React.js, Tailwind CSS
- React Router DOM
- Axios
- lucide-react, react-markdown

---

## 🚀 Installation

### 🔧 1. Clone the Repository
```bash
git clone  https://github.com/arman61-hub/GenCraftAI.git
cd GenCraftAI
```

### ⚙️ 2. Backend Setup (inside /server)
```bash
cd server
npm install
```
Create a .env file and add:
```bash
DATABASE_URL = ''
CLERK_PUBLISHABLE_KEY = ''
CLERK_SECRET_KEY = ''
GEMINI_API_KEY = '
CLIPDROP_API_KEY = ''
CLOUDINARY_CLOUD_NAME = ''
CLOUDINARY_API_KEY = ''
CLOUDINARY_API_SECRET = ''
```
🗄️ Database Setup (Postgres – Neon or Local)

Run this SQL to create the creations table:
```bash
CREATE TABLE creations(
  id SERIAL PRIMARY KEY,
  user_id TEXT NOT NULL,
  prompt TEXT NOT NULL,
  content TEXT NOT NULL,
  type TEXT NOT NULL,
  publish BOOLEAN DEFAULT FALSE,
  likes TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```
Start the backend server:
```bash
npm run server
```

### 💻 3. Frontend Setup (inside /client)
```bash
cd ../client
npm install
```
Set up environment:
```bash
VITE_CLERK_PUBLISHABLE_KEY = ''
VITE_BASE_URL = ''
```
Start the frontend:
```bash
npm run dev
```


---

## 🕹 Usage Guide

### ✍️ Blog & Article Creation
- Log in with Clerk account
- Choose Blog/Article module
- Enter prompt and options
- Review, edit, and publish results

### 🧾 Resume Review
- Upload PDF resume
- Get AI-powered feedback, suggestions, and formatting help

### 🖼️ Visual Creator
- Type image description
- Generate, edit, and download visuals instantly

---

## 📢 API Endpoints (Backend)

All endpoints are protected and require authentication. The base URL for the API is `/api`.

### 🤖 AI Endpoints (`/api/ai`)

- `POST /generate-article`
  - **Description**: Generates a full article based on a user's prompt.
  - **Auth**: Required

- `POST /generate-blog-title`
  - **Description**: Generates catchy blog titles from a given topic.
  - **Auth**: Required

- `POST /generate-image`
  - **Description**: Creates an image from a text prompt.
  - **Auth**: Required

- `POST /remove-image-background`
  - **Description**: Removes the background from an uploaded image.
  - **Body**: `multipart/form-data` with an `image` field.
  - **Auth**: Required

- `POST /remove-image-object`
  - **Description**: Removes a specified object from an uploaded image.
  - **Body**: `multipart/form-data` with an `image` field.
  - **Auth**: Required

- `POST /resume-review`
  - **Description**: Reviews an uploaded resume (PDF) and provides feedback.
  - **Body**: `multipart/form-data` with a `resume` field.
  - **Auth**: Required

### 👤 User Endpoints (`/api/user`)

- `GET /get-user-creations`
  - **Description**: Fetches all creations (e.g., articles, images) for the currently authenticated user.
  - **Auth**: Required

- `GET /get-published-creations`
  - **Description**: Fetches all creations that have been published publicly by all users.
  - **Auth**: Required

- `POST /toggle-like-creation`
  - **Description**: Likes or unlikes a specific creation. Expects creation ID in the request body.
  - **Auth**: Required

- `DELETE /delete-creation/:id`
  - **Description**: Deletes a specific creation using its ID.
  - **Auth**: Required
---

## 🤝 Contributing

We welcome all enhancements, bug fixes, and creative features!

### 🧩 How to Contribute

#### 1. Fork the Repository  
   Click the **Fork** button on the top right of this page.

#### 2. Clone Your Fork 
   Open terminal and run:
   ```bash
   git clone  https://github.com/arman61-hub/GenCraftAI.git
   cd GenCraftAI
   ```

#### 3. Create a feature branch:
   Use a clear naming convention:
   ```bash
   git checkout -b feature/new-feature
   ```
   
#### 4. Make & Commit Your Changes
   Write clean, documented code and commit:
   ```bash
   git add .
   git commit -m "✨ Added: your change description"
   ```
   
#### 5. Push to GitHub & Submit PR
   ```bash
   git push origin feature/your-feature-name
   ```
#### 6. Then go to your forked repo on GitHub and open a Pull Request.

---

## ⭐ Motivation

> 💡**PS:** If you found this project helpful or inspiring, please **[⭐ star the repository](https://github.com/arman61-hub/GenCraftAI)** — it keeps me motivated to build and share more awesome projects like this one!
---