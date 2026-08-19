import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

const EditProduct = () => {
  const { id } = useParams();
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

  // Dummy catalog to simulate finding the product by ID
  const existingProductsMock = {
    'PRD-101': {
      name: 'Commercial Motorized Treadmill T-900',
      category: 'Cardio Equipment',
      brand: 'FitEquip Pro',
      description: 'Heavy-duty 5HP AC motor commercial treadmill with automatic incline and interactive touch console.',
      price: '125000',
      discountPrice: '119000',
      moq: '2',
      stock: '14',
      sku: 'FE-TRD-900',
      lowStockThreshold: '5',
      weight: '185 kg',
      dimensions: '2150 x 950 x 1600 mm',
      warranty: '3 Years Frame & Motor Warranty',
      availability: 'In Stock',
      status: 'Active',
      bulkPricing: [
        { minQty: '1', maxQty: '4', pricePerUnit: '125000' },
        { minQty: '5', maxQty: '9', pricePerUnit: '118000' },
        { minQty: '10+', maxQty: '', pricePerUnit: '112000' }
      ]
    },
    'PRD-102': {
      name: 'Dual Cable Cross Over Machine',
      category: 'Strength Equipment',
      brand: 'Titan Series',
      description: 'Multi-adjustable dual pulley station with high tensile aircraft-grade steel cables.',
      price: '98000',
      discountPrice: '95000',
      moq: '1',
      stock: '6',
      sku: 'FE-STR-102',
      lowStockThreshold: '3',
      weight: '320 kg',
      dimensions: '1900 x 1100 x 2200 mm',
      warranty: '2 Years Commercial Warranty',
      availability: 'In Stock',
      status: 'Pending Approval',
      bulkPricing: [
        { minQty: '1', maxQty: '2', pricePerUnit: '98000' },
        { minQty: '3', maxQty: '5', pricePerUnit: '92000' },
        { minQty: '6+', maxQty: '', pricePerUnit: '88000' }
      ]
    }
  };

  const [formData, setFormData] = useState({
    name: '',
    category: 'Cardio Equipment',
    brand: '',
    description: '',
    price: '',
    discountPrice: '',
    moq: '1',
    stock: '',
    sku: '',
    lowStockThreshold: '5',
    weight: '',
    dimensions: '',
    warranty: '',
    availability: 'In Stock',
    status: 'Active'
  });

  const [bulkPricing, setBulkPricing] = useState([
    { minQty: '1', maxQty: '4', pricePerUnit: '' },
    { minQty: '5', maxQty: '9', pricePerUnit: '' },
    { minQty: '10+', maxQty: '', pricePerUnit: '' }
  ]);

  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Populate form if matching mock product found
    const target = existingProductsMock[id] || {
      name: 'Commercial Gym Product #' + (id || '101'),
      category: 'Strength Equipment',
      brand: 'FitEquip Pro',
      description: 'Standard heavy-duty commercial equipment listing.',
      price: '85000',
      discountPrice: '80000',
      moq: '2',
      stock: '10',
      sku: 'FE-GEN-' + (id || '101'),
      lowStockThreshold: '4',
      weight: '120 kg',
      dimensions: '1500 x 800 x 1400 mm',
      warranty: '2 Years Warranty',
      availability: 'In Stock',
      status: 'Active',
      bulkPricing: [
        { minQty: '1', maxQty: '4', pricePerUnit: '85000' },
        { minQty: '5', maxQty: '9', pricePerUnit: '80000' },
        { minQty: '10+', maxQty: '', pricePerUnit: '75000' }
      ]
    };

    setFormData(target);
    if (target.bulkPricing) {
      setBulkPricing(target.bulkPricing);
    }
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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

    if (Number(formData.moq) > Number(formData.stock) && Number(formData.stock) > 0) {
      errs.moq = 'MOQ cannot be greater than available stock.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    alert(`Product "${formData.name}" (ID: ${id}) updated successfully!`);
    navigate('/supplier/products');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '900px', margin: '0 auto' }}>
      {/* Page Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <h1 style={{ margin: 0, fontSize: '24px', fontWeight: '600', color: '#211a16' }}>
              Edit Product Listing
            </h1>
            <span
              style={{
                padding: '3px 8px',
                backgroundColor: '#fff1e9',
                border: '1px solid #d8c3b5',
                borderRadius: '4px',
                fontSize: '12px',
                fontWeight: '600',
                color: '#8c4f16'
              }}
            >
              ID: {id || 'PRD-101'}
            </span>
          </div>
          <p style={{ margin: '4px 0 0', fontSize: '14px', color: '#534439' }}>
            Modify equipment specifications, adjust stock levels, and revise wholesale bulk tiers.
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

      <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {/* Section 1: Basic Info */}
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
                Brand / Series
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

        {/* Section 2: Pricing & Bulk Wholesale */}
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
            2. Pricing & B2B Rules
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#211a16', marginBottom: '6px' }}>
                Unit Base Price (₹) *
              </label>
              <input
                type="number"
                name="price"
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
                Discount Price (₹)
              </label>
              <input
                type="number"
                name="discountPrice"
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

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#211a16', marginBottom: '6px' }}>
                Minimum Order Qty (MOQ) *
              </label>
              <input
                type="number"
                name="moq"
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

          <div style={{ marginTop: '8px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#211a16', marginBottom: '8px' }}>
              Tiered Wholesale Bulk Pricing Matrix
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

        {/* Section 3: Stock & Inventory */}
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
            3. Stock & Status Management
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#211a16', marginBottom: '6px' }}>
                Stock Available *
              </label>
              <input
                type="number"
                name="stock"
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
                SKU Code
              </label>
              <input
                type="text"
                name="sku"
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

        {/* Buttons */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', paddingBottom: '32px' }}>
          <button
            type="button"
            onClick={() => navigate('/supplier/products')}
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
            Cancel
          </button>
          <button
            type="submit"
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
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProduct;