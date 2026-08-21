import React, { useState } from 'react';

const inputStyle = {
  width: '100%',
  padding: '10px 12px',
  borderRadius: '8px',
  border: '1px solid #d8c3b5',
  backgroundColor: '#fff1e9',
  color: '#211a16',
  outline: 'none',
  boxSizing: 'border-box',
  fontSize: '13px',
  fontFamily: 'inherit',
};

const labelStyle = {
  display: 'block',
  fontWeight: '600',
  marginBottom: '6px',
  color: '#534439',
  fontSize: '12px',
};

const BusinessProfile = () => {
  const [formData, setFormData] = useState({
    businessName: 'FitPro Industrial Ltd',
    ownerName: 'Arjun Verma',
    email: 'sales@fitproindustrial.in',
    phone: '+91 98200 11223',
    address: 'Plot 45, MIDC Industrial Area, Pune, Maharashtra 411019',
    gstin: '27AAFCF5678L1ZQ',
    description:
      'FitPro Industrial Ltd has manufactured commercial-grade cardio and strength equipment for gyms and fitness chains across India since 2011.',
  });
  const [errors, setErrors] = useState({});
  const [savedMessage, setSavedMessage] = useState('');

  const verificationStatus = 'Approved'; // Pending | Approved | Rejected

  const statusStyles = {
    Approved: { bg: '#dcfce7', text: '#15803d', label: '✓ Verified Supplier' },
    Pending: { bg: '#fed1b0', text: '#79573d', label: '⏳ Verification Pending' },
    Rejected: { bg: '#fde2e2', text: '#ba1a1a', label: '✕ Verification Rejected' },
  };
  const statusStyle = statusStyles[verificationStatus];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: null }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.businessName.trim()) newErrors.businessName = 'Business name is required.';
    if (!formData.ownerName.trim()) newErrors.ownerName = 'Owner name is required.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) newErrors.email = 'Enter a valid email address.';
    if (!/^[+0-9\s-]{7,15}$/.test(formData.phone.trim())) newErrors.phone = 'Enter a valid phone number.';
    if (!/^[0-9A-Z]{15}$/.test(formData.gstin.trim())) newErrors.gstin = 'Enter a valid 15-character GSTIN.';
    if (!formData.address.trim()) newErrors.address = 'Business address is required.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) {
      setSavedMessage('');
      return;
    }
    setSavedMessage('Business profile updated successfully.');
    setTimeout(() => setSavedMessage(''), 3500);
  };

  const fields = [
    { name: 'businessName', label: 'Business Name *', type: 'text', span: 2 },
    { name: 'ownerName', label: 'Owner Name *', type: 'text' },
    { name: 'gstin', label: 'GST Number *', type: 'text', mono: true },
    { name: 'email', label: 'Business Email *', type: 'email' },
    { name: 'phone', label: 'Business Phone *', type: 'tel' },
    { name: 'address', label: 'Business Address *', type: 'text', span: 2 },
  ];

  return (
    <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div>
        <h1 style={{ margin: 0, fontSize: '24px', fontWeight: '700', color: '#211a16' }}>Business Profile</h1>
        <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: '#79573d' }}>
          This information appears on your storefront and is used for order verification.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        style={{
          backgroundColor: '#ffffff',
          border: '1px solid #ede0d9',
          borderRadius: '16px',
          padding: '28px',
          maxWidth: '760px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px', flexWrap: 'wrap' }}>
          <div
            style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              backgroundColor: '#57b3ca',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '20px',
              fontWeight: '700',
            }}
          >
            FP
          </div>
          <div>
            <p style={{ margin: 0, fontSize: '15px', fontWeight: '700', color: '#211a16' }}>{formData.businessName}</p>
            <span
              style={{
                fontSize: '11px',
                fontWeight: '600',
                color: statusStyle.text,
                backgroundColor: statusStyle.bg,
                padding: '2px 8px',
                borderRadius: '4px',
              }}
            >
              {statusStyle.label}
            </span>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
          {fields.map((field) => (
            <div key={field.name} style={{ gridColumn: field.span === 2 ? 'span 2' : 'span 1' }}>
              <label style={labelStyle}>{field.label}</label>
              <input
                type={field.type}
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                style={{
                  ...inputStyle,
                  ...(field.mono ? { fontFamily: 'monospace', textTransform: 'uppercase' } : {}),
                  ...(errors[field.name] ? { border: '1px solid #ba1a1a' } : {}),
                }}
              />
              {errors[field.name] && <p style={{ margin: '4px 0 0', fontSize: '11px', color: '#ba1a1a' }}>{errors[field.name]}</p>}
            </div>
          ))}

          <div style={{ gridColumn: 'span 2' }}>
            <label style={labelStyle}>Business Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              style={{ ...inputStyle, resize: 'vertical' }}
            />
          </div>

          <div style={{ gridColumn: 'span 2' }}>
            <label style={labelStyle}>Business Logo</label>
            <div
              style={{
                border: '1.5px dashed #d8c3b5',
                borderRadius: '10px',
                padding: '20px',
                textAlign: 'center',
                color: '#857468',
                fontSize: '13px',
                backgroundColor: '#fff8f5',
              }}
            >
              Click to upload a logo (frontend preview only in this build).
            </div>
          </div>
        </div>

        <div style={{ marginTop: '24px', display: 'flex', alignItems: 'center', gap: '14px' }}>
          <button
            type="submit"
            style={{
              padding: '12px 28px',
              borderRadius: '8px',
              backgroundColor: '#00687a',
              color: '#ffffff',
              border: 'none',
              fontWeight: '600',
              fontSize: '13px',
              cursor: 'pointer',
            }}
          >
            Save Changes
          </button>
          {savedMessage && <span style={{ fontSize: '13px', fontWeight: '600', color: '#15803d' }}>{savedMessage}</span>}
        </div>
      </form>
    </div>
  );
};

export default BusinessProfile;
