import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import './SellerProductsPage.css';
import apiClient from '../services/apiClient';

const SellerProductsPage = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    originalPrice: '',
    category: '',
    stock: '',
    description: '',
    sku: ''
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

    apiClient.get('/seller/products').then(({ data }) => setProducts(data.products || [])).catch(() => setMessage('Could not load products. Please check the backend connection.'));
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = new FormData();
    Object.entries(formData).forEach(([key, value]) => payload.append(key === 'originalPrice' ? 'discountPrice' : key, value));
    if (image) payload.append('image', image);
    if (!editingId && !image) { setMessage('Choose a main product image.'); return; }
    try {
      const { data } = editingId
        ? await apiClient.put(`/seller/products/${editingId}`, payload)
        : await apiClient.post('/seller/products', payload);
      setProducts(current => editingId ? current.map(item => item._id === editingId ? data.product : item) : [data.product, ...current]);
      setMessage(editingId ? 'Product updated successfully.' : 'Product added successfully.');
    } catch (error) { setMessage(error.response?.data?.message || 'Could not save the product.'); return; }

    // Reset form
    setFormData({
      name: '',
      price: '',
      originalPrice: '',
      category: '',
      stock: '',
      description: '',
      sku: ''
    });
    setImage(null);
    setEditingId(null);
    setShowAddForm(false);
  };

  const editProduct = product => {
    setFormData({ name: product.name, price: product.price, originalPrice: product.discountPrice || '', category: product.category, stock: product.stock, description: product.description, sku: product.sku });
    setEditingId(product._id); setImage(null); setShowAddForm(true); window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const deleteProduct = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try { await apiClient.delete(`/seller/products/${productId}`); setProducts(current => current.filter(p => p._id !== productId)); }
      catch (error) { setMessage(error.response?.data?.message || 'Could not delete the product.'); }
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
            onClick={() => { setShowAddForm(!showAddForm); if (showAddForm) { setEditingId(null); setImage(null); } }}
          >
            {showAddForm ? 'Cancel' : 'Add Product'}
          </button>
        </div>

        {message && <div className="checkout-error" role="status">{message}</div>}

        {showAddForm && (
          <div className="add-product-form">
            <h2>{editingId ? 'Edit Product' : 'Add New Product'}</h2>
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
                  <label>SKU *</label>
                  <input name="sku" value={formData.sku} onChange={handleChange} required />
                </div>

                <div className="form-group">
                  <label>Main Image {editingId ? '(leave empty to keep current)' : '*'}</label>
                  <input type="file" accept="image/*" onChange={e => setImage(e.target.files[0] || null)} required={!editingId} />
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
                {editingId ? 'Save Changes' : 'Add Product'}
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
                  {product.images?.[0]?.url ? <img src={product.images[0].url} alt={product.name} /> : <div className="no-products-icon">IMG</div>}
                  {product.discount > 0 && (
                    <div className="discount-badge">-{product.discount}%</div>
                  )}
                </div>

                <div className="product-details">
                  <h3>{product.name}</h3>
                  <p className="product-category">{product.category}</p>
                  
                  <div className="product-prices">
                    <span className="current-price">${product.discountPrice ?? product.price}</span>
                    {product.discountPrice != null && (
                      <span className="original-price">${product.price}</span>
                    )}
                  </div>

                  <div className="product-stock">
                    <span className={product.stock > 0 ? 'in-stock' : 'out-of-stock'}>
                      {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                    </span>
                  </div>

                  <div className="product-stats">
                    <span>{Number(product.ratings || 0).toFixed(1)}</span>
                    <span>{product.numOfReviews || 0} reviews</span>
                  </div>

                  <div className="product-actions">
                    <button 
                      className="edit-btn"
                      onClick={() => editProduct(product)}
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
