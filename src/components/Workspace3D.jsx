import React, { useRef, useMemo, useEffect } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { getRenderConfig } from '../utils/deviceTier';

// Dynamic drawing function for Main Screen
function drawMainScreen(canvas, software, time) {
  const ctx = canvas.getContext('2d');
  const w = canvas.width;
  const h = canvas.height;
  
  ctx.fillStyle = '#060608';
  ctx.fillRect(0, 0, w, h);
  
  // Outer frame borders
  ctx.strokeStyle = '#1e1e24';
  ctx.lineWidth = 6;
  ctx.strokeRect(0, 0, w, h);
  
  // Menu header bar
  ctx.fillStyle = '#0e0e12';
  ctx.fillRect(4, 4, w - 8, 36);
  ctx.fillStyle = '#7f7f7f';
  ctx.font = 'normal 13px "Inter", sans-serif';
  ctx.textAlign = 'left';
  ctx.fillText("File  Edit  Timeline  Clip  Viewer  Workspace  Help", 20, 26);
  
  if (software === 'resolve') {
    ctx.fillStyle = '#b89f65';
    ctx.textAlign = 'right';
    ctx.fillText("DAVINCI RESOLVE STUDIO  •  TIMELINE_GOLD_GRADED", w - 20, 26);
    
    // Left side: Media Bins
    ctx.fillStyle = '#0a0a0d';
    ctx.fillRect(6, 42, 210, 316);
    ctx.fillStyle = '#b89f65';
    ctx.font = 'normal 11px "Inter", sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText("▼ Clips_A_Roll", 20, 75);
    for (let i = 0; i < 5; i++) {
      ctx.fillStyle = i === 1 ? 'rgba(184, 159, 101, 0.1)' : 'rgba(255, 255, 255, 0.015)';
      ctx.fillRect(16, 95 + i * 28, 190, 22);
      ctx.fillStyle = i === 1 ? '#b89f65' : '#5c5c68';
      ctx.fillRect(22, 102 + i * 28, 8, 8);
      ctx.fillStyle = '#c8c8c8';
      ctx.fillText(`Scene_04_Take_0${i+1}.mov`, 38, 111 + i * 28);
    }
    
    // Middle: Color Grading Video Viewer
    ctx.fillStyle = '#020202';
    ctx.fillRect(222, 42, 580, 316);
    const grad = ctx.createLinearGradient(222, 42, 222, 358);
    grad.addColorStop(0, '#1e1910');
    grad.addColorStop(0.6, '#382e18');
    grad.addColorStop(1, '#020202');
    ctx.fillStyle = grad;
    ctx.fillRect(222, 42, 580, 316);
    
    ctx.fillStyle = 'rgba(184, 159, 101, 0.08)';
    ctx.beginPath();
    ctx.moveTo(512, 60);
    ctx.lineTo(280, 340);
    ctx.lineTo(744, 340);
    ctx.closePath();
    ctx.fill();
    
    ctx.strokeStyle = '#b89f65';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(512, 42);
    ctx.lineTo(512, 358);
    ctx.stroke();
    
    // Right side: Node Graph editor
    ctx.fillStyle = '#0a0a0d';
    ctx.fillRect(808, 42, 210, 316);
    ctx.fillStyle = '#7f7f7f';
    ctx.fillText("Node Editor", 820, 75);
    const nodes = [
      { x: 830, y: 100, label: 'Lut' },
      { x: 920, y: 170, label: 'Prim' },
      { x: 830, y: 240, label: 'Gold' }
    ];
    ctx.strokeStyle = 'rgba(184, 159, 101, 0.4)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(865, 115); ctx.lineTo(920, 185);
    ctx.moveTo(955, 185); ctx.lineTo(865, 255);
    ctx.stroke();
    nodes.forEach(node => {
      ctx.fillStyle = '#1c1c24';
      ctx.fillRect(node.x, node.y, 45, 30);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
      ctx.strokeRect(node.x, node.y, 45, 30);
      ctx.fillStyle = '#b89f65';
      ctx.fillRect(node.x + 2, node.y + 2, 4, 4);
      ctx.fillStyle = '#ffffff';
      ctx.fillText(node.label, node.x + 10, node.y + 18);
    });
    
    // Bottom side: Color wheels lift/gamma/gain
    ctx.fillStyle = '#08080b';
    ctx.fillRect(6, 364, w - 12, 206);
    for (let i = 0; i < 3; i++) {
      const cx = 160 + i * 200;
      const cy = 450;
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
      ctx.lineWidth = 2;
      ctx.beginPath(); ctx.arc(cx, cy, 40, 0, Math.PI * 2); ctx.stroke();
      ctx.fillStyle = '#b89f65';
      ctx.beginPath(); ctx.arc(cx + Math.cos(time + i) * 12, cy + Math.sin(time + i) * 12, 4, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#7f7f7f';
      ctx.font = 'normal 10px "Inter", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(i === 0 ? 'LIFT' : i === 1 ? 'GAMMA' : 'GAIN', cx, cy + 60);
    }
  } else if (software === 'premiere') {
    ctx.fillStyle = '#8989fa';
    ctx.textAlign = 'right';
    ctx.fillText("ADOBE PREMIERE PRO  •  EDITORIAL_ASSEMBLY_v2", w - 20, 26);
    
    // Left side: Media bin
    ctx.fillStyle = '#0a0a0d';
    ctx.fillRect(6, 42, 210, 316);
    ctx.fillStyle = '#9e9e9e';
    ctx.font = 'normal 11px "Inter", sans-serif';
    ctx.fillText("Project: Anmol_Showreel_2026", 20, 70);
    for (let i = 0; i < 6; i++) {
      ctx.fillStyle = 'rgba(255, 255, 255, 0.02)';
      ctx.fillRect(16, 90 + i * 24, 190, 20);
      ctx.fillStyle = '#8989fa';
      ctx.fillRect(22, 96 + i * 24, 12, 8);
      ctx.fillStyle = '#c8c8c8';
      ctx.fillText(`Shot_0${i+1}_Raw.mov`, 40, 104 + i * 24);
    }
    
    // Middle: Program Monitor
    ctx.fillStyle = '#040405';
    ctx.fillRect(222, 42, 580, 316);
    ctx.fillStyle = '#0d0d14';
    ctx.fillRect(240, 60, 544, 280);
    ctx.strokeStyle = '#8989fa';
    ctx.lineWidth = 1;
    ctx.strokeRect(240, 60, 544, 280);
    
    // Play button icon
    ctx.fillStyle = 'rgba(137, 137, 250, 0.2)';
    ctx.beginPath(); ctx.moveTo(502, 180); ctx.lineTo(502, 220); ctx.lineTo(532, 200); ctx.closePath(); ctx.fill();
    ctx.fillStyle = '#ffffff';
    ctx.fillText("[Program Monitor]", 260, 85);
    
    // Right side: Audio levels
    ctx.fillStyle = '#0a0a0d';
    ctx.fillRect(808, 42, 210, 316);
    ctx.fillStyle = '#7f7f7f';
    ctx.fillText("Audio Master dB", 820, 70);
    for (let i = 0; i < 2; i++) {
      const bx = 870 + i * 40;
      ctx.fillStyle = '#101015';
      ctx.fillRect(bx, 85, 18, 250);
      const val = 130 + Math.sin(time * 4.5 + i * 2.5) * 65;
      const grad = ctx.createLinearGradient(bx, 335, bx, 85);
      grad.addColorStop(0, '#22c55e');
      grad.addColorStop(0.7, '#eab308');
      grad.addColorStop(1, '#ef4444');
      ctx.fillStyle = grad;
      ctx.fillRect(bx, 335 - val, 18, val);
    }
    
    // Bottom: Timeline clips
    ctx.fillStyle = '#08080b';
    ctx.fillRect(6, 364, w - 12, 206);
    
    ctx.fillStyle = '#8989fa';
    ctx.fillRect(80, 380, 200, 20);
    ctx.fillRect(290, 380, 210, 20);
    ctx.fillRect(510, 380, 180, 20);
    ctx.fillRect(80, 410, 350, 20);
    ctx.fillStyle = '#22c55e';
    ctx.fillRect(80, 445, 230, 20);
    ctx.fillRect(320, 445, 270, 20);
    ctx.fillRect(80, 475, 480, 20);
    
    // Playhead
    const px = 80 + ((time * 40) % 800);
    ctx.strokeStyle = '#ff3b30';
    ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(px, 368); ctx.lineTo(px, 555); ctx.stroke();
    ctx.fillStyle = '#ff3b30';
    ctx.beginPath(); ctx.moveTo(px - 5, 368); ctx.lineTo(px + 5, 368); ctx.lineTo(px, 375); ctx.closePath(); ctx.fill();
    
  } else if (software === 'ae') {
    ctx.fillStyle = '#d689fa';
    ctx.textAlign = 'right';
    ctx.fillText("AFTER EFFECTS  •  COMP_VFX_TRACKING", w - 20, 26);
    
    // Left side: Effects Control
    ctx.fillStyle = '#0a0a0d';
    ctx.fillRect(6, 42, 210, 316);
    ctx.fillStyle = '#9e9e9e';
    ctx.fillText("Effects: Particular", 20, 70);
    for (let i = 0; i < 4; i++) {
      ctx.fillStyle = 'rgba(255, 255, 255, 0.02)';
      ctx.fillRect(16, 90 + i * 35, 190, 26);
      ctx.fillStyle = '#d689fa';
      ctx.fillRect(22, 99 + i * 35, 6, 6);
      ctx.fillStyle = '#c8c8c8';
      ctx.fillText(i === 0 ? '• Particle Rate: 800' : i === 1 ? '• Velocity: 140' : i === 2 ? '• Gravity: -5' : '• Color Cycle: Gold', 32, 107 + i * 35);
    }
    
    // Middle: Comp Viewport
    ctx.fillStyle = '#020203';
    ctx.fillRect(222, 42, 580, 316);
    ctx.strokeStyle = '#d689fa';
    ctx.lineWidth = 1;
    ctx.strokeRect(340, 90, 340, 220);
    
    const tPts = [{ x: 340, y: 90 }, { x: 680, y: 90 }, { x: 340, y: 310 }, { x: 680, y: 310 }, { x: 510, y: 200 }];
    ctx.fillStyle = '#22c55e';
    tPts.forEach(pt => {
      ctx.strokeRect(pt.x - 4, pt.y - 4, 8, 8);
      ctx.fillRect(pt.x - 1, pt.y - 1, 2, 2);
    });
    
    ctx.strokeStyle = '#ff3b30';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(280, 260);
    ctx.bezierCurveTo(380, 100 + Math.sin(time * 2.5) * 50, 580, 280 + Math.cos(time * 2.5) * 50, 720, 110);
    ctx.stroke();
    
    // Right side: Info and render panel
    ctx.fillStyle = '#0a0a0d';
    ctx.fillRect(808, 42, 210, 316);
    ctx.fillStyle = '#7f7f7f';
    ctx.fillText("VFX Solves", 820, 70);
    ctx.fillStyle = '#c8c8c8';
    ctx.fillText("Tracking: [ ACTIVE ]", 820, 100);
    ctx.fillText("Error: 0.12px", 820, 125);
    ctx.fillText("Target: Mask_01", 820, 150);
    
    // Bottom: Keyframe Spline
    ctx.fillStyle = '#08080b';
    ctx.fillRect(6, 364, w - 12, 206);
    ctx.strokeStyle = 'rgba(255,255,255,0.03)';
    ctx.lineWidth = 1;
    for (let i = 1; i < 4; i++) {
      ctx.beginPath(); ctx.moveTo(0, 364 + i * 50); ctx.lineTo(w, 364 + i * 50); ctx.stroke();
    }
    ctx.strokeStyle = '#d689fa';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(80, 520);
    ctx.bezierCurveTo(300, 520, 450, 380 + Math.sin(time * 2) * 45, 700, 380);
    ctx.bezierCurveTo(800, 380, 850, 520, 950, 520);
    ctx.stroke();
    
  } else if (software === 'blender') {
    ctx.fillStyle = '#fa9e89';
    ctx.textAlign = 'right';
    ctx.fillText("BLENDER 3D  •  WORKSPACE_BLOCKOUT", w - 20, 26);
    
    // Left side: Outliner
    ctx.fillStyle = '#0a0a0d';
    ctx.fillRect(6, 42, 210, 316);
    ctx.fillStyle = '#9e9e9e';
    ctx.fillText("Outliner Collection", 20, 70);
    const sceneObjects = ['Camera_Rig', 'Studio_Desk', 'Monitor_Main', 'Monitor_Scopes', 'Vintage_Reel', 'Desk_Lamp'];
    sceneObjects.forEach((obj, i) => {
      ctx.fillStyle = '#7f7f7f';
      ctx.fillText(`☖ ${obj}`, 30, 105 + i * 22);
    });
    
    // Middle: 3D Viewport
    ctx.fillStyle = '#030304';
    ctx.fillRect(222, 42, 580, 316);
    ctx.strokeStyle = 'rgba(255,255,255,0.03)';
    for (let i = 0; i < 8; i++) {
      ctx.beginPath(); ctx.moveTo(250 + i * 60, 180); ctx.lineTo(350 + i * 30, 340); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(222, 200 + i * 18); ctx.lineTo(802, 200 + i * 18); ctx.stroke();
    }
    
    ctx.strokeStyle = '#fa9e89';
    ctx.lineWidth = 1.5;
    const boxX = 510;
    const boxY = 180 + Math.sin(time) * 12;
    ctx.strokeRect(boxX - 30, boxY - 30, 60, 60);
    ctx.strokeRect(boxX - 15, boxY - 45, 60, 60);
    ctx.beginPath();
    ctx.moveTo(boxX-30, boxY-30); ctx.lineTo(boxX-15, boxY-45);
    ctx.moveTo(boxX+30, boxY-30); ctx.lineTo(boxX+45, boxY-45);
    ctx.moveTo(boxX-30, boxY+30); ctx.lineTo(boxX-15, boxY+15);
    ctx.moveTo(boxX+30, boxY+30); ctx.lineTo(boxX+45, boxY+15);
    ctx.stroke();
    
    // Right side: Properties
    ctx.fillStyle = '#0a0a0d';
    ctx.fillRect(808, 42, 210, 316);
    ctx.fillStyle = '#7f7f7f';
    ctx.fillText("Properties Panel", 820, 70);
    ctx.fillStyle = '#c8c8c8';
    ctx.fillText(`Loc X: ${(2.3 + Math.sin(time)*0.1).toFixed(2)}m`, 820, 100);
    ctx.fillText(`Loc Y: ${(-19.0).toFixed(2)}m`, 820, 125);
    ctx.fillText(`Loc Z: ${(4.2 + Math.cos(time)*0.1).toFixed(2)}m`, 820, 150);
    
    // Bottom: Shader node mapping
    ctx.fillStyle = '#08080b';
    ctx.fillRect(6, 364, w - 12, 206);
    const snodes = [
      { x: 60, y: 410, title: 'Image Texture', items: ['• Color', '• Vector'] },
      { x: 270, y: 395, title: 'Principled BSDF', items: ['• Base Color', '• Roughness', '• Metallic'] },
      { x: 560, y: 410, title: 'Material Output', items: ['• Surface', '• Displacement'] }
    ];
    ctx.strokeStyle = '#fa9e89';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(180, 445); ctx.lineTo(270, 425);
    ctx.moveTo(440, 430); ctx.lineTo(560, 445);
    ctx.stroke();
    
    snodes.forEach(node => {
      ctx.fillStyle = '#16161c';
      ctx.fillRect(node.x, node.y, 110, 70);
      ctx.strokeStyle = 'rgba(255,255,255,0.08)';
      ctx.strokeRect(node.x, node.y, 110, 70);
      ctx.fillStyle = '#fa9e89';
      ctx.fillRect(node.x, node.y, 110, 18);
      ctx.fillStyle = '#050505';
      ctx.font = 'bold 9px "Inter", sans-serif';
      ctx.fillText(node.title, node.x + 6, node.y + 12);
      ctx.fillStyle = '#ffffff';
      ctx.font = 'normal 8px "Inter", sans-serif';
      node.items.forEach((txt, idx) => {
        ctx.fillText(txt, node.x + 6, node.y + 32 + idx * 14);
      });
    });
  }
}

// Dynamic drawing function for Secondary Screen
function drawScopeScreen(canvas, software, time) {
  const ctx = canvas.getContext('2d');
  const w = canvas.width;
  const h = canvas.height;
  
  ctx.fillStyle = '#08080b';
  ctx.fillRect(0, 0, w, h);
  
  ctx.strokeStyle = 'rgba(255,255,255,0.03)';
  ctx.lineWidth = 1;
  for(let i=1; i<8; i++) {
    ctx.beginPath(); ctx.moveTo(0, i * 48); ctx.lineTo(w, i * 48); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(i * 64, 0); ctx.lineTo(i * 64, h); ctx.stroke();
  }
  
  if (software === 'resolve') {
    ctx.fillStyle = '#7f7f7f';
    ctx.font = 'normal 10px Courier New';
    ctx.fillText("COLOR SCOPES / RGB PARADE", 20, 25);
    
    ctx.lineWidth = 1.0;
    // Red Parade
    ctx.strokeStyle = '#ef4444';
    ctx.beginPath();
    for (let x = 0; x < w; x++) {
      const y = (h * 0.47) + Math.sin(x * 0.05 + time * 3) * 20 + Math.cos(x * 0.15) * 10 + (Math.random() - 0.5) * 8;
      if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    }
    ctx.stroke();
    
    // Green Parade
    ctx.strokeStyle = '#22c55e';
    ctx.beginPath();
    for (let x = 0; x < w; x++) {
      const y = (h * 0.55) + Math.cos(x * 0.06 + time * 2.5) * 25 + Math.sin(x * 0.22) * 8 + (Math.random() - 0.5) * 8;
      if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    }
    ctx.stroke();
    
    // Blue Parade
    ctx.strokeStyle = '#3b82f6';
    ctx.beginPath();
    for (let x = 0; x < w; x++) {
      const y = (h * 0.63) + Math.sin(x * 0.07 + time * 4) * 15 + Math.cos(x * 0.12) * 12 + (Math.random() - 0.5) * 8;
      if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    }
    ctx.stroke();
    
  } else if (software === 'premiere') {
    ctx.fillStyle = '#7f7f7f';
    ctx.font = 'normal 10px Courier New';
    ctx.fillText("AUDIO MIXER LEVELS / DECIBEL VIEW", 20, 25);
    
    for (let i = 0; i < 4; i++) {
      const bx = (w * 0.2) + i * 80;
      ctx.fillStyle = '#101015';
      ctx.fillRect(bx, 60, 30, h - 120);
      const hVal = (h - 140) * (0.4 + Math.sin(time * 5 + i * 2.5) * 0.3 + Math.cos(time * 8) * 0.05);
      const grad = ctx.createLinearGradient(bx, h - 80, bx, 60);
      grad.addColorStop(0, '#22c55e');
      grad.addColorStop(0.65, '#eab308');
      grad.addColorStop(1, '#ef4444');
      ctx.fillStyle = grad;
      ctx.fillRect(bx, h - 80 - hVal, 30, hVal);
    }
    
  } else if (software === 'ae') {
    ctx.fillStyle = '#7f7f7f';
    ctx.font = 'normal 10px Courier New';
    ctx.fillText("RENDER QUEUE / CACHE STATS", 20, 25);
    
    ctx.strokeStyle = '#d689fa';
    ctx.lineWidth = 2;
    ctx.beginPath();
    for (let x = 0; x < w; x++) {
      const y = (h * 0.47) + Math.sin(x * 0.08 + time * 4.5) * 35 * Math.sin(x * 0.01) + (Math.random() - 0.5) * 4;
      if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    }
    ctx.stroke();
    
    ctx.fillStyle = 'rgba(214, 137, 250, 0.15)';
    ctx.fillRect(40, h - 144, w - 80, 40);
    ctx.fillStyle = '#d689fa';
    const cacheProgress = (time * 25) % (w - 80);
    ctx.fillRect(40, h - 144, cacheProgress, 40);
    ctx.fillStyle = '#ffffff';
    ctx.fillText(`Caching frame ${Math.floor(time * 24) % 120} / 120...`, 50, h - 119);
    
  } else if (software === 'blender') {
    ctx.fillStyle = '#7f7f7f';
    ctx.font = 'normal 10px Courier New';
    ctx.fillText("SHADER RENDER PREVIEW / SAMPLES", 20, 25);
    
    const bx = (w - 256) / 2;
    const by = (h - 192) / 2;
    ctx.fillStyle = 'rgba(250, 158, 137, 0.08)';
    ctx.fillRect(bx, by, 256, 192);
    ctx.strokeStyle = '#fa9e89';
    ctx.strokeRect(bx, by, 256, 192);
    
    ctx.fillStyle = '#fa9e89';
    const samples = Math.floor(time * 5) % 16;
    for (let i = 0; i < samples; i++) {
      const sx = bx + (i % 4) * 64;
      const sy = by + Math.floor(i / 4) * 48;
      ctx.fillRect(sx, sy, 64, 48);
      ctx.strokeStyle = '#08080c';
      ctx.strokeRect(sx, sy, 64, 48);
    }
  }
}

// Storyboard sketches on desk paper sheet
function createStoryboardTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');
  
  ctx.fillStyle = '#eae5da'; // vintage off-white
  ctx.fillRect(0, 0, 512, 256);
  
  for(let i=0; i<3; i++) {
    const bx = 30 + i * 160;
    const by = 40;
    ctx.strokeStyle = '#1e1e1e';
    ctx.lineWidth = 2;
    ctx.strokeRect(bx, by, 130, 90);
    
    ctx.fillStyle = 'rgba(0,0,0,0.06)';
    ctx.fillRect(bx+4, by+4, 122, 82);
    
    // Draw visual sketch lines
    ctx.strokeStyle = 'rgba(30,30,30,0.6)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(bx + 15, by + 65);
    ctx.lineTo(bx + 65, by + 25);
    ctx.lineTo(bx + 115, by + 65);
    ctx.stroke();
    
    ctx.beginPath();
    ctx.arc(bx + 65, by + 45, 10, 0, Math.PI * 2);
    ctx.stroke();
    
    ctx.fillStyle = '#111';
    ctx.font = 'bold 10px "Inter", sans-serif';
    ctx.fillText(`SCENE 0${i+1}`, bx, by + 115);
    ctx.font = '300 9px "Inter", sans-serif';
    ctx.fillText(`ANGLE: EXT. WIDE`, bx, by + 130);
  }
  
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

export function Workspace3D({ activeSoftware = 'resolve' }) {
  const workspaceRef = useRef();
  const frameCountRef = useRef(0);
  
  const config = useMemo(() => getRenderConfig(), []);
  
  const { mainCanvas, mainScreenTex, scopeCanvas, scopeScreenTex, storyboardTex } = useMemo(() => {
    const mainCanvas = document.createElement('canvas');
    mainCanvas.width = config.canvasTextureSize.main[0];
    mainCanvas.height = config.canvasTextureSize.main[1];
    
    const scopeCanvas = document.createElement('canvas');
    scopeCanvas.width = config.canvasTextureSize.scope[0];
    scopeCanvas.height = config.canvasTextureSize.scope[1];
    
    const mainScreenTex = new THREE.CanvasTexture(mainCanvas);
    mainScreenTex.colorSpace = THREE.SRGBColorSpace;

    const scopeScreenTex = new THREE.CanvasTexture(scopeCanvas);
    scopeScreenTex.colorSpace = THREE.SRGBColorSpace;

    const storyboardTex = createStoryboardTexture();
    
    return { mainCanvas, mainScreenTex, scopeCanvas, scopeScreenTex, storyboardTex };
  }, [config]);

  useFrame((state) => {
    if (!workspaceRef.current) return;
    const time = state.clock.getElapsedTime();
    workspaceRef.current.position.y = -20 + Math.sin(time * 0.4) * 0.15;
    workspaceRef.current.rotation.y = Math.sin(time * 0.2) * 0.05;

    // Draw dynamic software screens with throttling
    frameCountRef.current++;
    if (frameCountRef.current % config.textureUpdateInterval === 0) {
      drawMainScreen(mainCanvas, activeSoftware, time);
      drawScopeScreen(scopeCanvas, activeSoftware, time);

      // Update textures
      mainScreenTex.needsUpdate = true;
      scopeScreenTex.needsUpdate = true;
    }
  });

  // Cleanup WebGL textures when component is unmounted to prevent GPU resource leaks
  useEffect(() => {
    return () => {
      mainScreenTex.dispose();
      scopeScreenTex.dispose();
      storyboardTex.dispose();
    };
  }, [mainScreenTex, scopeScreenTex, storyboardTex]);

  return (
    <group ref={workspaceRef} position={[0, -20, 0]} rotation={[0.1, 0, 0]}>
      
      {/* Desk Base */}
      <mesh position={[0, -2.6, 0]} scale={[12, 0.2, 5.5]}>
        <boxGeometry />
        <meshStandardMaterial 
          color="#0b0b0d" 
          roughness={0.45} 
          metalness={0.65} 
        />
      </mesh>

      {/* Main Screen (Adobe/Resolve Monitor) */}
      <group position={[0.5, 0, -1.2]}>
        <mesh scale={[5, 2.8, 0.15]}>
          <boxGeometry />
          <meshStandardMaterial color="#141417" roughness={0.6} />
        </mesh>
        
        <mesh position={[0, 0, 0.08]} scale={[4.8, 2.6, 0.01]}>
          <planeGeometry />
          <meshBasicMaterial map={mainScreenTex} />
        </mesh>

        <mesh position={[0, -1.8, -0.2]} scale={[0.2, 1.2, 0.2]}>
          <cylinderGeometry />
          <meshStandardMaterial color="#080809" roughness={0.3} metalness={0.9} />
        </mesh>
        
        <mesh position={[0, -2.45, -0.2]} scale={[1.2, 0.05, 0.8]}>
          <boxGeometry />
          <meshStandardMaterial color="#080809" roughness={0.2} metalness={0.9} />
        </mesh>
      </group>

      {/* Scopes Screen (Left Monitor) */}
      <group position={[-3.8, 0.2, -0.7]} rotation={[0, 0.45, 0]}>
        <mesh scale={[3.6, 2.5, 0.15]}>
          <boxGeometry />
          <meshStandardMaterial color="#141417" roughness={0.6} />
        </mesh>
        
        <mesh position={[0, 0, 0.08]} scale={[3.4, 2.3, 0.01]}>
          <planeGeometry />
          <meshBasicMaterial map={scopeScreenTex} />
        </mesh>

        <mesh position={[0, -1.6, -0.2]} scale={[0.18, 1.2, 0.18]}>
          <cylinderGeometry />
          <meshStandardMaterial color="#080809" roughness={0.3} metalness={0.9} />
        </mesh>
        
        <mesh position={[0, -2.45, -0.2]} scale={[0.9, 0.05, 0.7]}>
          <boxGeometry />
          <meshStandardMaterial color="#080809" roughness={0.2} metalness={0.9} />
        </mesh>
      </group>

      {/* Color Grading Controller Panel (Right desk) */}
      <group position={[1.8, -2.45, 0.8]} rotation={[0, -0.2, 0]}>
        <mesh scale={[1.6, 0.1, 1.0]}>
          <boxGeometry />
          <meshStandardMaterial color="#1a1a20" roughness={0.5} metalness={0.4} />
        </mesh>
        
        <group position={[-0.45, 0.1, 0]}>
          <mesh scale={[0.16, 0.16, 0.16]}>
            <sphereGeometry />
            <meshBasicMaterial color="#b89f65" />
          </mesh>
          <mesh position={[0, 0.02, 0]} scale={[0.24, 0.01, 0.24]}>
            <cylinderGeometry />
            <meshStandardMaterial color="#08080a" />
          </mesh>
        </group>
        
        <group position={[0, 0.1, 0]}>
          <mesh scale={[0.16, 0.16, 0.16]}>
            <sphereGeometry />
            <meshBasicMaterial color="#b89f65" />
          </mesh>
          <mesh position={[0, 0.02, 0]} scale={[0.24, 0.01, 0.24]}>
            <cylinderGeometry />
            <meshStandardMaterial color="#08080a" />
          </mesh>
        </group>
        
        <group position={[0.45, 0.1, 0]}>
          <mesh scale={[0.16, 0.16, 0.16]}>
            <sphereGeometry />
            <meshBasicMaterial color="#b89f65" />
          </mesh>
          <mesh position={[0, 0.02, 0]} scale={[0.24, 0.01, 0.24]}>
            <cylinderGeometry />
            <meshStandardMaterial color="#08080a" />
          </mesh>
        </group>
      </group>

      {/* Keyboard & Audio Console (Left/Mid desk) */}
      <group position={[-1.6, -2.0, 1.0]} rotation={[0, 0.6, 0]}>
        <mesh scale={[0.8, 0.65, 1.1]}>
          <boxGeometry />
          <meshStandardMaterial color="#0c0c0e" roughness={0.7} metalness={0.3} />
        </mesh>
        
        <mesh position={[0, 0, 0.7]} scale={[0.9, 0.75, 0.3]}>
          <boxGeometry />
          <meshStandardMaterial color="#050505" roughness={0.8} />
        </mesh>

        <mesh position={[0, 0, 0.86]} scale={[0.7, 0.5, 0.01]}>
          <planeGeometry />
          <meshPhysicalMaterial 
            color="#b89f65" 
            emissive="#b89f65" 
            emissiveIntensity={0.8} 
            transparent={true} 
            opacity={0.3} 
          />
        </mesh>

        <mesh position={[0, 0.45, 0]} scale={[0.12, 0.25, 0.9]}>
          <boxGeometry />
          <meshStandardMaterial color="#1a1a20" metalness={0.8} roughness={0.2} />
        </mesh>
      </group>

      {/* Storyboard Paper sheet on desk */}
      <group position={[-1.0, -2.48, 1.2]} rotation={[-Math.PI / 2, 0, 0.05]}>
        <mesh scale={[1.8, 0.9, 0.01]}>
          <boxGeometry />
          <meshStandardMaterial map={storyboardTex} roughness={0.9} />
        </mesh>
      </group>

      {/* Film Reel Reel container (vintage aesthetic) */}
      <group position={[-4.8, -2.45, 0.8]} rotation={[0, 0.1, 0]}>
        <mesh scale={[1.3, 0.02, 1.3]}>
          <cylinderGeometry />
          <meshStandardMaterial color="#b89f65" metalness={0.8} roughness={0.3} />
        </mesh>
        <mesh position={[0, 0.08, 0]} scale={[0.65, 0.16, 0.65]}>
          <cylinderGeometry />
          <meshStandardMaterial color="#101014" metalness={0.4} />
        </mesh>
        <mesh position={[0, 0.08, 0]} scale={[1.15, 0.15, 1.15]}>
          <cylinderGeometry />
          <meshStandardMaterial color="#241e15" roughness={0.9} />
        </mesh>
        <mesh position={[0, 0.16, 0]} scale={[1.3, 0.02, 1.3]}>
          <cylinderGeometry />
          <meshStandardMaterial color="#b89f65" metalness={0.8} roughness={0.3} />
        </mesh>
        
        {[-0.35, 0.35].map((val, idx) => (
          <mesh key={idx} position={[val, 0.17, 0]} scale={[0.14, 0.01, 0.14]}>
            <cylinderGeometry />
            <meshBasicMaterial color="#050505" />
          </mesh>
        ))}
        {[-0.35, 0.35].map((val, idx) => (
          <mesh key={idx + 2} position={[0, 0.17, val]} scale={[0.14, 0.01, 0.14]}>
            <cylinderGeometry />
            <meshBasicMaterial color="#050505" />
          </mesh>
        ))}
      </group>

      {/* Desk Lamp Spotlight */}
      <group position={[4.2, -2.5, -1.5]} rotation={[0, -0.6, 0]}>
        <mesh position={[0, 0.02, 0]} scale={[0.6, 0.04, 0.6]}>
          <cylinderGeometry />
          <meshStandardMaterial color="#111116" metalness={0.8} />
        </mesh>
        <mesh position={[-0.2, 1.2, 0]} scale={[0.08, 2.2, 0.08]} rotation={[0, 0, -0.15]}>
          <cylinderGeometry />
          <meshStandardMaterial color="#b89f65" metalness={0.8} />
        </mesh>
        <group position={[-0.4, 2.2, 0.2]} rotation={[0.4, 0, 0.3]}>
          <mesh scale={[0.4, 0.5, 0.4]}>
            <cylinderGeometry />
            <meshStandardMaterial color="#111116" roughness={0.5} />
          </mesh>
          <mesh position={[0, -0.26, 0]} scale={[0.34, 0.01, 0.34]}>
            <planeGeometry />
            <meshBasicMaterial color="#f5f5f5" />
          </mesh>
        </group>
      </group>

    </group>
  );
}
