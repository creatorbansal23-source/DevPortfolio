import React, { Suspense, useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, OrbitControls } from '@react-three/drei';

/**
 * SkillsConstellation — A rotating spherical cloud where each point is a
 * tech-stack label. Slow drift + user can drag horizontally to rotate.
 */
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
    const x = Math.cos(phi) * r;
    const z = Math.sin(phi) * r;
    points.push([x * radius, y * radius, z * radius]);
  }
  return points;
}

function Constellation() {
  const group = useRef();
  const positions = useMemo(() => fibonacciSphere(TECH.length, 2.4), []);

  useFrame((_, delta) => {
    if (group.current) {
      group.current.rotation.y += delta * 0.12;
    }
  });

  return (
    <group ref={group}>
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
          <lineBasicMaterial color="#ffffff" transparent opacity={0.04} />
        </line>
      ))}
      {positions.map((p, i) => (
        <group key={`g-${TECH[i]}`} position={p}>
          <mesh>
            <sphereGeometry args={[0.04, 12, 12]} />
            <meshBasicMaterial color={i % 5 === 0 ? '#FF3B30' : '#ffffff'} />
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
            {TECH[i]}
          </Text>
        </group>
      ))}
      {/* core node */}
      <mesh>
        <icosahedronGeometry args={[0.35, 1]} />
        <meshStandardMaterial
          color="#0a0a0a"
          emissive="#FF3B30"
          emissiveIntensity={0.6}
          metalness={0.5}
          roughness={0.3}
        />
      </mesh>
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
      <pointLight position={[-3, -2, -2]} intensity={0.4} color="#FF3B30" />
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
