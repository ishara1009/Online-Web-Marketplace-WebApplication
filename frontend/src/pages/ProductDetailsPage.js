import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import './ProductDetailsPage.css';

const ProductDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');

  // Sample product data (replace with API call)
  const sampleProduct = {
    _id: id,
    name: 'Wireless Bluetooth Headphones - Premium Sound Quality',
    price: 49.99,
    originalPrice: 79.99,
    images: [
      'https://via.placeholder.com/600x600?text=Headphones+View+1',
      'https://via.placeholder.com/600x600?text=Headphones+View+2',
      'https://via.placeholder.com/600x600?text=Headphones+View+3',
      'https://via.placeholder.com/600x600?text=Headphones+View+4'
    ],
    category: 'Electronics',
    rating: 4.5,
    reviews: 1250,
    seller: { 
      name: 'TechStore',
      rating: 4.8,
      products: 245
    },
    stock: 50,
    discount: 38,
    description: 'Experience premium audio quality with these wireless Bluetooth headphones. Featuring active noise cancellation, 30-hour battery life, and comfortable over-ear design. Perfect for music lovers, commuters, and professionals.',
    features: [
      'Active Noise Cancellation (ANC)',
      '30 Hours Battery Life',
      'Premium Sound Quality',
      'Comfortable Over-Ear Design',
      'Bluetooth 5.0 Connectivity',
      'Built-in Microphone',
      'Foldable Design',
      'Includes Carrying Case'
    ],
    specifications: {
      'Brand': 'AudioTech',
      'Model': 'AT-PRO-500',
      'Color': 'Black',
      'Connectivity': 'Bluetooth 5.0',
      'Battery Life': '30 hours',
      'Charging Time': '2 hours',
      'Weight': '250g',
      'Warranty': '1 Year'
    },
    customerReviews: [
      {
        id: 1,
        user: 'John D.',
        rating: 5,
        date: '2026-01-15',
        comment: 'Excellent sound quality! The noise cancellation works great.',
        helpful: 45
      },
      {
        id: 2,
        user: 'Sarah M.',
        rating: 4,
        date: '2026-01-10',
        comment: 'Very comfortable for long use. Battery lasts as advertised.',
        helpful: 32
      },
      {
        id: 3,
        user: 'Mike P.',
        rating: 5,
        date: '2026-01-05',
        comment: 'Best headphones I\'ve owned. Worth every penny!',
        helpful: 28
      }
    ]
  };

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setProduct(sampleProduct);
      setLoading(false);
    }, 500);
  }, [id]);

  const handleQuantityChange = (delta) => {
    const newQuantity = quantity + delta;
    if (newQuantity >= 1 && newQuantity <= product.stock) {
      setQuantity(newQuantity);
    }
  };

  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingItem = cart.find(item => item._id === product._id);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.push({ ...product, quantity });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${quantity} item(s) added to cart!`);
  };

  const buyNow = () => {
    addToCart();
    navigate('/cart');
  };

  if (loading) {
    return (
      <div className="product-details-page">
        <Header />
        <div className="loading">Loading product...</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="product-details-page">
        <Header />
        <div className="container">
          <div className="product-not-found">Product not found</div>
        </div>
      </div>
    );
  }

  return (
    <div className="product-details-page">
      <Header />

      <div className="container">
        {/* Breadcrumb */}
        <div className="breadcrumb">
          <span onClick={() => navigate('/')}>Home</span>
          <span>/</span>
          <span onClick={() => navigate('/products')}>Products</span>
          <span>/</span>
          <span onClick={() => navigate(`/products?category=${product.category}`)}>
            {product.category}
          </span>
          <span>/</span>
          <span className="current">{product.name}</span>
        </div>

        {/* Product Main Section */}
        <div className="product-main">
          {/* Image Gallery */}
          <div className="product-gallery">
            <div className="main-image">
              <img src={product.images[selectedImage]} alt={product.name} />
              {product.discount && (
                <div className="discount-badge">-{product.discount}%</div>
              )}
            </div>
            <div className="image-thumbnails">
              {product.images.map((image, index) => (
                <div
                  key={index}
                  className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
                  onClick={() => setSelectedImage(index)}
                >
                  <img src={image} alt={`View ${index + 1}`} />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="product-details">
            <h1 className="product-title">{product.name}</h1>

            <div className="product-meta">
              <div className="rating-section">
                <span className="rating">⭐ {product.rating}</span>
                <span className="reviews-count">({product.reviews} reviews)</span>
              </div>
              <div className="seller-info">
                <span>Sold by:</span>
                <strong>{product.seller.name}</strong>
                <span className="seller-rating">⭐ {product.seller.rating}</span>
              </div>
            </div>

            <div className="price-section">
              <div className="current-price">${product.price}</div>
              {product.originalPrice && (
                <>
                  <div className="original-price">${product.originalPrice}</div>
                  <div className="savings">Save ${(product.originalPrice - product.price).toFixed(2)}</div>
                </>
              )}
            </div>

            <div className="stock-status">
              {product.stock > 0 ? (
                <span className="in-stock">✓ In Stock ({product.stock} available)</span>
              ) : (
                <span className="out-of-stock">✗ Out of Stock</span>
              )}
            </div>

            <div className="quantity-selector">
              <label>Quantity:</label>
              <div className="quantity-controls">
                <button onClick={() => handleQuantityChange(-1)}>-</button>
                <input type="number" value={quantity} readOnly />
                <button onClick={() => handleQuantityChange(1)}>+</button>
              </div>
            </div>

            <div className="action-buttons">
              <button className="add-to-cart-btn" onClick={addToCart}>
                🛒 Add to Cart
              </button>
              <button className="buy-now-btn" onClick={buyNow}>
                Buy Now
              </button>
            </div>

            <div className="product-features">
              <h3>Key Features:</h3>
              <ul>
                {product.features.map((feature, index) => (
                  <li key={index}>✓ {feature}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="product-tabs">
          <div className="tabs-header">
            <button
              className={`tab ${activeTab === 'description' ? 'active' : ''}`}
              onClick={() => setActiveTab('description')}
            >
              Description
            </button>
            <button
              className={`tab ${activeTab === 'specifications' ? 'active' : ''}`}
              onClick={() => setActiveTab('specifications')}
            >
              Specifications
            </button>
            <button
              className={`tab ${activeTab === 'reviews' ? 'active' : ''}`}
              onClick={() => setActiveTab('reviews')}
            >
              Reviews ({product.reviews})
            </button>
          </div>

          <div className="tabs-content">
            {activeTab === 'description' && (
              <div className="tab-panel">
                <h3>Product Description</h3>
                <p>{product.description}</p>
              </div>
            )}

            {activeTab === 'specifications' && (
              <div className="tab-panel">
                <h3>Product Specifications</h3>
                <table className="specifications-table">
                  <tbody>
                    {Object.entries(product.specifications).map(([key, value]) => (
                      <tr key={key}>
                        <td className="spec-label">{key}</td>
                        <td className="spec-value">{value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="tab-panel">
                <div className="reviews-summary">
                  <div className="overall-rating">
                    <h2>{product.rating}</h2>
                    <div className="stars">⭐⭐⭐⭐⭐</div>
                    <p>{product.reviews} reviews</p>
                  </div>
                </div>

                <div className="reviews-list">
                  {product.customerReviews.map((review) => (
                    <div key={review.id} className="review-card">
                      <div className="review-header">
                        <div className="reviewer-info">
                          <strong>{review.user}</strong>
                          <span className="review-rating">{'⭐'.repeat(review.rating)}</span>
                        </div>
                        <span className="review-date">{review.date}</span>
                      </div>
                      <p className="review-comment">{review.comment}</p>
                      <div className="review-footer">
                        <button className="helpful-btn">👍 Helpful ({review.helpful})</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
