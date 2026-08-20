import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [cartCount, setCartCount] = useState(0);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }

    // Get cart count from localStorage
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCartCount(cart.reduce((total, item) => total + item.quantity, 0));
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
  };

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
            <span>Customer Support: 1-800-123-4567</span>
          </div>
          <div className="top-right">
            {user ? (
              <Link to={user.role === 'admin' ? '/admin/dashboard' : '/user/dashboard'}>
                {user.role === 'admin' ? 'Admin Dashboard' : 'My Account'}
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
                <i className="search-icon"></i>
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
                    <i className="icon"></i>
                    <span>{user.firstName}</span>
                    <i className="arrow"></i>
                  </button>
                  {showUserMenu && (
                    <div className="user-dropdown">
                      <Link to={user.role === 'admin' ? '/admin/dashboard' : '/user/dashboard'}>
                        My Dashboard
                      </Link>
                      <Link to="/orders">My Orders</Link>
                      <Link to="/wishlist">Wishlist</Link>
                      <button onClick={handleLogout}>Logout</button>
                    </div>
                  )}
                </div>
              )}

              <Link to="/cart" className="cart-btn">
                <i className="icon"></i>
                <span>Cart</span>
                {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
              </Link>

            </div>

            {/* Mobile Menu Toggle */}
            <button 
              className="mobile-menu-toggle"
              onClick={() => setShowMobileMenu(!showMobileMenu)}
            >
              Menu
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
            >
              X
            </button>
            {user ? (
              <>
                <div className="mobile-user-info">
                  <i className="icon"></i>
                  <span>Hello, {user.firstName}</span>
                </div>
                <Link to={user.role === 'admin' ? '/admin/dashboard' : '/user/dashboard'} onClick={() => setShowMobileMenu(false)}>
                  My Dashboard
                </Link>
                <Link to="/orders" onClick={() => setShowMobileMenu(false)}>My Orders</Link>
                <Link to="/wishlist" onClick={() => setShowMobileMenu(false)}>Wishlist</Link>
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
