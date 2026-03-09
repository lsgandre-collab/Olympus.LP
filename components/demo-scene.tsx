"use client";

import React, { useRef, useState, useMemo, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useTexture, Line, Html } from "@react-three/drei";
import * as THREE from "three";
import { Brain, Shield, Megaphone, Package, LayoutGrid, Boxes, Truck, Wallet, BarChart3, MessageCircle } from "lucide-react";

const DASHBOARD_URL = "/images/dashboard-screenshot.png";

/* Dashboard: central, larger, fixed position, constant glow (no rotation) */
function DashboardPlane() {
  const texture = useTexture(DASHBOARD_URL);
  texture.wrapS = texture.wrapT = THREE.ClampToEdgeWrapping;
  const size = 14; // larger: 14 x 8.4
  const h = (8.4 / 10) * size;
  return (
    <group position={[0, 0, -2]}>
      <mesh position={[0, 0, 0]}>
        <planeGeometry args={[size, h]} />
        <meshBasicMaterial map={texture} toneMapped={false} />
      </mesh>
      <mesh position={[0, 0, 0.02]}>
        <planeGeometry args={[size, h]} />
        <meshBasicMaterial
          color="#eab308"
          transparent
          opacity={0.25}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
}

function PulsingLine({ start, end, color = "#eab308" }: { start: [number, number, number]; end: [number, number, number]; color?: string }) {
  const points = useMemo(() => [new THREE.Vector3(...start), new THREE.Vector3(...end)], [start, end]);
  const lineRef = useRef<any>(null);
  useFrame((state) => {
    const mesh = lineRef.current;
    if (mesh?.material && "opacity" in mesh.material) {
      (mesh.material as { opacity: number }).opacity = 0.7 + 0.35 * Math.sin(state.clock.elapsedTime * 2);
    }
  });
  return (
    <Line ref={lineRef} points={points} color={color} lineWidth={1.5} transparent />
  );
}

const AGENT_CONFIG: { code: string; teaserPt: string; teaserEn: string; color: string; group: string; basePos: [number, number, number]; orbitRadius: number; phase: number; Icon: React.ComponentType<{ className?: string }> }[] = [
  { code: "APO", teaserPt: "Analisa milhares de SKUs em tempo real", teaserEn: "Analyzes thousands of SKUs in real time", color: "#8b5cf6", group: "Intel Sup", basePos: [-3.2, 0.8, 2.5], orbitRadius: 0.5, phase: 0, Icon: Brain },
  { code: "ART", teaserPt: "Protege margens e otimiza preços", teaserEn: "Protects margins and optimizes prices", color: "#22c55e", group: "Intel Sup", basePos: [-2.2, 0.8, 2.5], orbitRadius: 0.5, phase: 2, Icon: Shield },
  { code: "ARE", teaserPt: "Controla campanhas de publicidade", teaserEn: "Controls advertising campaigns", color: "#eab308", group: "Mkt Sup", basePos: [2.5, 0.8, 2.5], orbitRadius: 0.45, phase: 1, Icon: Megaphone },
  { code: "HER", teaserPt: "Gerencia fornecedores e estoque", teaserEn: "Manages suppliers and inventory", color: "#3b82f6", group: "Ops Sup", basePos: [-3.2, 0.8, -2], orbitRadius: 0.5, phase: 0, Icon: Package },
  { code: "HEF", teaserPt: "Especialista em listings e catálogo", teaserEn: "Listings and catalog specialist", color: "#f97316", group: "Ops Sup", basePos: [-2.4, 0.8, -2], orbitRadius: 0.5, phase: 1.5, Icon: LayoutGrid },
  { code: "DEM", teaserPt: "Controla inventário e reposição", teaserEn: "Controls inventory and replenishment", color: "#14b8a6", group: "Ops Sup", basePos: [-1.6, 0.8, -2], orbitRadius: 0.5, phase: 3, Icon: Boxes },
  { code: "ATE", teaserPt: "Coordena logística e entregas", teaserEn: "Coordinates logistics and delivery", color: "#ec4899", group: "Ops Sup", basePos: [-0.8, 0.8, -2], orbitRadius: 0.5, phase: 4, Icon: Truck },
  { code: "PLU", teaserPt: "Controlador financeiro e margens", teaserEn: "Financial controller and margins", color: "#d4af77", group: "Fin Sup", basePos: [2, 0.8, -2], orbitRadius: 0.5, phase: 2, Icon: Wallet },
  { code: "CAL", teaserPt: "Analisa dados e gera relatórios", teaserEn: "Analyzes data and generates reports", color: "#a855f7", group: "Fin Sup", basePos: [3, 0.8, -2], orbitRadius: 0.5, phase: 5, Icon: BarChart3 },
];

const ATLAS_POS: [number, number, number] = [0, 3.5, 0];
const GROUP_POSITIONS: Record<string, [number, number, number]> = {
  "Intel Sup": [-2.7, 2, 2.5],
  "Mkt Sup": [2.5, 2, 2.5],
  "Ops Sup": [-2, 2, -2],
  "Fin Sup": [2.5, 2, -2],
};

function AgentNode({
  code,
  teaserPt,
  teaserEn,
  color,
  basePos,
  orbitRadius,
  phase,
  lang,
  Icon,
}: {
  code: string;
  teaserPt: string;
  teaserEn: string;
  color: string;
  basePos: [number, number, number];
  orbitRadius: number;
  phase: number;
  lang: "pt" | "en";
  Icon: React.ComponentType<{ className?: string }>;
}) {
  const [hovered, setHovered] = useState(false);
  const groupRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (groupRef.current) {
      const t = state.clock.elapsedTime * 0.35 + phase;
      groupRef.current.position.x = basePos[0] + Math.cos(t) * orbitRadius;
      groupRef.current.position.y = basePos[1];
      groupRef.current.position.z = basePos[2] + Math.sin(t) * orbitRadius;
    }
    if (meshRef.current && hovered) meshRef.current.scale.lerp(new THREE.Vector3(1.2, 1.2, 1.2), 0.1);
    else if (meshRef.current) meshRef.current.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1);
  });
  return (
    <group ref={groupRef}>
      <mesh
        ref={meshRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <sphereGeometry args={[0.35, 24, 24]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.6}
        />
      </mesh>
      {hovered && (
        <Html position={[0, 0.6, 0]} center distanceFactor={8}>
          <div className="demo-tooltip demo-tooltip-with-icon">
            <Icon className="demo-tooltip-icon-svg" aria-hidden />
            <span>{lang === "pt" ? teaserPt : teaserEn}</span>
          </div>
        </Html>
      )}
    </group>
  );
}

function AtlasNode({ lang }: { lang: "pt" | "en" }) {
  const [hovered, setHovered] = useState(false);
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (meshRef.current) meshRef.current.rotation.y += delta * 0.3;
  });
  const text = lang === "pt"
    ? "Orquestrador central — pode conversar com você por texto, voz, WhatsApp ou Telegram"
    : "Central orchestrator — can chat with you via text, voice, WhatsApp or Telegram";
  return (
    <group position={ATLAS_POS}>
      <mesh
        ref={meshRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <sphereGeometry args={[0.7, 32, 32]} />
        <meshStandardMaterial
          color="#d4af77"
          emissive="#b45309"
          emissiveIntensity={0.8}
        />
      </mesh>
      {hovered && (
        <Html position={[0, 1.2, 0]} center distanceFactor={8}>
          <div className="demo-tooltip demo-tooltip-atlas demo-tooltip-with-icon">
            <MessageCircle className="demo-tooltip-icon-svg" aria-hidden />
            <span>{text}</span>
          </div>
        </Html>
      )}
    </group>
  );
}

function DemoSceneInner({ lang }: { lang: "pt" | "en" }) {
  const groupRef = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (groupRef.current) {
      const x = state.pointer.x * 0.3;
      const y = state.pointer.y * 0.3;
      groupRef.current.rotation.y += (x - groupRef.current.rotation.y) * 0.05;
      groupRef.current.rotation.x += (-y - groupRef.current.rotation.x) * 0.05;
    }
  });
  const lineColor = "#eab308";
  const lines = useMemo(() => {
    const l: Array<{ start: [number, number, number]; end: [number, number, number] }> = [];
    l.push({ start: ATLAS_POS, end: GROUP_POSITIONS["Intel Sup"] });
    l.push({ start: ATLAS_POS, end: GROUP_POSITIONS["Mkt Sup"] });
    l.push({ start: ATLAS_POS, end: GROUP_POSITIONS["Ops Sup"] });
    l.push({ start: ATLAS_POS, end: GROUP_POSITIONS["Fin Sup"] });
    AGENT_CONFIG.forEach((a) => {
      const gp = GROUP_POSITIONS[a.group];
      if (gp) l.push({ start: gp, end: a.basePos });
    });
    return l;
  }, []);

  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 5, 5]} intensity={1} />
      <pointLight position={[-5, 3, -5]} intensity={0.5} color="#eab308" />
      <Suspense fallback={null}>
        <DashboardPlane />
      </Suspense>
      <group ref={groupRef}>
        {lines.map((line, i) => (
          <PulsingLine key={i} start={line.start} end={line.end} color={lineColor} />
        ))}
        <AtlasNode lang={lang} />
        {AGENT_CONFIG.map((a) => (
          <AgentNode
            key={a.code}
            code={a.code}
            teaserPt={a.teaserPt}
            teaserEn={a.teaserEn}
            color={a.color}
            basePos={a.basePos}
            orbitRadius={a.orbitRadius}
            phase={a.phase}
            lang={lang}
            Icon={a.Icon}
          />
        ))}
      </group>
    </>
  );
}

export function DemoScene({ lang }: { lang: "pt" | "en" }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 12], fov: 50 }}
      gl={{ alpha: true, antialias: true }}
      dpr={[1, 2]}
      className="w-full h-full min-h-[480px] rounded-2xl"
    >
      <DemoSceneInner lang={lang} />
    </Canvas>
  );
}
