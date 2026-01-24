# Online Marketplace Backend

A complete Node.js, Express.js, and MongoDB backend for an online marketplace system.

## Features

- User Authentication (Register, Login, Logout)
- User Profile Management
- Product Management (CRUD operations)
- Product Reviews & Ratings
- Order Management
- Admin Panel
- JWT Authentication
- Role-based Authorization
- Error Handling Middleware
- API Features (Search, Filter, Pagination)

## Tech Stack

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing

## Installation

1. Install dependencies:
```bash
cd backend
npm install
```

2. Configure environment variables in `.env` file:
```
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb+srv://ishghn1234:ishghn2000@cluster0.vo2av.mongodb.net/marketplace?retryWrites=true&w=majority
JWT_SECRET=your_jwt_secret_key_here_change_in_production
JWT_EXPIRE=7d
COOKIE_EXPIRE=7
```

3. Run the application:
```bash
# Development mode
npm run dev

# Production mode
npm start
```

## API Endpoints

### Authentication
- `POST /api/v1/register` - Register a new user
- `POST /api/v1/login` - Login user
- `GET /api/v1/logout` - Logout user
- `GET /api/v1/me` - Get user profile
- `PUT /api/v1/password/update` - Update password
- `PUT /api/v1/me/update` - Update profile

### Products
- `GET /api/v1/products` - Get all products
- `GET /api/v1/product/:id` - Get single product
- `POST /api/v1/admin/product/new` - Create product (Admin/Seller)
- `PUT /api/v1/admin/product/:id` - Update product (Admin/Seller)
- `DELETE /api/v1/admin/product/:id` - Delete product (Admin/Seller)
- `PUT /api/v1/review` - Create/Update review
- `GET /api/v1/reviews` - Get product reviews
- `DELETE /api/v1/reviews` - Delete review

### Orders
- `POST /api/v1/order/new` - Create new order
- `GET /api/v1/order/:id` - Get single order
- `GET /api/v1/orders/me` - Get logged in user orders
- `GET /api/v1/admin/orders` - Get all orders (Admin)
- `PUT /api/v1/admin/order/:id` - Update order (Admin)
- `DELETE /api/v1/admin/order/:id` - Delete order (Admin)

### Admin
- `GET /api/v1/admin/users` - Get all users
- `GET /api/v1/admin/user/:id` - Get user details
- `PUT /api/v1/admin/user/:id` - Update user
- `DELETE /api/v1/admin/user/:id` - Delete user

## Project Structure

```
backend/
├── src/
│   ├── config/
│   │   ├── database.js
│   │   └── config.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── productController.js
│   │   └── orderController.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Product.js
│   │   └── Order.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── product.js
│   │   └── order.js
│   ├── middlewares/
│   │   ├── auth.js
│   │   ├── catchAsyncErrors.js
│   │   └── errors.js
│   ├── utils/
│   │   ├── errorHandler.js
│   │   ├── jwtToken.js
│   │   └── apiFeatures.js
│   ├── app.js
│   └── server.js
├── .env
├── .gitignore
└── package.json
```

## Models

### User Model
- name, email, password
- avatar (public_id, url)
- role (user, seller, admin)
- phone, address
- isVerified
- Timestamps

### Product Model
- name, description, price, discount
- images array
- category
- stock, ratings, numOfReviews
- reviews array
- seller (reference to User)
- isActive
- Timestamps

### Order Model
- user (reference to User)
- orderItems array
- shippingInfo
- paymentInfo
- itemsPrice, taxPrice, shippingPrice, totalPrice
- orderStatus (Processing, Shipped, Delivered, Cancelled)
- deliveredAt
- Timestamps

## License

ISC
