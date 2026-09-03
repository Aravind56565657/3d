import { useMemo } from 'react';
import * as THREE from 'three';

export function Mountains() {
  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const vertices: number[] = [];
    const colors: number[] = [];

    const segments = 40;
    const width = 120;
    const depth = -28;

    for (let i = 0; i <= segments; i++) {
      const x = (i / segments - 0.5) * width;
      const h = Math.sin(i * 0.3) * 8 + Math.sin(i * 0.7) * 5 + 12;
      vertices.push(x, 0, depth);
      vertices.push(x, h, depth + Math.random() * 3);
      vertices.push(x + width / segments, 0, depth);

      const shade = 0.05 + Math.random() * 0.05;
      colors.push(shade, shade, shade);
      colors.push(shade * 1.5, shade * 1.5, shade * 1.5);
      colors.push(shade, shade, shade);
    }

    geo.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    geo.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
    geo.computeVertexNormals();
    return geo;
  }, []);

  const material = useMemo(() => {
    return new THREE.MeshBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      fog: true,
    });
  }, []);

  return (
    <mesh geometry={geometry} material={material} position={[0, -2, 0]} />
  );
}
