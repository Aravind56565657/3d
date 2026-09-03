import { useEffect, useRef, useState } from 'react';

export function Cursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hovering, setHovering] = useState(false);
  const [viewing, setViewing] = useState(false);
  const [visible, setVisible] = useState(false);
  const rafRef = useRef(0);
  const targetRef = useRef({ x: 0, y: 0 });
  const currentRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      targetRef.current = { x: e.clientX, y: e.clientY };
      if (!visible) setVisible(true);
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a, button, [data-cursor="hover"]')) {
        setHovering(true);
      } else {
        setHovering(false);
      }
      if (target.closest('[data-cursor="view"]')) {
        setViewing(true);
      } else {
        setViewing(false);
      }
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseover', onOver);

    const lerp = (a: number, b: number, n: number) => a + (b - a) * n;

    const tick = () => {
      currentRef.current = {
        x: lerp(currentRef.current.x, targetRef.current.x, 0.2),
        y: lerp(currentRef.current.y, targetRef.current.y, 0.2),
      };
      setPosition(currentRef.current);
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
      cancelAnimationFrame(rafRef.current);
    };
  }, [visible]);

  if (typeof window !== 'undefined' && window.innerWidth < 768) return null;

  return (
    <div
      className="pointer-events-none fixed z-[9999] transition-opacity duration-300"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        opacity: visible ? 1 : 0,
        transform: 'translate(-50%, -50%)',
      }}
    >
      <div
        className="flex items-center justify-center rounded-full border transition-all duration-200 ease-out"
        style={{
          width: viewing ? '64px' : hovering ? '36px' : '16px',
          height: viewing ? '64px' : hovering ? '36px' : '16px',
          borderColor: viewing || hovering ? '#B51F25' : '#E8E2D8',
          borderWidth: '1px',
          backgroundColor: viewing ? 'rgba(181, 31, 37, 0.1)' : 'transparent',
        }}
      >
        {viewing && (
          <span className="font-mono text-[8px] tracking-widest text-blood">
            VIEW
          </span>
        )}
      </div>
    </div>
  );
}
