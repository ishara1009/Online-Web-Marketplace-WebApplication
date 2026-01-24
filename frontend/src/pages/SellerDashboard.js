import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SellerDashboard.css';

const SellerDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Get user from localStorage
    const userData = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    if (!userData || !token) {
      navigate('/login');
      return;
    }

    const parsedUser = JSON.parse(userData);
    
    // Check if user is a seller
    if (parsedUser.role !== 'seller') {
      navigate('/login');
      return;
    }

    setUser(parsedUser);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  if (!user) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="seller-dashboard">
      <nav className="dashboard-nav">
        <div className="nav-brand">
          <h2>🏪 Seller Portal</h2>
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
              <img src={user.avatar?.url || 'https://via.placeholder.com/150'} alt="Shop Logo" />
            </div>
            <h3>{user.shopName || user.name}</h3>
            <p className="user-email">{user.email}</p>
            <span className="user-badge seller-badge">Seller</span>
          </div>

          <ul className="sidebar-menu">
            <li className="menu-item active">
              <span>📊</span> Dashboard
            </li>
            <li className="menu-item">
              <span>📦</span> Products
            </li>
            <li className="menu-item">
              <span>🛒</span> Orders
            </li>
            <li className="menu-item">
              <span>💰</span> Sales
            </li>
            <li className="menu-item">
              <span>📈</span> Analytics
            </li>
            <li className="menu-item">
              <span>⚙️</span> Settings
            </li>
          </ul>
        </aside>

        <main className="dashboard-main">
          <div className="welcome-section">
            <h1>Welcome, {user.shopName || user.name}! 🏪</h1>
            <p>Manage your store and grow your business.</p>
          </div>

          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon products-icon">📦</div>
              <div className="stat-content">
                <h3>Total Products</h3>
                <p className="stat-number">0</p>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon orders-icon">🛒</div>
              <div className="stat-content">
                <h3>Total Orders</h3>
                <p className="stat-number">0</p>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon revenue-icon">💰</div>
              <div className="stat-content">
                <h3>Revenue</h3>
                <p className="stat-number">$0</p>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon rating-icon">⭐</div>
              <div className="stat-content">
                <h3>Rating</h3>
                <p className="stat-number">0.0</p>
              </div>
            </div>
          </div>

          <div className="info-section">
            <div className="info-card">
              <h3>Business Information</h3>
              <div className="info-grid">
                <div className="info-item">
                  <span className="info-label">Shop Name:</span>
                  <span className="info-value">{user.shopName || 'Not provided'}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Owner Name:</span>
                  <span className="info-value">{user.ownerName || 'Not provided'}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Email:</span>
                  <span className="info-value">{user.email}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Phone:</span>
                  <span className="info-value">{user.phone || 'Not provided'}</span>
                </div>
                <div className="info-item full-width">
                  <span className="info-label">Business Address:</span>
                  <span className="info-value">{user.businessAddress || 'Not provided'}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">NIC / Business Reg No:</span>
                  <span className="info-value">{user.nicOrBusinessRegNo || 'Not provided'}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Payment Method:</span>
                  <span className="info-value">{user.bankAccountOrPaymentMethod || 'Not provided'}</span>
                </div>
              </div>
            </div>

            <div className="info-card">
              <h3>Quick Actions</h3>
              <div className="quick-actions">
                <button className="action-btn primary">
                  ➕ Add New Product
                </button>
                <button className="action-btn secondary">
                  📋 View Orders
                </button>
                <button className="action-btn secondary">
                  📊 Sales Report
                </button>
                <button className="action-btn secondary">
                  👤 Edit Profile
                </button>
              </div>
            </div>
          </div>

          <div className="recent-activity">
            <h3>Recent Activity</h3>
            <div className="activity-list">
              <div className="activity-item">
                <div className="activity-icon">📦</div>
                <div className="activity-content">
                  <p className="activity-title">No products yet</p>
                  <p className="activity-time">Start adding products to your store</p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default SellerDashboard;
