import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './SellerSettingsPage.css';

const SellerSettingsPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    shopName: '',
    ownerName: '',
    email: '',
    phone: '',
    businessAddress: '',
    nicOrBusinessRegNo: '',
    bankAccountOrPaymentMethod: '',
    shopDescription: '',
    notifications: {
      emailNotifications: true,
      orderUpdates: true,
      promotionalEmails: false,
      weeklyReports: true
    }
  });

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      navigate('/login');
      return;
    }

    const parsedUser = JSON.parse(userData);
    if (parsedUser.role !== 'seller') {
      navigate('/');
      return;
    }

    setUser(parsedUser);
    setFormData({
      shopName: parsedUser.shopName || '',
      ownerName: parsedUser.ownerName || '',
      email: parsedUser.email || '',
      phone: parsedUser.phone || '',
      businessAddress: parsedUser.businessAddress || '',
      nicOrBusinessRegNo: parsedUser.nicOrBusinessRegNo || '',
      bankAccountOrPaymentMethod: parsedUser.bankAccountOrPaymentMethod || '',
      shopDescription: parsedUser.shopDescription || '',
      notifications: parsedUser.notifications || {
        emailNotifications: true,
        orderUpdates: true,
        promotionalEmails: false,
        weeklyReports: true
      }
    });
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNotificationChange = (e) => {
    const { name, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [name]: checked
      }
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedUser = { ...user, ...formData };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    setUser(updatedUser);
    alert('Settings updated successfully!');
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    alert('Password change functionality will be implemented with backend');
  };

  if (!user) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="seller-settings-page">
      <div className="page-header">
        <button className="back-btn" onClick={() => navigate('/seller/dashboard')}>
          ← Back to Dashboard
        </button>
        <h1> Settings</h1>
      </div>

      <div className="settings-container">
        {/* Profile Settings */}
        <div className="settings-section">
          <h3> Shop Profile</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-grid">
              <div className="form-group">
                <label>Shop Name *</label>
                <input
                  type="text"
                  name="shopName"
                  value={formData.shopName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Owner Name *</label>
                <input
                  type="text"
                  name="ownerName"
                  value={formData.ownerName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Phone *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group full-width">
                <label>Business Address *</label>
                <input
                  type="text"
                  name="businessAddress"
                  value={formData.businessAddress}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>NIC / Business Reg No *</label>
                <input
                  type="text"
                  name="nicOrBusinessRegNo"
                  value={formData.nicOrBusinessRegNo}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Payment Method *</label>
                <input
                  type="text"
                  name="bankAccountOrPaymentMethod"
                  value={formData.bankAccountOrPaymentMethod}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group full-width">
                <label>Shop Description</label>
                <textarea
                  name="shopDescription"
                  value={formData.shopDescription}
                  onChange={handleChange}
                  rows="4"
                  placeholder="Tell customers about your shop..."
                ></textarea>
              </div>
            </div>

            <button type="submit" className="save-btn">
               Save Changes
            </button>
          </form>
        </div>

        {/* Notification Settings */}
        <div className="settings-section">
          <h3> Notification Preferences</h3>
          <div className="notifications-form">
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="emailNotifications"
                checked={formData.notifications.emailNotifications}
                onChange={handleNotificationChange}
              />
              <span>Email Notifications</span>
            </label>

            <label className="checkbox-label">
              <input
                type="checkbox"
                name="orderUpdates"
                checked={formData.notifications.orderUpdates}
                onChange={handleNotificationChange}
              />
              <span>Order Updates</span>
            </label>

            <label className="checkbox-label">
              <input
                type="checkbox"
                name="promotionalEmails"
                checked={formData.notifications.promotionalEmails}
                onChange={handleNotificationChange}
              />
              <span>Promotional Emails</span>
            </label>

            <label className="checkbox-label">
              <input
                type="checkbox"
                name="weeklyReports"
                checked={formData.notifications.weeklyReports}
                onChange={handleNotificationChange}
              />
              <span>Weekly Sales Reports</span>
            </label>

            <button className="save-btn" onClick={handleSubmit}>
               Save Preferences
            </button>
          </div>
        </div>

        {/* Security Settings */}
        <div className="settings-section">
          <h3> Security</h3>
          <form onSubmit={handlePasswordChange}>
            <div className="form-grid">
              <div className="form-group">
                <label>Current Password</label>
                <input type="password" placeholder="Enter current password" />
              </div>

              <div className="form-group">
                <label>New Password</label>
                <input type="password" placeholder="Enter new password" />
              </div>

              <div className="form-group full-width">
                <label>Confirm New Password</label>
                <input type="password" placeholder="Confirm new password" />
              </div>
            </div>

            <button type="submit" className="save-btn">
               Change Password
            </button>
          </form>
        </div>

        {/* Danger Zone */}
        <div className="settings-section danger-zone">
          <h3> Danger Zone</h3>
          <div className="danger-actions">
            <div className="danger-item">
              <div>
                <h4>Deactivate Shop</h4>
                <p>Temporarily disable your shop from the marketplace</p>
              </div>
              <button className="danger-btn secondary">Deactivate</button>
            </div>

            <div className="danger-item">
              <div>
                <h4>Delete Account</h4>
                <p>Permanently delete your shop and all associated data</p>
              </div>
              <button className="danger-btn primary">Delete Account</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerSettingsPage;
