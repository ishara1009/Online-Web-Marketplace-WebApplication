import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import './OrdersPage.css';

const OrdersPage = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // all, processing, shipped, delivered

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) {
      navigate('/login');
      return;
    }

    const storedOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    setOrders(storedOrders);
    setLoading(false);
  }, [navigate]);

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'processing':
        return '#ffa500';
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
    return order.status.toLowerCase() === filter;
  });

  return (
    <div className="orders-page">
      <Header />

      <div className="orders-container">
        <h1 className="orders-title">My Orders</h1>

        {loading ? (
          <div className="loading">Loading orders...</div>
        ) : orders.length === 0 ? (
          <div className="no-orders">
            <div className="no-orders-icon">NO</div>
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
                  <div key={order.id} className="order-card">
                    <div className="order-header">
                      <div className="order-id">
                        <strong>Order #{order.id}</strong>
                        <span className="order-date">
                          {new Date(order.date).toLocaleDateString()}
                        </span>
                      </div>
                      <div 
                        className="order-status"
                        style={{ backgroundColor: getStatusColor(order.status) }}
                      >
                        {order.status}
                      </div>
                    </div>

                    <div className="order-items">
                      {order.items.map(item => (
                        <div key={item._id} className="order-item">
                          <div className="item-image">
                            <img src={item.images?.[0] || item.image} alt={item.name} />
                          </div>
                          <div className="item-info">
                            <h4>{item.name}</h4>
                            <p>Quantity: {item.quantity}</p>
                            <p className="item-price">${item.price}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="order-footer">
                      <div className="order-total">
                        Total: <strong>${order.total.toFixed(2)}</strong>
                      </div>
                      <div className="order-actions">
                        <button 
                          className="view-details-btn"
                          onClick={() => navigate(`/order/${order.id}`)}
                        >
                          View Details
                        </button>
                        {order.status.toLowerCase() === 'delivered' && (
                          <button className="review-btn">
                            Write Review
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
