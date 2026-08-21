import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext.jsx';

const Cart = () => {
  const navigate = useNavigate();
  const { cartItems, updateQuantity, removeFromCart, clearCart, subtotal } = useCart();

  // Quantity modification handler
  const handleUpdateQuantity = (id, newQty) => {
    updateQuantity(id, newQty);
  };

  // Remove item handler
  const handleRemoveItem = (id) => {
    removeFromCart(id);
  };
  const gstRate = 0.18; // 18% GST standard on commercial gym equipment
  const gstAmount = Math.round(subtotal * gstRate);
  const deliveryCharges = subtotal > 100000 ? 0 : 4500; // Free freight on orders over ₹1,00,000
  const grandTotal = subtotal + gstAmount + deliveryCharges;

  return (
    <div style={{ padding: '24px', backgroundColor: '#fff8f5', minHeight: '100%', boxSizing: 'border-box' }}>
      {/* Header */}
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ margin: 0, fontSize: '24px', fontWeight: '700', color: '#211a16' }}>
          Procurement Cart
        </h1>
        <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: '#79573d' }}>
          Review selected equipment, verify bulk order quantities, and compute wholesale taxes.
        </p>
      </div>

      {cartItems.length === 0 ? (
        /* Empty Cart State */
        <div
          style={{
            padding: '48px 24px',
            textAlign: 'center',
            backgroundColor: '#ffffff',
            border: '1px solid #ede0d9',
            borderRadius: '16px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '12px',
          }}
        >
          <div
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              backgroundColor: '#fff1e9',
              color: '#8c4f16',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '28px',
            }}
          >
            🛒
          </div>
          <h2 style={{ margin: 0, fontSize: '18px', fontWeight: '700', color: '#211a16' }}>
            Your procurement cart is empty
          </h2>
          <p style={{ margin: 0, fontSize: '13px', color: '#79573d', maxWidth: '380px' }}>
            Explore our certified equipment catalog to add heavy-duty machines, free weights, or gym flooring.
          </p>
          <Link
            to="/customer/products"
            style={{
              marginTop: '8px',
              padding: '10px 20px',
              borderRadius: '8px',
              fontSize: '13px',
              fontWeight: '600',
              color: '#ffffff',
              backgroundColor: '#8c4f16',
              textDecoration: 'none',
              display: 'inline-block',
            }}
          >
            Browse Products &rarr;
          </Link>
        </div>
      ) : (
        /* Main Grid: Items on Left, Order Summary on Right */
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px', alignItems: 'start' }}>
          {/* Left Column: Cart Items List */}
          <div style={{ gridColumn: 'span 2', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div
              style={{
                backgroundColor: '#ffffff',
                border: '1px solid #ede0d9',
                borderRadius: '16px',
                padding: '20px',
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
                <span style={{ fontSize: '14px', fontWeight: '700', color: '#211a16' }}>
                  Equipment Items ({cartItems.length})
                </span>
                <button
                  type="button"
                  onClick={() => clearCart()}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '12px',
                    fontWeight: '600',
                    color: '#ba1a1a',
                  }}
                >
                  Clear All
                </button>
              </div>

              <div>
                {cartItems.map((item, idx) => (
                  <div
                    key={item.id}
                    style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '16px',
                      padding: '16px 0',
                      borderBottom: idx !== cartItems.length - 1 ? '1px solid #ede0d9' : 'none',
                    }}
                  >
                    {/* Item Info */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flex: 1, minWidth: '240px' }}>
                      <img
                        src={item.image}
                        alt={item.name}
                        style={{
                          width: '64px',
                          height: '64px',
                          borderRadius: '8px',
                          objectFit: 'cover',
                          border: '1px solid #ede0d9',
                          flexShrink: 0,
                        }}
                      />
                      <div>
                        <span
                          style={{
                            fontSize: '10px',
                            fontWeight: '700',
                            textTransform: 'uppercase',
                            color: '#00687a',
                            display: 'block',
                          }}
                        >
                          {item.category}
                        </span>
                        <h3 style={{ margin: '2px 0', fontSize: '14px', fontWeight: '600', color: '#211a16' }}>
                          {item.name}
                        </h3>
                        <p style={{ margin: 0, fontSize: '12px', color: '#79573d' }}>
                          Supplier: {item.supplier}
                        </p>
                        <p style={{ margin: '4px 0 0 0', fontSize: '13px', fontWeight: '700', color: '#8c4f16' }}>
                          ₹{item.unitPrice.toLocaleString('en-IN')}{' '}
                          <span style={{ fontSize: '10px', fontWeight: '400', color: '#857468' }}>
                            / unit
                          </span>
                        </p>
                      </div>
                    </div>

                    {/* Quantity Controls & Line Total */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
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
                          onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                          style={{
                            border: 'none',
                            background: 'none',
                            padding: '6px 12px',
                            cursor: 'pointer',
                            fontWeight: '700',
                            fontSize: '14px',
                            color: '#8c4f16',
                          }}
                        >
                          -
                        </button>
                        <span style={{ padding: '6px 10px', fontSize: '12px', fontWeight: '600', color: '#211a16' }}>
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                          style={{
                            border: 'none',
                            background: 'none',
                            padding: '6px 12px',
                            cursor: 'pointer',
                            fontWeight: '700',
                            fontSize: '14px',
                            color: '#8c4f16',
                          }}
                        >
                          +
                        </button>
                      </div>

                      <div style={{ textAlign: 'right', minWidth: '90px' }}>
                        <span style={{ display: 'block', fontSize: '14px', fontWeight: '700', color: '#211a16' }}>
                          ₹{(item.unitPrice * item.quantity).toLocaleString('en-IN')}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleRemoveItem(item.id)}
                          style={{
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            fontSize: '11px',
                            color: '#ba1a1a',
                            padding: 0,
                            marginTop: '2px',
                          }}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
              <Link
                to="/customer/products"
                style={{ fontSize: '12px', fontWeight: '600', color: '#8c4f16', textDecoration: 'none' }}
              >
                &larr; Add More Equipment
              </Link>
              <span style={{ fontSize: '12px', color: '#79573d' }}>
                All orders are covered under GymHub B2B Trade Protection
              </span>
            </div>
          </div>

          {/* Right Column: Order Financial Summary */}
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
              }}
            >
              <h2 style={{ margin: 0, fontSize: '16px', fontWeight: '700', color: '#211a16' }}>
                Order Cost Breakdown
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px', color: '#534439', borderBottom: '1px solid #ede0d9', paddingBottom: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Equipment Subtotal</span>
                  <span style={{ fontWeight: '600', color: '#211a16' }}>
                    ₹{subtotal.toLocaleString('en-IN')}
                  </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Applicable GST (18% B2B)</span>
                  <span style={{ fontWeight: '600', color: '#211a16' }}>
                    ₹{gstAmount.toLocaleString('en-IN')}
                  </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Commercial Freight & Unloading</span>
                  <span style={{ fontWeight: '600', color: '#15803d' }}>
                    {deliveryCharges === 0 ? 'FREE' : `₹${deliveryCharges.toLocaleString('en-IN')}`}
                  </span>
                </div>
              </div>

              {/* Grand Total */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <span style={{ fontSize: '14px', fontWeight: '700', color: '#211a16' }}>
                  Total Payable
                </span>
                <span style={{ fontSize: '20px', fontWeight: '800', color: '#8c4f16' }}>
                  ₹{grandTotal.toLocaleString('en-IN')}
                </span>
              </div>

              <div
                style={{
                  backgroundColor: '#fff1e9',
                  borderRadius: '8px',
                  padding: '12px',
                  fontSize: '11px',
                  color: '#79573d',
                  lineHeight: '1.4',
                }}
              >
                <p style={{ margin: '0 0 4px 0', fontWeight: '700', color: '#8c4f16' }}>
                  📄 GST Input Tax Credit Claimable
                </p>
                <p style={{ margin: 0 }}>
                  You will receive a valid tax invoice with your registered GSTIN upon dispatch.
                </p>
              </div>

              <button
                type="button"
                onClick={() => navigate('/customer/checkout')}
                style={{
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
                }}
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

export default Cart;