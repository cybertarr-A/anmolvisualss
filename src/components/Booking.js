import React, { useState } from 'react';
import htm from 'https://esm.sh/htm';

const html = htm.bind(React.createElement);

function ContactCard({ icon, title, value, href, hoverColor, glowColor }) {
  const [hovered, setHovered] = useState(false);
  
  return html`
    <a 
      href=${href} 
      target=${href.startsWith('mailto:') ? '_self' : '_blank'} 
      rel="noopener noreferrer"
      className="option-card"
      style=${{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '50px 30px',
        background: 'rgba(10, 10, 14, 0.65)',
        border: hovered ? `1px solid ${hoverColor}` : '1px solid rgba(255, 255, 255, 0.05)',
        borderRadius: '12px',
        textDecoration: 'none',
        transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        transform: hovered ? 'translateY(-10px)' : 'translateY(0)',
        boxShadow: hovered ? `0 15px 40px ${glowColor}` : 'none',
        flex: '1',
        minWidth: '280px',
        backdropFilter: 'blur(10px)',
      }}
      onMouseEnter=${() => setHovered(true)}
      onMouseLeave=${() => setHovered(false)}
    >
      <!-- Glowing Circular Icon Background -->
      <div 
        style=${{
          width: '90px',
          height: '90px',
          borderRadius: '50%',
          background: hovered ? hoverColor : 'rgba(255, 255, 255, 0.015)',
          border: hovered ? `1px solid ${hoverColor}` : '1px solid rgba(255, 255, 255, 0.08)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '25px',
          transition: 'all 0.4s ease',
          boxShadow: hovered ? `0 0 25px ${hoverColor}` : 'none',
        }}
      >
        <svg 
          width="40" 
          height="40" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke=${hovered ? '#ffffff' : 'var(--color-accent-gold)'} 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          style=${{ transition: 'all 0.4s ease' }}
        >
          ${icon}
        </svg>
      </div>

      <div style=${{ fontSize: '0.7rem', color: 'var(--color-text-dim)', letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: '10px', fontWeight: 'bold' }}>
        ${title}
      </div>
      
      <div style=${{ 
        fontFamily: 'var(--font-serif)', 
        fontSize: '1.2rem', 
        color: hovered ? '#ffffff' : 'var(--color-text-silver)', 
        textAlign: 'center',
        transition: 'color 0.4s ease',
        wordBreak: 'break-all',
        letterSpacing: '1px'
      }}>
        ${value}
      </div>
    </a>
  `;
}

export function Booking({ isActive }) {
  // SVG Icon definitions
  const emailIcon = html`
    <rect x="2" y="4" width="20" height="16" rx="2"></rect>
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
  `;

  const instagramIcon = html`
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  `;

  return html`
    <section id="contact" className=${'contact-section' + (isActive ? ' active' : '')} style=${{ minHeight: '100vh', justifyContent: 'center' }}>
      <div style=${{ width: '100%', maxWidth: '900px', margin: '0 auto' }}>
        
        <div className="section-hdr" style=${{ textAlign: 'center', marginBottom: '50px' }}>
          <span className="section-num">05 / COLLABORATION & CONTACT</span>
          <h2 className="section-title">Let's Connect</h2>
          <p className="section-desc" style=${{ margin: '0 auto', maxWidth: '600px' }}>
            Have a story to tell, commercial to sync, or project to edit? Reach out directly via email or follow my work on Instagram.
          </p>
        </div>

        <!-- Contact Cards Container -->
        <div className="interactive" style=${{ 
          display: 'flex', 
          gap: '30px', 
          flexWrap: 'wrap', 
          width: '100%', 
          justifyContent: 'center',
          marginBottom: '60px'
        }}>
          <${ContactCard} 
            icon=${emailIcon} 
            title="Email Address" 
            value="anmolcreation04@gmail.com" 
            href="mailto:anmolcreation04@gmail.com" 
            hoverColor="#ef4444" 
            glowColor="rgba(239, 68, 68, 0.25)" 
          />
          
          <${ContactCard} 
            icon=${instagramIcon} 
            title="Instagram Profile" 
            value="@anmolvisualss" 
            href="https://www.instagram.com/anmolvisualss?igsh=NW02dTRpanV0ZHdv" 
            hoverColor="#ff5ce6" 
            glowColor="rgba(255, 92, 230, 0.25)" 
          />
        </div>

        <!-- Cinematic Footer Credits -->
        <div className="closing-credits" style=${{ marginTop: '60px' }}>
          <div className="credit-roll-row">
            <span className="credit-role">Location</span>
            <span className="credit-value">Global Remote Workstation</span>
          </div>
        </div>

        <h3 className="closing-message" style=${{ marginTop: '40px', opacity: '0.8', textAlign: 'center' }}>
          Let's Create Something Worth Remembering.
        </h3>

      </div>
    </section>
  `;
}
