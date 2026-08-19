import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const SupplierSidebar = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();
  const [openSubMenus, setOpenSubMenus] = useState({
    products: true,
    orders: true
  });

  const toggleSubMenu = (menuKey) => {
    setOpenSubMenus((prev) => ({
      ...prev,
      [menuKey]: !prev[menuKey]
    }));
  };

  const navItemClass = (isActive) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '9px 14px',
    borderRadius: '6px',
    textDecoration: 'none',
    fontSize: '13px',
    fontWeight: isActive ? '600' : '400',
    color: isActive ? '#ffffff' : '#534439',
    backgroundColor: isActive ? '#8c4f16' : 'transparent',
    transition: 'background-color 0.2s ease, color 0.2s ease'
  });

  const subNavItemClass = (isActive) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '7px 12px 7px 32px',
    borderRadius: '6px',
    textDecoration: 'none',
    fontSize: '12px',
    fontWeight: isActive ? '600' : '400',
    color: isActive ? '#8c4f16' : '#534439',
    backgroundColor: isActive ? '#fff1e9' : 'transparent',
    transition: 'background-color 0.2s ease, color 0.2s ease'
  });

  return (
    <>
      {/* Mobile Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleSidebar}
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'rgba(33, 26, 22, 0.4)',
              zIndex: 40
            }}
          />
        )}
      </AnimatePresence>

      {/* Sidebar Container */}
      <aside
        style={{
          width: '260px',
          minWidth: '260px',
          height: '100vh',
          backgroundColor: '#fff8f5',
          borderRight: '1px solid #d8c3b5',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '20px 14px',
          position: 'sticky',
          top: 0,
          left: 0,
          zIndex: 50,
          boxSizing: 'border-box',
          overflowY: 'auto'
        }}
      >
        <div>
          {/* Brand Logo & Portal Tag */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              paddingBottom: '20px',
              borderBottom: '1px solid #ede0d9',
              marginBottom: '16px'
            }}
          >
            <motion.div
              whileHover={{ rotate: 5, scale: 1.05 }}
              style={{
                width: '36px',
                height: '36px',
                backgroundColor: '#8c4f16',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff',
                fontWeight: '700',
                fontSize: '18px'
              }}
            >
              G
            </motion.div>
            <div>
              <h2 style={{ margin: 0, fontSize: '18px', fontWeight: '700', color: '#211a16' }}>
                GymHub
              </h2>
              <span
                style={{
                  fontSize: '11px',
                  color: '#00687a',
                  fontWeight: '600',
                  letterSpacing: '0.5px'
                }}
              >
                SUPPLIER PORTAL
              </span>
            </div>
          </div>

          {/* Navigation Menu */}
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            {/* Dashboard */}
            <NavLink
              to="/supplier"
              end
              onClick={() => isOpen && toggleSidebar && toggleSidebar()}
              style={({ isActive }) => navItemClass(isActive)}
            >
              <span style={{ fontSize: '16px' }}>📊</span>
              <span>Dashboard</span>
            </NavLink>

            {/* Marketplace / Products Submenu */}
            <div style={{ marginTop: '4px' }}>
              <button
                onClick={() => toggleSubMenu('products')}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '9px 14px',
                  borderRadius: '6px',
                  border: 'none',
                  backgroundColor: 'transparent',
                  color: '#534439',
                  fontSize: '13px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  textAlign: 'left'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ fontSize: '16px' }}>📦</span>
                  <span>Products</span>
                </div>
                <span style={{ fontSize: '10px', color: '#857468' }}>
                  {openSubMenus.products ? '▲' : '▼'}
                </span>
              </button>

              {openSubMenus.products && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', marginTop: '2px' }}>
                  <NavLink
                    to="/supplier/products"
                    end
                    onClick={() => isOpen && toggleSidebar && toggleSidebar()}
                    style={({ isActive }) => subNavItemClass(isActive)}
                  >
                    <span>•</span>
                    <span>My Products</span>
                  </NavLink>
                  <NavLink
                    to="/supplier/products/add"
                    onClick={() => isOpen && toggleSidebar && toggleSidebar()}
                    style={({ isActive }) => subNavItemClass(isActive)}
                  >
                    <span>•</span>
                    <span>Add Product</span>
                  </NavLink>
                </div>
              )}
            </div>

            {/* Inventory */}
            <NavLink
              to="/supplier/inventory"
              onClick={() => isOpen && toggleSidebar && toggleSidebar()}
              style={({ isActive }) => navItemClass(isActive)}
            >
              <span style={{ fontSize: '16px' }}>📋</span>
              <span>Inventory</span>
            </NavLink>

            {/* Orders Submenu */}
            <div style={{ marginTop: '4px' }}>
              <button
                onClick={() => toggleSubMenu('orders')}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '9px 14px',
                  borderRadius: '6px',
                  border: 'none',
                  backgroundColor: 'transparent',
                  color: '#534439',
                  fontSize: '13px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  textAlign: 'left'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ fontSize: '16px' }}>🛒</span>
                  <span>Orders</span>
                </div>
                <span style={{ fontSize: '10px', color: '#857468' }}>
                  {openSubMenus.orders ? '▲' : '▼'}
                </span>
              </button>

              {openSubMenus.orders && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', marginTop: '2px' }}>
                  <NavLink
                    to="/supplier/orders"
                    end
                    onClick={() => isOpen && toggleSidebar && toggleSidebar()}
                    style={({ isActive }) => subNavItemClass(isActive)}
                  >
                    <span>•</span>
                    <span>All Orders</span>
                  </NavLink>
                  <NavLink
                    to="/supplier/orders?status=Pending"
                    onClick={() => isOpen && toggleSidebar && toggleSidebar()}
                    style={() => subNavItemClass(location.search === '?status=Pending')}
                  >
                    <span>•</span>
                    <span>Pending Orders</span>
                  </NavLink>
                  <NavLink
                    to="/supplier/orders?status=Processing"
                    onClick={() => isOpen && toggleSidebar && toggleSidebar()}
                    style={() => subNavItemClass(location.search === '?status=Processing')}
                  >
                    <span>•</span>
                    <span>Processing</span>
                  </NavLink>
                  <NavLink
                    to="/supplier/orders?status=Shipped"
                    onClick={() => isOpen && toggleSidebar && toggleSidebar()}
                    style={() => subNavItemClass(location.search === '?status=Shipped')}
                  >
                    <span>•</span>
                    <span>Shipped</span>
                  </NavLink>
                  <NavLink
                    to="/supplier/orders?status=Delivered"
                    onClick={() => isOpen && toggleSidebar && toggleSidebar()}
                    style={() => subNavItemClass(location.search === '?status=Delivered')}
                  >
                    <span>•</span>
                    <span>Delivered</span>
                  </NavLink>
                </div>
              )}
            </div>

            {/* Buyers */}
            <NavLink
              to="/supplier/buyers"
              onClick={() => isOpen && toggleSidebar && toggleSidebar()}
              style={({ isActive }) => navItemClass(isActive)}
            >
              <span style={{ fontSize: '16px' }}>🏢</span>
              <span>Buyers</span>
            </NavLink>

            {/* Messages */}
            <NavLink
              to="/supplier/messages"
              onClick={() => isOpen && toggleSidebar && toggleSidebar()}
              style={({ isActive }) => navItemClass(isActive)}
            >
              <span style={{ fontSize: '16px' }}>💬</span>
              <span>Messages</span>
            </NavLink>

            {/* Notifications */}
            <NavLink
              to="/supplier/notifications"
              onClick={() => isOpen && toggleSidebar && toggleSidebar()}
              style={({ isActive }) => navItemClass(isActive)}
            >
              <span style={{ fontSize: '16px' }}>🔔</span>
              <span>Notifications</span>
            </NavLink>

            {/* Business Profile */}
            <NavLink
              to="/supplier/profile"
              onClick={() => isOpen && toggleSidebar && toggleSidebar()}
              style={({ isActive }) => navItemClass(isActive)}
            >
              <span style={{ fontSize: '16px' }}>🛡️</span>
              <span>Business Profile</span>
            </NavLink>

            {/* Settings */}
            <NavLink
              to="/supplier/settings"
              onClick={() => isOpen && toggleSidebar && toggleSidebar()}
              style={({ isActive }) => navItemClass(isActive)}
            >
              <span style={{ fontSize: '16px' }}>⚙️</span>
              <span>Settings</span>
            </NavLink>
          </nav>
        </div>

        {/* Footer / Logout */}
        <div style={{ borderTop: '1px solid #ede0d9', paddingTop: '14px', marginTop: '16px' }}>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => alert('Supplier logged out successfully.')}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '9px 14px',
              borderRadius: '6px',
              border: 'none',
              backgroundColor: '#fff1e9',
              color: '#ba1a1a',
              fontWeight: '600',
              fontSize: '13px',
              cursor: 'pointer',
              textAlign: 'left'
            }}
          >
            <span>🚪</span>
            <span>Logout</span>
          </motion.button>
        </div>
      </aside>
    </>
  );
};

export default SupplierSidebar;