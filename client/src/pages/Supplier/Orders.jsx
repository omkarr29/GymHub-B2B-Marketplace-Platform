import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

const Orders = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialStatusQuery = searchParams.get('status') || 'All';

  const [searchTerm, setSearchTerm] = useState('');
  const [orderStatusFilter, setOrderStatusFilter] = useState(initialStatusQuery);
  const [paymentFilter, setPaymentFilter] = useState('All');

  // Keep query param in sync if accessed from sidebar links
  useEffect(() => {
    const status = searchParams.get('status') || 'All';
    setOrderStatusFilter(status);
  }, [searchParams]);

  // Requirement #23: Dummy wholesale supplier orders dataset
  const initialOrders = [
    {
      id: 'GH-1024',
      customer: 'IronFit Gym',
      buyerContact: 'Rahul Patil (+91 98111 22334)',
      products: 'Commercial Motorized Treadmill T-900',
      quantity: 2,
      amount: '₹1,70,000',
      payment: 'Paid',
      paymentMethod: 'Bank Transfer (NEFT)',
      orderStatus: 'Processing',
      date: '18 Aug 2026'
    },
    {
      id: 'GH-1023',
      customer: 'Alpha Fitness Club',
      buyerContact: 'Vikram Mehta (+91 98222 33445)',
      products: 'Olympic Rubber Plates (150kg Set)',
      quantity: 5,
      amount: '₹1,42,500',
      payment: 'Paid',
      paymentMethod: 'Razorpay B2B',
      orderStatus: 'Shipped',
      date: '17 Aug 2026'
    },
    {
      id: 'GH-1022',
      customer: 'PowerHouse Fitness',
      buyerContact: 'Anand Roy (+91 98333 44556)',
      products: 'Dual Cable Cross Station',
      quantity: 1,
      amount: '₹98,000',
      payment: 'Pending',
      paymentMethod: 'Purchase Order / Net 30',
      orderStatus: 'Pending',
      date: '16 Aug 2026'
    },
    {
      id: 'GH-1021',
      customer: 'FitZone Studio',
      buyerContact: 'Priya Sharma (+91 98444 55667)',
      products: 'Air Rowing Machine',
      quantity: 3,
      amount: '₹1,62,000',
      payment: 'Paid',
      paymentMethod: 'Corporate Card',
      orderStatus: 'Delivered',
      date: '15 Aug 2026'
    },
    {
      id: 'GH-1020',
      customer: 'Muscle Peak Gym',
      buyerContact: 'Karan Desai (+91 98555 66778)',
      products: 'Interlocking Gym Rubber Tiles (20mm)',
      quantity: 100,
      amount: '₹98,000',
      payment: 'Paid',
      paymentMethod: 'Bank Transfer (RTGS)',
      orderStatus: 'Delivered',
      date: '14 Aug 2026'
    },
    {
      id: 'GH-1019',
      customer: 'Zenith Health Club',
      buyerContact: 'Rohan Gupta (+91 98666 77889)',
      products: 'Olympic 20kg Hard Chrome Barbell',
      quantity: 10,
      amount: '₹65,000',
      payment: 'Failed',
      paymentMethod: 'Online Gateway',
      orderStatus: 'Cancelled',
      date: '10 Aug 2026'
    }
  ];

  const [orders, setOrders] = useState(initialOrders);

  // Search & Filter Logic
  const filteredOrders = orders.filter((ord) => {
    const matchesSearch =
      ord.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ord.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ord.products.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesOrderStatus = orderStatusFilter === 'All' || ord.orderStatus === orderStatusFilter;
    const matchesPayment = paymentFilter === 'All' || ord.payment === paymentFilter;
    return matchesSearch && matchesOrderStatus && matchesPayment;
  });

  // Requirement #25: Sequential Supplier Order Status Progression
  const handleQuickStatusAdvance = (orderId, currentStatus) => {
    let nextStatus = currentStatus;
    if (currentStatus === 'Pending') nextStatus = 'Processing';
    else if (currentStatus === 'Processing') nextStatus = 'Shipped';
    else if (currentStatus === 'Shipped') nextStatus = 'Delivered';

    setOrders(
      orders.map((ord) => (ord.id === orderId ? { ...ord, orderStatus: nextStatus } : ord))
    );
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
          fontSize: '11px',
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
          Customer Purchase Orders
        </h1>
        <p style={{ margin: '4px 0 0', fontSize: '14px', color: '#534439' }}>
          Process incoming wholesale orders, manage shipment statuses, and view commercial buyer details.
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
        <div style={{ flex: '1 1 240px', maxWidth: '340px' }}>
          <input
            type="text"
            placeholder="Search Order ID, Customer, or Product..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              padding: '8px 12px',
              borderRadius: '6px',
              border: '1px solid #d8c3b5',
              backgroundColor: '#fff1e9',
              fontSize: '13px',
              outline: 'none',
              boxSizing: 'border-box'
            }}
          />
        </div>

        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <select
            value={orderStatusFilter}
            onChange={(e) => {
              setOrderStatusFilter(e.target.value);
              if (e.target.value === 'All') setSearchParams({});
              else setSearchParams({ status: e.target.value });
            }}
            style={{
              padding: '8px 12px',
              borderRadius: '6px',
              border: '1px solid #d8c3b5',
              backgroundColor: '#fff8f5',
              fontSize: '13px',
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
            value={paymentFilter}
            onChange={(e) => setPaymentFilter(e.target.value)}
            style={{
              padding: '8px 12px',
              borderRadius: '6px',
              border: '1px solid #d8c3b5',
              backgroundColor: '#fff8f5',
              fontSize: '13px',
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
              <th style={{ padding: '12px 16px' }}>Customer / Gym</th>
              <th style={{ padding: '12px 16px' }}>Ordered Items</th>
              <th style={{ padding: '12px 16px' }}>Qty</th>
              <th style={{ padding: '12px 16px' }}>Total Amount</th>
              <th style={{ padding: '12px 16px' }}>Payment</th>
              <th style={{ padding: '12px 16px' }}>Status</th>
              <th style={{ padding: '12px 16px' }}>Date</th>
              <th style={{ padding: '12px 16px', textAlign: 'right' }}>Actions</th>
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
                  <td style={{ padding: '14px 16px', color: '#534439' }}>{ord.products}</td>
                  <td style={{ padding: '14px 16px', fontWeight: '600', color: '#211a16' }}>{ord.quantity}</td>
                  <td style={{ padding: '14px 16px', fontWeight: '700', color: '#211a16' }}>{ord.amount}</td>
                  <td style={{ padding: '14px 16px' }}>{getPaymentBadge(ord.payment)}</td>
                  <td style={{ padding: '14px 16px' }}>{getOrderStatusBadge(ord.orderStatus)}</td>
                  <td style={{ padding: '14px 16px', color: '#534439', fontSize: '12px' }}>{ord.date}</td>
                  <td style={{ padding: '14px 16px', textAlign: 'right' }}>
                    <div style={{ display: 'inline-flex', gap: '6px' }}>
                      {/* Step-by-Step Status Advance Shortcut Button */}
                      {ord.orderStatus === 'Pending' && (
                        <button
                          onClick={() => handleQuickStatusAdvance(ord.id, ord.orderStatus)}
                          style={{
                            padding: '4px 8px',
                            backgroundColor: '#fff1e9',
                            border: '1px solid #8c4f16',
                            color: '#8c4f16',
                            borderRadius: '4px',
                            fontSize: '11px',
                            fontWeight: '600',
                            cursor: 'pointer'
                          }}
                        >
                          Accept Order
                        </button>
                      )}
                      {ord.orderStatus === 'Processing' && (
                        <button
                          onClick={() => handleQuickStatusAdvance(ord.id, ord.orderStatus)}
                          style={{
                            padding: '4px 8px',
                            backgroundColor: '#57b3ca',
                            border: 'none',
                            color: '#ffffff',
                            borderRadius: '4px',
                            fontSize: '11px',
                            fontWeight: '600',
                            cursor: 'pointer'
                          }}
                        >
                          Mark Shipped
                        </button>
                      )}
                      {ord.orderStatus === 'Shipped' && (
                        <button
                          onClick={() => handleQuickStatusAdvance(ord.id, ord.orderStatus)}
                          style={{
                            padding: '4px 8px',
                            backgroundColor: '#e6f4ea',
                            border: '1px solid #137333',
                            color: '#137333',
                            borderRadius: '4px',
                            fontSize: '11px',
                            fontWeight: '600',
                            cursor: 'pointer'
                          }}
                        >
                          Mark Delivered
                        </button>
                      )}

                      <Link
                        to={`/supplier/orders/${ord.id}`}
                        style={{
                          padding: '4px 10px',
                          borderRadius: '4px',
                          border: '1px solid #d8c3b5',
                          backgroundColor: '#fff8f5',
                          color: '#00687a',
                          fontSize: '12px',
                          fontWeight: '600',
                          textDecoration: 'none'
                        }}
                      >
                        View Details
                      </Link>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" style={{ padding: '40px 16px', textAlign: 'center', color: '#857468' }}>
                  <div style={{ fontSize: '28px', marginBottom: '8px' }}>🛒</div>
                  <div style={{ fontWeight: '600', color: '#211a16', fontSize: '15px' }}>No orders found</div>
                  <p style={{ margin: '4px 0 0', fontSize: '13px' }}>
                    Incoming purchase orders matching this query will appear here.
                  </p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;