import React from 'react';
import { NavLink } from 'react-router-dom';

/**
 * CustomerSidebar Component
 * Provides desktop sidebar navigation and handles mobile drawer state.
 *
 * Props:
 * - isOpen (boolean): Controls visibility on mobile screens.
 * - onClose (function): Callback to dismiss the sidebar on mobile.
 */
const CustomerSidebar = ({ isOpen = false, onClose = () => {} }) => {
  const iconStyle = {
    width: '20px',
    height: '20px',
    minWidth: '20px',
    minHeight: '20px',
    display: 'inline-block',
  };

  const navItems = [
    {
      label: 'Dashboard',
      path: '/customer',
      end: true,
      icon: (
        <svg style={iconStyle} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
    },
    {
      label: 'Browse Products',
      path: '/customer/products',
      icon: (
        <svg style={iconStyle} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      ),
    },
    {
      label: 'Cart',
      path: '/customer/cart',
      icon: (
        <svg style={iconStyle} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
    },
    {
      label: 'Orders',
      path: '/customer/orders',
      icon: (
        <svg style={iconStyle} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        </svg>
      ),
    },
    {
      label: 'Notifications',
      path: '/customer/notifications',
      icon: (
        <svg style={iconStyle} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
      ),
    },
    {
      label: 'Profile',
      path: '/customer/profile',
      icon: (
        <svg style={iconStyle} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
    },
  ];

  const handleLogout = () => {
    window.location.href = '/';
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 40,
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
          }}
        />
      )}

      {/* Sidebar Container */}
      <aside
        style={{
          position: 'fixed',
          top: 0,
          bottom: 0,
          left: 0,
          zIndex: 50,
          width: '260px',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#fff1e9',
          borderRight: '1px solid #d8c3b5',
          transform: isOpen || (typeof window !== 'undefined' && window.innerWidth >= 1024) ? 'translateX(0)' : 'translateX(-100%)',
          transition: 'transform 0.3s ease-in-out',
          boxSizing: 'border-box',
        }}
      >
        {/* Brand Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: '64px',
            padding: '0 20px',
            borderBottom: '1px solid #ede0d9',
            boxSizing: 'border-box',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                width: '36px',
                height: '36px',
                minWidth: '36px',
                minHeight: '36px',
                borderRadius: '8px',
                backgroundColor: '#8c4f16',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: '700',
                fontSize: '18px',
              }}
            >
              G
            </div>
            <div>
              <span style={{ fontSize: '18px', fontWeight: '700', color: '#8c4f16' }}>
                Gym<span style={{ color: '#00687a' }}>Hub</span>
              </span>
              <span
                style={{
                  display: 'block',
                  fontSize: '10px',
                  fontWeight: '600',
                  color: '#79573d',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                }}
              >
                B2B Customer
              </span>
            </div>
          </div>

          {/* Close button for mobile screen */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close Sidebar"
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '4px',
              color: '#534439',
              display: typeof window !== 'undefined' && window.innerWidth >= 1024 ? 'none' : 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <svg
              style={{ width: '22px', height: '22px', minWidth: '22px', minHeight: '22px' }}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Navigation Menu */}
        <nav
          style={{
            flex: 1,
            padding: '20px 14px',
            display: 'flex',
            flexDirection: 'column',
            gap: '6px',
            overflowY: 'auto',
          }}
        >
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.end}
              onClick={onClose}
              style={({ isActive }) => ({
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '10px 14px',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: isActive ? '600' : '500',
                textDecoration: 'none',
                backgroundColor: isActive ? '#8c4f16' : 'transparent',
                color: isActive ? '#ffffff' : '#534439',
                transition: 'background-color 0.2s ease, color 0.2s ease',
              })}
            >
              <span style={{ display: 'flex', alignItems: 'center' }}>{item.icon}</span>
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Bottom User Info & Logout */}
        <div style={{ padding: '16px', borderTop: '1px solid #ede0d9', boxSizing: 'border-box' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '10px 12px',
              borderRadius: '8px',
              backgroundColor: '#ede0d9',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', overflow: 'hidden' }}>
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  minWidth: '32px',
                  minHeight: '32px',
                  borderRadius: '50%',
                  backgroundColor: '#e29657',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '12px',
                  fontWeight: '700',
                }}
              >
                GO
              </div>
              <div style={{ overflow: 'hidden', whiteSpace: 'nowrap' }}>
                <p style={{ margin: 0, fontSize: '12px', fontWeight: '600', color: '#211a16', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  Metro Fitness
                </p>
                <p style={{ margin: 0, fontSize: '11px', color: '#79573d', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  Gym Owner
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleLogout}
              title="Logout"
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '6px',
                borderRadius: '6px',
                color: '#ba1a1a',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <svg
                style={{ width: '20px', height: '20px', minWidth: '20px', minHeight: '20px' }}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default CustomerSidebar;