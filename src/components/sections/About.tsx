import { useEffect, useRef, useState } from 'react';
import { ChapterLabel } from '@/components/ui/ChapterLabel';
import { education, focusAreas, philosophy, aboutWords } from '@/data/portfolioData';

export function About() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setVisible(true),
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} data-chapter="1" className="relative min-h-screen w-full flex items-center py-20 md:py-32">
      <div className="px-6 md:px-16 lg:px-24 max-w-7xl w-full">
        <ChapterLabel number="01" title="THE PATH" />

        {/* About words at different depths */}
        <div className="relative mb-16 md:mb-24">
          {aboutWords.map((word, i) => (
            <div
              key={i}
              className="overflow-hidden"
              style={{ marginLeft: `${i * 40}px` }}
            >
              <h2
                className={`font-display text-6xl md:text-8xl lg:text-9xl leading-none transition-all duration-1000 ${
                  visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-full'
                }`}
                style={{
                  transitionDelay: `${i * 200}ms`,
                  color: i === 0 ? '#E8E2D8' : i === 1 ? '#77716A' : '#B51F25',
                }}
              >
                {word}
              </h2>
            </div>
          ))}
        </div>

        {/* Education */}
        <div className={`grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          style={{ transitionDelay: '600ms' }}
        >
          <div>
            <span className="font-mono text-[10px] tracking-ultra text-bone-faint uppercase block mb-4">
              EDUCATION
            </span>
            <h3 className="font-display text-2xl md:text-3xl text-bone mb-2">
              {education.degree}
            </h3>
            <p className="font-body text-bone-dim text-sm md:text-base mb-1">
              {education.institution}
            </p>
            <p className="font-mono text-xs text-bone-faint mb-4">
              {education.period}
            </p>
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs text-bone-faint">CGPA</span>
              <span className="font-display text-3xl text-blood">{education.cgpa}</span>
            </div>
          </div>

          <div>
            <span className="font-mono text-[10px] tracking-ultra text-bone-faint uppercase block mb-4">
              FOCUS AREAS
            </span>
            <div className="flex flex-wrap gap-2">
              {focusAreas.map((area, i) => (
                <span
                  key={i}
                  className="font-mono text-xs md:text-sm text-bone-dim border border-bone-faint/30 px-3 py-1.5 transition-colors duration-300 hover:border-blood hover:text-blood"
                >
                  {area}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Philosophy */}
        <div className="mt-16 md:mt-24 space-y-6 md:space-y-8">
          <span className="font-mono text-[10px] tracking-ultra text-bone-faint uppercase block">
            PHILOSOPHY
          </span>
          {philosophy.map((p, i) => (
            <div
              key={i}
              className={`group transition-all duration-700 ${visible ? 'opacity-100' : 'opacity-0'}`}
              style={{ transitionDelay: `${800 + i * 200}ms` }}
            >
              <h4 className="font-display text-3xl md:text-5xl text-bone group-hover:text-blood transition-colors duration-300">
                {p.title}
              </h4>
              <p className="font-body text-bone-dim text-sm md:text-lg mt-1 max-w-xl">
                {p.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
