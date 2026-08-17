import React, { useState } from 'react';

const Products = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Categories list
  const categoriesList = [
    'All',
    'Cardio Equipment',
    'Strength Equipment',
    'Functional Training',
    'Free Weights',
    'Gym Accessories',
    'Gym Flooring'
  ];

  // Dummy marketplace products dataset
  const initialProducts = [
    {
      id: 'PRD-101',
      name: 'Commercial Motorized Treadmill T-900',
      supplier: 'FitEquip India',
      category: 'Cardio Equipment',
      price: '₹1,25,000',
      stock: 14,
      status: 'Approved',
      date: '12 Aug 2026',
      description: 'Heavy-duty 5HP AC motor commercial treadmill with automatic incline and interactive touch console.'
    },
    {
      id: 'PRD-102',
      name: 'Dual Cable Cross Over Machine',
      supplier: 'Titan Fitness Gear',
      category: 'Strength Equipment',
      price: '₹98,000',
      stock: 6,
      status: 'Pending',
      date: '14 Aug 2026',
      description: 'Multi-adjustable dual pulley station with high tensile aircraft-grade steel cables.'
    },
    {
      id: 'PRD-103',
      name: 'Olympic Rubber Bumper Plates Set (150kg)',
      supplier: 'Apex Gym Supply',
      category: 'Free Weights',
      price: '₹28,500',
      stock: 45,
      status: 'Approved',
      date: '08 Aug 2026',
      description: 'IWF standard high-density solid virgin rubber bumper plates with stainless steel inserts.'
    },
    {
      id: 'PRD-104',
      name: 'Air Rowing Machine with Bluetooth Monitor',
      supplier: 'ProGym Solutions',
      category: 'Cardio Equipment',
      price: '₹54,000',
      stock: 9,
      status: 'Pending',
      date: '15 Aug 2026',
      description: 'Precision air-resistance rower with ergonomic handle and PM5-compatible digital console.'
    },
    {
      id: 'PRD-105',
      name: 'Interlocking High-Density Gym Rubber Tiles (20mm)',
      supplier: 'Apex Gym Supply',
      category: 'Gym Flooring',
      price: '₹1,150 / sqft',
      stock: 500,
      status: 'Rejected',
      date: '01 Aug 2026',
      description: 'Shock-absorbent, anti-skid commercial grade recycled EPDM rubber gym flooring tiles.'
    }
  ];

  const [products, setProducts] = useState(initialProducts);

  // Search & Filter Logic
  const filteredProducts = products.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.supplier.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || item.category === categoryFilter;
    const matchesStatus = statusFilter === 'All' || item.status === statusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleStatusChange = (id, newStatus) => {
    setProducts(
      products.map((p) => (p.id === id ? { ...p, status: newStatus } : p))
    );
    if (selectedProduct && selectedProduct.id === id) {
      setSelectedProduct((prev) => ({ ...prev, status: newStatus }));
    }
  };

  const getStatusBadge = (status) => {
    let bg = '#ede0d9';
    let color = '#211a16';

    if (status === 'Approved') {
      bg = '#e6f4ea';
      color = '#137333';
    } else if (status === 'Pending') {
      bg = '#fed1b0';
      color = '#79573d';
    } else if (status === 'Rejected') {
      bg = '#fce8e6';
      color = '#ba1a1a';
    }

    return (
      <span
        style={{
          padding: '4px 8px',
          borderRadius: '4px',
          fontSize: '12px',
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
      {/* Page Header */}
      <div>
        <h1 style={{ margin: 0, fontSize: '24px', fontWeight: '600', color: '#211a16' }}>
          Product Catalog & Approvals
        </h1>
        <p style={{ margin: '4px 0 0', fontSize: '14px', color: '#534439' }}>
          Review, approve, and moderate gym equipment catalog listings.
        </p>
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
            placeholder="Search product, supplier or ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              padding: '8px 12px',
              borderRadius: '6px',
              border: '1px solid #d8c3b5',
              backgroundColor: '#fff1e9',
              fontSize: '14px',
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
              fontSize: '14px',
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
              fontSize: '14px',
              color: '#211a16',
              outline: 'none',
              cursor: 'pointer'
            }}
          >
            <option value="All">All Statuses</option>
            <option value="Approved">Approved</option>
            <option value="Pending">Pending</option>
            <option value="Rejected">Rejected</option>
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
              <th style={{ padding: '12px 16px' }}>Product</th>
              <th style={{ padding: '12px 16px' }}>Supplier</th>
              <th style={{ padding: '12px 16px' }}>Category</th>
              <th style={{ padding: '12px 16px' }}>Price</th>
              <th style={{ padding: '12px 16px' }}>Stock</th>
              <th style={{ padding: '12px 16px' }}>Status</th>
              <th style={{ padding: '12px 16px', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.length > 0 ? (
              filteredProducts.map((prod) => (
                <tr key={prod.id} style={{ borderBottom: '1px solid #ede0d9' }}>
                  <td style={{ padding: '14px 16px' }}>
                    <div style={{ fontWeight: '600', color: '#211a16' }}>{prod.name}</div>
                    <div style={{ fontSize: '11px', color: '#857468' }}>ID: {prod.id}</div>
                  </td>
                  <td style={{ padding: '14px 16px', color: '#534439' }}>{prod.supplier}</td>
                  <td style={{ padding: '14px 16px', color: '#00687a', fontWeight: '500' }}>{prod.category}</td>
                  <td style={{ padding: '14px 16px', fontWeight: '600', color: '#8c4f16' }}>{prod.price}</td>
                  <td style={{ padding: '14px 16px', color: '#211a16' }}>{prod.stock} units</td>
                  <td style={{ padding: '14px 16px' }}>{getStatusBadge(prod.status)}</td>
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

                      {prod.status === 'Pending' && (
                        <>
                          <button
                            onClick={() => handleStatusChange(prod.id, 'Approved')}
                            style={{
                              padding: '4px 8px',
                              borderRadius: '4px',
                              border: '1px solid #137333',
                              backgroundColor: '#e6f4ea',
                              color: '#137333',
                              fontSize: '12px',
                              fontWeight: '600',
                              cursor: 'pointer'
                            }}
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleStatusChange(prod.id, 'Rejected')}
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
                            Reject
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" style={{ padding: '32px', textAlign: 'center', color: '#857468' }}>
                  No products found matching the criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Product Detail Modal */}
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
              <div><strong>Title:</strong> {selectedProduct.name}</div>
              <div><strong>Supplier:</strong> {selectedProduct.supplier}</div>
              <div><strong>Category:</strong> {selectedProduct.category}</div>
              <div><strong>Price:</strong> {selectedProduct.price}</div>
              <div><strong>Available Stock:</strong> {selectedProduct.stock} units</div>
              <div><strong>Status:</strong> {getStatusBadge(selectedProduct.status)}</div>
              <div><strong>Submitted Date:</strong> {selectedProduct.date}</div>
              <div style={{ marginTop: '8px', padding: '10px', backgroundColor: '#fff1e9', borderRadius: '6px' }}>
                <strong>Technical Specifications:</strong>
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

              {selectedProduct.status === 'Pending' && (
                <>
                  <button
                    onClick={() => handleStatusChange(selectedProduct.id, 'Rejected')}
                    style={{
                      padding: '8px 14px',
                      backgroundColor: '#fce8e6',
                      color: '#ba1a1a',
                      border: '1px solid #ba1a1a',
                      borderRadius: '4px',
                      fontWeight: '600',
                      fontSize: '13px',
                      cursor: 'pointer'
                    }}
                  >
                    Reject
                  </button>
                  <button
                    onClick={() => handleStatusChange(selectedProduct.id, 'Approved')}
                    style={{
                      padding: '8px 14px',
                      backgroundColor: '#137333',
                      color: '#ffffff',
                      border: 'none',
                      borderRadius: '4px',
                      fontWeight: '600',
                      fontSize: '13px',
                      cursor: 'pointer'
                    }}
                  >
                    Approve
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;