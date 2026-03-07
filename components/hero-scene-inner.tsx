"use client";

import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function CEOOrb() {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame(() => {
    if (meshRef.current) meshRef.current.rotation.y += 0.004;
  });
  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[5, 64, 64]} />
      <meshPhongMaterial
        color="#d4af77"
        emissive="#b45309"
        shininess={100}
      />
    </mesh>
  );
}

function AgentOrb({
  color,
  angle,
  radius,
}: {
  color: number;
  angle: number;
  radius: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame(() => {
    if (!meshRef.current) return;
    const t = Date.now() * 0.0004;
    const a = angle + t * 1.2;
    meshRef.current.position.x = Math.cos(a) * radius;
    meshRef.current.position.z = Math.sin(a) * radius * 0.8;
    meshRef.current.position.y = Math.sin(a * 2) * 8;
  });
  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[2, 32, 32]} />
      <meshPhongMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.8}
      />
    </mesh>
  );
}

const AGENT_COLORS = [
  0x6366f1, 0x22c55e, 0x3b82f6, 0xf59e0b, 0xec4899, 0x8b5cf6, 0x14b8a6, 0xf97316, 0xa855f7, 0xeab308,
];

export function HeroSceneInner() {
  return (
    <Canvas
      camera={{ position: [0, 0, 45], fov: 50 }}
      gl={{ alpha: true, antialias: true }}
      dpr={[1, 2]}
      className="w-full h-full"
    >
      <ambientLight intensity={0.3} />
      <pointLight position={[0, 20, 30]} intensity={1.5} distance={100} />
      <CEOOrb />
      {AGENT_COLORS.map((color, i) => (
        <AgentOrb
          key={i}
          color={color}
          angle={(i * Math.PI * 2) / AGENT_COLORS.length}
          radius={20}
        />
      ))}
    </Canvas>
  );
}
