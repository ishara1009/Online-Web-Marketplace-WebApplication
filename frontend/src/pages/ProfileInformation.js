import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProfileInformation.css';

const ProfileInformation = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

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
  }, [navigate]);

  const handleEditProfile = () => {
    navigate('/customer/edit-profile');
  };

  const handleBackToSettings = () => {
    navigate('/customer/settings');
  };

  if (!user) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="profile-information">
      <nav className="profile-nav">
        <div className="nav-brand">
          <h2>👤 Profile Information</h2>
        </div>
        <div className="nav-actions">
          <button onClick={handleBackToSettings} className="back-btn">
            ← Back to Settings
          </button>
        </div>
      </nav>

      <div className="profile-container">
        <div className="profile-header">
          <div className="profile-avatar-large">
            <img 
              src={user.avatar?.url || 'https://via.placeholder.com/150'} 
              alt="Profile"
            />
          </div>
          <div className="profile-header-info">
            <h1>{user.name}</h1>
            <p className="user-email">{user.email}</p>
            <span className="user-role-badge">Customer Account</span>
          </div>
          <button onClick={handleEditProfile} className="edit-profile-btn">
            ✏️ Edit Profile
          </button>
        </div>

        <div className="profile-content">
          <div className="info-section">
            <h3 className="section-title">
              <span className="title-icon">👤</span>
              Personal Information
            </h3>
            <div className="info-grid-modern">
              <div className="info-card">
                <div className="info-card-icon">
                  <span>📝</span>
                </div>
                <div className="info-card-content">
                  <div className="info-label">Full Name</div>
                  <div className="info-value">{user.name || 'Not provided'}</div>
                </div>
              </div>

              <div className="info-card">
                <div className="info-card-icon">
                  <span>📧</span>
                </div>
                <div className="info-card-content">
                  <div className="info-label">Email Address</div>
                  <div className="info-value">{user.email || 'Not provided'}</div>
                </div>
              </div>

              <div className="info-card">
                <div className="info-card-icon">
                  <span>📱</span>
                </div>
                <div className="info-card-content">
                  <div className="info-label">Phone Number</div>
                  <div className="info-value">{user.phone || 'Not provided'}</div>
                </div>
              </div>

              <div className="info-card">
                <div className="info-card-icon">
                  <span>⚧</span>
                </div>
                <div className="info-card-content">
                  <div className="info-label">Gender</div>
                  <div className="info-value">{user.gender || 'Not specified'}</div>
                </div>
              </div>

              <div className="info-card full-width">
                <div className="info-card-icon">
                  <span>📍</span>
                </div>
                <div className="info-card-content">
                  <div className="info-label">Address</div>
                  <div className="info-value">{user.address || 'Not provided'}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="info-section">
            <h3 className="section-title">
              <span className="title-icon">🔐</span>
              Account Information
            </h3>
            <div className="info-grid-modern">
              <div className="info-card">
                <div className="info-card-icon">
                  <span>🎯</span>
                </div>
                <div className="info-card-content">
                  <div className="info-label">Account Type</div>
                  <div className="info-value">
                    <span className="badge-customer">Customer</span>
                  </div>
                </div>
              </div>

              <div className="info-card">
                <div className="info-card-icon">
                  <span>📅</span>
                </div>
                <div className="info-card-content">
                  <div className="info-label">Member Since</div>
                  <div className="info-value">
                    {user.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    }) : 'N/A'}
                  </div>
                </div>
              </div>

              <div className="info-card">
                <div className="info-card-icon">
                  <span>✅</span>
                </div>
                <div className="info-card-content">
                  <div className="info-label">Account Status</div>
                  <div className="info-value">
                    <span className="status-active">● Active</span>
                  </div>
                </div>
              </div>

              <div className="info-card">
                <div className="info-card-icon">
                  <span>🆔</span>
                </div>
                <div className="info-card-content">
                  <div className="info-label">User ID</div>
                  <div className="info-value user-id">{user._id ? `#${user._id.substring(0, 8)}...` : 'N/A'}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="info-section">
            <h3 className="section-title">
              <span className="title-icon">📊</span>
              Activity Summary
            </h3>
            <div className="activity-grid-modern">
              <div className="activity-card-modern">
                <div className="activity-header">
                  <div className="activity-icon-modern">📦</div>
                  <div className="activity-number">0</div>
                </div>
                <div className="activity-footer">
                  <div className="activity-label">Total Orders</div>
                  <div className="activity-trend">
                    <span className="trend-neutral">—</span>
                  </div>
                </div>
              </div>

              <div className="activity-card-modern">
                <div className="activity-header">
                  <div className="activity-icon-modern">❤️</div>
                  <div className="activity-number">0</div>
                </div>
                <div className="activity-footer">
                  <div className="activity-label">Wishlist Items</div>
                  <div className="activity-trend">
                    <span className="trend-neutral">—</span>
                  </div>
                </div>
              </div>

              <div className="activity-card-modern">
                <div className="activity-header">
                  <div className="activity-icon-modern">⭐</div>
                  <div className="activity-number">0</div>
                </div>
                <div className="activity-footer">
                  <div className="activity-label">Reviews Given</div>
                  <div className="activity-trend">
                    <span className="trend-neutral">—</span>
                  </div>
                </div>
              </div>

              <div className="activity-card-modern">
                <div className="activity-header">
                  <div className="activity-icon-modern">💬</div>
                  <div className="activity-number">0</div>
                </div>
                <div className="activity-footer">
                  <div className="activity-label">Support Tickets</div>
                  <div className="activity-trend">
                    <span className="trend-neutral">—</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileInformation;
