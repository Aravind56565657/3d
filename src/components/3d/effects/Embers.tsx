import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface EmbersProps {
  count?: number;
  area?: number;
  scrollRef?: React.MutableRefObject<number>;
  velocityRef?: React.MutableRefObject<number>;
}

export function Embers({ count = 150, area = 30, scrollRef, velocityRef }: EmbersProps) {
  const pointsRef = useRef<THREE.Points>(null);

  const { positions, velocities, lifetimes } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);
    const lifetimes = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * area;
      positions[i * 3 + 1] = Math.random() * area - area / 2;
      positions[i * 3 + 2] = (Math.random() - 0.5) * area;

      velocities[i * 3] = (Math.random() - 0.5) * 0.01;
      velocities[i * 3 + 1] = Math.random() * 0.04 + 0.01;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.01;

      lifetimes[i] = Math.random();
    }

    return { positions, velocities, lifetimes };
  }, [count, area]);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geo;
  }, [positions]);

  const material = useMemo(() => {
    return new THREE.PointsMaterial({
      color: new THREE.Color('#FF4422'),
      size: 0.15,
      transparent: true,
      opacity: 0.8,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
    });
  }, []);

  useFrame((_, delta) => {
    if (!pointsRef.current) return;
    const pos = pointsRef.current.geometry.attributes.position.array as Float32Array;
    const speedMul = velocityRef ? 1 + velocityRef.current * 5 : 1;

    for (let i = 0; i < count; i++) {
      pos[i * 3] += velocities[i * 3] * speedMul * delta * 60;
      pos[i * 3 + 1] += velocities[i * 3 + 1] * speedMul * delta * 60;
      pos[i * 3 + 2] += velocities[i * 3 + 2] * speedMul * delta * 60;

      lifetimes[i] += delta * 0.3;
      if (pos[i * 3 + 1] > area / 2 || lifetimes[i] > 1) {
        pos[i * 3] = (Math.random() - 0.5) * area;
        pos[i * 3 + 1] = -area / 2;
        pos[i * 3 + 2] = (Math.random() - 0.5) * area;
        lifetimes[i] = 0;
      }
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={pointsRef} geometry={geometry} material={material} frustumCulled={false} />
  );
}
