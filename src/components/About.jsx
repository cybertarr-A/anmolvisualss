import React from 'react';

export function About({ isActive }) {
  return (
    <section id="about" className={`about-section ${isActive ? 'active' : ''}`}>
      <div className="about-text">
        <span className="section-num">02 / THE STORYTELLER</span>
        <h2 className="section-title" style={{ marginBottom: '30px' }}>Creative Philosophy</h2>
        
        <p className="about-quote">
          "The best edit is the one you feel, not the one you see. Every frameset must carve out an emotional response."
        </p>
        
        <p className="about-p">
          Editing is the silent heartbeat of film. It is not about throwing together clips, but about pacing, weight, and timing. Knowing when to hold, when to cut, and when to let the audio guide the eye.
        </p>
        
        <p className="about-p">
          Collaborating with directors globally, I translate raw footage into narrative masterclasses, stitching together commercials, music videos, and independent shorts that linger in the mind.
        </p>
      </div>

      <div className="about-visual-space" style={{ border: '1px solid rgba(255,255,255,0.05)', height: '400px', background: 'linear-gradient(135deg, rgba(22,22,25,0.3) 0%, rgba(10,10,12,0.6) 100%)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <div style={{ fontSize: '4.5rem', fontFamily: 'var(--font-serif)', color: 'var(--color-accent-gold)', marginBottom: '10px' }}>A24</div>
          <div style={{ fontSize: '0.7rem', letterSpacing: '0.4em', color: 'var(--color-text-dim)', textTransform: 'uppercase' }}>Inspired Narrative Tone</div>
        </div>
      </div>
    </section>
  );
}
