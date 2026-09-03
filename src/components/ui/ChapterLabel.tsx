import { useEffect, useRef, useState } from 'react';

interface ChapterLabelProps {
  number: string;
  title: string;
}

export function ChapterLabel({ number, title }: ChapterLabelProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="flex items-center gap-4 mb-6">
      <span
        className={`font-mono text-xs tracking-ultra text-blood transition-all duration-700 ${
          visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
        }`}
      >
        CH {number}
      </span>
      <div
        className={`h-px bg-blood transition-all duration-700 delay-200 ${
          visible ? 'w-12 opacity-100' : 'w-0 opacity-0'
        }`}
      />
      <span
        className={`font-mono text-xs tracking-ultra text-bone-faint uppercase transition-all duration-700 delay-300 ${
          visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
        }`}
      >
        {title}
      </span>
    </div>
  );
}
