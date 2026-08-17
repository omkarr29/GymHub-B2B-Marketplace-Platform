import React, { useState } from 'react';

const Users = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  // Dummy user data
  const initialUsers = [
    { id: 1, name: 'Rahul Sharma', email: 'rahul.sharma@gmail.com', role: 'Customer', status: 'Active', registered: '12 Aug 2026' },
    { id: 2, name: 'FitEquip India', email: 'contact@fitequip.in', role: 'Supplier', status: 'Active', registered: '10 Aug 2026' },
    { id: 3, name: 'Vikram Singh', email: 'vikram.gym@yahoo.com', role: 'Customer', status: 'Inactive', registered: '05 Aug 2026' },
    { id: 4, name: 'Titan Fitness Gear', email: 'sales@titanfitness.com', role: 'Supplier', status: 'Active', registered: '28 Jul 2026' },
    { id: 5, name: 'Anjali Verma', email: 'anjali.crossfit@gmail.com', role: 'Customer', status: 'Suspended', registered: '15 Jul 2026' },
    { id: 6, name: 'ProGym Solutions', email: 'support@progym.in', role: 'Supplier', status: 'Inactive', registered: '01 Jul 2026' }
  ];

  const [users, setUsers] = useState(initialUsers);

  // Filter logic
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'All' || user.role === roleFilter;
    const matchesStatus = statusFilter === 'All' || user.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const handleStatusChange = (id, newStatus) => {
    setUsers(users.map((u) => (u.id === id ? { ...u, status: newStatus } : u)));
  };

  const getStatusBadge = (status) => {
    let bg = '#ede0d9';
    let color = '#211a16';

    if (status === 'Active') {
      bg = '#e6f4ea';
      color = '#137333';
    } else if (status === 'Inactive') {
      bg = '#fff1e9';
      color = '#79573d';
    } else if (status === 'Suspended') {
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
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h1 style={{ margin: 0, fontSize: '24px', fontWeight: '600', color: '#211a16' }}>
            User Management
          </h1>
          <p style={{ margin: '4px 0 0', fontSize: '14px', color: '#534439' }}>
            Monitor and control customer and supplier access on GymHub.
          </p>
        </div>
      </div>

      {/* Filter and Search Controls Bar */}
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
        {/* Search */}
        <div style={{ flex: '1 1 240px', maxWidth: '320px' }}>
          <input
            type="text"
            placeholder="Search by name or email..."
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

        {/* Dropdown Filters */}
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
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
            <option value="All">All Roles</option>
            <option value="Customer">Customers</option>
            <option value="Supplier">Suppliers</option>
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
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            <option value="Suspended">Suspended</option>
          </select>
        </div>
      </div>

      {/* Users Data Table */}
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
              <th style={{ padding: '12px 16px' }}>User</th>
              <th style={{ padding: '12px 16px' }}>Role</th>
              <th style={{ padding: '12px 16px' }}>Status</th>
              <th style={{ padding: '12px 16px' }}>Registered</th>
              <th style={{ padding: '12px 16px', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <tr key={user.id} style={{ borderBottom: '1px solid #ede0d9' }}>
                  <td style={{ padding: '14px 16px' }}>
                    <div style={{ fontWeight: '600', color: '#211a16' }}>{user.name}</div>
                    <div style={{ fontSize: '12px', color: '#857468' }}>{user.email}</div>
                  </td>
                  <td style={{ padding: '14px 16px' }}>
                    <span
                      style={{
                        padding: '3px 8px',
                        borderRadius: '4px',
                        fontSize: '12px',
                        fontWeight: '500',
                        backgroundColor: user.role === 'Supplier' ? '#ede0d9' : '#fff1e9',
                        color: '#211a16'
                      }}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td style={{ padding: '14px 16px' }}>{getStatusBadge(user.status)}</td>
                  <td style={{ padding: '14px 16px', color: '#534439' }}>{user.registered}</td>
                  <td style={{ padding: '14px 16px', textAlign: 'right' }}>
                    <div style={{ display: 'inline-flex', gap: '8px' }}>
                      <button
                        onClick={() => alert(`Viewing details for: ${user.name}`)}
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
                      {user.status !== 'Suspended' ? (
                        <button
                          onClick={() => handleStatusChange(user.id, 'Suspended')}
                          style={{
                            padding: '4px 8px',
                            borderRadius: '4px',
                            border: '1px solid #ba1a1a',
                            backgroundColor: '#fff8f5',
                            color: '#ba1a1a',
                            fontSize: '12px',
                            fontWeight: '600',
                            cursor: 'pointer'
                          }}
                        >
                          Suspend
                        </button>
                      ) : (
                        <button
                          onClick={() => handleStatusChange(user.id, 'Active')}
                          style={{
                            padding: '4px 8px',
                            borderRadius: '4px',
                            border: '1px solid #137333',
                            backgroundColor: '#fff8f5',
                            color: '#137333',
                            fontSize: '12px',
                            fontWeight: '600',
                            cursor: 'pointer'
                          }}
                        >
                          Activate
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" style={{ padding: '32px', textAlign: 'center', color: '#857468' }}>
                  No users found matching the selected filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;