import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import apiClient, { getApiError } from '../services/apiClient';
import './OrdersPage.css';

const OrdersPage = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all'); // all, processing, shipped, delivered

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) {
      navigate('/login');
      return;
    }

    let active = true;
    apiClient.get('/orders/orders/me').then(({data}) => active && setOrders(data.orders || []))
      .catch(requestError => active && setError(getApiError(requestError, 'Could not load your orders.')))
      .finally(() => active && setLoading(false));
    return () => { active = false; };
  }, [navigate]);

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'processing':
        return '#2563eb';
      case 'shipped':
        return '#17a2b8';
      case 'delivered':
        return '#28a745';
      case 'cancelled':
        return '#dc3545';
      default:
        return '#6c757d';
    }
  };

  const filteredOrders = orders.filter(order => {
    if (filter === 'all') return true;
    return order.orderStatus.toLowerCase() === filter;
  });

  return (
    <div className="orders-page">
      <Header />

      <div className="orders-container">
        <h1 className="orders-title">My Orders</h1>
        {error && <div className="admin-alert" role="alert">{error}</div>}

        {loading ? (
          <div className="loading">Loading orders...</div>
        ) : orders.length === 0 ? (
          <div className="no-orders">
            <div className="no-orders-icon" aria-hidden="true">0</div>
            <h2>No orders yet</h2>
            <p>Start shopping to see your orders here!</p>
            <button 
              className="shop-now-btn"
              onClick={() => navigate('/products')}
            >
              Shop Now
            </button>
          </div>
        ) : (
          <>
            <div className="orders-filters">
              <button 
                className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
                onClick={() => setFilter('all')}
              >
                All Orders ({orders.length})
              </button>
              <button 
                className={`filter-btn ${filter === 'processing' ? 'active' : ''}`}
                onClick={() => setFilter('processing')}
              >
                Processing
              </button>
              <button 
                className={`filter-btn ${filter === 'shipped' ? 'active' : ''}`}
                onClick={() => setFilter('shipped')}
              >
                Shipped
              </button>
              <button 
                className={`filter-btn ${filter === 'delivered' ? 'active' : ''}`}
                onClick={() => setFilter('delivered')}
              >
                Delivered
              </button>
            </div>

            <div className="orders-list">
              {filteredOrders.length === 0 ? (
                <div className="no-filtered-orders">
                  No {filter} orders found
                </div>
              ) : (
                filteredOrders.map(order => (
                  <div key={order._id} className="order-card">
                    <div className="order-header">
                      <div className="order-id">
                        <strong>Order #{order._id.slice(-8).toUpperCase()}</strong>
                        <span className="order-date">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <div 
                        className="order-status"
                        style={{ backgroundColor: getStatusColor(order.orderStatus) }}
                      >
                        {order.orderStatus}
                      </div>
                    </div>

                    <div className="order-items">
                      {order.orderItems.map(item => (
                        <div key={item._id || item.product} className="order-item">
                          <div className="item-image">
                            <img src={item.image} alt={item.name} />
                          </div>
                          <div className="item-info">
                            <h4>{item.name}</h4>
                            <p>Quantity: {item.quantity}</p>
                            <p className="item-price">LKR {Number(item.price).toLocaleString('en-LK')}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="order-footer">
                      <div className="order-total">
                        Total: <strong>LKR {Number(order.totalPrice).toLocaleString('en-LK', { minimumFractionDigits: 2 })}</strong>
                      </div>
                      <div className="order-actions">
                        <button 
                          className="view-details-btn"
                          onClick={() => navigate(`/orders/${order._id}`)}
                        >
                          View Details
                        </button>
                        {order.orderStatus.toLowerCase() === 'delivered' && order.orderItems[0] && (
                          <button className="review-btn" onClick={() => navigate(`/product/${order.orderItems[0].product}`)}>
                            Review Product
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default OrdersPage;
