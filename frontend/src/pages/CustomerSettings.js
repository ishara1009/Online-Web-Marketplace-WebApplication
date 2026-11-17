import React from 'react';
import { useNavigate } from 'react-router-dom';
import './CustomerSettings.css';

const SettingsIcon = ({ name }) => {
  const paths = {
    profile: <><circle cx="12" cy="8" r="3"/><path d="M5 20c.7-4 3-6 7-6s6.3 2 7 6"/></>,
    security: <><rect x="5" y="10" width="14" height="10" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3m-4 4v2"/></>,
    address: <><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></>,
    payment: <><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 10h18M7 15h4"/></>,
    notifications: <><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4"/></>,
    privacy: <><path d="M12 3 4 6v5c0 5 3.4 8.3 8 10 4.6-1.7 8-5 8-10V6l-8-3Z"/><path d="m9 12 2 2 4-4"/></>,
  };
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>;
};

const CustomerSettings = () => {
  const navigate = useNavigate();

  const settingsOptions = [
    {
      id: 'profile',
      icon: 'profile',
      title: 'Profile Information',
      description: 'Update your name, photo, and personal details',
      path: '/user/profile-information',
    },
    {
      id: 'security',
      icon: 'security',
      title: 'Account Security',
      description: 'Change password and security settings',
      path: '/user/settings/security',
    },
    {
      id: 'address',
      icon: 'address',
      title: 'Address Book',
      description: 'Manage your shipping and billing addresses',
      path: '/user/addresses',
    },
    {
      id: 'payment',
      icon: 'payment',
      title: 'Payment Methods',
      description: 'Add or remove payment methods',
      path: '/user/settings/payment',
    },
    {
      id: 'notifications',
      icon: 'notifications',
      title: 'Notifications',
      description: 'Manage email and push notifications',
      path: '/user/settings/notifications',
    },
    {
      id: 'privacy',
      icon: 'privacy',
      title: 'Privacy',
      description: 'Control your privacy and data settings',
      path: '/user/settings/privacy',
    },
  ];

  const handleOptionClick = (path) => {
    navigate(path);
  };

  const handleBackToDashboard = () => {
    navigate('/user/dashboard');
  };

  return (
    <div className="customer-settings">
      <nav className="settings-nav">
        <div className="nav-brand">
          <h2> Settings</h2>
        </div>
        <div className="nav-actions">
          <button onClick={handleBackToDashboard} className="settings-back-button">
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
            <button
              type="button"
              key={option.id}
              className="settings-card"
              onClick={() => handleOptionClick(option.path)}
            >
              <span className="settings-card-icon"><SettingsIcon name={option.icon} /></span>
              <div className="settings-card-content">
                <h3>{option.title}</h3>
                <p>{option.description}</p>
              </div>
              <div className="settings-card-arrow">→</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CustomerSettings;
