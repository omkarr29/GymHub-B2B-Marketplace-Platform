import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const CustomerNotifications = () => {
  const [filterType, setFilterType] = useState('All');

  const initialNotifications = [
    {
      id: 1,
      title: 'Order Shipped',
      description: 'Your order ORD-8938 (Commercial Power Rack with Pulley) has been dispatched by Apex Fitness Gear.',
      category: 'Order',
      time: '2 hours ago',
      read: false,
      icon: '🚚',
      actionLink: '/customer/orders',
    },
    {
      id: 2,
      title: 'Payment Confirmed',
      description: 'Payment of ₹1,80,000 for order ORD-8920 was received and verified.',
      category: 'Payment',
      time: '1 day ago',
      read: false,
      icon: '💳',
      actionLink: '/customer/orders',
    },
    {
      id: 3,
      title: 'Order Delivered',
      description: 'ORD-8920 (Commercial Spin Bike Pro x4) was delivered and marked complete.',
      category: 'Order',
      time: '2 days ago',
      read: true,
      icon: '✅',
      actionLink: '/customer/orders',
    },
    {
      id: 4,
      title: 'Price Drop on Saved Product',
      description: 'Olympic Urethane Weight Plates Set (250kg) dropped 8% in price this week.',
      category: 'Product',
      time: '3 days ago',
      read: true,
      icon: '🏷️',
      actionLink: '/customer/products',
    },
    {
      id: 5,
      title: 'Supplier Message',
      description: 'FitPro Industrial Ltd replied regarding your bulk quote request.',
      category: 'Message',
      time: '4 days ago',
      read: true,
      icon: '💬',
      actionLink: '/customer/orders',
    },
  ];

  const [notifications, setNotifications] = useState(initialNotifications);

  const filteredNotifications = notifications.filter((item) => {
    if (filterType === 'Unread') return !item.read;
    if (filterType === 'All') return true;
    return item.category === filterType;
  });

  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  const handleToggleRead = (id) => {
    setNotifications(notifications.map((n) => (n.id === id ? { ...n, read: !n.read } : n)));
  };

  const handleDeleteNotification = (id) => {
    setNotifications(notifications.filter((n) => n.id !== id));
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div style={{ padding: '24px', backgroundColor: '#fff8f5', minHeight: '100%', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Page Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <h1 style={{ margin: 0, fontSize: '24px', fontWeight: '700', color: '#211a16' }}>
              Notifications
            </h1>
            {unreadCount > 0 && (
              <span
                style={{
                  padding: '2px 8px',
                  backgroundColor: '#ba1a1a',
                  color: '#ffffff',
                  borderRadius: '9999px',
                  fontSize: '12px',
                  fontWeight: '700',
                }}
              >
                {unreadCount} new
              </span>
            )}
          </div>
          <p style={{ margin: '4px 0 0', fontSize: '13px', color: '#534439' }}>
            Order updates, payment confirmations, and messages from suppliers.
          </p>
        </div>

        {unreadCount > 0 && (
          <button
            onClick={handleMarkAllAsRead}
            style={{
              padding: '8px 14px',
              backgroundColor: '#ffffff',
              border: '1px solid #d8c3b5',
              borderRadius: '6px',
              color: '#8c4f16',
              fontWeight: '600',
              fontSize: '13px',
              cursor: 'pointer',
            }}
          >
            Mark all as read
          </button>
        )}
      </div>

      {/* Filter Tabs */}
      <div
        style={{
          backgroundColor: '#ffffff',
          border: '1px solid #ede0d9',
          borderRadius: '8px',
          padding: '12px 16px',
          display: 'flex',
          gap: '8px',
          overflowX: 'auto',
        }}
      >
        {['All', 'Unread', 'Order', 'Payment', 'Product', 'Message'].map((tab) => (
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
              whiteSpace: 'nowrap',
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
                backgroundColor: item.read ? '#ffffff' : '#fff1e9',
                border: item.read ? '1px solid #ede0d9' : '1px solid #e29657',
                borderRadius: '12px',
                padding: '16px 20px',
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                gap: '16px',
                flexWrap: 'wrap',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                <span style={{ fontSize: '22px', marginTop: '2px' }}>{item.icon}</span>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <h3 style={{ margin: 0, fontSize: '15px', fontWeight: '700', color: '#211a16' }}>
                      {item.title}
                    </h3>
                    {!item.read && (
                      <span
                        style={{
                          width: '8px',
                          height: '8px',
                          borderRadius: '9999px',
                          backgroundColor: '#ba1a1a',
                          display: 'inline-block',
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
                    fontWeight: '600',
                  }}
                >
                  View
                </Link>
                <button
                  onClick={() => handleToggleRead(item.id)}
                  title={item.read ? 'Mark as unread' : 'Mark as read'}
                  style={{ background: 'none', border: 'none', fontSize: '14px', color: '#534439', cursor: 'pointer', padding: '4px' }}
                >
                  {item.read ? '✉️' : '👁️'}
                </button>
                <button
                  onClick={() => handleDeleteNotification(item.id)}
                  title="Delete notification"
                  style={{ background: 'none', border: 'none', fontSize: '14px', color: '#ba1a1a', cursor: 'pointer', padding: '4px' }}
                >
                  ✕
                </button>
              </div>
            </div>
          ))
        ) : (
          <div
            style={{
              backgroundColor: '#ffffff',
              border: '1px solid #ede0d9',
              borderRadius: '16px',
              padding: '48px',
              textAlign: 'center',
              color: '#857468',
              fontSize: '14px',
            }}
          >
            No notifications in this category.
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerNotifications;
