import React, { useState, useEffect } from 'react';
import htm from 'https://esm.sh/htm';
import { Scene3D } from './components/Scene3D.js?v=1.0.6';
import { Hero } from './components/Hero.js?v=1.0.6';
import { Showcase } from './components/Showcase.js?v=1.0.7';
import { About } from './components/About.js';
import { Skills as CreativeToolkit } from './components/Skills.js';
import { ColorSuite } from './components/ColorSuite.js';
import { Booking } from './components/Booking.js?v=1.0.8';
import { useScrollRig } from './hooks/useScrollRig.js';

const html = htm.bind(React.createElement);

// Web Audio API ambient sound generator
let audioCtx = null;
let droneOsc = null;
let noiseBuffer = null;
let soundInterval = null;

function toggleSound(active) {
  if (!active) {
    if (soundInterval) {
      clearInterval(soundInterval);
      soundInterval = null;
    }
    if (droneOsc) {
      try { droneOsc.stop(); } catch(e) {}
      droneOsc = null;
    }
    if (audioCtx) {
      audioCtx.close();
      audioCtx = null;
    }
    return;
  }

  try {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    
    // 1. Low Cinematic Drone (A harmonic base tone at 55Hz)
    droneOsc = audioCtx.createOscillator();
    const droneGain = audioCtx.createGain();
    const lowpass = audioCtx.createBiquadFilter();

    droneOsc.type = 'sawtooth';
    droneOsc.frequency.setValueAtTime(55, audioCtx.currentTime); 

    lowpass.type = 'lowpass';
    lowpass.frequency.setValueAtTime(140, audioCtx.currentTime);
    lowpass.Q.setValueAtTime(1.5, audioCtx.currentTime);

    droneGain.gain.setValueAtTime(0.045, audioCtx.currentTime);

    droneOsc.connect(lowpass);
    lowpass.connect(droneGain);
    droneGain.connect(audioCtx.destination);
    droneOsc.start();

    // 2. Film Projector Crackle & Click Simulation
    const bufferSize = audioCtx.sampleRate * 1.5;
    noiseBuffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
    const channelData = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      channelData[i] = Math.random() * 2 - 1;
    }

    soundInterval = setInterval(() => {
      if (!audioCtx || audioCtx.state === 'suspended') return;
      
      const noiseNode = audioCtx.createBufferSource();
      noiseNode.buffer = noiseBuffer;

      const bandpass = audioCtx.createBiquadFilter();
      bandpass.type = 'bandpass';
      bandpass.frequency.setValueAtTime(1500, audioCtx.currentTime);
      bandpass.Q.setValueAtTime(5, audioCtx.currentTime);

      const popGain = audioCtx.createGain();
      popGain.gain.setValueAtTime(0.008, audioCtx.currentTime);
      popGain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.04);

      noiseNode.connect(bandpass);
      bandpass.connect(popGain);
      popGain.connect(audioCtx.destination);
      noiseNode.start();
    }, 450);
    
  } catch (error) {
    console.warn("Audio Context failed to initialize:", error);
  }
}

export default function App() {
  const { currentSection } = useScrollRig();
  const [showreelOpen, setShowreelOpen] = useState(false);
  const [soundActive, setSoundActive] = useState(false);
  const [activeSoftware, setActiveSoftware] = useState('resolve');

  // Cinematic opening state machine: 'idle' -> 'quote' -> 'unfold' -> 'complete'
  const [introPhase, setIntroPhase] = useState('idle');

  const sections = ['hero', 'work', 'about', 'toolkit', 'results', 'contact'];

  const handleNavClick = (sectionId) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleWatchShowreel = () => {
    setShowreelOpen(true);
  };

  const handleToggleSound = () => {
    const nextState = !soundActive;
    setSoundActive(nextState);
    toggleSound(nextState);
  };

  const skipIntro = () => {
    setIntroPhase('complete');
  };

  // Block scroll during intro phase
  useEffect(() => {
    if (introPhase !== 'complete') {
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
    } else {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    }
  }, [introPhase]);

  // Handle intro timings
  useEffect(() => {
    if (introPhase === 'idle') {
      const t1 = setTimeout(() => setIntroPhase('quote'), 1000);
      return () => clearTimeout(t1);
    }
    if (introPhase === 'quote') {
      const t2 = setTimeout(() => setIntroPhase('unfold'), 4000);
      return () => clearTimeout(t2);
    }
    if (introPhase === 'unfold') {
      const t3 = setTimeout(() => setIntroPhase('complete'), 5000);
      return () => clearTimeout(t3);
    }
  }, [introPhase]);

  useEffect(() => {
    return () => {
      toggleSound(false);
    };
  }, []);

  return html`
    <div style=${{ position: 'relative', width: '100%' }}>
      <!-- Cinematic Intro Opening Layer -->
      ${introPhase !== 'complete' && html`
        <div 
          className="cinematic-opening" 
          style=${{ 
            opacity: introPhase === 'complete' ? 0 : 1,
            pointerEvents: introPhase === 'complete' ? 'none' : 'auto' 
          }}
        >
          <!-- Sound wave breathing indicators -->
          <div 
            className="intro-sound-wave" 
            style=${{ opacity: introPhase === 'idle' ? 1 : 0.1 }}
          >
            <div className="intro-sound-bar"></div>
            <div className="intro-sound-bar"></div>
            <div className="intro-sound-bar"></div>
            <div className="intro-sound-bar"></div>
            <div className="intro-sound-bar"></div>
          </div>

          <!-- Scorsese Quote -->
          <div className="intro-quote-container">
            <p 
              className="intro-quote-text"
              style=${{ opacity: introPhase === 'quote' ? 1 : 0 }}
            >
              "Cinema is a matter of what's in the frame and what's out."
            </p>
            <p 
              className="intro-quote-author"
              style=${{ opacity: introPhase === 'quote' ? 1 : 0 }}
            >
              — Martin Scorsese
            </p>

            <!-- Massive Unfolding Typography -->
            <div 
              style=${{ 
                opacity: introPhase === 'unfold' ? 1 : 0, 
                transition: 'opacity 1.5s ease', 
                marginTop: '-40px' 
              }}
            >
              <h2 style=${{ fontSize: 'clamp(2rem, 5vw, 4rem)', letterSpacing: '0.4em', color: '#fff', fontWeight: '900' }}>
                ANMOL
              </h2>
              <div style=${{ 
                fontSize: '0.65rem', 
                color: 'var(--color-accent-gold)', 
                letterSpacing: '0.5em', 
                marginTop: '15px', 
                textTransform: 'uppercase' 
              }}>
                [ TRANSLATING rushed feeds to cinema ]
              </div>
            </div>
          </div>

          <button className="intro-skip-btn" onClick=${skipIntro}>
            Skip Intro
          </button>
        </div>
      `}

      <!-- Dynamic 3D Scene Background -->
      <${Scene3D} activeSoftware=${activeSoftware} />

      <!-- Floating dot indicators for pagination -->
      <nav className="nav-dots" aria-label="Page navigation">
        ${sections.map((sec, idx) => html`
          <button
            key=${sec}
            className=${'nav-dot' + (currentSection === idx ? ' active' : '')}
            onClick=${() => handleNavClick(sec)}
            aria-label=${`Scroll to ${sec}`}
            aria-current=${currentSection === idx ? 'true' : 'false'}
          />
        `)}
      </nav>

      <!-- Audio Ambient controls -->
      <button 
        className=${'ambient-toggle' + (soundActive ? ' active' : '')}
        onClick=${handleToggleSound}
        aria-label="Toggle ambient noise"
      >
        <span className="sound-wave">
          <span className="sound-bar"></span>
          <span className="sound-bar"></span>
          <span className="sound-bar"></span>
          <span className="sound-bar"></span>
        </span>
        <span>${soundActive ? 'Sound On' : 'Sound Off'}</span>
      </button>

      <!-- HTML Content layers on top -->
      <main className="content-wrapper">
        <${Hero} isActive=${currentSection === 0} onWatchShowreel=${handleWatchShowreel} />
        <${Showcase} isActive=${currentSection === 1} />
        <${About} isActive=${currentSection === 2} />
        <${CreativeToolkit} isActive=${currentSection === 3} activeSoftware=${activeSoftware} setActiveSoftware=${setActiveSoftware} />
        <${ColorSuite} isActive=${currentSection === 4} />
        <${Booking} isActive=${currentSection === 5} />
      </main>



      <!-- General Showreel Screening Modal -->
      ${showreelOpen && html`
        <div 
          className="expanded-panel interactive"
          onClick=${() => setShowreelOpen(false)}
          id="showreel-modal"
        >
          <button 
            className="panel-close-btn"
            onClick=${() => setShowreelOpen(false)}
            aria-label="Close Showreel"
          >
            [ Close Suite ]
          </button>
          
          <div 
            className="panel-content" 
            onClick=${(e) => e.stopPropagation()}
            style=${{ gridTemplateColumns: '1fr', maxWidth: '1000px' }}
          >
            <div className="panel-video-wrapper">
              <video 
                className="panel-video" 
                src="https://assets.mixkit.co/videos/preview/mixkit-filmmaker-directing-and-shooting-with-a-camera-40292-large.mp4" 
                controls 
                autoPlay 
                loop 
                muted
              />
            </div>
            <div style=${{ textAlign: 'center', marginTop: '20px' }}>
              <span className="project-category">SHOWREEL 2026</span>
              <h2 style=${{ fontSize: '2rem', marginTop: '10px', marginBottom: '10px' }}>Anmol Compilation</h2>
              <p style=${{ color: '#c8c8c8', maxWidth: '600px', margin: '0 auto' }}>
                A compilation of narrative, documentary, and luxury campaign assemblies edited between 2024 and 2026.
              </p>
            </div>
          </div>
        </div>
      `}
    </div>
  `;
}
