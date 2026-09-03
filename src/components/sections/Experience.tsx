import { useEffect, useRef, useState } from 'react';
import { ChapterLabel } from '@/components/ui/ChapterLabel';
import { experience } from '@/data/portfolioData';

export function Experience() {
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
    <section ref={ref} data-chapter="2" className="relative min-h-screen w-full flex items-center py-20 md:py-32">
      <div className="px-6 md:px-16 lg:px-24 max-w-7xl w-full">
        <ChapterLabel number="02" title="THE BATTLEFIELD" />

        <h2 className="font-display text-5xl md:text-7xl lg:text-8xl text-bone mb-12 md:mb-20 leading-none">
          WHERE <span className="text-blood">SYSTEMS</span>
          <br />
          WERE TESTED.
        </h2>

        <div className="space-y-16 md:space-y-24">
          {experience.map((exp, idx) => (
            <div
              key={exp.id}
              className={`grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 transition-all duration-1000 ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
              style={{ transitionDelay: `${idx * 300}ms` }}
            >
              {/* Number */}
              <div className="md:col-span-2">
                <span className="font-display text-6xl md:text-7xl text-bone-faint/30">
                  {exp.id}
                </span>
              </div>

              {/* Content */}
              <div className="md:col-span-7">
                <span className="font-mono text-xs text-blood tracking-ultra uppercase block mb-2">
                  {exp.role}
                </span>
                <h3 className="font-display text-3xl md:text-4xl text-bone mb-2">
                  {exp.company}
                </h3>
                <p className="font-mono text-xs text-bone-faint mb-4">
                  {exp.period}
                </p>
                <p className="font-body text-bone-dim text-sm md:text-base mb-4 max-w-lg">
                  {exp.summary}
                </p>
                <ul className="space-y-1.5">
                  {exp.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-2 font-body text-xs md:text-sm text-bone-dim">
                      <span className="text-blood mt-1.5 w-1 h-1 rounded-full bg-blood flex-shrink-0" />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Keywords */}
              <div className="md:col-span-3 flex flex-wrap gap-2 content-start">
                {exp.keywords.map((kw, i) => (
                  <span
                    key={i}
                    className="font-mono text-[10px] tracking-widest text-bone-faint border border-bone-faint/20 px-2.5 py-1 uppercase"
                  >
                    {kw}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
