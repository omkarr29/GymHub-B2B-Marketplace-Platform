import React, { useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { supplierProducts as initialProducts, getStatusBadge } from './data.js';

const StatusBadge = ({ status }) => {
  const { bg, text } = getStatusBadge(status);
  return (
    <span
      style={{
        fontSize: '11px',
        fontWeight: '600',
        color: text,
        backgroundColor: bg,
        padding: '3px 10px',
        borderRadius: '9999px',
      }}
    >
      {status}
    </span>
  );
};

const SupplierProducts = () => {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState(initialProducts);
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const [statusFilter, setStatusFilter] = useState('All');
  const [productToDelete, setProductToDelete] = useState(null);

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesSearch =
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.sku.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus =
        statusFilter === 'All' ||
        (statusFilter === 'Out of Stock' ? p.status === 'Out of Stock' : p.status === statusFilter);
      return matchesSearch && matchesStatus;
    });
  }, [products, searchTerm, statusFilter]);

  const handleDelete = () => {
    setProducts((prev) => prev.filter((p) => p.id !== productToDelete.id));
    setProductToDelete(null);
  };

  return (
    <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h1 style={{ margin: 0, fontSize: '24px', fontWeight: '700', color: '#211a16' }}>My Products</h1>
          <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: '#79573d' }}>
            Manage your product listings, pricing, and stock status.
          </p>
        </div>
        <Link
          to="/supplier/products/add"
          style={{
            textDecoration: 'none',
            padding: '10px 20px',
            borderRadius: '8px',
            backgroundColor: '#00687a',
            color: '#ffffff',
            fontSize: '13px',
            fontWeight: '600',
          }}
        >
          + Add Product
        </Link>
      </div>

      {/* Search & Filters */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center' }}>
        <input
          type="text"
          placeholder="Search by product name or SKU..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            flex: '1 1 260px',
            padding: '10px 14px',
            borderRadius: '8px',
            border: '1px solid #d8c3b5',
            backgroundColor: '#ffffff',
            fontSize: '13px',
            outline: 'none',
            boxSizing: 'border-box',
          }}
        />
        <div style={{ display: 'flex', gap: '8px' }}>
          {['All', 'Active', 'Pending', 'Out of Stock'].map((tab) => (
            <button
              key={tab}
              onClick={() => setStatusFilter(tab)}
              style={{
                padding: '8px 14px',
                borderRadius: '6px',
                border: 'none',
                backgroundColor: statusFilter === tab ? '#00687a' : '#fff1e9',
                color: statusFilter === tab ? '#ffffff' : '#534439',
                fontWeight: statusFilter === tab ? '600' : '400',
                fontSize: '12px',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
              }}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Products Table */}
      <div style={{ backgroundColor: '#fff8f5', border: '1px solid #d8c3b5', borderRadius: '8px', overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
          <thead>
            <tr style={{ backgroundColor: '#fff1e9', borderBottom: '1px solid #d8c3b5', color: '#534439' }}>
              <th style={{ padding: '12px 16px' }}>Product</th>
              <th style={{ padding: '12px 16px' }}>Category</th>
              <th style={{ padding: '12px 16px' }}>Price</th>
              <th style={{ padding: '12px 16px' }}>Stock</th>
              <th style={{ padding: '12px 16px' }}>Status</th>
              <th style={{ padding: '12px 16px' }}>Orders</th>
              <th style={{ padding: '12px 16px', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.length > 0 ? (
              filteredProducts.map((prod) => (
                <tr key={prod.id} style={{ borderBottom: '1px solid #ede0d9' }}>
                  <td style={{ padding: '14px 16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <img
                        src={prod.image}
                        alt={prod.name}
                        style={{ width: '38px', height: '38px', borderRadius: '6px', objectFit: 'cover' }}
                      />
                      <div>
                        <div style={{ fontWeight: '600', color: '#211a16' }}>{prod.name}</div>
                        <div style={{ fontSize: '11px', color: '#857468' }}>SKU: {prod.sku}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '14px 16px', color: '#00687a', fontWeight: '500' }}>{prod.category}</td>
                  <td style={{ padding: '14px 16px', fontWeight: '600', color: '#8c4f16' }}>
                    ₹{prod.price.toLocaleString('en-IN')}
                  </td>
                  <td style={{ padding: '14px 16px', color: '#211a16' }}>{prod.stock} units</td>
                  <td style={{ padding: '14px 16px' }}>
                    <StatusBadge status={prod.status} />
                  </td>
                  <td style={{ padding: '14px 16px', color: '#534439' }}>{prod.orders}</td>
                  <td style={{ padding: '14px 16px', textAlign: 'right' }}>
                    <div style={{ display: 'inline-flex', gap: '6px' }}>
                      <button
                        style={{
                          padding: '4px 10px',
                          borderRadius: '4px',
                          border: '1px solid #d8c3b5',
                          backgroundColor: '#fff8f5',
                          color: '#00687a',
                          fontSize: '12px',
                          fontWeight: '600',
                          cursor: 'pointer',
                        }}
                      >
                        View
                      </button>
                      <button
                        style={{
                          padding: '4px 10px',
                          borderRadius: '4px',
                          border: '1px solid #d8c3b5',
                          backgroundColor: '#fff8f5',
                          color: '#8c4f16',
                          fontSize: '12px',
                          fontWeight: '600',
                          cursor: 'pointer',
                        }}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => setProductToDelete(prod)}
                        style={{
                          padding: '4px 10px',
                          borderRadius: '4px',
                          border: '1px solid #ba1a1a',
                          backgroundColor: '#fce8e6',
                          color: '#ba1a1a',
                          fontSize: '12px',
                          fontWeight: '600',
                          cursor: 'pointer',
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" style={{ padding: '40px', textAlign: 'center', color: '#857468' }}>
                  No products match your search or filter.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Delete Confirmation Modal */}
      {productToDelete && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(33, 26, 22, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 100,
          }}
        >
          <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', padding: '24px', maxWidth: '360px', width: '90%' }}>
            <h3 style={{ margin: '0 0 8px', fontSize: '16px', fontWeight: '700', color: '#211a16' }}>Delete Product?</h3>
            <p style={{ margin: '0 0 20px', fontSize: '13px', color: '#534439' }}>
              This will remove "{productToDelete.name}" from your storefront. This action cannot be undone.
            </p>
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
              <button
                onClick={() => setProductToDelete(null)}
                style={{
                  padding: '8px 16px',
                  borderRadius: '6px',
                  border: '1px solid #d8c3b5',
                  backgroundColor: '#ffffff',
                  color: '#534439',
                  fontSize: '13px',
                  fontWeight: '600',
                  cursor: 'pointer',
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                style={{
                  padding: '8px 16px',
                  borderRadius: '6px',
                  border: 'none',
                  backgroundColor: '#ba1a1a',
                  color: '#ffffff',
                  fontSize: '13px',
                  fontWeight: '600',
                  cursor: 'pointer',
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SupplierProducts;
