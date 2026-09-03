import { useEffect, useRef, useState } from 'react';
import { ChapterLabel } from '@/components/ui/ChapterLabel';
import { skills } from '@/data/portfolioData';

export function Skills() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setVisible(true),
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} data-chapter="4" className="relative min-h-screen w-full flex items-center py-20 md:py-32">
      <div className="px-6 md:px-16 lg:px-24 max-w-7xl w-full">
        <ChapterLabel number="04" title="THE ARSENAL" />

        <h2 className="font-display text-5xl md:text-7xl lg:text-8xl text-bone mb-12 md:mb-16 leading-none">
          THE <span className="text-blood">ARSENAL.</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {skills.map((group, gi) => (
            <div
              key={group.group}
              className={`transition-all duration-700 ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${gi * 150}ms` }}
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="w-6 h-px bg-blood" />
                <span className="font-mono text-xs tracking-ultra text-blood uppercase">
                  {group.group}
                </span>
              </div>
              <div className="space-y-2">
                {group.items.map((item, ii) => (
                  <div
                    key={ii}
                    className="group flex items-baseline justify-between border-b border-bone-faint/10 pb-2 transition-colors duration-300 hover:border-blood/30"
                  >
                    <span className="font-display text-xl md:text-2xl text-bone group-hover:text-blood transition-colors">
                      {item.name}
                    </span>
                    <span className="font-mono text-[9px] text-bone-faint opacity-0 group-hover:opacity-100 transition-opacity max-w-[50%] text-right">
                      {item.desc}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
