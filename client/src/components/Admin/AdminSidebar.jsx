import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  Users,
  Factory,
  ShieldCheck,
  Package,
  Tags,
  ShoppingCart,
  Bell,
  Settings as SettingsIcon,
  LogOut,
} from 'lucide-react';

const AdminSidebar = ({ isOpen, toggleSidebar }) => {
  const menuItems = [
    { label: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { label: 'Users', path: '/admin/users', icon: Users },
    { label: 'Suppliers', path: '/admin/suppliers', icon: Factory },
    { label: 'Verification', path: '/admin/verification', icon: ShieldCheck },
    { label: 'Products', path: '/admin/products', icon: Package },
    { label: 'Categories', path: '/admin/categories', icon: Tags },
    { label: 'Orders', path: '/admin/orders', icon: ShoppingCart },
    { label: 'Notifications', path: '/admin/notifications', icon: Bell },
    { label: 'Settings', path: '/admin/settings', icon: SettingsIcon },
  ];

  return (
    <>
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
          padding: '24px 16px',
          position: 'sticky',
          top: 0,
          left: 0,
          zIndex: 50,
          boxSizing: 'border-box'
        }}
      >
        <div>
          <div 
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '12px', 
              paddingBottom: '24px', 
              borderBottom: '1px solid #ede0d9',
              marginBottom: '20px'
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
              <h2 style={{ margin: 0, fontSize: '18px', fontWeight: '700', color: '#211a16' }}>GymHub</h2>
              <span style={{ fontSize: '12px', color: '#79573d', fontWeight: '600' }}>Admin Portal</span>
            </div>
          </div>

          <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {menuItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === '/admin'}
                onClick={() => {
                  if (isOpen && toggleSidebar) toggleSidebar();
                }}
                style={{ textDecoration: 'none' }}
              >
                {({ isActive }) => (
                  <motion.div
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.98 }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '10px 14px',
                      borderRadius: '6px',
                      fontSize: '14px',
                      fontWeight: isActive ? '600' : '400',
                      color: isActive ? '#ffffff' : '#534439',
                      backgroundColor: isActive ? '#8c4f16' : 'transparent',
                      transition: 'background-color 0.2s ease, color 0.2s ease'
                    }}
                  >
                    <item.icon size={17} strokeWidth={2} />
                    <span>{item.label}</span>
                  </motion.div>
                )}
              </NavLink>
            ))}
          </nav>
        </div>

        <div style={{ borderTop: '1px solid #ede0d9', paddingTop: '16px' }}>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => alert('Logged out successfully.')}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '10px 14px',
              borderRadius: '6px',
              border: 'none',
              backgroundColor: '#fff1e9',
              color: '#ba1a1a',
              fontWeight: '600',
              fontSize: '14px',
              cursor: 'pointer',
              textAlign: 'left'
            }}
          >
            <LogOut size={17} strokeWidth={2} />
            <span>Logout</span>
          </motion.button>
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;