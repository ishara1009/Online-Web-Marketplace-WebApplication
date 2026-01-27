import React from 'react';
import { useNavigate } from 'react-router-dom';
import './CustomerSettings.css';

const CustomerSettings = () => {
  const navigate = useNavigate();

  const settingsOptions = [
    {
      id: 'profile',
      icon: '',
      title: 'Profile Information',
      description: 'Update your name, photo, and personal details',
      path: '/customer/profile-information',
    },
    {
      id: 'security',
      icon: '',
      title: 'Account Security',
      description: 'Change password and security settings',
      path: '/customer/settings/security',
    },
    {
      id: 'address',
      icon: '',
      title: 'Address Book',
      description: 'Manage your shipping and billing addresses',
      path: '/customer/settings/addresses',
    },
    {
      id: 'payment',
      icon: '',
      title: 'Payment Methods',
      description: 'Add or remove payment methods',
      path: '/customer/settings/payment',
    },
    {
      id: 'notifications',
      icon: '',
      title: 'Notifications',
      description: 'Manage email and push notifications',
      path: '/customer/settings/notifications',
    },
    {
      id: 'privacy',
      icon: '',
      title: 'Privacy',
      description: 'Control your privacy and data settings',
      path: '/customer/settings/privacy',
    },
  ];

  const handleOptionClick = (path) => {
    navigate(path);
  };

  const handleBackToDashboard = () => {
    navigate('/customer/dashboard');
  };

  return (
    <div className="customer-settings">
      <nav className="settings-nav">
        <div className="nav-brand">
          <h2> Settings</h2>
        </div>
        <div className="nav-actions">
          <button onClick={handleBackToDashboard} className="back-btn">
            ← Back to Dashboard
          </button>
        </div>
      </nav>

      <div className="settings-container">
        <div className="settings-header">
          <h1>Account Settings</h1>
          <p>Manage your account preferences and settings</p>
        </div>

        <div className="settings-grid">
          {settingsOptions.map((option) => (
            <div
              key={option.id}
              className="settings-card"
              onClick={() => handleOptionClick(option.path)}
            >
              <div className="settings-card-icon">{option.icon}</div>
              <div className="settings-card-content">
                <h3>{option.title}</h3>
                <p>{option.description}</p>
              </div>
              <div className="settings-card-arrow">→</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CustomerSettings;
