import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import apiClient from '../services/apiClient';
import './OperationsPages.css';
import './ManagementOrderDetailsPage.css';

export default function ManagementOrderDetailsPage({ mode }) {
  const { id } = useParams(), navigate = useNavigate();
  const [order, setOrder] = useState(null), [error, setError] = useState('');
  useEffect(() => {
    const endpoint = mode === 'seller' ? `/orders/seller/orders/${id}` : `/orders/order/${id}`;
    apiClient.get(endpoint).then(({ data }) => setOrder(data.order)).catch(e => setError(e.response?.data?.message || 'Could not load this order.'));
  }, [id, mode]);
  const back = mode === 'seller' ? '/seller/orders' : '/admin/orders';
  if (error) return <div className="ops-page"><main className="ops-shell"><div className="ops-state"><h2>Order unavailable</h2><p>{error}</p><button onClick={() => navigate(back)}>Back to orders</button></div></main></div>;
  if (!order) return <div className="ops-page"><main className="ops-shell"><div className="ops-state">Loading order...</div></main></div>;
  return <div className="ops-page"><header className="ops-header"><div><button onClick={() => navigate(back)}>Back to orders</button><span>{mode === 'seller' ? 'SELLER PORTAL' : 'ADMIN CONSOLE'}</span><h1>Order #{order._id.slice(-8).toUpperCase()}</h1><p>Placed {new Date(order.createdAt).toLocaleString()}</p></div><strong className="ops-status">{order.orderStatus}</strong></header><main className="ops-shell"><div className="ops-detail-grid"><section><h2>Items</h2>{order.orderItems.map(item => <article className="ops-line-item" key={item._id}><div>{item.image && <img src={item.image} alt="" />}</div><span><strong>{item.name}</strong><small>{item.quantity} x ${Number(item.price).toFixed(2)}</small></span><b>${(item.quantity * item.price).toFixed(2)}</b></article>)}<footer><span>{mode === 'seller' ? 'Your item total' : 'Order total'}</span><strong>${Number(mode === 'seller' ? order.sellerTotal : order.totalPrice).toFixed(2)}</strong></footer></section><aside><h2>Customer & delivery</h2><p><strong>{order.user?.name || 'Customer'}</strong><br/>{order.user?.email}</p><p>{order.shippingInfo.address}<br/>{order.shippingInfo.city}, {order.shippingInfo.state}<br/>{order.shippingInfo.country} {order.shippingInfo.zipCode}</p><p><strong>Phone</strong><br/>{order.shippingInfo.phone}</p><p><strong>Payment</strong><br/>{order.paymentInfo?.method} - {order.paymentInfo?.status}</p></aside></div></main></div>;
}
