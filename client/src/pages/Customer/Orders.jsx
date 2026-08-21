import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';

const initialOrders = [
  {
    id: 'ORD-8941',
    items: [{ name: 'Adjustable Urethane Dumbbell Set (5-50kg)', qty: 1, unitPrice: 64000 }],
    supplier: 'IronGrip Manufacturing',
    amount: 64000,
    payment: 'Paid',
    paymentMethod: 'Bank Transfer (NEFT)',
    status: 'Processing',
    date: 'Aug 17, 2026',
    shippingAddress: '14, MG Road, Andheri East, Mumbai, Maharashtra 400069',
  },
  {
    id: 'ORD-8938',
    items: [{ name: 'Commercial Power Rack with Cable Pulley', qty: 1, unitPrice: 115000 }],
    supplier: 'Apex Fitness Gear',
    amount: 115000,
    payment: 'Paid',
    paymentMethod: 'Razorpay B2B NetBanking',
    status: 'Shipped',
    date: 'Aug 14, 2026',
    shippingAddress: '14, MG Road, Andheri East, Mumbai, Maharashtra 400069',
  },
  {
    id: 'ORD-8920',
    items: [{ name: 'Commercial Spin Bike Pro', qty: 4, unitPrice: 45000 }],
    supplier: 'FitPro Industrial Ltd',
    amount: 180000,
    payment: 'Paid',
    paymentMethod: 'Corporate Credit Card',
    status: 'Delivered',
    date: 'Aug 05, 2026',
    shippingAddress: '14, MG Road, Andheri East, Mumbai, Maharashtra 400069',
  },
  {
    id: 'ORD-8901',
    items: [{ name: 'Commercial Rubber Flooring (1000 sq ft)', qty: 1, unitPrice: 85000 }],
    supplier: 'ToughTile Surfaces',
    amount: 85000,
    payment: 'Pending',
    paymentMethod: 'Purchase Order / Invoice',
    status: 'Pending',
    date: 'Jul 29, 2026',
    shippingAddress: '14, MG Road, Andheri East, Mumbai, Maharashtra 400069',
  },
  {
    id: 'ORD-8887',
    items: [{ name: 'Battle Ropes & Functional Training Kit', qty: 2, unitPrice: 32000 }],
    supplier: 'ToughTile Surfaces',
    amount: 64000,
    payment: 'Failed',
    paymentMethod: 'Online Payment Gateway',
    status: 'Cancelled',
    date: 'Jul 22, 2026',
    shippingAddress: '14, MG Road, Andheri East, Mumbai, Maharashtra 400069',
  },
];

const getStatusBadge = (status) => {
  const map = {
    Processing: { bg: '#fed1b0', text: '#79573d' },
    Shipped: { bg: '#57b3ca33', text: '#00687a' },
    Delivered: { bg: '#dcfce7', text: '#15803d' },
    Pending: { bg: '#f3e6de', text: '#857468' },
    Cancelled: { bg: '#fde2e2', text: '#ba1a1a' },
  };
  return map[status] || { bg: '#ede0d9', text: '#211a16' };
};

const CustomerOrders = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const filteredOrders = useMemo(() => {
    return initialOrders.filter((order) => {
      const matchesSearch =
        order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.supplier.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.items.some((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesStatus = statusFilter === 'All' || order.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [searchTerm, statusFilter]);

  return (
    <div style={{ padding: '24px', backgroundColor: '#fff8f5', minHeight: '100%', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div>
        <h1 style={{ margin: 0, fontSize: '24px', fontWeight: '700', color: '#211a16' }}>My Orders</h1>
        <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: '#79573d' }}>
          Track procurement orders from placement through delivery.
        </p>
      </div>

      {/* Search & Filter Bar */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center' }}>
        <input
          type="text"
          placeholder="Search by order ID, supplier, or product..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            flex: '1 1 260px',
            padding: '10px 14px',
            borderRadius: '8px',
            border: '1px solid #d8c3b5',
            backgroundColor: '#ffffff',
            fontSize: '13px',
            outline: 'none',
            boxSizing: 'border-box',
          }}
        />
        <div style={{ display: 'flex', gap: '8px', overflowX: 'auto' }}>
          {['All', 'Processing', 'Shipped', 'Delivered', 'Pending', 'Cancelled'].map((tab) => (
            <button
              key={tab}
              onClick={() => setStatusFilter(tab)}
              style={{
                padding: '8px 14px',
                borderRadius: '6px',
                border: 'none',
                backgroundColor: statusFilter === tab ? '#8c4f16' : '#fff1e9',
                color: statusFilter === tab ? '#ffffff' : '#534439',
                fontWeight: statusFilter === tab ? '600' : '400',
                fontSize: '12px',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
              }}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Orders List */}
      {filteredOrders.length > 0 ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {filteredOrders.map((order) => {
            const badge = getStatusBadge(order.status);
            return (
              <div
                key={order.id}
                style={{
                  backgroundColor: '#ffffff',
                  border: '1px solid #ede0d9',
                  borderRadius: '14px',
                  padding: '18px 20px',
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '16px',
                }}
              >
                <div style={{ minWidth: '200px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
                    <span style={{ fontSize: '14px', fontWeight: '700', color: '#211a16' }}>{order.id}</span>
                    <span
                      style={{
                        fontSize: '11px',
                        fontWeight: '600',
                        color: badge.text,
                        backgroundColor: badge.bg,
                        padding: '2px 10px',
                        borderRadius: '9999px',
                      }}
                    >
                      {order.status}
                    </span>
                  </div>
                  <p style={{ margin: 0, fontSize: '13px', color: '#534439' }}>
                    {order.items.map((i) => i.name).join(', ')}
                  </p>
                  <p style={{ margin: '2px 0 0', fontSize: '12px', color: '#857468' }}>
                    Supplier: {order.supplier} • {order.date}
                  </p>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <p style={{ margin: 0, fontSize: '16px', fontWeight: '700', color: '#8c4f16' }}>
                    ₹{order.amount.toLocaleString('en-IN')}
                  </p>
                  <Link
                    to={`/customer/orders/${order.id}`}
                    style={{
                      display: 'inline-block',
                      marginTop: '8px',
                      fontSize: '12px',
                      fontWeight: '600',
                      color: '#00687a',
                      textDecoration: 'none',
                    }}
                  >
                    View Details →
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div
          style={{
            padding: '48px 24px',
            textAlign: 'center',
            backgroundColor: '#ffffff',
            border: '1px solid #ede0d9',
            borderRadius: '16px',
          }}
        >
          <div
            style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              backgroundColor: '#fff1e9',
              color: '#8c4f16',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '24px',
              margin: '0 auto 12px',
            }}
          >
            📦
          </div>
          <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '700', color: '#211a16' }}>No orders found</h3>
          <p style={{ margin: '6px 0 0', fontSize: '13px', color: '#79573d' }}>
            Try a different search term or status filter.
          </p>
        </div>
      )}
    </div>
  );
};

export default CustomerOrders;
export { initialOrders, getStatusBadge };
