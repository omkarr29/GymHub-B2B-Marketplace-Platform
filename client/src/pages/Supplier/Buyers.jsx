import React from 'react';
import { buyers } from './data.js';

const Buyers = () => {
  return (
    <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div>
        <h1 style={{ margin: 0, fontSize: '24px', fontWeight: '700', color: '#211a16' }}>Customers / Buyers</h1>
        <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: '#79573d' }}>
          Gym businesses that have purchased from your storefront.
        </p>
      </div>

      {buyers.length > 0 ? (
        <div style={{ backgroundColor: '#fff8f5', border: '1px solid #d8c3b5', borderRadius: '8px', overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
            <thead>
              <tr style={{ backgroundColor: '#fff1e9', borderBottom: '1px solid #d8c3b5', color: '#534439' }}>
                <th style={{ padding: '12px 16px' }}>Customer / Business</th>
                <th style={{ padding: '12px 16px' }}>Contact</th>
                <th style={{ padding: '12px 16px' }}>Orders</th>
                <th style={{ padding: '12px 16px' }}>Total Purchase</th>
                <th style={{ padding: '12px 16px' }}>Last Order</th>
              </tr>
            </thead>
            <tbody>
              {buyers.map((buyer) => (
                <tr key={buyer.name} style={{ borderBottom: '1px solid #ede0d9' }}>
                  <td style={{ padding: '14px 16px', fontWeight: '600', color: '#211a16' }}>{buyer.name}</td>
                  <td style={{ padding: '14px 16px', color: '#534439' }}>{buyer.contact}</td>
                  <td style={{ padding: '14px 16px', color: '#211a16' }}>{buyer.ordersCount}</td>
                  <td style={{ padding: '14px 16px', fontWeight: '600', color: '#8c4f16' }}>
                    ₹{buyer.totalPurchase.toLocaleString('en-IN')}
                  </td>
                  <td style={{ padding: '14px 16px', color: '#857468' }}>{buyer.lastOrder}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div
          style={{
            padding: '48px 24px',
            textAlign: 'center',
            backgroundColor: '#ffffff',
            border: '1px solid #ede0d9',
            borderRadius: '16px',
          }}
        >
          <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '700', color: '#211a16' }}>No buyers yet</h3>
          <p style={{ margin: '6px 0 0', fontSize: '13px', color: '#79573d' }}>
            Once gym businesses purchase your products, they'll appear here.
          </p>
        </div>
      )}
    </div>
  );
};

export default Buyers;
