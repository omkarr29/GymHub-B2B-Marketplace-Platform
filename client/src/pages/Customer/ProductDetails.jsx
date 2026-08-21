import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext.jsx';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  // Local interaction states
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('specs'); // 'specs' | 'wholesale' | 'supplier'
  const [toastMessage, setToastMessage] = useState(null);

  // Realistic B2B Product Database with comprehensive specs
  const productsDatabase = {
    'prod-1': {
      id: 'prod-1',
      name: 'Commercial Motorized Treadmill X9 Heavy-Duty',
      category: 'Cardio Equipment',
      supplier: 'FitPro Industrial Ltd',
      supplierRating: '4.9 ★ (120+ Gym Orders)',
      supplierLocation: 'Pune, Maharashtra',
      gstRegistered: true,
      price: 145000,
      mrp: 185000,
      stock: 'In Stock (15 Units available)',
      minOrderQty: 1,
      rating: 4.8,
      reviewsCount: 34,
      image: 'https://images.unsplash.com/photo-1576678927484-cc907957088c?w=800&auto=format&fit=crop&q=80',
      description:
        'Engineered for 16+ hours of daily continuous commercial gym use. Features an AC 5.0 HP peak commercial motor, self-lubricating belt technology, and built-in pulse sensor consoles with telemetry receiver.',
      specifications: [
        { label: 'Motor Rating', value: '4.0 HP Continuous / 6.0 HP Peak AC Motor' },
        { label: 'Speed Range', value: '1.0 – 22.0 km/h' },
        { label: 'Incline Range', value: '0% – 18% Auto Commercial Incline' },
        { label: 'Running Surface', value: '60 x 22 inches (Multi-ply Anti-static belt)' },
        { label: 'Max User Weight', value: '200 kg' },
        { label: 'Warranty', value: '5 Years Frame, 3 Years Motor Commercial Warranty' },
      ],
      wholesaleTiers: [
        { units: '1 - 2 Units', pricePerUnit: '₹1,45,000' },
        { units: '3 - 5 Units', pricePerUnit: '₹1,38,000 (Save 5%)' },
        { units: '6+ Units (Bulk Setup)', pricePerUnit: '₹1,29,000 (Save 11%)' },
      ],
    },
    'prod-2': {
      id: 'prod-2',
      name: 'Olympic Heavy-Duty Flat Bench',
      category: 'Strength Equipment',
      supplier: 'IronGrip Manufacturing',
      supplierRating: '4.9 ★ (280+ Gym Orders)',
      supplierLocation: 'Jalandhar, Punjab',
      gstRegistered: true,
      price: 28500,
      mrp: 36000,
      stock: 'In Stock (40 Units)',
      minOrderQty: 2,
      rating: 4.9,
      reviewsCount: 68,
      image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&auto=format&fit=crop&q=80',
      description:
        'Fabricated from 11-gauge 3x3 inch structural steel tubing. Triple-stitched high-density foam padding provides maximum back stability during heavy powerlifting and commercial bench sessions.',
      specifications: [
        { label: 'Steel Gauge', value: '11-Gauge (3mm) Structural Steel' },
        { label: 'Pad Thickness', value: '3.5 inches High Density Composite Foam' },
        { label: 'Weight Capacity', value: '550 kg Total Load Tested' },
        { label: 'Finish', value: 'Matte Powder Coated Anti-Scratch Finish' },
        { label: 'Warranty', value: '10 Years Frame Warranty' },
      ],
      wholesaleTiers: [
        { units: '2 - 5 Units', pricePerUnit: '₹28,500' },
        { units: '6 - 10 Units', pricePerUnit: '₹26,000' },
        { units: '10+ Units', pricePerUnit: '₹24,200' },
      ],
    },
  };

  // Fallback for demo navigation
  const product = productsDatabase[id] || productsDatabase['prod-1'];

  const showNotification = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
    showNotification(`Added ${quantity} unit(s) of "${product.name}" to cart.`);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    navigate('/customer/checkout');
  };

  return (
    <div style={{ padding: '24px', backgroundColor: '#fff8f5', minHeight: '100%', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Toast Feedback */}
      {toastMessage && (
        <div
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            zIndex: 100,
            padding: '12px 20px',
            borderRadius: '8px',
            backgroundColor: '#00687a',
            color: '#ffffff',
            fontSize: '13px',
            fontWeight: '600',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <span>✓</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Breadcrumb Navigation */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#79573d' }}>
        <Link to="/customer" style={{ color: '#8c4f16', textDecoration: 'none', fontWeight: '500' }}>Dashboard</Link>
        <span>/</span>
        <Link to="/customer/products" style={{ color: '#8c4f16', textDecoration: 'none', fontWeight: '500' }}>Products</Link>
        <span>/</span>
        <span style={{ fontWeight: '600', color: '#211a16', maxWidth: '300px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {product.name}
        </span>
      </div>

      {/* Main Top Section: Image & Procurement Overview */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '32px',
          padding: '28px',
          borderRadius: '16px',
          border: '1px solid #ede0d9',
          backgroundColor: '#ffffff',
          alignItems: 'start',
        }}
      >
        {/* Left: Product Image */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div
            style={{
              borderRadius: '12px',
              overflow: 'hidden',
              border: '1px solid #ede0d9',
              backgroundColor: '#ede0d9',
              height: '320px',
            }}
          >
            <img
              src={product.image}
              alt={product.name}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontSize: '12px',
              padding: '12px',
              borderRadius: '8px',
              backgroundColor: '#fff1e9',
              color: '#534439',
              fontWeight: '500',
            }}
          >
            <span>✓ 100% Commercial Grade</span>
            <span>✓ Direct Factory Dispatch</span>
            <span>✓ GST Invoice Included</span>
          </div>
        </div>

        {/* Right: Purchasing & Quotation Details */}
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '20px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span
                style={{
                  padding: '4px 10px',
                  borderRadius: '9999px',
                  fontSize: '11px',
                  fontWeight: '700',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  backgroundColor: '#fed1b0',
                  color: '#79573d',
                }}
              >
                {product.category}
              </span>
              <span style={{ fontSize: '12px', fontWeight: '600', color: '#00687a' }}>
                ★ {product.rating} ({product.reviewsCount} verified reviews)
              </span>
            </div>

            <h1 style={{ margin: 0, fontSize: '22px', fontWeight: '700', color: '#211a16', lineHeight: '1.3' }}>
              {product.name}
            </h1>

            <p style={{ margin: 0, fontSize: '13px', color: '#534439', lineHeight: '1.6' }}>
              {product.description}
            </p>

            {/* Supplier Quick Card */}
            <div
              style={{
                padding: '12px 14px',
                borderRadius: '8px',
                border: '1px solid #d8c3b5',
                backgroundColor: '#fff8f5',
                display: 'flex',
                flexDirection: 'column',
                gap: '4px',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px' }}>
                <span style={{ fontWeight: '700', color: '#211a16' }}>Supplier: {product.supplier}</span>
                <span style={{ color: '#15803d', fontWeight: '600', fontSize: '11px' }}>● GST Verified</span>
              </div>
              <p style={{ margin: 0, fontSize: '11px', color: '#79573d' }}>
                {product.supplierLocation} &bull; {product.supplierRating}
              </p>
            </div>

            {/* Pricing Section */}
            <div
              style={{
                padding: '16px',
                borderRadius: '12px',
                backgroundColor: '#fff1e9',
                display: 'flex',
                flexDirection: 'column',
                gap: '6px',
              }}
            >
              <span style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', color: '#79573d' }}>
                Wholesale B2B Rate (Excl. GST)
              </span>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px' }}>
                <span style={{ fontSize: '24px', fontWeight: '800', color: '#8c4f16' }}>
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
                <span style={{ fontSize: '13px', textDecoration: 'line-through', color: '#857468' }}>
                  MRP ₹{product.mrp.toLocaleString('en-IN')}
                </span>
                <span style={{ fontSize: '12px', fontWeight: '700', color: '#15803d' }}>
                  Save ₹{(product.mrp - product.price).toLocaleString('en-IN')}
                </span>
              </div>
              <p style={{ margin: '4px 0 0 0', fontSize: '11px', color: '#79573d' }}>
                Stock Status: <strong style={{ color: '#15803d' }}>{product.stock}</strong> &bull; MOQ: {product.minOrderQty} Unit(s)
              </p>
            </div>
          </div>

          {/* Quantity and Order Action Buttons */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', paddingTop: '16px', borderTop: '1px solid #ede0d9' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <span style={{ fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', color: '#534439' }}>
                Quantity:
              </span>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  border: '1px solid #d8c3b5',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  backgroundColor: '#ffffff',
                }}
              >
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(product.minOrderQty, quantity - 1))}
                  style={{
                    border: 'none',
                    background: 'none',
                    padding: '6px 12px',
                    cursor: 'pointer',
                    fontWeight: '700',
                    color: '#8c4f16',
                    fontSize: '14px',
                  }}
                >
                  -
                </button>
                <span style={{ padding: '6px 12px', fontSize: '13px', fontWeight: '600', color: '#211a16' }}>
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  style={{
                    border: 'none',
                    background: 'none',
                    padding: '6px 12px',
                    cursor: 'pointer',
                    fontWeight: '700',
                    color: '#8c4f16',
                    fontSize: '14px',
                  }}
                >
                  +
                </button>
              </div>
              <span style={{ fontSize: '12px', color: '#79573d' }}>
                Subtotal: <strong>₹{(product.price * quantity).toLocaleString('en-IN')}</strong>
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <button
                type="button"
                onClick={handleAddToCart}
                style={{
                  padding: '12px',
                  borderRadius: '10px',
                  fontSize: '13px',
                  fontWeight: '600',
                  backgroundColor: '#fff1e9',
                  border: '1px solid #8c4f16',
                  color: '#8c4f16',
                  cursor: 'pointer',
                }}
              >
                Add to Cart
              </button>

              <button
                type="button"
                onClick={handleBuyNow}
                style={{
                  padding: '12px',
                  borderRadius: '10px',
                  fontSize: '13px',
                  fontWeight: '600',
                  backgroundColor: '#8c4f16',
                  color: '#ffffff',
                  border: 'none',
                  cursor: 'pointer',
                  boxShadow: '0 2px 8px rgba(140, 79, 22, 0.2)',
                }}
              >
                Proceed to Checkout &rarr;
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Section: Technical Specifications, Wholesale Tiers, Supplier Info */}
      <div
        style={{
          padding: '24px',
          borderRadius: '16px',
          border: '1px solid #ede0d9',
          backgroundColor: '#ffffff',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
        }}
      >
        <div style={{ display: 'flex', gap: '20px', borderBottom: '1px solid #ede0d9', fontSize: '13px', fontWeight: '600' }}>
          <button
            type="button"
            onClick={() => setActiveTab('specs')}
            style={{
              background: 'none',
              border: 'none',
              paddingBottom: '10px',
              borderBottom: activeTab === 'specs' ? '2px solid #8c4f16' : '2px solid transparent',
              color: activeTab === 'specs' ? '#8c4f16' : '#79573d',
              cursor: 'pointer',
              fontWeight: activeTab === 'specs' ? '700' : '500',
            }}
          >
            Technical Specifications
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('wholesale')}
            style={{
              background: 'none',
              border: 'none',
              paddingBottom: '10px',
              borderBottom: activeTab === 'wholesale' ? '2px solid #8c4f16' : '2px solid transparent',
              color: activeTab === 'wholesale' ? '#8c4f16' : '#79573d',
              cursor: 'pointer',
              fontWeight: activeTab === 'wholesale' ? '700' : '500',
            }}
          >
            Bulk Wholesale Tiers
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('supplier')}
            style={{
              background: 'none',
              border: 'none',
              paddingBottom: '10px',
              borderBottom: activeTab === 'supplier' ? '2px solid #8c4f16' : '2px solid transparent',
              color: activeTab === 'supplier' ? '#8c4f16' : '#79573d',
              cursor: 'pointer',
              fontWeight: activeTab === 'supplier' ? '700' : '500',
            }}
          >
            Manufacturer Details
          </button>
        </div>

        {/* Tab 1: Technical Specs */}
        {activeTab === 'specs' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '12px' }}>
            {product.specifications.map((spec, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '10px 14px',
                  borderRadius: '8px',
                  border: '1px solid #ede0d9',
                  backgroundColor: '#fff8f5',
                  fontSize: '12px',
                }}
              >
                <span style={{ fontWeight: '600', color: '#79573d' }}>
                  {spec.label}
                </span>
                <span style={{ fontWeight: '500', color: '#211a16', textAlign: 'right' }}>
                  {spec.value}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Tab 2: Wholesale Tiers */}
        {activeTab === 'wholesale' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '520px' }}>
            <p style={{ margin: 0, fontSize: '12px', color: '#79573d' }}>
              GymHub commercial discounts apply automatically based on order quantity:
            </p>
            <div style={{ border: '1px solid #ede0d9', borderRadius: '10px', overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '12px' }}>
                <thead>
                  <tr style={{ backgroundColor: '#fff1e9', color: '#534439' }}>
                    <th style={{ padding: '10px 14px', fontWeight: '600' }}>Order Quantity</th>
                    <th style={{ padding: '10px 14px', fontWeight: '600' }}>Rate Per Unit</th>
                  </tr>
                </thead>
                <tbody>
                  {product.wholesaleTiers.map((tier, idx) => (
                    <tr
                      key={idx}
                      style={{
                        borderTop: '1px solid #ede0d9',
                        backgroundColor: '#ffffff',
                      }}
                    >
                      <td style={{ padding: '10px 14px', fontWeight: '600', color: '#211a16' }}>{tier.units}</td>
                      <td style={{ padding: '10px 14px', fontWeight: '700', color: '#8c4f16' }}>{tier.pricePerUnit}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 3: Supplier Info */}
        {activeTab === 'supplier' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '560px', fontSize: '13px' }}>
            <h3 style={{ margin: 0, fontSize: '15px', fontWeight: '700', color: '#211a16' }}>{product.supplier}</h3>
            <p style={{ margin: 0, color: '#534439', lineHeight: '1.5' }}>
              Certified ISO-9001 gym equipment manufacturer offering turnkey gym setup solutions, customized frame branding, and on-site maintenance contracts across India.
            </p>
            <div
              style={{
                padding: '12px',
                borderRadius: '8px',
                backgroundColor: '#fff1e9',
                color: '#79573d',
                fontSize: '12px',
                display: 'flex',
                flexDirection: 'column',
                gap: '4px',
              }}
            >
              <p style={{ margin: 0 }}>📍 Factory & Warehouse: {product.supplierLocation}</p>
              <p style={{ margin: 0 }}>⏱ Typical Dispatch Time: 2–4 Business Days</p>
              <p style={{ margin: 0 }}>🛡 Service Support: Dedicated Engineer On-Call</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;