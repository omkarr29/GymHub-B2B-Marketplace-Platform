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

// Supplier Components & Pages
import SupplierNavbar from './components/Supplier/SupplierNavbar.jsx';
import SupplierSidebar from './components/Supplier/SupplierSidebar.jsx';
import SupplierDashboard from './pages/Supplier/SupplierDashboard.jsx';
import Buyers from './pages/Supplier/Buyers.jsx';
import EditProduct from './pages/Supplier/EditProduct.jsx';
import AddProduct1 from './pages/Supplier/AddProduct1.jsx';
import Notifications from './pages/Supplier/Notifications.jsx';
import Messages from './pages/Supplier/Messages.jsx';
import Inventory from './pages/Supplier/Inventory.jsx';
import Settings2 from './pages/Supplier/Settings2.jsx';
import OrdersDetails from './pages/Supplier/OrderDetails.jsx';

// Landing Page (With Supplier Option and Hidden Admin Entry)
const LandingPage = () => (
  <div style={{ padding: '60px 20px', textAlign: 'center', backgroundColor: '#fff8f5', minHeight: '100vh', fontFamily: 'Inter, sans-serif', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
    <div>
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
          to="/supplier"
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
          Supplier Portal →
        </Link>
      </div>
    </div>

    {/* Footer Link for Admin */}
    <footer style={{ marginTop: '40px', fontSize: '12px', color: '#a08a7b' }}>
      © GymHub Marketplace | <Link to="/admin" style={{ color: '#8c4f16', textDecoration: 'none' }}>Admin Access</Link>
    </footer>
  </div>
);

// Supplier Layout
const SupplierLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#fff8f5', fontFamily: 'Inter, sans-serif' }}>
      <SupplierSidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <SupplierNavbar toggleSidebar={toggleSidebar} />
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

// Customer Layout
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
      <CustomerSidebar isOpen={sidebarOpen} onClose={closeSidebar} />

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
        {/* Landing Page */}
        <Route path="/" element={<LandingPage />} />

        {/* Customer Module Routes */}
        <Route path="/customer" element={<CustomerLayout />}>
          <Route index element={<CustomerDashboard />} />
          <Route path="products" element={<BrowseProducts />} />
          <Route path="product/:id" element={<ProductDetails />} />
          <Route path="cart" element={<Cart />} />
          <Route path="checkout" element={<Checkout />} />
        </Route>

        {/* Supplier Module Routes */}
        <Route path="/supplier" element={<SupplierLayout />}>
          <Route index element={<SupplierDashboard />} />
          <Route path="inventory" element={<Inventory />} />
          <Route path="add-product" element={<AddProduct1 />} />
          <Route path="edit-product" element={<EditProduct />} />
          <Route path="buyers" element={<Buyers />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="messages" element={<Messages />} />
          <Route path="order-details" element={<OrdersDetails />} />
          <Route path="settings" element={<Settings2 />} />
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

        {/* 404 Fallback */}
        <Route
          path="*"
          element={
            <div style={{ padding: '40px', textAlign: 'center', color: '#211a16' }}>
              <h2>404 - Page Not Found</h2>
              <Link to="/" style={{ color: '#8c4f16', fontWeight: '600' }}>Return to Home</Link>
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;