import React, { useState } from 'react';
import htm from 'https://esm.sh/htm';

const html = htm.bind(React.createElement);

export function Assistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState([
    { 
      sender: 'assistant', 
      text: '>>> INITIALIZING ANMOL_CREATIVE_AI V2.0\n>>> READY FOR BLUEPRINT PARSING.\n\nHello. I am the creative workspace assistant. Ask me to compare pacing, estimate a package, or filter case studies.' 
    }
  ]);

  const handleSend = (text) => {
    if (!text.trim()) return;

    const newHistory = [...history, { sender: 'user', text }];
    setHistory(newHistory);
    setInputVal('');

    // Simulate thinking/terminal typing delay
    setTimeout(() => {
      let replyText = '>>> PARSING QUERY... UNRECOGNIZED COMMAND.\nType a query or use the presets below to estimate scopes.';
      
      const cleanText = text.toLowerCase();
      if (cleanText.includes('estimate') || cleanText.includes('cost') || cleanText.includes('package')) {
        replyText = '>>> COMPILING SCOPE ALGORITHM...\n\nI recommend utilizing the "Book a Film" wizard in the contact console. Standard commercial rates average $2,500 - $6,000, while full documentaries average $8,000+ based on hours.';
      } else if (cleanText.includes('style') || cleanText.includes('pacing') || cleanText.includes('cut')) {
        replyText = '>>> RETRIEVING PACING STYLES...\n\n1. slow-cinema (Independent narrative, high-contrast atmospheric holds)\n2. metric-cut (Architectural edits, synchronized geometries)\n3. match-cuts (Rapid luxury fashion pacing, mirror reflections)';
      } else if (cleanText.includes('commercial') || cleanText.includes('ads')) {
        replyText = '>>> FILTERING SHOWCASE: COMMERCIALS...\n\nRecommended: "Echoes of Light" (Luxury Campaign). Match-cuts, 35mm film LUT. Accreted over 5.6M views with a 14.2% Click-Through rate.';
      } else if (cleanText.includes('work') || cleanText.includes('portfolio') || cleanText.includes('projects')) {
        replyText = '>>> RETRIEVING SHOWCASE SUMMARY...\n\nActive timeline contains 4 key studies:\n- Silent Shadows (Short Film)\n- The Modern Monolith (Brand Doc)\n- Echoes of Light (Fashion Campaign)\n- Transient Dream (Art Doc)';
      }

      setHistory([...newHistory, { sender: 'assistant', text: replyText }]);
    }, 800);
  };

  return html`
    <div>
      <!-- Floating Trigger Button -->
      <button 
        className="assistant-trigger-btn interactive" 
        onClick=${() => setIsOpen(!isOpen)}
        aria-label="Open Creative Assistant console"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        </svg>
      </button>

      <!-- Glassmorphic Side Panel Drawer -->
      <div className=${'assistant-drawer' + (isOpen ? ' open' : '') + ' interactive'}>
        <div className="assistant-hdr">
          <h3 className="assistant-title">Workspace Assistant</h3>
          <button className="assistant-close-btn" onClick=${() => setIsOpen(false)}>[ Close ]</button>
        </div>

        <div className="assistant-chat-history">
          ${history.map((msg, idx) => html`
            <div 
              key=${idx} 
              className=${'assistant-message ' + msg.sender}
              style=${{ whiteSpace: 'pre-wrap' }}
            >
              ${msg.text}
            </div>
          `)}
        </div>

        <!-- Preset Command Helper Buttons -->
        <div className="assistant-preset-prompts">
          <button className="preset-prompt-btn" onClick=${() => handleSend('Estimate package cost')}>/estimate</button>
          <button className="preset-prompt-btn" onClick=${() => handleSend('Show only commercials')}>/commercials</button>
          <button className="preset-prompt-btn" onClick=${() => handleSend('Compare cutting styles')}>/styles</button>
        </div>

        <!-- Chat input bar -->
        <div className="assistant-input-area">
          <input 
            type="text" 
            className="assistant-input" 
            placeholder="Type command (e.g. /styles)..."
            value=${inputVal}
            onChange=${(e) => setInputVal(e.target.value)}
            onKeyDown=${(e) => e.key === 'Enter' && handleSend(inputVal)}
          />
          <button className="assistant-send-btn" onClick=${() => handleSend(inputVal)}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
          </button>
        </div>
      </div>
    </div>
  `;
}
