import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

/**
 * CustomerNavbar Component
 * Top header navigation bar for the Customer Module.
 *
 * Props:
 * - onToggleSidebar (function): Toggles mobile sidebar drawer.
 * - cartCount (number): Number of active items in the cart (default 3).
 * - unreadNotificationsCount (number): Number of unread alerts (default 2).
 */
const CustomerNavbar = ({
  onToggleSidebar = () => {},
  cartCount = 3,
  unreadNotificationsCount = 2,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/customer/products?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 30,
        height: '64px',
        backgroundColor: '#fff8f5',
        borderBottom: '1px solid #ede0d9',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 20px',
        boxSizing: 'border-box',
      }}
    >
      {/* Left Section: Mobile Menu Button & Business Info */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <button
          type="button"
          onClick={onToggleSidebar}
          aria-label="Toggle Navigation Menu"
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '6px',
            borderRadius: '6px',
            color: '#534439',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <svg
            style={{ width: '24px', height: '24px', minWidth: '24px', minHeight: '24px' }}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <p style={{ margin: 0, fontSize: '14px', fontWeight: '700', color: '#211a16' }}>
            Metro Fitness Center
          </p>
          <p style={{ margin: 0, fontSize: '11px', color: '#79573d' }}>
            B2B Procurement Portal
          </p>
        </div>
      </div>

      {/* Center Section: Global Search Bar */}
      <div style={{ flex: 1, maxWidth: '420px', margin: '0 16px' }}>
        <form onSubmit={handleSearchSubmit} style={{ position: 'relative', width: '100%' }}>
          <span
            style={{
              position: 'absolute',
              top: '50%',
              left: '12px',
              transform: 'translateY(-50%)',
              color: '#857468',
              display: 'flex',
              alignItems: 'center',
              pointerEvents: 'none',
            }}
          >
            <svg
              style={{ width: '16px', height: '16px', minWidth: '16px', minHeight: '16px' }}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search gym equipment, barbells, suppliers..."
            style={{
              width: '100%',
              padding: '8px 12px 8px 36px',
              fontSize: '13px',
              borderRadius: '8px',
              border: '1px solid #d8c3b5',
              backgroundColor: '#fff1e9',
              color: '#211a16',
              outline: 'none',
              boxSizing: 'border-box',
            }}
          />
        </form>
      </div>

      {/* Right Section: Cart, Notifications & Profile Menu */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        {/* Cart Link */}
        <Link
          to="/customer/cart"
          title="Shopping Cart"
          style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '8px',
            borderRadius: '8px',
            color: '#534439',
            textDecoration: 'none',
          }}
        >
          <svg
            style={{ width: '22px', height: '22px', minWidth: '22px', minHeight: '22px' }}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          {cartCount > 0 && (
            <span
              style={{
                position: 'absolute',
                top: '2px',
                right: '2px',
                width: '16px',
                height: '16px',
                backgroundColor: '#8c4f16',
                color: '#ffffff',
                fontSize: '10px',
                fontWeight: '700',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {cartCount}
            </span>
          )}
        </Link>

        {/* Notifications Link */}
        <Link
          to="/customer/notifications"
          title="Notifications"
          style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '8px',
            borderRadius: '8px',
            color: '#534439',
            textDecoration: 'none',
          }}
        >
          <svg
            style={{ width: '22px', height: '22px', minWidth: '22px', minHeight: '22px' }}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
            />
          </svg>
          {unreadNotificationsCount > 0 && (
            <span
              style={{
                position: 'absolute',
                top: '4px',
                right: '4px',
                width: '8px',
                height: '8px',
                backgroundColor: '#ba1a1a',
                borderRadius: '50%',
                border: '2px solid #ffffff',
              }}
            />
          )}
        </Link>

        {/* Profile Dropdown Toggle */}
        <div style={{ position: 'relative' }}>
          <button
            type="button"
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '4px',
              borderRadius: '8px',
            }}
          >
            <div
              style={{
                width: '32px',
                height: '32px',
                minWidth: '32px',
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
              MF
            </div>
            <svg
              style={{
                width: '16px',
                height: '16px',
                color: '#534439',
                transform: showProfileMenu ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 0.2s ease',
              }}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {/* Profile Dropdown Menu */}
          {showProfileMenu && (
            <>
              <div
                onClick={() => setShowProfileMenu(false)}
                style={{ position: 'fixed', inset: 0, zIndex: 10 }}
              />
              <div
                style={{
                  position: 'absolute',
                  right: 0,
                  top: '42px',
                  width: '210px',
                  backgroundColor: '#ffffff',
                  border: '1px solid #d8c3b5',
                  borderRadius: '10px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                  zIndex: 20,
                  overflow: 'hidden',
                }}
              >
                <div style={{ padding: '10px 14px', borderBottom: '1px solid #ede0d9', backgroundColor: '#fff1e9' }}>
                  <p style={{ margin: 0, fontSize: '12px', fontWeight: '700', color: '#211a16' }}>
                    Metro Fitness
                  </p>
                  <p style={{ margin: 0, fontSize: '10px', color: '#79573d' }}>
                    GST: 27AABCU9603R1ZM
                  </p>
                </div>

                <Link
                  to="/customer/profile"
                  onClick={() => setShowProfileMenu(false)}
                  style={{
                    display: 'block',
                    padding: '9px 14px',
                    fontSize: '12px',
                    color: '#211a16',
                    textDecoration: 'none',
                    borderBottom: '1px solid #f9ebe4',
                  }}
                >
                  Business Profile
                </Link>

                <Link
                  to="/customer/orders"
                  onClick={() => setShowProfileMenu(false)}
                  style={{
                    display: 'block',
                    padding: '9px 14px',
                    fontSize: '12px',
                    color: '#211a16',
                    textDecoration: 'none',
                    borderBottom: '1px solid #f9ebe4',
                  }}
                >
                  Order History
                </Link>

                <Link
                  to="/customer/ai-assistant"
                  onClick={() => setShowProfileMenu(false)}
                  style={{
                    display: 'block',
                    padding: '9px 14px',
                    fontSize: '12px',
                    color: '#00687a',
                    textDecoration: 'none',
                    borderBottom: '1px solid #f9ebe4',
                  }}
                >
                  AI Equipment Advisor
                </Link>

                <button
                  type="button"
                  onClick={() => {
                    setShowProfileMenu(false);
                    window.location.href = '/login';
                  }}
                  style={{
                    width: '100%',
                    textAlign: 'left',
                    padding: '9px 14px',
                    fontSize: '12px',
                    color: '#ba1a1a',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    fontWeight: '600',
                  }}
                >
                  Log out
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default CustomerNavbar;