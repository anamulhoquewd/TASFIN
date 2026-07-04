# TASFIN

A modern full-stack TypeScript application designed for financial task management and operations. TASFIN provides a comprehensive suite of tools for managing tasks and workflows with a clean, intuitive interface.

**🌐 Live Demo:** [tasfin.vercel.app](https://tasfin.vercel.app)

---

## 📋 Table of Contents

- [Overview](#overview)
- [Project Structure](#project-structure)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Installation](#installation)
- [Development](#development)
- [Production Build](#production-build)
- [Features](#features)
- [Environment Variables](#environment-variables)
- [Contributing](#contributing)
- [License](#license)

---

## 🎯 Overview

TASFIN is a comprehensive task management application with three main components:

- **Frontend** - User-facing application built with Next.js 15 and modern React patterns
- **Backend** - RESTful API powered by Hono and MongoDB
- **Admin Dashboard** - Administrative interface for managing system operations

The project is written entirely in **TypeScript** (99.1%), ensuring type safety and code reliability across all services.

---

## 📁 Project Structure

```
TASFIN/
├── frontend/          # Next.js 15 client application
├── backend/           # Hono API server
├── admin/             # Next.js 15 admin dashboard
└── README.md          # Project documentation
```

### Frontend (`/frontend`)
- Next.js 15 with Turbopack for fast development
- React 19 with modern hooks
- Tailwind CSS 4 for styling
- Radix UI components for accessible UI
- Form handling with React Hook Form
- State management with easy-peasy
- Charts with Recharts
- Notifications with Sonner

### Backend (`/backend`)
- Hono framework for high-performance API
- MongoDB with Mongoose ORM
- AWS S3 integration
- Email notifications with Nodemailer
- Authentication with bcrypt
- Input validation with Zod

### Admin Dashboard (`/admin`)
- Next.js 15 admin interface
- Rich text editing with TipTap
- Complex UI components with Radix UI
- Theme support with next-themes
- Advanced form validation

---

## 🛠 Tech Stack

### Frontend & Admin
- **Framework:** Next.js 15.3.8 / 15.5.9
- **Runtime:** React 18.3.1 / 19.1.0
- **Language:** TypeScript 5
- **Styling:** Tailwind CSS 4
- **UI Components:** Radix UI
- **Forms:** React Hook Form + Zod
- **State Management:** easy-peasy
- **Charts:** Recharts
- **Icons:** Lucide React
- **Utilities:** Date-fns, clsx, tailwind-merge

### Backend
- **Framework:** Hono 4.9.0
- **Runtime:** Node.js with tsx
- **Database:** MongoDB (Mongoose 8.17.1)
- **Language:** TypeScript 5.8.3
- **Authentication:** bcrypt 6.0.0
- **Cloud Storage:** AWS S3 SDK
- **Email:** Nodemailer 7.0.5
- **Validation:** Zod 4.0.16
- **HTTP Client:** Axios 1.11.0

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+ (recommended 20+)
- **npm** or **yarn**
- **MongoDB** instance (local or cloud)
- **AWS S3** credentials (optional, for file uploads)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/anamulhoquewd/TASFIN.git
   cd TASFIN
   ```

2. **Install dependencies**
   ```bash
   # Frontend
   cd frontend
   npm install

   # Backend
   cd ../backend
   npm install

   # Admin Dashboard
   cd ../admin
   npm install
   ```

---

## 💻 Development

### Frontend
```bash
cd frontend
npm run dev
```
Starts dev server at `http://localhost:3000` with Turbopack

### Backend
```bash
cd backend
npm run dev
```
Starts development server with hot reload using tsx watch

### Admin Dashboard
```bash
cd admin
npm run dev
```
Starts admin dev server at `http://localhost:3001` (or next available port)

---

## 🏗 Production Build

### Frontend
```bash
cd frontend
npm run build
npm run start
```

### Backend
```bash
cd backend
npm run build
npm start
```

### Admin Dashboard
```bash
cd admin
npm run build
npm run start
```

---

## ✨ Features

- **Task Management** - Create, update, and track financial tasks
- **Admin Dashboard** - Comprehensive admin interface with analytics
- **Rich Text Editor** - TipTap-powered content editing in admin panel
- **Responsive Design** - Mobile-friendly interface across all platforms
- **Dark/Light Mode** - Theme switching support
- **Real-time Validation** - Zod schema validation on forms
- **Cloud Storage** - AWS S3 integration for file management
- **Email Notifications** - Nodemailer integration for alerts
- **Modern UI/UX** - Accessible components with Radix UI

---

## 🔐 Environment Variables

### Backend `.env`
```
DATABASE_URL=mongodb://connection_string
AWS_ACCESS_KEY_ID=your_aws_key
AWS_SECRET_ACCESS_KEY=your_aws_secret
AWS_REGION=us-east-1
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
JWT_SECRET=your_secret_key
```

### Frontend `.env.local`
```
NEXT_PUBLIC_API_URL=http://localhost:PORT
```

### Admin `.env.local`
```
NEXT_PUBLIC_API_URL=http://localhost:PORT
```

---

## 📝 Scripts

### Frontend/Admin
- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Backend
- `npm run dev` - Start dev server with hot reload
- `npm run build` - Compile TypeScript
- `npm start` - Start production server

---

## 🤝 Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is open source and available under the MIT License.

---

## 📞 Support

For issues, questions, or suggestions, please open an issue on the [GitHub repository](https://github.com/anamulhoquewd/TASFIN/issues).

---

**Built with ❤️ by [anamulhoquewd](https://github.com/anamulhoquewd)**
