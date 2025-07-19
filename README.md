# 🎶 Music App Backend

A **Node.js + Express + MongoDB** backend for a basic music player application.  
It powers features like user authentication, uploading and liking songs, and creating playlists.  
You can hook this up to any frontend (for example, the HTML frontend we built earlier).

---

## ✨ What's New – DevOps Ready!

- ✅ **Dockerized** – runs anywhere with a single command
- ✅ **Deployed on a Cloud VM** (Oracle Cloud Free Tier or similar)
- ✅ **Automated CI/CD** – GitHub Actions builds & deploys on every push

---

## 🚀 Features

- ✅ User registration & login with JWT authentication
- ✅ Upload songs with metadata (title, artist, duration, audio file)
- ✅ Like songs
- ✅ Create playlists
- ✅ REST API with JSON responses
- ✅ File uploads handled by Multer
- ✅ Clean modular structure (controllers, routes, models)
- ✅ Docker support for easy deployment
- ✅ GitHub Actions workflow for continuous deployment

---

## 🛠 Tech Stack

- **Node.js**
- **Express.js**
- **MongoDB** with **Mongoose**
- **Multer** for file uploads
- **JWT** for authentication
- **Docker** for containerization
- **GitHub Actions** for CI/CD
- **Ubuntu VM** on Oracle Cloud Free Tier (or any cloud)

---

## 📦 Run with Docker

Run this app anywhere using Docker:

**1️⃣ Build the image:**

```bash
docker build -t music-app-backend .
```

**2️⃣ Run the container (expose port 5000):**

```bash
docker run -p 5000:5000 music-app-backend
```

Open in browser: http://localhost:5000

🐋 You'll need Docker Desktop installed on your Windows/Mac/Linux machine.

---

## ☁️ Deploy on Cloud (Free Tier)

You can deploy this Dockerized app on a free VM (e.g. Oracle Cloud, Google Cloud, AWS Free Tier).

**Steps:**

1. **Push image to Docker Hub:**

   ```bash
   docker login
   docker tag music-app-backend <your-dockerhub-username>/music-app-backend:latest
   docker push <your-dockerhub-username>/music-app-backend:latest
   ```

2. **On your cloud VM (Ubuntu):**
   ```bash
   sudo apt update && sudo apt install docker.io -y
   sudo docker pull <your-dockerhub-username>/music-app-backend:latest
   sudo docker run -d -p 80:5000 --name music-app <your-dockerhub-username>/music-app-backend:latest
   ```

✅ **Now your backend is live at:**  
`http://<your-vm-public-ip>`

---

## 🔄 CI/CD with GitHub Actions

Whenever you push to `main`, GitHub Actions will:

- ✅ Build the Docker image
- ✅ Push it to Docker Hub
- ✅ SSH into your VM and deploy the new image

**Sample workflow:** create `.github/workflows/deploy.yml`

```yaml
name: Deploy to Cloud VM

on:
  push:
    branches: ['main']

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      - name: Set up Docker
        uses: docker/setup-buildx-action@v2

      - name: Build Docker image
        run: docker build -t music-app-backend .

      - name: Login to Docker Hub
        run: echo "${{ secrets.DOCKERHUB_TOKEN }}" | docker login -u "${{ secrets.DOCKERHUB_USERNAME }}" --password-stdin

      - name: Push to Docker Hub
        run: |
          docker tag music-app-backend ${{ secrets.DOCKERHUB_USERNAME }}/music-app-backend:latest
          docker push ${{ secrets.DOCKERHUB_USERNAME }}/music-app-backend:latest

      - name: SSH and deploy
        uses: appleboy/ssh-action@v0.1.10
        with:
          host: ${{ secrets.VM_HOST }}
          username: ${{ secrets.VM_USER }}
          key: ${{ secrets.VM_SSH_KEY }}
          script: |
            docker pull ${{ secrets.DOCKERHUB_USERNAME }}/music-app-backend:latest
            docker stop music-app || true
            docker rm music-app || true
            docker run -d -p 80:5000 --name music-app ${{ secrets.DOCKERHUB_USERNAME }}/music-app-backend:latest
```

👉 **Set secrets in your GitHub repo:**  
`DOCKERHUB_USERNAME`, `DOCKERHUB_TOKEN`, `VM_HOST`, `VM_USER`, `VM_SSH_KEY`

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
├── Dockerfile               # Container build instructions
└── .env                     # Environment variables
```

---

## ⚙️ Local Installation (without Docker)

If you want to run it locally the old way:

1. **Clone the repo:**

   ```bash
   git clone https://github.com/yourusername/music-app-backend.git
   cd music-app-backend
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Configure `.env`:**

   ```env
   MONGO_URI=mongodb://localhost:27017/musicapp
   JWT_SECRET=your_jwt_secret
   PORT=5000
   ```

4. **Run:**
   ```bash
   npm run dev
   ```

---

## 📡 API Endpoints

### 🔐 Auth

| Method | Endpoint             | Body                                             | Description |
| ------ | -------------------- | ------------------------------------------------ | ----------- |
| POST   | `/api/auth/register` | `{ "username": "string", "password": "string" }` | Register    |
| POST   | `/api/auth/login`    | `{ "username": "string", "password": "string" }` | Login       |

### 🎵 Songs

| Method | Endpoint                 | Body                                              | Description            |
| ------ | ------------------------ | ------------------------------------------------- | ---------------------- |
| GET    | `/api/songs`             | –                                                 | Get all songs          |
| POST   | `/api/songs`             | FormData `{ title, artist, duration, audioFile }` | Upload song (auth)     |
| POST   | `/api/songs/:id/like`    | –                                                 | Like a song (auth)     |
| POST   | `/api/songs/:id/comment` | FormData `{ text }`                               | Comment on song (auth) |

### 📂 Playlists

| Method | Endpoint         | Body                   | Description            |
| ------ | ---------------- | ---------------------- | ---------------------- |
| POST   | `/api/playlists` | `{ "name": "string" }` | Create playlist (auth) |

---

## 📊 Architecture Overview

```
Developer Push (GitHub)
   ↓
GitHub Actions (CI/CD)
   ↓ builds & pushes Docker image
Docker Hub Registry
   ↓
Cloud VM (Docker Engine)
   ↓
Running Music App Backend
```

💡 _(Add a diagram image `/docs/architecture.png` for extra polish!)_

---

## ▶️ Testing the API

Use Postman, Insomnia, or curl.

**Register user:**

```bash
curl -X POST http://localhost:5000/api/auth/register \
-H "Content-Type: application/json" \
-d '{"username":"testuser","password":"123456"}'
```

**Login:**

```bash
curl -X POST http://localhost:5000/api/auth/login \
-H "Content-Type: application/json" \
-d '{"username":"testuser","password":"123456"}'
```

**Upload song:**

```bash
curl -X POST http://localhost:5000/api/songs \
-H "Authorization: Bearer <YOUR_TOKEN>" \
-F "title=My Song" \
-F "artist=Me" \
-F "duration=180" \
-F "audioFile=@/path/to/audio.mp3"
```

---

## ✨ Future Improvements

- 🔔 Add notifications
- 💬 Add comments on songs
- 🎧 Playlist management (add/remove songs)
- 📈 Pagination & search
- ☁️ Add Terraform/Ansible for full infrastructure-as-code

---

## 📜 License

MIT © 2025 Shegzy-Dev
