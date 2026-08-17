import React, { useState } from 'react';

const Orders = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [orderStatusFilter, setOrderStatusFilter] = useState('All');
  const [paymentStatusFilter, setPaymentStatusFilter] = useState('All');
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Dummy marketplace orders dataset
  const initialOrders = [
    {
      id: 'ORD-5401',
      customer: 'Alpha Fitness Club',
      buyerContact: '+91 98111 22334',
      supplier: 'FitEquip India',
      amount: '₹1,45,000',
      itemsCount: 4,
      items: [
        { name: 'Commercial Motorized Treadmill T-900', qty: 1, unitPrice: '₹1,25,000' },
        { name: 'Resistance Band Pack (Heavy)', qty: 4, unitPrice: '₹5,000' }
      ],
      payment: 'Paid',
      paymentMethod: 'Bank Transfer (NEFT)',
      orderStatus: 'Processing',
      date: '16 Aug 2026',
      shippingAddress: '4th Floor, Skyline Mall, MG Road, Pune, Maharashtra 411001'
    },
    {
      id: 'ORD-5402',
      customer: 'Iron Core Gym',
      buyerContact: '+91 98222 33445',
      supplier: 'ProGym Solutions',
      amount: '₹82,000',
      itemsCount: 1,
      items: [
        { name: 'Dual Cable Cross Over Machine', qty: 1, unitPrice: '₹82,000' }
      ],
      payment: 'Paid',
      paymentMethod: 'Razorpay B2B NetBanking',
      orderStatus: 'Shipped',
      date: '15 Aug 2026',
      shippingAddress: 'Plot 12, Whitefield Main Rd, Bengaluru, Karnataka 560066'
    },
    {
      id: 'ORD-5403',
      customer: 'Muscle Peak Studio',
      buyerContact: '+91 98333 44556',
      supplier: 'Titan Fitness Gear',
      amount: '₹2,10,000',
      itemsCount: 10,
      items: [
        { name: 'Olympic Rubber Bumper Plates (25kg)', qty: 8, unitPrice: '₹20,000' },
        { name: 'Olympic Barbells 20kg Hard Chrome', qty: 2, unitPrice: '₹25,000' }
      ],
      payment: 'Pending',
      paymentMethod: 'Purchase Order / Invoice',
      orderStatus: 'Pending',
      date: '15 Aug 2026',
      shippingAddress: 'Plot 88, Sector 18, Gurugram, Haryana 122015'
    },
    {
      id: 'ORD-5404',
      customer: 'Zenith Health Club',
      buyerContact: '+91 98444 55667',
      supplier: 'FitEquip India',
      amount: '₹34,500',
      itemsCount: 30,
      items: [
        { name: 'Interlocking Gym Rubber Tiles 20mm', qty: 30, unitPrice: '₹1,150' }
      ],
      payment: 'Paid',
      paymentMethod: 'Corporate Credit Card',
      orderStatus: 'Delivered',
      date: '14 Aug 2026',
      shippingAddress: 'B-Wing, Trade World, Kamala Mills, Mumbai 400013'
    },
    {
      id: 'ORD-5405',
      customer: 'FitZone CrossFit',
      buyerContact: '+91 98555 66778',
      supplier: 'Apex Gym Supply',
      amount: '₹64,000',
      itemsCount: 2,
      items: [
        { name: 'Air Rowing Machine with Bluetooth Monitor', qty: 1, unitPrice: '₹54,000' },
        { name: 'Cast Iron Kettlebells Set (24kg)', qty: 2, unitPrice: '₹5,000' }
      ],
      payment: 'Failed',
      paymentMethod: 'Online Payment Gateway',
      orderStatus: 'Cancelled',
      date: '11 Aug 2026',
      shippingAddress: 'Sector 5, Salt Lake, Kolkata, West Bengal 700091'
    }
  ];

  const [orders, setOrders] = useState(initialOrders);

  // Search & Filter Logic
  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.supplier.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesOrderStatus = orderStatusFilter === 'All' || order.orderStatus === orderStatusFilter;
    const matchesPaymentStatus = paymentStatusFilter === 'All' || order.payment === paymentStatusFilter;
    return matchesSearch && matchesOrderStatus && matchesPaymentStatus;
  });

  const handleUpdateOrderStatus = (orderId, newStatus) => {
    setOrders(
      orders.map((o) => (o.id === orderId ? { ...o, orderStatus: newStatus } : o))
    );
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder((prev) => ({ ...prev, orderStatus: newStatus }));
    }
  };

  const getOrderStatusBadge = (status) => {
    let bg = '#ede0d9';
    let color = '#211a16';

    if (status === 'Delivered') {
      bg = '#e6f4ea';
      color = '#137333';
    } else if (status === 'Shipped') {
      bg = '#57b3ca';
      color = '#ffffff';
    } else if (status === 'Processing') {
      bg = '#fed1b0';
      color = '#79573d';
    } else if (status === 'Pending') {
      bg = '#fff1e9';
      color = '#8c4f16';
    } else if (status === 'Cancelled') {
      bg = '#fce8e6';
      color = '#ba1a1a';
    }

    return (
      <span
        style={{
          padding: '4px 8px',
          borderRadius: '4px',
          fontSize: '12px',
          fontWeight: '600',
          backgroundColor: bg,
          color: color
        }}
      >
        {status}
      </span>
    );
  };

  const getPaymentBadge = (payment) => {
    let bg = '#ede0d9';
    let color = '#211a16';

    if (payment === 'Paid') {
      bg = '#e6f4ea';
      color = '#137333';
    } else if (payment === 'Pending') {
      bg = '#fed1b0';
      color = '#79573d';
    } else if (payment === 'Failed') {
      bg = '#fce8e6';
      color = '#ba1a1a';
    }

    return (
      <span
        style={{
          padding: '3px 6px',
          borderRadius: '4px',
          fontSize: '11px',
          fontWeight: '600',
          backgroundColor: bg,
          color: color
        }}
      >
        {payment}
      </span>
    );
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Page Header */}
      <div>
        <h1 style={{ margin: 0, fontSize: '24px', fontWeight: '600', color: '#211a16' }}>
          Marketplace Orders
        </h1>
        <p style={{ margin: '4px 0 0', fontSize: '14px', color: '#534439' }}>
          Track and manage gym equipment wholesale purchase orders and fulfillment status.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div
        style={{
          backgroundColor: '#fff8f5',
          border: '1px solid #d8c3b5',
          borderRadius: '8px',
          padding: '16px',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '16px',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <div style={{ flex: '1 1 240px', maxWidth: '320px' }}>
          <input
            type="text"
            placeholder="Search Order ID, Customer, Supplier..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              padding: '8px 12px',
              borderRadius: '6px',
              border: '1px solid #d8c3b5',
              backgroundColor: '#fff1e9',
              fontSize: '14px',
              outline: 'none',
              boxSizing: 'border-box'
            }}
          />
        </div>

        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <select
            value={orderStatusFilter}
            onChange={(e) => setOrderStatusFilter(e.target.value)}
            style={{
              padding: '8px 12px',
              borderRadius: '6px',
              border: '1px solid #d8c3b5',
              backgroundColor: '#fff8f5',
              fontSize: '14px',
              color: '#211a16',
              outline: 'none',
              cursor: 'pointer'
            }}
          >
            <option value="All">All Order Statuses</option>
            <option value="Pending">Pending</option>
            <option value="Processing">Processing</option>
            <option value="Shipped">Shipped</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
          </select>

          <select
            value={paymentStatusFilter}
            onChange={(e) => setPaymentStatusFilter(e.target.value)}
            style={{
              padding: '8px 12px',
              borderRadius: '6px',
              border: '1px solid #d8c3b5',
              backgroundColor: '#fff8f5',
              fontSize: '14px',
              color: '#211a16',
              outline: 'none',
              cursor: 'pointer'
            }}
          >
            <option value="All">All Payments</option>
            <option value="Paid">Paid</option>
            <option value="Pending">Pending</option>
            <option value="Failed">Failed</option>
          </select>
        </div>
      </div>

      {/* Orders Table */}
      <div
        style={{
          backgroundColor: '#fff8f5',
          border: '1px solid #d8c3b5',
          borderRadius: '8px',
          overflowX: 'auto'
        }}
      >
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
          <thead>
            <tr style={{ backgroundColor: '#fff1e9', borderBottom: '1px solid #d8c3b5', color: '#534439' }}>
              <th style={{ padding: '12px 16px' }}>Order ID</th>
              <th style={{ padding: '12px 16px' }}>Customer</th>
              <th style={{ padding: '12px 16px' }}>Supplier</th>
              <th style={{ padding: '12px 16px' }}>Amount</th>
              <th style={{ padding: '12px 16px' }}>Payment</th>
              <th style={{ padding: '12px 16px' }}>Status</th>
              <th style={{ padding: '12px 16px' }}>Date</th>
              <th style={{ padding: '12px 16px', textAlign: 'right' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.length > 0 ? (
              filteredOrders.map((ord) => (
                <tr key={ord.id} style={{ borderBottom: '1px solid #ede0d9' }}>
                  <td style={{ padding: '14px 16px', fontWeight: '600', color: '#8c4f16' }}>{ord.id}</td>
                  <td style={{ padding: '14px 16px' }}>
                    <div style={{ fontWeight: '600', color: '#211a16' }}>{ord.customer}</div>
                    <div style={{ fontSize: '11px', color: '#857468' }}>{ord.buyerContact}</div>
                  </td>
                  <td style={{ padding: '14px 16px', color: '#534439' }}>{ord.supplier}</td>
                  <td style={{ padding: '14px 16px', fontWeight: '600', color: '#211a16' }}>{ord.amount}</td>
                  <td style={{ padding: '14px 16px' }}>{getPaymentBadge(ord.payment)}</td>
                  <td style={{ padding: '14px 16px' }}>{getOrderStatusBadge(ord.orderStatus)}</td>
                  <td style={{ padding: '14px 16px', color: '#534439' }}>{ord.date}</td>
                  <td style={{ padding: '14px 16px', textAlign: 'right' }}>
                    <button
                      onClick={() => setSelectedOrder(ord)}
                      style={{
                        padding: '6px 12px',
                        borderRadius: '4px',
                        border: '1px solid #8c4f16',
                        backgroundColor: '#fff8f5',
                        color: '#8c4f16',
                        fontSize: '12px',
                        fontWeight: '600',
                        cursor: 'pointer'
                      }}
                    >
                      View Order
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" style={{ padding: '32px', textAlign: 'center', color: '#857468' }}>
                  No orders match the current filter selection.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Order Details & Status Update Modal */}
      {selectedOrder && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(33, 26, 22, 0.45)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 100,
            padding: '16px'
          }}
        >
          <div
            style={{
              backgroundColor: '#fff8f5',
              border: '1px solid #d8c3b5',
              borderRadius: '8px',
              width: '100%',
              maxWidth: '520px',
              padding: '24px',
              boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
              maxHeight: '90vh',
              overflowY: 'auto'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div>
                <h3 style={{ margin: 0, fontSize: '18px', color: '#211a16' }}>
                  Order Details ({selectedOrder.id})
                </h3>
                <span style={{ fontSize: '12px', color: '#857468' }}>Placed on {selectedOrder.date}</span>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                style={{ background: 'none', border: 'none', fontSize: '18px', cursor: 'pointer', color: '#534439' }}
              >
                ✕
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13px', color: '#211a16' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', backgroundColor: '#fff1e9', padding: '12px', borderRadius: '6px' }}>
                <div>
                  <strong>Customer:</strong>
                  <div>{selectedOrder.customer}</div>
                  <div style={{ fontSize: '11px', color: '#857468' }}>{selectedOrder.buyerContact}</div>
                </div>
                <div>
                  <strong>Supplier:</strong>
                  <div>{selectedOrder.supplier}</div>
                </div>
              </div>

              <div>
                <strong>Shipping Address:</strong>
                <p style={{ margin: '4px 0 0', color: '#534439', lineHeight: '18px' }}>
                  {selectedOrder.shippingAddress}
                </p>
              </div>

              <div style={{ borderTop: '1px solid #ede0d9', borderBottom: '1px solid #ede0d9', padding: '10px 0' }}>
                <strong>Ordered Items:</strong>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '8px' }}>
                  {selectedOrder.items.map((it, idx) => (
                    <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', color: '#534439' }}>
                      <span>{it.name} <strong>x{it.qty}</strong></span>
                      <span style={{ fontWeight: '600', color: '#211a16' }}>{it.unitPrice}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <strong>Payment Status:</strong> {getPaymentBadge(selectedOrder.payment)}
                  <div style={{ fontSize: '11px', color: '#857468', marginTop: '2px' }}>
                    Method: {selectedOrder.paymentMethod}
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontSize: '12px', color: '#857468' }}>Total Amount:</span>
                  <div style={{ fontSize: '18px', fontWeight: '700', color: '#8c4f16' }}>
                    {selectedOrder.amount}
                  </div>
                </div>
              </div>

              {/* Status Update Control */}
              <div style={{ marginTop: '8px', padding: '12px', backgroundColor: '#f9ebe4', borderRadius: '6px' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#211a16', marginBottom: '6px' }}>
                  Update Fulfillment Status:
                </label>
                <select
                  value={selectedOrder.orderStatus}
                  onChange={(e) => handleUpdateOrderStatus(selectedOrder.id, e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px 10px',
                    borderRadius: '4px',
                    border: '1px solid #d8c3b5',
                    backgroundColor: '#fff8f5',
                    fontSize: '13px',
                    color: '#211a16',
                    outline: 'none',
                    cursor: 'pointer'
                  }}
                >
                  <option value="Pending">Pending</option>
                  <option value="Processing">Processing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
            </div>

            <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-end' }}>
              <button
                onClick={() => setSelectedOrder(null)}
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#8c4f16',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '4px',
                  fontWeight: '600',
                  fontSize: '13px',
                  cursor: 'pointer'
                }}
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;