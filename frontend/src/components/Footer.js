import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="main-footer">
      <div className="footer-content">
        <div className="footer-container">
          <div className="footer-section">
            <h3>TechMart</h3>
            <p>Genuine electronics, trusted sellers, and better technology for everyday life.</p>
            <div className="social-links">
              <a href="#facebook" aria-label="Facebook">FB</a>
              <a href="#twitter" aria-label="Twitter">TW</a>
              <a href="#instagram" aria-label="Instagram">IG</a>
              <a href="#youtube" aria-label="YouTube">YT</a>
            </div>
          </div>

          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/products">Shop Now</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><Link to="/faq">FAQs</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Customer Service</h4>
            <ul>
              <li><Link to="/orders">Track Order</Link></li>
              <li><Link to="/returns">Returns</Link></li>
              <li><Link to="/shipping">Shipping Info</Link></li>
              <li><Link to="/support">Help Center</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>My Account</h4>
            <ul>
              <li><Link to="/signup">Create Account</Link></li>
              <li><Link to="/login">Sign In</Link></li>
              <li><Link to="/orders">My Orders</Link></li>
              <li><Link to="/wishlist">Wishlist</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Legal</h4>
            <ul>
              <li><Link to="/terms">Terms of Service</Link></li>
              <li><Link to="/privacy">Privacy Policy</Link></li>
              <li><Link to="/cookies">Cookie Policy</Link></li>
              <li><Link to="/intellectual-property">Intellectual Property</Link></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-container">
            <p>&copy; 2026 TechMart (Pvt) Ltd. All Rights Reserved.</p>
            <div className="payment-methods">
              <span>We Accept:</span>
              <div className="payment-icons">
                CC
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
