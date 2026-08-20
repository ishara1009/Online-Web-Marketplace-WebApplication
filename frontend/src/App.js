import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import TechMartLandingPage from './pages/TechMartLandingPage';
import Login from './components/Login';
import CustomerSignup from './components/CustomerSignup';
import CustomerDashboard from './pages/CustomerDashboard';
import AdminDashboard from './pages/AdminDashboard';
import EditCustomerProfile from './pages/EditCustomerProfile';
import CustomerSettings from './pages/CustomerSettings';
import ProfileInformation from './pages/ProfileInformation';
import ProductsPage from './pages/ProductsPage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderSuccessPage from './pages/OrderSuccessPage';
import OrdersPage from './pages/OrdersPage';
import AddressesPage from './pages/AddressesPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Default route shows landing page */}
          <Route path="/" element={<TechMartLandingPage />} />
          
          {/* Authentication routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<CustomerSignup />} />
          <Route path="/signup/customer" element={<Navigate to="/signup" replace />} />
          <Route path="/signup/seller" element={<Navigate to="/signup" replace />} />
          
          {/* User account routes */}
          <Route path="/user/dashboard" element={<CustomerDashboard />} />
          <Route path="/user/edit-profile" element={<EditCustomerProfile />} />
          <Route path="/user/settings" element={<CustomerSettings />} />
          <Route path="/user/profile-information" element={<ProfileInformation />} />
          <Route path="/user/addresses" element={<AddressesPage />} />
          <Route path="/customer/*" element={<Navigate to="/user/dashboard" replace />} />
          
          {/* Admins can sign in but cannot self-register. */}
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          
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
