# TASFIN Backend

## 🌟 Project Overview

TASFIN is a modern, full-featured e-commerce backend built with Node.js, TypeScript, and the Hono framework. It powers robust APIs for user, admin, product, category, order, and file management, with advanced security and AWS S3 integration.

---

## 🚀 Key Features

### 🔐 Authentication & Authorization

- JWT-based authentication with refresh tokens
- Role-based access control (super admin, admin)
- Secure session and cookie management
- Password hashing (bcrypt)
- Automatic super admin creation

### 👥 User & Admin Management

- User registration/login (email/phone)
- Profile and address management
- Avatar upload (AWS S3)
- Admin CRUD, hierarchical roles
- Block/activate users, password reset

### 📂 Category & Product Management

- Category CRUD with image upload (S3)
- Unique slug generation for SEO
- Featured categories
- Product CRUD with variants, images, tags, and details
- Advanced search, filtering, and pagination

### 🛒 Order & Review System

- Order creation, update, and status management
- Product reviews and ratings
- Discount, coupon, and offer management

### 📁 File Management

- AWS S3 integration for secure file storage
- Image validation (JPEG, PNG, JPG, WebP)
- Signed URLs for secure access

### 🛡️ Security & Validation

- Zod schema validation for all inputs
- CORS, secure headers, rate limiting
- Custom error handling with HTTP status codes
- Environment-based security settings

### 📊 Data & API Management

- MongoDB (Mongoose ODM, TypeScript)
- Efficient pagination, sorting, and filtering
- Text-based search across multiple fields
- Proper data relationships and references

---

## 🏗️ Architecture & Tech Stack

- **Node.js** + **TypeScript**
- **Hono** (web framework)
- **MongoDB** (Mongoose ODM)
- **JWT** (auth)
- **AWS S3** (file storage)
- **Nodemailer** (email)
- **Zod** (validation)
- **pnpm** (package manager)

### Project Structure

```
backend/
├── src/
│   ├── config/          # DB, email, S3 configs
│   ├── controllers/     # Route handlers
│   ├── error/           # Custom error handlers
│   ├── interfaces/      # TypeScript interfaces
│   ├── middlewares/     # Auth middleware
│   ├── models/          # Mongoose models
│   ├── routes/          # API routes
│   ├── services/        # Business logic
│   ├── utils/           # Utility functions
│   ├── validations/     # Zod schemas
│   └── index.ts         # App entry point
├── package.json
├── pnpm-lock.yaml
├── tsconfig.json
└── README.md
```

---

## 🔧 Configuration & Setup

### Environment Variables

```env
# Database
MONGO_CLUSTER_URI=mongodb://localhost:27017/tasfin
# JWT Secrets
JWT_ACCESS_SECRET=your_access_secret
JWT_REFRESH_SECRET=your_refresh_secret
# AWS S3
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
# Email (Gmail)
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
# Cookie
COOKIE_SECRET=your_cookie_secret
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
# Start development server
pnpm dev
```

### Build & Production

```bash
pnpm build
pnpm start
```

---

## 📡 API Endpoints

### Authentication

- `POST /api/v1/admins/register` – Register admin
- `POST /api/v1/admins/log-in` – Admin login
- `POST /api/v1/admins/log-out` – Admin logout
- `POST /api/v1/admins/refresh` – Refresh token
- `POST /api/v1/admins/forgot-password` – Request password reset
- `PATCH /api/v1/admins/reset-password/:resetToken` – Reset password
- `POST /api/v1/users/register` – User registration
- `POST /api/v1/users/log-in` – User login
- `POST /api/v1/users/log-out` – User logout
- `POST /api/v1/users/forgot-password` – Request password reset
- `PATCH /api/v1/users/reset-password/:resetToken` – Reset password

### User & Admin Management

- `GET /api/v1/users/me` – Get user profile
- `PATCH /api/v1/users/me` – Update profile
- `PATCH /api/v1/users/change-password` – Change password
- `POST /api/v1/users/upload-avatar` – Upload avatar
- `GET /api/v1/users` – List users (admin)
- `GET /api/v1/users/:_id` – Get user (admin)
- `PATCH /api/v1/users/by-admin/:_id` – Update user (admin)
- `DELETE /api/v1/users/:_id` – Delete user (admin)
- `GET /api/v1/admins/me` – Get admin profile
- `PATCH /api/v1/admins/me` – Update admin profile
- `PATCH /api/v1/admins/change-password` – Change admin password
- `POST /api/v1/admins/upload-avatar` – Upload admin avatar
- `GET /api/v1/admins` – List admins
- `GET /api/v1/admins/:_id` – Get admin
- `PATCH /api/v1/admins/:_id` – Update admin
- `DELETE /api/v1/admins/:_id` – Delete admin

### Category & Product Management

- `POST /api/v1/categories/register` – Create category
- `GET /api/v1/categories` – List categories (pagination, search)
- `GET /api/v1/categories/:_id` – Get category
- `PATCH /api/v1/categories/:_id` – Update category
- `DELETE /api/v1/categories/:_id` – Delete category
- `POST /api/v1/categories/:_id/upload-avatar` – Upload category image
- `POST /api/v1/products/register` – Create product
- `GET /api/v1/products` – List products
- `GET /api/v1/products/:_id` – Get product
- `PATCH /api/v1/products/:_id` – Update product
- `DELETE /api/v1/products/:_id` – Delete product

### Orders, Reviews, Discounts, Offers

- `POST /api/v1/orders/register` – Create order
- `GET /api/v1/orders` – List orders
- `GET /api/v1/orders/:_id` – Get order
- `PATCH /api/v1/orders/:_id` – Update order
- `DELETE /api/v1/orders/:_id` – Delete order
- `POST /api/v1/reviews/register` – Add review
- `GET /api/v1/reviews` – List reviews
- `POST /api/v1/discounts/register` – Create discount
- `GET /api/v1/discounts` – List discounts
- `POST /api/v1/offers/register` – Create offer
- `GET /api/v1/offers` – List offers

### Utility

- `GET /api/v1/health` – Health check

---

## 🗄️ Data Models

### User

```typescript
interface IUser {
  _id: string;
  name: string;
  email: string;
  password: string;
  phone: string;
  shippingAddress?: IAddress;
  billingAddress?: IAddress;
  avatar?: IImage;
  isActive: boolean;
  isBlocked?: boolean;
  blockedAt?: Date;
  refresh?: string;
  resetPasswordToken?: string;
  resetPasswordExpireDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}
```

### Admin

```typescript
interface IAdmin {
  _id: string;
  name: string;
  email: string;
  nid: string;
  password: string;
  phone: string;
  address?: IAddress;
  avatar?: IImage;
  role: "super_admin" | "admin";
  refresh?: string;
  resetPasswordToken?: string;
  resetPasswordExpireDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}
```

### Address

```typescript
interface IAddress {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}
```

### Image

```typescript
interface IImage {
  alt: string;
  url: string;
}
```

### Category

```typescript
interface ICategory {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  image?: IImage;
  isFeatured: boolean;
  createdAt: Date;
  updatedAt: Date;
}
```

---

## 🔒 Security & Validation

- Zod schema validation for all inputs
- Bangladesh phone/email validation
- Password requirements (min 8, max 20)
- File validation (max 2MB, allowed types)
- Unique constraints for categories/products
- JWT token verification, role checking
- Secure, httpOnly cookies
- CORS protection
- Custom error types and messages

---

## 📝 API Documentation

### Postman Collections

- [User APIs](https://documenter.getpostman.com/view/31092031/2sB3BEnVMh)
- [Admin APIs](https://documenter.getpostman.com/view/31092031/2sB3BEnVMg)
- [Category APIs](https://documenter.getpostman.com/view/31092031/2sB3BEoAvs)

### Request/Response Format

```typescript
// Success
{
  "success": true,
  "message": "Operation successful",
  "data": { ... }
}
// Error
{
  "success": false,
  "message": "Error description",
  "fields": [
    { "name": "fieldName", "message": "Field-specific error" }
  ]
}
```

### Auth Headers

```http
Authorization: Bearer <access_token>
```

### File Upload

```http
Content-Type: multipart/form-data
Body: avatar=<file>
```

### Category Image Upload

```http
POST /api/v1/categories/:_id/upload-avatar
Content-Type: multipart/form-data
Body: avatar=<file>
Query: filename=<optional_filename>
```

### Pagination & Search

```http
GET /api/v1/users?page=1&limit=10&sortBy=name&sortType=asc
GET /api/v1/categories?page=1&limit=10&sortBy=name&sortType=asc&search=electronics
```

---

## 🧪 Testing & Debugging

- Test all endpoints (auth, CRUD, file upload)
- Verify error handling and security
- Use Postman, Insomnia, Thunder Client
- Enable debug logging: `NODE_ENV=development`, `DEBUG=true`

---

## 🚀 Deployment & Production

- Set `NODE_ENV=production`
- Secure cookies, CORS, HTTPS
- Configure S3 bucket policies
- Use strong JWT secrets
- Production DB/email settings

---

## 🛠️ Troubleshooting

1. **MongoDB Connection**: Check URI and network
2. **JWT Errors**: Verify secrets and expiration
3. **File Upload**: Check S3 credentials and permissions
4. **Email Issues**: Verify Gmail app password and SMTP

---

## 📚 Resources & Contributing

- [Hono Documentation](https://hono.dev/)
- [Mongoose](https://mongoosejs.com/)
- [Zod](https://zod.dev/)
- [AWS SDK](https://docs.aws.amazon.com/sdk-for-javascript/)

### Contributing

- Use TypeScript best practices
- Zod for validation
- Proper error handling
- Comprehensive docs
- Test endpoints before commit

---

## 📄 License

Proprietary software. All rights reserved.

---

## 🆕 Recent Updates

### Avatar Upload Fix (Latest)

- Fixed `SyntaxError: No number after minus sign in JSON at position 1`
- Improved file validation and error handling
- Restored S3 upload functionality
- Enhanced debugging and logging

### New Features & Improvements

- Product CRUD with variants, images, tags
- Discount, coupon, offer management
- Review and rating system
- Advanced search, filtering, and pagination
- Improved error handling and validation

### Current Status

✅ All core features implemented and tested
✅ JWT-based authentication with refresh tokens
✅ AWS S3 file management
✅ User/admin CRUD and role management
✅ Category/product CRUD with image support
✅ Security, validation, and error handling
✅ Comprehensive API documentation

## 🔧 Configuration

### Environment Variables

```env
# Database
MONGO_CLUSTER_URI=mongodb://localhost:27017/tasfin

# JWT Secrets
JWT_ACCESS_SECRET=your_access_secret
JWT_REFRESH_SECRET=your_refresh_secret

# AWS S3
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key

# Email (Gmail)
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password

# Cookie
COOKIE_SECRET=your_cookie_secret

# Environment
NODE_ENV=development
```

### Database Configuration

- **MongoDB**: Cloud-hosted MongoDB cluster
- **Connection Options**: Auto-indexing enabled
- **Error Handling**: Graceful connection failure handling
- **Startup**: Automatic super admin creation on connection

### AWS S3 Configuration

- **Client Setup**: Region and credentials configuration
- **Bucket Management**: Configurable bucket names
- **File Types**: Support for multiple image formats
- **Security**: Secure file access with signed URLs

### Email Configuration

- **SMTP Provider**: Gmail SMTP service
- **Authentication**: App password-based authentication
- **Templates**: Password reset and notification emails

## 📡 API Endpoints

### Authentication Endpoints

#### Admin Authentication

- `POST /api/v1/admins/register` - Register new admin (requires authentication)
- `POST /api/v1/admins/log-in` - Admin login
- `POST /api/v1/admins/log-out` - Admin logout
- `POST /api/v1/admins/refresh` - Refresh access token
- `POST /api/v1/admins/forgot-password` - Request password reset
- `PATCH /api/v1/admins/reset-password/:resetToken` - Reset password

#### User Authentication

- `POST /api/v1/users/register` - User registration
- `POST /api/v1/users/log-in` - User login
- `POST /api/v1/users/log-out` - User logout
- `POST /api/v1/users/forgot-password` - Request password reset
- `PATCH /api/v1/users/reset-password/:resetToken` - Reset password

### User Management Endpoints

#### User Operations

- `GET /api/v1/users/me` - Get current user profile
- `PATCH /api/v1/users/me` - Update current user profile
- `PATCH /api/v1/users/change-password` - Change user password
- `POST /api/v1/users/upload-avatar` - Upload user avatar

#### Admin User Management

- `GET /api/v1/users` - Get all users (admin only)
- `GET /api/v1/users/:_id` - Get specific user (admin only)
- `PATCH /api/v1/users/by-admin/:_id` - Update user by admin
- `DELETE /api/v1/users/:_id` - Delete user (admin only)

### Admin Management Endpoints

#### Admin Operations

- `GET /api/v1/admins/me` - Get current admin profile
- `PATCH /api/v1/admins/me` - Update current admin profile
- `PATCH /api/v1/admins/change-password` - Change admin password
- `POST /api/v1/admins/upload-avatar` - Upload admin avatar

#### Admin Management

- `GET /api/v1/admins` - Get all admins
- `GET /api/v1/admins/:_id` - Get specific admin
- `PATCH /api/v1/admins/:_id` - Update admin
- `DELETE /api/v1/admins/:_id` - Delete admin

### Category Management Endpoints

#### Category Operations

- `POST /api/v1/categories/register` - Create new category (admin only)
- `GET /api/v1/categories` - Get all categories with pagination
- `GET /api/v1/categories/:_id` - Get specific category
- `PATCH /api/v1/categories/:_id` - Update category (admin only)
- `DELETE /api/v1/categories/:_id` - Delete category (admin only)
- `POST /api/v1/categories/:_id/upload-avatar` - Upload category image (admin only)

### Utility Endpoints

- `GET /api/v1/health` - Health check endpoint

## 🗄️ Data Models

### User Model

```typescript
interface IUser {
  _id: string;
  name: string;
  email: string;
  password: string;
  phone: string;
  shippingAddress?: IAddress;
  billingAddress?: IAddress;
  avatar?: IImage;
  isActive: boolean;
  isBlocked?: boolean;
  blockedAt?: Date;
  refresh?: string;
  resetPasswordToken?: string;
  resetPasswordExpireDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}
```

### Admin Model

```typescript
interface IAdmin {
  _id: string;
  name: string;
  email: string;
  nid: string;
  password: string;
  phone: string;
  address?: IAddress;
  avatar?: IImage;
  role: "super_admin" | "admin";
  refresh?: string;
  resetPasswordToken?: string;
  resetPasswordExpireDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}
```

### Address Model

```typescript
interface IAddress {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}
```

### Image Model

```typescript
interface IImage {
  alt: string;
  url: string;
}
```

### Category Model

```typescript
interface ICategory {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  image?: IImage;
  isFeatured: boolean;
  createdAt: Date;
  updatedAt: Date;
}
```

## 🔒 Security & Validation

### Input Validation

- **Zod Schemas**: Comprehensive validation for all inputs
- **Phone Validation**: Bangladesh phone number format validation
- **Email Validation**: Standard email format validation
- **Password Requirements**: Minimum 8 characters, maximum 20
- **File Validation**: Size limits (2MB) and type restrictions
- **Category Validation**: Name, slug, and description validation with unique constraints

### Authentication Middleware

- **Token Verification**: JWT token validation
- **Role Checking**: Admin and user role verification
- **Cookie Security**: Secure, httpOnly cookies
- **CORS Protection**: Configurable cross-origin policies

### Error Handling

- **Custom Error Types**: Specific error handlers for different scenarios
- **HTTP Status Codes**: Proper status code responses
- **Error Messages**: User-friendly error messages
- **Stack Traces**: Development-only stack trace exposure

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- pnpm package manager
- MongoDB database
- AWS S3 account
- Gmail account (for email)

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd TASFIN/backend

# Install dependencies
pnpm install

# Configure environment variables
cp .env.example .env
# Edit .env with your configuration

# Start development server
pnpm dev
```

### Development Commands

```bash
# Development mode with hot reload
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start
```

### Database Setup

1. Create MongoDB database
2. Configure connection string in `.env`
3. Start application (super admin will be auto-created)

### AWS S3 Setup

1. Create S3 bucket
2. Configure IAM user with S3 permissions
3. Set environment variables
4. Test file upload functionality

## 📝 API Documentation

### 📚 Postman Documentation

You can explore and test the APIs directly from Postman using the following documentation links:

[User APIs](https://documenter.getpostman.com/view/31092031/2sB3BEnVMh) – User registration, login, profile updat. etc
[Admin APIs](https://documenter.getpostman.com/view/31092031/2sB3BEnVMg) – Admin panel APIs. product management, user blocking. etc
[Category APIs](https://documenter.getpostman.com/view/31092031/2sB3BEoAvs) – Category management, CRUD operations, image uploads etc

### Request/Response Format

All API endpoints return JSON responses with consistent structure:

```typescript
// Success Response
{
  "success": true,
  "message": "Operation successful",
  "data": { ... }
}

// Error Response
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

```http
Authorization: Bearer <access_token>
```

### File Upload

```http
Content-Type: multipart/form-data
Body: avatar=<file>
```

### Category Image Upload

```http
POST /api/v1/categories/:_id/upload-avatar
Content-Type: multipart/form-data
Body: avatar=<file>
Query: filename=<optional_filename>
```

### Pagination

```http
GET /api/v1/users?page=1&limit=10&sortBy=name&sortType=asc
```

### Category Search & Filtering

```http
GET /api/v1/categories?page=1&limit=10&sortBy=name&sortType=asc&search=electronics
```

**Query Parameters:**

- `page`: Page number (default: 1)
- `limit`: Items per page (default: 10)
- `sortBy`: Sort field (createdAt, updatedAt, name, slug)
- `sortType`: Sort direction (asc, desc)
- `search`: Search term for name or slug

### Category API Examples

#### Create Category

```http
POST /api/v1/categories/register
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "name": "Electronics",
  "slug": "electronics",
  "description": "Electronic devices and gadgets",
  "isFeatured": true
}
```

#### Update Category

```http
PATCH /api/v1/categories/:_id
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "name": "Electronics & Gadgets",
  "description": "Updated description for electronics category",
  "isFeatured": false
}
```

#### Category Response Format

```json
{
  "success": true,
  "message": "Category created successfully",
  "data": {
    "_id": "64f8a1b2c3d4e5f6a7b8c9d0",
    "name": "Electronics",
    "slug": "electronics",
    "description": "Electronic devices and gadgets",
    "image": {
      "alt": "electronics-category",
      "url": "https://s3.amazonaws.com/bucket/folder/image.webp"
    },
    "isFeatured": true,
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

## 🧪 Testing

### Manual Testing

- Test all authentication endpoints
- Verify file upload functionality
- Check error handling scenarios
- Test role-based access control
- Test category CRUD operations
- Verify category image upload functionality
- Test category search and filtering

### API Testing Tools

- Postman
- Insomnia
- Thunder Client (VS Code)

## 🚀 Deployment

### Production Considerations

- Set `NODE_ENV=production`
- Configure secure cookie settings
- Set up proper CORS origins
- Use HTTPS in production
- Configure AWS S3 bucket policies

### Environment Variables

- Ensure all secrets are properly set
- Use strong JWT secrets
- Configure production database URLs
- Set up production email settings

## 🔧 Troubleshooting

### Common Issues

1. **MongoDB Connection**: Check connection string and network access
2. **JWT Errors**: Verify secret keys and token expiration
3. **File Upload**: Check S3 credentials and bucket permissions
4. **Email Issues**: Verify Gmail app password and SMTP settings

### Debug Mode

Enable debug logging by setting environment variables:

```env
NODE_ENV=development
DEBUG=true
```

## 📚 Additional Resources

### Dependencies

- **Hono**: [Documentation](https://hono.dev/)
- **Mongoose**: [Documentation](https://mongoosejs.com/)
- **Zod**: [Documentation](https://zod.dev/)
- **AWS SDK**: [Documentation](https://docs.aws.amazon.com/sdk-for-javascript/)

### Contributing

1. Follow TypeScript best practices
2. Use Zod for validation
3. Implement proper error handling
4. Add comprehensive documentation
5. Test all endpoints before committing

## 📄 License

This project is proprietary software. All rights reserved.

---

## Recent Updates

### Avatar Upload Fix (Latest)

- Resolved `SyntaxError: No number after minus sign in JSON at position 1`
- Enhanced file validation and error handling
- Restored S3 upload functionality
- Improved debugging and logging

### Current Status

✅ **All Core Features**: Fully implemented and tested
✅ **Authentication**: JWT-based auth with refresh tokens
✅ **File Management**: AWS S3 integration working
✅ **User Management**: Complete CRUD operations
✅ **Admin System**: Role-based access control
✅ **Category Management**: Complete CRUD operations with image support
✅ **Security**: Input validation and error handling
✅ **Documentation**: Comprehensive API documentation
