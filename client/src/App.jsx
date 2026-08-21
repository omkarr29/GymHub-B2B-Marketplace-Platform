import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Outlet, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { CartProvider } from './context/CartContext.jsx';

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
import CustomerDashboard from './pages/Customer/CustomerDashboard.jsx';
import BrowseProducts from './pages/Customer/BrowseProducts.jsx';
import ProductDetails from './pages/Customer/ProductDetails.jsx';
import Cart from './pages/Customer/Cart.jsx';
import Checkout from './pages/Customer/Checkout.jsx';
import CustomerOrders from './pages/Customer/Orders.jsx';
import CustomerOrderDetails from './pages/Customer/OrderDetails.jsx';
import CustomerNotifications from './pages/Customer/Notifications.jsx';
import CustomerProfile from './pages/Customer/Profile.jsx';

// Landing Page (public marketing site)
import LandingPage from './pages/public/Landing.jsx';

// Supplier Components & Pages
import SupplierSidebar from './components/Supplier/SupplierSidebar.jsx';
import SupplierNavbar from './components/Supplier/SupplierNavbar.jsx';
import SupplierDashboard from './pages/Supplier/SupplierDashboard.jsx';
import SupplierProducts from './pages/Supplier/SupplierProducts.jsx';
import AddProduct from './pages/Supplier/AddProduct.jsx';
import Inventory from './pages/Supplier/Inventory.jsx';
import SupplierOrders from './pages/Supplier/SupplierOrders.jsx';
import SupplierOrderDetails from './pages/Supplier/SupplierOrderDetails.jsx';
import Buyers from './pages/Supplier/Buyers.jsx';
import Messages from './pages/Supplier/Messages.jsx';
import SupplierNotifications from './pages/Supplier/SupplierNotifications.jsx';
import BusinessProfile from './pages/Supplier/BusinessProfile.jsx';

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

// Supplier Layout — mirrors CustomerLayout's structure and behavior
const SupplierLayout = () => {
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
      <SupplierSidebar isOpen={sidebarOpen} onClose={closeSidebar} />

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
        <SupplierNavbar onToggleSidebar={toggleSidebar} />

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
    <CartProvider>
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
          <Route path="orders" element={<CustomerOrders />} />
          <Route path="orders/:id" element={<CustomerOrderDetails />} />
          <Route path="notifications" element={<CustomerNotifications />} />
          <Route path="profile" element={<CustomerProfile />} />
        </Route>

        {/* Supplier Module Routes */}
        <Route path="/supplier" element={<SupplierLayout />}>
          <Route index element={<SupplierDashboard />} />
          <Route path="products" element={<SupplierProducts />} />
          <Route path="products/add" element={<AddProduct />} />
          <Route path="inventory" element={<Inventory />} />
          <Route path="orders" element={<SupplierOrders />} />
          <Route path="orders/:id" element={<SupplierOrderDetails />} />
          <Route path="buyers" element={<Buyers />} />
          <Route path="messages" element={<Messages />} />
          <Route path="notifications" element={<SupplierNotifications />} />
          <Route path="profile" element={<BusinessProfile />} />
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
    </CartProvider>
  );
}

export default App;