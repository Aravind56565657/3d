import { useEffect, useRef, useState } from 'react';
import { ChapterLabel } from '@/components/ui/ChapterLabel';
import { personal, contact } from '@/data/portfolioData';
import { Mail, Github, Linkedin, Phone } from 'lucide-react';

export function Contact() {
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
    <section ref={ref} data-chapter="6" className="relative min-h-screen w-full flex items-center justify-center py-20 md:py-32">
      <div className="px-6 md:px-16 lg:px-24 max-w-5xl w-full text-center">
        <ChapterLabel number="06" title="THE NEXT HORIZON" />

        <h2 className="font-display text-5xl md:text-7xl lg:text-9xl text-bone leading-[0.85] mb-8 md:mb-12">
          LET'S BUILD
          <br />
          SOMETHING
          <br />
          <span className="text-blood glow-blood">INTELLIGENT.</span>
        </h2>

        <div className={`transition-all duration-1000 ${visible ? 'opacity-100' : 'opacity-0'}`}>
          <h3 className="font-display text-3xl md:text-5xl text-bone mb-2">
            {personal.display}
          </h3>
          <p className="font-mono text-sm tracking-ultra text-bone-faint uppercase mb-12">
            {personal.role}
          </p>

          {/* Contact links */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
            <a
              href={`mailto:${contact.email}`}
              className="group flex items-center gap-2 font-mono text-xs tracking-widest uppercase text-bone-dim hover:text-blood transition-colors"
            >
              <Mail size={16} />
              <span className="border-b border-bone-faint/30 group-hover:border-blood pb-0.5">
                {contact.email}
              </span>
            </a>
            <a
              href={contact.github}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 font-mono text-xs tracking-widest uppercase text-bone-dim hover:text-blood transition-colors"
            >
              <Github size={16} />
              <span className="border-b border-bone-faint/30 group-hover:border-blood pb-0.5">
                {contact.githubLabel}
              </span>
            </a>
            <a
              href={contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 font-mono text-xs tracking-widest uppercase text-bone-dim hover:text-blood transition-colors"
            >
              <Linkedin size={16} />
              <span className="border-b border-bone-faint/30 group-hover:border-blood pb-0.5">
                {contact.linkedinLabel}
              </span>
            </a>
            <a
              href={`tel:${contact.phone}`}
              className="group flex items-center gap-2 font-mono text-xs tracking-widest uppercase text-bone-dim hover:text-blood transition-colors"
            >
              <Phone size={16} />
              <span className="border-b border-bone-faint/30 group-hover:border-blood pb-0.5">
                {contact.phone}
              </span>
            </a>
          </div>

          {/* Final message */}
          <div className="mt-24 md:mt-32">
            <p className="font-display text-2xl md:text-3xl text-bone-dim mb-2">
              THANK YOU FOR VISITING.
            </p>
            <p className="font-display text-xl text-bone-faint mb-1">
              ありがとう
            </p>
            <p className="font-mono text-xs tracking-ultra text-bone-faint/50 uppercase">
              {personal.display} · {personal.role} · {personal.year}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
