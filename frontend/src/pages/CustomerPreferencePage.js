import React, { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import apiClient from '../services/apiClient';
import './CustomerPreferencePage.css';

const defaults = { orderUpdates: true, deliveryUpdates: true, offers: false, newsletter: false };

export default function CustomerPreferencePage() {
  const { section } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [passwords, setPasswords] = useState({ oldPassword: '', password: '', confirmPassword: '' });
  const [notifications, setNotifications] = useState(() => JSON.parse(localStorage.getItem('customerNotifications') || 'null') || defaults);

  const changePassword = async event => {
    event.preventDefault(); setMessage('');
    if (passwords.password !== passwords.confirmPassword) { setMessage('New passwords do not match.'); return; }
    try { const { data } = await apiClient.put('/auth/password/update', { oldPassword: passwords.oldPassword, password: passwords.password }); localStorage.setItem('token', data.token); localStorage.setItem('user', JSON.stringify(data.user)); setPasswords({ oldPassword: '', password: '', confirmPassword: '' }); setMessage('Password changed successfully.'); }
    catch (error) { setMessage(error.response?.data?.message || 'Could not change your password.'); }
  };

  const saveNotifications = event => {
    event.preventDefault();
    localStorage.setItem('customerNotifications', JSON.stringify(notifications));
    setMessage('Notification preferences saved.');
  };

  const exportData = () => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const blob = new Blob([JSON.stringify({ profile: user, notificationPreferences: notifications }, null, 2)], { type: 'application/json' });
    const link = document.createElement('a'); link.href = URL.createObjectURL(blob); link.download = 'techmart-account-data.json'; link.click(); URL.revokeObjectURL(link.href);
  };

  const content = {
    security: <><header><span>ACCOUNT SECURITY</span><h1>Change your password</h1><p>Use a strong password you do not use on another website.</p></header><form className="preference-form" onSubmit={changePassword}><label>Current password<input type="password" required value={passwords.oldPassword} onChange={e => setPasswords({ ...passwords, oldPassword: e.target.value })}/></label><label>New password<input type="password" minLength="6" required value={passwords.password} onChange={e => setPasswords({ ...passwords, password: e.target.value })}/></label><label>Confirm new password<input type="password" minLength="6" required value={passwords.confirmPassword} onChange={e => setPasswords({ ...passwords, confirmPassword: e.target.value })}/></label><button>Update password</button></form></>,
    payment: <><header><span>PAYMENT METHODS</span><h1>Payment preferences</h1><p>Review the payment options currently available for TechMart orders.</p></header><section className="preference-panel"><div className="payment-mark">COD</div><div><h2>Cash on Delivery</h2><p>Pay when your order arrives. This is the currently enabled checkout method.</p><strong>Available</strong></div></section><p className="preference-note">Card and wallet payments will appear here only after a secure payment provider is connected.</p></>,
    notifications: <><header><span>NOTIFICATIONS</span><h1>Choose what you receive</h1><p>Control account, delivery, and promotional messages.</p></header><form className="preference-form" onSubmit={saveNotifications}>{[['orderUpdates','Order confirmations'],['deliveryUpdates','Delivery updates'],['offers','Offers and promotions'],['newsletter','TechMart newsletter']].map(([key,label]) => <label className="preference-toggle" key={key}><span><strong>{label}</strong><small>{key.includes('Updates') ? 'Recommended for active orders' : 'Optional marketing messages'}</small></span><input type="checkbox" checked={notifications[key]} onChange={e => setNotifications({ ...notifications, [key]: e.target.checked })}/></label>)}<button>Save preferences</button></form></>,
    privacy: <><header><span>PRIVACY & DATA</span><h1>Your data controls</h1><p>Review our policies and download the account information stored in this browser.</p></header><section className="privacy-actions"><button onClick={exportData}>Download my data</button><Link to="/privacy">Read privacy policy</Link><a href="mailto:support@techmart.lk?subject=Account%20privacy%20request">Contact privacy support</a></section></>,
  };

  if (!content[section]) return <div className="preference-page"><div className="preference-shell"><h1>Setting not found</h1><button onClick={() => navigate('/user/settings')}>Back to settings</button></div></div>;
  return <div className="preference-page"><nav><button onClick={() => navigate('/user/settings')}>← Back to settings</button><strong>TechMart Account</strong></nav><main className="preference-shell">{message && <div className="preference-message" role="status">{message}</div>}{content[section]}</main></div>;
}
