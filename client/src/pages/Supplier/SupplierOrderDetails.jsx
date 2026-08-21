import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supplierOrders, getStatusBadge } from './data.js';

const SupplierOrderDetails = () => {
  const { id } = useParams();
  const order = supplierOrders.find((o) => o.id === id);
  const [status, setStatus] = useState(order?.status || 'Pending');
  const [updated, setUpdated] = useState(false);

  if (!order) {
    return (
      <div style={{ padding: '48px 24px', textAlign: 'center' }}>
        <h2 style={{ color: '#211a16' }}>Order not found</h2>
        <p style={{ color: '#79573d', marginBottom: '16px' }}>We couldn't find an order with ID "{id}".</p>
        <Link to="/supplier/orders" style={{ color: '#00687a', fontWeight: '600', textDecoration: 'none' }}>
          ← Back to Orders
        </Link>
      </div>
    );
  }

  const badge = getStatusBadge(status);
  const orderTotal = order.products.reduce((sum, p) => sum + p.unitPrice * p.qty, 0);

  const handleStatusUpdate = (newStatus) => {
    setStatus(newStatus);
    setUpdated(true);
    setTimeout(() => setUpdated(false), 2500);
  };

  return (
    <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div>
        <Link to="/supplier/orders" style={{ fontSize: '13px', color: '#00687a', textDecoration: 'none', fontWeight: '600' }}>
          ← Back to Orders
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
            {status}
          </span>
        </div>
        <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: '#79573d' }}>Placed on {order.date}</p>
      </div>

      {/* Status Update UI */}
      <div style={{ backgroundColor: '#ffffff', border: '1px solid #ede0d9', borderRadius: '16px', padding: '20px' }}>
        <h3 style={{ margin: '0 0 12px', fontSize: '15px', fontWeight: '700', color: '#211a16' }}>Update Order Status</h3>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
          {['Pending', 'Processing', 'Shipped', 'Delivered'].map((s) => (
            <button
              key={s}
              onClick={() => handleStatusUpdate(s)}
              style={{
                padding: '8px 16px',
                borderRadius: '8px',
                border: status === s ? 'none' : '1px solid #d8c3b5',
                backgroundColor: status === s ? '#00687a' : '#ffffff',
                color: status === s ? '#ffffff' : '#534439',
                fontWeight: '600',
                fontSize: '12px',
                cursor: 'pointer',
              }}
            >
              {s}
            </button>
          ))}
          {updated && <span style={{ fontSize: '12px', fontWeight: '600', color: '#15803d' }}>✓ Status updated</span>}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
        {/* Products */}
        <div style={{ backgroundColor: '#ffffff', border: '1px solid #ede0d9', borderRadius: '16px', padding: '20px', gridColumn: 'span 2' }}>
          <h3 style={{ margin: '0 0 14px', fontSize: '15px', fontWeight: '700', color: '#211a16' }}>Products</h3>
          {order.products.map((item, idx) => (
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
            <span>₹{orderTotal.toLocaleString('en-IN')}</span>
          </div>
        </div>

        {/* Customer Info */}
        <div style={{ backgroundColor: '#ffffff', border: '1px solid #ede0d9', borderRadius: '16px', padding: '20px' }}>
          <h3 style={{ margin: '0 0 14px', fontSize: '15px', fontWeight: '700', color: '#211a16' }}>Customer Information</h3>
          <p style={{ margin: 0, fontSize: '13px', fontWeight: '600', color: '#211a16' }}>{order.customer}</p>
          <p style={{ margin: '4px 0 0', fontSize: '13px', color: '#534439' }}>{order.contactPerson}</p>
          <p style={{ margin: '2px 0 0', fontSize: '13px', color: '#534439' }}>{order.phone}</p>

          <h3 style={{ margin: '20px 0 10px', fontSize: '15px', fontWeight: '700', color: '#211a16' }}>Payment Status</h3>
          <span
            style={{
              fontSize: '11px',
              fontWeight: '600',
              color: order.payment === 'Paid' ? '#15803d' : '#79573d',
              backgroundColor: order.payment === 'Paid' ? '#dcfce7' : '#fed1b0',
              padding: '3px 10px',
              borderRadius: '9999px',
            }}
          >
            {order.payment}
          </span>
        </div>

        {/* Delivery Address */}
        <div style={{ backgroundColor: '#ffffff', border: '1px solid #ede0d9', borderRadius: '16px', padding: '20px' }}>
          <h3 style={{ margin: '0 0 14px', fontSize: '15px', fontWeight: '700', color: '#211a16' }}>Delivery Address</h3>
          <p style={{ margin: 0, fontSize: '13px', color: '#534439', lineHeight: '20px' }}>{order.deliveryAddress}</p>
        </div>
      </div>
    </div>
  );
};

export default SupplierOrderDetails;
