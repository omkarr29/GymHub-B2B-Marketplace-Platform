import React, { useState } from 'react';

const Notifications = () => {
  const [filterType, setFilterType] = useState('All');

  // Dummy platform alerts & notifications dataset
  const initialNotifications = [
    {
      id: 1,
      title: 'New Supplier KYC Verification Request',
      description: 'FitEquip India submitted GST and factory registration documents for platform onboarding.',
      category: 'Verification',
      time: '10 minutes ago',
      read: false,
      icon: '🛡️',
      actionLink: '/admin/verification'
    },
    {
      id: 2,
      title: 'New Product Awaiting Approval',
      description: 'Titan Fitness Gear uploaded "Dual Cable Cross Over Machine" to the catalog.',
      category: 'Product',
      time: '45 minutes ago',
      read: false,
      icon: '📦',
      actionLink: '/admin/products'
    },
    {
      id: 3,
      title: 'High-Value Wholesale Order Received',
      description: 'Alpha Fitness Club placed Order #ORD-5401 for ₹1,45,000.',
      category: 'Order',
      time: '2 hours ago',
      read: false,
      icon: '🛒',
      actionLink: '/admin/orders'
    },
    {
      id: 4,
      title: 'Payment Received Successfully',
      description: 'Payment of ₹82,000 for Order #ORD-5402 was verified via B2B NetBanking.',
      category: 'Payment',
      time: '5 hours ago',
      read: true,
      icon: '💳',
      actionLink: '/admin/orders'
    },
    {
      id: 5,
      title: 'New Customer Registered',
      description: 'Iron Core Gym created a new commercial buyer account.',
      category: 'User',
      time: '1 day ago',
      read: true,
      icon: '👤',
      actionLink: '/admin/users'
    },
    {
      id: 6,
      title: 'Product Catalog Listing Rejected',
      description: 'Listing for "Interlocking High-Density Gym Rubber Tiles" was rejected due to missing technical specs.',
      category: 'Product',
      time: '2 days ago',
      read: true,
      icon: '⚠️',
      actionLink: '/admin/products'
    }
  ];

  const [notifications, setNotifications] = useState(initialNotifications);

  // Filter Logic
  const filteredNotifications = notifications.filter((item) => {
    if (filterType === 'Unread') return !item.read;
    if (filterType === 'All') return true;
    return item.category === filterType;
  });

  // Mark all as read
  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  // Toggle single notification read state
  const handleToggleRead = (id) => {
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, read: !n.read } : n))
    );
  };

  // Delete notification
  const handleDeleteNotification = (id) => {
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
              Notifications & Alerts
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
                {unreadCount} new
              </span>
            )}
          </div>
          <p style={{ margin: '4px 0 0', fontSize: '14px', color: '#534439' }}>
            Real-time platform activity log and critical marketplace alerts.
          </p>
        </div>

        {unreadCount > 0 && (
          <button
            onClick={handleMarkAllAsRead}
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

      {/* Filter Tabs Bar */}
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
        {['All', 'Unread', 'Verification', 'Product', 'Order', 'Payment', 'User'].map((tab) => (
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
                transition: 'background-color 0.2s'
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

              {/* Action Buttons */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
                <a
                  href={item.actionLink}
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
                </a>
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
                  onClick={() => handleDeleteNotification(item.id)}
                  title="Delete notification"
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