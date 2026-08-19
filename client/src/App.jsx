import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Outlet, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

// Admin Components & Pages
import AdminSidebar from './components/Admin/AdminSidebar.jsx';
import AdminNavbar from './components/Admin/AdminNavbar.jsx';
import AdminDashboard from './pages/admin/AdminDashboard.jsx';
import Users from './pages/admin/Users.jsx';
import Suppliers from './pages/admin/Suppliers.jsx';
import Verification from './pages/admin/Verification.jsx';
import Products from './pages/admin/Products.jsx';
import Categories from './pages/admin/Categories.jsx';
import AdminOrders from './pages/admin/Orders.jsx';
import AdminNotifications from './pages/admin/Notifications.jsx';
import Settings from './pages/admin/Settings.jsx';

// Customer Components & Pages
import CustomerSidebar from './components/Customer/CustomerSidebar.jsx';
import CustomerNavbar from './components/Customer/CustomerNavbar.jsx';
import CustomerDashboard from './pages/customer/CustomerDashboard.jsx';
import BrowseProducts from './pages/customer/BrowseProducts.jsx';
import ProductDetails from './pages/customer/ProductDetails.jsx';
import Cart from './pages/customer/Cart.jsx';
import Checkout from './pages/customer/Checkout.jsx';


import SupplierNavbar from './components/Supplier/SupplierNavbar.jsx';
import SupplierSidebar from './components/Supplier/SupplierSidebar.jsx';
import AddProduct from './pages/Supplier/AddProduct.jsx';
import Buyers from './pages/Supplier/Buyers.jsx';
import EditProduct from './page/Supplier/EditProuct.jsx';
import Notifications from './pages/Supplier/Notifications.jsx';
import  Messages from './pages/Supplier/Messages.jsx';
import Inventory from './pages/Supplier/Inventory.jsx';
import SupplierDashboard from './pages/Supplier/SupplierDashboard.jsx';
import Settings from './pages/Supplier/Settings.jsx';
import AddProduct from './pages/Supplier/AddProduct.jsx';
import Orders from './pages/admin/Orders.jsx';
import OrdersDetails from './pages/Supplier/OrderDetails.jsx';





// Landing Page
const LandingPage = () => (
  <div style={{ padding: '60px 20px', textAlign: 'center', backgroundColor: '#fff8f5', minHeight: '100vh', fontFamily: 'Inter, sans-serif' }}>
    <motion.h1 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      style={{ color: '#8c4f16', fontSize: '38px', fontWeight: '700', marginBottom: '16px' }}
    >
      GymHub B2B Marketplace
    </motion.h1>
    <motion.p 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      style={{ color: '#534439', fontSize: '18px', marginBottom: '32px' }}
    >
      Connecting Gym Owners & Fitness Centers with Certified Equipment Manufacturers.
    </motion.p>
    
    <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
      <Link
        to="/customer"
        style={{
          padding: '14px 28px',
          backgroundColor: '#8c4f16',
          color: '#ffffff',
          textDecoration: 'none',
          borderRadius: '8px',
          fontWeight: '600',
          display: 'inline-block',
          boxShadow: '0 2px 8px rgba(140, 79, 22, 0.2)'
        }}
      >
        Customer / Gym Owner Portal →
      </Link>

      <Link
        to="/admin"
        style={{
          padding: '14px 28px',
          backgroundColor: '#fff1e9',
          color: '#8c4f16',
          border: '1px solid #d8c3b5',
          textDecoration: 'none',
          borderRadius: '8px',
          fontWeight: '600',
          display: 'inline-block'
        }}
      >
        Admin Portal →
      </Link>
    </div>
  </div>
);

// Admin Layout
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

// Customer Layout with Guaranteed Non-Overlapping Margin
const CustomerLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 1024);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);
  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#fff8f5', fontFamily: 'Inter, sans-serif' }}>
      {/* Fixed Left Sidebar */}
      <CustomerSidebar isOpen={sidebarOpen} onClose={closeSidebar} />

      {/* Main Content Area Pushed to the Right of the Sidebar */}
      <div
        style={{
          marginLeft: isDesktop ? '260px' : '0px',
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          transition: 'margin-left 0.3s ease',
          minWidth: 0,
        }}
      >
        <CustomerNavbar onToggleSidebar={toggleSidebar} />
        
        <main style={{ flex: 1, overflowY: 'auto' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
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

        {/* Customer Module Routes */}
        <Route path="/customer" element={<CustomerLayout />}>
          <Route index element={<CustomerDashboard />} />
          <Route path="products" element={<BrowseProducts />} />
          <Route path="product/:id" element={<ProductDetails />} />
          <Route path="cart" element={<Cart />} />
          <Route path="checkout" element={<Checkout />} />
        </Route>

        {/* Admin Module Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="users" element={<Users />} />
          <Route path="suppliers" element={<Suppliers />} />
          <Route path="verification" element={<Verification />} />
          <Route path="products" element={<Products />} />
          <Route path="categories" element={<Categories />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="notifications" element={<AdminNotifications />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        <Route
          path="*"
          element={
            <div style={{ padding: '40px', textAlign: 'center', color: '#211a16' }}>
              <h2>404 - Page Not Found</h2>
              <Link to="/customer" style={{ color: '#8c4f16', fontWeight: '600' }}>Return to Customer Portal</Link>
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;