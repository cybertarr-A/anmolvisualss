import React, { useState, useEffect, Suspense, lazy } from 'react';
import { useScrollRig } from './hooks/useScrollRig';
import { useAmbientSound } from './hooks/useAmbientSound';

// Lazy load components to optimize initial bundle size and split chunks
const Scene3D = lazy(() => import('./components/Scene3D'));
const Hero = lazy(() => import('./components/Hero').then(m => ({ default: m.Hero })));
const Showcase = lazy(() => import('./components/Showcase').then(m => ({ default: m.Showcase })));
const About = lazy(() => import('./components/About').then(m => ({ default: m.About })));
const CreativeToolkit = lazy(() => import('./components/Skills').then(m => ({ default: m.Skills })));
const ColorSuite = lazy(() => import('./components/ColorSuite').then(m => ({ default: m.ColorSuite })));
const Booking = lazy(() => import('./components/Booking').then(m => ({ default: m.Booking })));

export default function App() {
  const { currentSection } = useScrollRig();
  const [showreelOpen, setShowreelOpen] = useState(false);
  const [soundActive, setSoundActive] = useState(false);
  const [activeSoftware, setActiveSoftware] = useState('resolve');

  // Cinematic opening state machine: 'idle' -> 'quote' -> 'unfold' -> 'complete'
  const [introPhase, setIntroPhase] = useState('idle');

  const { toggleSound } = useAmbientSound();

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
    const nextState = toggleSound();
    setSoundActive(nextState);
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

  // DOM Copy & Inspection Prevention Security
  useEffect(() => {
    const handleContextMenu = (e) => e.preventDefault();
    const handleDragStart = (e) => {
      if (e.target.tagName === 'IMG' || e.target.tagName === 'VIDEO') {
        e.preventDefault();
      }
    };
    const handleKeyDown = (e) => {
      if (
        e.key === 'F12' ||
        (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J' || e.key === 'C' || e.key === 'i' || e.key === 'j' || e.key === 'c')) ||
        (e.ctrlKey && (e.key === 'U' || e.key === 'u' || e.key === 'S' || e.key === 's'))
      ) {
        e.preventDefault();
      }
    };

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('dragstart', handleDragStart);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('dragstart', handleDragStart);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

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

  return (
    <div style={{ position: 'relative', width: '100%' }}>
      {/* Cinematic Intro Opening Layer */}
      {introPhase !== 'complete' && (
        <div 
          className="cinematic-opening" 
          style={{ 
            opacity: introPhase === 'complete' ? 0 : 1,
            pointerEvents: introPhase === 'complete' ? 'none' : 'auto' 
          }}
        >
          {/* Sound wave breathing indicators */}
          <div 
            className="intro-sound-wave" 
            style={{ opacity: introPhase === 'idle' ? 1 : 0.1 }}
          >
            <div className="intro-sound-bar"></div>
            <div className="intro-sound-bar"></div>
            <div className="intro-sound-bar"></div>
            <div className="intro-sound-bar"></div>
            <div className="intro-sound-bar"></div>
          </div>

          {/* Scorsese Quote */}
          <div className="intro-quote-container">
            <p 
              className="intro-quote-text"
              style={{ opacity: introPhase === 'quote' ? 1 : 0 }}
            >
              "Cinema is a matter of what's in the frame and what's out."
            </p>
            <p 
              className="intro-quote-author"
              style={{ opacity: introPhase === 'quote' ? 1 : 0 }}
            >
              — Martin Scorsese
            </p>

            {/* Massive Unfolding Typography */}
            <div 
              style={{ 
                opacity: introPhase === 'unfold' ? 1 : 0, 
                transition: 'opacity 1.5s ease', 
                marginTop: '-40px' 
              }}
            >
              <h2 style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', letterSpacing: '0.4em', color: '#fff', fontWeight: '900' }}>
                ANMOL
              </h2>
              <div style={{ 
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

          <button className="intro-skip-btn" onClick={skipIntro}>
            Skip Intro
          </button>
        </div>
      )}

      {/* Dynamic 3D Scene Background */}
      <Suspense fallback={null}>
        <Scene3D activeSoftware={activeSoftware} />
      </Suspense>

      {/* Floating dot indicators for pagination */}
      <nav className="nav-dots" aria-label="Page navigation">
        {sections.map((sec, idx) => (
          <button
            key={sec}
            className={'nav-dot' + (currentSection === idx ? ' active' : '')}
            onClick={() => handleNavClick(sec)}
            aria-label={`Scroll to ${sec}`}
            aria-current={currentSection === idx ? 'true' : 'false'}
          />
        ))}
      </nav>

      {/* Audio Ambient controls */}
      <button 
        className={'ambient-toggle' + (soundActive ? ' active' : '')}
        onClick={handleToggleSound}
        aria-label="Toggle ambient noise"
      >
        <span className="sound-wave">
          <span className="sound-bar"></span>
          <span className="sound-bar"></span>
          <span className="sound-bar"></span>
          <span className="sound-bar"></span>
        </span>
        <span>{soundActive ? 'Sound On' : 'Sound Off'}</span>
      </button>

      {/* HTML Content layers on top */}
      <main className="content-wrapper">
        <Suspense fallback={null}>
          <Hero isActive={currentSection === 0} onWatchShowreel={handleWatchShowreel} />
        </Suspense>
        <Suspense fallback={null}>
          <Showcase isActive={currentSection === 1} />
        </Suspense>
        <Suspense fallback={null}>
          <About isActive={currentSection === 2} />
        </Suspense>
        <Suspense fallback={null}>
          <CreativeToolkit isActive={currentSection === 3} activeSoftware={activeSoftware} setActiveSoftware={setActiveSoftware} />
        </Suspense>
        <Suspense fallback={null}>
          <ColorSuite isActive={currentSection === 4} />
        </Suspense>
        <Suspense fallback={null}>
          <Booking isActive={currentSection === 5} />
        </Suspense>
      </main>

      {/* General Showreel Screening Modal */}
      {showreelOpen && (
        <div 
          className="expanded-panel interactive"
          onClick={() => setShowreelOpen(false)}
          id="showreel-modal"
        >
          <button 
            className="panel-close-btn"
            onClick={() => setShowreelOpen(false)}
            aria-label="Close Showreel"
          >
            [ Close Suite ]
          </button>
          
          <div 
            className="panel-content" 
            onClick={(e) => e.stopPropagation()}
            style={{ gridTemplateColumns: '1fr', maxWidth: '1000px' }}
          >
            <div className="panel-video-wrapper">
              <video 
                className="panel-video" 
                src="https://assets.mixkit.co/videos/preview/mixkit-filmmaker-directing-and-shooting-with-a-camera-40292-large.mp4" 
                controls 
                autoPlay 
                loop 
                muted
                preload="metadata"
              />
            </div>
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
              <span className="project-category">SHOWREEL 2026</span>
              <h2 style={{ fontSize: '2rem', marginTop: '10px', marginBottom: '10px' }}>Anmol Compilation</h2>
              <p style={{ color: '#c8c8c8', maxWidth: '600px', margin: '0 auto' }}>
                A compilation of narrative, documentary, and luxury campaign assemblies edited between 2024 and 2026.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
