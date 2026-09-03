import { useEffect, useState } from 'react';
import { personal, navItems } from '@/data/portfolioData';
import { scrollToChapter } from '@/hooks/useLenisScroll';

export function Navigation({ activeChapter }: { activeChapter: number }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-10 py-5 transition-all duration-500 ${
        scrolled ? 'bg-ink-black/60 cinematic-blur' : 'bg-transparent'
      }`}
    >
      {/* Left: AK / name */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="group flex items-center gap-3"
      >
        <span className="font-display text-xl text-bone tracking-wide">AK</span>
        <span className="hidden md:block font-mono text-[10px] tracking-ultra text-bone-faint uppercase">
          {personal.display}
        </span>
      </button>

      {/* Right: nav items */}
      <div className="flex items-center gap-6 md:gap-8">
        {navItems.map((item) => {
          const isActive = activeChapter === item.chapter;
          return (
            <button
              key={item.label}
              onClick={() => scrollToChapter(item.chapter)}
              className="group relative font-mono text-[10px] md:text-[11px] tracking-ultra uppercase transition-colors duration-300"
            >
              <span className={isActive ? 'text-blood' : 'text-bone-faint group-hover:text-bone'}>
                {item.label}
              </span>
              {isActive && (
                <span className="absolute -left-3 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-blood" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
