import React, { Suspense, useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Line, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

/**
 * HeroScene — A loose "microservices" cluster of geometric nodes
 * connected by hairline edges. Slow drift + slight mouse parallax via
 * group rotation. Pure decoration; no pointer events to keep scroll smooth.
 */
function NodeCluster() {
  const group = useRef();

  // Deterministic node positions (no random churn on re-render)
  const nodes = useMemo(() => {
    const positions = [
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
    return positions.map((p, i) => ({
      pos: new THREE.Vector3(...p),
      type: i % 3, // 0 box, 1 octa, 2 sphere
      accent: i % 4 === 0,
    }));
  }, []);

  const edges = useMemo(() => {
    // Connect nearby nodes only — gives an organic mesh look
    const lines = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const d = nodes[i].pos.distanceTo(nodes[j].pos);
        if (d < 3.2) lines.push([nodes[i].pos, nodes[j].pos]);
      }
    }
    return lines;
  }, [nodes]);

  useFrame((state, delta) => {
    if (!group.current) return;
    group.current.rotation.y += delta * 0.06;
    const t = state.clock.getElapsedTime();
    group.current.rotation.x = Math.sin(t * 0.2) * 0.08;
  });

  return (
    <group ref={group}>
      {edges.map((e, i) => (
        <Line
          key={`e-${i}`}
          points={[e[0], e[1]]}
          color="#ffffff"
          transparent
          opacity={0.18}
          lineWidth={1}
        />
      ))}
      {nodes.map((n, i) => (
        <Float
          key={`n-${i}`}
          speed={1.2}
          rotationIntensity={0.6}
          floatIntensity={0.6}
          position={n.pos.toArray()}
        >
          {n.type === 0 && (
            <mesh>
              <boxGeometry args={[0.42, 0.42, 0.42]} />
              <meshStandardMaterial
                color={n.accent ? '#FF3B30' : '#1a1a1a'}
                emissive={n.accent ? '#FF3B30' : '#000000'}
                emissiveIntensity={n.accent ? 0.6 : 0}
                metalness={0.4}
                roughness={0.35}
              />
            </mesh>
          )}
          {n.type === 1 && (
            <mesh>
              <octahedronGeometry args={[0.34, 0]} />
              <meshStandardMaterial
                color="#ffffff"
                metalness={0.2}
                roughness={0.4}
                wireframe={false}
              />
            </mesh>
          )}
          {n.type === 2 && (
            <mesh>
              <icosahedronGeometry args={[0.28, 0]} />
              <meshStandardMaterial
                color="#222222"
                metalness={0.6}
                roughness={0.2}
                emissive="#FF3B30"
                emissiveIntensity={n.accent ? 0.35 : 0}
              />
            </mesh>
          )}
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
