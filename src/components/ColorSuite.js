import React, { useState, useEffect, useRef } from 'react';
import htm from 'https://esm.sh/htm';

const html = htm.bind(React.createElement);

// Base volumetric frame drawing
function drawBaseCinematicFrame(ctx, w, h) {
  // Clear black
  ctx.fillStyle = '#060608';
  ctx.fillRect(0, 0, w, h);

  // Background light leak gradient
  const leakGrad = ctx.createRadialGradient(w * 0.7, h * 0.3, 50, w * 0.7, h * 0.3, w * 0.6);
  leakGrad.addColorStop(0, '#584228'); // warm gold ambient
  leakGrad.addColorStop(0.5, '#1e140d'); // dark copper
  leakGrad.addColorStop(1, '#060608');
  ctx.fillStyle = leakGrad;
  ctx.fillRect(0, 0, w, h);

  // Volumetric shaft (Spotlight shadow simulator)
  ctx.fillStyle = 'rgba(255, 235, 200, 0.05)';
  ctx.beginPath();
  ctx.moveTo(w * 0.3, 0);
  ctx.lineTo(w * 0.6, 0);
  ctx.lineTo(w * 0.9, h);
  ctx.lineTo(w * 0.1, h);
  ctx.closePath();
  ctx.fill();

  // Draw some cinematic circular geometries (floating lens dust)
  ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
  ctx.beginPath(); ctx.arc(w * 0.5, h * 0.45, 18, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = 'rgba(184, 159, 101, 0.06)';
  ctx.beginPath(); ctx.arc(w * 0.35, h * 0.6, 32, 0, Math.PI * 2); ctx.fill();

  // Draw a silhouette mountain outline
  ctx.fillStyle = '#0a0909';
  ctx.beginPath();
  ctx.moveTo(0, h * 0.9);
  ctx.quadraticCurveTo(w * 0.3, h * 0.7, w * 0.6, h * 0.85);
  ctx.quadraticCurveTo(w * 0.8, h * 0.75, w, h * 0.92);
  ctx.lineTo(w, h);
  ctx.lineTo(0, h);
  ctx.closePath();
  ctx.fill();

  // Draw a cinematic frame quote/credits at bottom
  ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
  ctx.font = 'normal 9px Courier New';
  ctx.textAlign = 'center';
  ctx.fillText('REC: RAW LOG-C  •  LENS: anamorphic 50mm  •  CAM: arri mini lf', w / 2, h * 0.96);
}

export function ColorSuite({ isActive }) {
  const [lift, setLift] = useState(0.0);
  const [gamma, setGamma] = useState(1.0);
  const [gain, setGain] = useState(1.0);
  const [contrast, setContrast] = useState(1.0);

  const sourceCanvasRef = useRef(null);
  const displayCanvasRef = useRef(null);
  const scopeCanvasRef = useRef(null);

  // Initialize Source Frame Canvas
  useEffect(() => {
    const canvas = sourceCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    drawBaseCinematicFrame(ctx, canvas.width, canvas.height);
  }, []);

  // Recalculate Color Grade & RGB Parade
  useEffect(() => {
    const srcCanvas = sourceCanvasRef.current;
    const dispCanvas = displayCanvasRef.current;
    const scopeCanvas = scopeCanvasRef.current;
    if (!srcCanvas || !dispCanvas || !scopeCanvas) return;

    const sCtx = srcCanvas.getContext('2d');
    const dCtx = dispCanvas.getContext('2d');
    const w = srcCanvas.width;
    const h = srcCanvas.height;

    const imgData = sCtx.getImageData(0, 0, w, h);
    const data = imgData.data;

    // Create graded buffer
    const gradedImgData = dCtx.createImageData(w, h);
    const gData = gradedImgData.data;

    // LUT Grading Loop
    for (let i = 0; i < data.length; i += 4) {
      let r = data[i] / 255.0;
      let g = data[i+1] / 255.0;
      let b = data[i+2] / 255.0;

      // 1. Lift (Shadows adjustment)
      r = r + lift * (1.0 - r);
      g = g + lift * (1.0 - g);
      b = b + lift * (1.0 - b);

      // 2. Gamma (Midtones power)
      r = Math.pow(Math.max(0, r), 1.0 / gamma);
      g = Math.pow(Math.max(0, g), 1.0 / gamma);
      b = Math.pow(Math.max(0, b), 1.0 / gamma);

      // 3. Gain (Highlights multiplier)
      r = r * gain;
      g = g * gain;
      b = b * gain;

      // 4. Contrast
      r = (r - 0.5) * contrast + 0.5;
      g = (g - 0.5) * contrast + 0.5;
      b = (b - 0.5) * contrast + 0.5;

      gData[i]   = Math.min(255, Math.max(0, r * 255));
      gData[i+1] = Math.min(255, Math.max(0, g * 255));
      gData[i+2] = Math.min(255, Math.max(0, b * 255));
      gData[i+3] = 255; // opacity
    }
    dCtx.putImageData(gradedImgData, 0, 0);

    // RENDER RGB PARADE WAVEFORM SCOPE
    const scCtx = scopeCanvas.getContext('2d');
    const sw = scopeCanvas.width;
    const sh = scopeCanvas.height;

    scCtx.fillStyle = '#020203';
    scCtx.fillRect(0, 0, sw, sh);

    // Draw horizontal dB grid lines
    scCtx.strokeStyle = 'rgba(255,255,255,0.03)';
    scCtx.lineWidth = 1;
    for (let y = 1; y < 5; y++) {
      const cy = (sh / 5) * y;
      scCtx.beginPath(); scCtx.moveTo(0, cy); scCtx.lineTo(sw, cy); scCtx.stroke();
    }

    // Split parade into Red, Green, Blue columns vertical boxes
    const colWidth = sw / 3;

    // Red Scope
    scCtx.strokeStyle = 'rgba(239, 68, 68, 0.25)';
    // Green Scope
    // Blue Scope

    // Fast sampling: loop through columns of display image
    const sampleStepX = 3;
    const sampleStepY = 3;

    for (let cx = 0; cx < w; cx += sampleStepX) {
      const scopeColR = Math.floor((cx / w) * colWidth);
      const scopeColG = Math.floor(scopeColR + colWidth);
      const scopeColB = Math.floor(scopeColR + colWidth * 2);

      for (let cy = 0; cy < h; cy += sampleStepY) {
        const offset = (cy * w + cx) * 4;
        const valR = gData[offset];
        const valG = gData[offset+1];
        const valB = gData[offset+2];

        // Draw dots on scope canvas
        const scopeYR = sh - (valR / 255) * sh;
        scCtx.fillStyle = 'rgba(239, 68, 68, 0.2)';
        scCtx.fillRect(scopeColR, scopeYR, 1, 1);

        const scopeYG = sh - (valG / 255) * sh;
        scCtx.fillStyle = 'rgba(34, 197, 94, 0.2)';
        scCtx.fillRect(scopeColG, scopeYG, 1, 1);

        const scopeYB = sh - (valB / 255) * sh;
        scCtx.fillStyle = 'rgba(59, 130, 246, 0.2)';
        scCtx.fillRect(scopeColB, scopeYB, 1, 1);
      }
    }
  }, [lift, gamma, gain, contrast]);

  const handleReset = () => {
    setLift(0.0);
    setGamma(1.0);
    setGain(1.0);
    setContrast(1.0);
  };

  return html`
    <section id="results" className=${`skills-section ${isActive ? 'active' : ''}`} style=${{ paddingBottom: '5vh' }}>
      <div className="section-hdr">
        <span className="section-num">04 / COLOR GRADING ROOM</span>
        <h2 className="section-title">Visual grading lab</h2>
        <p className="section-desc">
          Cinematic pacing is incomplete without color space balance. Tweak primaries below to adjust shadows, midtones, and highlights, and observe the live RGB Parade scope update.
        </p>
      </div>

      <!-- Hidden source canvas used to store raw pixel buffer -->
      <canvas ref=${sourceCanvasRef} width="480" height="270" style=${{ display: 'none' }}></canvas>

      <div className="color-suite-layout interactive">
        
        <!-- Live Viewer & Parade Scopes -->
        <div className="color-suite-viewer">
          <div className="viewer-window">
            <canvas ref=${displayCanvasRef} width="480" height="270"></canvas>
          </div>

          <div className="viewer-scopes">
            <div className="scope-box" style=${{ gridColumn: 'span 2' }}>
              <span className="scope-title">RGB Parade (Waveform Distribution)</span>
              <canvas ref=${scopeCanvasRef} width="450" height="150"></canvas>
            </div>
          </div>
        </div>

        <!-- Grading Primaries Panel -->
        <div className="color-controls-panel">
          <div className="color-controls-hdr">
            <span style=${{ fontSize: '0.65rem', color: 'var(--color-accent-gold)', letterSpacing: '0.2em', fontWeight: 'bold' }}>
              RESOLVE CORE PRIMARY WHEELS
            </span>
            <h3 style=${{ fontSize: '1.25rem', marginTop: '6px' }}>Tone Balancers</h3>
          </div>

          <!-- Lift Slider -->
          <div className="color-control-group">
            <div className="color-control-label">
              <span>Lift (Shadows offset)</span>
              <span style=${{ color: 'var(--color-accent-gold)' }}>${lift.toFixed(2)}</span>
            </div>
            <input 
              type="range" 
              className="color-slider" 
              min="-0.3" max="0.3" step="0.01" 
              value=${lift} 
              onChange=${(e) => setLift(parseFloat(e.target.value))}
            />
          </div>

          <!-- Gamma Slider -->
          <div className="color-control-group">
            <div className="color-control-label">
              <span>Gamma (Midtones balance)</span>
              <span style=${{ color: 'var(--color-accent-gold)' }}>${gamma.toFixed(2)}</span>
            </div>
            <input 
              type="range" 
              className="color-slider" 
              min="0.5" max="1.5" step="0.02" 
              value=${gamma} 
              onChange=${(e) => setGamma(parseFloat(e.target.value))}
            />
          </div>

          <!-- Gain Slider -->
          <div className="color-control-group">
            <div className="color-control-label">
              <span>Gain (Highlights multiplier)</span>
              <span style=${{ color: 'var(--color-accent-gold)' }}>${gain.toFixed(2)}</span>
            </div>
            <input 
              type="range" 
              className="color-slider" 
              min="0.5" max="1.5" step="0.02" 
              value=${gain} 
              onChange=${(e) => setGain(parseFloat(e.target.value))}
            />
          </div>

          <!-- Contrast Slider -->
          <div className="color-control-group" style=${{ marginBottom: '40px' }}>
            <div className="color-control-label">
              <span>Contrast pivot</span>
              <span style=${{ color: 'var(--color-accent-gold)' }}>${contrast.toFixed(2)}</span>
            </div>
            <input 
              type="range" 
              className="color-slider" 
              min="0.7" max="1.3" step="0.01" 
              value=${contrast} 
              onChange=${(e) => setContrast(parseFloat(e.target.value))}
            />
          </div>

          <button className="btn btn-secondary" onClick=${handleReset}>
            Reset Grading Node
          </button>
        </div>

      </div>
    </section>
  `;
}
