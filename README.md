# 🎶 Music App Backend

A **Node.js + Express + MongoDB** backend for a basic music player application.  
It powers features like user authentication, uploading and liking songs, and creating playlists.  
You can hook this up to any frontend (for example, the HTML frontend we built earlier).

---

## ✨ Features

- ✅ User registration & login with JWT authentication
- ✅ Upload songs with metadata (title, artist, duration, audio file)
- ✅ Like songs
- ✅ Create playlists
- ✅ REST API with JSON responses
- ✅ File uploads handled by Multer
- ✅ Clean modular structure (controllers, routes, models)

---

## 🚀 Tech Stack

- **Node.js**
- **Express.js**
- **MongoDB** with **Mongoose**
- **Multer** for file uploads
- **JSON Web Token (JWT)** for authentication

---

## 📂 Project Structure

```
music-app-backend/
│
├── index.js                 # Main server entry
├── models/                  # Mongoose schemas (User, Song, Playlist)
├── routes/                  # API route definitions
├── controllers/             # Business logic
├── uploads/                 # Uploaded audio files
└── .env                     # Environment variables
```

---

## ⚙️ Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/music-app-backend.git
   cd music-app-backend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure environment**
   Create a `.env` file in the root:

   ```env
   MONGO_URI=mongodb://localhost:27017/musicapp
   JWT_SECRET=your_jwt_secret
   PORT=5000
   ```

4. **Run the server**
   ```bash
   npm run dev
   ```
   (or `node index.js`)

---

## 📡 API Endpoints

### 🔐 Auth

| Method | Endpoint             | Body                                             | Description           |
| ------ | -------------------- | ------------------------------------------------ | --------------------- |
| POST   | `/api/auth/register` | `{ "username": "string", "password": "string" }` | Register a new user   |
| POST   | `/api/auth/login`    | `{ "username": "string", "password": "string" }` | Login and receive JWT |

### 🎵 Songs

| Method | Endpoint                 | Body                                               | Description                       |
| ------ | ------------------------ | -------------------------------------------------- | --------------------------------- |
| GET    | `/api/songs`             | –                                                  | Get all songs                     |
| POST   | `/api/songs`             | FormData: `{ title, artist, duration, audioFile }` | Upload a new song (requires auth) |
| POST   | `/api/songs/:id/like`    | –                                                  | Like a song (requires auth)       |
| POST   | `/api/songs/:id/comment` | FormData: `{text}`                                 | Comment on a song (requires auth) |

### 📂 Playlists

| Method | Endpoint         | Body                   | Description                       |
| ------ | ---------------- | ---------------------- | --------------------------------- |
| POST   | `/api/playlists` | `{ "name": "string" }` | Create a playlist (requires auth) |

---

## ▶️ Testing the API

You can test using Postman, Insomnia, or cURL.

**Example: Register a user**

```bash
curl -X POST http://localhost:5000/api/auth/register \
-H "Content-Type: application/json" \
-d '{"username":"testuser","password":"123456"}'
```

**Example: Login**

```bash
curl -X POST http://localhost:5000/api/auth/login \
-H "Content-Type: application/json" \
-d '{"username":"testuser","password":"123456"}'
```

**Example: Upload a song**

```bash
curl -X POST http://localhost:5000/api/songs \
-H "Authorization: Bearer <YOUR_TOKEN>" \
-F "title=My Song" \
-F "artist=Me" \
-F "duration=180" \
-F "audioFile=@/path/to/audio.mp3"
```

---

## 🛠️ Development Notes

- Built with ES Modules (`type: module` in package.json)
- Use nodemon during development for hot reload:
  ```bash
  npm install --save-dev nodemon
  ```
- Make sure MongoDB is running locally or provide a hosted URI.

---

## ✨ Future Improvements

- 🔔 Add notifications
- 💬 Add comments on songs
- 🎧 Playlist management (add/remove songs)
- 📈 Pagination and search for songs

---

## 📜 License

MIT © 2025 Your Name
