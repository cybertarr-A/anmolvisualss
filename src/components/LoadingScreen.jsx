import React from 'react';

/**
 * Cinematic loading screen shown during Suspense.
 * Matches the intro aesthetic with gold accent color and breathing animation.
 */
export default function LoadingScreen() {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: '#040404',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10001,
      }}
      role="status"
      aria-label="Loading portfolio"
    >
      {/* Breathing sound wave bars */}
      <div style={{ display: 'flex', gap: '6px', alignItems: 'center', height: '40px' }}>
        {[0, 1, 2, 3, 4].map((i) => (
          <div
            key={i}
            style={{
              width: '3px',
              background: '#b89f65',
              animation: `loadingWave 1.2s ease infinite alternate`,
              animationDelay: `${i * 0.15}s`,
              height: '5px',
            }}
          />
        ))}
      </div>

      <p
        style={{
          marginTop: '30px',
          fontFamily: "'Inter', sans-serif",
          fontSize: '0.7rem',
          letterSpacing: '0.3em',
          textTransform: 'uppercase',
          color: '#70707c',
        }}
      >
        Loading Experience
      </p>

      {/* Inline keyframes — keeps this component self-contained */}
      <style>{`
        @keyframes loadingWave {
          0% { height: 5px; }
          100% { height: 35px; }
        }
      `}</style>
    </div>
  );
}
