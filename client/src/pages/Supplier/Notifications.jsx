import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Notifications = () => {
  const [filterType, setFilterType] = useState('All');

  // Requirement #29: Supplier Notifications Dataset
  const initialNotifications = [
    {
      id: 1,
      title: 'New Wholesale Order Received',
      description: 'IronFit Gym placed purchase order #GH-1024 for 2x Commercial Motorized Treadmills (₹1,70,000).',
      category: 'Order',
      time: '15 mins ago',
      read: false,
      icon: '🛒',
      actionLink: '/supplier/orders/GH-1024'
    },
    {
      id: 2,
      title: 'Low Stock Alert',
      description: 'Stock for "Olympic 20kg Hard Chrome Barbell" is down to 4 units (Threshold: 10).',
      category: 'Inventory',
      time: '1 hour ago',
      read: false,
      icon: '⚠️',
      actionLink: '/supplier/inventory'
    },
    {
      id: 3,
      title: 'Buyer Inquiry Received',
      description: 'Alpha Fitness Club sent a message regarding freight delivery timelines for Order #GH-1023.',
      category: 'Message',
      time: '3 hours ago',
      read: false,
      icon: '💬',
      actionLink: '/supplier/messages'
    },
    {
      id: 4,
      title: 'Product Approved by Admin',
      description: 'Your product listing "Commercial Motorized Treadmill T-900" is now active on the marketplace.',
      category: 'Product',
      time: 'Yesterday',
      read: true,
      icon: '✅',
      actionLink: '/supplier/products'
    },
    {
      id: 5,
      title: 'Supplier KYC Verification Approved',
      description: 'Your legal business documents have been verified. You now have full B2B selling privileges.',
      category: 'Verification',
      time: '3 days ago',
      read: true,
      icon: '🛡️',
      actionLink: '/supplier/profile'
    },
    {
      id: 6,
      title: 'Payment Credited',
      description: 'Payout of ₹1,42,500 for delivered order #GH-1002 has been released to your registered account.',
      category: 'Payment',
      time: '5 days ago',
      read: true,
      icon: '💳',
      actionLink: '/supplier/orders'
    }
  ];

  const [notifications, setNotifications] = useState(initialNotifications);

  // Filter logic
  const filteredNotifications = notifications.filter((item) => {
    if (filterType === 'Unread') return !item.read;
    if (filterType === 'All') return true;
    return item.category === filterType;
  });

  const handleMarkAllRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  const handleToggleRead = (id) => {
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, read: !n.read } : n))
    );
  };

  const handleDelete = (id) => {
    setNotifications(notifications.filter((n) => n.id !== id));
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Page Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <h1 style={{ margin: 0, fontSize: '24px', fontWeight: '600', color: '#211a16' }}>
              Supplier Notifications & Alerts
            </h1>
            {unreadCount > 0 && (
              <span
                style={{
                  padding: '2px 8px',
                  backgroundColor: '#ba1a1a',
                  color: '#ffffff',
                  borderRadius: '9999px',
                  fontSize: '12px',
                  fontWeight: '700'
                }}
              >
                {unreadCount} unread
              </span>
            )}
          </div>
          <p style={{ margin: '4px 0 0', fontSize: '14px', color: '#534439' }}>
            Stay updated on new wholesale orders, inventory reorder thresholds, and buyer inquiries.
          </p>
        </div>

        {unreadCount > 0 && (
          <button
            onClick={handleMarkAllRead}
            style={{
              padding: '8px 14px',
              backgroundColor: '#fff8f5',
              border: '1px solid #d8c3b5',
              borderRadius: '6px',
              color: '#8c4f16',
              fontWeight: '600',
              fontSize: '13px',
              cursor: 'pointer'
            }}
          >
            Mark all as read
          </button>
        )}
      </div>

      {/* Filter Tabs */}
      <div
        style={{
          backgroundColor: '#fff8f5',
          border: '1px solid #d8c3b5',
          borderRadius: '8px',
          padding: '12px 16px',
          display: 'flex',
          gap: '8px',
          overflowX: 'auto'
        }}
      >
        {['All', 'Unread', 'Order', 'Inventory', 'Message', 'Product', 'Verification'].map((tab) => (
          <button
            key={tab}
            onClick={() => setFilterType(tab)}
            style={{
              padding: '6px 14px',
              borderRadius: '6px',
              border: 'none',
              backgroundColor: filterType === tab ? '#8c4f16' : '#fff1e9',
              color: filterType === tab ? '#ffffff' : '#534439',
              fontWeight: filterType === tab ? '600' : '400',
              fontSize: '13px',
              cursor: 'pointer',
              whiteSpace: 'nowrap'
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Notifications List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {filteredNotifications.length > 0 ? (
          filteredNotifications.map((item) => (
            <div
              key={item.id}
              style={{
                backgroundColor: item.read ? '#fff8f5' : '#fff1e9',
                border: item.read ? '1px solid #ede0d9' : '1px solid #e29657',
                borderRadius: '8px',
                padding: '16px 20px',
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                gap: '16px',
                transition: 'background-color 0.2s ease'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                <span style={{ fontSize: '22px', marginTop: '2px' }}>{item.icon}</span>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <h3 style={{ margin: 0, fontSize: '15px', fontWeight: '600', color: '#211a16' }}>
                      {item.title}
                    </h3>
                    {!item.read && (
                      <span
                        style={{
                          width: '8px',
                          height: '8px',
                          borderRadius: '9999px',
                          backgroundColor: '#ba1a1a',
                          display: 'inline-block'
                        }}
                      />
                    )}
                  </div>
                  <p style={{ margin: '4px 0 6px', fontSize: '13px', color: '#534439', lineHeight: '18px' }}>
                    {item.description}
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '12px', color: '#857468' }}>
                    <span>🕒 {item.time}</span>
                    <span>•</span>
                    <span style={{ color: '#00687a', fontWeight: '500' }}>{item.category}</span>
                  </div>
                </div>
              </div>

              {/* Action Controls */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
                <Link
                  to={item.actionLink}
                  style={{
                    textDecoration: 'none',
                    padding: '6px 12px',
                    backgroundColor: '#fff8f5',
                    border: '1px solid #d8c3b5',
                    borderRadius: '4px',
                    color: '#8c4f16',
                    fontSize: '12px',
                    fontWeight: '600'
                  }}
                >
                  View
                </Link>
                <button
                  onClick={() => handleToggleRead(item.id)}
                  title={item.read ? 'Mark as unread' : 'Mark as read'}
                  style={{
                    background: 'none',
                    border: 'none',
                    fontSize: '14px',
                    color: '#534439',
                    cursor: 'pointer',
                    padding: '4px'
                  }}
                >
                  {item.read ? '✉️' : '👁️'}
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  title="Dismiss notification"
                  style={{
                    background: 'none',
                    border: 'none',
                    fontSize: '14px',
                    color: '#ba1a1a',
                    cursor: 'pointer',
                    padding: '4px'
                  }}
                >
                  ✕
                </button>
              </div>
            </div>
          ))
        ) : (
          <div
            style={{
              backgroundColor: '#fff8f5',
              border: '1px solid #d8c3b5',
              borderRadius: '8px',
              padding: '40px',
              textAlign: 'center',
              color: '#857468',
              fontSize: '14px'
            }}
          >
            No notifications found in this category.
          </div>
        )}
      </div>
    </div>
  );
};

export default Notifications;