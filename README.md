# 🛍️ Online Web Marketplace Application

A full-stack MERN (MongoDB, Express, React, Node.js) web marketplace application with separate authentication and dashboards for Customers and Sellers.

## ✨ Features

### 🔐 Authentication System
- **Unified Login** - Single login page for both Customers and Sellers
- **Separate Signups** - Different registration flows for each user type
- **Role-Based Access** - Automatic redirection to appropriate dashboards
- **Secure** - JWT token authentication with password hashing

### 👥 User Types

#### 😊 Customer
- Browse and purchase products
- Manage orders and wishlist
- Profile management
- Order tracking

#### 🏪 Seller
- Manage store and products
- Process orders
- View sales analytics
- Business profile management

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd Online-Web-Marketplace-WebApplication
```

2. **Setup Backend**
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your configuration
npm run dev
```

3. **Setup Frontend**
```bash
cd frontend
npm install
npm start
```

4. **Access the application**
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## 📚 Documentation

- **[Quick Start Guide](QUICK_START.md)** - Get up and running in 5 minutes
- **[Setup Guide](SETUP_GUIDE.md)** - Detailed installation and configuration
- **[Implementation Summary](IMPLEMENTATION_SUMMARY.md)** - Complete feature list
- **[Project Structure](PROJECT_STRUCTURE.md)** - File organization and architecture

## 🎨 User Interface

### Customer Flow
1. Sign up at `/signup/customer` with:
   - Full Name, Email, Password
   - Phone Number, Address, Gender
   - Profile Picture (optional)

2. Access Customer Dashboard at `/customer/dashboard`
   - View order statistics
   - Manage profile
   - Track orders

### Seller Flow
1. Sign up at `/signup/seller` with:
   - Owner Name, Shop Name, Email, Password
   - Business Address, Phone Number
   - NIC/Business Registration Number
   - Payment Method
   - Seller Policy Agreement
   - Shop Logo (optional)

2. Access Seller Dashboard at `/seller/dashboard`
   - Manage products
   - View sales statistics
   - Process orders
   - Business analytics

## 🔧 Tech Stack

### Backend
- Node.js & Express.js
- MongoDB & Mongoose
- JWT Authentication
- Bcrypt for password hashing
- Cookie Parser
- CORS

### Frontend
- React 19
- React Router v6
- Axios for API calls
- CSS3 for styling
- Responsive Design

## 📁 Project Structure

```
├── backend/           # Node.js + Express backend
│   ├── src/
│   │   ├── models/    # MongoDB schemas
│   │   ├── controllers/ # Business logic
│   │   ├── routes/    # API endpoints
│   │   ├── middlewares/ # Auth & error handling
│   │   └── utils/     # Helper functions
│   └── package.json
│
├── frontend/          # React frontend
│   ├── src/
│   │   ├── components/ # Login, Signup components
│   │   ├── pages/     # Dashboard pages
│   │   ├── App.js     # Main router
│   │   └── index.js   # Entry point
│   └── package.json
│
└── Documentation files
```

## 🛣️ API Endpoints

### Authentication
- `POST /api/auth/register/customer` - Customer signup
- `POST /api/auth/register/seller` - Seller signup
- `POST /api/auth/login` - Login (both types)
- `GET /api/auth/logout` - Logout
- `GET /api/auth/me` - Get current user

### Products (Coming Soon)
- `GET /api/products` - List products
- `POST /api/products` - Add product (Seller only)
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

### Orders (Coming Soon)
- `GET /api/orders` - List orders
- `POST /api/orders` - Create order
- `PUT /api/orders/:id` - Update order status

## 🎯 Features Implemented

✅ User authentication (JWT-based)
✅ Customer registration with personal details
✅ Seller registration with business details
✅ Unified login system
✅ Role-based dashboard access
✅ Customer dashboard with statistics
✅ Seller dashboard with business metrics
✅ Profile image/logo upload
✅ Responsive design
✅ Error handling
✅ Form validation
✅ Separate CSS files for each component

## 🔜 Upcoming Features

- [ ] Product catalog and management
- [ ] Shopping cart functionality
- [ ] Order processing system
- [ ] Payment gateway integration
- [ ] Email verification
- [ ] Password reset functionality
- [ ] Product reviews and ratings
- [ ] Advanced search and filters
- [ ] Admin panel
- [ ] Real-time notifications

## 🔒 Security Features

- Password hashing with bcrypt
- JWT token authentication
- HTTP-only cookies
- CORS protection
- Input validation
- Role-based access control
- Protected API routes

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is licensed under the ISC License.

## 👨‍💻 Author

**Ishara**

## 🙏 Acknowledgments

- Built with MERN stack
- UI inspired by modern e-commerce platforms
- Thanks to all contributors

---

**Note:** This is a portfolio project demonstrating full-stack MERN development skills including authentication, role-based access, and responsive UI design.
