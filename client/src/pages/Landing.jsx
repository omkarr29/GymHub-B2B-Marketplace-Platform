import React, { useState } from 'react';
import logo from '../assets/GymHub.png';

const LandingPage = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#FFF8F5',
      fontFamily: "'Inter', sans-serif",
      color: '#211A16',
      display: 'flex',
      flexDirection: 'column'
    }}>
      
     

      {/* 2. NAVIGATION BAR */}
      <nav style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid #D8C3B5',
        boxShadow: '0 2px 12px rgba(83, 68, 57, 0.05)'
      }}>
        <div className="container" style={{ height: '76px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          
          {/* Logo & Desktop Nav Links */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '36px' }}>
            <a href="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
              <img 
                src={logo} 
                alt="GymHub Logo" 
                style={{ height: '52px', width: 'auto', objectFit: 'contain', display: 'block' }} 
              />
            </a>

            <div className="nav-links" style={{ display: 'flex', gap: '28px', fontSize: '14px', fontWeight: 600, color: '#534439' }}>
              <a href="#about">What is GymHub?</a>
              <a href="#how-it-works">Procurement Model</a>
              <a href="#facilities">Facilities Served</a>
              <a href="#solutions">Solutions</a>
              <a href="#faq">FAQ</a>
            </div>
          </div>

          {/* Desktop Auth Buttons */}
          <div className="nav-actions" style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <a href="/login" style={{ fontSize: '14px', fontWeight: 600, color: '#211A16', textDecoration: 'none', padding: '8px 16px' }}>
              Sign In
            </a>
            <a 
              href="/register" 
              className="btn btn-primary"
              style={{ 
                padding: '10px 22px', 
                borderRadius: '12px', 
                backgroundColor: '#8C4F16', 
                color: '#ffffff', 
                fontSize: '14px', 
                fontWeight: 600, 
                textDecoration: 'none', 
                boxShadow: '0 4px 14px rgba(140, 79, 22, 0.25)' 
              }}
            >
              Get Started
            </a>
          </div>

          {/* Mobile Hamburger Toggle */}
          <button 
            className="mobile-toggle"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            style={{ display: 'none', background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer', color: '#211A16' }}
          >
            {isMobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>

        {/* Mobile Dropdown */}
        {isMobileMenuOpen && (
          <div style={{ backgroundColor: '#ffffff', borderTop: '1px solid #D8C3B5', padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <a href="#about" onClick={() => setIsMobileMenuOpen(false)} style={{ textDecoration: 'none', color: '#211A16', fontWeight: 600 }}>What is GymHub?</a>
            <a href="#how-it-works" onClick={() => setIsMobileMenuOpen(false)} style={{ textDecoration: 'none', color: '#211A16', fontWeight: 600 }}>Procurement Model</a>
            <a href="#facilities" onClick={() => setIsMobileMenuOpen(false)} style={{ textDecoration: 'none', color: '#211A16', fontWeight: 600 }}>Facilities Served</a>
            <a href="#solutions" onClick={() => setIsMobileMenuOpen(false)} style={{ textDecoration: 'none', color: '#211A16', fontWeight: 600 }}>Solutions</a>
            <a href="#faq" onClick={() => setIsMobileMenuOpen(false)} style={{ textDecoration: 'none', color: '#211A16', fontWeight: 600 }}>FAQ</a>
            <div style={{ borderTop: '1px solid #EDE0D9', paddingTop: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <a href="/login" style={{ textAlign: 'center', padding: '10px', borderRadius: '10px', border: '1px solid #D8C3B5', textDecoration: 'none', color: '#211A16', fontWeight: 600 }}>Sign In</a>
              <a href="/register" style={{ textAlign: 'center', padding: '11px', borderRadius: '10px', backgroundColor: '#8C4F16', color: '#ffffff', textDecoration: 'none', fontWeight: 600 }}>Get Started</a>
            </div>
          </div>
        )}
      </nav>

      <main style={{ flex: 1 }}>
        
        {/* 3. HERO SECTION */}
        <section style={{
          position: 'relative',
          padding: '80px 0 96px',
          background: 'linear-gradient(135deg, #FFF8F5 0%, #FFF1E9 50%, #FED1B0 100%)',
          borderBottom: '1px solid #D8C3B5',
          textAlign: 'center'
        }}>
          <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 16px',
              borderRadius: '9999px',
              backgroundColor: 'rgba(255, 255, 255, 0.85)',
              border: '1px solid #ffffff',
              boxShadow: '0 2px 10px rgba(83, 68, 57, 0.06)',
              fontSize: '13px',
              fontWeight: 600,
              color: '#8C4F16',
              marginBottom: '28px'
            }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#00687A' }}></span>
              Direct Factory Sourcing for Commercial Fitness Facilities
            </div>
            
            <h1 style={{
              fontSize: '52px',
              fontWeight: 800,
              color: '#211A16',
              letterSpacing: '-0.02em',
              lineHeight: 1.15,
              maxWidth: '900px',
              marginBottom: '20px'
            }}>
              Equip your gym facilities. <br /> Monetize factory inventory.
            </h1>
            
            <p style={{
              fontSize: '18px',
              color: '#534439',
              maxWidth: '720px',
              lineHeight: 1.6,
              marginBottom: '40px'
            }}>
              GymHub is a specialized B2B marketplace connecting fitness club franchises, boutique studios, and hospitality chains with verified equipment manufacturers. Source heavy-duty cardio, strength stations, and free weights with transparent wholesale tiers and escrow protection.
            </p>

            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
              <a 
                href="/register?role=buyer" 
                style={{
                  padding: '16px 32px',
                  borderRadius: '14px',
                  backgroundColor: '#8C4F16',
                  color: '#ffffff',
                  fontSize: '16px',
                  fontWeight: 600,
                  textDecoration: 'none',
                  boxShadow: '0 8px 20px rgba(140, 79, 22, 0.3)'
                }}
              >
                Procure Equipment (Gym / Club) →
              </a>
              <a 
                href="/register?role=supplier" 
                style={{
                  padding: '16px 32px',
                  borderRadius: '14px',
                  backgroundColor: '#ffffff',
                  border: '1px solid #D8C3B5',
                  color: '#211A16',
                  fontSize: '16px',
                  fontWeight: 600,
                  textDecoration: 'none',
                  boxShadow: '0 2px 6px rgba(83, 68, 57, 0.05)'
                }}
              >
                List Fleet / Inventory (Manufacturer)
              </a>
            </div>

            <p style={{ marginTop: '16px', fontSize: '13px', color: '#857468' }}>
              Already registered? <a href="/login" style={{ color: '#8C4F16', fontWeight: 600, textDecoration: 'underline' }}>Sign In here</a>.
            </p>
          </div>
        </section>

        {/* 4. STATISTICS STRIP */}
        <section style={{ backgroundColor: '#ffffff', borderBottom: '1px solid #D8C3B5', padding: '48px 0' }}>
          <div className="container">
            <p style={{ textAlign: 'center', fontSize: '12px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#857468', marginBottom: '32px' }}>
              Powering fitness infrastructure across commercial chains
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '32px', textAlign: 'center' }}>
              <div>
                <p style={{ fontSize: '36px', fontWeight: 800, color: '#8C4F16', marginBottom: '4px' }}>1,200+</p>
                <p style={{ fontSize: '14px', fontWeight: 600, color: '#534439' }}>Commercial Gym Buyers</p>
              </div>
              <div>
                <p style={{ fontSize: '36px', fontWeight: 800, color: '#8C4F16', marginBottom: '4px' }}>8,500+</p>
                <p style={{ fontSize: '14px', fontWeight: 600, color: '#534439' }}>Commercial SKUs Listed</p>
              </div>
              <div>
                <p style={{ fontSize: '36px', fontWeight: 800, color: '#8C4F16', marginBottom: '4px' }}>100%</p>
                <p style={{ fontSize: '14px', fontWeight: 600, color: '#534439' }}>Escrow QC Protection</p>
              </div>
              <div>
                <p style={{ fontSize: '36px', fontWeight: 800, color: '#8C4F16', marginBottom: '4px' }}>₹75Cr+</p>
                <p style={{ fontSize: '14px', fontWeight: 600, color: '#534439' }}>Equipment Sourced</p>
              </div>
            </div>
          </div>
        </section>

        {/* 5. WHAT IS GYMHUB? */}
        <section id="about" style={{ padding: '88px 0', backgroundColor: '#FFF8F5' }}>
          <div className="container">
            <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 56px' }}>
              <h2 style={{ fontSize: '34px', fontWeight: 800, color: '#211A16', marginBottom: '16px' }}>What is GymHub?</h2>
              <p style={{ fontSize: '16px', color: '#534439', lineHeight: 1.7 }}>
                Commercial gym procurement is often complicated by opaque middleman markups, unpredictable freight delays, and fragmented local suppliers. Setting up a new health club or upgrading a hotel gym floor requires negotiating multiple quotes with high capital risk.
                <br /><br />
                <strong>GymHub is the institutional B2B fitness ecosystem.</strong> We connect fitness facility operators directly with ISO-certified fitness equipment manufacturers. We consolidate technical specifications, verify factory warranties, automate custom BoQ quotes, and secure payments via structured escrow milestones.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
              <div style={{ backgroundColor: '#ffffff', padding: '32px', borderRadius: '24px', border: '1px solid #D8C3B5', boxShadow: '0 4px 16px rgba(83, 68, 57, 0.05)' }}>
                <div style={{ fontSize: '28px', marginBottom: '16px' }}>🔍</div>
                <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#211A16', marginBottom: '8px' }}>Consolidated Discovery</h3>
                <p style={{ fontSize: '14px', color: '#534439', lineHeight: 1.6 }}>Direct access to verified factory catalogs. Filter heavy equipment by motor specifications, steel gauges, weight capacities, and certifications.</p>
              </div>

              <div style={{ backgroundColor: '#ffffff', padding: '32px', borderRadius: '24px', border: '1px solid #D8C3B5', boxShadow: '0 4px 16px rgba(83, 68, 57, 0.05)' }}>
                <div style={{ fontSize: '28px', marginBottom: '16px' }}>🛡️</div>
                <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#211A16', marginBottom: '8px' }}>Verified Factory Standards</h3>
                <p style={{ fontSize: '14px', color: '#534439', lineHeight: 1.6 }}>Every manufacturer undergoes strict compliance verification, ensuring commercial-grade duty ratings, spare parts availability, and warranty validity.</p>
              </div>

              <div style={{ backgroundColor: '#ffffff', padding: '32px', borderRadius: '24px', border: '1px solid #D8C3B5', boxShadow: '0 4px 16px rgba(83, 68, 57, 0.05)' }}>
                <div style={{ fontSize: '28px', marginBottom: '16px' }}>💳</div>
                <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#211A16', marginBottom: '8px' }}>Escrow Milestone Pay</h3>
                <p style={{ fontSize: '14px', color: '#534439', lineHeight: 1.6 }}>Bulk order capital is held securely in escrow and released only after freight delivery inspection, quality verification, and technician sign-off.</p>
              </div>
            </div>
          </div>
        </section>

        {/* 6. HOW IT WORKS */}
        <section id="how-it-works" style={{ padding: '88px 0', backgroundColor: '#ffffff', borderTop: '1px solid #D8C3B5', borderBottom: '1px solid #D8C3B5' }}>
          <div className="container">
            <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 56px' }}>
              <h2 style={{ fontSize: '34px', fontWeight: 800, color: '#211A16' }}>How GymHub Works</h2>
              <p style={{ marginTop: '12px', fontSize: '16px', color: '#534439' }}>A streamlined 4-step procurement workflow built for enterprise volume and reliability.</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px' }}>
              {[
                { num: '01', title: 'Upload BoQ / Floor Plan', desc: 'Submit your equipment list, gym layout, or architectural specs to receive direct factory bids.' },
                { num: '02', title: 'Compare Wholesale Bids', desc: 'Review consolidated factory bids with transparent MOQ pricing, lead times, and warranty terms.' },
                { num: '03', title: 'Escrow Security Deposit', desc: 'Lock in production with structured escrow milestones. Payments release only after QC inspection.' },
                { num: '04', title: 'Freight & Onsite Assembly', desc: 'Turnkey logistics delivery with certified fitness engineers handling machine calibration.' }
              ].map((step, idx) => (
                <div key={idx} style={{ padding: '24px', borderLeft: '3px solid #8C4F16', backgroundColor: '#FFF8F5', borderRadius: '0 16px 16px 0' }}>
                  <span style={{ fontSize: '13px', fontWeight: 800, color: '#8C4F16', letterSpacing: '0.05em' }}>STEP {step.num}</span>
                  <h4 style={{ fontSize: '17px', fontWeight: 700, margin: '8px 0', color: '#211A16' }}>{step.title}</h4>
                  <p style={{ fontSize: '14px', color: '#534439', lineHeight: 1.6 }}>{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 7. FACILITIES SERVED */}
        <section id="facilities" style={{ padding: '88px 0', backgroundColor: '#FFF8F5' }}>
          <div className="container">
            <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 56px' }}>
              <h2 style={{ fontSize: '34px', fontWeight: 800, color: '#211A16' }}>Built for Every Fitness Sector</h2>
              <p style={{ marginTop: '12px', fontSize: '16px', color: '#534439' }}>From 10,000 sq.ft health clubs to boutique athletic academies.</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
              {[
                { title: 'Commercial Health Clubs', desc: 'Multi-stack selectorized machines, commercial motor treadmills, and high-volume plate sets.', icon: '🏋️' },
                { title: 'CrossFit & Functional Boxes', desc: 'Custom power rigs, bumper plates, competition barbells, and durable rubber flooring.', icon: '⚡' },
                { title: 'Hospitality & Luxury Real Estate', desc: 'Premium cardio consoles, compact multi-gyms, and space-saving aesthetic equipment.', icon: '🏨' },
                { title: 'Corporate Wellness & Universities', desc: 'Ergonomic pin-select machinery and institutional safety certified equipment.', icon: '🏢' }
              ].map((fac, i) => (
                <div key={i} style={{ backgroundColor: '#ffffff', border: '1px solid #D8C3B5', borderRadius: '24px', padding: '32px', boxShadow: '0 2px 10px rgba(83, 68, 57, 0.04)' }}>
                  <div style={{ fontSize: '32px', marginBottom: '16px' }}>{fac.icon}</div>
                  <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#211A16', marginBottom: '8px' }}>{fac.title}</h3>
                  <p style={{ fontSize: '14px', color: '#534439', lineHeight: 1.6 }}>{fac.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 8. SOLUTIONS GRID */}
        <section id="solutions" style={{ padding: '88px 0', backgroundColor: '#ffffff', borderTop: '1px solid #D8C3B5', borderBottom: '1px solid #D8C3B5' }}>
          <div className="container">
            <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 56px' }}>
              <h2 style={{ fontSize: '34px', fontWeight: 800, color: '#211A16' }}>A Dual-Sided B2B Ecosystem</h2>
              <p style={{ marginTop: '12px', fontSize: '16px', color: '#534439' }}>Empowering both gym operators and fitness equipment manufacturers.</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px' }}>
              
              {/* For Gym Operators */}
              <div style={{ backgroundColor: '#FFF8F5', border: '1px solid #D8C3B5', borderRadius: '28px', padding: '40px' }}>
                <span style={{ display: 'inline-block', padding: '4px 12px', borderRadius: '9999px', backgroundColor: '#FFE2D1', color: '#8C4F16', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', marginBottom: '20px' }}>
                  For Gym Owners & Developers
                </span>
                <h3 style={{ fontSize: '24px', fontWeight: 800, color: '#211A16', marginBottom: '12px' }}>Source Equipment at Factory Wholesale</h3>
                <p style={{ fontSize: '15px', color: '#534439', lineHeight: 1.6, marginBottom: '24px' }}>
                  Eliminate retail markups. Access wholesale volume tiers directly from ISO-rated fitness manufacturers with custom branding support.
                </p>
                
                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 32px 0', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '15px', fontWeight: 600, color: '#211A16' }}>
                    <span style={{ color: '#8C4F16' }}>✓</span> Nationwide Factory Direct Access
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '15px', fontWeight: 600, color: '#211A16' }}>
                    <span style={{ color: '#8C4F16' }}>✓</span> Transparent Volume Discount Tiers
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '15px', fontWeight: 600, color: '#211A16' }}>
                    <span style={{ color: '#8C4F16' }}>✓</span> Escrow Protected Milestone Payments
                  </li>
                </ul>

                <a href="/register?role=buyer" style={{ display: 'inline-block', backgroundColor: '#8C4F16', color: '#ffffff', padding: '14px 28px', borderRadius: '12px', textDecoration: 'none', fontWeight: 600, fontSize: '15px' }}>
                  Create Buyer Account →
                </a>
              </div>

              {/* For Manufacturers */}
              <div style={{ backgroundColor: '#FFF8F5', border: '1px solid #D8C3B5', borderRadius: '28px', padding: '40px' }}>
                <span style={{ display: 'inline-block', padding: '4px 12px', borderRadius: '9999px', backgroundColor: '#E0F4F9', color: '#00687A', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', marginBottom: '20px' }}>
                  For Equipment Manufacturers
                </span>
                <h3 style={{ fontSize: '24px', fontWeight: 800, color: '#211A16', marginBottom: '12px' }}>Scale Commercial B2B Distribution</h3>
                <p style={{ fontSize: '15px', color: '#534439', lineHeight: 1.6, marginBottom: '24px' }}>
                  List your commercial catalog on GymHub to connect with verified fitness franchisees, real estate developers, and corporate buyers.
                </p>
                
                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 32px 0', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '15px', fontWeight: 600, color: '#211A16' }}>
                    <span style={{ color: '#00687A' }}>✓</span> Verified Enterprise Buyer Inquiries
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '15px', fontWeight: 600, color: '#211A16' }}>
                    <span style={{ color: '#00687A' }}>✓</span> Automated Invoicing & RFQ Handling
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '15px', fontWeight: 600, color: '#211A16' }}>
                    <span style={{ color: '#00687A' }}>✓</span> Guaranteed Timely Milestone Payouts
                  </li>
                </ul>

                <a href="/register?role=supplier" style={{ display: 'inline-block', backgroundColor: '#ffffff', border: '1px solid #D8C3B5', color: '#211A16', padding: '14px 28px', borderRadius: '12px', textDecoration: 'none', fontWeight: 600, fontSize: '15px' }}>
                  Register Manufacturer →
                </a>
              </div>

            </div>
          </div>
        </section>

        {/* 9. FAQ SECTION */}
        <section id="faq" style={{ padding: '88px 0', backgroundColor: '#FFF8F5' }}>
          <div className="container" style={{ maxWidth: '800px' }}>
            <div style={{ textAlign: 'center', marginBottom: '56px' }}>
              <h2 style={{ fontSize: '34px', fontWeight: 800, color: '#211A16' }}>Frequently Asked Questions</h2>
              <p style={{ marginTop: '12px', fontSize: '16px', color: '#534439' }}>Key insights on wholesale procurement and escrow guarantees.</p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {[
                { q: 'How does the Milestone Escrow system protect bulk orders?', a: 'When you confirm a procurement order, your payment is placed into an escrow account. The funds are released in phases: production confirmation, freight dispatch inspection, and final onsite calibration.' },
                { q: 'How are equipment manufacturers verified?', a: 'Every OEM on GymHub undergoes verification for commercial manufacturing licenses, ISO quality certifications, factory warranty guarantees, and historical supply fulfillment records.' },
                { q: 'Can we request custom branding and colorways on machines?', a: 'Yes. Most verified manufacturers on GymHub support OEM custom powder coating, upholstery stitching, and custom club laser logos for bulk orders.' },
                { q: 'Who handles freight shipping and installation?', a: 'Suppliers provide transparent FOB / CIF shipping rates directly within their quotes. GymHub coordinates with certified commercial technicians for installation.' }
              ].map((faq, i) => (
                <div key={i} style={{ backgroundColor: '#ffffff', border: '1px solid #D8C3B5', borderRadius: '18px', padding: '24px 28px' }}>
                  <h4 style={{ fontSize: '17px', fontWeight: 700, color: '#211A16', marginBottom: '8px' }}>{faq.q}</h4>
                  <p style={{ fontSize: '14px', color: '#534439', lineHeight: 1.6 }}>{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 10. FINAL CTA */}
        <section style={{ padding: '88px 0', background: 'linear-gradient(135deg, #FED1B0 0%, #FFF1E9 50%, #FFF8F5 100%)', borderTop: '1px solid #D8C3B5', textAlign: 'center' }}>
          <div className="container" style={{ maxWidth: '700px' }}>
            <h2 style={{ fontSize: '38px', fontWeight: 800, color: '#211A16', letterSpacing: '-0.02em', marginBottom: '16px' }}>
              Ready to modernize your gym procurement?
            </h2>
            <p style={{ fontSize: '17px', color: '#534439', marginBottom: '36px' }}>
              Join hundreds of fitness clubs scaling their floor plans and cutting procurement costs on GymHub.
            </p>
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a 
                href="/register?role=buyer" 
                style={{ padding: '16px 36px', borderRadius: '14px', backgroundColor: '#8C4F16', color: '#ffffff', fontSize: '16px', fontWeight: 700, textDecoration: 'none', boxShadow: '0 8px 24px rgba(140, 79, 22, 0.3)' }}
              >
                Join as Gym Buyer →
              </a>
              <a 
                href="/register?role=supplier" 
                style={{ padding: '16px 36px', borderRadius: '14px', backgroundColor: '#ffffff', color: '#211A16', border: '1px solid #D8C3B5', fontSize: '16px', fontWeight: 700, textDecoration: 'none' }}
              >
                Join as Manufacturer →
              </a>
            </div>
          </div>
        </section>

      </main>

      {/* 11. FOOTER (With Logo Image) */}
      <footer style={{ backgroundColor: '#211A16', color: '#ffffff', padding: '64px 0 32px' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '48px', marginBottom: '48px' }}>
            
            {/* Footer Logo Column */}
            <div className="footer-brand" style={{ gridColumn: 'span 2' }}>
              <a href="/" style={{ display: 'inline-block', marginBottom: '16px' }}>
                <img 
                  src={logo} 
                  alt="GymHub B2B Logo" 
                  style={{ 
                    height: '56px', 
                    width: 'auto', 
                    objectFit: 'contain',
                    filter: 'drop-shadow(0 2px 8px rgba(255,255,255,0.1))'
                  }} 
                />
              </a>
              <p style={{ fontSize: '14px', color: '#EDE0D9', maxWidth: '380px', lineHeight: 1.6 }}>
                The premier B2B marketplace for commercial fitness equipment procurement, factory wholesale pricing, and milestone-backed escrow safety.
              </p>
            </div>

            <div>
              <h4 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '16px' }}>Platform</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '14px', color: '#EDE0D9' }}>
                <li><a href="/register?role=buyer" style={{ textDecoration: 'none', color: 'inherit' }}>For Gym Operators</a></li>
                <li><a href="/register?role=supplier" style={{ textDecoration: 'none', color: 'inherit' }}>For Manufacturers</a></li>
                <li><a href="#about" style={{ textDecoration: 'none', color: 'inherit' }}>Procurement Terms</a></li>
                <li><a href="#how-it-works" style={{ textDecoration: 'none', color: 'inherit' }}>Escrow Architecture</a></li>
              </ul>
            </div>

            <div>
              <h4 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '16px' }}>Company</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '14px', color: '#EDE0D9' }}>
                <li><a href="#about" style={{ textDecoration: 'none', color: 'inherit' }}>About GymHub</a></li>
                <li><a href="#faq" style={{ textDecoration: 'none', color: 'inherit' }}>Contact Support</a></li>
                <li><a href="#terms" style={{ textDecoration: 'none', color: 'inherit' }}>Terms of Service</a></li>
                <li><a href="#privacy" style={{ textDecoration: 'none', color: 'inherit' }}>Privacy Policy</a></li>
              </ul>
            </div>
          </div>

          <div style={{ borderTop: '1px solid #534439', paddingTop: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px', color: '#EDE0D9', flexWrap: 'wrap', gap: '12px' }}>
            <p>© {new Date().getFullYear()} GymHub Technologies Inc. All rights reserved.</p>
            <div style={{ display: 'flex', gap: '20px' }}>
              <span>Verified B2B Gateway</span>
              <span>ISO 9001 Compliance</span>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default LandingPage;