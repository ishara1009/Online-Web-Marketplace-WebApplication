# 🛒 ShopHub - Professional E-Commerce Marketplace

A complete, production-ready online marketplace application built with MERN stack, featuring modern UI/UX design inspired by leading e-commerce platforms like Daraz and Temu.

## ✨ Features

### 🏠 Landing Page
- Professional hero section with gradient design
- Feature highlights showcasing key benefits
- Call-to-action buttons for customers and sellers
- Responsive navigation and mobile menu
- Modern orange gradient theme

### 👥 User Authentication
- Customer and Seller registration
- Secure login system
- Role-based access control
- Session management with localStorage

### 🛍️ Customer Features

#### Product Browsing
- **Product Catalog**: Grid view with filters and sorting
- **Search Functionality**: Real-time product search
- **Category Navigation**: 8+ product categories
- **Advanced Filters**:
  - Price range filtering
  - Rating-based filtering
  - Category filtering
  - Multiple sort options (price, rating, popularity, newest)

#### Product Details
- High-quality product image gallery with thumbnails
- Detailed product information and specifications
- Customer reviews and ratings
- Seller information
- Add to cart functionality
- Quantity selector
- Related product suggestions

#### Shopping Cart
- View all cart items
- Update product quantities
- Remove items
- Real-time price calculations
- Shipping cost calculator (FREE shipping over $50)
- Save cart in localStorage

#### Checkout Process
- Multi-step checkout form
- Shipping address collection
- Multiple payment methods:
  - Credit/Debit Card
  - PayPal
  - Cash on Delivery
- Order summary with itemized costs
- Tax calculation (8%)
- Secure payment indication

#### Order Management
- Order history with status tracking
- Filter orders by status (Processing, Shipped, Delivered)
- View order details
- Order status updates
- Write product reviews

### 🏪 Seller Features

#### Product Management
- Add new products with detailed information
- Product image upload (placeholder system)
- Set pricing and discounts
- Manage inventory/stock levels
- Edit and delete products
- View product performance stats

#### Seller Dashboard
- Sales overview
- Product management interface
- Order tracking
- Revenue analytics

### 📱 Responsive Design
- Fully responsive on all devices
- Mobile-first approach
- Tablet-optimized layouts
- Desktop-enhanced experience
- Touch-friendly interfaces

### 🎨 UI/UX Features
- Modern orange gradient color scheme
- Smooth animations and transitions
- Hover effects and micro-interactions
- Loading states
- Empty state illustrations
- Success/error notifications
- Breadcrumb navigation
- Sticky headers

## 🚀 Technology Stack

### Frontend
- **React.js** - UI library
- **React Router** - Navigation
- **CSS3** - Styling with modern features
- **localStorage** - Client-side data persistence

### Backend (Existing)
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication

## 📁 Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── Header.js                 # Main navigation header
│   │   ├── Header.css
│   │   ├── Login.js                  # Login component
│   │   ├── CustomerSignup.js         # Customer registration
│   │   ├── SellerSignup.js           # Seller registration
│   │   └── ...
│   ├── pages/
│   │   ├── LandingPage.js            # Homepage
│   │   ├── ProductsPage.js           # Product catalog with filters
│   │   ├── ProductDetailsPage.js     # Single product view
│   │   ├── CartPage.js               # Shopping cart
│   │   ├── CheckoutPage.js           # Checkout process
│   │   ├── OrderSuccessPage.js       # Order confirmation
│   │   ├── OrdersPage.js             # Order history
│   │   ├── SellerProductsPage.js     # Seller product management
│   │   ├── CustomerDashboard.js      # Customer dashboard
│   │   ├── SellerDashboard.js        # Seller dashboard
│   │   └── ...
│   ├── App.js                        # Main app component with routes
│   └── index.js                      # Entry point
└── package.json
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB (for backend)

### Frontend Setup
```bash
cd frontend
npm install
npm start
```

### Backend Setup
```bash
cd backend
npm install
npm start
```

The application will run on:
- Frontend: http://localhost:3000
- Backend: http://localhost:5000

## 🗺️ Application Routes

### Public Routes
- `/` - Landing page
- `/login` - User login
- `/signup/customer` - Customer registration
- `/signup/seller` - Seller registration
- `/products` - Product catalog
- `/product/:id` - Product details

### Customer Routes
- `/cart` - Shopping cart
- `/checkout` - Checkout page
- `/order-success` - Order confirmation
- `/orders` - Order history
- `/customer/dashboard` - Customer dashboard
- `/customer/edit-profile` - Edit profile
- `/customer/settings` - Account settings

### Seller Routes
- `/seller/dashboard` - Seller dashboard
- `/seller/products` - Product management
- `/seller/products/add` - Add new product

## 🎯 Key Features Implementation

### 1. Product Filtering & Search
```javascript
// Filter by category, price range, rating
// Sort by price, rating, popularity, newest
// Real-time search across products
```

### 2. Shopping Cart System
```javascript
// Add/remove items
// Update quantities
// Persist cart in localStorage
// Calculate totals with shipping and tax
```

### 3. Order Processing
```javascript
// Complete checkout flow
// Multiple payment options
// Order confirmation
// Order tracking and history
```

### 4. Seller Product Management
```javascript
// CRUD operations for products
// Inventory management
// Product statistics
// Sales tracking
```

## 🎨 Design Principles

- **Modern UI**: Clean, professional design with orange accent color
- **User-Centric**: Intuitive navigation and clear CTAs
- **Performance**: Optimized images and efficient rendering
- **Accessibility**: Semantic HTML and ARIA labels
- **Responsive**: Mobile-first, works on all screen sizes

## 📊 Data Management

### LocalStorage Structure
```javascript
{
  "user": {}, // Current user data
  "token": "", // JWT token
  "cart": [], // Shopping cart items
  "orders": [], // User orders
  "sellerProducts": [] // Seller's products
}
```

## 🔐 Security Features

- JWT-based authentication
- Protected routes
- Role-based access control
- Secure checkout process
- Input validation

## 🚧 Future Enhancements

- [ ] Backend API integration
- [ ] Real-time notifications
- [ ] Wishlist functionality
- [ ] Product reviews and ratings system
- [ ] Advanced analytics dashboard
- [ ] Email notifications
- [ ] Payment gateway integration
- [ ] Multi-language support
- [ ] Dark mode
- [ ] Product recommendations
- [ ] Live chat support
- [ ] Social media integration

## 📱 Mobile Responsiveness

All pages are fully responsive with breakpoints:
- Mobile: < 480px
- Tablet: 480px - 768px
- Desktop: 768px - 1024px
- Large Desktop: > 1024px

## 🎓 Learning Resources

This project demonstrates:
- React Hooks (useState, useEffect, useNavigate)
- Component composition
- Form handling
- Route management
- State management
- CSS Grid and Flexbox
- Responsive design
- localStorage usage
- E-commerce workflows

## 👥 User Roles

### Customer
- Browse and search products
- Add items to cart
- Complete purchases
- Track orders
- Write reviews

### Seller
- Add/manage products
- Track sales
- Manage inventory
- View analytics

## 📞 Support

For questions or issues, please refer to the documentation or contact the development team.

## 📄 License

This project is licensed under the MIT License.

---

Built with ❤️ using React and modern web technologies
