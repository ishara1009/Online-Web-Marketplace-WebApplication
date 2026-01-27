import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './SellerAnalyticsPage.css';

const SellerAnalyticsPage = () => {
  const navigate = useNavigate();

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

  const analyticsData = {
    visitors: 1250,
    conversionRate: 3.2,
    avgSessionTime: '4:32',
    bounceRate: 45.8,
    categoryPerformance: [
      { category: 'Electronics', views: 450, sales: 25 },
      { category: 'Fashion', views: 380, sales: 18 },
      { category: 'Home & Garden', views: 280, sales: 12 }
    ],
    trafficSources: [
      { source: 'Direct', percentage: 45 },
      { source: 'Search', percentage: 30 },
      { source: 'Social', percentage: 15 },
      { source: 'Referral', percentage: 10 }
    ]
  };

  return (
    <div className="seller-analytics-page">
      <div className="page-header">
        <button className="back-btn" onClick={() => navigate('/seller/dashboard')}>
          ← Back to Dashboard
        </button>
        <h1>Analytics Dashboard</h1>
      </div>

      <div className="analytics-container">
        {/* Key Metrics */}
        <div className="metrics-grid">
          <div className="metric-card">
            <div className="metric-icon">VS</div>
            <div className="metric-content">
              <h3>Store Visitors</h3>
              <p className="metric-value">{analyticsData.visitors.toLocaleString()}</p>
              <span className="metric-trend positive">+15.3% this month</span>
            </div>
          </div>

          <div className="metric-card">
            <div className="metric-icon">CR</div>
            <div className="metric-content">
              <h3>Conversion Rate</h3>
              <p className="metric-value">{analyticsData.conversionRate}%</p>
              <span className="metric-trend positive">+0.8% this month</span>
            </div>
          </div>

          <div className="metric-card">
            <div className="metric-icon">TM</div>
            <div className="metric-content">
              <h3>Avg Session Time</h3>
              <p className="metric-value">{analyticsData.avgSessionTime}</p>
              <span className="metric-trend positive">+0:45 this month</span>
            </div>
          </div>

          <div className="metric-card">
            <div className="metric-icon">BR</div>
            <div className="metric-content">
              <h3>Bounce Rate</h3>
              <p className="metric-value">{analyticsData.bounceRate}%</p>
              <span className="metric-trend negative">+2.3% this month</span>
            </div>
          </div>
        </div>

        {/* Category Performance */}
        <div className="analytics-section">
          <h3>Category Performance</h3>
          <div className="category-performance">
            {analyticsData.categoryPerformance.map((cat, index) => (
              <div key={index} className="category-item">
                <div className="category-info">
                  <h4>{cat.category}</h4>
                  <p>{cat.views} views • {cat.sales} sales</p>
                </div>
                <div className="category-bar">
                  <div 
                    className="bar-fill"
                    style={{ width: `${(cat.views / 450) * 100}%` }}
                  ></div>
                </div>
                <div className="category-conversion">
                  {((cat.sales / cat.views) * 100).toFixed(1)}% conversion
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Traffic Sources */}
        <div className="analytics-section">
          <h3>Traffic Sources</h3>
          <div className="traffic-sources">
            {analyticsData.trafficSources.map((source, index) => (
              <div key={index} className="traffic-item">
                <div className="traffic-label">
                  <span className="source-name">{source.source}</span>
                  <span className="source-percentage">{source.percentage}%</span>
                </div>
                <div className="traffic-bar">
                  <div 
                    className="traffic-fill"
                    style={{ width: `${source.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Customer Insights */}
        <div className="analytics-section">
          <h3>Customer Insights</h3>
          <div className="insights-grid">
            <div className="insight-card">
              <h4>Customer Retention</h4>
              <div className="insight-value">68%</div>
              <p>Customers who return to buy again</p>
            </div>

            <div className="insight-card">
              <h4>Average Order Value</h4>
              <div className="insight-value">$208.33</div>
              <p>Average amount per order</p>
            </div>

            <div className="insight-card">
              <h4>Customer Satisfaction</h4>
              <div className="insight-value">4.5</div>
              <p>Based on customer reviews</p>
            </div>

            <div className="insight-card">
              <h4>Repeat Purchase Rate</h4>
              <div className="insight-value">42%</div>
              <p>Customers who buy multiple times</p>
            </div>
          </div>
        </div>

        {/* Performance Recommendations */}
        <div className="analytics-section">
          <h3>Performance Recommendations</h3>
          <div className="recommendations-list">
            <div className="recommendation-item">
              <div className="rec-icon">IM</div>
              <div className="rec-content">
                <h4>Improve Product Photos</h4>
                <p>Products with high-quality images convert 2x better</p>
              </div>
            </div>

            <div className="recommendation-item">
              <div className="rec-icon">DS</div>
              <div className="rec-content">
                <h4>Update Product Descriptions</h4>
                <p>Detailed descriptions increase customer confidence</p>
              </div>
            </div>

            <div className="recommendation-item">
              <div className="rec-icon">PR</div>
              <div className="rec-content">
                <h4>Offer Competitive Pricing</h4>
                <p>Your prices are 8% higher than similar products</p>
              </div>
            </div>

            <div className="recommendation-item">
              <div className="rec-icon">SH</div>
              <div className="rec-content">
                <h4>Enable Fast Shipping</h4>
                <p>Fast shipping options increase conversion by 35%</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerAnalyticsPage;
