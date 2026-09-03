import { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface CameraRigProps {
  scrollRef: React.MutableRefObject<number>;
  mouseRef: React.MutableRefObject<{ x: number; y: number }>;
}

export interface CameraKeyframe {
  position: [number, number, number];
  lookAt: [number, number, number];
  fov: number;
}

const keyframes: CameraKeyframe[] = [
  // CH 00 — Hero: wide establishing shot
  { position: [0, 1.5, 12], lookAt: [0, 2, 0], fov: 50 },
  // CH 00 mid — push toward samurai
  { position: [2, 1.5, 7], lookAt: [0, 2, 0], fov: 48 },
  // CH 00 end — close to samurai for slash
  { position: [0, 2, 3], lookAt: [0, 2.5, 0], fov: 45 },
  // CH 01 — Forest path
  { position: [0, 2, 5], lookAt: [0, 2, -10], fov: 55 },
  // CH 01 mid — traveling along path
  { position: [-1, 2, -5], lookAt: [0, 2, -20], fov: 55 },
  // CH 02 — Battlefield establishing
  { position: [3, 3, 8], lookAt: [0, 1, -5], fov: 55 },
  // CH 02 mid — Battlefield closer
  { position: [0, 1.5, 3], lookAt: [0, 1, -8], fov: 50 },
  // CH 03 — Forge: project 01 (face scan)
  { position: [0, 0, 6], lookAt: [0, 0, 0], fov: 50 },
  // CH 03 mid — project 02 (Noah AI)
  { position: [0, 1, 4], lookAt: [0, 0, -5], fov: 50 },
  // CH 03 end — project 03/04
  { position: [0, 0, 3], lookAt: [0, 0, -10], fov: 55 },
  // CH 04 — Arsenal
  { position: [0, 0, 8], lookAt: [0, 0, 0], fov: 60 },
  // CH 05 — Archive
  { position: [0, 1, 6], lookAt: [0, 1, -5], fov: 50 },
  // CH 06 — Final horizon
  { position: [0, 1, 15], lookAt: [0, 2, -20], fov: 45 },
];

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

export function CameraRig({ scrollRef, mouseRef }: CameraRigProps) {
  const { camera } = useThree();
  const reducedMotion = useReducedMotion();
  const currentPos = useRef(new THREE.Vector3(...keyframes[0].position));
  const currentLook = useRef(new THREE.Vector3(...keyframes[0].lookAt));

  useEffect(() => {
    const cam = camera as THREE.PerspectiveCamera;
    cam.fov = keyframes[0].fov;
    cam.updateProjectionMatrix();
  }, [camera]);

  useFrame(() => {
    const scroll = scrollRef.current;
    const totalKeys = keyframes.length - 1;
    const segment = scroll * totalKeys;
    const idx = Math.floor(segment);
    const frac = segment - idx;
    const eased = easeInOutCubic(frac);

    const k1 = keyframes[Math.min(idx, totalKeys)];
    const k2 = keyframes[Math.min(idx + 1, totalKeys)];

    const targetPos = new THREE.Vector3(
      lerp(k1.position[0], k2.position[0], eased),
      lerp(k1.position[1], k2.position[1], eased),
      lerp(k1.position[2], k2.position[2], eased)
    );

    const targetLook = new THREE.Vector3(
      lerp(k1.lookAt[0], k2.lookAt[0], eased),
      lerp(k1.lookAt[1], k2.lookAt[1], eased),
      lerp(k1.lookAt[2], k2.lookAt[2], eased)
    );

    const targetFov = lerp(k1.fov, k2.fov, eased);

    // Mouse parallax — subtle
    if (!reducedMotion) {
      const mx = mouseRef.current.x * 0.5;
      const my = mouseRef.current.y * 0.3;
      targetPos.x += mx;
      targetPos.y -= my;
    }

    // Smooth interpolation
    currentPos.current.lerp(targetPos, 0.06);
    currentLook.current.lerp(targetLook, 0.06);

    camera.position.copy(currentPos.current);
    camera.lookAt(currentLook.current);

    const cam = camera as THREE.PerspectiveCamera;
    if (Math.abs(cam.fov - targetFov) > 0.01) {
      cam.fov = lerp(cam.fov, targetFov, 0.06);
      cam.updateProjectionMatrix();
    }
  });

  return null;
}
