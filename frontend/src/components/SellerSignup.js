import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './SellerSignup.css';

const SellerSignup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    ownerName: '',
    shopName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    businessAddress: '',
    nicOrBusinessRegNo: '',
    bankAccountOrPaymentMethod: '',
    agreedToSellerPolicy: false,
    avatar: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
        setFormData({
          ...formData,
          avatar: reader.result,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    if (!formData.agreedToSellerPolicy) {
      setError('You must agree to the seller policy to continue');
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post('/api/auth/register/seller', {
        ownerName: formData.ownerName,
        shopName: formData.shopName,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
        businessAddress: formData.businessAddress,
        nicOrBusinessRegNo: formData.nicOrBusinessRegNo,
        bankAccountOrPaymentMethod: formData.bankAccountOrPaymentMethod,
        agreedToSellerPolicy: formData.agreedToSellerPolicy,
        avatar: formData.avatar,
      });

      if (response.data.success) {
        // Redirect to login page after successful registration
        navigate('/login', { state: { message: 'Registration successful! Please login with your credentials.' } });
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const containerStyle = {
    background: `url(${process.env.PUBLIC_URL}/images/login-background.jpg) no-repeat center center fixed`,
    backgroundSize: 'cover'
  };

  return (
    <div className="seller-signup-container" style={containerStyle}>
      <div className="seller-signup-card">
        <div className="signup-header">
          <h1>Seller Signup</h1>
          <p>Register your business and start selling</p>
        </div>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit} className="seller-signup-form">
          <div className="profile-image-section">
            <div className="profile-image-preview">
              {previewImage ? (
                <img src={previewImage} alt="Profile Preview" />
              ) : (
                <div className="placeholder-avatar">
                  <span>SHOP</span>
                </div>
              )}
            </div>
            <label htmlFor="avatar" className="image-upload-label">
              Choose Shop Logo
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

          <div className="form-section">
            <h3>Owner Information</h3>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="ownerName">Owner Name *</label>
                <input
                  type="text"
                  id="ownerName"
                  name="ownerName"
                  value={formData.ownerName}
                  onChange={handleChange}
                  placeholder="Enter owner's full name"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone Number *</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter contact number"
                  required
                />
              </div>
            </div>
          </div>

          <div className="form-section">
            <h3>Business Information</h3>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="shopName">Shop / Store Name *</label>
                <input
                  type="text"
                  id="shopName"
                  name="shopName"
                  value={formData.shopName}
                  onChange={handleChange}
                  placeholder="Enter your shop name"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="nicOrBusinessRegNo">NIC / Business Reg No</label>
                <input
                  type="text"
                  id="nicOrBusinessRegNo"
                  name="nicOrBusinessRegNo"
                  value={formData.nicOrBusinessRegNo}
                  onChange={handleChange}
                  placeholder="NIC or Business Registration Number"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group full-width">
                <label htmlFor="businessAddress">Business Address *</label>
                <textarea
                  id="businessAddress"
                  name="businessAddress"
                  value={formData.businessAddress}
                  onChange={handleChange}
                  placeholder="Enter your business address"
                  rows="3"
                  required
                />
              </div>
            </div>
          </div>

          <div className="form-section">
            <h3>Account Information</h3>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="email">Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="bankAccountOrPaymentMethod">Bank Account / Payment Method</label>
                <input
                  type="text"
                  id="bankAccountOrPaymentMethod"
                  name="bankAccountOrPaymentMethod"
                  value={formData.bankAccountOrPaymentMethod}
                  onChange={handleChange}
                  placeholder="Bank account or payment details"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="password">Password *</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter password (min 6 characters)"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password *</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm your password"
                  required
                />
              </div>
            </div>
          </div>

          <div className="policy-agreement">
            <input
              type="checkbox"
              id="agreedToSellerPolicy"
              name="agreedToSellerPolicy"
              checked={formData.agreedToSellerPolicy}
              onChange={handleChange}
              required
            />
            <label htmlFor="agreedToSellerPolicy">
              I agree to the <Link to="/seller-policy" target="_blank">Seller Policy</Link> and Terms & Conditions
            </label>
          </div>

          <button type="submit" className="signup-button" disabled={loading}>
            {loading ? 'Creating Account...' : 'Register as Seller'}
          </button>
        </form>

        <div className="login-link">
          <p>
            Already have an account? <Link to="/login">Login here</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SellerSignup;
