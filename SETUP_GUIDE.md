# Authentication System Setup Guide

## Overview
This is a complete authentication system for an Online Web Marketplace with two user types:
- **Customer** - Can browse and purchase products
- **Seller** - Can manage their store and sell products

## Features Implemented

### Backend (MERN Stack)
✅ User model with separate fields for Customer and Seller
✅ Separate registration endpoints for Customer and Seller
✅ Unified login endpoint for both user types
✅ JWT token-based authentication
✅ Password hashing with bcrypt
✅ Role-based access control

### Frontend (React)
✅ Login page (shared for both Customer and Seller)
✅ Customer Signup page with fields:
  - Full Name, Email, Password, Confirm Password
  - Phone Number, Address, Gender, Profile Image

✅ Seller Signup page with fields:
  - Owner Name, Shop/Store Name, Email, Password, Confirm Password
  - Phone Number, Business Address, NIC/Business Reg No
  - Bank Account/Payment Method, Agree to Seller Policy, Profile Image

✅ Customer Dashboard
✅ Seller Dashboard
✅ Separate CSS files for each component
✅ React Router for navigation
✅ Role-based dashboard redirection

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file in backend directory:
```env
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/marketplace
# OR use MongoDB Atlas
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/marketplace

# JWT Configuration
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRE=7d

# Frontend URL
FRONTEND_URL=http://localhost:3000
```

4. Start the backend server:
```bash
npm run dev
```

Backend will run on: http://localhost:5000

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the frontend:
```bash
npm start
```

Frontend will run on: http://localhost:3000

## API Endpoints

### Authentication Routes

**Customer Registration**
- **POST** `/api/auth/register/customer`
- Body:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "phone": "1234567890",
  "address": "123 Main St",
  "gender": "male",
  "avatar": "base64_image_string"
}
```

**Seller Registration**
- **POST** `/api/auth/register/seller`
- Body:
```json
{
  "ownerName": "Jane Smith",
  "shopName": "Jane's Store",
  "email": "jane@example.com",
  "password": "password123",
  "phone": "1234567890",
  "businessAddress": "456 Business Ave",
  "nicOrBusinessRegNo": "123456789V",
  "bankAccountOrPaymentMethod": "Bank Account: 1234567890",
  "agreedToSellerPolicy": true,
  "avatar": "base64_image_string"
}
```

**Login (Both Customer & Seller)**
- **POST** `/api/auth/login`
- Body:
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Logout**
- **GET** `/api/auth/logout`

**Get User Profile**
- **GET** `/api/auth/me`
- Headers: `Authorization: Bearer <token>`

## Frontend Routes

| Route | Component | Access |
|-------|-----------|--------|
| `/` | Redirects to Login | Public |
| `/login` | Login | Public |
| `/signup/customer` | Customer Signup | Public |
| `/signup/seller` | Seller Signup | Public |
| `/customer/dashboard` | Customer Dashboard | Customer Only |
| `/seller/dashboard` | Seller Dashboard | Seller Only |

## User Roles

### Customer (role: 'customer')
- Can view products
- Can place orders
- Can manage their profile
- Access to customer dashboard

### Seller (role: 'seller')
- Can add/manage products
- Can view orders
- Can manage their store
- Access to seller dashboard

### Admin (role: 'admin')
- Full access to all features
- Can manage users
- Can moderate content

## Login Flow

1. User enters email and password on `/login`
2. Backend verifies credentials
3. If valid, returns JWT token and user data
4. Frontend stores token and user in localStorage
5. User is redirected to appropriate dashboard based on role:
   - Customer → `/customer/dashboard`
   - Seller → `/seller/dashboard`
   - Admin → `/admin/dashboard`

## Signup Flow

### Customer Signup
1. Navigate to `/signup/customer`
2. Fill in required fields (Full Name, Email, Password, etc.)
3. Optional: Upload profile picture
4. Submit form
5. Account created and redirected to Customer Dashboard

### Seller Signup
1. Navigate to `/signup/seller`
2. Fill in required fields (Owner Name, Shop Name, Email, etc.)
3. Must agree to Seller Policy
4. Optional: Upload shop logo
5. Submit form
6. Account created and redirected to Seller Dashboard

## Security Features

- ✅ Passwords hashed with bcrypt (10 salt rounds)
- ✅ JWT token-based authentication
- ✅ HTTP-only cookies for token storage
- ✅ CORS enabled with credentials
- ✅ Input validation
- ✅ Role-based access control
- ✅ Protected routes on frontend

## File Structure

```
backend/
├── src/
│   ├── models/
│   │   └── User.js (Updated with Customer & Seller fields)
│   ├── controllers/
│   │   └── authController.js (Customer & Seller registration)
│   ├── routes/
│   │   └── auth.js (Updated routes)
│   └── ...

frontend/
├── src/
│   ├── components/
│   │   ├── Login.js
│   │   ├── Login.css
│   │   ├── CustomerSignup.js
│   │   ├── CustomerSignup.css
│   │   ├── SellerSignup.js
│   │   └── SellerSignup.css
│   ├── pages/
│   │   ├── CustomerDashboard.js
│   │   ├── CustomerDashboard.css
│   │   ├── SellerDashboard.js
│   │   └── SellerDashboard.css
│   ├── App.js (Routes configured)
│   └── ...
```

## Testing the Application

1. Start MongoDB
2. Start backend server: `cd backend && npm run dev`
3. Start frontend: `cd frontend && npm start`
4. Open browser to http://localhost:3000
5. Try creating accounts:
   - Customer: Click "Sign up as Customer"
   - Seller: Click "Sign up as Seller"
6. Login with created accounts
7. Verify dashboard redirection works correctly

## Next Steps

To extend this application, you can:
- Add password reset functionality
- Implement email verification
- Add profile editing features
- Create product management for sellers
- Build shopping cart for customers
- Add order management system
- Implement payment gateway
- Add admin panel

## Troubleshooting

**Backend won't start:**
- Check if MongoDB is running
- Verify .env file exists with correct values
- Check port 5000 is not in use

**Frontend won't start:**
- Verify node_modules installed
- Check port 3000 is not in use
- Clear npm cache: `npm cache clean --force`

**Login not working:**
- Check backend API is running
- Verify CORS settings
- Check browser console for errors
- Verify MongoDB connection

**Can't access dashboard:**
- Check token is stored in localStorage
- Verify user role matches dashboard route
- Check browser console for errors

## Support

For issues or questions, please check:
- Backend logs in terminal
- Frontend console in browser DevTools
- Network tab for API call failures
- MongoDB connection status
