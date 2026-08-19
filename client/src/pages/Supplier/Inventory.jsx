import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Inventory = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [updatingItem, setUpdatingItem] = useState(null);
  const [newStockValue, setNewStockValue] = useState('');

  // Initial Inventory Mock Data
  const initialInventory = [
    {
      id: 'PRD-101',
      name: 'Commercial Motorized Treadmill T-900',
      sku: 'FE-TRD-900',
      currentStock: 14,
      moq: 2,
      lowStockThreshold: 5,
      lastUpdated: '18 Aug 2026, 11:30 AM'
    },
    {
      id: 'PRD-102',
      name: 'Dual Cable Cross Over Machine',
      sku: 'FE-STR-102',
      currentStock: 6,
      moq: 1,
      lowStockThreshold: 3,
      lastUpdated: '17 Aug 2026, 04:15 PM'
    },
    {
      id: 'PRD-103',
      name: 'Olympic Rubber Bumper Plates (150kg Set)',
      sku: 'FE-FW-103',
      currentStock: 45,
      moq: 3,
      lowStockThreshold: 10,
      lastUpdated: '18 Aug 2026, 09:00 AM'
    },
    {
      id: 'PRD-104',
      name: 'Air Rowing Machine with Bluetooth Console',
      sku: 'FE-CRD-104',
      currentStock: 0,
      moq: 2,
      lowStockThreshold: 5,
      lastUpdated: '15 Aug 2026, 02:45 PM'
    },
    {
      id: 'PRD-105',
      name: 'Olympic 20kg Hard Chrome Barbell',
      sku: 'FE-FW-105',
      currentStock: 4,
      moq: 5,
      lowStockThreshold: 10,
      lastUpdated: '16 Aug 2026, 06:10 PM'
    },
    {
      id: 'PRD-106',
      name: 'Interlocking Gym Rubber Tiles (20mm)',
      sku: 'FE-FLR-106',
      currentStock: 500,
      moq: 50,
      lowStockThreshold: 100,
      lastUpdated: '14 Aug 2026, 10:20 AM'
    }
  ];

  const [inventory, setInventory] = useState(initialInventory);

  // Requirement #22: Stock Status Evaluation Logic
  const getStockStatus = (stock, threshold) => {
    if (stock === 0) return 'Out of Stock';
    if (stock <= threshold) return 'Low Stock';
    return 'In Stock';
  };

  // Search & Filter Logic
  const filteredInventory = inventory.filter((item) => {
    const status = getStockStatus(item.currentStock, item.lowStockThreshold);
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Open Update Stock Modal
  const openUpdateModal = (item) => {
    setUpdatingItem(item);
    setNewStockValue(item.currentStock.toString());
  };

  // Requirement #21: Save Stock Update
  const handleSaveStock = (e) => {
    e.preventDefault();
    if (newStockValue === '' || Number(newStockValue) < 0) {
      alert('Please enter a valid non-negative stock number.');
      return;
    }

    const updatedQty = Number(newStockValue);
    const now = new Date();
    const formattedDate = `${now.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}, ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;

    setInventory(
      inventory.map((item) =>
        item.id === updatingItem.id
          ? {
              ...item,
              currentStock: updatedQty,
              lastUpdated: formattedDate
            }
          : item
      )
    );

    setUpdatingItem(null);
  };

  const getStatusBadge = (status) => {
    let bg = '#ede0d9';
    let color = '#211a16';

    if (status === 'In Stock') {
      bg = '#e6f4ea';
      color = '#137333';
    } else if (status === 'Low Stock') {
      bg = '#fed1b0';
      color = '#79573d';
    } else if (status === 'Out of Stock') {
      bg = '#fce8e6';
      color = '#ba1a1a';
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
      {/* Page Header */}
      <div>
        <h1 style={{ margin: 0, fontSize: '24px', fontWeight: '600', color: '#211a16' }}>
          Inventory Management
        </h1>
        <p style={{ margin: '4px 0 0', fontSize: '14px', color: '#534439' }}>
          Track warehouse stock quantities, set low-inventory thresholds, and manage wholesale supply levels.
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
        <div style={{ flex: '1 1 240px', maxWidth: '340px' }}>
          <input
            type="text"
            placeholder="Search product name, SKU, or ID..."
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

        <div>
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
            <option value="All">All Inventory Statuses</option>
            <option value="In Stock">In Stock</option>
            <option value="Low Stock">Low Stock</option>
            <option value="Out of Stock">Out of Stock</option>
          </select>
        </div>
      </div>

      {/* Requirement #20: Inventory Table */}
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
              <th style={{ padding: '12px 16px' }}>Current Stock</th>
              <th style={{ padding: '12px 16px' }}>B2B MOQ</th>
              <th style={{ padding: '12px 16px' }}>Threshold</th>
              <th style={{ padding: '12px 16px' }}>Status</th>
              <th style={{ padding: '12px 16px' }}>Last Updated</th>
              <th style={{ padding: '12px 16px', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredInventory.length > 0 ? (
              filteredInventory.map((item) => {
                const status = getStockStatus(item.currentStock, item.lowStockThreshold);
                return (
                  <tr key={item.id} style={{ borderBottom: '1px solid #ede0d9' }}>
                    <td style={{ padding: '14px 16px' }}>
                      <div style={{ fontWeight: '600', color: '#211a16' }}>{item.name}</div>
                      <div style={{ fontSize: '11px', color: '#857468' }}>SKU: {item.sku}</div>
                    </td>
                    <td style={{ padding: '14px 16px' }}>
                      <span
                        style={{
                          fontSize: '14px',
                          fontWeight: '700',
                          color: status === 'Out of Stock' ? '#ba1a1a' : status === 'Low Stock' ? '#79573d' : '#211a16'
                        }}
                      >
                        {item.currentStock} units
                      </span>
                    </td>
                    <td style={{ padding: '14px 16px', color: '#534439' }}>{item.moq} units</td>
                    <td style={{ padding: '14px 16px', color: '#857468' }}>≤ {item.lowStockThreshold} units</td>
                    <td style={{ padding: '14px 16px' }}>{getStatusBadge(status)}</td>
                    <td style={{ padding: '14px 16px', color: '#534439', fontSize: '12px' }}>{item.lastUpdated}</td>
                    <td style={{ padding: '14px 16px', textAlign: 'right' }}>
                      <div style={{ display: 'inline-flex', gap: '8px' }}>
                        <button
                          onClick={() => openUpdateModal(item)}
                          style={{
                            padding: '5px 10px',
                            borderRadius: '4px',
                            border: '1px solid #8c4f16',
                            backgroundColor: '#fff8f5',
                            color: '#8c4f16',
                            fontSize: '12px',
                            fontWeight: '600',
                            cursor: 'pointer'
                          }}
                        >
                          Update Stock
                        </button>
                        <Link
                          to={`/supplier/products/edit/${item.id}`}
                          style={{
                            padding: '5px 10px',
                            borderRadius: '4px',
                            border: '1px solid #d8c3b5',
                            backgroundColor: '#fff1e9',
                            color: '#211a16',
                            fontSize: '12px',
                            fontWeight: '500',
                            textDecoration: 'none'
                          }}
                        >
                          View Product
                        </Link>
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="7" style={{ padding: '36px', textAlign: 'center', color: '#857468' }}>
                  No inventory items matched your filter query.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Requirement #21: Inventory Update Modal */}
      {updatingItem && (
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
              maxWidth: '420px',
              padding: '24px',
              boxShadow: '0 8px 24px rgba(0,0,0,0.15)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <h3 style={{ margin: 0, fontSize: '18px', color: '#211a16' }}>Update Stock</h3>
              <button
                onClick={() => setUpdatingItem(null)}
                style={{ background: 'none', border: 'none', fontSize: '18px', cursor: 'pointer', color: '#534439' }}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveStock} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', color: '#857468', marginBottom: '2px' }}>Product</label>
                <div style={{ fontWeight: '600', color: '#211a16', fontSize: '14px' }}>{updatingItem.name}</div>
                <div style={{ fontSize: '11px', color: '#79573d' }}>SKU: {updatingItem.sku}</div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', backgroundColor: '#fff1e9', padding: '10px', borderRadius: '6px' }}>
                <div>
                  <span style={{ fontSize: '11px', color: '#857468' }}>Current Stock:</span>
                  <div style={{ fontWeight: '700', fontSize: '16px', color: '#211a16' }}>{updatingItem.currentStock}</div>
                </div>
                <div>
                  <span style={{ fontSize: '11px', color: '#857468' }}>Low Threshold:</span>
                  <div style={{ fontWeight: '700', fontSize: '16px', color: '#ba1a1a' }}>{updatingItem.lowStockThreshold}</div>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#211a16', marginBottom: '6px' }}>
                  New Stock Quantity *
                </label>
                <input
                  type="number"
                  min="0"
                  value={newStockValue}
                  onChange={(e) => setNewStockValue(e.target.value)}
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
                  autoFocus
                  required
                />
              </div>

              <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                <button
                  type="button"
                  onClick={() => setUpdatingItem(null)}
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
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{
                    padding: '8px 18px',
                    backgroundColor: '#8c4f16',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '4px',
                    fontWeight: '600',
                    fontSize: '13px',
                    cursor: 'pointer'
                  }}
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Inventory;