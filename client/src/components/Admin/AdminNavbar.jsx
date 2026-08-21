import React, { useState } from 'react';
import { Menu, Search, Bell } from 'lucide-react';

const AdminNavbar = ({ toggleSidebar }) => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);

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
      {/* Left: Mobile Menu Button & Search */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flex: 1 }}>
        {/* Toggle Button for Mobile */}
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
          aria-label="Toggle navigation"
        >
          <Menu size={20} strokeWidth={2} />
        </button>

        {/* Global Search Input */}
        <div style={{ position: 'relative', width: '100%', maxWidth: '360px' }}>
          <input
            type="text"
            placeholder="Search orders, suppliers, products..."
            style={{
              width: '100%',
              padding: '8px 12px 8px 36px',
              borderRadius: '8px',
              border: '1px solid #d8c3b5',
              backgroundColor: '#fff1e9',
              color: '#211a16',
              fontSize: '14px',
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
              color: '#857468',
              display: 'flex',
            }}
          >
            <Search size={15} strokeWidth={2} />
          </span>
        </div>
      </div>

      {/* Right: Notification & Profile */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        {/* Notifications Icon with Badge */}
        <div style={{ position: 'relative', cursor: 'pointer', display: 'flex' }}>
          <Bell size={20} strokeWidth={2} color="#211a16" />
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
            4
          </span>
        </div>

        {/* Admin Profile Dropdown */}
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
                backgroundColor: '#00687a',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: '600',
                fontSize: '14px'
              }}
            >
              AD
            </div>
            <div style={{ textAlign: 'left', display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '13px', fontWeight: '600', color: '#211a16' }}>Admin</span>
              <span style={{ fontSize: '11px', color: '#79573d' }}>Super Admin</span>
            </div>
            <span style={{ fontSize: '10px', color: '#534439' }}>▼</span>
          </button>

          {/* Simple Dropdown Menu */}
          {showProfileMenu && (
            <div
              style={{
                position: 'absolute',
                right: 0,
                top: '44px',
                backgroundColor: '#fff8f5',
                border: '1px solid #d8c3b5',
                borderRadius: '8px',
                width: '160px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                padding: '6px 0',
                zIndex: 50
              }}
            >
              <a
                href="/admin/settings"
                style={{
                  display: 'block',
                  padding: '8px 16px',
                  fontSize: '13px',
                  color: '#211a16',
                  textDecoration: 'none'
                }}
              >
                Settings
              </a>
              <button
                onClick={() => alert('Logged out')}
                style={{
                  width: '100%',
                  textAlign: 'left',
                  padding: '8px 16px',
                  fontSize: '13px',
                  color: '#ba1a1a',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default AdminNavbar;