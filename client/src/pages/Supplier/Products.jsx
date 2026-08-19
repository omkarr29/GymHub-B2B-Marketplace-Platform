import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Products = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Categories list
  const categoriesList = [
    'All',
    'Cardio Equipment',
    'Strength Equipment',
    'Free Weights',
    'Functional Training',
    'Gym Flooring',
    'Gym Accessories'
  ];

  // Dummy supplier catalog dataset
  const initialProducts = [
    {
      id: 'PRD-101',
      name: 'Commercial Motorized Treadmill T-900',
      category: 'Cardio Equipment',
      price: '₹1,25,000',
      bulkPrice: '₹1,15,000 (5+ units)',
      moq: 2,
      stock: 14,
      status: 'Active',
      ordersCount: 42,
      sku: 'FE-TRD-900',
      description: 'Heavy-duty 5HP AC motor commercial treadmill with automatic incline and interactive touch console.'
    },
    {
      id: 'PRD-102',
      name: 'Dual Cable Cross Over Machine',
      category: 'Strength Equipment',
      price: '₹98,000',
      bulkPrice: '₹90,000 (3+ units)',
      moq: 1,
      stock: 6,
      status: 'Pending Approval',
      ordersCount: 18,
      sku: 'FE-STR-102',
      description: 'Multi-adjustable dual pulley station with high tensile aircraft-grade steel cables.'
    },
    {
      id: 'PRD-103',
      name: 'Olympic Rubber Bumper Plates (150kg Set)',
      category: 'Free Weights',
      price: '₹28,500',
      bulkPrice: '₹26,000 (5+ sets)',
      moq: 3,
      stock: 45,
      status: 'Active',
      ordersCount: 96,
      sku: 'FE-FW-103',
      description: 'IWF standard high-density solid virgin rubber bumper plates with stainless steel inserts.'
    },
    {
      id: 'PRD-104',
      name: 'Air Rowing Machine with Bluetooth Console',
      category: 'Cardio Equipment',
      price: '₹54,000',
      bulkPrice: '₹49,000 (4+ units)',
      moq: 2,
      stock: 0,
      status: 'Out of Stock',
      ordersCount: 12,
      sku: 'FE-CRD-104',
      description: 'Precision air-resistance rower with ergonomic handle and PM5-compatible digital console.'
    },
    {
      id: 'PRD-105',
      name: 'Interlocking Gym Rubber Tiles (20mm)',
      category: 'Gym Flooring',
      price: '₹1,150 / sqft',
      bulkPrice: '₹980 (100+ sqft)',
      moq: 50,
      stock: 500,
      status: 'Rejected',
      ordersCount: 0,
      sku: 'FE-FLR-105',
      description: 'Shock-absorbent, anti-skid commercial grade recycled EPDM rubber gym flooring tiles.'
    },
    {
      id: 'PRD-106',
      name: 'Commercial Adjustable Decline Bench',
      category: 'Strength Equipment',
      price: '₹22,000',
      bulkPrice: '₹19,500 (4+ units)',
      moq: 2,
      stock: 8,
      status: 'Draft',
      ordersCount: 0,
      sku: 'FE-STR-106',
      description: 'Ergonomic heavy-gauge steel bench with multi-angle decline positions.'
    }
  ];

  const [products, setProducts] = useState(initialProducts);

  // Search & Filter Logic
  const filteredProducts = products.filter((prod) => {
    const matchesSearch =
      prod.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prod.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prod.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || prod.status === statusFilter;
    const matchesCategory = categoryFilter === 'All' || prod.category === categoryFilter;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const handleDeleteProduct = (id, name) => {
    if (window.confirm(`Are you sure you want to remove "${name}" from your catalog?`)) {
      setProducts(products.filter((p) => p.id !== id));
      if (selectedProduct && selectedProduct.id === id) {
        setSelectedProduct(null);
      }
    }
  };

  const getProductStatusBadge = (status) => {
    let bg = '#ede0d9';
    let color = '#211a16';

    if (status === 'Active') {
      bg = '#e6f4ea';
      color = '#137333';
    } else if (status === 'Pending Approval') {
      bg = '#fed1b0';
      color = '#79573d';
    } else if (status === 'Rejected') {
      bg = '#fce8e6';
      color = '#ba1a1a';
    } else if (status === 'Out of Stock') {
      bg = '#fff1e9';
      color = '#ba1a1a';
    } else if (status === 'Draft') {
      bg = '#ede0d9';
      color = '#534439';
    }

    return (
      <span
        style={{
          padding: '4px 8px',
          borderRadius: '4px',
          fontSize: '11px',
          fontWeight: '600',
          backgroundColor: bg,
          color: color
        }}
      >
        {status}
      </span>
    );
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h1 style={{ margin: 0, fontSize: '24px', fontWeight: '600', color: '#211a16' }}>
            My Products
          </h1>
          <p style={{ margin: '4px 0 0', fontSize: '14px', color: '#534439' }}>
            Manage your listed gym equipment, track MOQ rules, and review marketplace approval statuses.
          </p>
        </div>

        <Link
          to="/supplier/products/add"
          style={{
            padding: '10px 18px',
            backgroundColor: '#8c4f16',
            color: '#ffffff',
            borderRadius: '6px',
            textDecoration: 'none',
            fontWeight: '600',
            fontSize: '13px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <span>＋</span> Add New Product
        </Link>
      </div>

      {/* Filter and Search Bar */}
      <div
        style={{
          backgroundColor: '#fff8f5',
          border: '1px solid #d8c3b5',
          borderRadius: '8px',
          padding: '16px',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '16px',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <div style={{ flex: '1 1 240px', maxWidth: '320px' }}>
          <input
            type="text"
            placeholder="Search product, SKU, or ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              padding: '8px 12px',
              borderRadius: '6px',
              border: '1px solid #d8c3b5',
              backgroundColor: '#fff1e9',
              fontSize: '13px',
              outline: 'none',
              boxSizing: 'border-box'
            }}
          />
        </div>

        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            style={{
              padding: '8px 12px',
              borderRadius: '6px',
              border: '1px solid #d8c3b5',
              backgroundColor: '#fff8f5',
              fontSize: '13px',
              color: '#211a16',
              outline: 'none',
              cursor: 'pointer'
            }}
          >
            {categoriesList.map((cat, idx) => (
              <option key={idx} value={cat}>
                {cat === 'All' ? 'All Categories' : cat}
              </option>
            ))}
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            style={{
              padding: '8px 12px',
              borderRadius: '6px',
              border: '1px solid #d8c3b5',
              backgroundColor: '#fff8f5',
              fontSize: '13px',
              color: '#211a16',
              outline: 'none',
              cursor: 'pointer'
            }}
          >
            <option value="All">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Pending Approval">Pending Approval</option>
            <option value="Rejected">Rejected</option>
            <option value="Out of Stock">Out of Stock</option>
            <option value="Draft">Draft</option>
          </select>
        </div>
      </div>

      {/* Products Table */}
      <div
        style={{
          backgroundColor: '#fff8f5',
          border: '1px solid #d8c3b5',
          borderRadius: '8px',
          overflowX: 'auto'
        }}
      >
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
          <thead>
            <tr style={{ backgroundColor: '#fff1e9', borderBottom: '1px solid #d8c3b5', color: '#534439' }}>
              <th style={{ padding: '12px 16px' }}>Product & SKU</th>
              <th style={{ padding: '12px 16px' }}>Category</th>
              <th style={{ padding: '12px 16px' }}>Base Price</th>
              <th style={{ padding: '12px 16px' }}>B2B MOQ</th>
              <th style={{ padding: '12px 16px' }}>Stock</th>
              <th style={{ padding: '12px 16px' }}>Status</th>
              <th style={{ padding: '12px 16px' }}>Total Orders</th>
              <th style={{ padding: '12px 16px', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.length > 0 ? (
              filteredProducts.map((prod) => (
                <tr key={prod.id} style={{ borderBottom: '1px solid #ede0d9' }}>
                  <td style={{ padding: '14px 16px' }}>
                    <div style={{ fontWeight: '600', color: '#211a16' }}>{prod.name}</div>
                    <div style={{ fontSize: '11px', color: '#857468' }}>SKU: {prod.sku}</div>
                  </td>
                  <td style={{ padding: '14px 16px', color: '#00687a', fontWeight: '500' }}>
                    {prod.category}
                  </td>
                  <td style={{ padding: '14px 16px' }}>
                    <div style={{ fontWeight: '600', color: '#8c4f16' }}>{prod.price}</div>
                    <div style={{ fontSize: '11px', color: '#79573d' }}>{prod.bulkPrice}</div>
                  </td>
                  <td style={{ padding: '14px 16px', fontWeight: '600', color: '#211a16' }}>
                    {prod.moq} units
                  </td>
                  <td style={{ padding: '14px 16px' }}>
                    <span style={{ fontWeight: '600', color: prod.stock <= 5 ? '#ba1a1a' : '#211a16' }}>
                      {prod.stock}
                    </span>
                  </td>
                  <td style={{ padding: '14px 16px' }}>{getProductStatusBadge(prod.status)}</td>
                  <td style={{ padding: '14px 16px', color: '#534439' }}>{prod.ordersCount} sales</td>
                  <td style={{ padding: '14px 16px', textAlign: 'right' }}>
                    <div style={{ display: 'inline-flex', gap: '6px' }}>
                      <button
                        onClick={() => setSelectedProduct(prod)}
                        style={{
                          padding: '4px 8px',
                          borderRadius: '4px',
                          border: '1px solid #d8c3b5',
                          backgroundColor: '#fff8f5',
                          color: '#00687a',
                          fontSize: '12px',
                          fontWeight: '600',
                          cursor: 'pointer'
                        }}
                      >
                        View
                      </button>
                      <Link
                        to={`/supplier/products/edit/${prod.id}`}
                        style={{
                          padding: '4px 8px',
                          borderRadius: '4px',
                          border: '1px solid #8c4f16',
                          backgroundColor: '#fff8f5',
                          color: '#8c4f16',
                          fontSize: '12px',
                          fontWeight: '600',
                          textDecoration: 'none'
                        }}
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDeleteProduct(prod.id, prod.name)}
                        style={{
                          padding: '4px 8px',
                          borderRadius: '4px',
                          border: '1px solid #ba1a1a',
                          backgroundColor: '#fce8e6',
                          color: '#ba1a1a',
                          fontSize: '12px',
                          fontWeight: '600',
                          cursor: 'pointer'
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              /* Requirement #34: Empty State */
              <tr>
                <td colSpan="8" style={{ padding: '40px 16px', textAlign: 'center', color: '#857468' }}>
                  <div style={{ fontSize: '28px', marginBottom: '8px' }}>📦</div>
                  <div style={{ fontWeight: '600', color: '#211a16', fontSize: '15px' }}>No products found</div>
                  <p style={{ margin: '4px 0 16px', fontSize: '13px' }}>
                    Try clearing filters or add your first gym equipment listing.
                  </p>
                  <Link
                    to="/supplier/products/add"
                    style={{
                      padding: '8px 16px',
                      backgroundColor: '#8c4f16',
                      color: '#ffffff',
                      borderRadius: '6px',
                      textDecoration: 'none',
                      fontSize: '13px',
                      fontWeight: '600'
                    }}
                  >
                    Add Product Now
                  </Link>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Product Details Modal */}
      {selectedProduct && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(33, 26, 22, 0.45)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 100,
            padding: '16px'
          }}
        >
          <div
            style={{
              backgroundColor: '#fff8f5',
              border: '1px solid #d8c3b5',
              borderRadius: '8px',
              width: '100%',
              maxWidth: '480px',
              padding: '24px',
              boxShadow: '0 8px 24px rgba(0,0,0,0.15)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ margin: 0, fontSize: '18px', color: '#211a16' }}>Product Details</h3>
              <button
                onClick={() => setSelectedProduct(null)}
                style={{ background: 'none', border: 'none', fontSize: '18px', cursor: 'pointer', color: '#534439' }}
              >
                ✕
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px', color: '#211a16' }}>
              <div><strong>Product Code:</strong> {selectedProduct.id}</div>
              <div><strong>SKU:</strong> {selectedProduct.sku}</div>
              <div><strong>Name:</strong> {selectedProduct.name}</div>
              <div><strong>Category:</strong> {selectedProduct.category}</div>
              <div><strong>Base Price:</strong> {selectedProduct.price}</div>
              <div><strong>Bulk Tier:</strong> {selectedProduct.bulkPrice}</div>
              <div><strong>Minimum Order Quantity (MOQ):</strong> {selectedProduct.moq} units</div>
              <div><strong>Current Stock:</strong> {selectedProduct.stock} units</div>
              <div><strong>Approval Status:</strong> {getProductStatusBadge(selectedProduct.status)}</div>
              <div><strong>Total Sales:</strong> {selectedProduct.ordersCount} orders fulfilled</div>

              <div style={{ marginTop: '8px', padding: '10px', backgroundColor: '#fff1e9', borderRadius: '6px' }}>
                <strong>Product Description:</strong>
                <p style={{ margin: '4px 0 0', color: '#534439', lineHeight: '18px' }}>
                  {selectedProduct.description}
                </p>
              </div>
            </div>

            <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
              <button
                onClick={() => setSelectedProduct(null)}
                style={{
                  padding: '8px 14px',
                  backgroundColor: '#ede0d9',
                  color: '#211a16',
                  border: 'none',
                  borderRadius: '4px',
                  fontWeight: '600',
                  fontSize: '13px',
                  cursor: 'pointer'
                }}
              >
                Close
              </button>
              <Link
                to={`/supplier/products/edit/${selectedProduct.id}`}
                style={{
                  padding: '8px 14px',
                  backgroundColor: '#8c4f16',
                  color: '#ffffff',
                  borderRadius: '4px',
                  textDecoration: 'none',
                  fontWeight: '600',
                  fontSize: '13px'
                }}
              >
                Edit Product
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;