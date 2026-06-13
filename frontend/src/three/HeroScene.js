import React, { Suspense, useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Line } from '@react-three/drei';
import * as THREE from 'three';

// Deterministic node layout — module-scope so reference is stable.
const NODE_POSITIONS = [
  [-3.2, 1.2, 0.4],
  [-1.6, -0.8, -0.6],
  [0.2, 1.8, -0.2],
  [1.8, 0.4, 0.8],
  [3.2, -1.2, -0.4],
  [-2.4, -1.8, 0.6],
  [0.8, -1.6, 0.2],
  [2.4, 1.6, -0.8],
  [-0.6, 0.2, 1.2],
];

const EDGE_DISTANCE = 3.2;

function buildNodes() {
  return NODE_POSITIONS.map((p, idx) => ({
    key: `n-${p.join('_')}`,
    pos: new THREE.Vector3(...p),
    type: idx % 3, // 0 box, 1 octa, 2 ico
    accent: idx % 4 === 0,
  }));
}

function buildEdges(nodes) {
  const lines = [];
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      if (nodes[i].pos.distanceTo(nodes[j].pos) < EDGE_DISTANCE) {
        lines.push({
          key: `e-${nodes[i].key}-${nodes[j].key}`,
          a: nodes[i].pos,
          b: nodes[j].pos,
        });
      }
    }
  }
  return lines;
}

function NodeMesh({ node }) {
  if (node.type === 0) {
    return (
      <mesh>
        <boxGeometry args={[0.42, 0.42, 0.42]} />
        <meshStandardMaterial
          color={node.accent ? '#FF3B30' : '#1a1a1a'}
          emissive={node.accent ? '#FF3B30' : '#000000'}
          emissiveIntensity={node.accent ? 0.6 : 0}
          metalness={0.4}
          roughness={0.35}
        />
      </mesh>
    );
  }
  if (node.type === 1) {
    return (
      <mesh>
        <octahedronGeometry args={[0.34, 0]} />
        <meshStandardMaterial color="#ffffff" metalness={0.2} roughness={0.4} />
      </mesh>
    );
  }
  return (
    <mesh>
      <icosahedronGeometry args={[0.28, 0]} />
      <meshStandardMaterial
        color="#222222"
        metalness={0.6}
        roughness={0.2}
        emissive="#FF3B30"
        emissiveIntensity={node.accent ? 0.35 : 0}
      />
    </mesh>
  );
}

function NodeCluster() {
  const group = useRef();
  const nodes = useMemo(() => buildNodes(), []);
  const edges = useMemo(() => buildEdges(nodes), [nodes]);

  useFrame((state, delta) => {
    if (!group.current) return;
    group.current.rotation.y += delta * 0.06;
    group.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.2) * 0.08;
  });

  return (
    <group ref={group}>
      {edges.map((e) => (
        <Line
          key={e.key}
          points={[e.a, e.b]}
          color="#ffffff"
          transparent
          opacity={0.18}
          lineWidth={1}
        />
      ))}
      {nodes.map((n) => (
        <Float
          key={n.key}
          speed={1.2}
          rotationIntensity={0.6}
          floatIntensity={0.6}
          position={n.pos.toArray()}
        >
          <NodeMesh node={n} />
        </Float>
      ))}
    </group>
  );
}

export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 45 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
      style={{ pointerEvents: 'none' }}
    >
      <color attach="background" args={['#050505']} />
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 6, 4]} intensity={0.7} />
      <pointLight position={[-4, -2, -2]} intensity={0.4} color="#FF3B30" />
      <Suspense fallback={null}>
        <NodeCluster />
      </Suspense>
    </Canvas>
  );
}
