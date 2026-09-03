import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface SamuraiProps {
  scrollRef?: React.MutableRefObject<number>;
}

export function Samurai({ scrollRef }: SamuraiProps) {
  const groupRef = useRef<THREE.Group>(null);
  const katanaRef = useRef<THREE.Group>(null);
  const bodyRef = useRef<THREE.Group>(null);
  const idleTime = useRef(0);

  const darkMaterial = useMemo(() => {
    return new THREE.MeshBasicMaterial({
      color: new THREE.Color('#080808'),
      transparent: true,
      opacity: 0.95,
      fog: true,
    });
  }, []);

  const armorMaterial = useMemo(() => {
    return new THREE.MeshBasicMaterial({
      color: new THREE.Color('#121212'),
      transparent: true,
      opacity: 0.9,
      fog: true,
    });
  }, []);

  const katanaMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color('#2a2a2a'),
      metalness: 0.95,
      roughness: 0.15,
      emissive: new THREE.Color('#641417'),
      emissiveIntensity: 0.05,
    });
  }, []);

  const handleMaterial = useMemo(() => {
    return new THREE.MeshBasicMaterial({
      color: new THREE.Color('#1a0505'),
      fog: true,
    });
  }, []);

  useFrame((_, delta) => {
    idleTime.current += delta;

    // Breathing
    if (bodyRef.current) {
      const breathe = Math.sin(idleTime.current * 1.5) * 0.015;
      bodyRef.current.scale.y = 1 + breathe;
      bodyRef.current.position.y = breathe * 0.5;
    }

    // Katana raise based on scroll
    if (katanaRef.current && scrollRef) {
      const s = scrollRef.current;
      const raiseAmount = THREE.MathUtils.clamp((s - 0.05) / 0.08, 0, 1);
      katanaRef.current.rotation.x = lerp(0.3, -1.2, raiseAmount);
      katanaRef.current.position.y = lerp(1.2, 2.5, raiseAmount);
      katanaRef.current.position.z = lerp(0.3, 0.8, raiseAmount);
    }

    // Slight rotation based on scroll
    if (groupRef.current && scrollRef) {
      groupRef.current.rotation.y = scrollRef.current * 0.3;
    }
  });

  return (
    <group ref={groupRef} position={[0.5, 0, 0]}>
      {/* Base / ground shadow */}
      <mesh position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[1.5, 32]} />
        <meshBasicMaterial color="#000000" transparent opacity={0.5} />
      </mesh>

      <group ref={bodyRef}>
        {/* Legs */}
        <mesh position={[-0.25, 0.5, 0]} material={darkMaterial}>
          <boxGeometry args={[0.3, 1, 0.3]} />
        </mesh>
        <mesh position={[0.25, 0.5, 0]} material={darkMaterial}>
          <boxGeometry args={[0.3, 1, 0.3]} />
        </mesh>

        {/* Torso / armor */}
        <mesh position={[0, 1.6, 0]} material={armorMaterial}>
          <boxGeometry args={[0.85, 1.1, 0.5]} />
        </mesh>

        {/* Shoulder armor */}
        <mesh position={[-0.55, 2.0, 0]} material={armorMaterial}>
          <boxGeometry args={[0.35, 0.35, 0.45]} />
        </mesh>
        <mesh position={[0.55, 2.0, 0]} material={armorMaterial}>
          <boxGeometry args={[0.35, 0.35, 0.45]} />
        </mesh>

        {/* Head */}
        <mesh position={[0, 2.55, 0]} material={darkMaterial}>
          <boxGeometry args={[0.35, 0.4, 0.35]} />
        </mesh>

        {/* Helmet (kabuto) */}
        <mesh position={[0, 2.75, 0]} material={armorMaterial}>
          <coneGeometry args={[0.3, 0.35, 8]} />
        </mesh>

        {/* Helmet crescent */}
        <mesh position={[0, 3.0, 0.15]} material={armorMaterial}>
          <boxGeometry args={[0.05, 0.4, 0.05]} />
        </mesh>

        {/* Left arm */}
        <mesh position={[-0.55, 1.5, 0]} material={darkMaterial}>
          <boxGeometry args={[0.2, 0.8, 0.2]} />
        </mesh>

        {/* Right arm */}
        <mesh position={[0.55, 1.5, 0]} material={darkMaterial}>
          <boxGeometry args={[0.2, 0.8, 0.2]} />
        </mesh>

        {/* Sashimono (back banner) */}
        <mesh position={[0, 2.5, -0.4]} material={armorMaterial}>
          <boxGeometry args={[0.15, 1.2, 0.02]} />
        </mesh>
      </group>

      {/* Katana */}
      <group ref={katanaRef} position={[0.55, 1.2, 0.3]}>
        {/* Handle */}
        <mesh position={[0, -0.3, 0]} material={handleMaterial}>
          <boxGeometry args={[0.06, 0.4, 0.06]} />
        </mesh>
        {/* Guard (tsuba) */}
        <mesh position={[0, -0.1, 0]} material={handleMaterial}>
          <boxGeometry args={[0.15, 0.04, 0.15]} />
        </mesh>
        {/* Blade */}
        <mesh position={[0, 0.6, 0]} material={katanaMaterial}>
          <boxGeometry args={[0.04, 1.4, 0.12]} />
        </mesh>
        {/* Blade tip */}
        <mesh position={[0, 1.35, 0]} material={katanaMaterial}>
          <coneGeometry args={[0.04, 0.15, 4]} />
        </mesh>
      </group>
    </group>
  );
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}
