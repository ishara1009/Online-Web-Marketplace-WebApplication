import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Header.css';
import apiClient from '../services/apiClient';

const Header = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [cartCount, setCartCount] = useState(0);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  useEffect(() => {
    const refreshCart = () => {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      setCartCount(cart.reduce((total, item) => total + Number(item.quantity || 0), 0));
    };
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }

    // Get cart count from localStorage
    refreshCart();
    window.addEventListener('storage', refreshCart);
    window.addEventListener('techmart:cart', refreshCart);
    return () => { window.removeEventListener('storage', refreshCart); window.removeEventListener('techmart:cart', refreshCart); };
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleLogout = async () => {
    try { await apiClient.get('/auth/logout'); } catch (_) { /* Clear local state even if the API is unavailable. */ }
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
  };

  const dashboardPath = user?.role === 'admin'
    ? '/admin/dashboard'
    : user?.role === 'seller'
      ? '/seller/dashboard'
      : '/user/dashboard';
  const ordersPath = user?.role === 'seller' ? '/seller/orders' : user?.role === 'admin' ? '/admin/orders' : '/orders';

  const categories = [
    'Computers',
    'Smartphones',
    'Audio',
    'TV & Displays',
    'Gaming',
    'Cameras',
    'Smart Home',
    'Accessories'
  ];

  return (
    <header className="main-header">
      {/* Top Bar */}
      <div className="header-top">
        <div className="container">
          <div className="top-left">
            <span>Customer Support: +94 11 234 5678</span>
          </div>
          <div className="top-right">
            {user ? (
              <Link to={dashboardPath}>
                {user.role === 'admin' ? 'Admin Dashboard' : user.role === 'seller' ? 'Seller Dashboard' : 'My Account'}
              </Link>
            ) : (
              <>
                <Link to="/login">Sign In</Link>
                <span className="divider">|</span>
                <Link to="/signup">Register</Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="header-main">
        <div className="container">
          <div className="header-content">
            {/* Logo */}
            <div className="logo" onClick={() => navigate('/')}>
              <h1>Tech<span>Mart</span></h1>
            </div>

            {/* Search Bar */}
            <form className="search-bar" onSubmit={handleSearch}>
              <input
                type="text"
                placeholder="Search for products, brands and more..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit">
                <span className="search-icon" aria-hidden="true">⌕</span>
                <span className="sr-only">Search</span>
              </button>
            </form>

            {/* Right Actions */}
            <div className="header-actions">
              {user && (
                <div className="user-menu-wrapper">
                  <button 
                    className="user-btn"
                    onClick={() => setShowUserMenu(!showUserMenu)}
                  >
                    <span className="user-avatar" aria-hidden="true">{(user.name || user.firstName || 'U').charAt(0).toUpperCase()}</span>
                    <span>{user.name || user.firstName || 'Account'}</span>
                    <span className="arrow" aria-hidden="true">⌄</span>
                  </button>
                  {showUserMenu && (
                    <div className="user-dropdown">
                      <Link to={dashboardPath}>
                        My Dashboard
                      </Link>
                      <Link to={ordersPath}>{user.role === 'user' ? 'My Orders' : 'Manage Orders'}</Link>
                      {user.role === 'user' && <Link to="/wishlist">Wishlist</Link>}
                      <button onClick={handleLogout}>Logout</button>
                    </div>
                  )}
                </div>
              )}

              <Link to="/cart" className="cart-btn">
                <span className="cart-icon" aria-hidden="true">▣</span>
                <span>Cart</span>
                {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
              </Link>

            </div>

            {/* Mobile Menu Toggle */}
            <button 
              className="mobile-menu-toggle"
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              aria-label="Open navigation menu"
              aria-expanded={showMobileMenu}
            >
              <span aria-hidden="true">☰</span>
            </button>
          </div>
        </div>
      </div>

      {/* Categories Navigation */}
      <div className="header-categories">
        <div className="container">
          <nav className="categories-nav">
            <Link to="/products" className="category-link all-categories">
              All Categories
            </Link>
            {categories.map((category) => (
              <Link 
                key={category}
                to={`/products?category=${encodeURIComponent(category)}`}
                className="category-link"
              >
                {category}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Mobile Menu */}
      {showMobileMenu && (
        <div className="mobile-menu">
          <div className="mobile-menu-content">
            <button 
              className="close-btn"
              onClick={() => setShowMobileMenu(false)}
              aria-label="Close navigation menu"
            >
              ×
            </button>
            {user ? (
              <>
                <div className="mobile-user-info">
                  <span className="user-avatar" aria-hidden="true">{(user.name || user.firstName || 'U').charAt(0).toUpperCase()}</span>
                  <span>Hello, {user.name || user.firstName || 'there'}</span>
                </div>
                <Link to={dashboardPath} onClick={() => setShowMobileMenu(false)}>
                  My Dashboard
                </Link>
                <Link to={ordersPath} onClick={() => setShowMobileMenu(false)}>{user.role === 'user' ? 'My Orders' : 'Manage Orders'}</Link>
                {user.role === 'user' && <Link to="/wishlist" onClick={() => setShowMobileMenu(false)}>Wishlist</Link>}
                <button onClick={() => { handleLogout(); setShowMobileMenu(false); }}>Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={() => setShowMobileMenu(false)}>Sign In</Link>
                <Link to="/signup" onClick={() => setShowMobileMenu(false)}>Register</Link>
              </>
            )}
            <div className="mobile-categories">
              <h3>Categories</h3>
              {categories.map((category) => (
                <Link 
                  key={category}
                  to={`/products?category=${encodeURIComponent(category)}`}
                  onClick={() => setShowMobileMenu(false)}
                >
                  {category}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
