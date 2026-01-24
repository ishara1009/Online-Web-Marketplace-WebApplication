import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import CustomerSignup from './components/CustomerSignup';
import SellerSignup from './components/SellerSignup';
import CustomerDashboard from './pages/CustomerDashboard';
import SellerDashboard from './pages/SellerDashboard';
import EditCustomerProfile from './pages/EditCustomerProfile';
import CustomerSettings from './pages/CustomerSettings';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Default route redirects to login */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          
          {/* Authentication routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup/customer" element={<CustomerSignup />} />
          <Route path="/signup/seller" element={<SellerSignup />} />
          
          {/* Dashboard routes */}
          <Route path="/customer/dashboard" element={<CustomerDashboard />} />
          <Route path="/customer/edit-profile" element={<EditCustomerProfile />} />
          <Route path="/customer/settings" element={<CustomerSettings />} />
          <Route path="/seller/dashboard" element={<SellerDashboard />} />
          
          {/* Catch all route */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
