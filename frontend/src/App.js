import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import TechMartLandingPage from './pages/TechMartLandingPage';
import Login from './components/Login';
import CustomerSignup from './components/CustomerSignup';
import CustomerDashboard from './pages/CustomerDashboard';
import AdminDashboard from './pages/AdminDashboard';
import AdminProductsPage from './pages/AdminProductsPage';
import EditCustomerProfile from './pages/EditCustomerProfile';
import CustomerSettings from './pages/CustomerSettings';
import ProfileInformation from './pages/ProfileInformation';
import ProductsPage from './pages/CustomerProductsPage';
import ProductDetailsPage from './pages/CustomerProductDetailsPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderSuccessPage from './pages/OrderSuccessPage';
import OrdersPage from './pages/OrdersPage';
import AddressesPage from './pages/AddressesPage';
import SellerDashboard from './pages/SellerDashboard';
import SellerProductsPage from './pages/SellerProductsPage';
import SellerOrdersPage from './pages/SellerOrdersPage';
import SellerSalesPage from './pages/SellerSalesPage';
import SellerAnalyticsPage from './pages/SellerAnalyticsPage';
import SellerSettingsPage from './pages/SellerSettingsPage';
import ProtectedRoute from './components/ProtectedRoute';
import NotFoundPage from './pages/NotFoundPage';
import InformationPage from './pages/InformationPage';
import WishlistPage from './pages/WishlistPage';
import OrderDetailsPage from './pages/OrderDetailsPage';
import './App.css';

function App() {
  const protectedPage = (page, roles) => <ProtectedRoute roles={roles}>{page}</ProtectedRoute>;
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
          <Route path="/user/dashboard" element={protectedPage(<CustomerDashboard />, ['user'])} />
          <Route path="/user/edit-profile" element={protectedPage(<EditCustomerProfile />, ['user'])} />
          <Route path="/user/settings" element={protectedPage(<CustomerSettings />, ['user'])} />
          <Route path="/user/profile-information" element={protectedPage(<ProfileInformation />, ['user'])} />
          <Route path="/user/addresses" element={protectedPage(<AddressesPage />, ['user'])} />
          <Route path="/customer/*" element={<Navigate to="/user/dashboard" replace />} />
          
          {/* Admins can sign in but cannot self-register. */}
          <Route path="/admin/dashboard" element={protectedPage(<AdminDashboard />, ['admin'])} />
          <Route path="/admin/products" element={protectedPage(<AdminProductsPage />, ['admin'])} />

          {/* Seller account routes */}
          <Route path="/seller/dashboard" element={protectedPage(<SellerDashboard />, ['seller'])} />
          <Route path="/seller/products" element={protectedPage(<SellerProductsPage />, ['seller'])} />
          <Route path="/seller/orders" element={protectedPage(<SellerOrdersPage />, ['seller'])} />
          <Route path="/seller/sales" element={protectedPage(<SellerSalesPage />, ['seller'])} />
          <Route path="/seller/analytics" element={protectedPage(<SellerAnalyticsPage />, ['seller'])} />
          <Route path="/seller/settings" element={protectedPage(<SellerSettingsPage />, ['seller'])} />
          
          {/* Shopping routes */}
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/product/:id" element={<ProductDetailsPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={protectedPage(<CheckoutPage />, ['user'])} />
          <Route path="/order-success" element={<OrderSuccessPage />} />
          <Route path="/orders" element={protectedPage(<OrdersPage />, ['user'])} />
          <Route path="/orders/:id" element={protectedPage(<OrderDetailsPage />, ['user'])} />
          <Route path="/wishlist" element={protectedPage(<WishlistPage />, ['user'])} />

          <Route path="/info/:slug" element={<InformationPage />} />
          <Route path="/about" element={<Navigate to="/info/about" replace />} />
          <Route path="/contact" element={<Navigate to="/info/contact" replace />} />
          <Route path="/faq" element={<Navigate to="/info/faq" replace />} />
          <Route path="/support" element={<Navigate to="/info/support" replace />} />
          <Route path="/shipping" element={<Navigate to="/info/shipping" replace />} />
          <Route path="/returns" element={<Navigate to="/info/returns" replace />} />
          <Route path="/terms" element={<Navigate to="/info/terms" replace />} />
          <Route path="/privacy" element={<Navigate to="/info/privacy" replace />} />
          <Route path="/cookies" element={<Navigate to="/info/cookies" replace />} />
          <Route path="/intellectual-property" element={<Navigate to="/info/intellectual-property" replace />} />
          <Route path="/seller-policy" element={<Navigate to="/info/seller-policy" replace />} />
          
          {/* Catch all route */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
