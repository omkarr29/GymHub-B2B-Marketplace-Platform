import React, { useState } from 'react';

const Suppliers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedSupplier, setSelectedSupplier] = useState(null);

  // Dummy suppliers dataset
  const initialSuppliers = [
    {
      id: 1,
      supplierName: 'FitEquip India',
      businessName: 'FitEquip Manufacturing Pvt Ltd',
      email: 'sales@fitequip.in',
      phone: '+91 98234 56789',
      productsCount: 48,
      status: 'Active',
      joinedDate: '10 Jan 2026',
      city: 'Mumbai, Maharashtra'
    },
    {
      id: 2,
      supplierName: 'Titan Fitness Gear',
      businessName: 'Titan Heavy Industries',
      email: 'info@titanfitness.com',
      phone: '+91 98765 43210',
      productsCount: 32,
      status: 'Active',
      joinedDate: '22 Feb 2026',
      city: 'Pune, Maharashtra'
    },
    {
      id: 3,
      supplierName: 'ProGym Solutions',
      businessName: 'ProGym Commercial Equipments',
      email: 'support@progym.in',
      phone: '+91 91234 56780',
      productsCount: 15,
      status: 'Pending',
      joinedDate: '01 Aug 2026',
      city: 'Bengaluru, Karnataka'
    },
    {
      id: 4,
      supplierName: 'Apex Gym Supply',
      businessName: 'Apex Rubber & Flooring Co.',
      email: 'contact@apexgym.com',
      phone: '+91 99887 76655',
      productsCount: 8,
      status: 'Rejected',
      joinedDate: '15 Jul 2026',
      city: 'Delhi NCR'
    },
    {
      id: 5,
      supplierName: 'Vanguard Strength',
      businessName: 'Vanguard Weights & Benches',
      email: 'sales@vanguard.in',
      phone: '+91 94567 89012',
      productsCount: 0,
      status: 'Suspended',
      joinedDate: '05 May 2026',
      city: 'Ahmedabad, Gujarat'
    }
  ];

  const [suppliers, setSuppliers] = useState(initialSuppliers);

  // Search & Filter Logic
  const filteredSuppliers = suppliers.filter((sup) => {
    const matchesSearch =
      sup.supplierName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sup.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sup.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || sup.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status) => {
    let bg = '#ede0d9';
    let color = '#211a16';

    if (status === 'Active') {
      bg = '#e6f4ea';
      color = '#137333';
    } else if (status === 'Pending') {
      bg = '#fed1b0';
      color = '#79573d';
    } else if (status === 'Rejected' || status === 'Suspended') {
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
          Suppliers Directory
        </h1>
        <p style={{ margin: '4px 0 0', fontSize: '14px', color: '#534439' }}>
          Manage certified B2B fitness equipment and accessory suppliers.
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
            placeholder="Search supplier, business or email..."
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

        <div>
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
            <option value="Active">Active</option>
            <option value="Pending">Pending</option>
            <option value="Rejected">Rejected</option>
            <option value="Suspended">Suspended</option>
          </select>
        </div>
      </div>

      {/* Suppliers Table */}
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
              <th style={{ padding: '12px 16px' }}>Supplier & Business</th>
              <th style={{ padding: '12px 16px' }}>Contact Info</th>
              <th style={{ padding: '12px 16px' }}>Products</th>
              <th style={{ padding: '12px 16px' }}>Status</th>
              <th style={{ padding: '12px 16px' }}>Joined Date</th>
              <th style={{ padding: '12px 16px', textAlign: 'right' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredSuppliers.length > 0 ? (
              filteredSuppliers.map((sup) => (
                <tr key={sup.id} style={{ borderBottom: '1px solid #ede0d9' }}>
                  <td style={{ padding: '14px 16px' }}>
                    <div style={{ fontWeight: '600', color: '#211a16' }}>{sup.supplierName}</div>
                    <div style={{ fontSize: '12px', color: '#857468' }}>{sup.businessName}</div>
                  </td>
                  <td style={{ padding: '14px 16px' }}>
                    <div style={{ color: '#211a16' }}>{sup.email}</div>
                    <div style={{ fontSize: '12px', color: '#857468' }}>{sup.phone}</div>
                  </td>
                  <td style={{ padding: '14px 16px' }}>
                    <span style={{ fontWeight: '600', color: '#00687a' }}>{sup.productsCount} items</span>
                  </td>
                  <td style={{ padding: '14px 16px' }}>{getStatusBadge(sup.status)}</td>
                  <td style={{ padding: '14px 16px', color: '#534439' }}>{sup.joinedDate}</td>
                  <td style={{ padding: '14px 16px', textAlign: 'right' }}>
                    <button
                      onClick={() => setSelectedSupplier(sup)}
                      style={{
                        padding: '6px 12px',
                        borderRadius: '4px',
                        border: '1px solid #8c4f16',
                        backgroundColor: '#fff8f5',
                        color: '#8c4f16',
                        fontSize: '12px',
                        fontWeight: '600',
                        cursor: 'pointer'
                      }}
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" style={{ padding: '32px', textAlign: 'center', color: '#857468' }}>
                  No suppliers match the current criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Supplier Quick Details Modal */}
      {selectedSupplier && (
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
              <h3 style={{ margin: 0, fontSize: '18px', color: '#211a16' }}>Supplier Profile</h3>
              <button
                onClick={() => setSelectedSupplier(null)}
                style={{ background: 'none', border: 'none', fontSize: '18px', cursor: 'pointer', color: '#534439' }}
              >
                ✕
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '14px', color: '#211a16' }}>
              <div><strong>Supplier Name:</strong> {selectedSupplier.supplierName}</div>
              <div><strong>Registered Entity:</strong> {selectedSupplier.businessName}</div>
              <div><strong>Email:</strong> {selectedSupplier.email}</div>
              <div><strong>Phone:</strong> {selectedSupplier.phone}</div>
              <div><strong>Location:</strong> {selectedSupplier.city}</div>
              <div><strong>Catalog Size:</strong> {selectedSupplier.productsCount} live products</div>
              <div><strong>Status:</strong> {selectedSupplier.status}</div>
              <div><strong>Joined:</strong> {selectedSupplier.joinedDate}</div>
            </div>

            <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'flex-end' }}>
              <button
                onClick={() => setSelectedSupplier(null)}
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#8c4f16',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '4px',
                  fontWeight: '600',
                  fontSize: '13px',
                  cursor: 'pointer'
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Suppliers;