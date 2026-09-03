import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function DeploymentScene() {
  const groupRef = useRef<THREE.Group>(null);
  const flowRef = useRef<THREE.Points>(null);

  const nodePositions = useMemo(() => {
    return [
      { pos: [0, 2, 0] as [number, number, number], label: 'APP', color: '#E8E2D8' },
      { pos: [0, 0.5, -2] as [number, number, number], label: 'AI', color: '#B51F25' },
      { pos: [-1.5, -1, -4] as [number, number, number], label: 'CONFIG', color: '#77716A' },
      { pos: [1.5, -1, -4] as [number, number, number], label: 'INFRA', color: '#77716A' },
      { pos: [0, -2.5, -6] as [number, number, number], label: 'DEPLOY', color: '#B51F25' },
    ];
  }, []);

  const flowPositions = useMemo(() => {
    const positions: number[] = [];
    for (let i = 0; i < 500; i++) {
      const t = i / 500;
      const nodeIdx = Math.floor(t * (nodePositions.length - 1));
      const nextIdx = Math.min(nodeIdx + 1, nodePositions.length - 1);
      const localT = (t * (nodePositions.length - 1)) % 1;
      const p1 = nodePositions[nodeIdx].pos;
      const p2 = nodePositions[nextIdx].pos;
      positions.push(
        THREE.MathUtils.lerp(p1[0], p2[0], localT) + (Math.random() - 0.5) * 0.3,
        THREE.MathUtils.lerp(p1[1], p2[1], localT) + (Math.random() - 0.5) * 0.3,
        THREE.MathUtils.lerp(p1[2], p2[2], localT) + (Math.random() - 0.5) * 0.3
      );
    }
    return new Float32Array(positions);
  }, [nodePositions]);

  const flowGeo = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(flowPositions, 3));
    return geo;
  }, [flowPositions]);

  const flowMat = useMemo(() => {
    return new THREE.PointsMaterial({
      color: '#B51F25',
      size: 0.06,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
  }, []);

  const nodeMat = useMemo(() => new THREE.MeshBasicMaterial({ color: '#1a1a1a', fog: true, transparent: true, opacity: 0.8 }), []);
  const activeMat = useMemo(() => new THREE.MeshBasicMaterial({ color: '#B51F25', fog: true, transparent: true, opacity: 0.6 }), []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.15) * 0.3;
    }
    if (flowRef.current) {
      const pos = flowRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < pos.length; i += 3) {
        pos[i + 1] += Math.sin(state.clock.elapsedTime + i) * 0.002;
      }
      flowRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Nodes */}
      {nodePositions.map((node, i) => (
        <mesh key={i} position={node.pos} material={i === 1 || i === 4 ? activeMat : nodeMat}>
          <boxGeometry args={[0.5, 0.5, 0.5]} />
        </mesh>
      ))}
      {/* Connections */}
      {nodePositions.slice(0, -1).map((node, i) => {
        const next = nodePositions[i + 1];
        return (
          <line key={`line-${i}`}>
            <bufferGeometry>
              <bufferAttribute
                attach="attributes-position"
                args={[new Float32Array([...node.pos, ...next.pos]), 3]}
              />
            </bufferGeometry>
            <lineBasicMaterial color="#3a1a1a" transparent opacity={0.4} />
          </line>
        );
      })}
      {/* Data flow particles */}
      <points ref={flowRef} geometry={flowGeo} material={flowMat} />
    </group>
  );
}
