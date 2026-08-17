import React, { useState } from 'react';

const Verification = () => {
  // Dummy supplier verification requests
  const initialRequests = [
    {
      id: 'VER-001',
      supplierName: 'FitEquip India',
      businessName: 'FitEquip Manufacturing Pvt Ltd',
      ownerName: 'Rajesh Sharma',
      email: 'rajesh@fitequip.in',
      phone: '+91 98234 56789',
      address: 'Plot 42, MIDC Industrial Area, Andheri East, Mumbai, Maharashtra 400093',
      documents: ['GST_Certificate.pdf', 'Business_PAN.pdf', 'Factory_License.pdf'],
      status: 'Pending',
      submittedDate: '15 Aug 2026'
    },
    {
      id: 'VER-002',
      supplierName: 'ProGym Solutions',
      businessName: 'ProGym Commercial Equipments LLP',
      ownerName: 'Suresh Menon',
      email: 'suresh@progym.in',
      phone: '+91 91234 56780',
      address: 'No 18, 4th Cross, Peenya Industrial Area, Bengaluru, Karnataka 560058',
      documents: ['GST_Registration.pdf', 'MSME_Certificate.pdf'],
      status: 'Pending',
      submittedDate: '14 Aug 2026'
    },
    {
      id: 'VER-003',
      supplierName: 'Apex Rubber & Flooring',
      businessName: 'Apex Floorings Pvt Ltd',
      ownerName: 'Amit Verma',
      email: 'amit@apexgym.com',
      phone: '+91 99887 76655',
      address: 'Sector 62, Noida, Uttar Pradesh 201301',
      documents: ['GST_Certificate.pdf'],
      status: 'Rejected',
      rejectionReason: 'Invalid GSTIN number and missing commercial address proof.',
      submittedDate: '10 Aug 2026'
    }
  ];

  const [requests, setRequests] = useState(initialRequests);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [rejectingItem, setRejectingItem] = useState(null);
  const [rejectReason, setRejectReason] = useState('');

  // Handle Approve Action
  const handleApprove = (id) => {
    setRequests(
      requests.map((req) => (req.id === id ? { ...req, status: 'Approved' } : req))
    );
    if (selectedRequest && selectedRequest.id === id) {
      setSelectedRequest((prev) => ({ ...prev, status: 'Approved' }));
    }
  };

  // Open Reject Modal
  const openRejectModal = (item) => {
    setRejectingItem(item);
    setRejectReason('');
  };

  // Confirm Reject
  const handleConfirmReject = () => {
    if (!rejectReason.trim()) {
      alert('Please enter a valid rejection reason.');
      return;
    }
    setRequests(
      requests.map((req) =>
        req.id === rejectingItem.id
          ? { ...req, status: 'Rejected', rejectionReason: rejectReason }
          : req
      )
    );
    if (selectedRequest && selectedRequest.id === rejectingItem.id) {
      setSelectedRequest((prev) => ({
        ...prev,
        status: 'Rejected',
        rejectionReason: rejectReason
      }));
    }
    setRejectingItem(null);
    setRejectReason('');
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
          Supplier KYC & Verification
        </h1>
        <p style={{ margin: '4px 0 0', fontSize: '14px', color: '#534439' }}>
          Review submitted legal business documents and approve or reject onboarding requests.
        </p>
      </div>

      {/* Verification List Table */}
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
              <th style={{ padding: '12px 16px' }}>Request ID</th>
              <th style={{ padding: '12px 16px' }}>Business / Entity</th>
              <th style={{ padding: '12px 16px' }}>Owner</th>
              <th style={{ padding: '12px 16px' }}>Documents</th>
              <th style={{ padding: '12px 16px' }}>Status</th>
              <th style={{ padding: '12px 16px', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((req) => (
              <tr key={req.id} style={{ borderBottom: '1px solid #ede0d9' }}>
                <td style={{ padding: '14px 16px', fontWeight: '600', color: '#8c4f16' }}>{req.id}</td>
                <td style={{ padding: '14px 16px' }}>
                  <div style={{ fontWeight: '600', color: '#211a16' }}>{req.businessName}</div>
                  <div style={{ fontSize: '12px', color: '#857468' }}>{req.supplierName}</div>
                </td>
                <td style={{ padding: '14px 16px', color: '#211a16' }}>
                  <div>{req.ownerName}</div>
                  <div style={{ fontSize: '12px', color: '#857468' }}>{req.phone}</div>
                </td>
                <td style={{ padding: '14px 16px' }}>
                  <span style={{ fontSize: '12px', color: '#00687a', fontWeight: '600' }}>
                    📎 {req.documents.length} Files Attached
                  </span>
                </td>
                <td style={{ padding: '14px 16px' }}>{getStatusBadge(req.status)}</td>
                <td style={{ padding: '14px 16px', textAlign: 'right' }}>
                  <div style={{ display: 'inline-flex', gap: '8px' }}>
                    <button
                      onClick={() => setSelectedRequest(req)}
                      style={{
                        padding: '6px 10px',
                        borderRadius: '4px',
                        border: '1px solid #d8c3b5',
                        backgroundColor: '#fff8f5',
                        color: '#00687a',
                        fontSize: '12px',
                        fontWeight: '600',
                        cursor: 'pointer'
                      }}
                    >
                      View Details
                    </button>

                    {req.status === 'Pending' && (
                      <>
                        <button
                          onClick={() => handleApprove(req.id)}
                          style={{
                            padding: '6px 10px',
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
                          onClick={() => openRejectModal(req)}
                          style={{
                            padding: '6px 10px',
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
            ))}
          </tbody>
        </table>
      </div>

      {/* Review Details Modal */}
      {selectedRequest && (
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
              <h3 style={{ margin: 0, fontSize: '18px', color: '#211a16' }}>
                Review Application: {selectedRequest.id}
              </h3>
              <button
                onClick={() => setSelectedRequest(null)}
                style={{ background: 'none', border: 'none', fontSize: '18px', cursor: 'pointer', color: '#534439' }}
              >
                ✕
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px', color: '#211a16' }}>
              <div><strong>Business Legal Name:</strong> {selectedRequest.businessName}</div>
              <div><strong>Brand / Trade Name:</strong> {selectedRequest.supplierName}</div>
              <div><strong>Owner / Authorized Person:</strong> {selectedRequest.ownerName}</div>
              <div><strong>Email:</strong> {selectedRequest.email}</div>
              <div><strong>Phone:</strong> {selectedRequest.phone}</div>
              <div><strong>Registered Address:</strong> {selectedRequest.address}</div>
              <div><strong>Submitted Date:</strong> {selectedRequest.submittedDate}</div>
              <div><strong>Current Status:</strong> {getStatusBadge(selectedRequest.status)}</div>

              {selectedRequest.rejectionReason && (
                <div style={{ padding: '8px 12px', backgroundColor: '#fce8e6', borderRadius: '4px', color: '#ba1a1a', marginTop: '6px' }}>
                  <strong>Rejection Reason:</strong> {selectedRequest.rejectionReason}
                </div>
              )}

              <div style={{ marginTop: '10px' }}>
                <strong>Attached KYC Documents:</strong>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '6px' }}>
                  {selectedRequest.documents.map((doc, idx) => (
                    <div
                      key={idx}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '6px 10px',
                        backgroundColor: '#fff1e9',
                        border: '1px solid #ede0d9',
                        borderRadius: '4px'
                      }}
                    >
                      <span>📄 {doc}</span>
                      <button
                        onClick={() => alert(`Opening dummy file: ${doc}`)}
                        style={{
                          border: 'none',
                          background: 'none',
                          color: '#00687a',
                          fontSize: '12px',
                          fontWeight: '600',
                          cursor: 'pointer'
                        }}
                      >
                        Preview
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button
                onClick={() => setSelectedRequest(null)}
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

              {selectedRequest.status === 'Pending' && (
                <>
                  <button
                    onClick={() => {
                      openRejectModal(selectedRequest);
                      setSelectedRequest(null);
                    }}
                    style={{
                      padding: '8px 16px',
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
                    onClick={() => handleApprove(selectedRequest.id)}
                    style={{
                      padding: '8px 16px',
                      backgroundColor: '#137333',
                      color: '#ffffff',
                      border: 'none',
                      borderRadius: '4px',
                      fontWeight: '600',
                      fontSize: '13px',
                      cursor: 'pointer'
                    }}
                  >
                    Approve Supplier
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Reject Reason Input Modal */}
      {rejectingItem && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(33, 26, 22, 0.45)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 110,
            padding: '16px'
          }}
        >
          <div
            style={{
              backgroundColor: '#fff8f5',
              border: '1px solid #d8c3b5',
              borderRadius: '8px',
              width: '100%',
              maxWidth: '440px',
              padding: '24px',
              boxShadow: '0 8px 24px rgba(0,0,0,0.15)'
            }}
          >
            <h3 style={{ margin: '0 0 12px', fontSize: '18px', color: '#ba1a1a' }}>
              Reject Supplier Verification
            </h3>
            <p style={{ margin: '0 0 14px', fontSize: '13px', color: '#534439' }}>
              Specify the reason for rejecting <strong>{rejectingItem.businessName}</strong>. This feedback will be sent to the supplier.
            </p>

            <textarea
              rows="4"
              placeholder="e.g., Incomplete GST certificate or blurred documents..."
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '6px',
                border: '1px solid #d8c3b5',
                backgroundColor: '#fff1e9',
                fontSize: '13px',
                outline: 'none',
                boxSizing: 'border-box',
                fontFamily: 'inherit'
              }}
            />

            <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button
                onClick={() => setRejectingItem(null)}
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
                onClick={handleConfirmReject}
                style={{
                  padding: '8px 14px',
                  backgroundColor: '#ba1a1a',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '4px',
                  fontWeight: '600',
                  fontSize: '13px',
                  cursor: 'pointer'
                }}
              >
                Confirm Rejection
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Verification;