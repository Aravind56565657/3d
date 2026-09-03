import { useRef, useMemo, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

interface InkSlashProps {
  triggerRef: React.MutableRefObject<boolean>;
  onComplete?: () => void;
}

export function InkSlash({ triggerRef, onComplete }: InkSlashProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const { camera } = useThree();
  const hasTriggered = useRef(false);
  const animProgress = useRef(0);

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uProgress: { value: 0 },
    uOpacity: { value: 0 },
  }), []);

  useEffect(() => {
    return () => {
      uniforms.uTime.value = 0;
      uniforms.uProgress.value = 0;
      uniforms.uOpacity.value = 0;
    };
  }, [uniforms]);

  useFrame((_, delta) => {
    if (triggerRef.current && !hasTriggered.current) {
      hasTriggered.current = true;
    }

    if (hasTriggered.current && animProgress.current < 1) {
      animProgress.current = Math.min(1, animProgress.current + delta * 2.5);
      uniforms.uProgress.value = animProgress.current;
      uniforms.uOpacity.value = Math.sin(animProgress.current * Math.PI);

      if (meshRef.current) {
        const scale = 1 + animProgress.current * 3;
        meshRef.current.scale.set(scale, scale, 1);
        meshRef.current.lookAt(camera.position);
      }

      if (animProgress.current >= 1) {
        if (onComplete) onComplete();
      }
    }

    if (animProgress.current > 0.8 && !triggerRef.current) {
      uniforms.uOpacity.value *= 0.9;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 2]}>
      <planeGeometry args={[3, 8]} />
      <shaderMaterial
        ref={materialRef}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        vertexShader={`
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `}
        fragmentShader={`
          uniform float uProgress;
          uniform float uOpacity;
          uniform float uTime;
          varying vec2 vUv;

          float random(vec2 st) {
            return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
          }

          void main() {
            vec2 uv = vUv;
            float dist = abs(uv.x - 0.5);
            float edge = smoothstep(0.5, 0.0, dist);
            float vertical = smoothstep(0.0, 0.3, uv.y) * smoothstep(1.0, 0.7, uv.y);
            float slash = edge * vertical;

            float splatter = 0.0;
            for (float i = 0.0; i < 8.0; i++) {
              vec2 p = vec2(random(vec2(i, 1.0)), random(vec2(1.0, i)));
              float d = distance(uv, p);
              splatter += smoothstep(0.08, 0.0, d) * random(vec2(i, i));
            }

            float alpha = (slash + splatter * 0.5) * uOpacity;
            vec3 color = mix(vec3(0.71, 0.12, 0.15), vec3(1.0, 0.16, 0.18), slash);
            gl_FragColor = vec4(color, alpha);
          }
        `}
      />
    </mesh>
  );
}
