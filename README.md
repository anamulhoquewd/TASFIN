# TASFIN

A modern, full-stack TypeScript e-commerce platform specializing in women's fashion with an integrated financial management dashboard. TASFIN combines a seamless shopping experience with powerful business intelligence tools for inventory, order, and stock management.

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

TASFIN is a comprehensive women's fashion e-commerce solution consisting of three main applications:

- **Frontend** - Customer-facing e-commerce storefront with product browsing, shopping cart, and checkout
- **Backend** - RESTful API powering the platform with business logic, payment processing, and data management
- **Admin Dashboard** - Financial and operations management interface for orders, inventory, stock levels, and analytics

The entire project is written in **TypeScript** (99.1%), ensuring type safety and code reliability across all services.

---

## 📁 Project Structure

```
TASFIN/
├── frontend/          # E-commerce storefront (Next.js 15)
├── backend/           # API server (Hono + MongoDB)
├── admin/             # Financial & Operations Dashboard (Next.js 15)
└── README.md          # Project documentation
```

### Frontend (`/frontend`)
Customer-facing e-commerce application featuring:
- Product catalog and search
- Shopping cart and wishlist
- Secure checkout process
- Order tracking
- User account management
- Responsive mobile design

**Technologies:**
- Next.js 15 with Turbopack
- React 19 with modern hooks
- Tailwind CSS 4
- Radix UI components
- React Hook Form + Zod validation
- Swiper for product carousels
- Sonner for notifications

### Backend (`/backend`)
Core API server handling:
- Product and inventory management
- Order processing
- Payment integration
- User authentication & authorization
- Email notifications
- File uploads to AWS S3

**Technologies:**
- Hono framework
- MongoDB with Mongoose
- AWS S3 integration
- Nodemailer for email services
- bcrypt for security
- Zod for validation

### Admin Dashboard (`/admin`)
Financial management interface featuring:
- Order management and tracking
- Inventory overview
- Stock level monitoring
- Revenue analytics
- Rich text editing for content
- Charts and data visualization
- User and permission management

**Technologies:**
- Next.js 15 with Turbopack
- React 18 with advanced state management
- Tailwind CSS 4
- Radix UI components
- TipTap rich text editor
- Recharts for analytics
- easy-peasy for state management
- Theme support (light/dark mode)

---

## 🛠 Tech Stack

### Frontend & Admin
- **Framework:** Next.js 15.3.8 / 15.5.9
- **Runtime:** React 18.3.1 / 19.1.0
- **Language:** TypeScript 5
- **Styling:** Tailwind CSS 4
- **UI Components:** Radix UI (accordion, dialog, menu, dropdown, select, tabs, etc.)
- **Forms:** React Hook Form + Zod validation
- **State Management:** easy-peasy (admin)
- **Charts:** Recharts (admin)
- **Carousel:** Swiper (frontend)
- **Icons:** Lucide React
- **Utilities:** Date-fns, clsx, tailwind-merge
- **Notifications:** Sonner
- **Rich Text:** TipTap (admin)
- **Analytics:** Vercel Analytics (frontend)
- **Drawer:** Vaul (frontend)

### Backend
- **Framework:** Hono 4.9.0
- **Runtime:** Node.js with tsx
- **Database:** MongoDB (Mongoose 8.17.1)
- **Language:** TypeScript 5.8.3
- **Security:** bcrypt 6.0.0
- **Cloud Storage:** AWS S3 SDK
- **Email:** Nodemailer 7.0.5
- **Validation:** Zod 4.0.16
- **HTTP Client:** Axios 1.11.0
- **Environment:** dotenv

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+ (recommended 20+)
- **npm** or **yarn**
- **MongoDB** instance (local or cloud - Atlas recommended)
- **AWS S3** credentials (for product image uploads)
- **Email service** credentials (Gmail, SendGrid, etc.)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/anamulhoquewd/TASFIN.git
   cd TASFIN
   ```

2. **Install dependencies for all services**
   ```bash
   # Frontend
   cd frontend
   npm install
   cd ..

   # Backend
   cd backend
   npm install
   cd ..

   # Admin Dashboard
   cd admin
   npm install
   cd ..
   ```

---

## 💻 Development

### Frontend (E-commerce Storefront)
```bash
cd frontend
npm run dev
```
Starts at `http://localhost:3000` with Turbopack hot reload

### Backend (API Server)
```bash
cd backend
npm run dev
```
Starts development server with automatic restart on file changes

### Admin Dashboard
```bash
cd admin
npm run dev
```
Starts at `http://localhost:3001` (or next available port) with Turbopack

**Access the services:**
- 🛍️ Frontend: http://localhost:3000
- 📊 Admin Dashboard: http://localhost:3001
- 🔌 Backend API: http://localhost:PORT (check backend output)

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

### Customer Features
- **Product Browsing** - Explore women's fashion collection with filters and search
- **Shopping Cart** - Add/remove items, quantity management, persistent storage
- **Wishlist** - Save favorite items for later
- **Secure Checkout** - Streamlined payment process
- **Order Tracking** - Real-time order status updates
- **User Accounts** - Profile management and order history
- **Responsive Design** - Optimized for desktop, tablet, and mobile
- **Product Reviews** - Customer ratings and feedback

### Admin Dashboard Features
- **Order Management** - View, filter, and manage all customer orders
- **Inventory Tracking** - Monitor stock levels by product and size
- **Stock Management** - Update inventory, set reorder points, track movement
- **Financial Analytics** - Revenue reports, sales trends, profit margins
- **Dashboard Charts** - Visual data representation with Recharts
- **User Management** - Admin and staff account management
- **Content Management** - Edit product descriptions and details with rich text editor
- **Notifications** - Email alerts for low stock and new orders

### Technical Features
- **Type Safety** - Full TypeScript implementation
- **API Documentation** - RESTful API with clear endpoints
- **Authentication** - Secure user and admin authentication
- **AWS Integration** - Cloud storage for product images
- **Email Notifications** - Automated order and system alerts
- **Form Validation** - Client and server-side validation with Zod
- **Dark/Light Mode** - Theme switching in admin dashboard
- **Scalable Architecture** - Modular and maintainable codebase

---

## 🔐 Environment Variables

### Backend `.env`
```env
# Database
DATABASE_URL=mongodb+srv://username:password@cluster.mongodb.net/tasfin

# AWS S3
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
AWS_REGION=us-east-1
AWS_S3_BUCKET=your-bucket-name

# Email Service
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password

# Authentication
JWT_SECRET=your_jwt_secret_key
SESSION_SECRET=your_session_secret

# Server
PORT=5000
NODE_ENV=development
```

### Frontend `.env.local`
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_STORE_NAME=TASFIN
```

### Admin `.env.local`
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_ADMIN_NAME=TASFIN Admin
```

---

## 📝 Scripts

### Frontend/Admin
- `npm run dev` - Start dev server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Backend
- `npm run dev` - Start dev server with hot reload
- `npm run build` - Compile TypeScript to JavaScript
- `npm start` - Start production server

---

## 🤝 Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

Please ensure:
- Code is written in TypeScript
- All functions have proper type annotations
- Changes are tested locally
- Commit messages are descriptive

---

## 📄 License

This project is open source and available under the MIT License.

---

## 📞 Support

For issues, questions, or suggestions, please:
- Open an issue on the [GitHub repository](https://github.com/anamulhoquewd/TASFIN/issues)
- Check existing issues for similar problems
- Provide detailed reproduction steps for bugs

---

## 🎨 Branding

**TASFIN** - Your premier destination for curated women's fashion with smart business management.

---

**Built with ❤️ by [anamulhoquewd](https://github.com/anamulhoquewd)**
