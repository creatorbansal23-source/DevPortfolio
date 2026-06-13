import React, { Suspense, useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, OrbitControls } from '@react-three/drei';

const TECH = [
  'C#', '.NET', 'ASP.NET', 'REST', 'Microservices', 'Azure', 'Functions',
  'Cosmos DB', 'SQL', 'App Services', 'Service Bus', 'App Insights',
  'React', 'TypeScript', 'JavaScript', 'SonarQube', 'xUnit', 'MSTest',
  'Copilot Studio', 'AI Foundry', 'Bot Services', 'Git', 'CI/CD', 'Agile',
];

function fibonacciSphere(n, radius) {
  const points = [];
  const offset = 2 / n;
  const increment = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < n; i++) {
    const y = i * offset - 1 + offset / 2;
    const r = Math.sqrt(1 - y * y);
    const phi = i * increment;
    points.push([Math.cos(phi) * r * radius, y * radius, Math.sin(phi) * r * radius]);
  }
  return points;
}

/**
 * PulsingCore — animated atomic-nucleus centerpiece.
 * Layers: orbital rings → wireframe shell → faceted inner core → pulsing
 * glow → three electrons orbiting on perpendicular planes.
 */
function PulsingCore() {
  const shell = useRef();
  const innerCore = useRef();
  const glow = useRef();
  const halo = useRef();
  const ring1 = useRef();
  const ring2 = useRef();
  const ring3 = useRef();
  const e1 = useRef();
  const e2 = useRef();
  const e3 = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    if (shell.current) {
      shell.current.rotation.x = t * 0.18;
      shell.current.rotation.y = t * 0.12;
    }
    if (innerCore.current) {
      innerCore.current.rotation.x = -t * 0.32;
      innerCore.current.rotation.z = t * 0.45;
    }

    // Glow pulse (sine breathing)
    const pulse = 1 + Math.sin(t * 2.2) * 0.08;
    if (glow.current) glow.current.scale.setScalar(pulse);
    if (halo.current) {
      const h = 1 + Math.sin(t * 1.8 + 0.6) * 0.18;
      halo.current.scale.setScalar(h);
      halo.current.material.opacity = 0.16 + Math.sin(t * 1.8) * 0.06;
    }

    // Rings counter-rotate
    if (ring1.current) ring1.current.rotation.z = t * 0.3;
    if (ring2.current) ring2.current.rotation.x = t * 0.25;
    if (ring3.current) ring3.current.rotation.y = t * -0.4;

    // Three electrons on perpendicular orbital planes
    const rA = 0.78;
    const rB = 0.92;
    const rC = 0.85;
    if (e1.current) {
      e1.current.position.set(Math.cos(t * 1.5) * rA, Math.sin(t * 1.5) * rA, 0);
    }
    if (e2.current) {
      e2.current.position.set(
        Math.cos(t * 1.15 + 2) * rB,
        0,
        Math.sin(t * 1.15 + 2) * rB
      );
    }
    if (e3.current) {
      e3.current.position.set(
        0,
        Math.cos(t * 1.85 + 4) * rC,
        Math.sin(t * 1.85 + 4) * rC
      );
    }
  });

  return (
    <group>
      {/* Orbital rings (thin tori on perpendicular axes) */}
      <mesh ref={ring1}>
        <torusGeometry args={[0.78, 0.004, 8, 96]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.18} />
      </mesh>
      <mesh ref={ring2} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.92, 0.004, 8, 96]} />
        <meshBasicMaterial color="#FF3B30" transparent opacity={0.28} />
      </mesh>
      <mesh ref={ring3} rotation={[0, Math.PI / 2, Math.PI / 4]}>
        <torusGeometry args={[0.85, 0.004, 8, 96]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.14} />
      </mesh>

      {/* Outer wireframe shell — icosphere */}
      <mesh ref={shell}>
        <icosahedronGeometry args={[0.62, 1]} />
        <meshBasicMaterial color="#ffffff" wireframe transparent opacity={0.22} />
      </mesh>

      {/* Faceted inner core */}
      <mesh ref={innerCore}>
        <octahedronGeometry args={[0.32, 0]} />
        <meshStandardMaterial
          color="#0d0d0d"
          metalness={0.9}
          roughness={0.15}
          emissive="#FF3B30"
          emissiveIntensity={0.35}
        />
      </mesh>

      {/* Soft outer halo */}
      <mesh ref={halo}>
        <sphereGeometry args={[0.28, 24, 24]} />
        <meshBasicMaterial color="#FF3B30" transparent opacity={0.18} />
      </mesh>

      {/* Bright glowing center */}
      <mesh ref={glow}>
        <sphereGeometry args={[0.13, 24, 24]} />
        <meshBasicMaterial color="#FF6B61" />
      </mesh>

      {/* Three electrons */}
      <mesh ref={e1}>
        <sphereGeometry args={[0.055, 12, 12]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
      <mesh ref={e2}>
        <sphereGeometry args={[0.05, 12, 12]} />
        <meshBasicMaterial color="#FF3B30" />
      </mesh>
      <mesh ref={e3}>
        <sphereGeometry args={[0.045, 12, 12]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
    </group>
  );
}

/**
 * EnergyLine — a single connector that pulses brightness over time
 * with a per-line phase offset, so the constellation feels alive.
 */
function EnergyLines({ positions }) {
  const matsRef = useRef([]);
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    matsRef.current.forEach((m, i) => {
      if (!m) return;
      m.opacity = 0.05 + (Math.sin(t * 1.2 + i * 0.6) * 0.5 + 0.5) * 0.12;
    });
  });
  return (
    <>
      {positions.map((p, i) => (
        <line key={`l-${TECH[i]}`}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={2}
              array={new Float32Array([0, 0, 0, p[0], p[1], p[2]])}
              itemSize={3}
            />
          </bufferGeometry>
          <lineBasicMaterial
            ref={(el) => (matsRef.current[i] = el)}
            color={i % 5 === 0 ? '#FF3B30' : '#ffffff'}
            transparent
            opacity={0.1}
          />
        </line>
      ))}
    </>
  );
}

function TechNode({ position, label, accent, index }) {
  const dot = useRef();
  useFrame((state) => {
    if (!dot.current) return;
    const s = 1 + Math.sin(state.clock.getElapsedTime() * 1.6 + index * 0.4) * 0.25;
    dot.current.scale.setScalar(s);
  });
  return (
    <group position={position}>
      <mesh ref={dot}>
        <sphereGeometry args={[0.045, 14, 14]} />
        <meshBasicMaterial color={accent ? '#FF3B30' : '#ffffff'} />
      </mesh>
      <Text
        position={[0.18, 0, 0]}
        fontSize={0.16}
        color="#ffffff"
        anchorX="left"
        anchorY="middle"
        outlineWidth={0.005}
        outlineColor="#050505"
      >
        {label}
      </Text>
    </group>
  );
}

function Constellation() {
  const group = useRef();
  const positions = useMemo(() => fibonacciSphere(TECH.length, 2.4), []);

  useFrame((_, delta) => {
    if (group.current) {
      group.current.rotation.y += delta * 0.1;
    }
  });

  return (
    <group ref={group}>
      <EnergyLines positions={positions} />
      {positions.map((p, i) => (
        <TechNode
          key={`g-${TECH[i]}`}
          position={p}
          label={TECH[i]}
          accent={i % 5 === 0}
          index={i}
        />
      ))}
      <PulsingCore />
    </group>
  );
}

export default function SkillsConstellation() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6.5], fov: 45 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
    >
      <color attach="background" args={['#050505']} />
      <ambientLight intensity={0.5} />
      <pointLight position={[4, 4, 4]} intensity={0.6} />
      <pointLight position={[-3, -2, -2]} intensity={0.55} color="#FF3B30" />
      <pointLight position={[0, 0, 0]} intensity={1.2} color="#FF3B30" distance={3} />
      <Suspense fallback={null}>
        <Constellation />
      </Suspense>
      <OrbitControls
        enablePan={false}
        enableZoom={false}
        enableRotate={true}
        autoRotate={false}
        minPolarAngle={Math.PI / 2.6}
        maxPolarAngle={Math.PI / 1.6}
      />
    </Canvas>
  );
}
