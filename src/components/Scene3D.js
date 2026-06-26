import React, { useRef, useMemo, useEffect } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import htm from 'https://esm.sh/htm';
import { FloatingFrames } from './FloatingFrames.js?v=1.0.6';
import { Workspace3D } from './Workspace3D.js';
import { scrollState } from '../hooks/useScrollRig.js';

const html = htm.bind(React.createElement);

if (typeof window !== 'undefined') {
  window.mouseX = 0;
  window.mouseY = 0;
}

function CameraController() {
  const { camera } = useThree();
  const currentLookAt = useRef(new THREE.Vector3(0, 0, 0));

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        camera.fov = 65;
      } else {
        camera.fov = 50;
      }
      camera.updateProjectionMatrix();
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [camera]);

  useFrame(() => {
    scrollState.progress = THREE.MathUtils.lerp(scrollState.progress || 0, scrollState.targetProgress || 0, 0.05);
    scrollState.y = THREE.MathUtils.lerp(scrollState.y || 0, scrollState.targetY || 0, 0.05);

    const progress = scrollState.progress;

    // Camera paths coordinated across 6 sections:
    // Stage 1 (Hero):       0.0 to 0.20
    // Stage 2 (Work):       0.20 to 0.40
    // Stage 3 (About):      0.40 to 0.60
    // Stage 4 (Toolkit):    0.60 to 0.80
    // Stage 5 (ColorSuite): 0.80 to 0.90
    // Stage 6 (Contact):    0.90 to 1.0

    let targetX = 0;
    let targetY = 0.5;
    let targetZ = 7.5;

    let lookX = 0;
    let lookY = 0;
    let lookZ = 0;

    if (progress < 0.20) {
      // Hero to Work
      const t = progress / 0.20;
      targetX = THREE.MathUtils.lerp(0, 0, t);
      targetY = THREE.MathUtils.lerp(0.5, -4, t);
      targetZ = THREE.MathUtils.lerp(7.5, 9.5, t);
      lookX = 0;
      lookY = THREE.MathUtils.lerp(0, -4, t);
      lookZ = 0;
    } else if (progress < 0.40) {
      // Work to About (Workstation view)
      const t = (progress - 0.20) / 0.20;
      targetX = THREE.MathUtils.lerp(0, 2.3, t);
      targetY = THREE.MathUtils.lerp(-4, -19.0, t);
      targetZ = THREE.MathUtils.lerp(9.5, 4.2, t);
      lookX = THREE.MathUtils.lerp(0, -0.4, t);
      lookY = THREE.MathUtils.lerp(-4, -20.2, t);
      lookZ = THREE.MathUtils.lerp(0, 0.2, t);
    } else if (progress < 0.60) {
      // About to Toolkit (Close Screen Timeline focus zoom)
      const t = (progress - 0.40) / 0.20;
      targetX = THREE.MathUtils.lerp(2.3, -1.8, t);
      targetY = THREE.MathUtils.lerp(-19.0, -19.6, t);
      targetZ = THREE.MathUtils.lerp(4.2, 3.4, t);
      lookX = THREE.MathUtils.lerp(-0.4, 0, t);
      lookY = THREE.MathUtils.lerp(-20.2, -19.8, t);
      lookZ = THREE.MathUtils.lerp(0.2, -1, t);
    } else if (progress < 0.80) {
      // Toolkit to ColorSuite (Color Wheels Screen focus)
      const t = (progress - 0.60) / 0.20;
      targetX = THREE.MathUtils.lerp(-1.8, -3.8, t);
      targetY = THREE.MathUtils.lerp(-19.6, -19.8, t);
      targetZ = THREE.MathUtils.lerp(3.4, 3.2, t);
      lookX = THREE.MathUtils.lerp(0, -3.8, t);
      lookY = THREE.MathUtils.lerp(-19.8, -19.8, t);
      lookZ = THREE.MathUtils.lerp(-1, -1.5, t);
    } else {
      // ColorSuite to Contact (Downward credit roll glide)
      const t = (progress - 0.80) / 0.20;
      targetX = THREE.MathUtils.lerp(-3.8, 0, t);
      targetY = THREE.MathUtils.lerp(-19.8, -32.5, t);
      targetZ = THREE.MathUtils.lerp(3.2, 8.5, t);
      lookX = THREE.MathUtils.lerp(-3.8, 0, t);
      lookY = THREE.MathUtils.lerp(-19.8, -32.0, t);
      lookZ = THREE.MathUtils.lerp(-1.5, 0, t);
    }

    const mouseX = (window.mouseX || 0) * 0.45;
    const mouseY = (window.mouseY || 0) * 0.45;

    camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetX + mouseX, 0.05);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY - mouseY, 0.05);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.05);

    currentLookAt.current.x = THREE.MathUtils.lerp(currentLookAt.current.x, lookX, 0.05);
    currentLookAt.current.y = THREE.MathUtils.lerp(currentLookAt.current.y, lookY, 0.05);
    currentLookAt.current.z = THREE.MathUtils.lerp(currentLookAt.current.z, lookZ, 0.05);
    
    camera.lookAt(currentLookAt.current);
  });

  return null;
}

function DustParticles({ count = 350 }) {
  const pointsRef = useRef();

  const [positions, speeds] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const spd = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 18;
      pos[i * 3 + 1] = Math.random() * 45 - 38;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 18;
      spd[i] = 0.015 + Math.random() * 0.025;
    }
    return [pos, spd];
  }, [count]);

  const glowingCircleTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');
    
    // Create radial glow: White hot core -> warm gold -> transparent edge
    const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    grad.addColorStop(0, 'rgba(255, 255, 255, 1)'); 
    grad.addColorStop(0.2, 'rgba(235, 195, 115, 0.9)'); 
    grad.addColorStop(0.5, 'rgba(184, 159, 101, 0.45)'); 
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 64, 64);
    
    const tex = new THREE.CanvasTexture(canvas);
    return tex;
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const time = state.clock.getElapsedTime();
    const posAttr = pointsRef.current.geometry.attributes.position;

    for (let i = 0; i < count; i++) {
      const yIdx = i * 3 + 1;
      const xIdx = i * 3;
      posAttr.array[yIdx] -= speeds[i] * 0.2;
      posAttr.array[xIdx] += Math.sin(time * 0.4 + i) * 0.0006;
      if (posAttr.array[yIdx] < -38) {
        posAttr.array[yIdx] = 7;
      }
    }
    posAttr.needsUpdate = true;
  });

  return html`
    <points ref=${pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args=${[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size=${0.22}
        transparent=${true}
        map=${glowingCircleTexture}
        blending=${THREE.AdditiveBlending}
        depthWrite=${false}
        opacity=${0.75}
      />
    </points>
  `;
}

function CinemaScreen() {
  const meshRef = useRef();

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();
    meshRef.current.position.y = -11.5 + Math.sin(time * 0.5) * 0.08;
    meshRef.current.rotation.y = Math.cos(time * 0.3) * 0.02;
  });

  const glowTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 288;
    const ctx = canvas.getContext('2d');
    
    ctx.fillStyle = '#08080c';
    ctx.fillRect(0, 0, 512, 288);
    
    const grad = ctx.createRadialGradient(256, 144, 20, 256, 144, 200);
    grad.addColorStop(0, 'rgba(184, 159, 101, 0.15)');
    grad.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 512, 288);
    
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.lineWidth = 1;
    ctx.strokeRect(40, 30, 432, 228);
    
    ctx.fillStyle = '#f5f5f5';
    ctx.beginPath();
    ctx.moveTo(246, 129);
    ctx.lineTo(246, 159);
    ctx.lineTo(272, 144);
    ctx.closePath();
    ctx.fill();

    return new THREE.CanvasTexture(canvas);
  }, []);

  return html`
    <group ref=${meshRef} position=${[0, -11.5, -1]}>
      <mesh scale=${[5.6, 3.15, 0.1]}>
        <boxGeometry />
        <meshStandardMaterial 
          color="#0d0d0e" 
          roughness=${0.6}
        />
      </mesh>
      
      <mesh position=${[0, 0, 0.06]} scale=${[5.4, 2.95, 1]}>
        <planeGeometry />
        <meshBasicMaterial 
          map=${glowTexture}
          transparent=${true}
          opacity=${0.85}
        />
      </mesh>

      <mesh position=${[0, 0, -0.02]} scale=${[5.64, 3.19, 0.06]}>
        <boxGeometry />
        <meshStandardMaterial 
          color="#b89f65" 
          roughness=${0.4} 
          metalness=${0.8}
        />
      </mesh>
    </group>
  `;
}

export function Scene3D({ activeSoftware = 'resolve' }) {
  useEffect(() => {
    const handleMouseMove = (e) => {
      window.mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      window.mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return html`
    <div className="canvas-container">
      <${Canvas}
        camera=${{ position: [0, 0.5, 7.5], fov: 50, near: 0.1, far: 50 }}
        gl=${{ antialias: true, alpha: false, powerPreference: "high-performance" }}
        onCreated=${({ gl, scene }) => {
          gl.setClearColor(new THREE.Color('#040404'));
          scene.fog = new THREE.FogExp2('#040404', 0.045);
        }}
      >
        <${CameraController} />
        
        <ambientLight intensity=${0.1} />
        
        <directionalLight 
          position=${[5, 8, 4]} 
          intensity=${0.7} 
          color="#b89f65" 
        />
        <directionalLight 
          position=${[-5, -4, 2]} 
          intensity=${0.2} 
          color="#a0b0d0" 
        />
        
        <spotLight 
          position=${[0, 4, 8]} 
          angle=${0.6} 
          penumbra=${1} 
          intensity=${0.5} 
          color="#f5f5f5" 
        />

        <spotLight 
          position=${[0, -15, 3]} 
          target-position=${[0, -20, 0]}
          angle=${0.8} 
          penumbra=${0.9} 
          intensity=${1.5} 
          color="#b89f65" 
        />

        <${FloatingFrames} />
        <${CinemaScreen} />
        <${Workspace3D} activeSoftware=${activeSoftware} />
        <${DustParticles} />

      </${Canvas}>
    </div>
  `;
}
