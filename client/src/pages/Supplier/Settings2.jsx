import React, { useState } from 'react';

const Settings2 = () => {
  // Requirement #31: Account, Notification, and Business Settings State
  const [accountSettings, setAccountSettings] = useState({
    contactPerson: 'Rajesh Sharma',
    email: 'sales@fitequip.in',
    phone: '+91 98234 56789',
    language: 'English (India)'
  });

  const [notificationPreferences, setNotificationPreferences] = useState({
    newOrderEmail: true,
    newOrderSMS: true,
    buyerInquiryAlert: true,
    lowStockWarning: true,
    weeklyPayoutSummary: true,
    adminApprovalAlert: true
  });

  const [businessPreferences, setBusinessPreferences] = useState({
    currency: 'INR (₹)',
    defaultTaxRate: '18% GST',
    minimumOrderHandlingTime: '2-3 Business Days',
    acceptCustomBulkQuotes: true,
    allowBuyerDirectChat: true
  });

  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleAccountChange = (e) => {
    const { name, value } = e.target;
    setAccountSettings((prev) => ({ ...prev, [name]: value }));
  };

  const handleNotificationToggle = (key) => {
    setNotificationPreferences((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleBusinessChange = (e) => {
    const { name, value, type, checked } = e.target;
    setBusinessPreferences((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSaveAll = (e) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '900px', margin: '0 auto' }}>
      {/* Page Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h1 style={{ margin: 0, fontSize: '24px', fontWeight: '600', color: '#211a16' }}>
            Supplier Settings
          </h1>
          <p style={{ margin: '4px 0 0', fontSize: '14px', color: '#534439' }}>
            Configure merchant communication channels, alerts, fulfillment policies, and security credentials.
          </p>
        </div>

        {savedSuccess && (
          <div style={{ padding: '6px 12px', backgroundColor: '#e6f4ea', color: '#137333', borderRadius: '6px', fontSize: '13px', fontWeight: '600', border: '1px solid #ceead6' }}>
            ✓ Settings updated successfully!
          </div>
        )}
      </div>

      <form onSubmit={handleSaveAll} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {/* Section 1: Account Settings */}
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
          <h2 style={{ margin: 0, fontSize: '16px', fontWeight: '600', color: '#8c4f16', borderBottom: '1px solid #ede0d9', paddingBottom: '8px' }}>
            1. Account & Representative Details
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#211a16', marginBottom: '6px' }}>
                Contact Person Name
              </label>
              <input
                type="text"
                name="contactPerson"
                value={accountSettings.contactPerson}
                onChange={handleAccountChange}
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
                Primary Notification Email
              </label>
              <input
                type="email"
                name="email"
                value={accountSettings.email}
                onChange={handleAccountChange}
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
                Primary Contact Phone
              </label>
              <input
                type="text"
                name="phone"
                value={accountSettings.phone}
                onChange={handleAccountChange}
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
          </div>
        </div>

        {/* Section 2: Business & Fulfillment Preferences */}
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
          <h2 style={{ margin: 0, fontSize: '16px', fontWeight: '600', color: '#8c4f16', borderBottom: '1px solid #ede0d9', paddingBottom: '8px' }}>
            2. Commercial & Fulfillment Preferences
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#211a16', marginBottom: '6px' }}>
                Pricing Currency
              </label>
              <input
                type="text"
                value={businessPreferences.currency}
                disabled
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  borderRadius: '6px',
                  border: '1px solid #ede0d9',
                  backgroundColor: '#ede0d9',
                  fontSize: '13px',
                  color: '#79573d',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#211a16', marginBottom: '6px' }}>
                Standard Order Lead Time
              </label>
              <select
                name="minimumOrderHandlingTime"
                value={businessPreferences.minimumOrderHandlingTime}
                onChange={handleBusinessChange}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  borderRadius: '6px',
                  border: '1px solid #d8c3b5',
                  backgroundColor: '#fff1e9',
                  fontSize: '13px',
                  outline: 'none',
                  boxSizing: 'border-box',
                  cursor: 'pointer'
                }}
              >
                <option value="1-2 Business Days">1-2 Business Days</option>
                <option value="2-3 Business Days">2-3 Business Days</option>
                <option value="3-5 Business Days">3-5 Business Days</option>
                <option value="7-10 Business Days (Custom Fabrication)">7-10 Business Days</option>
              </select>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '8px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', color: '#211a16', cursor: 'pointer' }}>
              <input
                type="checkbox"
                name="acceptCustomBulkQuotes"
                checked={businessPreferences.acceptCustomBulkQuotes}
                onChange={handleBusinessChange}
                style={{ width: '16px', height: '16px', accentColor: '#8c4f16' }}
              />
              Allow gym owners to request custom quotations for large commercial fleet orders
            </label>

            <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', color: '#211a16', cursor: 'pointer' }}>
              <input
                type="checkbox"
                name="allowBuyerDirectChat"
                checked={businessPreferences.allowBuyerDirectChat}
                onChange={handleBusinessChange}
                style={{ width: '16px', height: '16px', accentColor: '#8c4f16' }}
              />
              Enable direct buyer inquiry chat on listed gym equipment
            </label>
          </div>
        </div>

        {/* Section 3: Notification Settings */}
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
          <h2 style={{ margin: 0, fontSize: '16px', fontWeight: '600', color: '#8c4f16', borderBottom: '1px solid #ede0d9', paddingBottom: '8px' }}>
            3. Operational Notification Triggers
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '12px' }}>
            {[
              { key: 'newOrderEmail', label: 'Email alert for new wholesale purchase orders' },
              { key: 'newOrderSMS', label: 'SMS text alert for high-value wholesale orders' },
              { key: 'lowStockWarning', label: 'Inventory threshold alert when items hit low stock' },
              { key: 'buyerInquiryAlert', label: 'Real-time alert when a gym buyer sends an inquiry message' },
              { key: 'adminApprovalAlert', label: 'Alert when a product listing is approved or rejected by Admin' },
              { key: 'weeklyPayoutSummary', label: 'Weekly financial payout and settlement summary report' }
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
                  checked={notificationPreferences[pref.key]}
                  onChange={() => handleNotificationToggle(pref.key)}
                  style={{ width: '16px', height: '16px', accentColor: '#8c4f16' }}
                />
                {pref.label}
              </label>
            ))}
          </div>
        </div>

        {/* Save Button Bar */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', paddingBottom: '32px' }}>
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
            Save All Settings
          </button>
        </div>
      </form>
    </div>
  );
};

export default Settings2;