import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Package, CheckCircle2, Clock, ShoppingCart, IndianRupee, AlertTriangle } from 'lucide-react';
import { supplierProducts, supplierOrders, getStatusBadge } from './data.js';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

const SupplierDashboard = () => {
  const totalProducts = supplierProducts.length;
  const activeProducts = supplierProducts.filter((p) => p.status === 'Active').length;
  const pendingProducts = supplierProducts.filter((p) => p.status === 'Pending').length;
  const totalOrders = supplierOrders.length;
  const pendingOrders = supplierOrders.filter((o) => o.status === 'Pending' || o.status === 'Processing').length;
  const revenue = supplierOrders
    .filter((o) => o.payment === 'Paid')
    .reduce((sum, o) => sum + o.amount, 0);

  const lowStockProducts = supplierProducts.filter((p) => p.stock > 0 && p.stock <= 6);

  const stats = [
    { title: 'Total Products', value: totalProducts, icon: Package },
    { title: 'Active Products', value: activeProducts, icon: CheckCircle2 },
    { title: 'Pending Approval', value: pendingProducts, icon: Clock },
    { title: 'Total Orders', value: totalOrders, icon: ShoppingCart },
    { title: 'Pending Orders', value: pendingOrders, icon: Clock },
    { title: 'Revenue (Paid)', value: `₹${revenue.toLocaleString('en-IN')}`, icon: IndianRupee },
  ];

  const quickActions = [
    { label: 'Add Product', path: '/supplier/products/add', bg: '#00687a', text: '#ffffff' },
    { label: 'Manage Products', path: '/supplier/products', bg: '#fff1e9', text: '#8c4f16', border: '#d8c3b5' },
    { label: 'View Orders', path: '/supplier/orders', bg: '#fff1e9', text: '#8c4f16', border: '#d8c3b5' },
    { label: 'Update Inventory', path: '/supplier/inventory', bg: '#fff1e9', text: '#8c4f16', border: '#d8c3b5' },
    { label: 'Edit Business Profile', path: '/supplier/profile', bg: '#fff1e9', text: '#534439', border: '#d8c3b5' },
  ];

  const recentActivity = [
    { text: 'Order SORD-4471 marked as Processing.', time: '2 hours ago' },
    { text: '"Commercial Elliptical Cross Trainer" went out of stock.', time: '1 day ago' },
    { text: 'New message from CoreFit Studios about bulk pricing.', time: '3 days ago' },
    { text: '"Heavy-Duty Rowing Machine" submitted for admin approval.', time: '4 days ago' },
  ];

  return (
    <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <h1 style={{ margin: 0, fontSize: '24px', fontWeight: '700', color: '#211a16' }}>Supplier Dashboard</h1>
        <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: '#00687a' }}>
          Welcome back, FitPro Industrial Ltd — here's how your storefront is performing.
        </p>
      </div>

      {/* Stat Cards */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}
      >
        {stats.map((item, idx) => (
          <motion.div
            key={idx}
            variants={cardVariants}
            whileHover={{ y: -4, boxShadow: '0 8px 16px rgba(0, 104, 122, 0.08)' }}
            style={{
              backgroundColor: '#ffffff',
              border: '1px solid #d8c3b5',
              borderRadius: '12px',
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              transition: 'box-shadow 0.2s ease',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '13px', color: '#534439', fontWeight: '500' }}>{item.title}</span>
              <item.icon size={18} strokeWidth={2} color="#00687a" />
            </div>
            <div style={{ fontSize: '24px', fontWeight: '700', color: '#8c4f16' }}>{item.value}</div>
          </motion.div>
        ))}
      </motion.div>

      {/* Quick Actions */}
      <div>
        <h2 style={{ margin: '0 0 12px', fontSize: '16px', fontWeight: '700', color: '#211a16' }}>Quick Actions</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
          {quickActions.map((action) => (
            <Link
              key={action.path}
              to={action.path}
              style={{
                textDecoration: 'none',
                padding: '10px 18px',
                borderRadius: '8px',
                backgroundColor: action.bg,
                color: action.text,
                border: action.border ? `1px solid ${action.border}` : 'none',
                fontSize: '13px',
                fontWeight: '600',
              }}
            >
              {action.label}
            </Link>
          ))}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
        {/* Recent Orders */}
        <div style={{ backgroundColor: '#ffffff', border: '1px solid #ede0d9', borderRadius: '16px', padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
            <h3 style={{ margin: 0, fontSize: '15px', fontWeight: '700', color: '#211a16' }}>Recent Orders</h3>
            <Link to="/supplier/orders" style={{ fontSize: '12px', color: '#00687a', fontWeight: '600', textDecoration: 'none' }}>
              View all →
            </Link>
          </div>
          {supplierOrders.slice(0, 4).map((order) => {
            const badge = getStatusBadge(order.status);
            return (
              <div
                key={order.id}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '10px 0',
                  borderTop: '1px solid #f3e6de',
                }}
              >
                <div>
                  <p style={{ margin: 0, fontSize: '13px', fontWeight: '600', color: '#211a16' }}>{order.id}</p>
                  <p style={{ margin: '2px 0 0', fontSize: '12px', color: '#857468' }}>{order.customer}</p>
                </div>
                <span
                  style={{
                    fontSize: '11px',
                    fontWeight: '600',
                    color: badge.text,
                    backgroundColor: badge.bg,
                    padding: '2px 10px',
                    borderRadius: '9999px',
                  }}
                >
                  {order.status}
                </span>
              </div>
            );
          })}
        </div>

        {/* Low Stock Products */}
        <div style={{ backgroundColor: '#ffffff', border: '1px solid #ede0d9', borderRadius: '16px', padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
            <h3 style={{ margin: 0, fontSize: '15px', fontWeight: '700', color: '#211a16' }}>Low Stock Products</h3>
            <Link to="/supplier/inventory" style={{ fontSize: '12px', color: '#00687a', fontWeight: '600', textDecoration: 'none' }}>
              View inventory →
            </Link>
          </div>
          {lowStockProducts.length > 0 ? (
            lowStockProducts.map((p) => (
              <div
                key={p.id}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '10px 0',
                  borderTop: '1px solid #f3e6de',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <AlertTriangle size={14} strokeWidth={2} color="#ba1a1a" />
                  <p style={{ margin: 0, fontSize: '13px', color: '#211a16' }}>{p.name}</p>
                </div>
                <span style={{ fontSize: '12px', fontWeight: '600', color: '#ba1a1a' }}>{p.stock} left</span>
              </div>
            ))
          ) : (
            <p style={{ fontSize: '13px', color: '#857468', padding: '10px 0' }}>All products are sufficiently stocked.</p>
          )}
        </div>

        {/* Recent Activity */}
        <div style={{ backgroundColor: '#ffffff', border: '1px solid #ede0d9', borderRadius: '16px', padding: '20px', gridColumn: 'span 2' }}>
          <h3 style={{ margin: '0 0 14px', fontSize: '15px', fontWeight: '700', color: '#211a16' }}>Recent Activity</h3>
          {recentActivity.map((item, idx) => (
            <div
              key={idx}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '10px',
                padding: '9px 0',
                borderTop: idx > 0 ? '1px solid #f3e6de' : 'none',
              }}
            >
              <span style={{ width: '6px', height: '6px', borderRadius: '9999px', backgroundColor: '#00687a', marginTop: '6px', flexShrink: 0 }} />
              <div>
                <p style={{ margin: 0, fontSize: '13px', color: '#211a16' }}>{item.text}</p>
                <p style={{ margin: '2px 0 0', fontSize: '11px', color: '#857468' }}>{item.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SupplierDashboard;
