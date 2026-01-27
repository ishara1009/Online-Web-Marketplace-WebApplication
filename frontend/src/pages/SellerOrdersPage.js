import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './SellerOrdersPage.css';

const SellerOrdersPage = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) {
      navigate('/login');
      return;
    }

    const parsedUser = JSON.parse(user);
    if (parsedUser.role !== 'seller') {
      navigate('/');
      return;
    }

    // Load seller's orders (sample data)
    const sampleOrders = [
      {
        id: '1001',
        customerName: 'John Doe',
        items: 2,
        total: 149.99,
        status: 'pending',
        date: '2026-01-25',
        shippingAddress: '123 Main St, New York, NY 10001'
      },
      {
        id: '1002',
        customerName: 'Jane Smith',
        items: 1,
        total: 79.99,
        status: 'processing',
        date: '2026-01-26',
        shippingAddress: '456 Oak Ave, Los Angeles, CA 90001'
      },
      {
        id: '1003',
        customerName: 'Mike Johnson',
        items: 3,
        total: 299.99,
        status: 'shipped',
        date: '2026-01-24',
        shippingAddress: '789 Pine Rd, Chicago, IL 60601'
      }
    ];

    setOrders(sampleOrders);
    setLoading(false);
  }, [navigate]);

  const getStatusColor = (status) => {
    const colors = {
      pending: '#ffa500',
      processing: '#17a2b8',
      shipped: '#28a745',
      delivered: '#28a745',
      cancelled: '#dc3545'
    };
    return colors[status] || '#6c757d';
  };

  const updateOrderStatus = (orderId, newStatus) => {
    const updatedOrders = orders.map(order =>
      order.id === orderId ? { ...order, status: newStatus } : order
    );
    setOrders(updatedOrders);
    alert(`Order #${orderId} status updated to ${newStatus}`);
  };

  const filteredOrders = filter === 'all' 
    ? orders 
    : orders.filter(order => order.status === filter);

  return (
    <div className="seller-orders-page">
      <div className="page-header">
        <button className="back-btn" onClick={() => navigate('/seller/dashboard')}>
          ← Back to Dashboard
        </button>
        <h1>Orders Management</h1>
      </div>

      <div className="orders-container">
        <div className="orders-filters">
          <button 
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All Orders ({orders.length})
          </button>
          <button 
            className={`filter-btn ${filter === 'pending' ? 'active' : ''}`}
            onClick={() => setFilter('pending')}
          >
            Pending
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

        {loading ? (
          <div className="loading">Loading orders...</div>
        ) : filteredOrders.length === 0 ? (
          <div className="no-orders">
            <div className="no-orders-icon">NO</div>
            <h2>No {filter !== 'all' ? filter : ''} orders found</h2>
            <p>Orders from customers will appear here</p>
          </div>
        ) : (
          <div className="orders-table-container">
            <table className="orders-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Items</th>
                  <th>Total</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map(order => (
                  <tr key={order.id}>
                    <td className="order-id">#{order.id}</td>
                    <td>
                      <div className="customer-info">
                        <strong>{order.customerName}</strong>
                        <small>{order.shippingAddress}</small>
                      </div>
                    </td>
                    <td>{order.items} items</td>
                    <td className="order-total">${order.total.toFixed(2)}</td>
                    <td>
                      <span 
                        className="status-badge"
                        style={{ backgroundColor: getStatusColor(order.status) }}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td>{new Date(order.date).toLocaleDateString()}</td>
                    <td>
                      <div className="action-btns">
                        <select
                          value={order.status}
                          onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                          className="status-select"
                        >
                          <option value="pending">Pending</option>
                          <option value="processing">Processing</option>
                          <option value="shipped">Shipped</option>
                          <option value="delivered">Delivered</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                        <button 
                          className="view-btn"
                          onClick={() => alert(`View details for order #${order.id}`)}
                        >
                          View
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default SellerOrdersPage;
