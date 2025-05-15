# SnapAuth — KYC Verification Platform 🔐

<div align="center">
  
[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

</div>

SnapAuth is a robust full-stack web application designed for seamless Know Your Customer (KYC) verification using image and video uploads. Built with the MERN stack (MongoDB, Express, React, Node.js), it offers enterprise-grade security features and an intuitive user experience.

## 🌐 Live Deployment

- **Frontend**: [https://snapauth.razzz.site](https://snapauth.razzz.site)
- **Backend API**: [https://snapauth-api.razzz.site](https://snapauth-api.razzz.site)

## ✨ Features

- 📱 Responsive design for all devices
- 🔐 Secure authentication system with JWT
- 👥 Role-based access control (Admin/User)
- 📸 Image and video capture for identity verification
- 🔄 Real-time verification status updates
- 🔍 Admin dashboard for verification management
- 📊 Analytics and reporting capabilities
- 🌙 Dark/Light mode support

## 🧰 Tech Stack

### Frontend
- **Framework**: React with TypeScript
- **Styling**: TailwindCSS with custom components
- **Forms**: Formik with Yup validation
- **Media**: React Media Recorder for video capture
- **State Management**: Context API
- **HTTP Client**: Axios

### Backend
- **Runtime**: Node.js
- **Framework**: Express
- **Language**: TypeScript
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **File Upload**: Multer middleware
- **Validation**: express-validator

### DevOps & Deployment
- **Server**: Ubuntu LTS
- **Process Manager**: PM2
- **Web Server**: NGINX as reverse proxy
- **SSL**: Let's Encrypt with Certbot
- **CI/CD**: GitHub Actions (optional)

## 📁 Directory Structure

```
snapauth-bw1-task/
├── api/                    # Express backend
├── client/                 # React frontend
├── .gitignore              # Gitignore
└── README.md               # README file
```

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v18+)
- npm or yarn
- MongoDB instance (local or Atlas)

### Clone the Repository

```bash
git clone https://github.com/eDenxGT/snapauth-bw1-task.git
cd snapauth
```

### Backend Setup

1. Navigate to the API directory:

```bash
cd api
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file:

```
PORT=your_api_port
NODE_ENV=dev or prod
MONGO_URI=mongo_uri/snapauth
ACCESS_TOKEN_SECRET=your_access_secret_key
REFRESH_TOKEN_SECRET=your_refresh_secret_key
CORS_ALLOWED_ORIGIN=http://localhost:5173
```

4. Start the development server:

```bash
npm run dev
```

Or with tsx directly:

```bash
npx tsx src/index.ts
```

### Frontend Setup

1. Navigate to the client directory:

```bash
cd client
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file:

```
VITE_API_AUTH_URL=http://localhost:5000/api/auth
VITE_API_PVT_URL=http://localhost:5000/api/pvt
```

4. Start the development server:

```bash
npm run dev
```

5. Access the application at `http://localhost:5173`

## 🧑‍💻 Development Guidelines

- Use ESLint and Prettier for code formatting
- Follow Git Flow branching model
- Write tests for all new features
- Document API endpoints using JSDoc
- Use meaningful commit messages

## 🤝 Contributing

Contributions are always welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📧 Contact

Project Creator: [eDen](mailto:edenxgt@gmail.com)

---

✨ Built with ❤️ by eDen