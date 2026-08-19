import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

const OrderDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock comprehensive orders database
  const ordersMockDatabase = {
    'GH-1024': {
      id: 'GH-1024',
      date: '18 Aug 2026, 10:45 AM',
      orderStatus: 'Processing',
      payment: 'Paid',
      paymentMethod: 'Bank Transfer (NEFT - Ref #NFT90812345)',
      buyer: {
        businessName: 'IronFit Gym & Fitness Pvt Ltd',
        contactPerson: 'Rahul Patil',
        designation: 'Managing Director / Gym Owner',
        email: 'rahul.patil@ironfitgym.in',
        phone: '+91 98111 22334',
        gstin: '27AABCI1234F1Z8'
      },
      delivery: {
        addressLine: 'Plot 45, Commercial Hub, Opp Metro Pillar 112, Baner Road',
        city: 'Pune',
        state: 'Maharashtra',
        pincode: '411045',
        shippingCourier: 'BlueDart Commercial Express Freight',
        trackingNumber: 'BD-EXP-889012'
      },
      items: [
        {
          id: 'PRD-101',
          name: 'Commercial Motorized Treadmill T-900',
          sku: 'FE-TRD-900',
          quantity: 2,
          unitPrice: 85000,
          subtotal: 170000
        }
      ],
      pricingSummary: {
        subtotal: 170000,
        gstAmount: 30600,
        shippingFee: 0,
        totalAmount: 200600
      }
    },
    'GH-1023': {
      id: 'GH-1023',
      date: '17 Aug 2026, 02:15 PM',
      orderStatus: 'Shipped',
      payment: 'Paid',
      paymentMethod: 'Razorpay B2B NetBanking',
      buyer: {
        businessName: 'Alpha Fitness Club',
        contactPerson: 'Vikram Mehta',
        designation: 'Head of Procurement',
        email: 'procurement@alphafitness.co',
        phone: '+91 98222 33445',
        gstin: '27BBACI5678K1Z2'
      },
      delivery: {
        addressLine: 'Building 4B, Mindspace Industrial Complex, Airoli',
        city: 'Navi Mumbai',
        state: 'Maharashtra',
        pincode: '400708',
        shippingCourier: 'Delhivery Freight Heavy',
        trackingNumber: 'DLV-FRT-443210'
      },
      items: [
        {
          id: 'PRD-103',
          name: 'Olympic Rubber Plates (150kg Set)',
          sku: 'FE-FW-103',
          quantity: 5,
          unitPrice: 28500,
          subtotal: 142500
        }
      ],
      pricingSummary: {
        subtotal: 142500,
        gstAmount: 25650,
        shippingFee: 1500,
        totalAmount: 169650
      }
    }
  };

  const [order, setOrder] = useState(null);

  useEffect(() => {
    // Lookup order or fallback to populated demo record
    const target = ordersMockDatabase[id] || {
      id: id || 'GH-1024',
      date: '18 Aug 2026, 10:45 AM',
      orderStatus: 'Pending',
      payment: 'Paid',
      paymentMethod: 'Bank Transfer (NEFT)',
      buyer: {
        businessName: 'PowerHouse Fitness Studio',
        contactPerson: 'Anand Roy',
        designation: 'Owner',
        email: 'anand@powerhousegym.in',
        phone: '+91 98333 44556',
        gstin: '27XYZAB9988C1Z0'
      },
      delivery: {
        addressLine: 'Sector 18, Commercial Zone, Tech City',
        city: 'Bengaluru',
        state: 'Karnataka',
        pincode: '560100',
        shippingCourier: 'Pending Assignment',
        trackingNumber: 'N/A'
      },
      items: [
        {
          id: 'PRD-102',
          name: 'Dual Cable Cross Station',
          sku: 'FE-STR-102',
          quantity: 1,
          unitPrice: 98000,
          subtotal: 98000
        }
      ],
      pricingSummary: {
        subtotal: 98000,
        gstAmount: 17640,
        shippingFee: 2000,
        totalAmount: 117640
      }
    };

    setOrder(target);
  }, [id]);

  // Requirement #25: Formal Sequential Status Progression Handler
  const handleStatusUpdate = (nextStatus) => {
    if (!order) return;
    setOrder({ ...order, orderStatus: nextStatus });
    alert(`Order status updated to "${nextStatus}".`);
  };

  if (!order) {
    return <div style={{ padding: '40px', color: '#534439' }}>Loading order details...</div>;
  }

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
          padding: '4px 10px',
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

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '950px', margin: '0 auto' }}>
      {/* Header Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <h1 style={{ margin: 0, fontSize: '24px', fontWeight: '600', color: '#211a16' }}>
              Order Dossier: {order.id}
            </h1>
            {getOrderStatusBadge(order.orderStatus)}
          </div>
          <p style={{ margin: '4px 0 0', fontSize: '13px', color: '#534439' }}>
            Placed on <strong>{order.date}</strong>
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={() => window.print()}
            style={{
              padding: '8px 14px',
              backgroundColor: '#fff1e9',
              border: '1px solid #d8c3b5',
              borderRadius: '6px',
              fontSize: '13px',
              fontWeight: '600',
              color: '#211a16',
              cursor: 'pointer'
            }}
          >
            🖨️ Print Invoice
          </button>
          <Link
            to="/supplier/orders"
            style={{
              padding: '8px 14px',
              backgroundColor: '#ede0d9',
              borderRadius: '6px',
              textDecoration: 'none',
              fontSize: '13px',
              fontWeight: '600',
              color: '#211a16'
            }}
          >
            ← Back to Orders
          </Link>
        </div>
      </div>

      {/* Requirement #25: Order Status Lifecycle Progression Bar */}
      <div
        style={{
          backgroundColor: '#fff8f5',
          border: '1px solid #d8c3b5',
          borderRadius: '8px',
          padding: '20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px'
        }}
      >
        <div>
          <span style={{ fontSize: '12px', color: '#857468', textTransform: 'uppercase', fontWeight: '600' }}>
            Fulfillment Stage:
          </span>
          <div style={{ fontSize: '16px', fontWeight: '700', color: '#8c4f16', marginTop: '2px' }}>
            Current Status: {order.orderStatus}
          </div>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          {order.orderStatus === 'Pending' && (
            <button
              onClick={() => handleStatusUpdate('Processing')}
              style={{
                padding: '8px 16px',
                backgroundColor: '#8c4f16',
                color: '#ffffff',
                border: 'none',
                borderRadius: '6px',
                fontWeight: '600',
                fontSize: '13px',
                cursor: 'pointer'
              }}
            >
              ✓ Accept & Move to Processing
            </button>
          )}

          {order.orderStatus === 'Processing' && (
            <button
              onClick={() => handleStatusUpdate('Shipped')}
              style={{
                padding: '8px 16px',
                backgroundColor: '#57b3ca',
                color: '#ffffff',
                border: 'none',
                borderRadius: '6px',
                fontWeight: '600',
                fontSize: '13px',
                cursor: 'pointer'
              }}
            >
              🚚 Mark as Shipped (Freight Dispatched)
            </button>
          )}

          {order.orderStatus === 'Shipped' && (
            <button
              onClick={() => handleStatusUpdate('Delivered')}
              style={{
                padding: '8px 16px',
                backgroundColor: '#137333',
                color: '#ffffff',
                border: 'none',
                borderRadius: '6px',
                fontWeight: '600',
                fontSize: '13px',
                cursor: 'pointer'
              }}
            >
              🎉 Mark as Delivered
            </button>
          )}

          {order.orderStatus === 'Delivered' && (
            <span style={{ fontSize: '13px', color: '#137333', fontWeight: '600' }}>
              ✓ Fulfillment Complete
            </span>
          )}
        </div>
      </div>

      {/* Two Column Grid: Buyer Details & Delivery Information */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
        {/* Requirement #24: Buyer Information */}
        <div
          style={{
            backgroundColor: '#fff8f5',
            border: '1px solid #d8c3b5',
            borderRadius: '8px',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            fontSize: '13px'
          }}
        >
          <h3 style={{ margin: '0 0 4px', fontSize: '16px', fontWeight: '600', color: '#8c4f16' }}>
            🏢 Buyer & Business Profile
          </h3>
          <div><strong>Business Entity:</strong> {order.buyer.businessName}</div>
          <div><strong>Contact Person:</strong> {order.buyer.contactPerson} ({order.buyer.designation})</div>
          <div><strong>Email:</strong> {order.buyer.email}</div>
          <div><strong>Phone:</strong> {order.buyer.phone}</div>
          <div><strong>GSTIN:</strong> {order.buyer.gstin}</div>
          <div style={{ marginTop: '8px' }}>
            <Link
              to="/supplier/messages"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '12px',
                fontWeight: '600',
                color: '#00687a',
                textDecoration: 'none'
              }}
            >
              💬 Open Buyer Conversation →
            </Link>
          </div>
        </div>

        {/* Requirement #24: Delivery Logistics & Shipping */}
        <div
          style={{
            backgroundColor: '#fff8f5',
            border: '1px solid #d8c3b5',
            borderRadius: '8px',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            fontSize: '13px'
          }}
        >
          <h3 style={{ margin: '0 0 4px', fontSize: '16px', fontWeight: '600', color: '#8c4f16' }}>
            📍 Delivery & Freight Address
          </h3>
          <div><strong>Street:</strong> {order.delivery.addressLine}</div>
          <div><strong>City / State:</strong> {order.delivery.city}, {order.delivery.state}</div>
          <div><strong>Pincode:</strong> {order.delivery.pincode}</div>
          <div><strong>Carrier Partner:</strong> {order.delivery.shippingCourier}</div>
          <div><strong>Waybill / Tracking:</strong> <span style={{ fontFamily: 'monospace', color: '#00687a' }}>{order.delivery.trackingNumber}</span></div>
        </div>
      </div>

      {/* Requirement #24: Itemized Products & Financial Breakdown */}
      <div
        style={{
          backgroundColor: '#fff8f5',
          border: '1px solid #d8c3b5',
          borderRadius: '8px',
          padding: '20px'
        }}
      >
        <h3 style={{ margin: '0 0 16px', fontSize: '16px', fontWeight: '600', color: '#211a16' }}>
          Ordered Gym Equipment
        </h3>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
            <thead>
              <tr style={{ backgroundColor: '#fff1e9', borderBottom: '1px solid #d8c3b5', color: '#534439' }}>
                <th style={{ padding: '10px 14px' }}>Product Description</th>
                <th style={{ padding: '10px 14px' }}>SKU</th>
                <th style={{ padding: '10px 14px' }}>Quantity</th>
                <th style={{ padding: '10px 14px' }}>Unit Price</th>
                <th style={{ padding: '10px 14px', textAlign: 'right' }}>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {order.items.map((item, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid #ede0d9' }}>
                  <td style={{ padding: '12px 14px', fontWeight: '600', color: '#211a16' }}>
                    {item.name}
                  </td>
                  <td style={{ padding: '12px 14px', color: '#79573d', fontFamily: 'monospace' }}>
                    {item.sku}
                  </td>
                  <td style={{ padding: '12px 14px', color: '#211a16', fontWeight: '600' }}>
                    {item.quantity} units
                  </td>
                  <td style={{ padding: '12px 14px', color: '#534439' }}>
                    ₹{item.unitPrice.toLocaleString('en-IN')}
                  </td>
                  <td style={{ padding: '12px 14px', textAlign: 'right', fontWeight: '700', color: '#211a16' }}>
                    ₹{item.subtotal.toLocaleString('en-IN')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Invoice Summary Totals */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
          <div style={{ width: '100%', maxWidth: '320px', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#534439' }}>
              <span>Subtotal:</span>
              <span>₹{order.pricingSummary.subtotal.toLocaleString('en-IN')}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#534439' }}>
              <span>GST (18% B2B Input):</span>
              <span>₹{order.pricingSummary.gstAmount.toLocaleString('en-IN')}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#534439' }}>
              <span>Logistics / Freight:</span>
              <span>{order.pricingSummary.shippingFee === 0 ? 'Free Shipping' : `₹${order.pricingSummary.shippingFee}`}</span>
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                borderTop: '1px solid #d8c3b5',
                paddingTop: '8px',
                marginTop: '4px',
                fontWeight: '700',
                fontSize: '16px',
                color: '#8c4f16'
              }}
            >
              <span>Total Invoice:</span>
              <span>₹{order.pricingSummary.totalAmount.toLocaleString('en-IN')}</span>
            </div>
            <div style={{ fontSize: '11px', color: '#857468', textAlign: 'right', marginTop: '2px' }}>
              Payment Method: {order.paymentMethod} ({order.payment})
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;