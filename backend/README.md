# TASFIN Backend API

## 🌟 Project Overview

TASFIN is a modern, full-featured e-commerce backend built with **Node.js**, **TypeScript**, and the **Hono** framework. It provides robust REST APIs for comprehensive e-commerce operations including user management, product catalog, order processing, coupon system, and administrative controls.

---

## 🚀 Key Features

### 🔐 Authentication & Authorization

- **JWT-based authentication** with access and refresh tokens
- **Role-based access control** (super_admin, admin)
- **Secure session management** with httpOnly cookies
- **Password hashing** using bcrypt
- **Automatic super admin creation** on database connection
- **Password reset** functionality with email verification
- **Token refresh** mechanism for seamless user experience

### 👥 User & Admin Management

- **User registration/login** via email or phone
- **Profile management** with address, avatar, and personal details
- **Avatar upload** using Cloudinary
- **Admin CRUD operations** with hierarchical roles
- **User blocking/activation** functionality
- **Password reset** via email
- **User search and filtering** with pagination

### 📦 Product Management

- **Product CRUD** with comprehensive details
- **Product variants** (size, color, SKU, stock, price)
- **Multiple images** per product and variant
- **Custom order support** with measurements
- **Product categorization** with multiple categories
- **Tags and key features** for enhanced searchability
- **Product status** management (active/inactive)
- **Featured and new product** flags
- **Advanced search** by title, slug, SKU, or ID
- **Product details** including fabric, cut-fit, wash care, etc.

### 📂 Category Management

- **Category CRUD** operations
- **Unique slug generation** for SEO-friendly URLs
- **Category images** via Cloudinary
- **Featured categories** support
- **Search and filtering** with pagination
- **Category description** and metadata

### 🛒 Order Management

- **Order creation** with multiple items
- **Order status tracking** (pending, processing, shipped, delivered, cancelled)
- **Status history** with notes and timestamps
- **Custom order support** with measurements and reference images
- **Coupon integration** for discounts
- **Payment status** tracking (unpaid/paid)
- **COD (Cash on Delivery)** payment method
- **Order search and filtering** with pagination
- **Address management** per order

### 🎫 Coupon System

- **Coupon creation** with discount types (percent/fixed)
- **Usage limits** (per user and total)
- **Date-based validity** (start/end dates)
- **Minimum subtotal** requirements
- **Maximum discount value** caps
- **Coupon validation** endpoint
- **Usage tracking** per user (phone-based)
- **Coupon status** management

### 📧 Subscriber Management

- **Email subscription** system
- **Subscription status** tracking (subscribed/unsubscribed)
- **Source tracking** for analytics
- **IP address and user agent** logging
- **Subscriber blocking** functionality
- **Verification status** management

### ⚙️ Settings Management

- **Site configuration** (name, description, logo, favicon)
- **Contact information** (email, phone, WhatsApp)
- **Address management** for business
- **Social media links** (Facebook, Twitter, Instagram, LinkedIn)
- **Logo upload** via Cloudinary

### 📁 File Management

- **Cloudinary integration** for secure file storage
- **Image upload** (single and multiple files)
- **Automatic format conversion** to WebP
- **File deletion** functionality
- **Public ID management** for efficient file handling
- **Folder organization** for different content types

### 🛡️ Security & Validation

- **Zod schema validation** for all inputs
- **CORS protection** with configurable origins
- **Secure headers** and HTTP security
- **Custom error handling** with proper HTTP status codes
- **Environment-based security** settings
- **Input sanitization** and validation
- **Rate limiting** ready architecture

### 📊 Data & API Management

- **MongoDB** with Mongoose ODM
- **TypeScript** for type safety
- **Efficient pagination** system
- **Advanced sorting** and filtering
- **Text-based search** across multiple fields
- **Proper data relationships** and references
- **Indexed queries** for performance

---

## 🏗️ Architecture & Tech Stack

### Core Technologies

- **Runtime**: Node.js 18+
- **Language**: TypeScript 5.8.3
- **Framework**: Hono 4.9.0
- **Database**: MongoDB (Mongoose 8.17.1)
- **Authentication**: JWT (jsonwebtoken)
- **File Storage**: Cloudinary 2.8.0
- **Email**: Nodemailer 7.0.5
- **Validation**: Zod 4.0.16
- **Package Manager**: pnpm
- **Build Tool**: tsx 4.7.1

### Project Structure

```
backend/
├── src/
│   ├── config/          # Database, email, Cloudinary configurations
│   │   ├── db.ts
│   │   ├── email.ts
│   │   └── cloudinary.ts
│   ├── controllers/     # Route handlers (MVC pattern)
│   │   ├── admins.controller.ts
│   │   ├── users.controller.ts
│   │   ├── categorise.controller.ts
│   │   ├── products.controller.ts
│   │   ├── orders.controller.ts
│   │   ├── coupon.controller.ts
│   │   ├── couponUsage.controller.ts
│   │   ├── subscriber.controller.ts
│   │   └── settings.controller.ts
│   ├── error/           # Custom error handlers
│   │   └── index.ts
│   ├── interfaces/      # TypeScript interfaces
│   │   └── index.ts
│   ├── middlewares/     # Authentication and authorization middleware
│   │   └── auth.middleware.ts
│   ├── models/          # Mongoose models
│   │   ├── admins.model.ts
│   │   ├── users.model.ts
│   │   ├── categorise.model.ts
│   │   ├── products.model.ts
│   │   ├── orders.model.ts
│   │   ├── coupon.model.ts
│   │   ├── couponUsage.model.ts
│   │   ├── subscribers.model.ts
│   │   ├── settings.model.ts
│   │   ├── reviews.model.ts
│   │   ├── payments.model.ts
│   │   ├── discounts.model.ts
│   │   └── offers.model.ts
│   ├── routes/          # API route definitions
│   │   ├── admins.route.ts
│   │   ├── users.route.ts
│   │   ├── categorise.route.ts
│   │   ├── products.route.ts
│   │   ├── orders.route.ts
│   │   ├── coupon.route.ts
│   │   ├── couponUsage.route.ts
│   │   ├── subscribers.controller.ts
│   │   └── settings.route.ts
│   ├── services/        # Business logic layer
│   │   ├── admins.service.ts
│   │   ├── users.service.ts
│   │   ├── categorise.service.ts
│   │   ├── products.service.ts
│   │   ├── orders.service.ts
│   │   ├── coupon.service.ts
│   │   ├── couponUsage.service.ts
│   │   ├── subscriber.service.ts
│   │   └── settings.service.ts
│   ├── utils/           # Utility functions
│   │   ├── cloudinary.ts
│   │   ├── pagination.ts
│   │   └── string-generator.ts
│   ├── validations/     # Zod validation schemas
│   │   └── zod.ts
│   └── index.ts         # Application entry point
├── package.json
├── pnpm-lock.yaml
├── tsconfig.json
└── README.md
```

---

## 🔧 Configuration & Setup

### Prerequisites

- **Node.js** 18 or higher
- **pnpm** package manager
- **MongoDB** database (local or cloud)
- **Cloudinary** account (for file storage)
- **Gmail** account (for email service)

### Environment Variables

Create a `.env` file in the root directory:

```env
# Database
MONGO_CLUSTER_URI=mongodb://localhost:27017/tasfin
# or for MongoDB Atlas:
# MONGO_CLUSTER_URI=mongodb+srv://username:password@cluster.mongodb.net/tasfin

# JWT Secrets
JWT_ACCESS_SECRET=your_access_secret_key_here
JWT_REFRESH_SECRET=your_refresh_secret_key_here

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Email Configuration (Gmail)
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password

# Cookie Secret
COOKIE_SECRET=your_cookie_secret

# CORS Configuration
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:5173

# Environment
NODE_ENV=development
```

### Installation & Development

```bash
# Clone the repository
git clone <repository-url>
cd TASFIN/backend

# Install dependencies
pnpm install

# Configure environment variables
cp .env.example .env
# Edit .env with your configuration

# Start development server (with hot reload)
pnpm dev
```

The server will start on `http://localhost:4000` by default.

### Build & Production

```bash
# Build TypeScript to JavaScript
pnpm build

# Start production server
pnpm start
```

### Database Setup

1. Create a MongoDB database (local or cloud)
2. Configure the connection string in `.env`
3. Start the application
4. Super admin and default settings will be automatically created on first connection

### Cloudinary Setup

1. Create a Cloudinary account at [cloudinary.com](https://cloudinary.com)
2. Get your cloud name, API key, and API secret
3. Configure them in `.env`
4. Test file upload functionality

---

## 📡 API Endpoints

Base URL: `http://localhost:4000/api/v1`

### Authentication Endpoints

#### Admin Authentication

- `POST /admins/register` - Register new admin (requires authentication)
- `POST /admins/log-in` - Admin login
- `POST /admins/log-out` - Admin logout
- `POST /admins/refresh` - Refresh access token
- `POST /admins/forgot-password` - Request password reset
- `PATCH /admins/reset-password/:resetToken` - Reset password with token

#### User Authentication

- `POST /users/register` - User registration
- `POST /users/log-in` - User login
- `POST /users/log-out` - User logout
- `POST /users/forgot-password` - Request password reset
- `PATCH /users/reset-password/:resetToken` - Reset password with token

### User Management Endpoints

#### User Operations (Authenticated)

- `GET /users/me` - Get current user profile
- `PATCH /users/me` - Update current user profile
- `PATCH /users/change-password` - Change user password
- `POST /users/upload-avatar` - Upload user avatar

#### Admin User Management

- `GET /users` - Get all users (admin only, with pagination)
- `GET /users/:_id` - Get specific user (admin only)
- `PATCH /users/by-admin/:_id` - Update user by admin
- `DELETE /users/:_id` - Delete user (admin only)

### Admin Management Endpoints

#### Admin Operations (Authenticated)

- `GET /admins/me` - Get current admin profile
- `PATCH /admins/me` - Update current admin profile
- `PATCH /admins/change-password` - Change admin password
- `POST /admins/upload-avatar` - Upload admin avatar

#### Admin Management (Super Admin)

- `GET /admins` - Get all admins (with pagination)
- `GET /admins/:_id` - Get specific admin
- `PATCH /admins/:_id` - Update admin
- `DELETE /admins/:_id` - Delete admin

### Category Management Endpoints

- `POST /categories/register` - Create new category (admin only)
- `GET /categories` - Get all categories (with pagination, search, filtering)
- `GET /categories/:_id` - Get specific category
- `PATCH /categories/:_id` - Update category (admin only)
- `DELETE /categories/:_id` - Delete category (admin only)
- `POST /categories/:_id/upload-avatar` - Upload category image (admin only)

### Product Management Endpoints

- `POST /products/register` - Create new product (admin only)
- `GET /products` - Get all products (with pagination, search, filtering)
- `GET /products/:productId` - Get product by ID
- `GET /products/slug/:slug` - Get product by slug
- `GET /products/sku/:sku` - Get product by SKU
- `GET /products/variant:variantId` - Get product by variant ID
- `PATCH /products/:productId/activity` - Update product status (admin only)
- `PATCH /products/:productId/general` - Update general product info (admin only)
- `PATCH /products/:productId/main-images` - Update product main images (admin only)
- `PATCH /products/:productId/variant` - Create new variant (admin only)
- `PATCH /products/:productId/v/:variantId/info` - Update variant info (admin only)
- `PATCH /products/:productId/v/:variantId/images` - Update variant images (admin only)
- `PATCH /products/:productId/v/:variantId` - Delete variant (admin only)
- `DELETE /products/:productId` - Delete product (admin only)

### Order Management Endpoints

- `POST /orders/register` - Create new order
- `GET /orders` - Get all orders (with pagination, search, filtering)
- `GET /orders/:_id` - Get specific order (authenticated)
- `PATCH /orders/:_id` - Update order (admin only)
- `DELETE /orders/:orderId` - Delete order (admin only)

### Coupon Management Endpoints

- `POST /coupon/register` - Create new coupon (admin only)
- `GET /coupon` - Get all coupons (admin only, with pagination)
- `GET /coupon/:_id` - Get specific coupon (admin only)
- `GET /coupon/validate/:_id` - Validate coupon (public)
- `PATCH /coupon/:_id` - Update coupon (admin only)
- `DELETE /coupon/:_id` - Delete coupon (admin only)

### Coupon Usage Endpoints

- `GET /coupon-usage` - Get coupon usage statistics (admin only)
- `GET /coupon-usage/:_id` - Get specific coupon usage (admin only)

### Subscriber Management Endpoints

- `POST /subscribers/register` - Create new subscriber (admin only)
- `GET /subscribers` - Get all subscribers (admin only, with pagination)
- `GET /subscribers/:_id` - Get specific subscriber (admin only)
- `PATCH /subscribers/:_id` - Update subscriber (admin only)
- `DELETE /subscribers/:_id` - Delete subscriber (admin only)

### Settings Management Endpoints

- `GET /settings` - Get site settings (admin only)
- `PATCH /settings` - Update site settings (admin only)
- `POST /settings/upload-logo` - Upload site logo (admin only)

### Utility Endpoints

- `GET /health` - Health check endpoint

---

## 🗄️ Data Models

### User Model

```typescript
interface IUser extends mongoose.Document {
  _id: string;
  name?: string;
  occupation?: string;
  email?: string; // Optional, unique when provided
  phone: string; // Required, unique
  address?: IAddress;
  avatar?: IImage;
  dob?: Date;
  gender?: "male" | "female";
  status: boolean; // Default: true
  isBlocked?: boolean; // Default: false
  blockedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}
```

### Admin Model

```typescript
interface IAdmin extends mongoose.Document {
  _id: string;
  name: string;
  email: string;
  nid: string; // National ID
  password: string;
  phone: string;
  address: IAddress;
  avatar: IImage;
  role: "super_admin" | "admin";
  refresh?: string;
  resetPasswordToken: string | null;
  resetPasswordExpireDate: Date | null;
  createdAt: Date;
  updatedAt: Date;

  // Methods
  matchPassword(password: string): Promise<boolean>;
  generateAuthToken(): Promise<string>;
  generateResetPasswordToken(expMinutes?: number): string;
}
```

### Product Model

```typescript
interface IProduct {
  _id: string;
  title: string;
  slug: string; // Unique
  description?: string;
  keyFeatures?: string[];
  categories: mongoose.Types.ObjectId[]; // References to Category
  images: IImage[];
  variants: IProductVariant[];
  isCustom?: boolean;
  isFeatured?: boolean;
  isItNew?: boolean;
  status: boolean;
  tags?: string[];
  details: {
    fabric?: string;
    valueAddition?: string;
    cutFit?: string;
    collarNeck?: string;
    sleeve?: string;
    length?: string;
    washCare?: string;
    sideCut?: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

interface IProductVariant {
  _id: string;
  sku: string;
  size: string;
  color: string;
  stock: number;
  price: number;
  images?: IImage[];
}
```

### Category Model

```typescript
interface ICategory {
  _id: string;
  name: string;
  slug: string; // Unique
  description?: string;
  image?: IImage;
  createdAt: Date;
  updatedAt: Date;
}
```

### Order Model

```typescript
interface IOrder {
  _id: string;
  name: string;
  user?: mongoose.Types.ObjectId; // Reference to User
  items: IOrderProduct[];
  address: IAddress;
  paymentStatus: "unpaid" | "paid";
  paymentMethod: "cod";
  subtotal: number;
  discount?: number;
  shippingCost: number;
  total: number;
  statusHistory: IOrderHistry[];
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  orderDate: Date;
  paymentId?: mongoose.Types.ObjectId; // Reference to Payment
  isCustom: boolean;
  customOrder?: {
    isCustom: boolean;
    measurements?: {
      top?: {
        bust?;
        waist?;
        hip?;
        shoulder?;
        sleeveLength?;
        fullLength?;
        neck?;
        armhole?;
      };
      bottom?: { waist?; hip?; length?; inseam?; bottomOpening? };
    };
    referenceImages?: IImage[];
    note?: string;
  };
  coupon: {
    code: string;
    discountType: "percent" | "fixed";
    value: number;
    discountAmount: number;
  };
  createdAt: Date;
  updatedAt: Date;
}
```

### Coupon Model

```typescript
interface ICoupon {
  _id: string;
  code: string; // Unique
  discountType: "percent" | "fixed";
  value: number;
  maxValue: number;
  minSubtotal: number;
  startAt: Date;
  endAt: Date;
  perUserUsageLimit: number;
  totalUsageLimit: number;
  usedCount: number;
  status: boolean;
  createdAt: Date;
  updatedAt: Date;
}
```

### Address Model

```typescript
interface IAddress {
  street: string;
  city: string;
  state?: string;
  zipCode?: string;
  country: string;
}
```

### Image Model

```typescript
interface IImage {
  url: string;
  publicId: string;
  position: number;
  isPrimary?: boolean;
}
```

### Settings Model

```typescript
interface ISettings {
  _id: string;
  siteName: string;
  siteDescription: string;
  logo: IImage;
  favicon?: IImage;
  contactEmail: string;
  contactPhone?: string;
  whatsApp?: string;
  address?: IAddress;
  socialLinks: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    linkedin?: string;
  };
  createdAt: Date;
  updatedAt: Date;
}
```

---

## 🔒 Security & Validation

### Input Validation

- **Zod Schemas**: Comprehensive validation for all API inputs
- **Phone Validation**: Bangladesh phone number format validation
- **Email Validation**: Standard email format with uniqueness checks
- **Password Requirements**: Minimum 8 characters, maximum 20
- **File Validation**: Size limits and type restrictions (images only)
- **MongoDB ObjectId Validation**: Proper ID format validation
- **Date Validation**: Start/end date validation for coupons and offers

### Authentication Middleware

- **Token Verification**: JWT token validation on protected routes
- **Role Checking**: Admin and super_admin role verification
- **Cookie Security**: Secure, httpOnly cookies for refresh tokens
- **CORS Protection**: Configurable cross-origin policies
- **User Blocking**: Automatic rejection of blocked users

### Error Handling

- **Custom Error Types**: Specific error handlers for different scenarios
- **HTTP Status Codes**: Proper status code responses (200, 201, 400, 401, 403, 404, 500)
- **Error Messages**: User-friendly error messages
- **Field-level Errors**: Detailed validation errors per field
- **Stack Traces**: Development-only stack trace exposure

---

## 📝 API Documentation

### Request/Response Format

All API endpoints return JSON responses with consistent structure:

#### Success Response

```json
{
  "success": true,
  "message": "Operation successful",
  "data": { ... },
  "pagination": { // For list endpoints
    "page": 1,
    "limit": 10,
    "total": 100,
    "totalPages": 10,
    "nextPage": 2,
    "prevPage": null
  }
}
```

#### Error Response

```json
{
  "success": false,
  "message": "Error description",
  "fields": [
    {
      "name": "fieldName",
      "message": "Field-specific error"
    }
  ]
}
```

### Authentication Headers

For protected routes, include the JWT token:

```http
Authorization: Bearer <access_token>
```

For user authentication via phone:

```http
X-User-ID: <user_phone_number>
```

### File Upload

Upload files using multipart/form-data:

```http
POST /api/v1/users/upload-avatar
Content-Type: multipart/form-data
Authorization: Bearer <token>

Body:
  avatar: <file>
```

### Pagination & Search

Most list endpoints support pagination and search:

```http
GET /api/v1/products?page=1&limit=10&sortBy=createdAt&sortType=desc&search=laptop
```

**Query Parameters:**

- `page`: Page number (default: 1)
- `limit`: Items per page (default: 10)
- `sortBy`: Sort field (varies by endpoint)
- `sortType`: Sort direction (asc, desc)
- `search`: Search term (searches across relevant fields)

---

## 🧪 Testing

### Manual Testing

- Test all authentication endpoints
- Verify file upload functionality
- Check error handling scenarios
- Test role-based access control
- Test CRUD operations for all resources
- Verify pagination and search functionality
- Test coupon validation and usage tracking

### API Testing Tools

- **Postman**: [Collection Documentation](https://documenter.getpostman.com/view/31092031/2sB3BEnVMh)
- **Insomnia**: REST client for API testing
- **Thunder Client**: VS Code extension for API testing

---

## 🚀 Deployment

### Production Considerations

- Set `NODE_ENV=production`
- Configure secure cookie settings
- Set up proper CORS origins (production domains only)
- Use HTTPS in production
- Configure Cloudinary upload presets and transformations
- Use strong JWT secrets (minimum 32 characters)
- Enable MongoDB connection pooling
- Set up proper logging and monitoring
- Configure rate limiting
- Set up backup strategies for database

### Environment Variables for Production

```env
NODE_ENV=production
MONGO_CLUSTER_URI=<production_mongodb_uri>
JWT_ACCESS_SECRET=<strong_random_secret>
JWT_REFRESH_SECRET=<strong_random_secret>
CLOUDINARY_CLOUD_NAME=<production_cloud_name>
CLOUDINARY_API_KEY=<production_api_key>
CLOUDINARY_API_SECRET=<production_api_secret>
EMAIL_USER=<production_email>
EMAIL_PASS=<production_app_password>
COOKIE_SECRET=<strong_random_secret>
ALLOWED_ORIGINS=https://yourdomain.com,https://admin.yourdomain.com
```

---

## 🔧 Troubleshooting

### Common Issues

1. **MongoDB Connection Error**

   - Check connection string format
   - Verify network access and firewall settings
   - Ensure MongoDB is running (for local instances)
   - Check credentials for cloud instances

2. **JWT Token Errors**

   - Verify JWT secrets are set correctly
   - Check token expiration times
   - Ensure tokens are sent in correct header format

3. **File Upload Issues**

   - Verify Cloudinary credentials
   - Check file size limits
   - Ensure file types are supported (images only)
   - Verify Cloudinary account limits

4. **Email Sending Issues**

   - Verify Gmail app password (not regular password)
   - Check SMTP settings
   - Ensure less secure app access is enabled (if required)
   - Verify email service quotas

5. **CORS Errors**
   - Add your frontend origin to `ALLOWED_ORIGINS`
   - Check CORS middleware configuration
   - Verify credentials are included in requests

### Debug Mode

Enable debug logging:

```env
NODE_ENV=development
DEBUG=true
```

---

## 📚 Additional Resources

### Documentation Links

- **Hono**: [Official Documentation](https://hono.dev/)
- **Mongoose**: [Documentation](https://mongoosejs.com/)
- **Zod**: [Documentation](https://zod.dev/)
- **Cloudinary**: [Documentation](https://cloudinary.com/documentation)
- **TypeScript**: [Handbook](https://www.typescriptlang.org/docs/)

### Contributing Guidelines

1. Follow TypeScript best practices
2. Use Zod for all input validation
3. Implement proper error handling
4. Add comprehensive JSDoc comments
5. Test all endpoints before committing
6. Follow the existing code structure and patterns
7. Update documentation for new features

---

## 📄 License

Proprietary software. All rights reserved.

---

## 🆕 Version Information

### Current Version

- **Node.js**: 18+
- **TypeScript**: 5.8.3
- **Hono**: 4.9.0
- **Mongoose**: 8.17.1
- **Cloudinary**: 2.8.0
- **Zod**: 4.0.16

### Recent Updates

- ✅ Migrated from AWS S3 to Cloudinary for file storage
- ✅ Implemented comprehensive coupon system with usage tracking
- ✅ Added custom order support with measurements
- ✅ Enhanced product variant management
- ✅ Improved error handling and validation
- ✅ Added subscriber management system
- ✅ Implemented settings management
- ✅ Enhanced search and filtering capabilities
- ✅ Improved TypeScript type safety

### Current Status

✅ **All Core Features**: Fully implemented and tested  
✅ **Authentication**: JWT-based auth with refresh tokens  
✅ **File Management**: Cloudinary integration working  
✅ **User Management**: Complete CRUD operations  
✅ **Admin System**: Role-based access control  
✅ **Product Management**: Full CRUD with variants and images  
✅ **Category Management**: Complete with image support  
✅ **Order Management**: Full lifecycle with custom orders  
✅ **Coupon System**: Complete with validation and tracking  
✅ **Security**: Input validation and error handling  
✅ **Documentation**: Comprehensive API documentation

---

## 📞 Support

For issues, questions, or contributions, please contact the development team.
