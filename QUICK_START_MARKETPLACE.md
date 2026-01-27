# 🚀 Quick Start Guide - ShopHub Marketplace

## Getting Started in 5 Minutes

### Step 1: Install Dependencies

```bash
# Navigate to frontend directory
cd frontend

# Install all required packages
npm install
```

### Step 2: Start the Development Server

```bash
npm start
```

The application will automatically open in your browser at `http://localhost:3000`

### Step 3: Explore the Application

## 📋 Test Accounts

Since this is a demo with localStorage, you can create test accounts:

### Test as Customer:
1. Go to http://localhost:3000
2. Click "Get Started" or "Sign Up"
3. Fill in the customer registration form
4. Login and start shopping!

### Test as Seller:
1. Go to http://localhost:3000
2. Click "Become a Seller" 
3. Fill in the seller registration form
4. Login and start adding products!

## 🎯 Feature Testing Guide

### 1. Browse Products
- Visit `/products` to see the product catalog
- Use filters (price, rating, category)
- Try the search functionality
- Sort products by different criteria

### 2. View Product Details
- Click any product to see details
- Browse image gallery
- Check reviews and specifications
- Add items to cart

### 3. Shopping Cart
- Add multiple products to cart
- Update quantities
- See real-time price calculations
- Proceed to checkout

### 4. Complete a Purchase
- Fill in shipping information
- Select payment method
- Review order summary
- Place order

### 5. Track Orders
- Go to `/orders` to see your order history
- Filter by order status
- View order details

### 6. Seller Features (Login as Seller)
- Go to `/seller/products`
- Add new products
- Manage existing products
- View product statistics

## 🛠️ Available Routes

### Public Pages
- `/` - Landing page
- `/login` - Login
- `/signup/customer` - Customer signup
- `/signup/seller` - Seller signup
- `/products` - Product catalog
- `/product/:id` - Product details

### Customer Pages (Requires Login)
- `/cart` - Shopping cart
- `/checkout` - Checkout
- `/orders` - Order history
- `/customer/dashboard` - Dashboard

### Seller Pages (Requires Seller Login)
- `/seller/dashboard` - Seller dashboard
- `/seller/products` - Product management

## 🎨 Key Features to Test

### ✅ Product Catalog
- [x] Grid layout with product cards
- [x] Sidebar filters (price, rating)
- [x] Search functionality
- [x] Category navigation
- [x] Sort options

### ✅ Product Details
- [x] Image gallery with thumbnails
- [x] Product information
- [x] Quantity selector
- [x] Add to cart
- [x] Reviews and ratings

### ✅ Shopping Cart
- [x] View cart items
- [x] Update quantities
- [x] Remove items
- [x] Price calculations
- [x] Shipping cost display

### ✅ Checkout
- [x] Shipping address form
- [x] Payment method selection
- [x] Order summary
- [x] Tax calculation
- [x] Order confirmation

### ✅ Order Management
- [x] Order history
- [x] Status filters
- [x] Order details
- [x] Track orders

### ✅ Seller Features
- [x] Add products
- [x] Edit products
- [x] Delete products
- [x] Inventory management

## 📱 Responsive Testing

Test on different screen sizes:
- Mobile: Open Chrome DevTools (F12) → Toggle device toolbar
- Tablet: Resize browser window to ~768px
- Desktop: Full screen

## 🐛 Troubleshooting

### Issue: Page is blank
**Solution**: Check browser console for errors. Make sure all dependencies are installed.

```bash
npm install
npm start
```

### Issue: Products not showing
**Solution**: The app uses sample data. Products are hardcoded in the components. Check `ProductsPage.js` for sample products.

### Issue: Cart not persisting
**Solution**: The cart uses localStorage. Make sure your browser allows localStorage and check if it's being cleared.

### Issue: Can't login
**Solution**: The app uses localStorage for demo purposes. Any credentials you enter during signup will be saved locally. Use the same credentials to login.

## 💡 Development Tips

### Add More Sample Products
Edit `frontend/src/pages/ProductsPage.js` and add to the `sampleProducts` array.

### Change Color Theme
Edit `frontend/src/pages/LandingPage.css` and replace `#ff6b35` with your preferred color.

### Customize Categories
Edit `frontend/src/components/Header.js` - update the `categories` array.

## 🔧 Common Commands

```bash
# Start development server
npm start

# Build for production
npm run build

# Run tests
npm test

# Install a new package
npm install package-name
```

## 📂 Project Structure Quick Reference

```
frontend/src/
├── components/
│   ├── Header.js           # Navigation
│   ├── Login.js            # Login
│   └── *Signup.js          # Registration
├── pages/
│   ├── LandingPage.js      # Home
│   ├── ProductsPage.js     # Catalog
│   ├── ProductDetailsPage.js # Details
│   ├── CartPage.js         # Cart
│   ├── CheckoutPage.js     # Checkout
│   ├── OrdersPage.js       # Orders
│   └── SellerProductsPage.js # Seller Products
└── App.js                  # Routes
```

## 🎓 Next Steps

1. ✅ Explore all pages and features
2. ✅ Test the complete checkout flow
3. ✅ Try both customer and seller roles
4. 📝 Customize the design to your needs
5. 🔌 Integrate with your backend API
6. 🚀 Deploy to production

## 📞 Need Help?

- Check `MARKETPLACE_FEATURES.md` for detailed documentation
- Review component files for inline comments
- Explore CSS files for styling customization

---

Happy coding! 🎉
