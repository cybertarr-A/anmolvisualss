import { useEffect, useState } from 'react';

// Global mutable scroll state to be read at 60fps in R3F render loop (prevents React re-renders)
export const scrollState = {
  y: 0,                // Current interpolated scroll Y
  targetY: 0,          // Target scroll Y
  progress: 0,         // Current interpolated progress (0 to 1)
  targetProgress: 0,   // Target progress (0 to 1)
  vh: window.innerHeight,
  height: 1            // Scrollable height (scrollHeight - vh)
};

export function useScrollRig() {
  const [currentSection, setCurrentSection] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      const vh = window.innerHeight;
      const scrollHeight = document.documentElement.scrollHeight;
      const height = scrollHeight - vh;
      
      scrollState.targetY = y;
      scrollState.targetProgress = height > 0 ? y / height : 0;
      scrollState.vh = vh;
      scrollState.height = height > 0 ? height : 1;

      // Determine active section index
      const active = Math.round(y / vh);
      setCurrentSection(active);
    };

    const handleResize = () => {
      const vh = window.innerHeight;
      scrollState.vh = vh;
      scrollState.height = (document.documentElement.scrollHeight - vh) || 1;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });
    
    // Run initialization
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return {
    currentSection,
    scrollState
  };
}
