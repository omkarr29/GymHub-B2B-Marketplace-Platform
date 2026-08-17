import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Outlet, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

// Imports
import AdminSidebar from './components/Admin/AdminSidebar.jsx';
import AdminNavbar from './components/Admin/AdminNavbar.jsx';
import AdminDashboard from './pages/admin/AdminDashboard.jsx';
import Users from './pages/admin/Users.jsx';
import Suppliers from './pages/admin/Suppliers.jsx';
import Verification from './pages/admin/Verification.jsx';
import Products from './pages/admin/Products.jsx';
import Categories from './pages/admin/Categories.jsx';
import Orders from './pages/admin/Orders.jsx';
import Notifications from './pages/admin/Notifications.jsx';
import Settings from './pages/admin/Settings.jsx';

const LandingPage = () => (
  <div style={{ padding: '40px', textAlign: 'center', backgroundColor: '#fff8f5', minHeight: '100vh', fontFamily: 'Inter, sans-serif' }}>
    <motion.h1 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      style={{ color: '#8c4f16', fontSize: '36px', marginBottom: '16px' }}
    >
      GymHub B2B Marketplace
    </motion.h1>
    <motion.p 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      style={{ color: '#534439', fontSize: '18px', marginBottom: '24px' }}
    >
      Welcome to the GymHub marketplace platform.
    </motion.p>
    <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
      <Link
        to="/admin"
        style={{
          padding: '12px 24px',
          backgroundColor: '#8c4f16',
          color: '#ffffff',
          textDecoration: 'none',
          borderRadius: '8px',
          fontWeight: '600',
          display: 'inline-block'
        }}
      >
        Open Admin Portal →
      </Link>
    </motion.div>
  </div>
);

// Layout with Animated Route Wrapper
const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#fff8f5', fontFamily: 'Inter, sans-serif' }}>
      <AdminSidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <AdminNavbar toggleSidebar={toggleSidebar} />
        
        <main style={{ padding: '24px', flex: 1, overflowY: 'auto' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />

        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="users" element={<Users />} />
          <Route path="suppliers" element={<Suppliers />} />
          <Route path="verification" element={<Verification />} />
          <Route path="products" element={<Products />} />
          <Route path="categories" element={<Categories />} />
          <Route path="orders" element={<Orders />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        <Route
          path="*"
          element={
            <div style={{ padding: '40px', textAlign: 'center', color: '#211a16' }}>
              <h2>404 - Page Not Found</h2>
              <Link to="/admin" style={{ color: '#8c4f16', fontWeight: '600' }}>Return to Dashboard</Link>
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;