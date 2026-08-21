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

const CustomerProfile = () => {
  const [formData, setFormData] = useState({
    businessName: 'Alpha Fitness Club',
    gstin: '27AAECA1234F1Z5',
    contactPerson: 'Rohan Malhotra',
    phone: '+91 98765 43210',
    email: 'procurement@alphafitness.in',
    address: '14, MG Road, Andheri East',
    city: 'Mumbai',
    state: 'Maharashtra',
    pincode: '400069',
  });

  const [errors, setErrors] = useState({});
  const [savedMessage, setSavedMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: null }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.businessName.trim()) newErrors.businessName = 'Business name is required.';
    if (!/^[0-9A-Z]{15}$/.test(formData.gstin.trim())) newErrors.gstin = 'Enter a valid 15-character GSTIN.';
    if (!formData.contactPerson.trim()) newErrors.contactPerson = 'Contact person is required.';
    if (!/^[+0-9\s-]{7,15}$/.test(formData.phone.trim())) newErrors.phone = 'Enter a valid phone number.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) newErrors.email = 'Enter a valid email address.';
    if (!formData.pincode.trim()) newErrors.pincode = 'PIN code is required.';
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
    { name: 'businessName', label: 'Registered Business / Gym Name *', type: 'text', span: 2 },
    { name: 'gstin', label: 'GST Identification Number (GSTIN) *', type: 'text', mono: true },
    { name: 'contactPerson', label: 'Contact Person *', type: 'text' },
    { name: 'phone', label: 'Contact Phone *', type: 'tel' },
    { name: 'email', label: 'Billing Email *', type: 'email' },
    { name: 'address', label: 'Business Address *', type: 'text', span: 2 },
    { name: 'city', label: 'City *', type: 'text' },
    { name: 'state', label: 'State *', type: 'text' },
    { name: 'pincode', label: 'PIN Code *', type: 'text' },
  ];

  return (
    <div style={{ padding: '24px', backgroundColor: '#fff8f5', minHeight: '100%', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div>
        <h1 style={{ margin: 0, fontSize: '24px', fontWeight: '700', color: '#211a16' }}>Business Profile</h1>
        <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: '#79573d' }}>
          Keep your procurement and billing details up to date for smooth order processing.
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
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
          <div
            style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              backgroundColor: '#fff1e9',
              color: '#8c4f16',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '22px',
              fontWeight: '700',
            }}
          >
            {formData.businessName.charAt(0) || 'G'}
          </div>
          <div>
            <p style={{ margin: 0, fontSize: '15px', fontWeight: '700', color: '#211a16' }}>{formData.businessName}</p>
            <span
              style={{
                fontSize: '11px',
                fontWeight: '600',
                color: '#15803d',
                backgroundColor: '#dcfce7',
                padding: '2px 8px',
                borderRadius: '4px',
              }}
            >
              ✓ Verified Buyer
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
              {errors[field.name] && (
                <p style={{ margin: '4px 0 0', fontSize: '11px', color: '#ba1a1a' }}>{errors[field.name]}</p>
              )}
            </div>
          ))}
        </div>

        <div style={{ marginTop: '24px', display: 'flex', alignItems: 'center', gap: '14px' }}>
          <button
            type="submit"
            style={{
              padding: '12px 28px',
              borderRadius: '8px',
              backgroundColor: '#8c4f16',
              color: '#ffffff',
              border: 'none',
              fontWeight: '600',
              fontSize: '13px',
              cursor: 'pointer',
            }}
          >
            Save Changes
          </button>
          {savedMessage && (
            <span style={{ fontSize: '13px', fontWeight: '600', color: '#15803d' }}>{savedMessage}</span>
          )}
        </div>
      </form>
    </div>
  );
};

export default CustomerProfile;
