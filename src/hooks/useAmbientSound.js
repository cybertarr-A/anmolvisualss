import { useCallback, useEffect, useRef } from 'react';

/**
 * Custom hook for ambient cinematic sound design.
 * Encapsulates Web Audio API lifecycle with proper cleanup.
 * 
 * @returns {{ soundActive: boolean, toggleSound: () => void }}
 */
export function useAmbientSound() {
  const audioCtxRef = useRef(null);
  const droneOscRef = useRef(null);
  const intervalRef = useRef(null);
  const activeRef = useRef(false);

  const startSound = useCallback(() => {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      audioCtxRef.current = ctx;

      // 1. Low Cinematic Drone (A harmonic base tone at 55Hz)
      const osc = ctx.createOscillator();
      const droneGain = ctx.createGain();
      const lowpass = ctx.createBiquadFilter();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(55, ctx.currentTime);

      lowpass.type = 'lowpass';
      lowpass.frequency.setValueAtTime(140, ctx.currentTime);
      lowpass.Q.setValueAtTime(1.5, ctx.currentTime);

      droneGain.gain.setValueAtTime(0.045, ctx.currentTime);

      osc.connect(lowpass);
      lowpass.connect(droneGain);
      droneGain.connect(ctx.destination);
      osc.start();
      droneOscRef.current = osc;

      // 2. Film Projector Crackle & Click Simulation
      const bufferSize = ctx.sampleRate * 1.5;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const channelData = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        channelData[i] = Math.random() * 2 - 1;
      }

      intervalRef.current = setInterval(() => {
        if (!audioCtxRef.current || audioCtxRef.current.state === 'suspended') return;

        const noiseNode = audioCtxRef.current.createBufferSource();
        noiseNode.buffer = noiseBuffer;

        const bandpass = audioCtxRef.current.createBiquadFilter();
        bandpass.type = 'bandpass';
        bandpass.frequency.setValueAtTime(1500, audioCtxRef.current.currentTime);
        bandpass.Q.setValueAtTime(5, audioCtxRef.current.currentTime);

        const popGain = audioCtxRef.current.createGain();
        popGain.gain.setValueAtTime(0.008, audioCtxRef.current.currentTime);
        popGain.gain.exponentialRampToValueAtTime(0.0001, audioCtxRef.current.currentTime + 0.04);

        noiseNode.connect(bandpass);
        bandpass.connect(popGain);
        popGain.connect(audioCtxRef.current.destination);
        noiseNode.start();
      }, 450);
    } catch (error) {
      if (import.meta.env.DEV) {
        console.warn('Audio Context failed to initialize:', error);
      }
    }
  }, []);

  const stopSound = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if (droneOscRef.current) {
      try { droneOscRef.current.stop(); } catch (e) { /* already stopped */ }
      droneOscRef.current = null;
    }
    if (audioCtxRef.current) {
      audioCtxRef.current.close();
      audioCtxRef.current = null;
    }
  }, []);

  const toggleSound = useCallback(() => {
    activeRef.current = !activeRef.current;
    if (activeRef.current) {
      startSound();
    } else {
      stopSound();
    }
    return activeRef.current;
  }, [startSound, stopSound]);

  // Cleanup on unmount
  useEffect(() => {
    return () => stopSound();
  }, [stopSound]);

  return { toggleSound };
}
