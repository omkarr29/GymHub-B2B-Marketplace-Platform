import React, { useState } from 'react';

const Settings = () => {
  // Admin Profile State
  const [profile, setProfile] = useState({
    name: 'Admin User',
    email: 'admin@gymhub.com',
    phone: '+91 98765 43210',
    role: 'Super Administrator'
  });

  // Platform Notification Preferences
  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    supplierKycAlerts: true,
    newOrderAlerts: true,
    productApprovalAlerts: false
  });

  // Marketplace General Settings
  const [marketplaceSettings, setMarketplaceSettings] = useState({
    platformCommission: '5',
    currency: 'INR (₹)',
    autoApproveProducts: false,
    supplierManualVerification: true
  });

  const [savedMessage, setSavedMessage] = useState('');

  const handleProfileChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleNotificationToggle = (key) => {
    setNotifications({ ...notifications, [key]: !notifications[key] });
  };

  const handleMarketplaceChange = (e) => {
    const { name, value, type, checked } = e.target;
    setMarketplaceSettings({
      ...marketplaceSettings,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSaveAll = (e) => {
    e.preventDefault();
    setSavedMessage('Settings successfully saved!');
    setTimeout(() => setSavedMessage(''), 3000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Page Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h1 style={{ margin: 0, fontSize: '24px', fontWeight: '600', color: '#211a16' }}>
            Platform Settings
          </h1>
          <p style={{ margin: '4px 0 0', fontSize: '14px', color: '#534439' }}>
            Manage administrative credentials, alert channels, and marketplace operational policies.
          </p>
        </div>

        {savedMessage && (
          <div
            style={{
              padding: '6px 14px',
              backgroundColor: '#e6f4ea',
              color: '#137333',
              borderRadius: '6px',
              fontWeight: '600',
              fontSize: '13px',
              border: '1px solid #137333'
            }}
          >
            ✓ {savedMessage}
          </div>
        )}
      </div>

      <form onSubmit={handleSaveAll} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {/* Section 1: Admin Profile */}
        <div
          style={{
            backgroundColor: '#fff8f5',
            border: '1px solid #d8c3b5',
            borderRadius: '8px',
            padding: '24px'
          }}
        >
          <h2 style={{ margin: '0 0 4px', fontSize: '18px', fontWeight: '600', color: '#211a16' }}>
            Admin Profile
          </h2>
          <p style={{ margin: '0 0 20px', fontSize: '13px', color: '#534439' }}>
            Update your administrative contact details and login credentials.
          </p>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '16px'
            }}
          >
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#211a16', marginBottom: '6px' }}>
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={profile.name}
                onChange={handleProfileChange}
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
                required
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#211a16', marginBottom: '6px' }}>
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={profile.email}
                onChange={handleProfileChange}
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
                required
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#211a16', marginBottom: '6px' }}>
                Phone Number
              </label>
              <input
                type="text"
                name="phone"
                value={profile.phone}
                onChange={handleProfileChange}
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
                required
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#211a16', marginBottom: '6px' }}>
                Assigned Role
              </label>
              <input
                type="text"
                value={profile.role}
                disabled
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  borderRadius: '6px',
                  border: '1px solid #ede0d9',
                  backgroundColor: '#ede0d9',
                  fontSize: '13px',
                  color: '#79573d',
                  outline: 'none',
                  boxSizing: 'border-box',
                  cursor: 'not-allowed'
                }}
              />
            </div>
          </div>
        </div>

        {/* Section 2: Marketplace Commission & Policies */}
        <div
          style={{
            backgroundColor: '#fff8f5',
            border: '1px solid #d8c3b5',
            borderRadius: '8px',
            padding: '24px'
          }}
        >
          <h2 style={{ margin: '0 0 4px', fontSize: '18px', fontWeight: '600', color: '#211a16' }}>
            Marketplace Policies
          </h2>
          <p style={{ margin: '0 0 20px', fontSize: '13px', color: '#534439' }}>
            Configure default platform commission cut and product listing governance.
          </p>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '16px'
            }}
          >
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#211a16', marginBottom: '6px' }}>
                Default Platform Commission (%)
              </label>
              <input
                type="number"
                name="platformCommission"
                value={marketplaceSettings.platformCommission}
                onChange={handleMarketplaceChange}
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
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#211a16', marginBottom: '6px' }}>
                Marketplace Base Currency
              </label>
              <select
                name="currency"
                value={marketplaceSettings.currency}
                onChange={handleMarketplaceChange}
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
              >
                <option value="INR (₹)">INR (₹) - Indian Rupee</option>
                <option value="USD ($)">USD ($) - US Dollar</option>
              </select>
            </div>
          </div>

          <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', color: '#211a16', cursor: 'pointer' }}>
              <input
                type="checkbox"
                name="supplierManualVerification"
                checked={marketplaceSettings.supplierManualVerification}
                onChange={handleMarketplaceChange}
                style={{ width: '16px', height: '16px', accentColor: '#8c4f16' }}
              />
              Require manual Admin KYC approval before any supplier can list equipment
            </label>

            <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', color: '#211a16', cursor: 'pointer' }}>
              <input
                type="checkbox"
                name="autoApproveProducts"
                checked={marketplaceSettings.autoApproveProducts}
                onChange={handleMarketplaceChange}
                style={{ width: '16px', height: '16px', accentColor: '#8c4f16' }}
              />
              Auto-approve catalog products uploaded by verified suppliers
            </label>
          </div>
        </div>

        {/* Section 3: Notification Preferences */}
        <div
          style={{
            backgroundColor: '#fff8f5',
            border: '1px solid #d8c3b5',
            borderRadius: '8px',
            padding: '24px'
          }}
        >
          <h2 style={{ margin: '0 0 4px', fontSize: '18px', fontWeight: '600', color: '#211a16' }}>
            Notification Preferences
          </h2>
          <p style={{ margin: '0 0 20px', fontSize: '13px', color: '#534439' }}>
            Choose which marketplace events trigger immediate alerts.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[
              { key: 'emailAlerts', label: 'Receive daily marketplace summary digest over email' },
              { key: 'supplierKycAlerts', label: 'Notify when new supplier submits KYC verification documents' },
              { key: 'newOrderAlerts', label: 'Notify on new high-value wholesale equipment orders' },
              { key: 'productApprovalAlerts', label: 'Notify when new product listing requires moderation' }
            ].map((pref) => (
              <label
                key={pref.key}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  fontSize: '13px',
                  color: '#211a16',
                  cursor: 'pointer'
                }}
              >
                <input
                  type="checkbox"
                  checked={notifications[pref.key]}
                  onChange={() => handleNotificationToggle(pref.key)}
                  style={{ width: '16px', height: '16px', accentColor: '#8c4f16' }}
                />
                {pref.label}
              </label>
            ))}
          </div>
        </div>

        {/* Save Button */}
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button
            type="submit"
            style={{
              padding: '10px 24px',
              backgroundColor: '#8c4f16',
              color: '#ffffff',
              border: 'none',
              borderRadius: '6px',
              fontWeight: '600',
              fontSize: '14px',
              cursor: 'pointer'
            }}
          >
            Save All Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default Settings;