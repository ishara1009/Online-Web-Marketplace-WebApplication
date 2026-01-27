import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './CustomerDashboard.css';

const CustomerDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    if (!userData || !token) {
      navigate('/login');
      return;
    }

    const parsedUser = JSON.parse(userData);
    
    if (parsedUser.role !== 'customer') {
      navigate('/login');
      return;
    }

    setUser(parsedUser);
  }, [navigate, refreshKey]);

  // Refresh data when returning to this page
  useEffect(() => {
    setRefreshKey(prev => prev + 1);
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const handleEditProfile = () => {
    navigate('/customer/edit-profile');
  };

  const handleSettings = () => {
    navigate('/customer/settings');
  };

  if (!user) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="customer-dashboard">
      <nav className="dashboard-nav">
        <div className="nav-brand">
          <h2>Customer Portal</h2>
        </div>
        <div className="nav-actions">
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </div>
      </nav>

      <div className="dashboard-container">
        <aside className="dashboard-sidebar">
          <div className="user-profile">
            <div className="profile-avatar">
              <img 
                src={user.avatar?.url || 'https://via.placeholder.com/150'} 
                alt="Profile"
              />
            </div>
            <h3>{user.name}</h3>
            <p className="user-email">{user.email}</p>
            <span className="user-badge customer-badge">Customer</span>
          </div>

          <ul className="sidebar-menu">
            <li className="menu-item active" onClick={() => navigate('/customer/dashboard')}>
              Dashboard
            </li>
            <li className="menu-item" onClick={() => navigate('/orders')}>
              My Orders
            </li>
            <li className="menu-item" onClick={() => navigate('/wishlist')}>
              Wishlist
            </li>
            <li className="menu-item" onClick={() => navigate('/customer/addresses')}>
              Addresses
            </li>
            <li className="menu-item" onClick={handleSettings}>
              Settings
            </li>
          </ul>
        </aside>

        <main className="dashboard-main">
          <div className="welcome-section">
            <h1>Welcome back, {user.name}!</h1>
            <p>Here's what's happening with your account today.</p>
          </div>

          <div className="stats-grid">
            <div className="stat-card">
              
              <div className="stat-content">
                <h3>Total Orders</h3>
                <p className="stat-number">0</p>
              </div>
            </div>

            <div className="stat-card">
         
              <div className="stat-content">
                <h3>Pending Orders</h3>
                <p className="stat-number">0</p>
              </div>
            </div>

            <div className="stat-card">
          
              <div className="stat-content">
                <h3>Completed Orders</h3>
                <p className="stat-number">0</p>
              </div>
            </div>

            <div className="stat-card">
      
              <div className="stat-content">
                <h3>Wishlist Items</h3>
                <p className="stat-number">0</p>
              </div>
            </div>
          </div>

          <div className="info-section">
            <div className="info-card">
              <h3>Personal Information</h3>
              <div className="info-grid">
                <div className="info-item">
                  <span className="info-label">Full Name:</span>
                  <span className="info-value">{user.name}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Email:</span>
                  <span className="info-value">{user.email}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Phone:</span>
                  <span className="info-value">{user.phone || 'Not provided'}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Gender:</span>
                  <span className="info-value">{user.gender || 'Not specified'}</span>
                </div>
                <div className="info-item full-width">
                  <span className="info-label">Address:</span>
                  <span className="info-value">{user.address || 'Not provided'}</span>
                </div>
              </div>
            </div>

            <div className="info-card">
              <h3>Quick Actions</h3>
              <div className="quick-actions">
                <button className="action-btn primary" onClick={() => navigate('/products')}>
                  Start Shopping
                </button>
                <button className="action-btn secondary" onClick={() => navigate('/orders')}>
                  Track Orders
                </button>
                <button className="action-btn secondary" onClick={handleEditProfile}>
                  Edit Profile
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default CustomerDashboard;
