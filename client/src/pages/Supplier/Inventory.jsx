import React, { useState, useMemo } from 'react';
import { supplierProducts, getStatusBadge } from './data.js';

const deriveStockStatus = (stock) => {
  if (stock === 0) return 'Out of Stock';
  if (stock <= 6) return 'Low Stock';
  return 'In Stock';
};

const inventoryData = supplierProducts.map((p) => ({
  ...p,
  minStock: 5,
  lastUpdated: 'Aug 19, 2026',
  stockStatus: deriveStockStatus(p.stock),
}));

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

const Inventory = () => {
  const [items, setItems] = useState(inventoryData);
  const [statusFilter, setStatusFilter] = useState('All');
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState('');

  const filteredItems = useMemo(() => {
    if (statusFilter === 'All') return items;
    return items.filter((i) => i.stockStatus === statusFilter);
  }, [items, statusFilter]);

  const startEdit = (item) => {
    setEditingId(item.id);
    setEditValue(String(item.stock));
  };

  const saveEdit = (id) => {
    const newStock = Math.max(0, parseInt(editValue, 10) || 0);
    setItems((prev) =>
      prev.map((i) =>
        i.id === id
          ? { ...i, stock: newStock, stockStatus: deriveStockStatus(newStock), lastUpdated: 'Just now' }
          : i
      )
    );
    setEditingId(null);
  };

  const lowStockCount = items.filter((i) => i.stockStatus === 'Low Stock').length;
  const outOfStockCount = items.filter((i) => i.stockStatus === 'Out of Stock').length;

  return (
    <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div>
        <h1 style={{ margin: 0, fontSize: '24px', fontWeight: '700', color: '#211a16' }}>Inventory</h1>
        <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: '#79573d' }}>
          Track and update stock levels across all your listed products.
        </p>
      </div>

      {/* Summary Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px' }}>
        <div style={{ backgroundColor: '#ffffff', border: '1px solid #d8c3b5', borderRadius: '12px', padding: '16px' }}>
          <p style={{ margin: 0, fontSize: '12px', color: '#534439' }}>Total SKUs</p>
          <p style={{ margin: '6px 0 0', fontSize: '22px', fontWeight: '700', color: '#8c4f16' }}>{items.length}</p>
        </div>
        <div style={{ backgroundColor: '#ffffff', border: '1px solid #d8c3b5', borderRadius: '12px', padding: '16px' }}>
          <p style={{ margin: 0, fontSize: '12px', color: '#534439' }}>Low Stock</p>
          <p style={{ margin: '6px 0 0', fontSize: '22px', fontWeight: '700', color: '#79573d' }}>{lowStockCount}</p>
        </div>
        <div style={{ backgroundColor: '#ffffff', border: '1px solid #d8c3b5', borderRadius: '12px', padding: '16px' }}>
          <p style={{ margin: 0, fontSize: '12px', color: '#534439' }}>Out of Stock</p>
          <p style={{ margin: '6px 0 0', fontSize: '22px', fontWeight: '700', color: '#ba1a1a' }}>{outOfStockCount}</p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div style={{ display: 'flex', gap: '8px' }}>
        {['All', 'In Stock', 'Low Stock', 'Out of Stock'].map((tab) => (
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
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Inventory Table */}
      <div style={{ backgroundColor: '#fff8f5', border: '1px solid #d8c3b5', borderRadius: '8px', overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
          <thead>
            <tr style={{ backgroundColor: '#fff1e9', borderBottom: '1px solid #d8c3b5', color: '#534439' }}>
              <th style={{ padding: '12px 16px' }}>Product</th>
              <th style={{ padding: '12px 16px' }}>SKU</th>
              <th style={{ padding: '12px 16px' }}>Current Stock</th>
              <th style={{ padding: '12px 16px' }}>Minimum Stock</th>
              <th style={{ padding: '12px 16px' }}>Status</th>
              <th style={{ padding: '12px 16px' }}>Last Updated</th>
              <th style={{ padding: '12px 16px', textAlign: 'right' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredItems.length > 0 ? (
              filteredItems.map((item) => (
                <tr key={item.id} style={{ borderBottom: '1px solid #ede0d9' }}>
                  <td style={{ padding: '14px 16px', fontWeight: '600', color: '#211a16' }}>{item.name}</td>
                  <td style={{ padding: '14px 16px', color: '#857468' }}>{item.sku}</td>
                  <td style={{ padding: '14px 16px' }}>
                    {editingId === item.id ? (
                      <input
                        type="number"
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        autoFocus
                        style={{
                          width: '70px',
                          padding: '4px 8px',
                          borderRadius: '4px',
                          border: '1px solid #d8c3b5',
                          fontSize: '13px',
                        }}
                      />
                    ) : (
                      <span style={{ color: '#211a16' }}>{item.stock} units</span>
                    )}
                  </td>
                  <td style={{ padding: '14px 16px', color: '#534439' }}>{item.minStock} units</td>
                  <td style={{ padding: '14px 16px' }}>
                    <StatusBadge status={item.stockStatus} />
                  </td>
                  <td style={{ padding: '14px 16px', color: '#857468' }}>{item.lastUpdated}</td>
                  <td style={{ padding: '14px 16px', textAlign: 'right' }}>
                    {editingId === item.id ? (
                      <button
                        onClick={() => saveEdit(item.id)}
                        style={{
                          padding: '4px 12px',
                          borderRadius: '4px',
                          border: 'none',
                          backgroundColor: '#00687a',
                          color: '#ffffff',
                          fontSize: '12px',
                          fontWeight: '600',
                          cursor: 'pointer',
                        }}
                      >
                        Save
                      </button>
                    ) : (
                      <button
                        onClick={() => startEdit(item)}
                        style={{
                          padding: '4px 12px',
                          borderRadius: '4px',
                          border: '1px solid #d8c3b5',
                          backgroundColor: '#fff8f5',
                          color: '#8c4f16',
                          fontSize: '12px',
                          fontWeight: '600',
                          cursor: 'pointer',
                        }}
                      >
                        Update Stock
                      </button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" style={{ padding: '40px', textAlign: 'center', color: '#857468' }}>
                  No products match this filter.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Inventory;
