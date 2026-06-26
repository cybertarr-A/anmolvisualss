import React, { useState } from 'react';
import htm from 'https://esm.sh/htm';

const html = htm.bind(React.createElement);

const stepsData = [
  {
    id: 1,
    title: 'Raw Footage Ingest',
    phase: '01 / SOURCE ASSEMBLY',
    desc: 'Sorting through hours of log rushes. Prepping matching sync bins, setting flat exposure levels, and establishing initial color profiles.',
    badge: 'LOG / flat',
    color: '#707074',
    visualStyle: { filter: 'contrast(0.4) brightness(1.1) saturate(0.5)' }
  },
  {
    id: 2,
    title: 'Story Structure Cuts',
    phase: '02 / NARRATIVE RHYTHM',
    desc: 'Determining the pacing, sculpting emotional beats, trim-sliding frames, and placing match-cuts to establish seamless scene flow.',
    badge: 'Cuts / Trim',
    color: '#8989fa',
    visualStyle: { border: '1px dashed #8989fa' }
  },
  {
    id: 3,
    title: 'Sound Design layers',
    phase: '03 / AUDITORY GEOMETRY',
    desc: 'Foley layering, sub-bass atmospheres, volume keyframing, and dialog leveling to construct a spatial audio landscape.',
    badge: 'Atmospheres',
    color: '#10b981',
    visualStyle: { filter: 'hue-rotate(90deg) contrast(1.1)' }
  },
  {
    id: 4,
    title: 'Motion Design Composites',
    phase: '04 / KINETIC GRAVITY',
    desc: 'Tracking 3D text nodes, masking background lighting leaks, lower thirds overlay integrations, and digital compositing.',
    badge: 'VFX / Tracking',
    color: '#d689fa',
    visualStyle: { filter: 'saturate(1.8)' }
  },
  {
    id: 5,
    title: 'Secondary Color Grading',
    phase: '05 / CHROMATIC DEPTH',
    desc: 'Advanced color grading, lift-gamma-gain balances, curve tweaking, custom LUT trees, and HDR light masking.',
    badge: 'LUT / Rec.709',
    color: '#b89f65',
    visualStyle: { filter: 'sepia(0.3) contrast(1.2) saturate(1.4)' }
  },
  {
    id: 6,
    title: 'Final Master Delivery',
    phase: '06 / THE EXPORT',
    desc: 'Encoding standard film prints, overlaying organic film grain, applying subtle lens distortions, and compiling sound masters.',
    badge: '4K ProRes / DNxHR',
    color: '#ef4444',
    visualStyle: { filter: 'contrast(1.3) brightness(0.95)' }
  }
];

export function Skills({ activeSoftware = 'resolve', setActiveSoftware, isActive }) {
  const [activeStep, setActiveStep] = useState(0);

  const handleStepClick = (index) => {
    setActiveStep(index);
    // Map pipeline steps to workspace active software styles
    if (index === 0 || index === 4) setActiveSoftware('resolve');
    else if (index === 1 || index === 2) setActiveSoftware('premiere');
    else if (index === 3) setActiveSoftware('ae');
    else if (index === 5) setActiveSoftware('blender');
  };

  return html`
    <section id="toolkit" className=${'skills-section' + (isActive ? ' active' : '')}>
      <div className="section-hdr">
        <span className="section-num">03 / CREATIVE WORKFLOW</span>
        <h2 className="section-title">Editing Process Pipeline</h2>
        <p className="section-desc">
          Instead of listing abstract tools, click through my actual production pipeline. Observe how rushes are sculpted from log formats to theatrical masters.
        </p>
      </div>

      <div className="color-suite-layout interactive">
        
        <!-- Left Side: Interactive Steps -->
        <div className="pipeline-steps">
          ${stepsData.map((step, idx) => html`
            <div 
              key=${step.id}
              className=${'pipeline-step' + (activeStep === idx ? ' active' : '')}
              onClick=${() => handleStepClick(idx)}
              role="button"
              tabIndex=${0}
              aria-label=${'Explore step ' + (idx + 1) + ': ' + step.title}
            >
              <div className="pipeline-num">${idx + 1 < 10 ? '0' + (idx + 1) : idx + 1}</div>
              <div className="pipeline-info">
                <span style=${{ fontSize: '0.65rem', color: step.color, letterSpacing: '0.15em', fontWeight: 'bold', textTransform: 'uppercase' }}>
                  ${step.phase}
                </span>
                <h3 className="pipeline-title">${step.title}</h3>
                <p className="pipeline-desc">${step.desc}</p>
              </div>
              <span className="tool-tag" style=${{ color: step.color, borderColor: step.color + '33' }}>
                ${step.badge}
              </span>
            </div>
          `)}
        </div>

        <!-- Right Side: Workflow Monitor Simulator -->
        <div style=${{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div className="viewer-window">
            <!-- Simulated Video Canvas based on active step -->
            <div style=${{ 
              width: '100%', 
              height: '100%', 
              position: 'relative',
              background: 'linear-gradient(135deg, #15151b 0%, #08080a 100%)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              ...stepsData[activeStep].visualStyle
            }}>
              <!-- Visual Content simulator for steps -->
              ${activeStep === 0 && html`
                <div style=${{ width: '70%', height: '50%', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.1)', position: 'relative', padding: '15px' }}>
                  <div style=${{ fontSize: '0.6rem', color: '#7f7f7f', fontFamily: 'Courier New' }}>LUT INGEST: LOG FLAT</div>
                  <div style=${{ position: 'absolute', top: '15px', right: '15px', width: '8px', height: '8px', borderRadius: '50%', background: '#ff3b30' }}></div>
                  <div style=${{ width: '100%', height: '2px', background: 'rgba(255,255,255,0.1)', marginTop: '20px' }}></div>
                  <div style=${{ width: '60%', height: '2px', background: 'rgba(255,255,255,0.1)', marginTop: '10px' }}></div>
                </div>
              `}

              ${activeStep === 1 && html`
                <div style=${{ width: '80%', height: '60%', border: '1px solid rgba(137, 137, 250, 0.4)', padding: '15px', position: 'relative' }}>
                  <div style=${{ fontSize: '0.6rem', color: '#8989fa', fontFamily: 'Courier New' }}>TIMELINE ASSEMBLY</div>
                  <div style=${{ display: 'flex', gap: '5px', marginTop: '15px' }}>
                    <div style=${{ flex: '2', height: '14px', background: '#8989fa' }}></div>
                    <div style=${{ flex: '1', height: '14px', background: '#8989fa' }}></div>
                    <div style=${{ flex: '3', height: '14px', background: '#8989fa' }}></div>
                  </div>
                  <div style=${{ display: 'flex', gap: '5px', marginTop: '6px' }}>
                    <div style=${{ flex: '3', height: '14px', background: 'rgba(255,255,255,0.1)' }}></div>
                    <div style=${{ flex: '2', height: '14px', background: 'rgba(255,255,255,0.1)' }}></div>
                  </div>
                </div>
              `}

              ${activeStep === 2 && html`
                <div style=${{ width: '80%', height: '60%', border: '1px solid rgba(16, 185, 129, 0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
                  ${[25, 45, 15, 65, 85, 40, 20, 50, 75, 30].map((h, i) => html`
                    <div 
                      key=${i} 
                      style=${{ 
                        width: '4px', 
                        height: h + '%', 
                        background: '#10b981', 
                        animation: 'introWave 1s ease infinite alternate',
                        animationDelay: (i * 0.1) + 's'
                      }}
                    ></div>
                  `)}
                </div>
              `}

              ${activeStep === 3 && html`
                <div style=${{ width: '70%', height: '50%', border: '1px solid rgba(214, 137, 250, 0.4)', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style=${{ fontSize: '0.9rem', color: '#d689fa', letterSpacing: '0.2em' }}>[ TRACKING NODE ]</span>
                  <div style=${{ position: 'absolute', top: '15px', left: '15px', width: '6px', height: '6px', border: '1px solid #d689fa' }}></div>
                  <div style=${{ position: 'absolute', bottom: '15px', right: '15px', width: '6px', height: '6px', border: '1px solid #d689fa' }}></div>
                </div>
              `}

              ${activeStep === 4 && html`
                <div style=${{ display: 'flex', gap: '30px', alignItems: 'center' }}>
                  <!-- Simulated color scopes circle -->
                  <div style=${{ width: '90px', height: '90px', borderRadius: '50%', border: '2px solid rgba(255,255,255,0.08)', position: 'relative' }}>
                    <div style=${{ position: 'absolute', top: '20px', left: '20px', width: '6px', height: '6px', borderRadius: '50%', background: 'var(--color-accent-gold)' }}></div>
                    <div style=${{ position: 'absolute', top: '45px', left: '45px', width: '2px', height: '2px', background: '#7f7f7f' }}></div>
                  </div>
                  <div>
                    <div style=${{ color: 'var(--color-accent-gold)', fontSize: '0.8rem', letterSpacing: '0.1em' }}>CHROMATIC PARADE</div>
                    <div style=${{ color: '#ffffff', fontSize: '0.65rem', marginTop: '5px', opacity: 0.6 }}>LIFT: R-0.02 G-0.01 B-0.03</div>
                    <div style=${{ color: '#ffffff', fontSize: '0.65rem', opacity: 0.6 }}>GAIN: R-1.04 G-1.00 B-0.98</div>
                  </div>
                </div>
              `}

              ${activeStep === 5 && html`
                <div style=${{ textAlign: 'center' }}>
                  <div style=${{ fontSize: '0.95rem', color: '#ef4444', letterSpacing: '0.3em', fontWeight: 'bold' }}>EXPORT COMPLETING</div>
                  <div style=${{ width: '200px', height: '4px', background: 'rgba(255,255,255,0.1)', margin: '15px auto 0 auto', position: 'relative' }}>
                    <div style=${{ position: 'absolute', top: 0, left: 0, height: '100%', width: '85%', background: '#ef4444' }}></div>
                  </div>
                  <div style=${{ fontSize: '0.6rem', color: '#7f7f7f', fontFamily: 'Courier New', marginTop: '10px' }}>PRORES 422 HQ  •  128.4GB  •  85%</div>
                </div>
              `}
            </div>

            <!-- Focus lines visual overlay -->
            <div style=${{ position: 'absolute', top: '10px', left: '10px', width: '15px', height: '15px', borderTop: '2px solid rgba(255,255,255,0.2)', borderLeft: '2px solid rgba(255,255,255,0.2)' }}></div>
            <div style=${{ position: 'absolute', top: '10px', right: '10px', width: '15px', height: '15px', borderTop: '2px solid rgba(255,255,255,0.2)', borderRight: '2px solid rgba(255,255,255,0.2)' }}></div>
            <div style=${{ position: 'absolute', bottom: '10px', left: '10px', width: '15px', height: '15px', borderBottom: '2px solid rgba(255,255,255,0.2)', borderLeft: '2px solid rgba(255,255,255,0.2)' }}></div>
            <div style=${{ position: 'absolute', bottom: '10px', right: '10px', width: '15px', height: '15px', borderBottom: '2px solid rgba(255,255,255,0.2)', borderRight: '2px solid rgba(255,255,255,0.2)' }}></div>
          </div>
          
          <div style=${{ background: '#0e0e11', border: '1px solid rgba(255,255,255,0.05)', padding: '25px', marginTop: '20px' }}>
            <span className="project-category" style=${{ marginBottom: '6px' }}>ACTIVE INTEGRATION</span>
            <div style=${{ fontSize: '0.9rem', color: '#eaeaea' }}>
              Software sync: <strong style=${{ color: 'var(--color-accent-gold)' }}>${activeSoftware.toUpperCase()} workspace</strong> on primary desktop.
            </div>
          </div>
        </div>

      </div>
    </section>
  `;
}
