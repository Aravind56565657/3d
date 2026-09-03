import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function FaceScanScene({ scrollRef }: { scrollRef?: React.MutableRefObject<number> }) {
  const groupRef = useRef<THREE.Group>(null);
  const scanLineRef = useRef<THREE.Mesh>(null);
  const pointsRef = useRef<THREE.Points>(null);

  const { faceGeometry, landmarkPositions } = useMemo(() => {
    const positions: number[] = [];
    const landmarkCount = 68;
    const landmarkPos: number[] = [];

    for (let i = 0; i < 200; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      const r = 1.5 + Math.random() * 0.3;
      positions.push(
        r * Math.sin(phi) * Math.cos(theta),
        r * Math.cos(phi),
        r * Math.sin(phi) * Math.sin(theta)
      );
    }

    for (let i = 0; i < landmarkCount; i++) {
      const theta = (i / landmarkCount) * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      const r = 1.7;
      landmarkPos.push(
        r * Math.sin(phi) * Math.cos(theta),
        r * Math.cos(phi) + 0.3,
        r * Math.sin(phi) * Math.sin(theta)
      );
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    return { faceGeometry: geo, landmarkPositions: landmarkPos };
  }, []);

  const landmarkGeo = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(landmarkPositions, 3));
    return geo;
  }, [landmarkPositions]);

  const landmarkMat = useMemo(() => {
    return new THREE.PointsMaterial({
      color: '#B51F25',
      size: 0.08,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
  }, []);

  const wireMat = useMemo(() => {
    return new THREE.MeshBasicMaterial({
      color: '#E8E2D8',
      wireframe: true,
      transparent: true,
      opacity: 0.15,
      fog: true,
    });
  }, []);

  const scanMat = useMemo(() => {
    return new THREE.MeshBasicMaterial({
      color: '#B51F25',
      transparent: true,
      opacity: 0.4,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
    if (scanLineRef.current) {
      const t = (state.clock.elapsedTime * 0.5) % 2;
      scanLineRef.current.position.y = -1 + t;
      scanLineRef.current.scale.x = 1.8;
      scanLineRef.current.scale.z = 1.8;
    }
    if (pointsRef.current && scrollRef) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.15;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Wireframe head */}
      <mesh geometry={faceGeometry} material={wireMat} />
      {/* Landmarks */}
      <points ref={pointsRef} geometry={landmarkGeo} material={landmarkMat} />
      {/* Scan line */}
      <mesh ref={scanLineRef} rotation={[Math.PI / 2, 0, 0]} material={scanMat}>
        <ringGeometry args={[1.4, 1.6, 64]} />
      </mesh>
    </group>
  );
}
