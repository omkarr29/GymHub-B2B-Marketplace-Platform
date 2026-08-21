import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const initialNotifications = [
  {
    id: 1,
    title: 'New Order Received',
    description: 'Alpha Fitness Club placed order SORD-4471 for 2x Commercial Motorized Treadmill X9.',
    category: 'Order',
    time: '2 hours ago',
    read: false,
    icon: '🛒',
    actionLink: '/supplier/orders/SORD-4471',
  },
  {
    id: 2,
    title: 'Order Status Updated',
    description: 'SORD-4460 was marked as Shipped.',
    category: 'Order',
    time: '1 day ago',
    read: false,
    icon: '🚚',
    actionLink: '/supplier/orders/SORD-4460',
  },
  {
    id: 3,
    title: 'Product Approved',
    description: '"Percussion Massage & Foam Roller Recovery Kit" was approved and is now live.',
    category: 'Product',
    time: '2 days ago',
    read: true,
    icon: '✅',
    actionLink: '/supplier/products',
  },
  {
    id: 4,
    title: 'Product Rejected',
    description: '"Heavy-Duty Rowing Machine" needs updated specification details before approval.',
    category: 'Product',
    time: '3 days ago',
    read: true,
    icon: '⚠️',
    actionLink: '/supplier/products',
  },
  {
    id: 5,
    title: 'Low Stock Alert',
    description: '"Commercial Spin Bike Pro" has only 6 units left in stock.',
    category: 'Inventory',
    time: '3 days ago',
    read: true,
    icon: '📦',
    actionLink: '/supplier/inventory',
  },
  {
    id: 6,
    title: 'New Customer Inquiry',
    description: 'CoreFit Studios asked about bulk pricing on recovery kits.',
    category: 'Message',
    time: '3 days ago',
    read: true,
    icon: '💬',
    actionLink: '/supplier/messages',
  },
];

const SupplierNotifications = () => {
  const [filterType, setFilterType] = useState('All');
  const [notifications, setNotifications] = useState(initialNotifications);

  const filteredNotifications = notifications.filter((item) => {
    if (filterType === 'Unread') return !item.read;
    if (filterType === 'All') return true;
    return item.category === filterType;
  });

  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  const handleDeleteNotification = (id) => {
    setNotifications(notifications.filter((n) => n.id !== id));
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <h1 style={{ margin: 0, fontSize: '24px', fontWeight: '700', color: '#211a16' }}>Notifications</h1>
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
          <p style={{ margin: '4px 0 0', fontSize: '13px', color: '#79573d' }}>
            Order activity, product approvals, and buyer inquiries.
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
              color: '#00687a',
              fontWeight: '600',
              fontSize: '13px',
              cursor: 'pointer',
            }}
          >
            Mark all as read
          </button>
        )}
      </div>

      <div style={{ backgroundColor: '#ffffff', border: '1px solid #ede0d9', borderRadius: '8px', padding: '12px 16px', display: 'flex', gap: '8px', overflowX: 'auto' }}>
        {['All', 'Unread', 'Order', 'Product', 'Inventory', 'Message'].map((tab) => (
          <button
            key={tab}
            onClick={() => setFilterType(tab)}
            style={{
              padding: '6px 14px',
              borderRadius: '6px',
              border: 'none',
              backgroundColor: filterType === tab ? '#00687a' : '#fff1e9',
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

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {filteredNotifications.length > 0 ? (
          filteredNotifications.map((item) => (
            <div
              key={item.id}
              style={{
                backgroundColor: item.read ? '#ffffff' : '#fff1e9',
                border: item.read ? '1px solid #ede0d9' : '1px solid #57b3ca',
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
                  <h3 style={{ margin: 0, fontSize: '15px', fontWeight: '700', color: '#211a16' }}>{item.title}</h3>
                  <p style={{ margin: '4px 0 6px', fontSize: '13px', color: '#534439', lineHeight: '18px' }}>{item.description}</p>
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
                    color: '#00687a',
                    fontSize: '12px',
                    fontWeight: '600',
                  }}
                >
                  View
                </Link>
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
          <div style={{ backgroundColor: '#ffffff', border: '1px solid #ede0d9', borderRadius: '16px', padding: '48px', textAlign: 'center', color: '#857468', fontSize: '14px' }}>
            No notifications in this category.
          </div>
        )}
      </div>
    </div>
  );
};

export default SupplierNotifications;
