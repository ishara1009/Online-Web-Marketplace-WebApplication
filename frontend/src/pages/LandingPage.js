import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="landing-page">
      {/* Header/Navigation */}
      <header className="landing-header">
        <div className="container">
          <div className="nav-wrapper">
            <h1 className="logo">Online Marketplace</h1>
            <nav className="nav-links">
              <button className="nav-btn" onClick={() => navigate('/login')}>
                Login
              </button>
              <button className="nav-btn-primary" onClick={() => navigate('/signup/customer')}>
                Get Started
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">
              Your Marketplace for Everything
            </h1>
            <p className="hero-subtitle">
              Buy and sell products effortlessly. Connect with buyers and sellers.
              Experience seamless online shopping with our trusted marketplace platform.
            </p>
            <div className="hero-buttons">
              <button className="btn-start" onClick={() => navigate('/signup/customer')}>
                Start Shopping
              </button>
              <button className="btn-signin" onClick={() => navigate('/signup/seller')}>
                Become a Seller
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
       
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon"></div>
              <h3>Wide Selection</h3>
              <p>Browse thousands of products from verified sellers across multiple categories.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon"></div>
              <h3>Secure Payments</h3>
              <p>Shop with confidence using our secure payment system and buyer protection.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon"></div>
              <h3>Fast Delivery</h3>
              <p>Get your orders delivered quickly with our reliable shipping partners.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon"></div>
              <h3>Easy Selling</h3>
              <p>Start your online business today. List products and reach thousands of buyers.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon"></div>
              <h3>Track Orders</h3>
              <p>Monitor your purchases and sales in real-time with our dashboard.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon"></div>
              <h3>Quality Assurance</h3>
              <p>Read reviews and ratings to make informed decisions on every purchase.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">Ready to Get Started?</h2>
            <p className="cta-subtitle">
              Join thousands of happy customers and sellers on our platform today!
            </p>
            <div className="cta-buttons">
              <button className="btn-cta-primary" onClick={() => navigate('/signup/customer')}>
                Sign Up Now
              </button>
              <button className="btn-cta-secondary" onClick={() => navigate('/login')}>
                Sign In
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h3>Online Marketplace</h3>
              <p>Your trusted platform for buying and selling online.</p>
            </div>
            <div className="footer-section">
              <h4>Quick Links</h4>
              <ul>
                <li><a href="#about">About Us</a></li>
                <li><a href="#contact">Contact</a></li>
                <li><a href="#faq">FAQ</a></li>
              </ul>
            </div>
            <div className="footer-section">
              <h4>Support</h4>
              <ul>
                <li><a href="#help">Help Center</a></li>
                <li><a href="#terms">Terms of Service</a></li>
                <li><a href="#privacy">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2026 Online Marketplace. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
