import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface RainProps {
  count?: number;
  area?: number;
  scrollRef?: React.MutableRefObject<number>;
  velocityRef?: React.MutableRefObject<number>;
}

export function Rain({ count = 2000, area = 50, velocityRef }: RainProps) {
  const pointsRef = useRef<THREE.Points>(null);

  const { positions, velocities } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * area;
      positions[i * 3 + 1] = Math.random() * area;
      positions[i * 3 + 2] = (Math.random() - 0.5) * area;

      velocities[i] = Math.random() * 0.5 + 0.3;
    }

    return { positions, velocities };
  }, [count, area]);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geo;
  }, [positions]);

  const material = useMemo(() => {
    return new THREE.PointsMaterial({
      color: new THREE.Color('#77716A'),
      size: 0.05,
      transparent: true,
      opacity: 0.4,
      depthWrite: false,
      sizeAttenuation: true,
    });
  }, []);

  useFrame((_, delta) => {
    if (!pointsRef.current) return;
    const pos = pointsRef.current.geometry.attributes.position.array as Float32Array;
    const speedMul = velocityRef ? 1 + velocityRef.current * 4 : 1;

    for (let i = 0; i < count; i++) {
      pos[i * 3 + 1] -= velocities[i] * speedMul * delta * 60;

      if (pos[i * 3 + 1] < -area / 2) {
        pos[i * 3 + 1] = area / 2;
        pos[i * 3] = (Math.random() - 0.5) * area;
        pos[i * 3 + 2] = (Math.random() - 0.5) * area;
      }
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={pointsRef} geometry={geometry} material={material} frustumCulled={false} />
  );
}
