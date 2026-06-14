import React, { Suspense, useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, OrbitControls, Billboard } from '@react-three/drei';
import * as THREE from 'three';

const TECH = [
  { name: 'C#', tier: 1 },
  { name: '.NET Core', tier: 1 },
  { name: 'ASP.NET', tier: 1 },
  { name: 'REST APIs', tier: 1 },
  { name: 'Azure', tier: 1 },
  { name: 'Cosmos DB', tier: 2 },
  { name: 'SQL Server', tier: 2 },
  { name: 'Microservices', tier: 2 },
  { name: 'Functions', tier: 2 },
  { name: 'Service Bus', tier: 2 },
  { name: 'App Insights', tier: 2 },
  { name: 'SonarQube', tier: 2 },
  { name: 'xUnit', tier: 3 },
  { name: 'React', tier: 3 },
  { name: 'TypeScript', tier: 3 },
  { name: 'CI/CD', tier: 3 },
  { name: 'Git', tier: 3 },
  { name: 'Copilot Studio', tier: 3 },
  { name: 'AI Foundry', tier: 3 },
  { name: 'Bot Services', tier: 3 },
];

/* Distribute points evenly on a sphere using Fibonacci spiral */
function fibSphere(count, radius) {
  const points = [];
  const goldenAngle = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = goldenAngle * i;
    points.push([
      Math.cos(theta) * r * radius,
      y * radius,
      Math.sin(theta) * r * radius,
    ]);
  }
  return points;
}

/* Build edges between nodes that are close enough */
function buildEdges(positions, threshold) {
  const edges = [];
  for (let i = 0; i < positions.length; i++) {
    for (let j = i + 1; j < positions.length; j++) {
      const dx = positions[i][0] - positions[j][0];
      const dy = positions[i][1] - positions[j][1];
      const dz = positions[i][2] - positions[j][2];
      const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
      if (dist < threshold) {
        edges.push([positions[i], positions[j], dist]);
      }
    }
  }
  return edges;
}

/* Pulsing center sphere */
function CoreGlow() {
  const ref = useRef();
  const haloRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (ref.current) {
      const s = 0.28 + Math.sin(t * 1.8) * 0.04;
      ref.current.scale.setScalar(s);
    }
    if (haloRef.current) {
      const s = 0.6 + Math.sin(t * 1.2) * 0.1;
      haloRef.current.scale.setScalar(s);
      haloRef.current.material.opacity = 0.06 + Math.sin(t * 2) * 0.03;
    }
  });

  return (
    <group>
      {/* Inner bright core */}
      <mesh ref={ref}>
        <sphereGeometry args={[1, 24, 24]} />
        <meshBasicMaterial color="#FF3B30" transparent opacity={0.9} />
      </mesh>
      {/* Outer halo */}
      <mesh ref={haloRef}>
        <sphereGeometry args={[1, 24, 24]} />
        <meshBasicMaterial color="#FF3B30" transparent opacity={0.06} />
      </mesh>
    </group>
  );
}

/* A single skill node — small sphere + billboard label */
function SkillNode({ position, name, tier, index }) {
  const groupRef = useRef();
  const dotRef = useRef();

  const isCore = tier === 1;
  const color = isCore ? '#FF3B30' : '#ffffff';
  const dotSize = isCore ? 0.06 : 0.04;

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (dotRef.current) {
      const pulse = 1 + Math.sin(t * 2.5 + index * 0.7) * 0.25;
      dotRef.current.scale.setScalar(pulse);
    }
  });

  return (
    <group ref={groupRef} position={position}>
      {/* Glowing dot */}
      <mesh ref={dotRef}>
        <sphereGeometry args={[dotSize, 12, 12]} />
        <meshBasicMaterial color={color} />
      </mesh>

      {/* Outer glow ring */}
      {isCore && (
        <mesh>
          <sphereGeometry args={[0.1, 12, 12]} />
          <meshBasicMaterial color="#FF3B30" transparent opacity={0.12} />
        </mesh>
      )}

      {/* Label — always faces camera */}
      <Billboard follow lockX={false} lockY={false} lockZ={false}>
        <Text
          position={[0, dotSize + 0.14, 0]}
          fontSize={isCore ? 0.16 : 0.12}
          color={isCore ? '#FF3B30' : 'rgba(255,255,255,0.75)'}
          anchorX="center"
          anchorY="bottom"
          outlineWidth={0.008}
          outlineColor="#000000"
        >
          {name}
        </Text>
      </Billboard>
    </group>
  );
}

/* Network edges rendered as a single LineSegments for performance */
function NetworkEdges({ edges }) {
  const geom = useMemo(() => {
    const pts = [];
    const colors = [];
    const accent = new THREE.Color('#FF3B30');
    const white = new THREE.Color('#ffffff');

    edges.forEach(([a, b, dist]) => {
      pts.push(a[0], a[1], a[2], b[0], b[1], b[2]);
      // Closer edges are brighter
      const alpha = 1 - dist / 2.8;
      const c = alpha > 0.5 ? accent.clone().lerp(white, 0.3) : white;
      colors.push(c.r, c.g, c.b, c.r, c.g, c.b);
    });

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(pts, 3));
    geo.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
    return geo;
  }, [edges]);

  return (
    <lineSegments geometry={geom}>
      <lineBasicMaterial vertexColors transparent opacity={0.1} />
    </lineSegments>
  );
}

/* Main constellation group that auto-rotates */
function Constellation({ techList }) {
  const groupRef = useRef();
  const positions = useMemo(() => fibSphere(techList.length, 2.4), [techList]);
  const edges = useMemo(() => buildEdges(positions, 2.8), [positions]);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.06;
    }
  });

  return (
    <group ref={groupRef}>
      <CoreGlow />
      <NetworkEdges edges={edges} />

      {/* Connector lines from core to each node */}
      {positions.map((pos, i) => {
        const isCore = techList[i] && techList[i].tier === 1;
        return (
          <line key={`core-line-${i}`}>
            <bufferGeometry>
              <bufferAttribute
                attach="attributes-position"
                count={2}
                array={new Float32Array([0, 0, 0, ...pos])}
                itemSize={3}
              />
            </bufferGeometry>
            <lineBasicMaterial
              color={isCore ? '#FF3B30' : '#ffffff'}
              transparent
              opacity={isCore ? 0.12 : 0.04}
            />
          </line>
        );
      })}

      {/* Skill nodes */}
      {techList.map((tech, i) => (
        <SkillNode
          key={tech.name}
          position={positions[i]}
          name={tech.name}
          tier={tech.tier}
          index={i}
        />
      ))}
    </group>
  );
}

/* Floating particle field in background */
function ParticleField({ count = 120 }) {
  const pointsRef = useRef();

  const [positions] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const r = 2.8 + Math.random() * 2.5;

      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
    }
    return [pos];
  }, [count]);

  useFrame((state, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.015;
      pointsRef.current.rotation.x -= delta * 0.005;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#ffffff"
        size={0.03}
        sizeAttenuation={true}
        transparent
        opacity={0.2}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

export default function SkillsConstellation({ skills }) {
  const techList = useMemo(() => {
    if (!skills || skills.length === 0) return TECH;
    const list = [];
    skills.forEach((group, groupIdx) => {
      const tier = groupIdx === 0 ? 1 : groupIdx === 1 ? 2 : 3;
      group.items.forEach((item) => {
        list.push({ name: item, tier });
      });
    });
    return list;
  }, [skills]);

  return (
    <Canvas
      camera={{ position: [0, 0, 6.5], fov: 45 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
      style={{ background: 'transparent' }}
    >
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 5, 5]} intensity={0.3} />
      <pointLight position={[0, 0, 0]} intensity={0.8} color="#FF3B30" distance={4} />

      <Suspense fallback={null}>
        <Constellation techList={techList} />
        <ParticleField />
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

