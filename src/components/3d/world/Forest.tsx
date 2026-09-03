import { useMemo } from 'react';
import * as THREE from 'three';

export function Forest({
  count = 30,
  area = 40,
  zSpread = -15,
}: {
  count?: number;
  area?: number;
  zSpread?: number;
}) {
  const trees = useMemo(() => {
    return Array.from({ length: count }, () => ({
      x: (Math.random() - 0.5) * area,
      z: zSpread + (Math.random() - 0.5) * area,
      h: Math.random() * 6 + 4,
      w: Math.random() * 0.3 + 0.2,
    }));
  }, [count, area, zSpread]);

  const trunkMat = useMemo(() => new THREE.MeshBasicMaterial({ color: '#080808', fog: true, transparent: true, opacity: 0.85 }), []);
  const leafMat = useMemo(() => new THREE.MeshBasicMaterial({ color: '#0a0a0a', fog: true, transparent: true, opacity: 0.7 }), []);

  return (
    <group>
      {trees.map((t, i) => (
        <group key={i} position={[t.x, 0, t.z]}>
          <mesh position={[0, t.h / 2, 0]} material={trunkMat}>
            <cylinderGeometry args={[t.w * 0.5, t.w, t.h, 6]} />
          </mesh>
          <mesh position={[0, t.h + 1, 0]} material={leafMat}>
            <coneGeometry args={[t.w * 3, t.h * 0.6, 6]} />
          </mesh>
        </group>
      ))}
    </group>
  );
}
