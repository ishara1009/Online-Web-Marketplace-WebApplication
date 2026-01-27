import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Header from '../components/Header';
import './ProductsPage.css';

const ProductsPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    category: searchParams.get('category') || '',
    search: searchParams.get('search') || '',
    minPrice: '',
    maxPrice: '',
    rating: '',
    sortBy: 'newest'
  });
  const [showFilters, setShowFilters] = useState(false);

  // Sample products data (replace with API call)
  const sampleProducts = [
    {
      _id: '1',
      name: 'Wireless Bluetooth Headphones',
      price: 49.99,
      originalPrice: 79.99,
      image: 'https://via.placeholder.com/300x300?text=Headphones',
      category: 'Electronics',
      rating: 4.5,
      reviews: 1250,
      seller: { name: 'TechStore' },
      stock: 50,
      discount: 38
    },
    {
      _id: '2',
      name: 'Smart Watch Fitness Tracker',
      price: 129.99,
      originalPrice: 199.99,
      image: 'https://via.placeholder.com/300x300?text=Smart+Watch',
      category: 'Electronics',
      rating: 4.7,
      reviews: 890,
      seller: { name: 'GadgetHub' },
      stock: 30,
      discount: 35
    },
    {
      _id: '3',
      name: 'Mens Casual T-Shirt',
      price: 19.99,
      originalPrice: 29.99,
      image: 'https://via.placeholder.com/300x300?text=T-Shirt',
      category: 'Fashion',
      rating: 4.3,
      reviews: 520,
      seller: { name: 'FashionMart' },
      stock: 100,
      discount: 33
    },
    {
      _id: '4',
      name: 'Laptop Backpack Waterproof',
      price: 34.99,
      originalPrice: 54.99,
      image: 'https://via.placeholder.com/300x300?text=Backpack',
      category: 'Fashion',
      rating: 4.6,
      reviews: 760,
      seller: { name: 'BagWorld' },
      stock: 45,
      discount: 36
    },
    {
      _id: '5',
      name: 'LED Desk Lamp with USB',
      price: 24.99,
      originalPrice: 39.99,
      image: 'https://via.placeholder.com/300x300?text=Desk+Lamp',
      category: 'Home & Garden',
      rating: 4.4,
      reviews: 340,
      seller: { name: 'HomeGoods' },
      stock: 60,
      discount: 38
    },
    {
      _id: '6',
      name: 'Yoga Mat Non-Slip',
      price: 29.99,
      originalPrice: 49.99,
      image: 'https://via.placeholder.com/300x300?text=Yoga+Mat',
      category: 'Sports',
      rating: 4.5,
      reviews: 680,
      seller: { name: 'FitGear' },
      stock: 80,
      discount: 40
    }
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      let filtered = [...sampleProducts];

      // Apply filters
      if (filters.category) {
        filtered = filtered.filter(p => p.category === filters.category);
      }

      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        filtered = filtered.filter(p => 
          p.name.toLowerCase().includes(searchLower) ||
          p.category.toLowerCase().includes(searchLower)
        );
      }

      if (filters.minPrice) {
        filtered = filtered.filter(p => p.price >= parseFloat(filters.minPrice));
      }

      if (filters.maxPrice) {
        filtered = filtered.filter(p => p.price <= parseFloat(filters.maxPrice));
      }

      if (filters.rating) {
        filtered = filtered.filter(p => p.rating >= parseFloat(filters.rating));
      }

      // Sort
      switch (filters.sortBy) {
        case 'price-low':
          filtered.sort((a, b) => a.price - b.price);
          break;
        case 'price-high':
          filtered.sort((a, b) => b.price - a.price);
          break;
        case 'rating':
          filtered.sort((a, b) => b.rating - a.rating);
          break;
        case 'popular':
          filtered.sort((a, b) => b.reviews - a.reviews);
          break;
        default:
          // newest - no sorting needed
          break;
      }

      setProducts(filtered);
      setLoading(false);
    }, 500);
  }, [filters]);

  useEffect(() => {
    setFilters(prev => ({
      ...prev,
      category: searchParams.get('category') || '',
      search: searchParams.get('search') || ''
    }));
  }, [searchParams]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      category: '',
      search: '',
      minPrice: '',
      maxPrice: '',
      rating: '',
      sortBy: 'newest'
    });
  };

  const addToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingItem = cart.find(item => item._id === product._id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Added to cart!');
  };

  return (
    <div className="products-page">
      <Header />

      <div className="products-container">
        {/* Filters Sidebar */}
        <aside className={`filters-sidebar ${showFilters ? 'show' : ''}`}>
          <div className="filters-header">
            <h3>Filters</h3>
            <button 
              className="close-filters"
              onClick={() => setShowFilters(false)}
            >
              ✕
            </button>
          </div>

          <div className="filter-section">
            <h4>Price Range</h4>
            <div className="price-inputs">
              <input
                type="number"
                placeholder="Min"
                value={filters.minPrice}
                onChange={(e) => handleFilterChange('minPrice', e.target.value)}
              />
              <span>-</span>
              <input
                type="number"
                placeholder="Max"
                value={filters.maxPrice}
                onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
              />
            </div>
          </div>

          <div className="filter-section">
            <h4>Rating</h4>
            <div className="rating-filters">
              {[4, 3, 2, 1].map(rating => (
                <label key={rating}>
                  <input
                    type="radio"
                    name="rating"
                    checked={filters.rating === rating.toString()}
                    onChange={() => handleFilterChange('rating', rating.toString())}
                  />
                  <span>{rating}★ & above</span>
                </label>
              ))}
            </div>
          </div>

          <button className="clear-filters-btn" onClick={clearFilters}>
            Clear All Filters
          </button>
        </aside>

        {/* Products Grid */}
        <main className="products-main">
          <div className="products-header">
            <div className="results-info">
              <h2>
                {filters.category ? filters.category : filters.search ? `Search: "${filters.search}"` : 'All Products'}
              </h2>
              <span>{products.length} products found</span>
            </div>

            <div className="products-controls">
              <button 
                className="filter-toggle-btn"
                onClick={() => setShowFilters(!showFilters)}
              >
                🎚️ Filters
              </button>

              <select 
                value={filters.sortBy}
                onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                className="sort-select"
              >
                <option value="newest">Newest First</option>
                <option value="popular">Most Popular</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>

          {loading ? (
            <div className="loading">Loading products...</div>
          ) : products.length === 0 ? (
            <div className="no-products">
              <h3>No products found</h3>
              <p>Try adjusting your filters</p>
            </div>
          ) : (
            <div className="products-grid">
              {products.map(product => (
                <div key={product._id} className="product-card">
                  {product.discount && (
                    <div className="discount-badge">-{product.discount}%</div>
                  )}

                  <div 
                    className="product-image"
                    onClick={() => navigate(`/product/${product._id}`)}
                  >
                    <img src={product.image} alt={product.name} />
                  </div>

                  <div className="product-info">
                    <h3 
                      className="product-name"
                      onClick={() => navigate(`/product/${product._id}`)}
                    >
                      {product.name}
                    </h3>

                    <div className="product-rating">
                      <span className="rating">⭐ {product.rating}</span>
                      <span className="reviews">({product.reviews})</span>
                    </div>

                    <div className="product-seller">
                      by {product.seller.name}
                    </div>

                    <div className="product-price">
                      <span className="current-price">${product.price}</span>
                      {product.originalPrice && (
                        <span className="original-price">${product.originalPrice}</span>
                      )}
                    </div>

                    <div className="product-actions">
                      <button 
                        className="add-to-cart-btn"
                        onClick={() => addToCart(product)}
                      >
                        🛒 Add to Cart
                      </button>
                      <button 
                        className="view-details-btn"
                        onClick={() => navigate(`/product/${product._id}`)}
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default ProductsPage;
