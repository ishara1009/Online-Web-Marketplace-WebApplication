import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import './SellerProductsPage.css';

const SellerProductsPage = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    originalPrice: '',
    category: '',
    stock: '',
    description: ''
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

    // Load seller's products
    const storedProducts = JSON.parse(localStorage.getItem('sellerProducts') || '[]');
    setProducts(storedProducts);
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newProduct = {
      _id: Date.now().toString(),
      ...formData,
      price: parseFloat(formData.price),
      originalPrice: parseFloat(formData.originalPrice) || null,
      stock: parseInt(formData.stock),
      image: 'https://via.placeholder.com/300x300?text=' + encodeURIComponent(formData.name),
      images: [
        'https://via.placeholder.com/300x300?text=' + encodeURIComponent(formData.name),
      ],
      rating: 0,
      reviews: 0,
      seller: {
        name: JSON.parse(localStorage.getItem('user')).firstName + "'s Store"
      },
      discount: formData.originalPrice ? Math.round(((formData.originalPrice - formData.price) / formData.originalPrice) * 100) : 0,
      createdAt: new Date().toISOString()
    };

    const updatedProducts = [...products, newProduct];
    setProducts(updatedProducts);
    localStorage.setItem('sellerProducts', JSON.stringify(updatedProducts));

    // Reset form
    setFormData({
      name: '',
      price: '',
      originalPrice: '',
      category: '',
      stock: '',
      description: ''
    });
    setShowAddForm(false);
    alert('Product added successfully!');
  };

  const deleteProduct = (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      const updatedProducts = products.filter(p => p._id !== productId);
      setProducts(updatedProducts);
      localStorage.setItem('sellerProducts', JSON.stringify(updatedProducts));
    }
  };

  return (
    <div className="seller-products-page">
      <Header />

      <div className="seller-container">
        <div className="page-header">
          <h1>My Products</h1>
          <button 
            className="add-product-btn"
            onClick={() => setShowAddForm(!showAddForm)}
          >
            {showAddForm ? 'Cancel' : 'Add Product'}
          </button>
        </div>

        {showAddForm && (
          <div className="add-product-form">
            <h2>Add New Product</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-grid">
                <div className="form-group full">
                  <label>Product Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Price *</label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    step="0.01"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Original Price (Optional)</label>
                  <input
                    type="number"
                    name="originalPrice"
                    value={formData.originalPrice}
                    onChange={handleChange}
                    step="0.01"
                  />
                </div>

                <div className="form-group">
                  <label>Category *</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Category</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Fashion">Fashion</option>
                    <option value="Home & Garden">Home & Garden</option>
                    <option value="Sports">Sports</option>
                    <option value="Books">Books</option>
                    <option value="Toys">Toys</option>
                    <option value="Beauty">Beauty</option>
                    <option value="Automotive">Automotive</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Stock Quantity *</label>
                  <input
                    type="number"
                    name="stock"
                    value={formData.stock}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group full">
                  <label>Description *</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows="4"
                    required
                  ></textarea>
                </div>
              </div>

              <button type="submit" className="submit-btn">
                Add Product
              </button>
            </form>
          </div>
        )}

        {products.length === 0 ? (
          <div className="no-products">
            <div className="no-products-icon">NO</div>
            <h2>No products yet</h2>
            <p>Start adding products to your store!</p>
          </div>
        ) : (
          <div className="products-grid">
            {products.map(product => (
              <div key={product._id} className="product-card">
                <div className="product-image">
                  <img src={product.image} alt={product.name} />
                  {product.discount > 0 && (
                    <div className="discount-badge">-{product.discount}%</div>
                  )}
                </div>

                <div className="product-details">
                  <h3>{product.name}</h3>
                  <p className="product-category">{product.category}</p>
                  
                  <div className="product-prices">
                    <span className="current-price">${product.price}</span>
                    {product.originalPrice && (
                      <span className="original-price">${product.originalPrice}</span>
                    )}
                  </div>

                  <div className="product-stock">
                    <span className={product.stock > 0 ? 'in-stock' : 'out-of-stock'}>
                      {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                    </span>
                  </div>

                  <div className="product-stats">
                    <span>{product.rating.toFixed(1)}</span>
                    <span>{product.reviews} views</span>
                  </div>

                  <div className="product-actions">
                    <button 
                      className="edit-btn"
                      onClick={() => alert('Edit functionality coming soon!')}
                    >
                      Edit
                    </button>
                    <button 
                      className="delete-btn"
                      onClick={() => deleteProduct(product._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SellerProductsPage;
