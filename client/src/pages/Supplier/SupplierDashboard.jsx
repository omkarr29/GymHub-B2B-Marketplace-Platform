import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.07 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
};

const SupplierDashboard = () => {
  // Requirement #8: Dashboard Statistics Dummy Values
  const stats = [
    { title: 'Total Revenue', value: '₹8,45,600', sub: 'Gross platform sales', icon: '💰', color: '#8c4f16' },
    { title: 'Total Orders', value: '356', sub: '24 orders pending', icon: '🛒', color: '#00687a' },
    { title: 'Total Products', value: '128', sub: '112 Active / 16 Pending', icon: '📦', color: '#79573d' },
    { title: 'Pending Orders', value: '24', sub: 'Action required', icon: '⏳', color: '#ba1a1a' }
  ];

  // Requirement #33: Business Insights Cards
  const insights = [
    { label: 'Top Selling Product', value: 'Commercial Treadmill T-900', note: '68 units sold' },
    { label: 'Best Customer', value: 'IronFit Gym & Studios', note: '₹3,40,000 total purchases' },
    { label: 'Average Order Value', value: '₹35,200', note: '+8% vs last quarter' },
    { label: 'Low Stock Items', value: '3 Products', note: 'Needs immediate reorder' }
  ];

  // Requirement #10: Recent Orders Table Dummy Dataset
  const recentOrders = [
    {
      id: '#GH-1024',
      customer: 'IronFit Gym',
      product: 'Commercial Treadmill T-900',
      quantity: 2,
      amount: '₹1,70,000',
      payment: 'Paid',
      status: 'Processing',
      date: '18 Aug 2026'
    },
    {
      id: '#GH-1023',
      customer: 'Alpha Fitness Club',
      product: 'Olympic Rubber Plates (150kg Set)',
      quantity: 5,
      amount: '₹1,42,500',
      payment: 'Paid',
      status: 'Shipped',
      date: '17 Aug 2026'
    },
    {
      id: '#GH-1022',
      customer: 'PowerHouse Fitness',
      product: 'Dual Cable Cross Station',
      quantity: 1,
      amount: '₹98,000',
      payment: 'Pending',
      status: 'Pending',
      date: '16 Aug 2026'
    },
    {
      id: '#GH-1020',
      customer: 'FitZone Studio',
      product: 'Air Rowing Machine',
      quantity: 3,
      amount: '₹1,62,000',
      payment: 'Paid',
      status: 'Delivered',
      date: '15 Aug 2026'
    }
  ];

  // Requirement #12: Low Stock Products Data
  const lowStockItems = [
    { product: 'Olympic 20kg Hard Chrome Barbell', currentStock: 4, minStock: 10, status: 'Low Stock' },
    { product: 'Adjustable Commercial Incline Bench', currentStock: 2, minStock: 8, status: 'Low Stock' },
    { product: 'Cast Iron Kettlebell 24kg', currentStock: 0, minStock: 15, status: 'Out of Stock' }
  ];

  // Requirement #13: Recent Supplier Activity Feed
  const activities = [
    { text: 'New wholesale order received from IronFit Gym (#GH-1024)', time: '20 mins ago', icon: '🛒' },
    { text: 'Commercial Treadmill T-900 approved by Admin team', time: '2 hours ago', icon: '✅' },
    { text: 'Stock updated for Hex Dumbbells Set (2.5kg - 25kg)', time: '5 hours ago', icon: '📋' },
    { text: 'Inquiry received from PowerHouse Fitness on bulk MOQ', time: '1 day ago', icon: '💬' },
    { text: 'Order #GH-1021 marked as Shipped via BLUEDART Freight', time: '2 days ago', icon: '🚚' }
  ];

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
      <span style={{ padding: '3px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: '600', backgroundColor: bg, color: color }}>
        {status}
      </span>
    );
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Page Title & Subtitle */}
      <div>
        <h1 style={{ margin: 0, fontSize: '24px', fontWeight: '600', color: '#211a16' }}>
          Supplier Dashboard
        </h1>
        <p style={{ margin: '4px 0 0', fontSize: '14px', color: '#534439' }}>
          Manage your products, inventory and customer orders from one place.
        </p>
      </div>

      {/* Requirement #9: Quick Actions Bar */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        style={{
          backgroundColor: '#fff8f5',
          border: '1px solid #d8c3b5',
          borderRadius: '8px',
          padding: '16px',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          gap: '12px'
        }}
      >
        <span style={{ fontSize: '13px', fontWeight: '600', color: '#211a16', marginRight: '8px' }}>
          Quick Actions:
        </span>
        <Link
          to="/supplier/products/add"
          style={{
            padding: '8px 14px',
            backgroundColor: '#8c4f16',
            color: '#ffffff',
            borderRadius: '6px',
            textDecoration: 'none',
            fontSize: '13px',
            fontWeight: '600',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          <span>＋</span> Add Product
        </Link>
        <Link
          to="/supplier/products"
          style={{
            padding: '8px 14px',
            backgroundColor: '#fff1e9',
            border: '1px solid #d8c3b5',
            color: '#211a16',
            borderRadius: '6px',
            textDecoration: 'none',
            fontSize: '13px',
            fontWeight: '500'
          }}
        >
          Manage Products
        </Link>
        <Link
          to="/supplier/inventory"
          style={{
            padding: '8px 14px',
            backgroundColor: '#fff1e9',
            border: '1px solid #d8c3b5',
            color: '#211a16',
            borderRadius: '6px',
            textDecoration: 'none',
            fontSize: '13px',
            fontWeight: '500'
          }}
        >
          Manage Inventory
        </Link>
        <Link
          to="/supplier/orders"
          style={{
            padding: '8px 14px',
            backgroundColor: '#fff1e9',
            border: '1px solid #d8c3b5',
            color: '#211a16',
            borderRadius: '6px',
            textDecoration: 'none',
            fontSize: '13px',
            fontWeight: '500'
          }}
        >
          View Orders
        </Link>
      </motion.div>

      {/* Requirement #8: KPI Statistics Cards */}
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
        {stats.map((stat, idx) => (
          <motion.div
            key={idx}
            variants={itemVariants}
            whileHover={{ y: -3, boxShadow: '0 6px 16px rgba(140, 79, 22, 0.08)' }}
            style={{
              backgroundColor: '#fff1e9',
              border: '1px solid #d8c3b5',
              borderRadius: '8px',
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '13px', color: '#534439', fontWeight: '500' }}>{stat.title}</span>
              <span style={{ fontSize: '18px' }}>{stat.icon}</span>
            </div>
            <div style={{ fontSize: '26px', fontWeight: '700', color: stat.color }}>{stat.value}</div>
            <span style={{ fontSize: '11px', color: '#79573d' }}>{stat.sub}</span>
          </motion.div>
        ))}
      </motion.div>

      {/* Requirement #33: Business Insights Row */}
      <div
        style={{
          backgroundColor: '#fff8f5',
          border: '1px solid #d8c3b5',
          borderRadius: '8px',
          padding: '18px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '16px'
        }}
      >
        {insights.map((ins, idx) => (
          <div key={idx} style={{ borderRight: idx !== insights.length - 1 ? '1px solid #ede0d9' : 'none', paddingRight: '12px' }}>
            <span style={{ fontSize: '11px', color: '#857468', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              {ins.label}
            </span>
            <div style={{ fontSize: '14px', fontWeight: '600', color: '#211a16', marginTop: '2px' }}>
              {ins.value}
            </div>
            <span style={{ fontSize: '11px', color: '#00687a' }}>{ins.note}</span>
          </div>
        ))}
      </div>

      {/* Two Column Layout: Recent Orders + Activity & Low Stock */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '24px' }}>
        {/* Requirement #10: Recent Orders Table */}
        <div
          style={{
            backgroundColor: '#fff8f5',
            border: '1px solid #d8c3b5',
            borderRadius: '8px',
            padding: '20px',
            overflowX: 'auto'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
            <h2 style={{ margin: 0, fontSize: '17px', fontWeight: '600', color: '#211a16' }}>
              Recent Orders
            </h2>
            <Link to="/supplier/orders" style={{ fontSize: '12px', color: '#8c4f16', textDecoration: 'none', fontWeight: '600' }}>
              View All Orders →
            </Link>
          </div>

          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '12px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #d8c3b5', color: '#534439' }}>
                <th style={{ padding: '8px 4px' }}>Order ID</th>
                <th style={{ padding: '8px 4px' }}>Customer</th>
                <th style={{ padding: '8px 4px' }}>Product</th>
                <th style={{ padding: '8px 4px' }}>Qty</th>
                <th style={{ padding: '8px 4px' }}>Amount</th>
                <th style={{ padding: '8px 4px' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((ord) => (
                <tr key={ord.id} style={{ borderBottom: '1px solid #ede0d9' }}>
                  <td style={{ padding: '10px 4px', fontWeight: '600', color: '#8c4f16' }}>{ord.id}</td>
                  <td style={{ padding: '10px 4px', color: '#211a16' }}>{ord.customer}</td>
                  <td style={{ padding: '10px 4px', color: '#534439' }}>{ord.product}</td>
                  <td style={{ padding: '10px 4px', color: '#211a16' }}>{ord.quantity}</td>
                  <td style={{ padding: '10px 4px', fontWeight: '600', color: '#211a16' }}>{ord.amount}</td>
                  <td style={{ padding: '10px 4px' }}>{getOrderStatusBadge(ord.status)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Right Column: Low Stock Alerts + Activity Feed */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Requirement #12: Low Stock Products */}
          <div
            style={{
              backgroundColor: '#fff8f5',
              border: '1px solid #d8c3b5',
              borderRadius: '8px',
              padding: '20px'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <h2 style={{ margin: 0, fontSize: '16px', fontWeight: '600', color: '#ba1a1a' }}>
                ⚠️ Low Stock Products
              </h2>
              <Link to="/supplier/inventory" style={{ fontSize: '12px', color: '#8c4f16', textDecoration: 'none', fontWeight: '600' }}>
                Inventory →
              </Link>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {lowStockItems.map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '8px 12px',
                    backgroundColor: '#fff1e9',
                    borderRadius: '6px',
                    border: '1px solid #ede0d9',
                    fontSize: '12px'
                  }}
                >
                  <div>
                    <div style={{ fontWeight: '600', color: '#211a16' }}>{item.product}</div>
                    <div style={{ color: '#857468', fontSize: '11px' }}>
                      Stock: <strong style={{ color: '#ba1a1a' }}>{item.currentStock}</strong> (Min: {item.minStock})
                    </div>
                  </div>
                  <Link
                    to="/supplier/inventory"
                    style={{
                      padding: '4px 8px',
                      backgroundColor: '#8c4f16',
                      color: '#ffffff',
                      borderRadius: '4px',
                      textDecoration: 'none',
                      fontSize: '11px',
                      fontWeight: '600'
                    }}
                  >
                    Update
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Requirement #13: Recent Activity */}
          <div
            style={{
              backgroundColor: '#fff8f5',
              border: '1px solid #d8c3b5',
              borderRadius: '8px',
              padding: '20px'
            }}
          >
            <h2 style={{ margin: '0 0 12px', fontSize: '16px', fontWeight: '600', color: '#211a16' }}>
              Recent Activity
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {activities.map((act, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '12px' }}>
                  <span>{act.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ color: '#211a16' }}>{act.text}</div>
                    <span style={{ color: '#857468', fontSize: '10px' }}>{act.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupplierDashboard;