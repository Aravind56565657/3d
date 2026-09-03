import { useMemo } from 'react';
import * as THREE from 'three';

export function ToriiGate({
  position = [0, 0, -8],
  scale = 1,
  color = '#1a0a0a',
}: {
  position?: [number, number, number];
  scale?: number;
  color?: string;
}) {
  const material = useMemo(() => {
    return new THREE.MeshBasicMaterial({
      color: new THREE.Color(color),
      transparent: true,
      opacity: 0.85,
      fog: true,
    });
  }, [color]);

  const beamHeight = 0.4;
  const pillarHeight = 6;
  const pillarWidth = 0.4;
  const width = 5;

  return (
    <group position={position} scale={scale}>
      {/* Left pillar */}
      <mesh position={[-width / 2, pillarHeight / 2, 0]} material={material}>
        <boxGeometry args={[pillarWidth, pillarHeight, pillarWidth]} />
      </mesh>
      {/* Right pillar */}
      <mesh position={[width / 2, pillarHeight / 2, 0]} material={material}>
        <boxGeometry args={[pillarWidth, pillarHeight, pillarWidth]} />
      </mesh>
      {/* Top beam (kasagi) */}
      <mesh position={[0, pillarHeight + beamHeight, 0]} material={material}>
        <boxGeometry args={[width + 1.5, beamHeight, 0.5]} />
      </mesh>
      {/* Second beam (nuki) */}
      <mesh position={[0, pillarHeight - 0.5, 0]} material={material}>
        <boxGeometry args={[width + 0.3, beamHeight * 0.7, 0.4]} />
      </mesh>
      {/* Center small pillar */}
      <mesh position={[0, pillarHeight + 0.3, 0]} material={material}>
        <boxGeometry args={[0.3, 1, 0.3]} />
      </mesh>
    </group>
  );
}
