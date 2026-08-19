import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SupplierNavbar = ({ toggleSidebar }) => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  // Supplier identity state
  const supplierInfo = {
    name: 'Rajesh Sharma',
    businessName: 'FitEquip Manufacturing Pvt Ltd',
    isVerified: true,
    initials: 'FE'
  };

  return (
    <header
      style={{
        height: '64px',
        backgroundColor: '#fff8f5',
        borderBottom: '1px solid #d8c3b5',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 24px',
        position: 'sticky',
        top: 0,
        zIndex: 30,
        boxSizing: 'border-box'
      }}
    >
      {/* Left: Mobile Toggle & Global Supplier Search */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flex: 1 }}>
        <button
          onClick={toggleSidebar}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'transparent',
            border: 'none',
            fontSize: '20px',
            cursor: 'pointer',
            padding: '4px',
            color: '#211a16'
          }}
          aria-label="Toggle Navigation"
        >
          ☰
        </button>

        <div style={{ position: 'relative', width: '100%', maxWidth: '380px' }}>
          <input
            type="text"
            placeholder="Search SKU, products, orders, buyers..."
            style={{
              width: '100%',
              padding: '8px 12px 8px 36px',
              borderRadius: '8px',
              border: '1px solid #d8c3b5',
              backgroundColor: '#fff1e9',
              color: '#211a16',
              fontSize: '13px',
              outline: 'none',
              boxSizing: 'border-box'
            }}
          />
          <span
            style={{
              position: 'absolute',
              left: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
              fontSize: '13px',
              color: '#857468'
            }}
          >
            🔍
          </span>
        </div>
      </div>

      {/* Right: Verified Badge, Notifications, and Profile */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
        {/* Verification Status Pill */}
        {supplierInfo.isVerified ? (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              padding: '4px 10px',
              backgroundColor: '#e6f4ea',
              border: '1px solid #ceead6',
              borderRadius: '9999px',
              color: '#137333',
              fontSize: '11px',
              fontWeight: '600'
            }}
          >
            <span>✓</span>
            <span>Verified Supplier</span>
          </div>
        ) : (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              padding: '4px 10px',
              backgroundColor: '#fed1b0',
              border: '1px solid #d8c3b5',
              borderRadius: '9999px',
              color: '#79573d',
              fontSize: '11px',
              fontWeight: '600'
            }}
          >
            <span>⏳</span>
            <span>KYC Pending</span>
          </div>
        )}

        {/* Notifications Icon with Badge */}
        <a
          href="/supplier/notifications"
          style={{ position: 'relative', cursor: 'pointer', textDecoration: 'none', color: 'inherit' }}
        >
          <span style={{ fontSize: '18px' }}>🔔</span>
          <span
            style={{
              position: 'absolute',
              top: '-4px',
              right: '-4px',
              backgroundColor: '#ba1a1a',
              color: '#ffffff',
              fontSize: '10px',
              fontWeight: '700',
              borderRadius: '9999px',
              width: '16px',
              height: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            3
          </span>
        </a>

        {/* Supplier Profile Trigger & Dropdown */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              padding: '4px 8px',
              borderRadius: '8px'
            }}
          >
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '9999px',
                backgroundColor: '#8c4f16',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: '600',
                fontSize: '13px'
              }}
            >
              {supplierInfo.initials}
            </div>
            <div style={{ textAlign: 'left', display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '13px', fontWeight: '600', color: '#211a16' }}>
                {supplierInfo.name}
              </span>
              <span style={{ fontSize: '11px', color: '#79573d' }}>
                {supplierInfo.businessName}
              </span>
            </div>
            <span style={{ fontSize: '10px', color: '#534439' }}>▼</span>
          </button>

          {/* Dropdown Menu */}
          <AnimatePresence>
            {showProfileMenu && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.15 }}
                style={{
                  position: 'absolute',
                  right: 0,
                  top: '46px',
                  backgroundColor: '#fff8f5',
                  border: '1px solid #d8c3b5',
                  borderRadius: '8px',
                  width: '180px',
                  boxShadow: '0 6px 18px rgba(33, 26, 22, 0.1)',
                  padding: '6px 0',
                  zIndex: 50
                }}
              >
                <a
                  href="/supplier/profile"
                  style={{
                    display: 'block',
                    padding: '8px 16px',
                    fontSize: '13px',
                    color: '#211a16',
                    textDecoration: 'none'
                  }}
                >
                  🛡️ Business Profile
                </a>
                <a
                  href="/supplier/settings"
                  style={{
                    display: 'block',
                    padding: '8px 16px',
                    fontSize: '13px',
                    color: '#211a16',
                    textDecoration: 'none'
                  }}
                >
                  ⚙️ Settings
                </a>
                <div style={{ borderTop: '1px solid #ede0d9', margin: '4px 0' }} />
                <button
                  onClick={() => alert('Supplier logged out.')}
                  style={{
                    width: '100%',
                    textAlign: 'left',
                    padding: '8px 16px',
                    fontSize: '13px',
                    color: '#ba1a1a',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    fontWeight: '600'
                  }}
                >
                  🚪 Logout
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
};

export default SupplierNavbar;