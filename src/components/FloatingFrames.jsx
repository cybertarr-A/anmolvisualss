import React, { useRef, useMemo, useState, useEffect } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

// Procedural Software Logo Generator
function createSoftwareLogoTexture(software) {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  // Smooth, transparent-friendly drawing
  ctx.clearRect(0, 0, 512, 512);

  // Background shape
  ctx.fillStyle = 'rgba(12, 12, 16, 0.92)';
  ctx.beginPath();
  if (software === 'resolve' || software === 'blender' || software === 'fcp') {
    ctx.arc(256, 256, 240, 0, Math.PI * 2);
  } else {
    // Adobe products and Avid: rounded rect
    const r = 48;
    ctx.roundRect ? ctx.roundRect(16, 16, 480, 480, r) : ctx.rect(16, 16, 480, 480);
  }
  ctx.fill();

  // Glow color selection
  let glowColor = '#b89f65';
  if (software === 'resolve') glowColor = '#eac373';
  else if (software === 'premiere') glowColor = '#9452ff';
  else if (software === 'ae') glowColor = '#ff5ce6';
  else if (software === 'blender') glowColor = '#ff7c00';
  else if (software === 'avid') glowColor = '#00e5ff';
  else if (software === 'fcp') glowColor = '#ef4444';

  // Inner border stroke
  ctx.strokeStyle = glowColor;
  ctx.lineWidth = 10;
  ctx.stroke();

  // Glow shadow for the logo details
  ctx.shadowColor = glowColor;
  ctx.shadowBlur = 25;

  if (software === 'premiere') {
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 190px "Inter", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('Pr', 256, 240);

    ctx.shadowBlur = 0;
    ctx.fillStyle = 'rgba(255, 255, 255, 0.45)';
    ctx.font = 'bold 22px "Inter", sans-serif';
    if (ctx.letterSpacing !== undefined) ctx.letterSpacing = '3px';
    ctx.fillText('PREMIERE PRO', 256, 415);
  } 
  else if (software === 'ae') {
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 190px "Inter", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('Ae', 256, 240);

    ctx.shadowBlur = 0;
    ctx.fillStyle = 'rgba(255, 255, 255, 0.45)';
    ctx.font = 'bold 22px "Inter", sans-serif';
    if (ctx.letterSpacing !== undefined) ctx.letterSpacing = '3px';
    ctx.fillText('AFTER EFFECTS', 256, 415);
  } 
  else if (software === 'resolve') {
    const cx = 256;
    const cy = 220;
    const r = 75;

    ctx.save();
    ctx.globalCompositeOperation = 'screen';
    
    // Red petal
    ctx.beginPath();
    ctx.arc(cx, cy - 35, r, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255, 60, 60, 0.9)';
    ctx.fill();

    // Green petal
    ctx.beginPath();
    ctx.arc(cx + 32, cy + 20, r, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(60, 255, 60, 0.9)';
    ctx.fill();

    // Blue petal
    ctx.beginPath();
    ctx.arc(cx - 32, cy + 20, r, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(60, 100, 255, 0.9)';
    ctx.fill();

    ctx.restore();

    // Black cutout
    ctx.shadowBlur = 0;
    ctx.fillStyle = 'rgba(12, 12, 16, 1)';
    ctx.beginPath();
    ctx.arc(cx, cy, 32, 0, Math.PI * 2);
    ctx.fill();

    // Text
    ctx.fillStyle = '#eac373';
    ctx.font = 'bold 22px "Cinzel", serif';
    if (ctx.letterSpacing !== undefined) ctx.letterSpacing = '3px';
    ctx.textAlign = 'center';
    ctx.fillText('DAVINCI RESOLVE', 256, 415);
  } 
  else if (software === 'blender') {
    const cx = 256;
    const cy = 220;

    // Orange outer ring
    ctx.strokeStyle = '#ff7c00';
    ctx.lineWidth = 20;
    ctx.beginPath();
    ctx.arc(cx, cy, 70, 0, Math.PI * 2);
    ctx.stroke();

    // Blue inner circle
    ctx.fillStyle = '#008cff';
    ctx.beginPath();
    ctx.arc(cx, cy, 32, 0, Math.PI * 2);
    ctx.fill();

    // Orange fingers/spokes
    ctx.fillStyle = '#ff7c00';
    const angles = [Math.PI * 1.62, Math.PI * 1.82, Math.PI * 2.02];
    angles.forEach(angle => {
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(angle);
      ctx.fillRect(55, -10, 55, 20);
      ctx.beginPath();
      ctx.arc(110, 0, 10, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    });

    // Text
    ctx.shadowBlur = 0;
    ctx.fillStyle = '#ff7c00';
    ctx.font = 'bold 22px "Inter", sans-serif';
    if (ctx.letterSpacing !== undefined) ctx.letterSpacing = '3px';
    ctx.textAlign = 'center';
    ctx.fillText('BLENDER 3D', 256, 415);
  } 
  else if (software === 'avid') {
    const cx = 256;
    const cy = 220;

    ctx.strokeStyle = '#00e5ff';
    ctx.lineWidth = 20;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    ctx.beginPath();
    ctx.moveTo(cx - 50, cy - 65);
    ctx.lineTo(cx + 20, cy);
    ctx.lineTo(cx - 50, cy + 65);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(cx + 5, cy - 65);
    ctx.lineTo(cx + 75, cy);
    ctx.lineTo(cx + 5, cy + 65);
    ctx.stroke();

    // Text
    ctx.shadowBlur = 0;
    ctx.fillStyle = '#00e5ff';
    ctx.font = 'bold 22px "Inter", sans-serif';
    if (ctx.letterSpacing !== undefined) ctx.letterSpacing = '2px';
    ctx.textAlign = 'center';
    ctx.fillText('AVID MEDIA COMPOSER', 256, 415);
  } 
  else if (software === 'fcp') {
    const cx = 256;
    const cy = 220;
    const outerR = 80;
    const innerR = 25;

    // Rainbow spectrum segments
    const segments = 12;
    for (let i = 0; i < segments; i++) {
      const startAngle = (i / segments) * Math.PI * 2;
      const endAngle = ((i + 1) / segments) * Math.PI * 2;
      
      const grad = ctx.createRadialGradient(cx, cy, innerR, cx, cy, outerR);
      const hue = (i / segments) * 360;
      grad.addColorStop(0, `hsl(${hue}, 100%, 75%)`);
      grad.addColorStop(1, `hsl(${hue}, 100%, 50%)`);
      
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(cx, cy, outerR, startAngle, endAngle);
      ctx.arc(cx, cy, innerR, endAngle, startAngle, true);
      ctx.closePath();
      ctx.fill();
    }

    // Outer white rim
    ctx.shadowBlur = 0;
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.arc(cx, cy, outerR + 4, 0, Math.PI * 2);
    ctx.stroke();

    // Text
    ctx.fillStyle = '#ff3b30';
    ctx.font = 'bold 22px "Inter", sans-serif';
    if (ctx.letterSpacing !== undefined) ctx.letterSpacing = '3px';
    ctx.textAlign = 'center';
    ctx.fillText('FINAL CUT PRO', 256, 415);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

function FloatingLogoMesh({ frame, index }) {
  const groupRef = useRef();
  const borderRef = useRef();
  const [hovered, setHovered] = useState(false);

  // Layout parameters
  const isRound = frame.software === 'resolve' || frame.software === 'blender' || frame.software === 'fcp';
  const size = frame.scale * 1.7;

  useFrame((state) => {
    if (!groupRef.current) return;
    const time = state.clock.getElapsedTime();

    // Smooth floating movement (sway)
    const targetY = frame.pos[1] + Math.sin(time * frame.swaySpeedY + index) * frame.swayAmp * 2.0;
    const targetX = frame.pos[0] + Math.cos(time * frame.swaySpeedX + index) * frame.swayAmp * 1.5;
    
    groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetY, 0.1);
    groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, targetX, 0.1);

    // Hover scale animation
    const targetScale = hovered ? 1.15 : 1.0;
    groupRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);

    // Rotational dynamics (slow spin + mouse tilt)
    const baseRotX = frame.rot[0] + Math.cos(time * 0.08 + index) * 0.02 + (hovered ? 0.1 : 0);
    const baseRotY = frame.rot[1] + Math.sin(time * 0.1 + index) * 0.03 + (hovered ? 0.15 : 0);
    const baseRotZ = frame.rot[2] + Math.sin(time * 0.05 + index) * 0.01 + (hovered ? (time * 0.2) % (Math.PI * 2) : 0);

    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, baseRotX, 0.1);
    
    // Smooth continuous spinning on Y if hovered
    const rotYSpeed = hovered ? time * 0.5 : baseRotY;
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, rotYSpeed, 0.08);

    // Dynamic border emission control
    if (borderRef.current) {
      const targetEmissive = hovered ? 2.5 : 0.6;
      borderRef.current.material.emissiveIntensity = THREE.MathUtils.lerp(
        borderRef.current.material.emissiveIntensity || 0,
        targetEmissive,
        0.1
      );
    }
  });

  const handlePointerOver = (e) => {
    e.stopPropagation();
    setHovered(true);
    document.body.style.cursor = 'pointer';
  };

  const handlePointerOut = (e) => {
    e.stopPropagation();
    setHovered(false);
    document.body.style.cursor = 'default';
  };

  const handleClick = (e) => {
    e.stopPropagation();
    // Scroll down to the Showcase/Toolkit section when clicked
    const el = document.getElementById('toolkit');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  // Render 3D Shape geometry depending on software type
  const render3DGeometry = () => {
    if (isRound) {
      // Cylinder / Coin shape for round logos
      return (
        <group>
          {/* Front Face Plate */}
          <mesh position={[0, 0, 0.04]}>
            <planeGeometry args={[size, size]} />
            <meshBasicMaterial 
              map={frame.texture} 
              transparent={true} 
              depthWrite={false} 
            />
          </mesh>

          {/* 3D Backing Coin */}
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[size * 0.49, size * 0.49, 0.07, 48]} />
            <meshStandardMaterial 
              color="#111116" 
              roughness={0.2} 
              metalness={0.85} 
            />
          </mesh>

          {/* Glowing Outer Torus Rim */}
          <mesh ref={borderRef} position={[0, 0, 0.005]}>
            <torusGeometry args={[size * 0.495, 0.025, 12, 64]} />
            <meshStandardMaterial 
              color={frame.color} 
              emissive={frame.color}
              emissiveIntensity={0.6}
              roughness={0.1}
              metalness={0.9}
            />
          </mesh>
        </group>
      );
    } else {
      // Rounded plate / Box shape for square logos
      return (
        <group>
          {/* Front Face Plate */}
          <mesh position={[0, 0, 0.04]}>
            <planeGeometry args={[size, size]} />
            <meshBasicMaterial 
              map={frame.texture} 
              transparent={true} 
              depthWrite={false} 
            />
          </mesh>

          {/* 3D Backing Plate */}
          <mesh>
            <boxGeometry args={[size * 0.98, size * 0.98, 0.07]} />
            <meshStandardMaterial 
              color="#111116" 
              roughness={0.2} 
              metalness={0.85} 
            />
          </mesh>

          {/* Glowing Outer Border Box */}
          <mesh ref={borderRef} position={[0, 0, -0.015]} scale={[1.03, 1.03, 0.8]}>
            <boxGeometry args={[size, size, 0.05]} />
            <meshStandardMaterial 
              color={frame.color} 
              emissive={frame.color}
              emissiveIntensity={0.6}
              roughness={0.15}
              metalness={0.9}
            />
          </mesh>
        </group>
      );
    }
  };

  return (
    <group 
      ref={groupRef} 
      position={frame.pos} 
      rotation={frame.rot}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
      onClick={handleClick}
    >
      {render3DGeometry()}

      {/* Embedded Point Light projecting colored glow */}
      <pointLight 
        distance={3.5} 
        intensity={hovered ? 3.5 : 1.2} 
        color={frame.color} 
        position={[0, 0, 0.2]} 
      />
    </group>
  );
}

export function FloatingFrames() {
  const frames = useMemo(() => {
    const data = [
      { software: 'resolve', color: '#eac373', pos: [-3.2, 1.2, 1], rot: [0, 0.35, 0], scale: 1.1 },
      { software: 'premiere', color: '#9452ff', pos: [3.2, 2.2, -1.5], rot: [0, -0.25, 0.08], scale: 0.95 },
      { software: 'ae', color: '#ff5ce6', pos: [-4.6, -1.8, -2.5], rot: [0.08, 0.45, -0.05], scale: 1.0 },
      { software: 'blender', color: '#ff7c00', pos: [4.2, -0.8, 0.2], rot: [-0.08, -0.35, -0.04], scale: 1.05 },
      { software: 'avid', color: '#00e5ff', pos: [-1, 3.8, -3.5], rot: [0.08, 0.08, 0.04], scale: 0.8 },
      { software: 'fcp', color: '#ef4444', pos: [1.6, -3.2, -1.8], rot: [-0.04, -0.15, 0.08], scale: 0.85 }
    ];

    return data.map((item, idx) => {
      const texture = createSoftwareLogoTexture(item.software);
      
      return {
        ...item,
        texture,
        swaySpeedX: 0.35 + Math.random() * 0.2,
        swaySpeedY: 0.25 + Math.random() * 0.3,
        swayAmp: 0.06 + Math.random() * 0.05,
        id: idx
      };
    });
  }, []);

  // Clean up textures on unmount to prevent memory leaks
  useEffect(() => {
    return () => {
      frames.forEach(frame => {
        if (frame.texture) {
          frame.texture.dispose();
        }
      });
    };
  }, [frames]);

  return (
    <group>
      {frames.map((frame, idx) => (
        <FloatingLogoMesh key={frame.id} frame={frame} index={idx} />
      ))}
    </group>
  );
}
