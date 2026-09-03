import { useEffect, useRef, useState } from 'react';

export function useMouseParallax() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const targetRef = useRef({ x: 0, y: 0 });
  const currentRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      targetRef.current = {
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      };
    };

    window.addEventListener('mousemove', onMove);

    const lerp = (a: number, b: number, n: number) => a + (b - a) * n;

    const tick = () => {
      currentRef.current = {
        x: lerp(currentRef.current.x, targetRef.current.x, 0.05),
        y: lerp(currentRef.current.y, targetRef.current.y, 0.05),
      };
      setMouse({ x: currentRef.current.x, y: currentRef.current.y });
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return mouse;
}
