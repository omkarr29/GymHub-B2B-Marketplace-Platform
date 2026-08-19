import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// Sub-component for individual cart item rows
const CartItemRow = ({ item, index, totalItems, onUpdateQuantity, onRemoveItem }) => (
  <div style={{
    ...styles.cartItemRow,
    borderBottom: index !== totalItems - 1 ? '1px solid #ede0d9' : 'none',
  }}>
    {/* Item Info */}
    <div style={styles.itemInfo}>
      <img src={item.image} alt={item.name} style={styles.itemImage} />
      <div>
        <span style={styles.itemCategory}>{item.category}</span>
        <h3 style={styles.itemName}>{item.name}</h3>
        <p style={styles.itemSupplier}>Supplier: {item.supplier}</p>
        <p style={styles.itemUnitPrice}>
          ₹{item.unitPrice.toLocaleString('en-IN')}{' '}
          <span style={styles.unitText}>/ unit</span>
        </p>
      </div>
    </div>

    {/* Quantity Controls & Line Total */}
    <div style={styles.itemActionsContainer}>
      <div style={styles.qtyContainer}>
        <button
          type="button"
          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
          style={styles.qtyButton}
        >
          -
        </button>
        <span style={styles.qtyText}>{item.quantity}</span>
        <button
          type="button"
          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
          style={styles.qtyButton}
        >
          +
        </button>
      </div>

      <div style={styles.lineTotalContainer}>
        <span style={styles.lineTotalText}>
          ₹{(item.unitPrice * item.quantity).toLocaleString('en-IN')}
        </span>
        <button
          type="button"
          onClick={() => onRemoveItem(item.id)}
          style={styles.removeButton}
        >
          Remove
        </button>
      </div>
    </div>
  </div>
);

const Cart = () => {
  const navigate = useNavigate();

  // Initial realistic B2B Gym Cart items
  const [cartItems, setCartItems] = useState([
    {
      id: 'prod-1',
      name: 'Commercial Motorized Treadmill X9 Heavy-Duty',
      category: 'Cardio Equipment',
      supplier: 'FitPro Industrial Ltd',
      unitPrice: 145000,
      quantity: 2,
      minOrderQty: 1,
      image: 'https://images.unsplash.com/photo-1576678927484-cc907957088c?w=500&auto=format&fit=crop&q=60',
    },
    {
      id: 'prod-2',
      name: 'Olympic Heavy-Duty Flat Bench',
      category: 'Strength Equipment',
      supplier: 'IronGrip Manufacturing',
      unitPrice: 28500,
      quantity: 2,
      minOrderQty: 2,
      image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=500&auto=format&fit=crop&q=60',
    },
    {
      id: 'prod-6',
      name: 'Olympic Urethane Weight Plates Set (250kg)',
      category: 'Free Weights',
      supplier: 'IronGrip Manufacturing',
      unitPrice: 62000,
      quantity: 1,
      minOrderQty: 1,
      image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=500&auto=format&fit=crop&q=60',
    },
  ]);

  // Quantity modification handler
  const handleUpdateQuantity = (id, newQty) => {
    setCartItems((prevItems) =>
      prevItems.map((item) => {
        if (item.id === id) {
          const qty = Math.max(item.minOrderQty, newQty);
          return { ...item, quantity: qty };
        }
        return item;
      })
    );
  };

  // Remove item handler
  const handleRemoveItem = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  // Financial calculations
  const subtotal = cartItems.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);
  const gstRate = 0.18; // 18% GST standard on commercial gym equipment
  const gstAmount = Math.round(subtotal * gstRate);
  const deliveryCharges = subtotal > 100000 ? 0 : 4500; // Free freight on orders over ₹1,00,000
  const grandTotal = subtotal + gstAmount + deliveryCharges;

  return (
    <div style={styles.pageContainer}>
      {/* Header */}
      <div style={styles.headerContainer}>
        <h1 style={styles.mainTitle}>Procurement Cart</h1>
        <p style={styles.subtitle}>
          Review selected equipment, verify bulk order quantities, and compute wholesale taxes.
        </p>
      </div>

      {cartItems.length === 0 ? (
        /* Empty Cart State */
        <div style={styles.emptyContainer}>
          <div style={styles.emptyIcon}>🛒</div>
          <h2 style={styles.emptyTitle}>Your procurement cart is empty</h2>
          <p style={styles.emptySubtitle}>
            Explore our certified equipment catalog to add heavy-duty machines, free weights, or gym flooring.
          </p>
          <Link to="/customer/products" style={styles.browseButton}>
            Browse Products &rarr;
          </Link>
        </div>
      ) : (
        /* Main Grid: Items on Left, Order Summary on Right */
        <div style={styles.gridContainer}>
          {/* Left Column: Cart Items List */}
          <div style={styles.leftColumn}>
            <div style={styles.card}>
              <div style={styles.cardHeader}>
                <span style={styles.cardTitle}>Equipment Items ({cartItems.length})</span>
                <button
                  type="button"
                  onClick={() => setCartItems([])}
                  style={styles.clearAllButton}
                >
                  Clear All
                </button>
              </div>

              <div>
                {cartItems.map((item, idx) => (
                  <CartItemRow
                    key={item.id}
                    item={item}
                    index={idx}
                    totalItems={cartItems.length}
                    onUpdateQuantity={handleUpdateQuantity}
                    onRemoveItem={handleRemoveItem}
                  />
                ))}
              </div>
            </div>

            <div style={styles.footerLinks}>
              <Link to="/customer/products" style={styles.addMoreLink}>
                &larr; Add More Equipment
              </Link>
              <span style={styles.protectionText}>
                All orders are covered under GymHub B2B Trade Protection
              </span>
            </div>
          </div>

          {/* Right Column: Order Financial Summary */}
          <div style={styles.rightColumn}>
            <div style={styles.summaryCard}>
              <h2 style={styles.summaryTitle}>Order Cost Breakdown</h2>

              <div style={styles.costBreakdownList}>
                <div style={styles.costRow}>
                  <span>Equipment Subtotal</span>
                  <span style={styles.costValueDark}>₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                <div style={styles.costRow}>
                  <span>Applicable GST (18% B2B)</span>
                  <span style={styles.costValueDark}>₹{gstAmount.toLocaleString('en-IN')}</span>
                </div>
                <div style={styles.costRow}>
                  <span>Commercial Freight & Unloading</span>
                  <span style={deliveryCharges === 0 ? styles.freeText : styles.costValueDark}>
                    {deliveryCharges === 0 ? 'FREE' : `₹${deliveryCharges.toLocaleString('en-IN')}`}
                  </span>
                </div>
              </div>

              {/* Grand Total */}
              <div style={styles.grandTotalRow}>
                <span style={styles.grandTotalLabel}>Total Payable</span>
                <span style={styles.grandTotalValue}>₹{grandTotal.toLocaleString('en-IN')}</span>
              </div>

              <div style={styles.gstNoticeBox}>
                <p style={styles.gstNoticeTitle}>📄 GST Input Tax Credit Claimable</p>
                <p style={styles.gstNoticeText}>
                  You will receive a valid tax invoice with your registered GSTIN upon dispatch.
                </p>
              </div>

              <button
                type="button"
                onClick={() => navigate('/customer/checkout')}
                style={styles.checkoutButton}
              >
                Proceed to Sourcing Checkout &rarr;
              </button>
            </div>
          </div>
        </div>
      )}
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
  emptyContainer: {
    padding: '48px 24px',
    textAlign: 'center',
    backgroundColor: '#ffffff',
    border: '1px solid #ede0d9',
    borderRadius: '16px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '12px',
  },
  emptyIcon: {
    width: '64px',
    height: '64px',
    borderRadius: '50%',
    backgroundColor: '#fff1e9',
    color: '#8c4f16',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '28px',
  },
  emptyTitle: {
    margin: 0,
    fontSize: '18px',
    fontWeight: '700',
    color: '#211a16',
  },
  emptySubtitle: {
    margin: 0,
    fontSize: '13px',
    color: '#79573d',
    maxWidth: '380px',
  },
  browseButton: {
    marginTop: '8px',
    padding: '10px 20px',
    borderRadius: '8px',
    fontSize: '13px',
    fontWeight: '600',
    color: '#ffffff',
    backgroundColor: '#8c4f16',
    textDecoration: 'none',
    display: 'inline-block',
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
    gap: '16px',
  },
  card: {
    backgroundColor: '#ffffff',
    border: '1px solid #ede0d9',
    borderRadius: '16px',
    padding: '20px',
  },
  cardHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottom: '1px solid #ede0d9',
    paddingBottom: '12px',
  },
  cardTitle: {
    fontSize: '14px',
    fontWeight: '700',
    color: '#211a16',
  },
  clearAllButton: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontSize: '12px',
    fontWeight: '600',
    color: '#ba1a1a',
  },
  cartItemRow: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '16px',
    padding: '16px 0',
  },
  itemInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
    flex: 1,
    minWidth: '240px',
  },
  itemImage: {
    width: '64px',
    height: '64px',
    borderRadius: '8px',
    objectFit: 'cover',
    border: '1px solid #ede0d9',
    flexShrink: 0,
  },
  itemCategory: {
    fontSize: '10px',
    fontWeight: '700',
    textTransform: 'uppercase',
    color: '#00687a',
    display: 'block',
  },
  itemName: {
    margin: '2px 0',
    fontSize: '14px',
    fontWeight: '600',
    color: '#211a16',
  },
  itemSupplier: {
    margin: 0,
    fontSize: '12px',
    color: '#79573d',
  },
  itemUnitPrice: {
    margin: '4px 0 0 0',
    fontSize: '13px',
    fontWeight: '700',
    color: '#8c4f16',
  },
  unitText: {
    fontSize: '10px',
    fontWeight: '400',
    color: '#857468',
  },
  itemActionsContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
  },
  qtyContainer: {
    display: 'flex',
    alignItems: 'center',
    border: '1px solid #d8c3b5',
    borderRadius: '8px',
    overflow: 'hidden',
    backgroundColor: '#ffffff',
  },
  qtyButton: {
    border: 'none',
    background: 'none',
    padding: '6px 12px',
    cursor: 'pointer',
    fontWeight: '700',
    fontSize: '14px',
    color: '#8c4f16',
  },
  qtyText: {
    padding: '6px 10px',
    fontSize: '12px',
    fontWeight: '600',
    color: '#211a16',
  },
  lineTotalContainer: {
    textAlign: 'right',
    minWidth: '90px',
  },
  lineTotalText: {
    display: 'block',
    fontSize: '14px',
    fontWeight: '700',
    color: '#211a16',
  },
  removeButton: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontSize: '11px',
    color: '#ba1a1a',
    padding: 0,
    marginTop: '2px',
  },
  footerLinks: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '8px',
  },
  addMoreLink: {
    fontSize: '12px',
    fontWeight: '600',
    color: '#8c4f16',
    textDecoration: 'none',
  },
  protectionText: {
    fontSize: '12px',
    color: '#79573d',
  },
  rightColumn: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  summaryCard: {
    backgroundColor: '#ffffff',
    border: '1px solid #ede0d9',
    borderRadius: '16px',
    padding: '24px',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  summaryTitle: {
    margin: 0,
    fontSize: '16px',
    fontWeight: '700',
    color: '#211a16',
  },
  costBreakdownList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    fontSize: '13px',
    color: '#534439',
    borderBottom: '1px solid #ede0d9',
    paddingBottom: '16px',
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
  grandTotalRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  grandTotalLabel: {
    fontSize: '14px',
    fontWeight: '700',
    color: '#211a16',
  },
  grandTotalValue: {
    fontSize: '20px',
    fontWeight: '800',
    color: '#8c4f16',
  },
  gstNoticeBox: {
    backgroundColor: '#fff1e9',
    borderRadius: '8px',
    padding: '12px',
    fontSize: '11px',
    color: '#79573d',
    lineHeight: '1.4',
  },
  gstNoticeTitle: {
    margin: '0 0 4px 0',
    fontWeight: '700',
    color: '#8c4f16',
  },
  gstNoticeText: {
    margin: 0,
  },
  checkoutButton: {
    width: '100%',
    padding: '12px',
    borderRadius: '10px',
    fontSize: '14px',
    fontWeight: '600',
    color: '#ffffff',
    backgroundColor: '#8c4f16',
    border: 'none',
    cursor: 'pointer',
    boxShadow: '0 2px 8px rgba(140, 79, 22, 0.2)',
  },
};

export default Cart;