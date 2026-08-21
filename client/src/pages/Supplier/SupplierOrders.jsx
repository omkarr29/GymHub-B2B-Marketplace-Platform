import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { supplierOrders, getStatusBadge } from './data.js';

const StatusBadge = ({ status }) => {
  const { bg, text } = getStatusBadge(status);
  return (
    <span
      style={{
        fontSize: '11px',
        fontWeight: '600',
        color: text,
        backgroundColor: bg,
        padding: '3px 10px',
        borderRadius: '9999px',
      }}
    >
      {status}
    </span>
  );
};

const SupplierOrders = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const filteredOrders = useMemo(() => {
    return supplierOrders.filter((order) => {
      const matchesSearch =
        order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customer.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'All' || order.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [searchTerm, statusFilter]);

  return (
    <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div>
        <h1 style={{ margin: 0, fontSize: '24px', fontWeight: '700', color: '#211a16' }}>Orders</h1>
        <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: '#79573d' }}>
          Incoming purchase orders from gym and fitness business buyers.
        </p>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center' }}>
        <input
          type="text"
          placeholder="Search by order ID or customer..."
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
          {['All', 'Pending', 'Processing', 'Shipped', 'Delivered'].map((tab) => (
            <button
              key={tab}
              onClick={() => setStatusFilter(tab)}
              style={{
                padding: '8px 14px',
                borderRadius: '6px',
                border: 'none',
                backgroundColor: statusFilter === tab ? '#00687a' : '#fff1e9',
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

      <div style={{ backgroundColor: '#fff8f5', border: '1px solid #d8c3b5', borderRadius: '8px', overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
          <thead>
            <tr style={{ backgroundColor: '#fff1e9', borderBottom: '1px solid #d8c3b5', color: '#534439' }}>
              <th style={{ padding: '12px 16px' }}>Order ID</th>
              <th style={{ padding: '12px 16px' }}>Customer</th>
              <th style={{ padding: '12px 16px' }}>Products</th>
              <th style={{ padding: '12px 16px' }}>Amount</th>
              <th style={{ padding: '12px 16px' }}>Payment</th>
              <th style={{ padding: '12px 16px' }}>Status</th>
              <th style={{ padding: '12px 16px' }}>Date</th>
              <th style={{ padding: '12px 16px', textAlign: 'right' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order) => (
                <tr key={order.id} style={{ borderBottom: '1px solid #ede0d9' }}>
                  <td style={{ padding: '14px 16px', fontWeight: '600', color: '#211a16' }}>{order.id}</td>
                  <td style={{ padding: '14px 16px', color: '#534439' }}>{order.customer}</td>
                  <td style={{ padding: '14px 16px', color: '#534439' }}>
                    {order.products.map((p) => p.name).join(', ')}
                  </td>
                  <td style={{ padding: '14px 16px', fontWeight: '600', color: '#8c4f16' }}>
                    ₹{order.amount.toLocaleString('en-IN')}
                  </td>
                  <td style={{ padding: '14px 16px' }}>
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
                  </td>
                  <td style={{ padding: '14px 16px' }}>
                    <StatusBadge status={order.status} />
                  </td>
                  <td style={{ padding: '14px 16px', color: '#857468' }}>{order.date}</td>
                  <td style={{ padding: '14px 16px', textAlign: 'right' }}>
                    <Link
                      to={`/supplier/orders/${order.id}`}
                      style={{
                        padding: '4px 10px',
                        borderRadius: '4px',
                        border: '1px solid #d8c3b5',
                        backgroundColor: '#fff8f5',
                        color: '#00687a',
                        fontSize: '12px',
                        fontWeight: '600',
                        textDecoration: 'none',
                      }}
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" style={{ padding: '40px', textAlign: 'center', color: '#857468' }}>
                  No orders found matching the criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SupplierOrders;
