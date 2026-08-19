import React, { useState } from 'react';

const Profile = () => {
  // Requirement #30: Supplier Business Profile Mock Data
  const [profileData, setProfileData] = useState({
    businessName: 'FitEquip Manufacturing Pvt Ltd',
    businessType: 'Manufacturer & Direct Importer',
    ownerName: 'Rajesh Sharma',
    description: 'Leading manufacturer and wholesale supplier of heavy-duty commercial motorized treadmills, selectorized strength stations, and IWF-standard rubber bumper plates.',
    email: 'sales@fitequip.in',
    phone: '+91 98234 56789',
    website: 'https://www.fitequip.in',
    address: 'Plot 42, MIDC Industrial Area, Andheri East',
    city: 'Mumbai',
    state: 'Maharashtra',
    pincode: '400093',
    gstin: '27AABCF1234M1Z5',
    pan: 'AABCF1234M',
    msmeRegNo: 'UDYAM-MH-01-0045892',
    verificationStatus: 'Verified',
    documents: [
      { name: 'GST_Registration_Certificate.pdf', uploadDate: '10 Jan 2026' },
      { name: 'Business_PAN_Card.pdf', uploadDate: '10 Jan 2026' },
      { name: 'Factory_License_MIDC.pdf', uploadDate: '12 Jan 2026' }
    ]
  });

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ ...profileData });
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    setProfileData({ ...formData });
    setIsEditing(false);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '900px', margin: '0 auto' }}>
      {/* Page Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <h1 style={{ margin: 0, fontSize: '24px', fontWeight: '600', color: '#211a16' }}>
              Company & Business Profile
            </h1>
            {/* Requirement #30: Verified Supplier Badge */}
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                padding: '4px 10px',
                backgroundColor: '#e6f4ea',
                border: '1px solid #ceead6',
                borderRadius: '9999px',
                color: '#137333',
                fontSize: '12px',
                fontWeight: '600'
              }}
            >
              ✓ Verified Supplier
            </span>
          </div>
          <p style={{ margin: '4px 0 0', fontSize: '14px', color: '#534439' }}>
            Manage your legal entity registration, official contact channels, and KYC documentation.
          </p>
        </div>

        {savedSuccess && (
          <div style={{ padding: '6px 12px', backgroundColor: '#e6f4ea', color: '#137333', borderRadius: '6px', fontSize: '13px', fontWeight: '600' }}>
            ✓ Profile updated successfully!
          </div>
        )}
      </div>

      <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {/* Section 1: Business Information */}
        <div
          style={{
            backgroundColor: '#fff8f5',
            border: '1px solid #d8c3b5',
            borderRadius: '8px',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #ede0d9', paddingBottom: '10px' }}>
            <h2 style={{ margin: 0, fontSize: '16px', fontWeight: '600', color: '#8c4f16' }}>
              1. Business Details
            </h2>
            <button
              type="button"
              onClick={() => {
                if (isEditing) setFormData({ ...profileData });
                setIsEditing(!isEditing);
              }}
              style={{
                padding: '4px 12px',
                backgroundColor: isEditing ? '#ede0d9' : '#fff1e9',
                border: '1px solid #d8c3b5',
                borderRadius: '4px',
                fontSize: '12px',
                fontWeight: '600',
                color: '#8c4f16',
                cursor: 'pointer'
              }}
            >
              {isEditing ? 'Cancel Editing' : '✏️ Edit Details'}
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#211a16', marginBottom: '4px' }}>
                Business / Legal Name
              </label>
              <input
                type="text"
                name="businessName"
                value={formData.businessName}
                onChange={handleInputChange}
                disabled={!isEditing}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  borderRadius: '6px',
                  border: '1px solid #d8c3b5',
                  backgroundColor: isEditing ? '#fff1e9' : '#ede0d9',
                  color: '#211a16',
                  fontSize: '13px',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#211a16', marginBottom: '4px' }}>
                Business Type
              </label>
              <input
                type="text"
                name="businessType"
                value={formData.businessType}
                onChange={handleInputChange}
                disabled={!isEditing}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  borderRadius: '6px',
                  border: '1px solid #d8c3b5',
                  backgroundColor: isEditing ? '#fff1e9' : '#ede0d9',
                  color: '#211a16',
                  fontSize: '13px',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#211a16', marginBottom: '4px' }}>
                Owner / Authorized Person
              </label>
              <input
                type="text"
                name="ownerName"
                value={formData.ownerName}
                onChange={handleInputChange}
                disabled={!isEditing}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  borderRadius: '6px',
                  border: '1px solid #d8c3b5',
                  backgroundColor: isEditing ? '#fff1e9' : '#ede0d9',
                  color: '#211a16',
                  fontSize: '13px',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#211a16', marginBottom: '4px' }}>
                Official Website
              </label>
              <input
                type="text"
                name="website"
                value={formData.website}
                onChange={handleInputChange}
                disabled={!isEditing}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  borderRadius: '6px',
                  border: '1px solid #d8c3b5',
                  backgroundColor: isEditing ? '#fff1e9' : '#ede0d9',
                  color: '#211a16',
                  fontSize: '13px',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#211a16', marginBottom: '4px' }}>
              Company Overview
            </label>
            <textarea
              rows="3"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              disabled={!isEditing}
              style={{
                width: '100%',
                padding: '8px 12px',
                borderRadius: '6px',
                border: '1px solid #d8c3b5',
                backgroundColor: isEditing ? '#fff1e9' : '#ede0d9',
                color: '#211a16',
                fontSize: '13px',
                outline: 'none',
                boxSizing: 'border-box',
                fontFamily: 'inherit'
              }}
            />
          </div>
        </div>

        {/* Section 2: Contact Channels & Registered Address */}
        <div
          style={{
            backgroundColor: '#fff8f5',
            border: '1px solid #d8c3b5',
            borderRadius: '8px',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
          }}
        >
          <h2 style={{ margin: 0, fontSize: '16px', fontWeight: '600', color: '#8c4f16', borderBottom: '1px solid #ede0d9', paddingBottom: '10px' }}>
            2. Contact Channels & Registered Address
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#211a16', marginBottom: '4px' }}>
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                disabled={!isEditing}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  borderRadius: '6px',
                  border: '1px solid #d8c3b5',
                  backgroundColor: isEditing ? '#fff1e9' : '#ede0d9',
                  color: '#211a16',
                  fontSize: '13px',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#211a16', marginBottom: '4px' }}>
                Phone Number
              </label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                disabled={!isEditing}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  borderRadius: '6px',
                  border: '1px solid #d8c3b5',
                  backgroundColor: isEditing ? '#fff1e9' : '#ede0d9',
                  color: '#211a16',
                  fontSize: '13px',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#211a16', marginBottom: '4px' }}>
                Street Address
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                disabled={!isEditing}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  borderRadius: '6px',
                  border: '1px solid #d8c3b5',
                  backgroundColor: isEditing ? '#fff1e9' : '#ede0d9',
                  color: '#211a16',
                  fontSize: '13px',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#211a16', marginBottom: '4px' }}>
                City
              </label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                disabled={!isEditing}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  borderRadius: '6px',
                  border: '1px solid #d8c3b5',
                  backgroundColor: isEditing ? '#fff1e9' : '#ede0d9',
                  color: '#211a16',
                  fontSize: '13px',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#211a16', marginBottom: '4px' }}>
                State
              </label>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleInputChange}
                disabled={!isEditing}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  borderRadius: '6px',
                  border: '1px solid #d8c3b5',
                  backgroundColor: isEditing ? '#fff1e9' : '#ede0d9',
                  color: '#211a16',
                  fontSize: '13px',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#211a16', marginBottom: '4px' }}>
                Pincode
              </label>
              <input
                type="text"
                name="pincode"
                value={formData.pincode}
                onChange={handleInputChange}
                disabled={!isEditing}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  borderRadius: '6px',
                  border: '1px solid #d8c3b5',
                  backgroundColor: isEditing ? '#fff1e9' : '#ede0d9',
                  color: '#211a16',
                  fontSize: '13px',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
            </div>
          </div>
        </div>

        {/* Section 3: Legal Business Documents & KYC */}
        <div
          style={{
            backgroundColor: '#fff8f5',
            border: '1px solid #d8c3b5',
            borderRadius: '8px',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
          }}
        >
          <h2 style={{ margin: 0, fontSize: '16px', fontWeight: '600', color: '#8c4f16', borderBottom: '1px solid #ede0d9', paddingBottom: '10px' }}>
            3. Business Registration & Legal KYC
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#211a16', marginBottom: '4px' }}>
                GSTIN (Tax Identification)
              </label>
              <input
                type="text"
                value={profileData.gstin}
                disabled
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  borderRadius: '6px',
                  border: '1px solid #d8c3b5',
                  backgroundColor: '#ede0d9',
                  color: '#79573d',
                  fontFamily: 'monospace',
                  fontSize: '13px',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#211a16', marginBottom: '4px' }}>
                Business PAN
              </label>
              <input
                type="text"
                value={profileData.pan}
                disabled
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  borderRadius: '6px',
                  border: '1px solid #d8c3b5',
                  backgroundColor: '#ede0d9',
                  color: '#79573d',
                  fontFamily: 'monospace',
                  fontSize: '13px',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#211a16', marginBottom: '4px' }}>
                MSME Registration
              </label>
              <input
                type="text"
                value={profileData.msmeRegNo}
                disabled
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  borderRadius: '6px',
                  border: '1px solid #d8c3b5',
                  backgroundColor: '#ede0d9',
                  color: '#79573d',
                  fontFamily: 'monospace',
                  fontSize: '13px',
                  boxSizing: 'border-box'
                }}
              />
            </div>
          </div>

          <div style={{ marginTop: '8px' }}>
            <span style={{ fontSize: '13px', fontWeight: '600', color: '#211a16' }}>
              Attached KYC Documents (Verified by Admin):
            </span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '8px' }}>
              {profileData.documents.map((doc, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '8px 12px',
                    backgroundColor: '#fff1e9',
                    border: '1px solid #ede0d9',
                    borderRadius: '6px',
                    fontSize: '13px'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span>📄</span>
                    <span style={{ fontWeight: '500', color: '#211a16' }}>{doc.name}</span>
                  </div>
                  <span style={{ fontSize: '11px', color: '#857468' }}>Uploaded on {doc.uploadDate}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Save Button Bar */}
        {isEditing && (
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              style={{
                padding: '10px 18px',
                backgroundColor: '#ede0d9',
                color: '#211a16',
                border: 'none',
                borderRadius: '6px',
                fontSize: '13px',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              style={{
                padding: '10px 24px',
                backgroundColor: '#8c4f16',
                color: '#ffffff',
                border: 'none',
                borderRadius: '6px',
                fontSize: '13px',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              Save Profile Changes
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default Profile;