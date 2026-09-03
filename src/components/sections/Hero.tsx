import { useEffect, useRef, useState } from 'react';
import { personal } from '@/data/portfolioData';

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const opacity = Math.max(0, 1 - scrollY / 500);
  const translateY = scrollY * 0.3;

  return (
    <section
      ref={ref}
      data-chapter="0"
      className="relative h-screen w-full flex items-center justify-start overflow-hidden"
    >
      <div
        className="relative z-10 px-6 md:px-16 lg:px-24 max-w-7xl"
        style={{ opacity, transform: `translateY(${translateY}px)` }}
      >
        {/* Role label */}
        <div className="flex items-center gap-3 mb-6 md:mb-8">
          <span className="w-8 h-px bg-blood" />
          <span className="font-mono text-[10px] md:text-xs tracking-ultra text-blood uppercase">
            {personal.roles.join(' / ')}
          </span>
        </div>

        {/* Main title */}
        <h1 className="font-display leading-[0.85] tracking-tight">
          <span className="block text-[18vw] md:text-[14vw] lg:text-[11vw] text-bone">
            ARAVIND
          </span>
          <span className="block text-[18vw] md:text-[14vw] lg:text-[11vw] text-bone">
            KUMAR
          </span>
        </h1>

        {/* Tagline */}
        <div className="mt-6 md:mt-10 max-w-md">
          <p className="font-display text-2xl md:text-4xl lg:text-5xl leading-tight text-bone-dim">
            ARCHITECTING
            <br />
            THE FUTURE
            <br />
            OF <span className="text-blood glow-blood">AI.</span>
          </p>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-[-120px] md:bottom-[-140px] left-0 flex items-center gap-3">
          <span className="font-mono text-[10px] tracking-ultra text-bone-faint uppercase">
            Scroll to begin
          </span>
          <div className="w-12 h-px bg-bone-faint/40 relative overflow-hidden">
            <div className="absolute top-0 left-0 h-full w-1/3 bg-blood animate-pulse-slow" />
          </div>
        </div>
      </div>

      {/* Vignette overlay */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse at center, transparent 30%, #050505 90%)',
      }} />
    </section>
  );
}
