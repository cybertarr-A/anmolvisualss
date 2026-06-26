/**
 * Device Capability Tier Detection
 * 
 * Determines rendering quality tier based on hardware signals.
 * Used by Three.js components to adapt quality automatically.
 * 
 * Tiers:
 *   HIGH   — Desktop with discrete GPU, ≥8 cores
 *   MEDIUM — Laptop/tablet, 4-8 cores, or wide screens with touch
 *   LOW    — Phone, ≤4 cores, touch-primary, narrow screens
 */

const TIER = Object.freeze({
  HIGH: 'high',
  MEDIUM: 'medium',
  LOW: 'low',
});

let cachedTier = null;

function detectTier() {
  if (cachedTier) return cachedTier;

  const cores = navigator.hardwareConcurrency || 2;
  const isTouchPrimary = matchMedia('(hover: none) and (pointer: coarse)').matches;
  const screenWidth = Math.max(screen.width, screen.height);
  const isNarrowViewport = window.innerWidth < 768;
  const deviceMemory = navigator.deviceMemory || 4; // GB, Chrome-only

  // LOW: Phone-class device
  if (isNarrowViewport && isTouchPrimary) {
    cachedTier = TIER.LOW;
  }
  // LOW: Very weak hardware
  else if (cores <= 2 || deviceMemory <= 2) {
    cachedTier = TIER.LOW;
  }
  // MEDIUM: Tablet or low-power laptop
  else if (isTouchPrimary || cores <= 4 || screenWidth < 1280) {
    cachedTier = TIER.MEDIUM;
  }
  // HIGH: Desktop-class
  else {
    cachedTier = TIER.HIGH;
  }

  return cachedTier;
}

/**
 * Get rendering parameters for current device tier.
 */
export function getDeviceTier() {
  return detectTier();
}

export function getRenderConfig() {
  const tier = detectTier();

  return {
    tier,
    dpr: tier === TIER.HIGH ? [1, 2] : tier === TIER.MEDIUM ? [1, 1.5] : [1, 1],
    particleCount: tier === TIER.HIGH ? 300 : tier === TIER.MEDIUM ? 120 : 40,
    showFloatingLogos: tier !== TIER.LOW,
    logoCount: tier === TIER.HIGH ? 6 : 4,
    showWorkspace: tier !== TIER.LOW,
    antialias: tier !== TIER.LOW,
    powerPreference: tier === TIER.HIGH ? 'high-performance' : tier === TIER.MEDIUM ? 'default' : 'low-power',
    canvasTextureSize: tier === TIER.HIGH ? { main: [1024, 576], scope: [512, 384] }
                     : tier === TIER.MEDIUM ? { main: [512, 288], scope: [256, 192] }
                     : { main: [256, 144], scope: [128, 96] },
    textureUpdateInterval: tier === TIER.HIGH ? 2 : tier === TIER.MEDIUM ? 4 : 8,
    enableMouseParallax: tier !== TIER.LOW,
    shadowsEnabled: tier === TIER.HIGH,
  };
}

export { TIER };
