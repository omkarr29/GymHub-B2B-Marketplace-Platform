import React from 'react';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
};

const AdminDashboard = () => {
  const stats = [
    { title: 'Total Customers', value: '1,248', icon: '👥', change: '+12% from last month' },
    { title: 'Total Suppliers', value: '86', icon: '🏭', change: '+5 new this week' },
    { title: 'Total Products', value: '542', icon: '📦', change: '+28 added recently' },
    { title: 'Total Orders', value: '324', icon: '🛒', change: '+18% growth' }
  ];

  const pendingActions = [
    { title: 'Supplier Verifications', count: 12, status: 'Pending Review', color: '#ba1a1a', link: '/admin/verification' },
    { title: 'Products Awaiting Approval', count: 8, status: 'Action Required', color: '#e29657', link: '/admin/products' },
    { title: 'Orders Processing', count: 24, status: 'In Fulfillment', color: '#00687a', link: '/admin/orders' }
  ];

  const recentOrders = [
    { id: 'GH-1024', customer: 'Alpha Fitness Club', supplier: 'FitEquip India', amount: '₹1,45,000', payment: 'Paid', status: 'Processing', date: '16 Aug 2026' },
    { id: 'GH-1023', customer: 'Iron Core Gym', supplier: 'ProGym Solutions', amount: '₹82,000', payment: 'Paid', status: 'Shipped', date: '15 Aug 2026' },
    { id: 'GH-1022', customer: 'Muscle Peak Studio', supplier: 'Titan Fitness Gear', amount: '₹2,10,000', payment: 'Pending', status: 'Pending', date: '15 Aug 2026' },
    { id: 'GH-1021', customer: 'Zenith Health Club', supplier: 'FitEquip India', amount: '₹34,500', payment: 'Paid', status: 'Delivered', date: '14 Aug 2026' }
  ];

  const activities = [
    { text: 'FitEquip India submitted documents for verification', time: '10 mins ago' },
    { text: 'New order #GH-1024 placed by Alpha Fitness Club', time: '45 mins ago' },
    { text: 'Titan Fitness Gear uploaded 4 new commercial treadmills', time: '2 hours ago' },
    { text: 'Supplier "Apex Gym Supply" was approved', time: '5 hours ago' }
  ];

  const getStatusBadge = (status) => {
    let bg = '#ede0d9';
    let text = '#211a16';

    if (status === 'Delivered' || status === 'Paid') {
      bg = '#e6f4ea';
      text = '#137333';
    } else if (status === 'Processing' || status === 'Shipped') {
      bg = '#57b3ca';
      text = '#ffffff';
    } else if (status === 'Pending') {
      bg = '#fed1b0';
      text = '#79573d';
    }

    return (
      <span style={{ padding: '4px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: '600', backgroundColor: bg, color: text }}>
        {status}
      </span>
    );
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <h1 style={{ margin: 0, fontSize: '24px', fontWeight: '600', color: '#211a16' }}>
          Good Morning, Admin
        </h1>
        <p style={{ margin: '4px 0 0', fontSize: '14px', color: '#534439' }}>
          Manage and monitor your GymHub marketplace.
        </p>
      </div>

      {/* Animated KPI Cards */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '16px'
        }}
      >
        {stats.map((item, idx) => (
          <motion.div
            key={idx}
            variants={cardVariants}
            whileHover={{ y: -4, boxShadow: '0 8px 16px rgba(140, 79, 22, 0.08)' }}
            style={{
              backgroundColor: '#fff1e9',
              border: '1px solid #d8c3b5',
              borderRadius: '8px',
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              transition: 'box-shadow 0.2s ease'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '14px', color: '#534439', fontWeight: '500' }}>{item.title}</span>
              <span style={{ fontSize: '20px' }}>{item.icon}</span>
            </div>
            <div style={{ fontSize: '28px', fontWeight: '700', color: '#8c4f16' }}>{item.value}</div>
            <span style={{ fontSize: '12px', color: '#79573d' }}>{item.change}</span>
          </motion.div>
        ))}
      </motion.div>

      {/* Action Required */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
        style={{
          backgroundColor: '#fff8f5',
          border: '1px solid #d8c3b5',
          borderRadius: '8px',
          padding: '20px'
        }}
      >
        <h2 style={{ margin: '0 0 16px', fontSize: '18px', fontWeight: '600', color: '#211a16' }}>
          Action Required
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
          {pendingActions.map((action, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -2 }}
              style={{
                border: '1px solid #ede0d9',
                backgroundColor: '#f9ebe4',
                borderRadius: '8px',
                padding: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <div style={{ fontSize: '18px', fontWeight: '700', color: action.color }}>
                  {action.count} Pending
                </div>
                <div style={{ fontSize: '13px', color: '#211a16', marginTop: '2px' }}>
                  {action.title}
                </div>
              </div>
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href={action.link}
                style={{
                  textDecoration: 'none',
                  fontSize: '12px',
                  fontWeight: '600',
                  color: '#8c4f16',
                  backgroundColor: '#fff8f5',
                  border: '1px solid #d8c3b5',
                  padding: '6px 12px',
                  borderRadius: '4px'
                }}
              >
                Review →
              </motion.a>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Orders & Activity */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.35, delay: 0.3 }}
          style={{
            backgroundColor: '#fff8f5',
            border: '1px solid #d8c3b5',
            borderRadius: '8px',
            padding: '20px',
            overflowX: 'auto'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h2 style={{ margin: 0, fontSize: '18px', fontWeight: '600', color: '#211a16' }}>
              Recent Orders
            </h2>
            <a href="/admin/orders" style={{ fontSize: '13px', color: '#8c4f16', textDecoration: 'none', fontWeight: '600' }}>
              View All
            </a>
          </div>

          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #d8c3b5', color: '#534439' }}>
                <th style={{ padding: '8px 4px' }}>Order ID</th>
                <th style={{ padding: '8px 4px' }}>Customer</th>
                <th style={{ padding: '8px 4px' }}>Amount</th>
                <th style={{ padding: '8px 4px' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => (
                <tr key={order.id} style={{ borderBottom: '1px solid #ede0d9' }}>
                  <td style={{ padding: '12px 4px', fontWeight: '600', color: '#211a16' }}>{order.id}</td>
                  <td style={{ padding: '12px 4px', color: '#534439' }}>{order.customer}</td>
                  <td style={{ padding: '12px 4px', fontWeight: '500', color: '#211a16' }}>{order.amount}</td>
                  <td style={{ padding: '12px 4px' }}>{getStatusBadge(order.status)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.35, delay: 0.3 }}
          style={{
            backgroundColor: '#fff8f5',
            border: '1px solid #d8c3b5',
            borderRadius: '8px',
            padding: '20px'
          }}
        >
          <h2 style={{ margin: '0 0 16px', fontSize: '18px', fontWeight: '600', color: '#211a16' }}>
            Recent Marketplace Activity
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {activities.map((item, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '12px',
                  padding: '10px 0',
                  borderBottom: idx !== activities.length - 1 ? '1px solid #ede0d9' : 'none'
                }}
              >
                <span style={{ fontSize: '14px', marginTop: '2px' }}>📌</span>
                <div style={{ flex: 1 }}>
                  <p style={{ margin: 0, fontSize: '13px', color: '#211a16', lineHeight: '18px' }}>
                    {item.text}
                  </p>
                  <span style={{ fontSize: '11px', color: '#857468' }}>{item.time}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard;