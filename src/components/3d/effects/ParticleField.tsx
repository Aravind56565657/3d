import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ParticleFieldProps {
  count?: number;
  spread?: number;
  size?: number;
  color?: string;
  opacity?: number;
  speed?: number;
  scrollRef?: React.MutableRefObject<number>;
  velocityRef?: React.MutableRefObject<number>;
}

export function ParticleField({
  count = 800,
  spread = 60,
  size = 0.08,
  color = '#E8E2D8',
  opacity = 0.6,
  speed = 0.3,
  scrollRef,
  velocityRef,
}: ParticleFieldProps) {
  const pointsRef = useRef<THREE.Points>(null);

  const { positions, velocities, sizes } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);
    const sizes = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * spread;
      positions[i * 3 + 1] = Math.random() * spread;
      positions[i * 3 + 2] = (Math.random() - 0.5) * spread;

      velocities[i * 3] = (Math.random() - 0.5) * 0.02;
      velocities[i * 3 + 1] = -Math.random() * 0.03 - 0.005;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.02;

      sizes[i] = Math.random() * size + size * 0.3;
    }

    return { positions, velocities, sizes };
  }, [count, spread, size]);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    return geo;
  }, [positions, sizes]);

  const material = useMemo(() => {
    return new THREE.PointsMaterial({
      color: new THREE.Color(color),
      size: size,
      transparent: true,
      opacity: opacity,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
    });
  }, [color, size, opacity]);

  useFrame((_, delta) => {
    if (!pointsRef.current) return;
    const pos = pointsRef.current.geometry.attributes.position.array as Float32Array;
    const vel = velocities;
    const speedMul = velocityRef ? 1 + velocityRef.current * 3 : 1;

    for (let i = 0; i < count; i++) {
      pos[i * 3] += vel[i * 3] * speedMul * delta * 60 * speed;
      pos[i * 3 + 1] += vel[i * 3 + 1] * speedMul * delta * 60 * speed;
      pos[i * 3 + 2] += vel[i * 3 + 2] * speedMul * delta * 60 * speed;

      if (pos[i * 3 + 1] < -spread / 2) {
        pos[i * 3 + 1] = spread / 2;
        pos[i * 3] = (Math.random() - 0.5) * spread;
        pos[i * 3 + 2] = (Math.random() - 0.5) * spread;
      }
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;

    if (scrollRef && pointsRef.current) {
      pointsRef.current.rotation.y = scrollRef.current * 0.5;
    }
  });

  return (
    <points ref={pointsRef} geometry={geometry} material={material} frustumCulled={false} />
  );
}
