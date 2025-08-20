# E-Commerce Admin Dashboard

## Overview

This is a modern admin dashboard for e-commerce store management built with **Next.js 15**, **React 19**, **TypeScript**, and **Tailwind CSS**. The dashboard provides a comprehensive interface for managing products, categories, orders, and store settings with a beautiful, responsive design.

## Features

### Core Features

- **Product Management**: Create, edit, delete, and view products with image uploads
- **Category Management**: Organize products into categories with slug-based routing
- **Order Management**: View and manage customer orders
- **Settings Management**: Configure store settings and preferences
- **Responsive Design**: Mobile-first responsive design with dark/light theme support
- **Real-time Updates**: Live data updates with optimistic UI
- **Image Upload**: Drag-and-drop image upload with preview
- **Form Validation**: Client-side validation with React Hook Form and Zod

### Technical Features

- **Next.js 15**: Latest React framework with App Router
- **React 19**: Latest React with concurrent features
- **TypeScript**: Full type safety and better development experience
- **Tailwind CSS**: Utility-first CSS framework with custom design system
- **shadcn/ui**: Modern UI component library
- **React Hook Form**: Performant form handling with validation
- **Axios**: HTTP client for API communication
- **Lucide React**: Beautiful icon library
- **Sonner**: Toast notifications
- **Next Themes**: Dark/light theme switching

## Architecture

### Project Structure

```
dashboad/
├── app/
│   ├── dashboard/           # Dashboard pages
│   │   ├── categories/      # Category management
│   │   │   ├── _components/ # Category-specific components
│   │   │   ├── _hooks/      # Category custom hooks
│   │   │   ├── create/      # Create category page
│   │   │   └── page.tsx     # Categories list page
│   │   ├── orders/          # Order management
│   │   │   └── page.tsx     # Orders list page
│   │   ├── products/        # Product management
│   │   │   ├── _components/ # Product-specific components
│   │   │   ├── _hooks/      # Product custom hooks
│   │   │   ├── create/      # Create product page
│   │   │   └── page.tsx     # Products list page
│   │   ├── settings/        # Settings management
│   │   │   └── page.tsx     # Settings page
│   │   └── page.tsx         # Dashboard home page
│   ├── favicon.ico
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Landing page
├── components/
│   ├── admin-sidebar.tsx    # Admin navigation sidebar
│   ├── theme-provider.tsx   # Theme context provider
│   └── ui/                  # shadcn/ui components
│       ├── button.tsx
│       ├── checkbox.tsx
│       ├── form.tsx
│       ├── input.tsx
│       ├── label.tsx
│       ├── select.tsx
│       ├── separator.tsx
│       ├── sheet.tsx
│       ├── sidebar.tsx
│       ├── skeleton.tsx
│       ├── sonner.tsx
│       ├── table.tsx
│       ├── tabs.tsx
│       ├── textarea.tsx
│       └── tooltip.tsx
├── hooks/
│   └── use-mobile.ts        # Mobile detection hook
├── interfaces/
│   ├── category.ts          # Category type definitions
│   ├── global.ts            # Global type definitions
│   └── products.ts          # Product type definitions
├── lib/
│   ├── schemas.ts           # Zod validation schemas
│   └── utils.ts             # Utility functions
├── storage/
│   └── local.ts             # Local storage utilities
└── api/
    └── axios-init.ts        # Axios configuration
```

### Data Flow

1. **API Integration**: Axios client configured for backend communication
2. **State Management**: React hooks for local state management
3. **Form Handling**: React Hook Form with Zod validation
4. **UI Updates**: Optimistic updates with error handling
5. **Theme Management**: Context-based theme switching

## Pages & Components

### Dashboard Home (`app/dashboard/page.tsx`)

Main dashboard overview with key metrics and quick actions.

**Features:**

- Welcome message
- Quick navigation to main sections
- Overview of recent activities

### Products Management

#### Products List (`app/dashboard/products/page.tsx`)

Comprehensive product management interface.

**Features:**

- Product table with search and filtering
- Bulk actions (delete, update status)
- Add new product button
- Product image previews
- Edit and delete actions per product

**Components:**

- Product table with sorting
- Search functionality
- Pagination controls
- Action buttons

#### Create Product (`app/dashboard/products/create/page.tsx`)

Product creation form with image upload.

**Features:**

- Multi-step form wizard
- Image upload with drag-and-drop
- Category selection
- Color and size management
- Price and inventory setup
- SEO fields (keywords, description)

**Components:**

- `ProductForm` - Main form component
- `ImageUpload` - Drag-and-drop image upload
- `CategorySelect` - Category dropdown
- `ColorSizeManager` - Color and size management

### Categories Management

#### Categories List (`app/dashboard/categories/page.tsx`)

Category management interface.

**Features:**

- Category table with slug display
- Create new category
- Edit existing categories
- Delete categories with confirmation

#### Create Category (`app/dashboard/categories/create/page.tsx`)

Category creation form.

**Features:**

- Category name input
- Auto-generated slug
- Form validation

### Orders Management (`app/dashboard/orders/page.tsx`)

Order tracking and management.

**Features:**

- Order list with status indicators
- Order details view
- Status updates
- Customer information
- Payment status tracking

### Settings (`app/dashboard/settings/page.tsx`)

Store configuration and preferences.

**Features:**

- Store information settings
- Theme preferences
- Notification settings
- API configuration

## Components

### Layout Components

#### Admin Sidebar (`components/admin-sidebar.tsx`)

Navigation sidebar for admin dashboard.

**Features:**

- Collapsible navigation menu
- Active page highlighting
- Mobile responsive design
- Theme-aware styling

**Navigation Items:**

- Dashboard
- Products
- Categories
- Orders
- Settings

#### Theme Provider (`components/theme-provider.tsx`)

Theme context provider for dark/light mode switching.

**Features:**

- Theme persistence in localStorage
- System theme detection
- Smooth theme transitions

### UI Components

Built with shadcn/ui for consistent design:

- **Button**: Various button styles and states
- **Form**: Form components with validation
- **Input**: Text input with validation states
- **Select**: Dropdown selection component
- **Table**: Data table with sorting and pagination
- **Modal**: Dialog and sheet components
- **Toast**: Notification system with Sonner

### Custom Hooks

#### useProducts (`app/dashboard/products/_hooks/useProducts.ts`)

Product management hook.

**Features:**

- Product CRUD operations
- Loading states
- Error handling
- Optimistic updates

#### useCategories (`app/dashboard/categories/_hooks/useCategories.ts`)

Category management hook.

**Features:**

- Category CRUD operations
- Loading states
- Error handling

#### useUploads (`app/dashboard/products/_hooks/useUploads.ts`)

Image upload hook.

**Features:**

- File upload to S3
- Progress tracking
- Error handling
- Image preview

## Setup Instructions

### Prerequisites

- Node.js (v18 or higher)
- pnpm package manager
- Backend API running (see backend README)

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd dashboad
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Environment Configuration**
   Create a `.env.local` file:

   ```env
   # API Configuration
   NEXT_PUBLIC_API_URL=http://localhost:4000/api/v1

   # Store Configuration
   NEXT_PUBLIC_STORE_NAME="Your Store Name"

   # Theme Configuration
   NEXT_PUBLIC_DEFAULT_THEME=system
   ```

4. **Run the development server**

   ```bash
   pnpm dev
   ```

5. **Open the application**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Environment Variables

| Variable                    | Description                       | Required |
| --------------------------- | --------------------------------- | -------- |
| `NEXT_PUBLIC_API_URL`       | Backend API base URL              | Yes      |
| `NEXT_PUBLIC_STORE_NAME`    | Store display name                | No       |
| `NEXT_PUBLIC_DEFAULT_THEME` | Default theme (light/dark/system) | No       |

## Development

### Scripts

```bash
pnpm dev        # Start development server
pnpm build      # Build for production
pnpm start      # Start production server
pnpm lint       # Run ESLint
```

### Code Style

- Use TypeScript for all components
- Follow ESLint configuration
- Use Tailwind CSS for styling
- Implement proper error handling
- Use React Hook Form for forms
- Follow accessibility guidelines

### Component Guidelines

- Keep components focused and reusable
- Use proper TypeScript interfaces
- Implement loading and error states
- Use optimistic updates where appropriate
- Follow the established design system

### State Management

- Use React hooks for local state
- Implement proper form handling with React Hook Form
- Use context for global state (theme, auth)
- Manage API state with custom hooks

## API Integration

### Axios Configuration (`api/axios-init.ts`)

Configured Axios instance with:

- Base URL configuration
- Request/response interceptors
- Error handling
- Authentication headers
- Request timeout

### API Endpoints

The dashboard integrates with the backend API:

- **Products**: `/api/v1/products`
- **Categories**: `/api/v1/categories`
- **Uploads**: `/api/v1/uploads`
- **Orders**: `/api/v1/orders` (when implemented)

## Customization

### Adding New Pages

1. Create a new directory in `app/dashboard/`
2. Add `page.tsx` for the main page
3. Update the sidebar navigation
4. Add any required components and hooks

### Styling

The application uses Tailwind CSS with a custom design system:

- **Colors**: Custom color palette with dark mode support
- **Typography**: Consistent font sizes and weights
- **Spacing**: Standardized spacing scale
- **Components**: shadcn/ui components for consistency

### Theme Customization

Modify the theme configuration in:

- `components/theme-provider.tsx`
- `app/globals.css`
- `tailwind.config.js`

## Technologies Used

- **[Next.js 15](https://nextjs.org/)** - React framework with App Router
- **[React 19](https://react.dev/)** - UI library with concurrent features
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[shadcn/ui](https://ui.shadcn.com/)** - Modern UI component library
- **[React Hook Form](https://react-hook-form.com/)** - Performant form handling
- **[Zod](https://zod.dev/)** - Schema validation
- **[Axios](https://axios-http.com/)** - HTTP client
- **[Lucide React](https://lucide.dev/)** - Icon library
- **[Sonner](https://sonner.emilkowal.ski/)** - Toast notifications

## Contributing

1. Follow the existing code structure
2. Add proper TypeScript types
3. Test responsive design
4. Update documentation as needed
5. Follow accessibility guidelines

## License

This project is licensed under the MIT License.

---

For more information, contact the development team or refer to the component documentation.
