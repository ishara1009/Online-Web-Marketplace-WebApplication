import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Login from './components/Login';
import CustomerSignup from './components/CustomerSignup';
import SellerSignup from './components/SellerSignup';
import CustomerDashboard from './pages/CustomerDashboard';
import SellerDashboard from './pages/SellerDashboard';
import EditCustomerProfile from './pages/EditCustomerProfile';
import CustomerSettings from './pages/CustomerSettings';
import ProfileInformation from './pages/ProfileInformation';
import ProductsPage from './pages/ProductsPage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderSuccessPage from './pages/OrderSuccessPage';
import OrdersPage from './pages/OrdersPage';
import SellerProductsPage from './pages/SellerProductsPage';
import SellerOrdersPage from './pages/SellerOrdersPage';
import SellerSalesPage from './pages/SellerSalesPage';
import SellerAnalyticsPage from './pages/SellerAnalyticsPage';
import SellerSettingsPage from './pages/SellerSettingsPage';
import AddressesPage from './pages/AddressesPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Default route shows landing page */}
          <Route path="/" element={<LandingPage />} />
          
          {/* Authentication routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup/customer" element={<CustomerSignup />} />
          <Route path="/signup/seller" element={<SellerSignup />} />
          
          {/* Customer Dashboard routes */}
          <Route path="/customer/dashboard" element={<CustomerDashboard />} />
          <Route path="/customer/edit-profile" element={<EditCustomerProfile />} />
          <Route path="/customer/settings" element={<CustomerSettings />} />
          <Route path="/customer/profile-information" element={<ProfileInformation />} />
          <Route path="/customer/addresses" element={<AddressesPage />} />
          
          {/* Seller Dashboard routes */}
          <Route path="/seller/dashboard" element={<SellerDashboard />} />
          <Route path="/seller/products" element={<SellerProductsPage />} />
          <Route path="/seller/products/add" element={<SellerProductsPage />} />
          <Route path="/seller/orders" element={<SellerOrdersPage />} />
          <Route path="/seller/sales" element={<SellerSalesPage />} />
          <Route path="/seller/analytics" element={<SellerAnalyticsPage />} />
          <Route path="/seller/settings" element={<SellerSettingsPage />} />
          
          {/* Shopping routes */}
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/product/:id" element={<ProductDetailsPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/order-success" element={<OrderSuccessPage />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/wishlist" element={<OrdersPage />} />
          
          {/* Catch all route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
