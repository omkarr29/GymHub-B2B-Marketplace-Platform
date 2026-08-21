import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { initialOrders, getStatusBadge } from './Orders.jsx';

const CustomerOrderDetails = () => {
  const { id } = useParams();
  const order = initialOrders.find((o) => o.id === id);

  if (!order) {
    return (
      <div style={{ padding: '48px 24px', textAlign: 'center' }}>
        <h2 style={{ color: '#211a16' }}>Order not found</h2>
        <p style={{ color: '#79573d', marginBottom: '16px' }}>
          We couldn't find an order with ID "{id}".
        </p>
        <Link to="/customer/orders" style={{ color: '#8c4f16', fontWeight: '600', textDecoration: 'none' }}>
          ← Back to My Orders
        </Link>
      </div>
    );
  }

  const badge = getStatusBadge(order.status);
  const trackingSteps = ['Pending', 'Processing', 'Shipped', 'Delivered'];
  const currentStepIndex = trackingSteps.indexOf(order.status);

  return (
    <div style={{ padding: '24px', backgroundColor: '#fff8f5', minHeight: '100%', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div>
        <Link to="/customer/orders" style={{ fontSize: '13px', color: '#00687a', textDecoration: 'none', fontWeight: '600' }}>
          ← Back to My Orders
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '10px', flexWrap: 'wrap' }}>
          <h1 style={{ margin: 0, fontSize: '24px', fontWeight: '700', color: '#211a16' }}>Order {order.id}</h1>
          <span
            style={{
              fontSize: '12px',
              fontWeight: '600',
              color: badge.text,
              backgroundColor: badge.bg,
              padding: '3px 12px',
              borderRadius: '9999px',
            }}
          >
            {order.status}
          </span>
        </div>
        <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: '#79573d' }}>Placed on {order.date}</p>
      </div>

      {/* Tracking Progress */}
      {order.status !== 'Cancelled' && (
        <div
          style={{
            backgroundColor: '#ffffff',
            border: '1px solid #ede0d9',
            borderRadius: '16px',
            padding: '24px',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', position: 'relative' }}>
            <div
              style={{
                position: 'absolute',
                top: '13px',
                left: '5%',
                right: '5%',
                height: '2px',
                backgroundColor: '#ede0d9',
                zIndex: 0,
              }}
            />
            {trackingSteps.map((step, idx) => (
              <div key={step} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', zIndex: 1, flex: 1 }}>
                <div
                  style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    backgroundColor: idx <= currentStepIndex ? '#8c4f16' : '#ede0d9',
                    color: idx <= currentStepIndex ? '#ffffff' : '#857468',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '13px',
                    fontWeight: '700',
                  }}
                >
                  {idx <= currentStepIndex ? '✓' : idx + 1}
                </div>
                <span style={{ fontSize: '12px', fontWeight: idx === currentStepIndex ? '700' : '400', color: idx <= currentStepIndex ? '#211a16' : '#857468' }}>
                  {step}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
        {/* Products */}
        <div
          style={{
            backgroundColor: '#ffffff',
            border: '1px solid #ede0d9',
            borderRadius: '16px',
            padding: '20px',
            gridColumn: 'span 2',
          }}
        >
          <h3 style={{ margin: '0 0 14px', fontSize: '15px', fontWeight: '700', color: '#211a16' }}>Products</h3>
          {order.items.map((item, idx) => (
            <div
              key={idx}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '12px 0',
                borderTop: idx > 0 ? '1px solid #f3e6de' : 'none',
              }}
            >
              <div>
                <p style={{ margin: 0, fontSize: '13px', fontWeight: '600', color: '#211a16' }}>{item.name}</p>
                <p style={{ margin: '2px 0 0', fontSize: '12px', color: '#857468' }}>Qty: {item.qty}</p>
              </div>
              <p style={{ margin: 0, fontSize: '13px', fontWeight: '700', color: '#8c4f16' }}>
                ₹{(item.unitPrice * item.qty).toLocaleString('en-IN')}
              </p>
            </div>
          ))}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              paddingTop: '14px',
              marginTop: '6px',
              borderTop: '1px solid #ede0d9',
              fontSize: '15px',
              fontWeight: '700',
              color: '#211a16',
            }}
          >
            <span>Total</span>
            <span>₹{order.amount.toLocaleString('en-IN')}</span>
          </div>
        </div>

        {/* Supplier & Payment */}
        <div style={{ backgroundColor: '#ffffff', border: '1px solid #ede0d9', borderRadius: '16px', padding: '20px' }}>
          <h3 style={{ margin: '0 0 14px', fontSize: '15px', fontWeight: '700', color: '#211a16' }}>Supplier</h3>
          <p style={{ margin: 0, fontSize: '13px', color: '#534439' }}>{order.supplier}</p>

          <h3 style={{ margin: '20px 0 14px', fontSize: '15px', fontWeight: '700', color: '#211a16' }}>Payment</h3>
          <p style={{ margin: 0, fontSize: '13px', color: '#534439' }}>{order.paymentMethod}</p>
          <span
            style={{
              display: 'inline-block',
              marginTop: '6px',
              fontSize: '11px',
              fontWeight: '600',
              color: order.payment === 'Paid' ? '#15803d' : order.payment === 'Failed' ? '#ba1a1a' : '#79573d',
              backgroundColor: order.payment === 'Paid' ? '#dcfce7' : order.payment === 'Failed' ? '#fde2e2' : '#fed1b0',
              padding: '2px 10px',
              borderRadius: '9999px',
            }}
          >
            {order.payment}
          </span>
        </div>

        {/* Delivery Address */}
        <div style={{ backgroundColor: '#ffffff', border: '1px solid #ede0d9', borderRadius: '16px', padding: '20px' }}>
          <h3 style={{ margin: '0 0 14px', fontSize: '15px', fontWeight: '700', color: '#211a16' }}>Delivery Address</h3>
          <p style={{ margin: 0, fontSize: '13px', color: '#534439', lineHeight: '20px' }}>{order.shippingAddress}</p>
        </div>
      </div>
    </div>
  );
};

export default CustomerOrderDetails;
