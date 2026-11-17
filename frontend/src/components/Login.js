import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    // Check if there's a success message from signup
    if (location.state?.message) {
      setSuccessMessage(location.state.message);
      // Clear the message after 5 seconds
      const timer = setTimeout(() => setSuccessMessage(''), 5000);
      return () => clearTimeout(timer);
    }
  }, [location]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await axios.post('/api/auth/login', {
        email: formData.email,
        password: formData.password,
      });

      if (response.data.success) {
        // Dashboard guards currently use localStorage as the shared auth source.
        // Keep the authenticated session there so navigation is not rejected.
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));

        // Redirect based on user role
        if (response.data.user.role === 'user' || response.data.user.role === 'customer') {
          navigate('/user/dashboard');
        } else if (response.data.user.role === 'admin') {
          navigate('/admin/dashboard');
        } else if (response.data.user.role === 'seller') {
          navigate('/seller/dashboard');
        } else {
          navigate('/');
        }
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="login-container">
      <section className="login-showcase" aria-label="TechMart shopping benefits">
        <Link to="/" className="login-brand"><span>T</span>Tech<strong>Mart</strong></Link>
        <div className="login-showcase-copy">
          <span className="login-kicker">Sri Lanka's trusted tech marketplace</span>
          <h2>Everything tech.<br/><strong>One secure account.</strong></h2>
          <p>Track orders, save favourites and unlock member-only offers from verified electronics sellers islandwide.</p>
          <div className="login-benefits">
            <span><b>Islandwide delivery</b>Fast, tracked shipping</span>
            <span><b>Secure payments</b>Protected checkout</span>
            <span><b>Genuine products</b>Verified sellers</span>
          </div>
        </div>
        <small>Secure checkout · Easy returns · Local support</small>
      </section>
      <section className="login-panel">
      <Link to="/" className="login-brand login-mobile-brand"><span>T</span>Tech<strong>Mart</strong></Link>
      <div className="login-card">
        <div className="login-header">
          <span className="login-kicker">Welcome back</span>
          <h1>Sign in to TechMart</h1>
          <p>Access your orders, saved items, and exclusive deals.</p>
        </div>

        {successMessage && <div className="success-message" role="status">{successMessage}</div>}
        {error && <div className="error-message" role="alert">{error}</div>}

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email / Username</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              autoComplete="email"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="password-input">
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              autoComplete="current-password"
              required
            />
            <button type="button" onClick={() => setShowPassword((current) => !current)} aria-label={showPassword ? 'Hide password' : 'Show password'}>{showPassword ? 'Hide' : 'Show'}</button>
            </div>
          </div>

          <div className="form-options">
            <div className="remember-me">
              <input
                type="checkbox"
                id="rememberMe"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleChange}
              />
              <label htmlFor="rememberMe">Remember Me</label>
            </div>

            <Link to="/forgot-password" className="forgot-password">
              Forgot Password?
            </Link>
          </div>

          <button type="submit" className="login-button" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>

        <div className="signup-links">
          <p>New to TechMart?</p>
          <div className="signup-buttons">
            <Link to="/signup" className="signup-link customer-link">
              Create your free account
            </Link>
            <Link to="/signup/seller" className="signup-link seller-link">
              Register a seller business
            </Link>
          </div>
        </div>
      </div>
      <p className="login-support">Need help? <a href="mailto:support@techmart.lk">support@techmart.lk</a> · +94 11 234 5678</p>
      </section>
    </main>
  );
};

export default Login;
