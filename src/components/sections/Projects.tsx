import { useEffect, useRef, useState } from 'react';
import { ChapterLabel } from '@/components/ui/ChapterLabel';
import { projects } from '@/data/portfolioData';
import { Github, ExternalLink } from 'lucide-react';

export function Projects() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState<number[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number((entry.target as HTMLElement).dataset.index);
            setVisible((prev) => [...prev, idx]);
          }
        });
      },
      { threshold: 0.2 }
    );
    const items = ref.current?.querySelectorAll('[data-index]');
    items?.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} data-chapter="3" className="relative w-full py-20 md:py-32">
      <div className="px-6 md:px-16 lg:px-24 max-w-7xl w-full">
        <ChapterLabel number="03" title="THE FORGE" />

        <h2 className="font-display text-5xl md:text-7xl lg:text-8xl text-bone mb-4 md:mb-6 leading-none">
          SYSTEMS
          <br />
          FORGED
          <br />
          IN <span className="text-blood">CODE.</span>
        </h2>

        <div className="mt-16 md:mt-24 space-y-32 md:space-y-48">
          {projects.map((project, idx) => {
            const isVisible = visible.includes(idx);
            return (
              <div
                key={project.id}
                data-index={idx}
                data-cursor="view"
                className={`grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 transition-all duration-1000 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
                }`}
              >
                {/* Project number */}
                <div className="md:col-span-2">
                  <span className="font-display text-7xl md:text-8xl text-bone-faint/20">
                    {project.id}
                  </span>
                  <span className="font-mono text-[10px] tracking-ultra text-bone-faint uppercase block mt-2">
                    {project.category}
                  </span>
                </div>

                {/* Project content */}
                <div className="md:col-span-7">
                  <h3 className="font-display text-4xl md:text-6xl text-bone mb-4 leading-none">
                    {project.short}
                  </h3>
                  <p className="font-body text-bone-dim text-sm md:text-lg max-w-lg mb-6">
                    {project.description}
                  </p>

                  {/* Flow visualization */}
                  <div className="flex flex-wrap items-center gap-2 mb-6">
                    {project.flow.map((step, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <span className="font-mono text-[10px] tracking-widest text-bone-faint border border-bone-faint/20 px-2 py-1 uppercase">
                          {step}
                        </span>
                        {i < project.flow.length - 1 && (
                          <span className="text-blood text-xs">→</span>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Tech tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map((t, i) => (
                      <span
                        key={i}
                        className="font-mono text-[10px] tracking-widest text-bone-dim bg-ink-ash/50 border border-bone-faint/15 px-2.5 py-1"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex items-center gap-4">
                    {project.links.github && (
                      <a
                        href={project.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-2 font-mono text-xs tracking-widest uppercase text-bone-dim hover:text-blood transition-colors"
                      >
                        <Github size={14} />
                        <span className="border-b border-bone-faint/30 group-hover:border-blood pb-0.5">
                          GitHub
                        </span>
                      </a>
                    )}
                    {project.links.live && (
                      <a
                        href={project.links.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-2 font-mono text-xs tracking-widest uppercase text-bone-dim hover:text-blood transition-colors"
                      >
                        <ExternalLink size={14} />
                        <span className="border-b border-bone-faint/30 group-hover:border-blood pb-0.5">
                          Live
                        </span>
                      </a>
                    )}
                  </div>
                </div>

                {/* Visual indicator */}
                <div className="md:col-span-3 flex md:justify-end">
                  <div className="relative w-full max-w-[200px] aspect-square border border-bone-faint/10 flex items-center justify-center">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-2/3 h-2/3 border border-blood/30 rounded-full animate-pulse-slow" />
                      <div className="absolute w-1/2 h-1/2 border border-bone-faint/20 rounded-full" />
                      <span className="font-display text-6xl text-bone-faint/10">
                        {project.id}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
