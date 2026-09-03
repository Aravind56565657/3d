import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface MoonProps {
  scrollRef?: React.MutableRefObject<number>;
}

export function Moon({ scrollRef }: MoonProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  const moonMaterial = useMemo(() => {
    return new THREE.MeshBasicMaterial({
      color: new THREE.Color('#B51F25'),
      transparent: true,
      opacity: 0.9,
    });
  }, []);

  const glowMaterial = useMemo(() => {
    return new THREE.MeshBasicMaterial({
      color: new THREE.Color('#641417'),
      transparent: true,
      opacity: 0.3,
      side: THREE.BackSide,
    });
  }, []);

  useFrame(() => {
    if (meshRef.current && scrollRef) {
      const s = scrollRef.current;
      meshRef.current.position.y = 8 - s * 3;
      meshRef.current.position.x = -5 + s * 2;
    }
    if (glowRef.current && scrollRef) {
      glowRef.current.position.copy(meshRef.current?.position || new THREE.Vector3());
    }
  });

  return (
    <group>
      <mesh ref={meshRef} position={[-5, 8, -35]} material={moonMaterial}>
        <circleGeometry args={[6, 64]} />
      </mesh>
      <mesh ref={glowRef} position={[-5, 8, -35]} material={glowMaterial}>
        <circleGeometry args={[9, 64]} />
      </mesh>
    </group>
  );
}
