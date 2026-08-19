import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Buyers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedBuyer, setSelectedBuyer] = useState(null);

  // Requirement #26: Dummy Buyers Dataset
  const initialBuyers = [
    {
      id: 1,
      businessName: 'IronFit Gym & Studios',
      contactPerson: 'Rahul Patil',
      email: 'rahul.patil@ironfitgym.in',
      phone: '+91 98111 22334',
      city: 'Pune, Maharashtra',
      gstin: '27AABCI1234F1Z8',
      ordersCount: 12,
      totalPurchase: '₹4,85,000',
      lastOrderDate: '18 Aug 2026',
      status: 'Active',
      topPurchasedItems: ['Commercial Motorized Treadmill T-900', 'Olympic 20kg Hard Chrome Barbell'],
      recentOrders: [
        { id: '#GH-1024', amount: '₹1,70,000', date: '18 Aug 2026', status: 'Processing' },
        { id: '#GH-1002', amount: '₹1,15,000', date: '02 Jul 2026', status: 'Delivered' },
        { id: '#GH-980', amount: '₹2,00,000', date: '15 May 2026', status: 'Delivered' }
      ]
    },
    {
      id: 2,
      businessName: 'Alpha Fitness Club',
      contactPerson: 'Vikram Mehta',
      email: 'procurement@alphafitness.co',
      phone: '+91 98222 33445',
      city: 'Navi Mumbai, Maharashtra',
      gstin: '27BBACI5678K1Z2',
      ordersCount: 8,
      totalPurchase: '₹3,42,500',
      lastOrderDate: '17 Aug 2026',
      status: 'Active',
      topPurchasedItems: ['Olympic Rubber Plates (150kg Set)', 'Interlocking Gym Rubber Tiles (20mm)'],
      recentOrders: [
        { id: '#GH-1023', amount: '₹1,42,500', date: '17 Aug 2026', status: 'Shipped' },
        { id: '#GH-995', amount: '₹2,00,000', date: '10 Jun 2026', status: 'Delivered' }
      ]
    },
    {
      id: 3,
      businessName: 'PowerHouse Fitness Studio',
      contactPerson: 'Anand Roy',
      email: 'anand@powerhousegym.in',
      phone: '+91 98333 44556',
      city: 'Bengaluru, Karnataka',
      gstin: '27XYZAB9988C1Z0',
      ordersCount: 3,
      totalPurchase: '₹1,98,000',
      lastOrderDate: '16 Aug 2026',
      status: 'Active',
      topPurchasedItems: ['Dual Cable Cross Station'],
      recentOrders: [
        { id: '#GH-1022', amount: '₹98,000', date: '16 Aug 2026', status: 'Pending' },
        { id: '#GH-945', amount: '₹1,00,000', date: '20 Apr 2026', status: 'Delivered' }
      ]
    },
    {
      id: 4,
      businessName: 'FitZone CrossFit & Yoga',
      contactPerson: 'Priya Sharma',
      email: 'priya@fitzone.com',
      phone: '+91 98444 55667',
      city: 'Hyderabad, Telangana',
      gstin: '36KLMNO5544P1Z3',
      ordersCount: 5,
      totalPurchase: '₹2,62,000',
      lastOrderDate: '15 Aug 2026',
      status: 'Active',
      topPurchasedItems: ['Air Rowing Machine with Bluetooth', 'Kettlebell Sets'],
      recentOrders: [
        { id: '#GH-1021', amount: '₹1,62,000', date: '15 Aug 2026', status: 'Delivered' }
      ]
    },
    {
      id: 5,
      businessName: 'Zenith Health Club',
      contactPerson: 'Rohan Gupta',
      email: 'rohan@zenithgym.in',
      phone: '+91 98666 77889',
      city: 'Delhi NCR',
      gstin: '07PPPQQ1122R1Z9',
      ordersCount: 1,
      totalPurchase: '₹65,000',
      lastOrderDate: '10 Aug 2026',
      status: 'Inactive',
      topPurchasedItems: ['Olympic 20kg Hard Chrome Barbell'],
      recentOrders: [
        { id: '#GH-1019', amount: '₹65,000', date: '10 Aug 2026', status: 'Cancelled' }
      ]
    }
  ];

  const [buyers] = useState(initialBuyers);

  // Search & Filter Logic
  const filteredBuyers = buyers.filter((b) => {
    const matchesSearch =
      b.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.city.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || b.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Page Header */}
      <div>
        <h1 style={{ margin: 0, fontSize: '24px', fontWeight: '600', color: '#211a16' }}>
          Gym & Commercial Buyers
        </h1>
        <p style={{ margin: '4px 0 0', fontSize: '14px', color: '#534439' }}>
          View customer accounts, lifetime wholesale purchase values, and direct inquiry channels.
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
            placeholder="Search gym, business, or contact person..."
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
            <option value="All">All Buyer Statuses</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
      </div>

      {/* Requirement #26: Buyers Table */}
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
              <th style={{ padding: '12px 16px' }}>Business / Gym</th>
              <th style={{ padding: '12px 16px' }}>Contact Person</th>
              <th style={{ padding: '12px 16px' }}>Orders</th>
              <th style={{ padding: '12px 16px' }}>Total Purchase</th>
              <th style={{ padding: '12px 16px' }}>Last Order</th>
              <th style={{ padding: '12px 16px' }}>Status</th>
              <th style={{ padding: '12px 16px', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredBuyers.length > 0 ? (
              filteredBuyers.map((b) => (
                <tr key={b.id} style={{ borderBottom: '1px solid #ede0d9' }}>
                  <td style={{ padding: '14px 16px' }}>
                    <div style={{ fontWeight: '600', color: '#211a16' }}>{b.businessName}</div>
                    <div style={{ fontSize: '11px', color: '#857468' }}>{b.city}</div>
                  </td>
                  <td style={{ padding: '14px 16px' }}>
                    <div style={{ color: '#211a16' }}>{b.contactPerson}</div>
                    <div style={{ fontSize: '11px', color: '#857468' }}>{b.phone}</div>
                  </td>
                  <td style={{ padding: '14px 16px' }}>
                    <span style={{ fontWeight: '600', color: '#00687a' }}>{b.ordersCount} Orders</span>
                  </td>
                  <td style={{ padding: '14px 16px', fontWeight: '700', color: '#8c4f16' }}>
                    {b.totalPurchase}
                  </td>
                  <td style={{ padding: '14px 16px', color: '#534439', fontSize: '12px' }}>
                    {b.lastOrderDate}
                  </td>
                  <td style={{ padding: '14px 16px' }}>
                    <span
                      style={{
                        padding: '4px 8px',
                        borderRadius: '4px',
                        fontSize: '11px',
                        fontWeight: '600',
                        backgroundColor: b.status === 'Active' ? '#e6f4ea' : '#fff1e9',
                        color: b.status === 'Active' ? '#137333' : '#79573d'
                      }}
                    >
                      {b.status}
                    </span>
                  </td>
                  <td style={{ padding: '14px 16px', textAlign: 'right' }}>
                    <button
                      onClick={() => setSelectedBuyer(b)}
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
                      View Dossier
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              /* Requirement #34: Empty State */
              <tr>
                <td colSpan="7" style={{ padding: '40px 16px', textAlign: 'center', color: '#857468' }}>
                  <div style={{ fontSize: '28px', marginBottom: '8px' }}>🏢</div>
                  <div style={{ fontWeight: '600', color: '#211a16', fontSize: '15px' }}>No buyers found</div>
                  <p style={{ margin: '4px 0 0', fontSize: '13px' }}>
                    Gym businesses will appear here once they place their first wholesale order.
                  </p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Requirement #27: Buyer Details Dossier Modal */}
      {selectedBuyer && (
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
              maxWidth: '520px',
              padding: '24px',
              boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
              maxHeight: '90vh',
              overflowY: 'auto'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div>
                <h3 style={{ margin: 0, fontSize: '18px', color: '#211a16' }}>{selectedBuyer.businessName}</h3>
                <span style={{ fontSize: '12px', color: '#857468' }}>GSTIN: {selectedBuyer.gstin}</span>
              </div>
              <button
                onClick={() => setSelectedBuyer(null)}
                style={{ background: 'none', border: 'none', fontSize: '18px', cursor: 'pointer', color: '#534439' }}
              >
                ✕
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '13px', color: '#211a16' }}>
              {/* Contact Information */}
              <div style={{ backgroundColor: '#fff1e9', padding: '12px', borderRadius: '6px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <div><strong>Primary Contact:</strong> {selectedBuyer.contactPerson}</div>
                <div><strong>Email:</strong> {selectedBuyer.email}</div>
                <div><strong>Phone:</strong> {selectedBuyer.phone}</div>
                <div><strong>Location:</strong> {selectedBuyer.city}</div>
              </div>

              {/* Purchase Overview */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div style={{ border: '1px solid #ede0d9', padding: '10px', borderRadius: '6px' }}>
                  <span style={{ fontSize: '11px', color: '#857468' }}>Lifetime Purchase</span>
                  <div style={{ fontSize: '16px', fontWeight: '700', color: '#8c4f16' }}>{selectedBuyer.totalPurchase}</div>
                </div>
                <div style={{ border: '1px solid #ede0d9', padding: '10px', borderRadius: '6px' }}>
                  <span style={{ fontSize: '11px', color: '#857468' }}>Total Orders Fulfilled</span>
                  <div style={{ fontSize: '16px', fontWeight: '700', color: '#00687a' }}>{selectedBuyer.ordersCount}</div>
                </div>
              </div>

              {/* Top Products */}
              <div>
                <strong>Top Purchased Equipment:</strong>
                <ul style={{ margin: '6px 0 0', paddingLeft: '20px', color: '#534439' }}>
                  {selectedBuyer.topPurchasedItems.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>

              {/* Recent Orders History */}
              <div>
                <strong>Order History:</strong>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '6px' }}>
                  {selectedBuyer.recentOrders.map((ord, idx) => (
                    <div
                      key={idx}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '6px 10px',
                        backgroundColor: '#fff8f5',
                        border: '1px solid #ede0d9',
                        borderRadius: '4px',
                        fontSize: '12px'
                      }}
                    >
                      <span style={{ fontWeight: '600', color: '#8c4f16' }}>{ord.id}</span>
                      <span>{ord.date}</span>
                      <span style={{ fontWeight: '600' }}>{ord.amount}</span>
                      <span style={{ color: '#00687a', fontSize: '11px' }}>{ord.status}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Link
                to="/supplier/messages"
                style={{
                  padding: '8px 14px',
                  backgroundColor: '#00687a',
                  color: '#ffffff',
                  borderRadius: '4px',
                  textDecoration: 'none',
                  fontSize: '12px',
                  fontWeight: '600'
                }}
              >
                💬 Message Buyer
              </Link>
              <button
                onClick={() => setSelectedBuyer(null)}
                style={{
                  padding: '8px 16px',
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
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Buyers;