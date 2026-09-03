import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function NetworkScene() {
  const groupRef = useRef<THREE.Group>(null);
  const particleRef = useRef<THREE.Points>(null);

  const nodes = useMemo(() => {
    return [
      { pos: [-3, 1.5, 0] as [number, number, number], color: '#E8E2D8', label: 'GMAIL' },
      { pos: [-1, 0, -2] as [number, number, number], color: '#B51F25', label: 'GEMINI' },
      { pos: [1, 0, -2] as [number, number, number], color: '#77716A', label: 'CLASSIFY' },
      { pos: [2, 1, -4] as [number, number, number], color: '#77716A', label: 'SUMMARIZE' },
      { pos: [3, -0.5, -6] as [number, number, number], color: '#B51F25', label: 'TELEGRAM' },
    ];
  }, []);

  const particlePos = useMemo(() => {
    const positions: number[] = [];
    for (let i = 0; i < 300; i++) {
      const t = i / 300;
      const segIdx = Math.floor(t * (nodes.length - 1));
      const localT = (t * (nodes.length - 1)) % 1;
      const p1 = nodes[segIdx].pos;
      const p2 = nodes[Math.min(segIdx + 1, nodes.length - 1)].pos;
      positions.push(
        THREE.MathUtils.lerp(p1[0], p2[0], localT) + (Math.random() - 0.5) * 0.2,
        THREE.MathUtils.lerp(p1[1], p2[1], localT) + (Math.random() - 0.5) * 0.2,
        THREE.MathUtils.lerp(p1[2], p2[2], localT) + (Math.random() - 0.5) * 0.2
      );
    }
    return new Float32Array(positions);
  }, [nodes]);

  const particleGeo = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(particlePos, 3));
    return geo;
  }, [particlePos]);

  const particleMat = useMemo(() => {
    return new THREE.PointsMaterial({
      color: '#B51F25',
      size: 0.05,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.2;
    }
  });

  return (
    <group ref={groupRef}>
      {nodes.map((node, i) => (
        <mesh key={i} position={node.pos}>
          <sphereGeometry args={[0.3, 16, 16]} />
          <meshBasicMaterial color={node.color} transparent opacity={0.5} />
        </mesh>
      ))}
      {nodes.slice(0, -1).map((node, i) => {
        const next = nodes[i + 1];
        return (
          <line key={`l-${i}`}>
            <bufferGeometry>
              <bufferAttribute
                attach="attributes-position"
                args={[new Float32Array([...node.pos, ...next.pos]), 3]}
              />
            </bufferGeometry>
            <lineBasicMaterial color="#3a1a1a" transparent opacity={0.3} />
          </line>
        );
      })}
      <points ref={particleRef} geometry={particleGeo} material={particleMat} />
    </group>
  );
}
