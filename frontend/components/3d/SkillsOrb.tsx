'use client';
/**
 * Interactive skills orb (spec §6.2.2):
 * skill labels arranged on a Fibonacci sphere, billboarded to the camera.
 * Idle auto-rotation; drag to spin (OrbitControls, no zoom/pan); click → tooltip.
 */
import { useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Billboard, OrbitControls, Text } from '@react-three/drei';
import * as THREE from 'three';
import type { Skill } from '@/lib/serverApi';

function fibonacciSphere(n: number, radius: number) {
  const pts: [number, number, number][] = [];
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < n; i++) {
    const y = 1 - (i / Math.max(n - 1, 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = golden * i;
    pts.push([Math.cos(theta) * r * radius, y * radius, Math.sin(theta) * r * radius]);
  }
  return pts;
}

function Orb({ skills, onSelect }: { skills: Skill[]; onSelect: (s: Skill) => void }) {
  const group = useRef<THREE.Group>(null);
  const points = useMemo(() => fibonacciSphere(skills.length, 3), [skills.length]);
  useFrame(() => { if (group.current) group.current.rotation.y += 0.0015; }); // idle spin

  return (
    <group ref={group}>
      {skills.map((skill, i) => (
        <Billboard key={skill.id} position={points[i]}>
          <Text
            fontSize={0.34}
            color={skill.category === 'design' ? '#00D9FF' : '#F0F0FF'}
            outlineWidth={0.008}
            outlineColor="#0D0D1A"
            onClick={(e) => { e.stopPropagation(); onSelect(skill); }}
            onPointerOver={() => (document.body.style.cursor = 'pointer')}
            onPointerOut={() => (document.body.style.cursor = 'auto')}
          >
            {skill.name}
          </Text>
        </Billboard>
      ))}
      <mesh>
        <sphereGeometry args={[2.2, 24, 24]} />
        <meshStandardMaterial color="#6C63FF" wireframe transparent opacity={0.08} />
      </mesh>
    </group>
  );
}

export default function SkillsOrb({ skills }: { skills: Skill[] }) {
  const [selected, setSelected] = useState<Skill | null>(null);
  return (
    <div className="relative h-[420px] w-full" role="img" aria-label={`Skills: ${skills.map((s) => s.name).join(', ')}`}>
      <Canvas dpr={[1, 1.8]} camera={{ position: [0, 0, 8], fov: 50 }} aria-hidden="true">
        <ambientLight intensity={1.2} />
        <Orb skills={skills} onSelect={setSelected} />
        <OrbitControls enableZoom={false} enablePan={false} rotateSpeed={0.6} />
      </Canvas>
      {selected && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-xl border border-primary/40 bg-surface px-5 py-3 text-center shadow-lg">
          <p className="font-display font-semibold">{selected.name}</p>
          <div className="mt-2 h-1.5 w-40 overflow-hidden rounded-full bg-muted/20">
            <div className="h-full rounded-full bg-gradient-to-r from-primary to-secondary" style={{ width: `${selected.level}%` }} />
          </div>
          <p className="mt-1 text-xs text-muted">{selected.level}%</p>
        </div>
      )}
    </div>
  );
}
