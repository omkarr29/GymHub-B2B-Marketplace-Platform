import React from 'react';
import { Link } from 'react-router-dom';

const CustomerDashboard = () => {
  const iconStyle = {
    width: '24px',
    height: '24px',
    minWidth: '24px',
    minHeight: '24px',
    display: 'inline-block',
  };

  // Realistic B2B Dummy Data
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
    { label: 'View Cart', path: '/customer/cart', bg: '#00687a', text: '#ffffff' },
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
    <div style={{ padding: '24px', backgroundColor: '#fff8f5', minHeight: '100%', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: '28px' }}>
      {/* Welcome Banner */}
      <div
        style={{
          padding: '28px',
          borderRadius: '16px',
          backgroundColor: '#fff1e9',
          border: '1px solid #d8c3b5',
          boxSizing: 'border-box',
        }}
      >
        <span
          style={{
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
          }}
        >
          Verified Gym Owner
        </span>
        <h1 style={{ margin: 0, fontSize: '24px', fontWeight: '700', color: '#211a16' }}>
          Welcome back, Metro Fitness
        </h1>
        <p style={{ margin: '8px 0 0 0', fontSize: '14px', color: '#534439', maxWidth: '640px', lineHeight: '1.5' }}>
          Manage commercial equipment sourcing, track bulk dispatches, and get direct quotation deals from certified manufacturers.
        </p>

        {/* Action Buttons */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '18px' }}>
          {quickActions.map((action, idx) => (
            <Link
              key={idx}
              to={action.path}
              style={{
                padding: '8px 16px',
                fontSize: '13px',
                fontWeight: '600',
                borderRadius: '8px',
                textDecoration: 'none',
                backgroundColor: action.bg,
                color: action.text,
                border: action.border ? `1px solid ${action.border}` : 'none',
                boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
              }}
            >
              {action.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '16px',
        }}
      >
        {stats.map((stat, idx) => (
          <div
            key={idx}
            style={{
              padding: '18px',
              borderRadius: '12px',
              backgroundColor: '#ffffff',
              border: '1px solid #ede0d9',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <p style={{ margin: 0, fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', color: '#79573d' }}>
                {stat.title}
              </p>
              <h3 style={{ margin: '4px 0 0 0', fontSize: '22px', fontWeight: '800', color: '#211a16' }}>
                {stat.value}
              </h3>
              <p style={{ margin: '2px 0 0 0', fontSize: '11px', color: '#857468' }}>
                {stat.subtitle}
              </p>
            </div>
            <div
              style={{
                padding: '10px',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: stat.bgColor,
                color: stat.textColor,
                flexShrink: 0,
              }}
            >
              {stat.icon}
            </div>
          </div>
        ))}
      </div>

      {/* Recommended B2B Products */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
          <div>
            <h2 style={{ margin: 0, fontSize: '18px', fontWeight: '700', color: '#211a16' }}>
              Recommended for Your Gym
            </h2>
            <p style={{ margin: '2px 0 0 0', fontSize: '12px', color: '#79573d' }}>
              Commercial grade equipment with factory wholesale rates
            </p>
          </div>
          <Link
            to="/customer/products"
            style={{ fontSize: '13px', fontWeight: '600', color: '#8c4f16', textDecoration: 'none' }}
          >
            View Full Catalog &rarr;
          </Link>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
            gap: '16px',
          }}
        >
          {recommendedProducts.map((product) => (
            <div
              key={product.id}
              style={{
                borderRadius: '12px',
                border: '1px solid #ede0d9',
                backgroundColor: '#ffffff',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <div style={{ height: '150px', position: 'relative', overflow: 'hidden', backgroundColor: '#ede0d9' }}>
                  <img
                    src={product.image}
                    alt={product.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <span
                    style={{
                      position: 'absolute',
                      top: '8px',
                      right: '8px',
                      fontSize: '11px',
                      fontWeight: '700',
                      padding: '2px 8px',
                      borderRadius: '9999px',
                      backgroundColor: '#fff1e9',
                      color: '#8c4f16',
                    }}
                  >
                    ★ {product.rating}
                  </span>
                </div>
                <div style={{ padding: '12px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <span style={{ fontSize: '10px', fontWeight: '700', textTransform: 'uppercase', color: '#00687a' }}>
                    {product.category}
                  </span>
                  <h4 style={{ margin: 0, fontSize: '13px', fontWeight: '600', color: '#211a16', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {product.name}
                  </h4>
                  <p style={{ margin: 0, fontSize: '11px', color: '#79573d' }}>
                    By {product.supplier}
                  </p>
                </div>
              </div>

              <div style={{ padding: '12px', paddingTop: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '15px', fontWeight: '700', color: '#8c4f16' }}>
                    ₹{product.price.toLocaleString('en-IN')}
                  </span>
                  <span style={{ fontSize: '10px', fontWeight: '600', color: '#15803d', backgroundColor: '#dcfce7', padding: '2px 6px', borderRadius: '4px' }}>
                    {product.stock}
                  </span>
                </div>
                <Link
                  to={`/customer/product/${product.id}`}
                  style={{
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
                  }}
                >
                  View Quotation & Specs
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Orders Section */}
      <div
        style={{
          borderRadius: '16px',
          border: '1px solid #ede0d9',
          backgroundColor: '#ffffff',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '14px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <h2 style={{ margin: 0, fontSize: '16px', fontWeight: '700', color: '#211a16' }}>
              Recent Sourcing Orders
            </h2>
            <p style={{ margin: '2px 0 0 0', fontSize: '12px', color: '#79573d' }}>
              Latest supplier shipments and status updates
            </p>
          </div>
          <Link
            to="/customer/orders"
            style={{ fontSize: '12px', fontWeight: '600', color: '#8c4f16', textDecoration: 'none' }}
          >
            All Orders ({stats[0].value}) &rarr;
          </Link>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
            <thead>
              <tr style={{ backgroundColor: '#fff1e9', color: '#534439' }}>
                <th style={{ padding: '10px 12px', fontWeight: '600', borderRadius: '6px 0 0 6px' }}>Order ID</th>
                <th style={{ padding: '10px 12px', fontWeight: '600' }}>Equipment / Product</th>
                <th style={{ padding: '10px 12px', fontWeight: '600' }}>Supplier</th>
                <th style={{ padding: '10px 12px', fontWeight: '600' }}>Amount</th>
                <th style={{ padding: '10px 12px', fontWeight: '600' }}>Status</th>
                <th style={{ padding: '10px 12px', fontWeight: '600' }}>Date</th>
                <th style={{ padding: '10px 12px', fontWeight: '600', textAlign: 'right', borderRadius: '0 6px 6px 0' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order, idx) => (
                <tr
                  key={order.id}
                  style={{
                    borderBottom: idx !== recentOrders.length - 1 ? '1px solid #ede0d9' : 'none',
                  }}
                >
                  <td style={{ padding: '12px', fontWeight: '700', color: '#211a16' }}>{order.id}</td>
                  <td style={{ padding: '12px', fontWeight: '500', color: '#211a16', maxWidth: '220px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {order.product}
                  </td>
                  <td style={{ padding: '12px', color: '#79573d' }}>{order.supplier}</td>
                  <td style={{ padding: '12px', fontWeight: '700', color: '#8c4f16' }}>{order.amount}</td>
                  <td style={{ padding: '12px' }}>
                    <span
                      style={{
                        padding: '3px 8px',
                        fontSize: '11px',
                        fontWeight: '600',
                        borderRadius: '9999px',
                        color: order.statusColor,
                        backgroundColor: order.statusBg,
                      }}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td style={{ padding: '12px', fontSize: '12px', color: '#857468' }}>{order.date}</td>
                  <td style={{ padding: '12px', textAlign: 'right' }}>
                    <Link
                      to={`/customer/orders/${order.id}`}
                      style={{ fontSize: '12px', fontWeight: '600', color: '#00687a', textDecoration: 'none' }}
                    >
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

export default CustomerDashboard;