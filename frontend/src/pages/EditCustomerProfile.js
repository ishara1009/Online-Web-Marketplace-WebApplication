import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './EditCustomerProfile.css';

const EditCustomerProfile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
  });
  const [avatarFile, setAvatarFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    // Get user from localStorage
    const userData = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    if (!userData || !token) {
      navigate('/login');
      return;
    }

    const parsedUser = JSON.parse(userData);
    
    // Check if user is a customer
    if (parsedUser.role !== 'customer') {
      navigate('/login');
      return;
    }

    setUser(parsedUser);
    setFormData({
      name: parsedUser.name || '',
      phone: parsedUser.phone || '',
      address: parsedUser.address || '',
    });
    setPreviewImage(parsedUser.avatar?.url || null);
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
        setAvatarFile(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      
      const updateData = {
        name: formData.name,
        phone: formData.phone,
        address: formData.address,
      };

      if (avatarFile) {
        updateData.avatar = avatarFile;
        console.log('Sending avatar update - length:', avatarFile.length);
      }

      console.log('Update data keys:', Object.keys(updateData));

      const response = await axios.put('/api/auth/me/update', updateData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log('Response from backend:', response.data);

      if (response.data.success) {
        localStorage.setItem('user', JSON.stringify(response.data.user));
        setSuccess('Profile updated successfully!');
        setTimeout(() => navigate('/customer/dashboard'), 1500);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/customer/dashboard');
  };

  if (!user) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="edit-profile-container">
      <div className="edit-profile-card">
        <div className="edit-profile-header">
          <h1>✏️ Edit Profile</h1>
          <p>Update your personal information</p>
          <Link to="/customer/dashboard" className="back-link">
            ← Back to Dashboard
          </Link>
        </div>

        {success && <div className="success-message">{success}</div>}
        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit} className="edit-profile-form">
          <div className="profile-image-section">
            <div className="profile-image-preview">
              {previewImage ? (
                <img src={previewImage} alt="Profile Preview" />
              ) : (
                <div className="placeholder-avatar">
                  <span>📷</span>
                </div>
              )}
            </div>
            <label htmlFor="avatar" className="image-upload-label">
              Change Profile Picture
              <input
                type="file"
                id="avatar"
                name="avatar"
                accept="image/*"
                onChange={handleImageChange}
                style={{ display: 'none' }}
              />
            </label>
          </div>

          <div className="form-group">
            <label htmlFor="name">Full Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
            />
          </div>

          <div className="form-group">
            <label htmlFor="address">Address</label>
            <textarea
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter your address"
              rows="4"
            />
          </div>

          <div className="form-actions">
            <button
              type="button"
              onClick={handleCancel}
              className="cancel-button"
              disabled={loading}
            >
              Cancel
            </button>
            <button type="submit" className="save-button" disabled={loading}>
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCustomerProfile;
