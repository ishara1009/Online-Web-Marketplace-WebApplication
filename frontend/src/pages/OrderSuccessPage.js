import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../components/Header';
import './OrderSuccessPage.css';

const OrderSuccessPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    if (location.state?.order) {
      setOrder(location.state.order);
    } else {
      // Try to get the latest order from localStorage
      const orders = JSON.parse(localStorage.getItem('orders') || '[]');
      if (orders.length > 0) {
        setOrder(orders[0]);
      } else {
        navigate('/');
      }
    }
  }, [location, navigate]);

  if (!order) {
    return (
      <div className="order-success-page">
        <Header />
        <div className="loading">Loading...</div>
      </div>
    );
  }

  return (
    <div className="order-success-page">
      <Header />

      <div className="success-container">
        <div className="success-card">
          <div className="success-icon">OK</div>
          <h1>Order Placed Successfully!</h1>
          <p className="success-message">
            Thank you for your purchase. Your order has been received and is being processed.
          </p>

          <div className="order-info">
            <div className="info-row">
              <span className="label">Order ID:</span>
              <span className="value">#{order.id}</span>
            </div>
            <div className="info-row">
              <span className="label">Order Date:</span>
              <span className="value">{new Date(order.date).toLocaleDateString()}</span>
            </div>
            <div className="info-row">
              <span className="label">Total Amount:</span>
              <span className="value total">${order.total.toFixed(2)}</span>
            </div>
            <div className="info-row">
              <span className="label">Payment Method:</span>
              <span className="value">{order.paymentMethod.toUpperCase()}</span>
            </div>
          </div>

          <div className="order-items">
            <h3>Order Items ({order.items.length})</h3>
            <div className="items-list">
              {order.items.map(item => (
                <div key={item._id} className="order-item">
                  <div className="item-image">
                    <img src={item.images?.[0] || item.image} alt={item.name} />
                  </div>
                  <div className="item-details">
                    <h4>{item.name}</h4>
                    <p>Quantity: {item.quantity}</p>
                  </div>
                  <div className="item-price">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="shipping-info">
            <h3>Shipping Address</h3>
            <p>{order.shippingAddress.fullName}</p>
            <p>{order.shippingAddress.address}</p>
            <p>
              {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}
            </p>
            <p>{order.shippingAddress.country}</p>
            <p>Phone: {order.shippingAddress.phone}</p>
          </div>

          <div className="action-buttons">
            <button 
              className="track-order-btn"
              onClick={() => navigate('/orders')}
            >
              Track Your Order
            </button>
            <button 
              className="continue-shopping-btn"
              onClick={() => navigate('/products')}
            >
              Continue Shopping
            </button>
          </div>

          <div className="email-notice">
            A confirmation email has been sent to your email address.
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccessPage;
