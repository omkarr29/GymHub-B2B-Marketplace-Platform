import React from 'react';
import { Link } from 'react-router-dom';

// --- Sub-components for Clean Code ---

const StatCard = ({ title, value, subtitle, icon, bgColor, textColor }) => (
  <div style={styles.statCard}>
    <div>
      <p style={styles.statTitle}>{title}</p>
      <h3 style={styles.statValue}>{value}</h3>
      <p style={styles.statSubtitle}>{subtitle}</p>
    </div>
    <div style={{ ...styles.statIconContainer, backgroundColor: bgColor, color: textColor }}>
      {icon}
    </div>
  </div>
);

const QuickActionLink = ({ to, label, bg, text, border }) => (
  <Link
    to={to}
    style={{
      ...styles.quickActionBtn,
      backgroundColor: bg,
      color: text,
      border: border ? `1px solid ${border}` : 'none',
    }}
  >
    {label}
  </Link>
);

const ProductCard = ({ product }) => (
  <div style={styles.productCard}>
    <div>
      <div style={styles.productImageContainer}>
        <img src={product.image} alt={product.name} style={styles.productImg} />
        <span style={styles.productRatingBadge}>★ {product.rating}</span>
      </div>
      <div style={styles.productMetaContainer}>
        <span style={styles.productCategory}>{product.category}</span>
        <h4 style={styles.productName}>{product.name}</h4>
        <p style={styles.productSupplier}>By {product.supplier}</p>
      </div>
    </div>

    <div style={styles.productFooter}>
      <div style={styles.productPricingRow}>
        <span style={styles.productPrice}>₹{product.price.toLocaleString('en-IN')}</span>
        <span style={styles.productStock}>{product.stock}</span>
      </div>
      <Link to={`/customer/product/${product.id}`} style={styles.productActionLink}>
        View Quotation & Specs
      </Link>
    </div>
  </div>
);

const OrderStatusBadge = ({ status, color, bg }) => (
  <span style={{ ...styles.statusBadge, color, backgroundColor: bg }}>
    {status}
  </span>
);

// --- Main Dashboard Component ---

const CustomerDashboard = () => {
  const iconStyle = {
    width: '24px',
    height: '24px',
    minWidth: '24px',
    minHeight: '24px',
    display: 'inline-block',
  };

  const stats = [
    {
      title: 'Total Orders',
      value: '24',
      subtitle: '₹8,45,000 lifetime',
      icon: (
        <svg style={iconStyle} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      ),
      bgColor: '#fff1e9',
      textColor: '#8c4f16',
    },
    {
      title: 'Pending Orders',
      value: '5',
      subtitle: 'In dispatch / transit',
      icon: (
        <svg style={iconStyle} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      bgColor: '#fed1b0',
      textColor: '#79573d',
    },
    {
      title: 'Completed Orders',
      value: '19',
      subtitle: 'Delivered & verified',
      icon: (
        <svg style={iconStyle} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      bgColor: '#57b3ca',
      textColor: '#00687a',
    },
    {
      title: 'Saved Products',
      value: '12',
      subtitle: 'Procurement shortlist',
      icon: (
        <svg style={iconStyle} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
        </svg>
      ),
      bgColor: '#ede0d9',
      textColor: '#534439',
    },
  ];

  const quickActions = [
    { label: 'Browse Products', path: '/customer/products', bg: '#8c4f16', text: '#ffffff' },
    { label: 'Track Orders', path: '/customer/orders', bg: '#fff1e9', text: '#8c4f16', border: '#d8c3b5' },
    { label: 'AI Equipment Advisor', path: '/customer/ai-assistant', bg: '#00687a', text: '#ffffff' },
    { label: 'Business Profile', path: '/customer/profile', bg: '#fff1e9', text: '#534439', border: '#d8c3b5' },
  ];

  const recommendedProducts = [
    {
      id: 'prod-1',
      name: 'Commercial Motorized Treadmill X9',
      category: 'Cardio Equipment',
      supplier: 'FitPro Industrial Ltd',
      price: 145000,
      rating: 4.8,
      stock: 'In Stock',
      image: 'https://images.unsplash.com/photo-1576678927484-cc907957088c?w=500&auto=format&fit=crop&q=60',
    },
    {
      id: 'prod-2',
      name: 'Olympic Heavy-Duty Flat Bench',
      category: 'Strength Equipment',
      supplier: 'IronGrip Manufacturing',
      price: 28500,
      rating: 4.9,
      stock: 'In Stock',
      image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=500&auto=format&fit=crop&q=60',
    },
    {
      id: 'prod-3',
      name: 'Dual Cable Crossover Station',
      category: 'Commercial Gym Equipment',
      supplier: 'Apex Fitness Gear',
      price: 220000,
      rating: 4.7,
      stock: 'Limited Stock',
      image: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=500&auto=format&fit=crop&q=60',
    },
    {
      id: 'prod-4',
      name: 'Commercial Rubber Gym Flooring (1000 sq ft)',
      category: 'Gym Flooring',
      supplier: 'ToughTile Surfaces',
      price: 85000,
      rating: 4.9,
      stock: 'In Stock',
      image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=500&auto=format&fit=crop&q=60',
    },
  ];

  const recentOrders = [
    {
      id: 'ORD-8941',
      product: 'Adjustable Urethane Dumbbell Set (5-50kg)',
      supplier: 'IronGrip Manufacturing',
      amount: '₹64,000',
      status: 'Processing',
      statusColor: '#79573d',
      statusBg: '#fed1b0',
      date: 'Aug 17, 2026',
    },
    {
      id: 'ORD-8938',
      product: 'Commercial Power Rack with Pulley',
      supplier: 'Apex Fitness Gear',
      amount: '₹1,15,000',
      status: 'Shipped',
      statusColor: '#00687a',
      statusBg: '#57b3ca33',
      date: 'Aug 14, 2026',
    },
    {
      id: 'ORD-8920',
      product: 'Commercial Spin Bike Pro (x4 Units)',
      supplier: 'FitPro Industrial Ltd',
      amount: '₹1,80,000',
      status: 'Delivered',
      statusColor: '#15803d',
      statusBg: '#dcfce7',
      date: 'Aug 05, 2026',
    },
  ];

  return (
    <div style={styles.pageContainer}>
      {/* Welcome Banner */}
      <div style={styles.welcomeBanner}>
        <span style={styles.verifiedTag}>Verified Gym Owner</span>
        <h1 style={styles.welcomeTitle}>Welcome back, Metro Fitness</h1>
        <p style={styles.welcomeDesc}>
          Manage commercial equipment sourcing, track bulk dispatches, and get direct quotation deals from certified manufacturers.
        </p>

        <div style={styles.quickActionsContainer}>
          {quickActions.map((action, idx) => (
            <QuickActionLink key={idx} to={action.path} label={action.label} bg={action.bg} text={action.text} border={action.border} />
          ))}
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div style={styles.statsGrid}>
        {stats.map((stat, idx) => (
          <StatCard key={idx} {...stat} />
        ))}
      </div>

      {/* Recommended B2B Products */}
      <div style={styles.sectionBlock}>
        <div style={styles.sectionHeader}>
          <div>
            <h2 style={styles.sectionHeading}>Recommended for Your Gym</h2>
            <p style={styles.sectionSubtext}>Commercial grade equipment with factory wholesale rates</p>
          </div>
          <Link to="/customer/products" style={styles.viewAllLink}>
            View Full Catalog &rarr;
          </Link>
        </div>

        <div style={styles.productGrid}>
          {recommendedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      {/* Recent Orders Section */}
      <div style={styles.recentOrdersCard}>
        <div style={styles.sectionHeader}>
          <div>
            <h2 style={styles.sectionHeading}>Recent Sourcing Orders</h2>
            <p style={styles.sectionSubtext}>Latest supplier shipments and status updates</p>
          </div>
          <Link to="/customer/orders" style={styles.viewAllLink}>
            All Orders ({stats[0].value}) &rarr;
          </Link>
        </div>

        <div style={styles.tableWrapper}>
          <table style={styles.table}>
            <thead>
              <tr style={styles.tableHeaderRow}>
                <th style={{ ...styles.tableHeaderTh, borderRadius: '6px 0 0 6px' }}>Order ID</th>
                <th style={styles.tableHeaderTh}>Equipment / Product</th>
                <th style={styles.tableHeaderTh}>Supplier</th>
                <th style={styles.tableHeaderTh}>Amount</th>
                <th style={styles.tableHeaderTh}>Status</th>
                <th style={styles.tableHeaderTh}>Date</th>
                <th style={{ ...styles.tableHeaderTh, textAlign: 'right', borderRadius: '0 6px 6px 0' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order, idx) => (
                <tr key={order.id} style={{ borderBottom: idx !== recentOrders.length - 1 ? '1px solid #ede0d9' : 'none' }}>
                  <td style={styles.tdBold}>{order.id}</td>
                  <td style={styles.tdProduct}>{order.product}</td>
                  <td style={styles.tdSupplier}>{order.supplier}</td>
                  <td style={styles.tdAmount}>{order.amount}</td>
                  <td style={styles.tdCell}>
                    <OrderStatusBadge status={order.status} color={order.statusColor} bg={order.statusBg} />
                  </td>
                  <td style={styles.tdDate}>{order.date}</td>
                  <td style={styles.tdAction}>
                    <Link to={`/customer/orders/${order.id}`} style={styles.tdDetailLink}>
                      Details &rarr;
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// STYLES OBJECT
// ==========================================
const styles = {
  pageContainer: {
    padding: '24px',
    backgroundColor: '#fff8f5',
    minHeight: '100%',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    gap: '28px',
  },
  welcomeBanner: {
    padding: '28px',
    borderRadius: '16px',
    backgroundColor: '#fff1e9',
    border: '1px solid #d8c3b5',
    boxSizing: 'border-box',
  },
  verifiedTag: {
    display: 'inline-block',
    padding: '4px 12px',
    marginBottom: '12px',
    fontSize: '11px',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    borderRadius: '9999px',
    backgroundColor: '#fed1b0',
    color: '#79573d',
  },
  welcomeTitle: {
    margin: 0,
    fontSize: '24px',
    fontWeight: '700',
    color: '#211a16',
  },
  welcomeDesc: {
    margin: '8px 0 0 0',
    fontSize: '14px',
    color: '#534439',
    maxWidth: '640px',
    lineHeight: '1.5',
  },
  quickActionsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px',
    marginTop: '18px',
  },
  quickActionBtn: {
    padding: '8px 16px',
    fontSize: '13px',
    fontWeight: '600',
    borderRadius: '8px',
    textDecoration: 'none',
    boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '16px',
  },
  statCard: {
    padding: '18px',
    borderRadius: '12px',
    backgroundColor: '#ffffff',
    border: '1px solid #ede0d9',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  statTitle: {
    margin: 0,
    fontSize: '11px',
    fontWeight: '700',
    textTransform: 'uppercase',
    color: '#79573d',
  },
  statValue: {
    margin: '4px 0 0 0',
    fontSize: '22px',
    fontWeight: '800',
    color: '#211a16',
  },
  statSubtitle: {
    margin: '2px 0 0 0',
    fontSize: '11px',
    color: '#857468',
  },
  statIconContainer: {
    padding: '10px',
    borderRadius: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  sectionBlock: {
    display: 'flex',
    flexDirection: 'column',
    gap: '14px',
  },
  sectionHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: '8px',
  },
  sectionHeading: {
    margin: 0,
    fontSize: '18px',
    fontWeight: '700',
    color: '#211a16',
  },
  sectionSubtext: {
    margin: '2px 0 0 0',
    fontSize: '12px',
    color: '#79573d',
  },
  viewAllLink: {
    fontSize: '13px',
    fontWeight: '600',
    color: '#8c4f16',
    textDecoration: 'none',
  },
  productGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
    gap: '16px',
  },
  productCard: {
    borderRadius: '12px',
    border: '1px solid #ede0d9',
    backgroundColor: '#ffffff',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  productImageContainer: {
    height: '150px',
    position: 'relative',
    overflow: 'hidden',
    backgroundColor: '#ede0d9',
  },
  productImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  productRatingBadge: {
    position: 'absolute',
    top: '8px',
    right: '8px',
    fontSize: '11px',
    fontWeight: '700',
    padding: '2px 8px',
    borderRadius: '9999px',
    backgroundColor: '#fff1e9',
    color: '#8c4f16',
  },
  productMetaContainer: {
    padding: '12px',
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  productCategory: {
    fontSize: '10px',
    fontWeight: '700',
    textTransform: 'uppercase',
    color: '#00687a',
  },
  productName: {
    margin: 0,
    fontSize: '13px',
    fontWeight: '600',
    color: '#211a16',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  productSupplier: {
    margin: 0,
    fontSize: '11px',
    color: '#79573d',
  },
  productFooter: {
    padding: '12px',
    paddingTop: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  productPricingRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  productPrice: {
    fontSize: '15px',
    fontWeight: '700',
    color: '#8c4f16',
  },
  productStock: {
    fontSize: '10px',
    fontWeight: '600',
    color: '#15803d',
    backgroundColor: '#dcfce7',
    padding: '2px 6px',
    borderRadius: '4px',
  },
  productActionLink: {
    display: 'block',
    textAlign: 'center',
    padding: '8px',
    fontSize: '12px',
    fontWeight: '600',
    borderRadius: '6px',
    textDecoration: 'none',
    backgroundColor: '#fff1e9',
    color: '#8c4f16',
    border: '1px solid #d8c3b5',
  },
  recentOrdersCard: {
    borderRadius: '16px',
    border: '1px solid #ede0d9',
    backgroundColor: '#ffffff',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '14px',
  },
  tableWrapper: {
    overflowX: 'auto',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    textAlign: 'left',
    fontSize: '13px',
  },
  tableHeaderRow: {
    backgroundColor: '#fff1e9',
    color: '#534439',
  },
  tableHeaderTh: {
    padding: '10px 12px',
    fontWeight: '600',
  },
  tdBold: {
    padding: '12px',
    fontWeight: '700',
    color: '#211a16',
  },
  tdProduct: {
    padding: '12px',
    fontWeight: '500',
    color: '#211a16',
    maxWidth: '220px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  tdSupplier: {
    padding: '12px',
    color: '#79573d',
  },
  tdAmount: {
    padding: '12px',
    fontWeight: '700',
    color: '#8c4f16',
  },
  tdCell: {
    padding: '12px',
  },
  tdDate: {
    padding: '12px',
    fontSize: '12px',
    color: '#857468',
  },
  tdAction: {
    padding: '12px',
    textAlign: 'right',
  },
  tdDetailLink: {
    fontSize: '12px',
    fontWeight: '600',
    color: '#00687a',
    textDecoration: 'none',
  },
  statusBadge: {
    padding: '3px 8px',
    fontSize: '11px',
    fontWeight: '600',
    borderRadius: '9999px',
  },
};

export default CustomerDashboard;