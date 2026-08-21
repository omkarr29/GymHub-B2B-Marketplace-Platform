import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const inputStyle = {
  width: '100%',
  padding: '10px 12px',
  borderRadius: '8px',
  border: '1px solid #d8c3b5',
  backgroundColor: '#fff1e9',
  color: '#211a16',
  outline: 'none',
  boxSizing: 'border-box',
  fontSize: '13px',
  fontFamily: 'inherit',
};

const labelStyle = {
  display: 'block',
  fontWeight: '600',
  marginBottom: '6px',
  color: '#534439',
  fontSize: '12px',
};

const categories = [
  'Cardio Equipment',
  'Strength Equipment',
  'Free Weights',
  'Functional Training',
  'Gym Accessories',
  'Recovery Equipment',
  'Gym Flooring',
  'Commercial Gym Equipment',
];

const AddProduct = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    description: '',
    price: '',
    stock: '',
    brand: '',
    specifications: '',
    minOrderQty: '',
    availability: 'In Stock',
  });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: null }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Product name is required.';
    if (!formData.category) newErrors.category = 'Please select a category.';
    if (!formData.description.trim() || formData.description.trim().length < 20)
      newErrors.description = 'Description should be at least 20 characters.';
    if (!formData.price || Number(formData.price) <= 0) newErrors.price = 'Enter a valid price.';
    if (!formData.stock || Number(formData.stock) < 0) newErrors.stock = 'Enter a valid stock quantity.';
    if (!formData.minOrderQty || Number(formData.minOrderQty) <= 0)
      newErrors.minOrderQty = 'Enter a valid minimum order quantity.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) {
      setSuccessMessage('');
      return;
    }
    setSuccessMessage('Product submitted for approval successfully.');
    setTimeout(() => {
      navigate('/supplier/products');
    }, 1200);
  };

  const handleCancel = () => {
    navigate('/supplier/products');
  };

  return (
    <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div>
        <h1 style={{ margin: 0, fontSize: '24px', fontWeight: '700', color: '#211a16' }}>Add Product</h1>
        <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: '#79573d' }}>
          New listings are submitted for admin approval before going live on the marketplace.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        style={{
          backgroundColor: '#ffffff',
          border: '1px solid #ede0d9',
          borderRadius: '16px',
          padding: '28px',
          maxWidth: '820px',
        }}
      >
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
          <div style={{ gridColumn: 'span 2' }}>
            <label style={labelStyle}>Product Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Commercial Motorized Treadmill X9"
              style={{ ...inputStyle, ...(errors.name ? { border: '1px solid #ba1a1a' } : {}) }}
            />
            {errors.name && <p style={{ margin: '4px 0 0', fontSize: '11px', color: '#ba1a1a' }}>{errors.name}</p>}
          </div>

          <div>
            <label style={labelStyle}>Category *</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              style={{ ...inputStyle, ...(errors.category ? { border: '1px solid #ba1a1a' } : {}) }}
            >
              <option value="">Select category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            {errors.category && <p style={{ margin: '4px 0 0', fontSize: '11px', color: '#ba1a1a' }}>{errors.category}</p>}
          </div>

          <div>
            <label style={labelStyle}>Brand</label>
            <input type="text" name="brand" value={formData.brand} onChange={handleChange} placeholder="e.g. FitPro" style={inputStyle} />
          </div>

          <div style={{ gridColumn: 'span 2' }}>
            <label style={labelStyle}>Description *</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              placeholder="Describe the product, materials, build quality, and intended use..."
              style={{ ...inputStyle, resize: 'vertical', ...(errors.description ? { border: '1px solid #ba1a1a' } : {}) }}
            />
            {errors.description && <p style={{ margin: '4px 0 0', fontSize: '11px', color: '#ba1a1a' }}>{errors.description}</p>}
          </div>

          <div>
            <label style={labelStyle}>Price (₹) *</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="145000"
              style={{ ...inputStyle, ...(errors.price ? { border: '1px solid #ba1a1a' } : {}) }}
            />
            {errors.price && <p style={{ margin: '4px 0 0', fontSize: '11px', color: '#ba1a1a' }}>{errors.price}</p>}
          </div>

          <div>
            <label style={labelStyle}>Stock Quantity *</label>
            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              placeholder="18"
              style={{ ...inputStyle, ...(errors.stock ? { border: '1px solid #ba1a1a' } : {}) }}
            />
            {errors.stock && <p style={{ margin: '4px 0 0', fontSize: '11px', color: '#ba1a1a' }}>{errors.stock}</p>}
          </div>

          <div>
            <label style={labelStyle}>Minimum Order Quantity *</label>
            <input
              type="number"
              name="minOrderQty"
              value={formData.minOrderQty}
              onChange={handleChange}
              placeholder="1"
              style={{ ...inputStyle, ...(errors.minOrderQty ? { border: '1px solid #ba1a1a' } : {}) }}
            />
            {errors.minOrderQty && <p style={{ margin: '4px 0 0', fontSize: '11px', color: '#ba1a1a' }}>{errors.minOrderQty}</p>}
          </div>

          <div>
            <label style={labelStyle}>Availability</label>
            <select name="availability" value={formData.availability} onChange={handleChange} style={inputStyle}>
              <option value="In Stock">In Stock</option>
              <option value="Made to Order">Made to Order</option>
              <option value="Out of Stock">Out of Stock</option>
            </select>
          </div>

          <div style={{ gridColumn: 'span 2' }}>
            <label style={labelStyle}>Specifications</label>
            <textarea
              name="specifications"
              value={formData.specifications}
              onChange={handleChange}
              rows={3}
              placeholder="e.g. Motor: 5HP AC, Frame: Steel, Weight capacity: 180kg"
              style={{ ...inputStyle, resize: 'vertical' }}
            />
          </div>

          <div style={{ gridColumn: 'span 2' }}>
            <label style={labelStyle}>Product Images</label>
            <div
              style={{
                border: '1.5px dashed #d8c3b5',
                borderRadius: '10px',
                padding: '28px',
                textAlign: 'center',
                color: '#857468',
                fontSize: '13px',
                backgroundColor: '#fff8f5',
              }}
            >
              Drag and drop images here, or click to browse (frontend preview only in this build).
            </div>
          </div>
        </div>

        <div style={{ marginTop: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button
            type="submit"
            style={{
              padding: '12px 28px',
              borderRadius: '8px',
              backgroundColor: '#00687a',
              color: '#ffffff',
              border: 'none',
              fontWeight: '600',
              fontSize: '13px',
              cursor: 'pointer',
            }}
          >
            Save Product
          </button>
          <button
            type="button"
            onClick={handleCancel}
            style={{
              padding: '12px 28px',
              borderRadius: '8px',
              backgroundColor: '#ffffff',
              border: '1px solid #d8c3b5',
              color: '#534439',
              fontWeight: '600',
              fontSize: '13px',
              cursor: 'pointer',
            }}
          >
            Cancel
          </button>
          {successMessage && (
            <span style={{ fontSize: '13px', fontWeight: '600', color: '#15803d' }}>{successMessage}</span>
          )}
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
