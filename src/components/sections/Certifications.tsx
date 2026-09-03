import { useEffect, useRef, useState } from 'react';
import { ChapterLabel } from '@/components/ui/ChapterLabel';
import { certifications, achievement, leadership } from '@/data/portfolioData';
import { Award } from 'lucide-react';

export function Certifications() {
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
    <section ref={ref} data-chapter="5" className="relative min-h-screen w-full flex items-center py-20 md:py-32">
      <div className="px-6 md:px-16 lg:px-24 max-w-7xl w-full">
        <ChapterLabel number="05" title="THE RECORD" />

        <h2 className="font-display text-5xl md:text-7xl lg:text-8xl text-bone mb-12 md:mb-16 leading-none">
          THE <span className="text-blood">RECORD.</span>
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
          {/* Certifications */}
          <div className={`transition-all duration-700 ${visible ? 'opacity-100' : 'opacity-0'}`}>
            <span className="font-mono text-xs tracking-ultra text-bone-faint uppercase block mb-6">
              CERTIFICATIONS
            </span>
            <div className="space-y-4">
              {certifications.map((cert, i) => (
                <div
                  key={i}
                  className={`border-l-2 border-bone-faint/20 pl-4 transition-all duration-500 hover:border-blood ${
                    visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
                  }`}
                  style={{ transitionDelay: `${i * 150}ms` }}
                >
                  <h4 className="font-display text-lg md:text-xl text-bone">{cert.title}</h4>
                  <p className="font-mono text-xs text-bone-dim">{cert.issuer} · {cert.source} · {cert.year}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Achievement */}
          <div className={`transition-all duration-700 delay-300 ${visible ? 'opacity-100' : 'opacity-0'}`}>
            <span className="font-mono text-xs tracking-ultra text-bone-faint uppercase block mb-6">
              ACHIEVEMENT
            </span>
            <div className="relative p-6 border border-blood/30 bg-ink-ash/30">
              <div className="absolute top-4 right-4">
                <div className="w-16 h-16 rounded-full border-2 border-blood flex items-center justify-center">
                  <Award size={28} className="text-blood" />
                </div>
              </div>
              <h4 className="font-display text-3xl md:text-4xl text-blood mb-2">BEST IDEA</h4>
              <h4 className="font-display text-3xl md:text-4xl text-bone mb-4">AWARD</h4>
              <p className="font-body text-bone-dim text-sm">{achievement.project}</p>
              {/* Red stamp */}
              <div className="mt-6 inline-block border-2 border-blood/60 px-3 py-1 transform -rotate-6">
                <span className="font-mono text-[10px] tracking-widest text-blood/80 uppercase">
                  Verified
                </span>
              </div>
            </div>
          </div>

          {/* Leadership */}
          <div className={`transition-all duration-700 delay-500 ${visible ? 'opacity-100' : 'opacity-0'}`}>
            <span className="font-mono text-xs tracking-ultra text-bone-faint uppercase block mb-6">
              LEADERSHIP
            </span>
            <div className="space-y-6">
              {leadership.map((lead, i) => (
                <div key={i} className="border-l-2 border-bone-faint/20 pl-4 hover:border-blood transition-colors">
                  <h4 className="font-display text-xl md:text-2xl text-bone">{lead.role}</h4>
                  <p className="font-mono text-xs text-bone-dim mb-1">{lead.org}</p>
                  <p className="font-body text-xs text-bone-faint">{lead.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
