import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddressesPage.css';

const AddressesPage = () => {
  const navigate = useNavigate();
  const [addresses, setAddresses] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
    isDefault: false
  });

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) {
      navigate('/login');
      return;
    }

    const parsedUser = JSON.parse(user);
    if (parsedUser.role !== 'customer') {
      navigate('/');
      return;
    }

    // Load addresses from localStorage
    const savedAddresses = localStorage.getItem('addresses');
    if (savedAddresses) {
      setAddresses(JSON.parse(savedAddresses));
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newAddress = {
      id: Date.now(),
      ...formData
    };

    const updatedAddresses = [...addresses, newAddress];
    setAddresses(updatedAddresses);
    localStorage.setItem('addresses', JSON.stringify(updatedAddresses));

    setFormData({
      fullName: '',
      phone: '',
      address: '',
      city: '',
      postalCode: '',
      country: '',
      isDefault: false
    });
    setShowForm(false);
  };

  const handleDelete = (id) => {
    const updatedAddresses = addresses.filter(addr => addr.id !== id);
    setAddresses(updatedAddresses);
    localStorage.setItem('addresses', JSON.stringify(updatedAddresses));
  };

  const handleSetDefault = (id) => {
    const updatedAddresses = addresses.map(addr => ({
      ...addr,
      isDefault: addr.id === id
    }));
    setAddresses(updatedAddresses);
    localStorage.setItem('addresses', JSON.stringify(updatedAddresses));
  };

  return (
    <div className="addresses-page">
      <div className="page-header">
        <button className="back-btn" onClick={() => navigate('/customer/dashboard')}>
          Back to Dashboard
        </button>
        <h1>My Addresses</h1>
      </div>

      <div className="addresses-container">
        <div className="addresses-header">
          <h2>Saved Addresses</h2>
          <button className="add-address-btn" onClick={() => setShowForm(!showForm)}>
            {showForm ? 'Cancel' : 'Add New Address'}
          </button>
        </div>

        {showForm && (
          <div className="address-form-card">
            <h3>Add New Address</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-grid">
                <div className="form-group">
                  <label>Full Name *</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group full-width">
                  <label>Address *</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Street address, apartment, suite, etc."
                    required
                  />
                </div>

                <div className="form-group">
                  <label>City *</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Postal Code *</label>
                  <input
                    type="text"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group full-width">
                  <label>Country *</label>
                  <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group full-width">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="isDefault"
                      checked={formData.isDefault}
                      onChange={handleChange}
                    />
                    <span>Set as default address</span>
                  </label>
                </div>
              </div>

              <button type="submit" className="submit-btn">
                Save Address
              </button>
            </form>
          </div>
        )}

        {addresses.length === 0 ? (
          <div className="no-addresses">

            <h2>No saved addresses</h2>
            <p>Add a new address to make checkout faster</p>
          </div>
        ) : (
          <div className="addresses-grid">
            {addresses.map(address => (
              <div key={address.id} className={`address-card ${address.isDefault ? 'default' : ''}`}>
                {address.isDefault && <span className="default-badge">Default</span>}
                <h3>{address.fullName}</h3>
                <p className="address-phone">{address.phone}</p>
                <p className="address-text">
                  {address.address}<br />
                  {address.city}, {address.postalCode}<br />
                  {address.country}
                </p>

                <div className="address-actions">
                  {!address.isDefault && (
                    <button
                      className="set-default-btn"
                      onClick={() => handleSetDefault(address.id)}
                    >
                      Set as Default
                    </button>
                  )}
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(address.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AddressesPage;
