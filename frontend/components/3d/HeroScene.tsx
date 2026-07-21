'use client';
/**
 * Hero 3D scene (spec §6.2.1):
 *  - 3,000-point particle field drifting + lerping toward the mouse
 *  - 10 semi-transparent wireframe solids orbiting slowly
 *  - Canvas is absolute + pointer-events:none so it never blocks the CTA
 * Lazy-loaded with ssr:false by the Hero section.
 */
import { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

function Particles({ count = 3000 }) {
  const ref = useRef<THREE.Points>(null);
  const mouse = useRef({ x: 0, y: 0 });

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 22;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 14;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return arr;
  }, [count]);

  useFrame((state) => {
    // subtle attraction toward the cursor — lerped, never instant (spec)
    mouse.current.x = THREE.MathUtils.lerp(mouse.current.x, state.pointer.x, 0.04);
    mouse.current.y = THREE.MathUtils.lerp(mouse.current.y, state.pointer.y, 0.04);
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.02 + mouse.current.x * 0.15;
      ref.current.rotation.x = mouse.current.y * 0.08;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.035} color="#6C63FF" transparent opacity={0.7} sizeAttenuation depthWrite={false} />
    </points>
  );
}

function OrbitingShapes() {
  const shapes = useMemo(
    () =>
      Array.from({ length: 10 }, (_, i) => ({
        position: [
          Math.cos((i / 10) * Math.PI * 2) * (4 + Math.random() * 3),
          (Math.random() - 0.5) * 5,
          -2 - Math.random() * 4,
        ] as [number, number, number],
        scale: 0.4 + Math.random() * 0.7,
        kind: i % 3,
        speed: 0.6 + Math.random(),
      })),
    [],
  );
  return (
    <>
      {shapes.map((s, i) => (
        <Float key={i} speed={s.speed} rotationIntensity={1.2} floatIntensity={1.2}>
          <mesh position={s.position} scale={s.scale}>
            {s.kind === 0 ? <icosahedronGeometry args={[1, 0]} />
              : s.kind === 1 ? <torusGeometry args={[0.8, 0.28, 12, 32]} />
              : <octahedronGeometry args={[1, 0]} />}
            <meshStandardMaterial
              color={i % 2 ? '#6C63FF' : '#00D9FF'}
              wireframe
              transparent
              opacity={0.35}
              emissive={i % 2 ? '#6C63FF' : '#00D9FF'}
              emissiveIntensity={0.4}
            />
          </mesh>
        </Float>
      ))}
    </>
  );
}

export default function HeroScene() {
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden="true">
      <Canvas
        dpr={[1, 1.8]}
        camera={{ position: [0, 0, 9], fov: 55 }}
        gl={{ antialias: false, powerPreference: 'high-performance' }}
        onCreated={({ gl }) => {
          // graceful WebGL context-loss fallback (spec §6.3)
          gl.domElement.addEventListener('webglcontextlost', (e) => e.preventDefault());
        }}
      >
        <ambientLight intensity={0.6} />
        <pointLight position={[6, 6, 6]} intensity={40} color="#6C63FF" />
        <Particles />
        <OrbitingShapes />
      </Canvas>
    </div>
  );
}
