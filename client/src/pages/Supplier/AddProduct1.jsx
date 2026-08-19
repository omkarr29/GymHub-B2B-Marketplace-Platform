import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const AddProduct1 = () => {
  const navigate = useNavigate();

  // Categories list
  const categories = [
    'Cardio Equipment',
    'Strength Equipment',
    'Free Weights',
    'Functional Training',
    'Gym Flooring',
    'Gym Accessories',
    'Recovery Equipment',
    'Commercial Gym Equipment'
  ];

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    category: 'Cardio Equipment',
    brand: 'FitEquip Pro',
    description: '',
    price: '',
    discountPrice: '',
    moq: '2',
    stock: '',
    sku: '',
    lowStockThreshold: '5',
    weight: '',
    dimensions: '',
    warranty: '2 Years Commercial Warranty',
    availability: 'In Stock'
  });

  // Requirement #18: Dynamic Bulk Pricing Tiers
  const [bulkPricing, setBulkPricing] = useState([
    { minQty: '1', maxQty: '4', pricePerUnit: '' },
    { minQty: '5', maxQty: '9', pricePerUnit: '' },
    { minQty: '10+', maxQty: '', pricePerUnit: '' }
  ]);

  // Requirement #35: Form Validation Error State
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear field-specific error upon typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleBulkPriceChange = (index, field, value) => {
    const updated = [...bulkPricing];
    updated[index][field] = value;
    setBulkPricing(updated);
  };

  const validateForm = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Product name is required.';
    if (!formData.price || Number(formData.price) <= 0) errs.price = 'Valid selling price is required.';
    if (!formData.stock || Number(formData.stock) < 0) errs.stock = 'Available stock quantity is required.';
    if (!formData.moq || Number(formData.moq) <= 0) errs.moq = 'Minimum Order Quantity (MOQ) must be at least 1.';
    
    // Requirement #35: MOQ constraint validation
    if (Number(formData.moq) > Number(formData.stock) && Number(formData.stock) > 0) {
      errs.moq = 'MOQ cannot be greater than initial stock quantity.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (statusType) => {
    if (!validateForm()) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const payload = {
      ...formData,
      bulkPricing,
      status: statusType === 'Draft' ? 'Draft' : 'Pending Approval',
      submittedDate: new Date().toLocaleDateString('en-GB')
    };

    alert(`Product listing "${payload.name}" saved as "${payload.status}". Admin review will be scheduled.`);
    navigate('/supplier/products');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '900px', margin: '0 auto' }}>
      {/* Page Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h1 style={{ margin: 0, fontSize: '24px', fontWeight: '600', color: '#211a16' }}>
            Add New B2B Product
          </h1>
          <p style={{ margin: '4px 0 0', fontSize: '14px', color: '#534439' }}>
            List commercial fitness equipment, set minimum wholesale order quantities, and define bulk discount tiers.
          </p>
        </div>

        <Link
          to="/supplier/products"
          style={{
            padding: '8px 14px',
            backgroundColor: '#ede0d9',
            color: '#211a16',
            borderRadius: '6px',
            textDecoration: 'none',
            fontSize: '13px',
            fontWeight: '600'
          }}
        >
          ← Cancel
        </Link>
      </div>

      <form onSubmit={(e) => e.preventDefault()} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {/* Section 1: Basic Information */}
        <div
          style={{
            backgroundColor: '#fff8f5',
            border: '1px solid #d8c3b5',
            borderRadius: '8px',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
          }}
        >
          <h2 style={{ margin: 0, fontSize: '16px', fontWeight: '600', color: '#8c4f16', borderBottom: '1px solid #ede0d9', paddingBottom: '8px' }}>
            1. Basic Information
          </h2>

          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#211a16', marginBottom: '6px' }}>
              Product Name *
            </label>
            <input
              type="text"
              name="name"
              placeholder="e.g. Commercial 5HP Motorized Treadmill T-900"
              value={formData.name}
              onChange={handleInputChange}
              style={{
                width: '100%',
                padding: '10px 12px',
                borderRadius: '6px',
                border: errors.name ? '1px solid #ba1a1a' : '1px solid #d8c3b5',
                backgroundColor: '#fff1e9',
                fontSize: '13px',
                outline: 'none',
                boxSizing: 'border-box'
              }}
            />
            {errors.name && <span style={{ color: '#ba1a1a', fontSize: '12px', marginTop: '4px', display: 'block' }}>{errors.name}</span>}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#211a16', marginBottom: '6px' }}>
                Category *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  borderRadius: '6px',
                  border: '1px solid #d8c3b5',
                  backgroundColor: '#fff1e9',
                  fontSize: '13px',
                  outline: 'none',
                  boxSizing: 'border-box',
                  cursor: 'pointer'
                }}
              >
                {categories.map((cat, idx) => (
                  <option key={idx} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#211a16', marginBottom: '6px' }}>
                Brand / Manufacturer
              </label>
              <input
                type="text"
                name="brand"
                value={formData.brand}
                onChange={handleInputChange}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  borderRadius: '6px',
                  border: '1px solid #d8c3b5',
                  backgroundColor: '#fff1e9',
                  fontSize: '13px',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#211a16', marginBottom: '6px' }}>
              Product Description
            </label>
            <textarea
              rows="4"
              name="description"
              placeholder="Provide key commercial use points, motor rating, frame gauge, load capacities..."
              value={formData.description}
              onChange={handleInputChange}
              style={{
                width: '100%',
                padding: '10px 12px',
                borderRadius: '6px',
                border: '1px solid #d8c3b5',
                backgroundColor: '#fff1e9',
                fontSize: '13px',
                outline: 'none',
                boxSizing: 'border-box',
                fontFamily: 'inherit'
              }}
            />
          </div>
        </div>

        {/* Section 2: Pricing, B2B MOQ & Bulk Pricing Tiers */}
        <div
          style={{
            backgroundColor: '#fff8f5',
            border: '1px solid #d8c3b5',
            borderRadius: '8px',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
          }}
        >
          <h2 style={{ margin: 0, fontSize: '16px', fontWeight: '600', color: '#8c4f16', borderBottom: '1px solid #ede0d9', paddingBottom: '8px' }}>
            2. Pricing & B2B Wholesale Rules
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#211a16', marginBottom: '6px' }}>
                Unit Base Price (₹) *
              </label>
              <input
                type="number"
                name="price"
                placeholder="125000"
                value={formData.price}
                onChange={handleInputChange}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  borderRadius: '6px',
                  border: errors.price ? '1px solid #ba1a1a' : '1px solid #d8c3b5',
                  backgroundColor: '#fff1e9',
                  fontSize: '13px',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
              {errors.price && <span style={{ color: '#ba1a1a', fontSize: '12px', marginTop: '4px', display: 'block' }}>{errors.price}</span>}
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#211a16', marginBottom: '6px' }}>
                Discount Price (₹ Optional)
              </label>
              <input
                type="number"
                name="discountPrice"
                placeholder="119000"
                value={formData.discountPrice}
                onChange={handleInputChange}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  borderRadius: '6px',
                  border: '1px solid #d8c3b5',
                  backgroundColor: '#fff1e9',
                  fontSize: '13px',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            {/* Requirement #17: B2B MOQ Field */}
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#211a16', marginBottom: '6px' }}>
                Minimum Order Qty (MOQ) *
              </label>
              <input
                type="number"
                name="moq"
                placeholder="2"
                min="1"
                value={formData.moq}
                onChange={handleInputChange}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  borderRadius: '6px',
                  border: errors.moq ? '1px solid #ba1a1a' : '1px solid #d8c3b5',
                  backgroundColor: '#fff1e9',
                  fontSize: '13px',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
              {errors.moq && <span style={{ color: '#ba1a1a', fontSize: '12px', marginTop: '4px', display: 'block' }}>{errors.moq}</span>}
            </div>
          </div>

          {/* Requirement #18: Bulk Pricing Table */}
          <div style={{ marginTop: '8px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#211a16', marginBottom: '8px' }}>
              Tiered Wholesale Bulk Pricing
            </label>
            <div style={{ border: '1px solid #d8c3b5', borderRadius: '6px', overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
                <thead>
                  <tr style={{ backgroundColor: '#f9ebe4', color: '#534439' }}>
                    <th style={{ padding: '8px 12px' }}>Order Quantity Tier</th>
                    <th style={{ padding: '8px 12px' }}>Wholesale Price Per Unit (₹)</th>
                  </tr>
                </thead>
                <tbody>
                  {bulkPricing.map((tier, idx) => (
                    <tr key={idx} style={{ borderTop: '1px solid #ede0d9', backgroundColor: '#fff8f5' }}>
                      <td style={{ padding: '8px 12px', fontWeight: '500', color: '#211a16' }}>
                        {tier.minQty} {tier.maxQty ? `to ${tier.maxQty} units` : 'units & above'}
                      </td>
                      <td style={{ padding: '8px 12px' }}>
                        <input
                          type="number"
                          placeholder="e.g. 115000"
                          value={tier.pricePerUnit}
                          onChange={(e) => handleBulkPriceChange(idx, 'pricePerUnit', e.target.value)}
                          style={{
                            width: '100%',
                            maxWidth: '220px',
                            padding: '6px 10px',
                            borderRadius: '4px',
                            border: '1px solid #d8c3b5',
                            backgroundColor: '#fff1e9',
                            fontSize: '13px',
                            outline: 'none'
                          }}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Section 3: Inventory & Logistics */}
        <div
          style={{
            backgroundColor: '#fff8f5',
            border: '1px solid #d8c3b5',
            borderRadius: '8px',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
          }}
        >
          <h2 style={{ margin: 0, fontSize: '16px', fontWeight: '600', color: '#8c4f16', borderBottom: '1px solid #ede0d9', paddingBottom: '8px' }}>
            3. Inventory & Specifications
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#211a16', marginBottom: '6px' }}>
                Stock Available *
              </label>
              <input
                type="number"
                name="stock"
                placeholder="20"
                value={formData.stock}
                onChange={handleInputChange}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  borderRadius: '6px',
                  border: errors.stock ? '1px solid #ba1a1a' : '1px solid #d8c3b5',
                  backgroundColor: '#fff1e9',
                  fontSize: '13px',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
              {errors.stock && <span style={{ color: '#ba1a1a', fontSize: '12px', marginTop: '4px', display: 'block' }}>{errors.stock}</span>}
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#211a16', marginBottom: '6px' }}>
                Supplier SKU Code
              </label>
              <input
                type="text"
                name="sku"
                placeholder="e.g. FE-TRD-900"
                value={formData.sku}
                onChange={handleInputChange}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  borderRadius: '6px',
                  border: '1px solid #d8c3b5',
                  backgroundColor: '#fff1e9',
                  fontSize: '13px',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#211a16', marginBottom: '6px' }}>
                Low Stock Threshold
              </label>
              <input
                type="number"
                name="lowStockThreshold"
                value={formData.lowStockThreshold}
                onChange={handleInputChange}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  borderRadius: '6px',
                  border: '1px solid #d8c3b5',
                  backgroundColor: '#fff1e9',
                  fontSize: '13px',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#211a16', marginBottom: '6px' }}>
                Equipment Weight (kg)
              </label>
              <input
                type="text"
                name="weight"
                placeholder="e.g. 185 kg"
                value={formData.weight}
                onChange={handleInputChange}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  borderRadius: '6px',
                  border: '1px solid #d8c3b5',
                  backgroundColor: '#fff1e9',
                  fontSize: '13px',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#211a16', marginBottom: '6px' }}>
                Dimensions (L x W x H)
              </label>
              <input
                type="text"
                name="dimensions"
                placeholder="e.g. 2150 x 950 x 1600 mm"
                value={formData.dimensions}
                onChange={handleInputChange}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  borderRadius: '6px',
                  border: '1px solid #d8c3b5',
                  backgroundColor: '#fff1e9',
                  fontSize: '13px',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#211a16', marginBottom: '6px' }}>
                Availability Status
              </label>
              <select
                name="availability"
                value={formData.availability}
                onChange={handleInputChange}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  borderRadius: '6px',
                  border: '1px solid #d8c3b5',
                  backgroundColor: '#fff1e9',
                  fontSize: '13px',
                  outline: 'none',
                  boxSizing: 'border-box',
                  cursor: 'pointer'
                }}
              >
                <option value="In Stock">In Stock</option>
                <option value="Out of Stock">Out of Stock</option>
                <option value="Pre-order">Pre-order</option>
              </select>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', paddingBottom: '32px' }}>
          <button
            type="button"
            onClick={() => handleSubmit('Draft')}
            style={{
              padding: '10px 20px',
              backgroundColor: '#ede0d9',
              color: '#211a16',
              border: 'none',
              borderRadius: '6px',
              fontWeight: '600',
              fontSize: '13px',
              cursor: 'pointer'
            }}
          >
            Save as Draft
          </button>
          <button
            type="button"
            onClick={() => handleSubmit('Pending Approval')}
            style={{
              padding: '10px 24px',
              backgroundColor: '#8c4f16',
              color: '#ffffff',
              border: 'none',
              borderRadius: '6px',
              fontWeight: '600',
              fontSize: '13px',
              cursor: 'pointer'
            }}
          >
            Submit for Approval →
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct1;