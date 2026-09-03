import { useEffect, useRef, useState, useCallback } from 'react';
import { World } from '@/components/3d/World';
import { Navigation } from '@/components/ui/Navigation';
import { Cursor } from '@/components/ui/Cursor';
import { ProgressIndicator } from '@/components/ui/ProgressIndicator';
import { LoadingScreen } from '@/components/ui/LoadingScreen';
import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import { Experience } from '@/components/sections/Experience';
import { Projects } from '@/components/sections/Projects';
import { Skills } from '@/components/sections/Skills';
import { Certifications } from '@/components/sections/Certifications';
import { Contact } from '@/components/sections/Contact';
import { useLenisScroll } from '@/hooks/useLenisScroll';
import { useScrollProgress } from '@/hooks/useScrollProgress';

export default function App() {
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef(0);
  const mouseRef = useRef({ x: 0, y: 0 });
  const velocityRef = useRef(0);
  const slashTriggerRef = useRef(false);
  const slashTriggeredRef = useRef(false);

  useLenisScroll();
  const { progress, velocity, chapter } = useScrollProgress();

  // Update refs from scroll progress hook
  useEffect(() => {
    scrollRef.current = progress;
    velocityRef.current = velocity;
  }, [progress, velocity]);

  // Mouse parallax
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      };
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  // Trigger katana slash at ~10% scroll
  useEffect(() => {
    if (progress > 0.08 && !slashTriggeredRef.current) {
      slashTriggeredRef.current = true;
      slashTriggerRef.current = true;
      setTimeout(() => {
        slashTriggerRef.current = false;
      }, 2000);
    }
  }, [progress]);

  const handleLoadingComplete = useCallback(() => {
    setLoading(false);
  }, []);

  return (
    <>
      {loading && <LoadingScreen onComplete={handleLoadingComplete} />}

      {/* 3D World — fixed behind content */}
      <div className="fixed inset-0 z-0">
        <World
          scrollRef={scrollRef}
          mouseRef={mouseRef}
          velocityRef={velocityRef}
          slashTriggerRef={slashTriggerRef}
        />
      </div>

      {/* UI overlay */}
      <Cursor />
      <Navigation activeChapter={chapter} />
      <ProgressIndicator activeChapter={chapter} progress={progress} />

      {/* Content sections */}
      <main className="relative z-10">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Certifications />
        <Contact />
      </main>
    </>
  );
}
