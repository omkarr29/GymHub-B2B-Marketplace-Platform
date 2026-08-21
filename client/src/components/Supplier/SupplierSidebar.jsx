import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Package,
  PlusCircle,
  Boxes,
  ShoppingCart,
  Users,
  MessageSquare,
  Bell,
  Building2,
  LogOut,
  X,
} from 'lucide-react';

/**
 * SupplierSidebar Component
 * Fixed left navigation for the Supplier Module, mirroring the
 * structure and styling of CustomerSidebar.jsx for consistency.
 *
 * Props:
 * - isOpen (boolean): Controls visibility on mobile screens.
 * - onClose (function): Callback to dismiss the sidebar on mobile.
 */
const SupplierSidebar = ({ isOpen = false, onClose = () => {} }) => {
  const navItems = [
    { label: 'Dashboard', path: '/supplier', end: true, icon: LayoutDashboard },
    { label: 'Products', path: '/supplier/products', icon: Package },
    { label: 'Add Product', path: '/supplier/products/add', icon: PlusCircle },
    { label: 'Inventory', path: '/supplier/inventory', icon: Boxes },
    { label: 'Orders', path: '/supplier/orders', icon: ShoppingCart },
    { label: 'Buyers', path: '/supplier/buyers', icon: Users },
    { label: 'Messages', path: '/supplier/messages', icon: MessageSquare },
    { label: 'Notifications', path: '/supplier/notifications', icon: Bell },
    { label: 'Business Profile', path: '/supplier/profile', icon: Building2 },
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
            backgroundColor: 'rgba(33, 26, 22, 0.5)',
            zIndex: 40,
            display: typeof window !== 'undefined' && window.innerWidth >= 1024 ? 'none' : 'block',
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
                backgroundColor: '#00687a',
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
                  color: '#00687a',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                }}
              >
                Supplier Portal
              </span>
            </div>
          </div>

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
            <X size={22} strokeWidth={2} />
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
                backgroundColor: isActive ? '#00687a' : 'transparent',
                color: isActive ? '#ffffff' : '#534439',
                transition: 'background-color 0.2s ease, color 0.2s ease',
              })}
            >
              <item.icon size={18} strokeWidth={2} />
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
              <div style={{ overflow: 'hidden', whiteSpace: 'nowrap' }}>
                <p style={{ margin: 0, fontSize: '12px', fontWeight: '600', color: '#211a16', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  FitPro Industrial Ltd
                </p>
                <p style={{ margin: 0, fontSize: '11px', color: '#79573d', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  Manufacturer
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
              <LogOut size={18} strokeWidth={2} />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default SupplierSidebar;
