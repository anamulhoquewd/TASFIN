# TASFIN Backend

## Project Overview

TASFIN is a comprehensive e-commerce backend application built with Node.js, TypeScript, and the Hono framework. It provides a robust API for user management, admin operations, product catalog, order processing, and file management with AWS S3 integration.

## 🚀 Features

### 🔐 Authentication & Authorization

- **JWT-based Authentication**: Secure access tokens with configurable expiration
- **Role-based Access Control**: Super admin and admin roles with different permissions
- **Refresh Token System**: Automatic token refresh with secure cookie storage
- **Password Security**: Bcrypt hashing with salt rounds for secure password storage
- **Session Management**: Secure cookie-based session handling

### 📂 Category Management

- **Category CRUD Operations**: Full create, read, update, delete functionality
- **Slug Generation**: Automatic unique slug creation for SEO-friendly URLs
- **Image Management**: Category image upload and management with AWS S3
- **Featured Categories**: Mark categories as featured for promotional purposes
- **Search & Filtering**: Advanced search with pagination and sorting
- **Unique Constraints**: Prevent duplicate category names and slugs

### 👥 User Management

- **User Registration & Login**: Email/phone-based authentication
- **Profile Management**: Update personal information and addresses
- **Avatar Management**: Profile picture upload and management
- **Address Management**: Shipping and billing address support
- **Account Security**: Password change, forgot password, and reset functionality
- **User Status**: Active/blocked user management with timestamps

### 🛡️ Admin Management

- **Admin Registration**: Secure admin account creation
- **Super Admin**: Initial super admin auto-creation on startup
- **Admin Roles**: Hierarchical role system (super_admin, admin)
- **Admin Operations**: Full CRUD operations for admin accounts
- **Profile Management**: Admin profile updates and avatar management
- **Access Control**: Secure admin-only endpoints

### 📁 File Management

- **AWS S3 Integration**: Secure file storage and retrieval
- **Avatar Uploads**: Image upload for users and admins
- **File Validation**: Size, type, and format validation
- **Image Processing**: Support for JPEG, PNG, JPG, and WebP formats
- **Secure URLs**: Signed URLs for secure file access

### 🔒 Security Features

- **Input Validation**: Zod schema validation for all inputs
- **CORS Configuration**: Configurable cross-origin resource sharing
- **Error Handling**: Comprehensive error handling with proper HTTP status codes
- **Rate Limiting**: Built-in request throttling
- **Secure Headers**: Production-ready security headers
- **Environment-based Security**: Different security settings for dev/prod

### 📊 Data Management

- **MongoDB Integration**: Mongoose ODM with TypeScript support
- **Data Validation**: Schema-level validation and constraints
- **Pagination**: Efficient data pagination with sorting and filtering
- **Search Functionality**: Text-based search across multiple fields
- **Data Relationships**: Proper MongoDB relationships and references
- **Category Management**: Hierarchical category system with slug-based routing

## 🏗️ Architecture

### Technology Stack

- **Runtime**: Node.js with TypeScript
- **Framework**: Hono (lightweight, fast web framework)
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT with bcrypt
- **File Storage**: AWS S3
- **Email**: Nodemailer with Gmail SMTP
- **Validation**: Zod schema validation
- **Package Manager**: pnpm

### Project Structure

```
backend/
├── src/
│   ├── config/          # Configuration files
│   │   ├── db.ts       # MongoDB connection
│   │   ├── email.ts    # Email configuration
│   │   └── s3.ts       # AWS S3 configuration
│   ├── controllers/    # Request handlers
│   │   ├── admins.controller.ts
│   │   ├── categorise.controller.ts
│   │   └── users.controller.ts
│   ├── error/          # Custom error handlers
│   │   └── index.ts
│   ├── interfaces/     # TypeScript interfaces
│   │   └── index.ts
│   ├── middlewares/    # Authentication middleware
│   │   └── auth.middleware.ts
│   ├── models/         # Database models
│   │   ├── admins.model.ts
│   │   ├── categorise.model.ts
│   │   └── users.model.ts
│   ├── routes/         # API route definitions
│   │   ├── admins.route.ts
│   │   ├── categorise.route.ts
│   │   └── users.route.ts
│   ├── services/       # Business logic
│   │   ├── admins.service.ts
│   │   ├── categorise.service.ts
│   │   └── users.service.ts
│   ├── utils/          # Utility functions
│   │   ├── index.ts
│   │   ├── pagination.ts
│   │   └── string-generator.ts
│   ├── validations/    # Zod validation schemas
│   │   └── zod.ts
│   └── index.ts        # Main application entry point
├── package.json
├── pnpm-lock.yaml
├── tsconfig.json
└── README.md
```

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
