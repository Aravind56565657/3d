import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function DocumentScene() {
  const groupRef = useRef<THREE.Group>(null);

  const docs = useMemo(() => {
    return Array.from({ length: 8 }, (_, i) => ({
      pos: [
        (Math.random() - 0.5) * 4,
        (Math.random() - 0.5) * 3,
        -i * 1.5 - 1,
      ] as [number, number, number],
      rot: [(Math.random() - 0.5) * 0.3, Math.random() * 0.4, (Math.random() - 0.5) * 0.2] as [number, number, number],
      scale: 0.8 + Math.random() * 0.4,
    }));
  }, []);

  const docMat = useMemo(() => {
    return new THREE.MeshBasicMaterial({
      color: '#E8E2D8',
      transparent: true,
      opacity: 0.15,
      side: THREE.DoubleSide,
      fog: true,
    });
  }, []);

  const lineMat = useMemo(() => {
    return new THREE.MeshBasicMaterial({
      color: '#B51F25',
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    });
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.children.forEach((child, i) => {
        child.position.y += Math.sin(state.clock.elapsedTime * 0.5 + i) * 0.002;
      });
    }
  });

  return (
    <group ref={groupRef}>
      {docs.map((doc, i) => (
        <group key={i} position={doc.pos} rotation={doc.rot} scale={doc.scale}>
          {/* Document plane */}
          <mesh material={docMat}>
            <planeGeometry args={[1.5, 2]} />
          </mesh>
          {/* OCR bounding boxes */}
          <mesh position={[0, 0.3, 0.01]} material={lineMat}>
            <planeGeometry args={[1.2, 0.15]} />
          </mesh>
          <mesh position={[0, -0.1, 0.01]} material={lineMat}>
            <planeGeometry args={[0.9, 0.12]} />
          </mesh>
          <mesh position={[0, -0.4, 0.01]} material={lineMat}>
            <planeGeometry args={[1.0, 0.1]} />
          </mesh>
        </group>
      ))}
    </group>
  );
}
