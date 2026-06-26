import React from 'react';

export function Hero({ onWatchShowreel, isActive }) {
  const handleScrollToWork = (e) => {
    e.preventDefault();
    const workSection = document.getElementById('work');
    if (workSection) {
      workSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className={`hero-section ${isActive ? 'active' : ''}`}>
      <div className="hero-content">
        <span className="hero-tagline">Video Editor • Short Film Creator</span>
        <h1 className="hero-title">
          SCULPTING TIME.<br/>EDITING EMOTION.
        </h1>
        <p className="hero-subtitle">
          Carving out raw celluloid and digital sensor feeds into unforgettable narrative arcs. Operating at the intersection of DaVinci Resolve color, metric editing paces, and custom A24-style atmospheres.
        </p>
        
        <div className="hero-ctas interactive">
          <button className="btn btn-primary" onClick={onWatchShowreel}>
            Watch Showreel
          </button>
          <a href="#work" className="btn btn-secondary" onClick={handleScrollToWork}>
            Explore Timeline
          </a>
        </div>
      </div>
    </section>
  );
}
