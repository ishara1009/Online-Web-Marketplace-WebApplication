import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './SellerSalesPage.css';

const SellerSalesPage = () => {
  const navigate = useNavigate();
  const [salesData, setSalesData] = useState({
    totalSales: 2499.97,
    totalOrders: 12,
    avgOrderValue: 208.33,
    topProducts: [
      { name: 'Wireless Headphones', sales: 850.00, units: 5 },
      { name: 'Smart Watch', sales: 649.95, units: 3 },
      { name: 'Laptop Stand', sales: 399.99, units: 4 }
    ],
    monthlySales: [
      { month: 'Jan', sales: 2499.97 },
      { month: 'Dec', sales: 1850.00 },
      { month: 'Nov', sales: 2200.00 }
    ]
  });

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
  }, [navigate]);

  return (
    <div className="seller-sales-page">
      <div className="page-header">
        <button className="back-btn" onClick={() => navigate('/seller/dashboard')}>
          ← Back to Dashboard
        </button>
        <h1>Sales Report</h1>
      </div>

      <div className="sales-container">
        {/* Sales Summary Cards */}
        <div className="sales-summary">
          <div className="summary-card">
            <div className="card-icon" style={{ background: '#e3f2fd' }}>$</div>
            <div className="card-content">
              <h3>Total Sales</h3>
              <p className="amount">${salesData.totalSales.toFixed(2)}</p>
              <span className="trend positive">+12.5% from last month</span>
            </div>
          </div>

          <div className="summary-card">
            <div className="card-icon" style={{ background: '#fff3e0' }}>PK</div>
            <div className="card-content">
              <h3>Total Orders</h3>
              <p className="amount">{salesData.totalOrders}</p>
              <span className="trend positive">+8 from last month</span>
            </div>
          </div>

          <div className="summary-card">
            <div className="card-icon" style={{ background: '#f3e5f5' }}>CH</div>
            <div className="card-content">
              <h3>Avg Order Value</h3>
              <p className="amount">${salesData.avgOrderValue.toFixed(2)}</p>
              <span className="trend neutral">±0% from last month</span>
            </div>
          </div>

          <div className="summary-card">
            <div className="card-icon" style={{ background: '#e8f5e9' }}>*</div>
            <div className="card-content">
              <h3>Products Sold</h3>
              <p className="amount">12</p>
              <span className="trend positive">+5 from last month</span>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="sales-charts">
          <div className="chart-card">
            <h3>Monthly Sales Trend</h3>
            <div className="chart-placeholder">
              <div className="bar-chart">
                {salesData.monthlySales.map((data, index) => (
                  <div key={index} className="bar-item">
                    <div 
                      className="bar"
                      style={{ height: `${(data.sales / 2500) * 100}%` }}
                    >
                      <span className="bar-value">${data.sales}</span>
                    </div>
                    <span className="bar-label">{data.month}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="chart-card">
            <h3>Top Selling Products</h3>
            <div className="top-products-list">
              {salesData.topProducts.map((product, index) => (
                <div key={index} className="product-item">
                  <div className="product-rank">#{index + 1}</div>
                  <div className="product-details">
                    <h4>{product.name}</h4>
                    <p>{product.units} units sold</p>
                  </div>
                  <div className="product-sales">${product.sales.toFixed(2)}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="transactions-section">
          <h3>Recent Transactions</h3>
          <div className="transactions-table">
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Product</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Jan 27, 2026</td>
                  <td>#1001</td>
                  <td>John Doe</td>
                  <td>Wireless Headphones</td>
                  <td className="amount-cell">$170.00</td>
                  <td><span className="status-badge completed">Completed</span></td>
                </tr>
                <tr>
                  <td>Jan 26, 2026</td>
                  <td>#1002</td>
                  <td>Jane Smith</td>
                  <td>Smart Watch</td>
                  <td className="amount-cell">$216.65</td>
                  <td><span className="status-badge pending">Pending</span></td>
                </tr>
                <tr>
                  <td>Jan 25, 2026</td>
                  <td>#1003</td>
                  <td>Mike Johnson</td>
                  <td>Laptop Stand</td>
                  <td className="amount-cell">$99.99</td>
                  <td><span className="status-badge completed">Completed</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Export Options */}
        <div className="export-section">
          <h3>Export Reports</h3>
          <div className="export-buttons">
            <button className="export-btn" onClick={() => alert('Exporting as PDF...')}>
              Export as PDF
            </button>
            <button className="export-btn" onClick={() => alert('Exporting as Excel...')}>
              Export as Excel
            </button>
            <button className="export-btn" onClick={() => alert('Exporting as CSV...')}>
              Export as CSV
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerSalesPage;
