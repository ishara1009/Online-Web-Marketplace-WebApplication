import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="main-footer">
      <div className="footer-content">
        <div className="footer-container">
          <div className="footer-section">
            <h3>ShopHub</h3>
            <p>Your trusted online marketplace for quality products and great deals.</p>
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
            <h4>Sell With Us</h4>
            <ul>
              <li><Link to="/signup/seller">Become a Seller</Link></li>
              <li><Link to="/seller-guide">Seller Guide</Link></li>
              <li><Link to="/fees">Fees & Pricing</Link></li>
              <li><Link to="/seller-support">Seller Support</Link></li>
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
            <p>&copy; 2026 ShopHub. All rights reserved.</p>
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
