import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface SkillObjectProps {
  position: [number, number, number];
  label: string;
  color?: string;
  shape?: 'core' | 'plate' | 'archive' | 'container' | 'symbol';
  index: number;
}

export function SkillObject({ position, label, color = '#E8E2D8', shape = 'core', index }: SkillObjectProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);

  const material = useMemo(() => {
    if (shape === 'core') {
      return new THREE.MeshStandardMaterial({
        color: new THREE.Color(color),
        emissive: new THREE.Color(color),
        emissiveIntensity: 0.3,
        metalness: 0.5,
        roughness: 0.3,
        transparent: true,
        opacity: 0.8,
        fog: true,
      });
    }
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color(color),
      metalness: 0.8,
      roughness: 0.4,
      transparent: true,
      opacity: 0.7,
      fog: true,
    });
  }, [color, shape]);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.3 + index;
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5 + index) * 0.1;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      {shape === 'core' && (
        <mesh ref={meshRef} material={material}>
          <icosahedronGeometry args={[0.4, 1]} />
        </mesh>
      )}
      {shape === 'plate' && (
        <mesh ref={meshRef} material={material}>
          <boxGeometry args={[0.6, 0.08, 0.4]} />
        </mesh>
      )}
      {shape === 'archive' && (
        <mesh ref={meshRef} material={material}>
          <boxGeometry args={[0.5, 0.6, 0.1]} />
        </mesh>
      )}
      {shape === 'container' && (
        <mesh ref={meshRef} material={material}>
          <cylinderGeometry args={[0.35, 0.35, 0.5, 8]} />
        </mesh>
      )}
      {shape === 'symbol' && (
        <mesh ref={meshRef} material={material}>
          <octahedronGeometry args={[0.4, 0]} />
        </mesh>
      )}
    </group>
  );
}

export function ArsenalScene() {
  const skillObjects = useMemo(() => {
    const objects: { position: [number, number, number]; label: string; color: string; shape: SkillObjectProps['shape'] }[] = [];
    const groups = [
      { items: ['LLMs', 'GenAI', 'Agents', 'NLP', 'DL', 'RAG'], color: '#B51F25', shape: 'core' as const },
      { items: ['Python', 'C', 'Java'], color: '#E8E2D8', shape: 'plate' as const },
      { items: ['React', 'JS', 'HTML', 'CSS'], color: '#77716A', shape: 'symbol' as const },
      { items: ['SQL', 'MongoDB'], color: '#E8E2D8', shape: 'archive' as const },
      { items: ['Git', 'Docker', 'AWS', 'Linux', 'Tableau', 'Power BI'], color: '#77716A', shape: 'container' as const },
    ];

    groups.forEach((group, gi) => {
      const angle = (gi / groups.length) * Math.PI * 2;
      const radius = 5;
      group.items.forEach((item, ii) => {
        const itemAngle = (ii / group.items.length) * Math.PI * 0.6 - Math.PI * 0.3;
        objects.push({
          position: [
            Math.cos(angle + itemAngle * 0.3) * radius,
            (gi - 2) * 1.5 + ii * 0.3,
            Math.sin(angle + itemAngle * 0.3) * radius,
          ],
          label: item,
          color: group.color,
          shape: group.shape,
        });
      });
    });

    return objects;
  }, []);

  return (
    <group>
      {skillObjects.map((obj, i) => (
        <SkillObject key={i} {...obj} index={i} />
      ))}
    </group>
  );
}
