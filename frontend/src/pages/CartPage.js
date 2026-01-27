import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import './CartPage.css';

const CartPage = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCartItems(cart);
    setLoading(false);
  };

  const updateQuantity = (productId, delta) => {
    const updatedCart = cartItems.map(item => {
      if (item._id === productId) {
        const newQuantity = item.quantity + delta;
        if (newQuantity >= 1 && newQuantity <= item.stock) {
          return { ...item, quantity: newQuantity };
        }
      }
      return item;
    });
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const removeItem = (productId) => {
    const updatedCart = cartItems.filter(item => item._id !== productId);
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const clearCart = () => {
    if (window.confirm('Are you sure you want to clear your cart?')) {
      setCartItems([]);
      localStorage.setItem('cart', JSON.stringify([]));
    }
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const shipping = subtotal > 50 ? 0 : 5.99;
    return subtotal + shipping;
  };

  const proceedToCheckout = () => {
    const user = localStorage.getItem('user');
    if (!user) {
      alert('Please login to proceed with checkout');
      navigate('/login');
      return;
    }
    navigate('/checkout');
  };

  if (loading) {
    return (
      <div className="cart-page">
        <Header />
        <div className="loading">Loading cart...</div>
      </div>
    );
  }

  const subtotal = calculateSubtotal();
  const shipping = subtotal > 50 ? 0 : 5.99;
  const total = calculateTotal();

  return (
    <div className="cart-page">
      <Header />

      <div className="cart-container">
        <h1 className="cart-title">Shopping Cart</h1>

        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <div className="empty-cart-icon">CART</div>
            <h2>Your cart is empty</h2>
            <p>Add some products to get started!</p>
            <button 
              className="continue-shopping-btn"
              onClick={() => navigate('/products')}
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="cart-content">
            {/* Cart Items */}
            <div className="cart-items-section">
              <div className="cart-header">
                <h2>{cartItems.length} Item(s) in Cart</h2>
                <button className="clear-cart-btn" onClick={clearCart}>
                  Clear Cart
                </button>
              </div>

              <div className="cart-items">
                {cartItems.map(item => (
                  <div key={item._id} className="cart-item">
                    <div 
                      className="item-image"
                      onClick={() => navigate(`/product/${item._id}`)}
                    >
                      <img src={item.images?.[0] || item.image} alt={item.name} />
                    </div>

                    <div className="item-details">
                      <h3 
                        className="item-name"
                        onClick={() => navigate(`/product/${item._id}`)}
                      >
                        {item.name}
                      </h3>
                      <p className="item-seller">Sold by: {item.seller?.name}</p>
                      <div className="item-price-mobile">
                        <span className="item-price">${item.price}</span>
                        {item.originalPrice && (
                          <span className="item-original-price">${item.originalPrice}</span>
                        )}
                      </div>
                    </div>

                    <div className="item-quantity">
                      <button 
                        className="qty-btn"
                        onClick={() => updateQuantity(item._id, -1)}
                      >
                        -
                      </button>
                      <input type="number" value={item.quantity} readOnly />
                      <button 
                        className="qty-btn"
                        onClick={() => updateQuantity(item._id, 1)}
                      >
                        +
                      </button>
                    </div>

                    <div className="item-price-desktop">
                      <div className="price">${item.price}</div>
                      {item.originalPrice && (
                        <div className="original-price">${item.originalPrice}</div>
                      )}
                    </div>

                    <div className="item-total">
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>

                    <button 
                      className="remove-btn"
                      onClick={() => removeItem(item._id)}
                      title="Remove item"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>

              <button 
                className="continue-shopping-link"
                onClick={() => navigate('/products')}
              >
                ← Continue Shopping
              </button>
            </div>

            {/* Order Summary */}
            <div className="order-summary">
              <h3>Order Summary</h3>

              <div className="summary-row">
                <span>Subtotal ({cartItems.length} items):</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>

              <div className="summary-row">
                <span>Shipping:</span>
                <span className={shipping === 0 ? 'free-shipping' : ''}>
                  {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
                </span>
              </div>

              {subtotal < 50 && (
                <div className="shipping-notice">
                  Add ${(50 - subtotal).toFixed(2)} more for FREE shipping!
                </div>
              )}

              <div className="summary-divider"></div>

              <div className="summary-row total">
                <span>Total:</span>
                <span>${total.toFixed(2)}</span>
              </div>

              <button 
                className="checkout-btn"
                onClick={proceedToCheckout}
              >
                Proceed to Checkout
              </button>

              <div className="secure-checkout">
                Secure Checkout
              </div>

              <div className="accepted-payments">
                <p>We Accept:</p>
                <div className="payment-icons">
                  CC
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
