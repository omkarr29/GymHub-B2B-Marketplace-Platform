import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, Search, PlusCircle, Bell, ChevronDown } from 'lucide-react';

/**
 * SupplierNavbar Component
 * Top header navigation bar for the Supplier Module.
 *
 * Props:
 * - onToggleSidebar (function): Toggles mobile sidebar drawer.
 * - unreadNotificationsCount (number): Number of unread alerts (default 3).
 */
const SupplierNavbar = ({
  onToggleSidebar = () => {},
  unreadNotificationsCount = 3,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/supplier/products?search=${encodeURIComponent(searchQuery.trim())}`);
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
          <Menu size={22} strokeWidth={2} />
        </button>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <p style={{ margin: 0, fontSize: '14px', fontWeight: '700', color: '#211a16' }}>
            FitPro Industrial Ltd
          </p>
          <p style={{ margin: 0, fontSize: '11px', color: '#00687a' }}>
            Supplier / Manufacturer Portal
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
            <Search size={16} strokeWidth={2} />
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search your products, orders, buyers..."
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

      {/* Right Section: Add Product, Notifications & Profile Menu */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        {/* Quick Add Product */}
        <Link
          to="/supplier/products/add"
          title="Add Product"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '8px',
            borderRadius: '8px',
            color: '#534439',
            textDecoration: 'none',
          }}
        >
          <PlusCircle size={22} strokeWidth={2} />
        </Link>

        {/* Notifications Link */}
        <Link
          to="/supplier/notifications"
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
          <Bell size={22} strokeWidth={2} />
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
                backgroundColor: '#57b3ca',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '12px',
                fontWeight: '700',
              }}
            >
              FP
            </div>
            <ChevronDown
              size={16}
              strokeWidth={2}
              color="#534439"
              style={{
                transform: showProfileMenu ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 0.2s ease',
              }}
            />
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
                    FitPro Industrial Ltd
                  </p>
                  <p style={{ margin: 0, fontSize: '10px', color: '#00687a' }}>
                    GST: 27AAFCF5678L1ZQ
                  </p>
                </div>

                <Link
                  to="/supplier/profile"
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
                  to="/supplier/orders"
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
                  to="/supplier/notifications"
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
                  Notifications
                </Link>

                <button
                  type="button"
                  onClick={() => {
                    setShowProfileMenu(false);
                    window.location.href = '/';
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

export default SupplierNavbar;
