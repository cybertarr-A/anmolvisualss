import React, { Component } from 'react';

/**
 * Error Boundary — catches rendering errors and shows graceful fallback.
 * No stack traces exposed in production.
 */
export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // In production, errors are silently caught.
    // In development, they still appear in console via React's own handler.
    if (import.meta.env.DEV) {
      console.error('[ErrorBoundary]', error, errorInfo);
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: '#040404',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: "'Cinzel', Georgia, serif",
          color: '#f5f5f5',
          textAlign: 'center',
          padding: '40px',
        }}>
          <h1 style={{
            fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
            letterSpacing: '0.1em',
            marginBottom: '20px',
            color: '#b89f65',
          }}>
            INTERMISSION
          </h1>
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '1rem',
            color: '#70707c',
            maxWidth: '450px',
            lineHeight: 1.6,
            marginBottom: '30px',
          }}>
            Something unexpected occurred. Please refresh the page to continue the experience.
          </p>
          <button
            onClick={() => window.location.reload()}
            style={{
              background: 'transparent',
              border: '1px solid rgba(255,255,255,0.2)',
              color: '#f5f5f5',
              padding: '12px 28px',
              fontSize: '0.8rem',
              fontFamily: "'Inter', sans-serif",
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              cursor: 'pointer',
            }}
          >
            Reload
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
