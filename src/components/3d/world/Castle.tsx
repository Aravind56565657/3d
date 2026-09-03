import { useMemo } from 'react';
import * as THREE from 'three';

export function Castle() {
  const material = useMemo(() => {
    return new THREE.MeshBasicMaterial({
      color: new THREE.Color('#0a0a0a'),
      transparent: true,
      opacity: 0.7,
      fog: true,
    });
  }, []);

  return (
    <group position={[8, 0, -22]}>
      {/* Base */}
      <mesh position={[0, 2, 0]} material={material}>
        <boxGeometry args={[6, 4, 4]} />
      </mesh>
      {/* Second tier */}
      <mesh position={[0, 5, 0]} material={material}>
        <boxGeometry args={[4.5, 2, 3]} />
      </mesh>
      {/* Third tier */}
      <mesh position={[0, 7.5, 0]} material={material}>
        <boxGeometry args={[3, 2, 2.5]} />
      </mesh>
      {/* Roof spire */}
      <mesh position={[0, 9.5, 0]} material={material}>
        <coneGeometry args={[1, 1.5, 4]} />
      </mesh>
    </group>
  );
}
