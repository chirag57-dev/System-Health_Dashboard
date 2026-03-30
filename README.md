# System Health Dashboard

A real-time server monitoring dashboard that tracks live infrastructure metrics — CPU utilization, memory consumption, disk usage, and active processes. Built with a full DevOps pipeline including Docker containerization, CI/CD automation, and cloud deployment.

## Live Demo
- Frontend: https://system-health-dashboard-psi.vercel.app
- Backend API: https://system-health-dashboard-q0j6.onrender.com/health

## Features
- Real-time CPU, memory, and disk monitoring
- Live process count tracking
- Auto-refresh every 3 seconds
- Fully containerized with Docker
- Automated CI/CD pipeline via GitHub Actions
- Cloud deployed on Render + Vercel

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React.js |
| Backend | Node.js + Express |
| Metrics | systeminformation |
| Containerization | Docker + Docker Compose |
| CI/CD | GitHub Actions |
| Deployment | Render (backend) + Vercel (frontend) |

## Architecture

```
GitHub Push
    ↓
GitHub Actions (CI/CD)
    ↓
Docker Image Build
    ↓
Render (Backend API) ←→ Vercel (Frontend)
```

## Run Locally

### Prerequisites
- Docker Desktop installed
- Node.js installed

### Using Docker (Recommended)
```bash
git clone https://github.com/chirag57-dev/System-Health_Dashboard.git
cd System-Health_Dashboard
docker-compose up --build
```
Visit http://localhost:3000

### Without Docker
```bash
# Backend
cd backend
npm install
node index.js

# Frontend (new terminal)
cd frontend
npm install
npm start
```

## API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| /health | GET | Returns live system metrics |

### Sample Response
```json
{
  "cpu": { "usage": "21.39" },
  "memory": { "total": "23.71", "used": "15.39", "free": "8.33" },
  "disk": { "total": "224.71", "used": "196.82", "free": "27.90" },
  "os": { "platform": "linux", "distro": "Alpine Linux" },
  "processes": 4
}
```

## CI/CD Pipeline

Every push to the `main` branch automatically:
1. Triggers GitHub Actions workflow
2. Builds backend Docker image
3. Builds frontend Docker image
4. Validates the build

## Project Structure

```
System-Health_Dashboard/
├── backend/
│   ├── Dockerfile
│   ├── index.js
│   └── package.json
├── frontend/
│   ├── Dockerfile
│   ├── src/
│   │   └── App.js
│   └── package.json
├── .github/
│   └── workflows/
│       └── deploy.yml
└── docker-compose.yml
```

## Author
Chirag Gurjar — [LinkedIn](https://www.linkedin.com/in/chirag-gurjara199a5312) · [GitHub](https://github.com/chirag57-dev)
