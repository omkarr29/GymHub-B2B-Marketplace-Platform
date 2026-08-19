import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// Reusable Form Input Sub-component
const FormInput = ({ label, name, type = 'text', required, value, onChange, style, ...props }) => (
  <div style={style}>
    <label style={styles.inputLabel}>{label}</label>
    <input
      type={type}
      name={name}
      required={required}
      value={value}
      onChange={onChange}
      style={styles.textInput}
      {...props}
    />
  </div>
);

// Reusable Payment Method Radio Sub-component
const PaymentOption = ({ id, value, title, description, badge, checked, onChange }) => (
  <label
    style={{
      ...styles.paymentOptionLabel,
      borderColor: checked ? '#8c4f16' : '#ede0d9',
      backgroundColor: checked ? '#fff1e9' : '#ffffff',
    }}
  >
    <input
      type="radio"
      name="paymentMethod"
      value={id}
      checked={checked}
      onChange={onChange}
      style={styles.radioInput}
    />
    <div style={styles.paymentContent}>
      <div style={styles.paymentHeaderRow}>
        <span style={styles.paymentTitle}>{title}</span>
        {badge && <span style={styles.paymentBadge}>{badge}</span>}
      </div>
      <p style={styles.paymentDesc}>{description}</p>
    </div>
  </label>
);

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
    <div style={styles.pageContainer}>
      {/* Header */}
      <div style={styles.headerContainer}>
        <div style={styles.breadcrumb}>
          <Link to="/customer/cart" style={styles.breadcrumbLink}>
            &larr; Back to Cart
          </Link>
          <span>/</span>
          <span style={styles.breadcrumbCurrent}>B2B Checkout & Purchase Order</span>
        </div>
        <h1 style={styles.mainTitle}>Finalize Procurement Order</h1>
        <p style={styles.subtitle}>
          Provide delivery logistics and billing details for commercial tax invoicing.
        </p>
      </div>

      <form onSubmit={handlePlaceOrder}>
        <div style={styles.gridContainer}>
          {/* Left Column: Form Sections */}
          <div style={styles.leftColumn}>
            
            {/* Section 1: Business & GST Information */}
            <div style={styles.card}>
              <div style={styles.sectionHeader}>
                <h2 style={styles.sectionTitle}>
                  <span style={styles.stepBadge}>1</span>
                  <span>Business & GST Identification</span>
                </h2>
                <span style={styles.verifiedBadge}>✓ Verified GST Profile</span>
              </div>

              <div style={styles.formGridTwoCols}>
                <FormInput
                  label="Registered Business / Gym Name *"
                  name="businessName"
                  required
                  value={formData.businessName}
                  onChange={handleInputChange}
                />
                <FormInput
                  label="GST Identification Number (GSTIN) *"
                  name="gstin"
                  required
                  value={formData.gstin}
                  onChange={handleInputChange}
                  style={{ textTransform: 'uppercase', fontFamily: 'monospace' }}
                />
                <FormInput
                  label="Contact Person / Procurement Manager *"
                  name="contactPerson"
                  required
                  value={formData.contactPerson}
                  onChange={handleInputChange}
                />
                <FormInput
                  label="Official Contact Phone *"
                  name="phone"
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={handleInputChange}
                />
                <div style={{ gridColumn: 'span 2' }}>
                  <FormInput
                    label="Billing & Tax Invoice Email *"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>

            {/* Section 2: Delivery & Logistics */}
            <div style={styles.card}>
              <h2 style={{ ...styles.sectionHeader, borderBottom: '1px solid #ede0d9', paddingBottom: '12px', margin: 0 }}>
                <span style={styles.sectionTitle}>
                  <span style={styles.stepBadge}>2</span>
                  <span>Commercial Facility Delivery Address</span>
                </span>
              </h2>

              <div style={styles.formGridLogistics}>
                <div style={{ gridColumn: '1 / -1' }}>
                  <FormInput
                    label="Gym Facility / Warehouse Address *"
                    name="address"
                    required
                    value={formData.address}
                    onChange={handleInputChange}
                  />
                </div>
                <FormInput
                  label="City *"
                  name="city"
                  required
                  value={formData.city}
                  onChange={handleInputChange}
                />
                <FormInput
                  label="State *"
                  name="state"
                  required
                  value={formData.state}
                  onChange={handleInputChange}
                />
                <FormInput
                  label="PIN Code *"
                  name="pincode"
                  required
                  value={formData.pincode}
                  onChange={handleInputChange}
                />

                <div style={{ gridColumn: '1 / -1' }}>
                  <label style={styles.inputLabel}>Unloading & Freight Instructions (Optional)</label>
                  <textarea
                    rows="2"
                    name="deliveryInstructions"
                    value={formData.deliveryInstructions}
                    onChange={handleInputChange}
                    style={styles.textareaInput}
                  />
                </div>
              </div>
            </div>

            {/* Section 3: B2B Payment Options */}
            <div style={styles.card}>
              <h2 style={{ ...styles.sectionHeader, borderBottom: '1px solid #ede0d9', paddingBottom: '12px', margin: 0 }}>
                <span style={styles.sectionTitle}>
                  <span style={styles.stepBadge}>3</span>
                  <span>Payment Settlement Mode</span>
                </span>
              </h2>

              <div style={styles.paymentStack}>
                <PaymentOption
                  id="online"
                  title="Online Payment (NetBanking / UPI / Corporate Cards)"
                  description="Secure checkout gateway (Razorpay API integration ready)."
                  badge="Fastest Dispatch"
                  checked={formData.paymentMethod === 'online'}
                  onChange={handleInputChange}
                />
                <PaymentOption
                  id="bank_transfer"
                  title="Direct Bank Transfer / RTGS / NEFT"
                  description="Generate a formal proforma invoice. Dispatch begins upon bank remittance confirmation."
                  checked={formData.paymentMethod === 'bank_transfer'}
                  onChange={handleInputChange}
                />
                <PaymentOption
                  id="credit"
                  title="GymHub Net-30 Trade Credit"
                  description="Available for verified gym chain accounts with active trade facilities."
                  checked={formData.paymentMethod === 'credit'}
                  onChange={handleInputChange}
                />
              </div>
            </div>

          </div>

          {/* Right Column: Order Summary & Confirmation Button */}
          <div style={styles.rightColumn}>
            <div style={styles.stickySummaryCard}>
              <h2 style={styles.summaryTitle}>Purchase Order Summary</h2>

              {/* Items Mini List */}
              <div style={styles.miniListContainer}>
                {orderSummary.items.map((item, idx) => (
                  <div key={idx} style={styles.miniListItem}>
                    <div style={styles.miniItemInfo}>
                      <p style={styles.miniItemName}>{item.name}</p>
                      <p style={styles.miniItemMeta}>
                        Qty: {item.qty} &bull; {item.supplier}
                      </p>
                    </div>
                    <span style={styles.miniItemPrice}>
                      ₹{(item.price * item.qty).toLocaleString('en-IN')}
                    </span>
                  </div>
                ))}
              </div>

              {/* Pricing breakdown */}
              <div style={styles.costBreakdown}>
                <div style={styles.costRow}>
                  <span>Subtotal (3 items)</span>
                  <span style={styles.costValueDark}>₹{orderSummary.subtotal.toLocaleString('en-IN')}</span>
                </div>
                <div style={styles.costRow}>
                  <span>GST (18% B2B)</span>
                  <span style={styles.costValueDark}>₹{orderSummary.gst.toLocaleString('en-IN')}</span>
                </div>
                <div style={styles.costRow}>
                  <span>Commercial Freight</span>
                  <span style={styles.freeText}>FREE</span>
                </div>
              </div>

              {/* Total */}
              <div style={styles.grandTotalContainer}>
                <span style={styles.grandTotalLabel}>Total Order Value</span>
                <span style={styles.grandTotalValue}>
                  ₹{orderSummary.total.toLocaleString('en-IN')}
                </span>
              </div>

              {/* Place Order CTA Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                style={{
                  ...styles.submitButton,
                  cursor: isSubmitting ? 'not-allowed' : 'pointer',
                  opacity: isSubmitting ? 0.7 : 1,
                }}
              >
                {isSubmitting ? 'Generating Purchase Order...' : 'Confirm & Place Order →'}
              </button>

              <p style={styles.securityNotice}>
                By clicking Confirm, you authorize GymHub to generate a binding B2B sales invoice for your GSTIN.
              </p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

// ==========================================
// STYLES OBJECT
// ==========================================
const styles = {
  pageContainer: {
    padding: '24px',
    backgroundColor: '#fff8f5',
    minHeight: '100%',
    boxSizing: 'border-box',
  },
  headerContainer: {
    marginBottom: '24px',
  },
  breadcrumb: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '13px',
    color: '#79573d',
    marginBottom: '4px',
  },
  breadcrumbLink: {
    color: '#8c4f16',
    textDecoration: 'none',
    fontWeight: '600',
  },
  breadcrumbCurrent: {
    fontWeight: '600',
    color: '#211a16',
  },
  mainTitle: {
    margin: 0,
    fontSize: '24px',
    fontWeight: '700',
    color: '#211a16',
  },
  subtitle: {
    margin: '4px 0 0 0',
    fontSize: '13px',
    color: '#79573d',
  },
  gridContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
    gap: '24px',
    alignItems: 'start',
  },
  leftColumn: {
    gridColumn: 'span 2',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  card: {
    backgroundColor: '#ffffff',
    border: '1px solid #ede0d9',
    borderRadius: '16px',
    padding: '24px',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  sectionHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottom: '1px solid #ede0d9',
    paddingBottom: '12px',
  },
  sectionTitle: {
    margin: 0,
    fontSize: '16px',
    fontWeight: '700',
    color: '#211a16',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  stepBadge: {
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
    flexShrink: 0,
  },
  verifiedBadge: {
    fontSize: '11px',
    fontWeight: '600',
    color: '#15803d',
    backgroundColor: '#dcfce7',
    padding: '2px 8px',
    borderRadius: '4px',
  },
  formGridTwoCols: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: '16px',
    fontSize: '12px',
  },
  formGridLogistics: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
    gap: '16px',
    fontSize: '12px',
  },
  inputLabel: {
    display: 'block',
    fontWeight: '600',
    marginBottom: '6px',
    color: '#534439',
  },
  textInput: {
    width: '100%',
    padding: '10px 12px',
    borderRadius: '8px',
    border: '1px solid #d8c3b5',
    backgroundColor: '#fff1e9',
    color: '#211a16',
    outline: 'none',
    boxSizing: 'border-box',
  },
  textareaInput: {
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
  },
  paymentStack: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  paymentOptionLabel: {
    display: 'flex',
    alignItems: 'flex-start',
    padding: '16px',
    borderRadius: '12px',
    borderWidth: '1px',
    borderStyle: 'solid',
    cursor: 'pointer',
    transition: '0.2s ease',
  },
  radioInput: {
    marginTop: '3px',
    accentColor: '#8c4f16',
  },
  paymentContent: {
    marginLeft: '12px',
  },
  paymentHeaderRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    flexWrap: 'wrap',
  },
  paymentTitle: {
    fontSize: '13px',
    fontWeight: '700',
    color: '#211a16',
  },
  paymentBadge: {
    fontSize: '10px',
    fontWeight: '700',
    color: '#15803d',
    backgroundColor: '#dcfce7',
    padding: '2px 6px',
    borderRadius: '4px',
  },
  paymentDesc: {
    margin: '4px 0 0 0',
    fontSize: '12px',
    color: '#79573d',
  },
  rightColumn: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  stickySummaryCard: {
    backgroundColor: '#ffffff',
    border: '1px solid #ede0d9',
    borderRadius: '16px',
    padding: '24px',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    position: 'sticky',
    top: '84px',
  },
  summaryTitle: {
    margin: 0,
    fontSize: '16px',
    fontWeight: '700',
    color: '#211a16',
  },
  miniListContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    maxHeight: '200px',
    overflowY: 'auto',
    paddingRight: '4px',
  },
  miniListItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    fontSize: '12px',
    borderBottom: '1px solid #ede0d9',
    paddingBottom: '8px',
  },
  miniItemInfo: {
    maxWidth: '70%',
  },
  miniItemName: {
    margin: 0,
    fontWeight: '600',
    color: '#211a16',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  miniItemMeta: {
    margin: '2px 0 0 0',
    fontSize: '11px',
    color: '#79573d',
  },
  miniItemPrice: {
    fontWeight: '700',
    color: '#211a16',
  },
  costBreakdown: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    fontSize: '12px',
    color: '#534439',
  },
  costRow: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  costValueDark: {
    fontWeight: '600',
    color: '#211a16',
  },
  freeText: {
    fontWeight: '600',
    color: '#15803d',
  },
  grandTotalContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    paddingTop: '10px',
    borderTop: '1px solid #ede0d9',
  },
  grandTotalLabel: {
    fontSize: '13px',
    fontWeight: '700',
    color: '#211a16',
  },
  grandTotalValue: {
    fontSize: '20px',
    fontWeight: '800',
    color: '#8c4f16',
  },
  submitButton: {
    width: '100%',
    padding: '12px',
    borderRadius: '10px',
    fontSize: '14px',
    fontWeight: '600',
    color: '#ffffff',
    backgroundColor: '#8c4f16',
    border: 'none',
    boxShadow: '0 2px 8px rgba(140, 79, 22, 0.2)',
    transition: 'opacity 0.2s ease',
  },
  securityNotice: {
    margin: 0,
    fontSize: '10px',
    textAlign: 'center',
    color: '#857468',
    lineHeight: '1.3',
  },
};

export default Checkout;