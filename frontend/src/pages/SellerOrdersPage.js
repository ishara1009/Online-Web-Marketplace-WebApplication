import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './SellerOrdersPage.css';
import apiClient from '../services/apiClient';

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

    apiClient.get('/orders/seller/orders').then(({ data }) => setOrders((data.orders || []).map(order => ({
      id: order._id,
      customerName: order.user?.name || 'Customer',
      items: order.orderItems.reduce((sum, item) => sum + item.quantity, 0),
      total: order.sellerTotal,
      status: order.orderStatus.toLowerCase(),
      date: order.createdAt,
      shippingAddress: `${order.shippingInfo.city}, ${order.shippingInfo.country}`,
    })))).finally(() => setLoading(false));
  }, [navigate]);

  const getStatusColor = (status) => {
    const colors = {
      pending: '#2563eb',
      processing: '#17a2b8',
      shipped: '#28a745',
      delivered: '#28a745',
      cancelled: '#dc3545'
    };
    return colors[status] || '#6c757d';
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    await apiClient.put(`/orders/seller/orders/${orderId}`, { status: newStatus.charAt(0).toUpperCase() + newStatus.slice(1) });
    setOrders(current => current.map(order => order.id === orderId ? { ...order, status: newStatus } : order));
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
                          onClick={() => navigate(`/seller/orders/${order.id}`)}
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
