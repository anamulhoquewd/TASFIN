# TASFIN Admin Dashboard

A modern, feature-rich admin dashboard built with Next.js 15, React, TypeScript, and Tailwind CSS for managing the TASFIN e-commerce platform.

## 📋 Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Features](#features)
- [Architecture](#architecture)
- [Key Directories](#key-directories)
- [Development Guidelines](#development-guidelines)

## 🎯 Overview

The TASFIN Admin Dashboard is a comprehensive administrative interface for managing products, orders, customers, categories, users, and system settings. It provides a modern, responsive UI with real-time analytics, form validation, and secure authentication.

## 🛠 Tech Stack

### Core Technologies

- **Next.js 15.3.1** - React framework with App Router
- **React 18.3.1** - UI library
- **TypeScript 5** - Type safety
- **Tailwind CSS 4** - Utility-first CSS framework

### Key Libraries

- **React Hook Form** - Form management
- **Zod** - Schema validation
- **Axios** - HTTP client
- **Radix UI** - Accessible component primitives
- **Recharts** - Data visualization
- **TipTap** - Rich text editor
- **Sonner** - Toast notifications
- **Next Themes** - Dark mode support
- **Date-fns** - Date utilities

## 📁 Project Structure

```
admin/
├── app/                          # Next.js App Router
│   ├── admin/                    # Admin dashboard pages
│   │   ├── categories/           # Category management
│   │   ├── customers/            # Customer management
│   │   ├── me/                   # Admin profile
│   │   ├── orders/               # Order management
│   │   ├── payments/             # Payment management
│   │   ├── products/             # Product management
│   │   │   ├── [productId]/     # Product detail page
│   │   │   ├── new/              # Create product page
│   │   │   ├── _components/      # Product components
│   │   │   └── _hook/            # Product hooks
│   │   ├── settings/             # System settings
│   │   └── users/                # User management
│   ├── auth/                     # Authentication pages
│   │   ├── sign-in/              # Login page
│   │   ├── forgot-password/      # Password recovery
│   │   └── reset-password/       # Password reset
│   └── layout.tsx                # Root layout
├── components/                    # Reusable components
│   ├── ui/                       # shadcn/ui components
│   ├── auth/                     # Auth-related components
│   └── layout/                   # Layout components
├── hooks/                        # Custom React hooks
│   └── auth/                     # Authentication hooks
├── interfaces/                   # TypeScript interfaces
│   ├── categories/
│   ├── orders/
│   ├── products/
│   └── users/
├── lib/                          # Utility libraries
│   ├── schemas.ts               # Zod schemas
│   └── utils.ts                 # Helper functions
├── axios/                        # API configuration
│   └── interceptor.ts           # Axios interceptors
├── context/                      # React contexts
│   └── AuthContext.tsx          # Authentication context
├── utils/                        # Utility functions
├── middleware.ts                 # Next.js middleware
└── package.json                  # Dependencies

```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm/yarn

### Installation

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Run linter
pnpm lint
```

The application will be available at `http://localhost:3000`

## ✨ Features

### 🔐 Authentication & Authorization

- Secure JWT-based authentication
- Role-based access control (super_admin, admin)
- Protected routes via middleware
- Password reset functionality
- Session management

### 📦 Product Management

- **Create Products**: Multi-step form with validation
- **Edit Products**: Inline editing with dialogs
- **Product Variants**: Size, color, SKU, stock, price management
- **Image Upload**: Multiple images per product and variant
- **Product Analytics**: Sales charts, views tracking, top variants
- **Filters & Search**: Advanced filtering and search capabilities

### 📊 Order Management

- Order listing with status tracking
- Order details and item management
- Status update dialogs
- Order analytics

### 👥 Customer Management

- Customer listing and details
- Customer profile management
- Update customer information

### 🏷️ Category Management

- Create and update categories
- Category hierarchy management
- Category filtering

### 💳 Payment Management

- Payment history tracking
- Payment status management
- Payment analytics

### 👤 User Management

- Admin user listing
- Create new admin users
- User role management
- Profile management

### ⚙️ Settings

- Site configuration
- Logo and favicon management
- Contact information
- Social media links
- Address management

### 📈 Analytics & Reporting

- Product performance metrics
- Sales charts and trends
- View statistics
- Top performing variants

## 🏗 Architecture

### Authentication Flow

1. User logs in via `/auth/sign-in`
2. JWT tokens stored in HTTP-only cookies
3. Middleware validates tokens on protected routes
4. AuthContext provides user state across the app

### Data Flow

1. **Hooks** (`_hook/`) - Business logic and API calls
2. **Components** (`_components/`) - UI components
3. **Pages** (`page.tsx`) - Route handlers
4. **Schemas** (`lib/schemas.ts`) - Validation rules

### Form Management

- React Hook Form for form state
- Zod for schema validation
- `zodResolver` for form validation
- Type-safe form handling with TypeScript

## 📂 Key Directories

### `/app/admin/products`

Complete product management system:

- **`page.tsx`**: Product listing with filters
- **`new/page.tsx`**: Create new product
- **`[productId]/page.tsx`**: Product detail view
- **`_hook/useProducts.ts`**: Product CRUD operations
- **`_components/`**: Reusable product components

### `/components/ui`

shadcn/ui component library:

- Pre-built, accessible components
- Customizable with Tailwind CSS
- Based on Radix UI primitives

### `/lib/schemas.ts`

Zod validation schemas:

- Product schemas (`productZ`, `productVariantZ`)
- Category schemas
- User schemas
- Form validation schemas

### `/hooks/auth`

Authentication hooks:

- `useLogin.ts` - Login functionality
- `useMe.ts` - Get current user
- `useAvatar.ts` - Avatar management
- `useChangePass.ts` - Password change
- `useFormgot.ts` - Forgot password
- `useReset.ts` - Reset password

## 💻 Development Guidelines

### Code Style

- Use TypeScript for all new files
- Follow Next.js App Router conventions
- Use functional components with hooks
- Implement proper error handling

### Component Structure

```typescript
// Component file structure
"use client"; // If using client-side features

import { useState } from "react";

interface ComponentProps {
  // Props interface
}

export default function Component({ prop }: ComponentProps) {
  // Component logic
  return (
    // JSX
  );
}
```

### Form Handling

```typescript
// Example form with validation
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const schema = z.object({
  // Schema definition
});

const form = useForm<z.input<typeof schema>>({
  resolver: zodResolver(schema),
  defaultValues: {
    // Default values
  },
});
```

### API Calls

```typescript
// Use axios interceptor for API calls
import api from "@/axios/interceptor";

const response = await api.get("/endpoint");
const data = await api.post("/endpoint", payload);
```

### Type Safety

- Define interfaces in `/interfaces/`
- Use Zod schemas for runtime validation
- Leverage TypeScript's type inference
- Use `z.input<>` for form types, `z.infer<>` for output types

### State Management

- Use React hooks (`useState`, `useEffect`)
- Context API for global state (`AuthContext`)
- React Hook Form for form state
- Custom hooks for reusable logic

## 🔒 Security

- JWT tokens stored in HTTP-only cookies
- Middleware-based route protection
- Role-based access control
- Input validation with Zod
- XSS protection via React

## 🎨 Styling

- Tailwind CSS utility classes
- Dark mode support via `next-themes`
- Responsive design (mobile-first)
- Custom CSS variables for theming
- shadcn/ui component styling

## 📝 Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
# Add other environment variables as needed
```

## 🐛 Troubleshooting

### Common Issues

1. **Type errors with forms**: Ensure you're using `z.input<typeof schema>` for form types
2. **Middleware redirects**: Check token expiration and cookie settings
3. **API errors**: Verify axios interceptor configuration
4. **Build errors**: Clear `.next` folder and rebuild

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Hook Form](https://react-hook-form.com/)
- [Zod Documentation](https://zod.dev/)
- [shadcn/ui Components](https://ui.shadcn.com/)
- [Tailwind CSS](https://tailwindcss.com/)

## 🤝 Contributing

1. Follow the existing code structure
2. Write TypeScript types for all props and data
3. Use Zod schemas for validation
4. Add error handling to API calls
5. Write descriptive commit messages

## 📄 License

Private - TASFIN Project

---

**Built with ❤️ for TASFIN**
