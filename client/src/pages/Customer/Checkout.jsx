import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Checkout = () => {
  const navigate = useNavigate();

  // Form State
  const [formData, setFormData] = useState({
    businessName: 'Metro Fitness Private Limited',
    contactPerson: 'Rahul Sharma',
    email: 'procurement@metrofitness.in',
    phone: '+91 98201 23456',
    gstin: '27AABCU9603R1ZM',
    address: 'Plot 42, Sector 18, Phase 2, Industrial Area',
    city: 'Mumbai',
    state: 'Maharashtra',
    pincode: '400705',
    deliveryInstructions: 'Commercial loading bay accessible between 9 AM to 6 PM. Forklift available on site.',
    paymentMethod: 'online', // 'online' | 'bank_transfer' | 'credit'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Cart summary data for calculation
  const orderSummary = {
    items: [
      {
        name: 'Commercial Motorized Treadmill X9',
        qty: 2,
        price: 145000,
        supplier: 'FitPro Industrial Ltd',
      },
      {
        name: 'Olympic Heavy-Duty Flat Bench',
        qty: 2,
        price: 28500,
        supplier: 'IronGrip Manufacturing',
      },
      {
        name: 'Olympic Urethane Weight Plates Set (250kg)',
        qty: 1,
        price: 62000,
        supplier: 'IronGrip Manufacturing',
      },
    ],
    subtotal: 409000,
    gst: 73620, // 18% GST
    shipping: 0, // Free over ₹1,00,000
    total: 482620,
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate order placement process
    setTimeout(() => {
      setIsSubmitting(false);
      navigate('/customer/orders/ORD-9024');
    }, 1200);
  };

  return (
    <div style={{ padding: '24px', backgroundColor: '#fff8f5', minHeight: '100%', boxSizing: 'border-box' }}>
      {/* Header */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#79573d', marginBottom: '4px' }}>
          <Link to="/customer/cart" style={{ color: '#8c4f16', textDecoration: 'none', fontWeight: '600' }}>
            &larr; Back to Cart
          </Link>
          <span>/</span>
          <span style={{ fontWeight: '600', color: '#211a16' }}>B2B Checkout & Purchase Order</span>
        </div>
        <h1 style={{ margin: 0, fontSize: '24px', fontWeight: '700', color: '#211a16' }}>
          Finalize Procurement Order
        </h1>
        <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: '#79573d' }}>
          Provide delivery logistics and billing details for commercial tax invoicing.
        </p>
      </div>

      <form onSubmit={handlePlaceOrder}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px', alignItems: 'start' }}>
          {/* Left Column: Form Sections */}
          <div style={{ gridColumn: 'span 2', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Section 1: Business & GST Information */}
            <div
              style={{
                backgroundColor: '#ffffff',
                border: '1px solid #ede0d9',
                borderRadius: '16px',
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  borderBottom: '1px solid #ede0d9',
                  paddingBottom: '12px',
                }}
              >
                <h2 style={{ margin: 0, fontSize: '16px', fontWeight: '700', color: '#211a16', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span
                    style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      backgroundColor: '#8c4f16',
                      color: '#ffffff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '12px',
                      fontWeight: '700',
                    }}
                  >
                    1
                  </span>
                  <span>Business & GST Identification</span>
                </h2>
                <span
                  style={{
                    fontSize: '11px',
                    fontWeight: '600',
                    color: '#15803d',
                    backgroundColor: '#dcfce7',
                    padding: '2px 8px',
                    borderRadius: '4px',
                  }}
                >
                  ✓ Verified GST Profile
                </span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', fontSize: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontWeight: '600', marginBottom: '6px', color: '#534439' }}>
                    Registered Business / Gym Name *
                  </label>
                  <input
                    type="text"
                    name="businessName"
                    required
                    value={formData.businessName}
                    onChange={handleInputChange}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      borderRadius: '8px',
                      border: '1px solid #d8c3b5',
                      backgroundColor: '#fff1e9',
                      color: '#211a16',
                      outline: 'none',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontWeight: '600', marginBottom: '6px', color: '#534439' }}>
                    GST Identification Number (GSTIN) *
                  </label>
                  <input
                    type="text"
                    name="gstin"
                    required
                    value={formData.gstin}
                    onChange={handleInputChange}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      borderRadius: '8px',
                      border: '1px solid #d8c3b5',
                      backgroundColor: '#fff1e9',
                      color: '#211a16',
                      outline: 'none',
                      textTransform: 'uppercase',
                      fontFamily: 'monospace',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontWeight: '600', marginBottom: '6px', color: '#534439' }}>
                    Contact Person / Procurement Manager *
                  </label>
                  <input
                    type="text"
                    name="contactPerson"
                    required
                    value={formData.contactPerson}
                    onChange={handleInputChange}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      borderRadius: '8px',
                      border: '1px solid #d8c3b5',
                      backgroundColor: '#fff1e9',
                      color: '#211a16',
                      outline: 'none',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontWeight: '600', marginBottom: '6px', color: '#534439' }}>
                    Official Contact Phone *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      borderRadius: '8px',
                      border: '1px solid #d8c3b5',
                      backgroundColor: '#fff1e9',
                      color: '#211a16',
                      outline: 'none',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>

                <div style={{ gridColumn: 'span 2' }}>
                  <label style={{ display: 'block', fontWeight: '600', marginBottom: '6px', color: '#534439' }}>
                    Billing & Tax Invoice Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      borderRadius: '8px',
                      border: '1px solid #d8c3b5',
                      backgroundColor: '#fff1e9',
                      color: '#211a16',
                      outline: 'none',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Section 2: Delivery & Logistics */}
            <div
              style={{
                backgroundColor: '#ffffff',
                border: '1px solid #ede0d9',
                borderRadius: '16px',
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
              }}
            >
              <h2
                style={{
                  margin: 0,
                  fontSize: '16px',
                  fontWeight: '700',
                  color: '#211a16',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  borderBottom: '1px solid #ede0d9',
                  paddingBottom: '12px',
                }}
              >
                <span
                  style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    backgroundColor: '#8c4f16',
                    color: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '12px',
                    fontWeight: '700',
                  }}
                >
                  2
                </span>
                <span>Commercial Facility Delivery Address</span>
              </h2>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px', fontSize: '12px' }}>
                <div style={{ gridColumn: '1 / -1' }}>
                  <label style={{ display: 'block', fontWeight: '600', marginBottom: '6px', color: '#534439' }}>
                    Gym Facility / Warehouse Address *
                  </label>
                  <input
                    type="text"
                    name="address"
                    required
                    value={formData.address}
                    onChange={handleInputChange}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      borderRadius: '8px',
                      border: '1px solid #d8c3b5',
                      backgroundColor: '#fff1e9',
                      color: '#211a16',
                      outline: 'none',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontWeight: '600', marginBottom: '6px', color: '#534439' }}>
                    City *
                  </label>
                  <input
                    type="text"
                    name="city"
                    required
                    value={formData.city}
                    onChange={handleInputChange}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      borderRadius: '8px',
                      border: '1px solid #d8c3b5',
                      backgroundColor: '#fff1e9',
                      color: '#211a16',
                      outline: 'none',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontWeight: '600', marginBottom: '6px', color: '#534439' }}>
                    State *
                  </label>
                  <input
                    type="text"
                    name="state"
                    required
                    value={formData.state}
                    onChange={handleInputChange}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      borderRadius: '8px',
                      border: '1px solid #d8c3b5',
                      backgroundColor: '#fff1e9',
                      color: '#211a16',
                      outline: 'none',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontWeight: '600', marginBottom: '6px', color: '#534439' }}>
                    PIN Code *
                  </label>
                  <input
                    type="text"
                    name="pincode"
                    required
                    value={formData.pincode}
                    onChange={handleInputChange}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      borderRadius: '8px',
                      border: '1px solid #d8c3b5',
                      backgroundColor: '#fff1e9',
                      color: '#211a16',
                      outline: 'none',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>

                <div style={{ gridColumn: '1 / -1' }}>
                  <label style={{ display: 'block', fontWeight: '600', marginBottom: '6px', color: '#534439' }}>
                    Unloading & Freight Instructions (Optional)
                  </label>
                  <textarea
                    rows="2"
                    name="deliveryInstructions"
                    value={formData.deliveryInstructions}
                    onChange={handleInputChange}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      borderRadius: '8px',
                      border: '1px solid #d8c3b5',
                      backgroundColor: '#fff1e9',
                      color: '#211a16',
                      outline: 'none',
                      boxSizing: 'border-box',
                      fontFamily: 'inherit',
                      resize: 'vertical',
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Section 3: B2B Payment Options */}
            <div
              style={{
                backgroundColor: '#ffffff',
                border: '1px solid #ede0d9',
                borderRadius: '16px',
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
              }}
            >
              <h2
                style={{
                  margin: 0,
                  fontSize: '16px',
                  fontWeight: '700',
                  color: '#211a16',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  borderBottom: '1px solid #ede0d9',
                  paddingBottom: '12px',
                }}
              >
                <span
                  style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    backgroundColor: '#8c4f16',
                    color: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '12px',
                    fontWeight: '700',
                  }}
                >
                  3
                </span>
                <span>Payment Settlement Mode</span>
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {/* Option 1: Instant Online Gateway */}
                <label
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    padding: '16px',
                    borderRadius: '12px',
                    border: formData.paymentMethod === 'online' ? '1px solid #8c4f16' : '1px solid #ede0d9',
                    backgroundColor: formData.paymentMethod === 'online' ? '#fff1e9' : '#ffffff',
                    cursor: 'pointer',
                    transition: '0.2s ease',
                  }}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="online"
                    checked={formData.paymentMethod === 'online'}
                    onChange={handleInputChange}
                    style={{ marginTop: '3px', accentColor: '#8c4f16' }}
                  />
                  <div style={{ marginLeft: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '13px', fontWeight: '700', color: '#211a16' }}>
                        Online Payment (NetBanking / UPI / Corporate Cards)
                      </span>
                      <span style={{ fontSize: '10px', fontWeight: '700', color: '#15803d', backgroundColor: '#dcfce7', padding: '2px 6px', borderRadius: '4px' }}>
                        Fastest Dispatch
                      </span>
                    </div>
                    <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: '#79573d' }}>
                      Secure checkout gateway (Razorpay API integration ready).
                    </p>
                  </div>
                </label>

                {/* Option 2: RTGS / NEFT Direct Bank Transfer */}
                <label
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    padding: '16px',
                    borderRadius: '12px',
                    border: formData.paymentMethod === 'bank_transfer' ? '1px solid #8c4f16' : '1px solid #ede0d9',
                    backgroundColor: formData.paymentMethod === 'bank_transfer' ? '#fff1e9' : '#ffffff',
                    cursor: 'pointer',
                    transition: '0.2s ease',
                  }}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="bank_transfer"
                    checked={formData.paymentMethod === 'bank_transfer'}
                    onChange={handleInputChange}
                    style={{ marginTop: '3px', accentColor: '#8c4f16' }}
                  />
                  <div style={{ marginLeft: '12px' }}>
                    <span style={{ fontSize: '13px', fontWeight: '700', color: '#211a16' }}>
                      Direct Bank Transfer / RTGS / NEFT
                    </span>
                    <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: '#79573d' }}>
                      Generate a formal proforma invoice. Dispatch begins upon bank remittance confirmation.
                    </p>
                  </div>
                </label>

                {/* Option 3: B2B Credit Line */}
                <label
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    padding: '16px',
                    borderRadius: '12px',
                    border: formData.paymentMethod === 'credit' ? '1px solid #8c4f16' : '1px solid #ede0d9',
                    backgroundColor: formData.paymentMethod === 'credit' ? '#fff1e9' : '#ffffff',
                    cursor: 'pointer',
                    transition: '0.2s ease',
                  }}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="credit"
                    checked={formData.paymentMethod === 'credit'}
                    onChange={handleInputChange}
                    style={{ marginTop: '3px', accentColor: '#8c4f16' }}
                  />
                  <div style={{ marginLeft: '12px' }}>
                    <span style={{ fontSize: '13px', fontWeight: '700', color: '#211a16' }}>
                      GymHub Net-30 Trade Credit
                    </span>
                    <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: '#79573d' }}>
                      Available for verified gym chain accounts with active trade facilities.
                    </p>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Right Column: Order Summary & Confirmation Button */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div
              style={{
                backgroundColor: '#ffffff',
                border: '1px solid #ede0d9',
                borderRadius: '16px',
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
                position: 'sticky',
                top: '84px',
              }}
            >
              <h2 style={{ margin: 0, fontSize: '16px', fontWeight: '700', color: '#211a16' }}>
                Purchase Order Summary
              </h2>

              {/* Items Mini List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '200px', overflowY: 'auto', paddingRight: '4px' }}>
                {orderSummary.items.map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', fontSize: '12px', borderBottom: '1px solid #ede0d9', paddingBottom: '8px' }}>
                    <div style={{ maxWidth: '70%' }}>
                      <p style={{ margin: 0, fontWeight: '600', color: '#211a16', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {item.name}
                      </p>
                      <p style={{ margin: '2px 0 0 0', fontSize: '11px', color: '#79573d' }}>
                        Qty: {item.qty} &bull; {item.supplier}
                      </p>
                    </div>
                    <span style={{ fontWeight: '700', color: '#211a16' }}>
                      ₹{(item.price * item.qty).toLocaleString('en-IN')}
                    </span>
                  </div>
                ))}
              </div>

              {/* Pricing breakdown */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12px', color: '#534439' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Subtotal (3 items)</span>
                  <span style={{ fontWeight: '600', color: '#211a16' }}>₹{orderSummary.subtotal.toLocaleString('en-IN')}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>GST (18% B2B)</span>
                  <span style={{ fontWeight: '600', color: '#211a16' }}>₹{orderSummary.gst.toLocaleString('en-IN')}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Commercial Freight</span>
                  <span style={{ fontWeight: '600', color: '#15803d' }}>FREE</span>
                </div>
              </div>

              {/* Total */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', paddingTop: '10px', borderTop: '1px solid #ede0d9' }}>
                <span style={{ fontSize: '13px', fontWeight: '700', color: '#211a16' }}>Total Order Value</span>
                <span style={{ fontSize: '20px', fontWeight: '800', color: '#8c4f16' }}>
                  ₹{orderSummary.total.toLocaleString('en-IN')}
                </span>
              </div>

              {/* Place Order CTA Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '10px',
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#ffffff',
                  backgroundColor: '#8c4f16',
                  border: 'none',
                  cursor: isSubmitting ? 'not-allowed' : 'pointer',
                  boxShadow: '0 2px 8px rgba(140, 79, 22, 0.2)',
                  opacity: isSubmitting ? 0.7 : 1,
                  transition: 'opacity 0.2s ease',
                }}
              >
                {isSubmitting ? 'Generating Purchase Order...' : 'Confirm & Place Order →'}
              </button>

              <p style={{ margin: 0, fontSize: '10px', textAlign: 'center', color: '#857468', lineHeight: '1.3' }}>
                By clicking Confirm, you authorize GymHub to generate a binding B2B sales invoice for your GSTIN.
              </p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Checkout;