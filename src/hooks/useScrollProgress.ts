import { useEffect, useState } from 'react';

export function useScrollProgress() {
  const [progress, setProgress] = useState(0);
  const [velocity, setVelocity] = useState(0);
  const [chapter, setChapter] = useState(0);

  useEffect(() => {
    let lastScroll = 0;
    let lastTime = performance.now();
    let velocityRaf = 0;

    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const p = docHeight > 0 ? scrollTop / docHeight : 0;
      setProgress(p);

      const now = performance.now();
      const dt = now - lastTime;
      if (dt > 0) {
        const v = Math.abs(scrollTop - lastScroll) / dt;
        setVelocity(v);
      }
      lastScroll = scrollTop;
      lastTime = now;

      const sections = document.querySelectorAll('[data-chapter]');
      let activeChapter = 0;
      sections.forEach((s, i) => {
        const rect = s.getBoundingClientRect();
        if (rect.top <= window.innerHeight * 0.5) {
          activeChapter = i;
        }
      });
      setChapter(activeChapter);
    };

    window.addEventListener('scroll', onScroll, { passive: true });

    velocityRaf = requestAnimationFrame(function decay() {
      setVelocity((v) => Math.max(0, v - 0.005));
      velocityRaf = requestAnimationFrame(decay);
    });

    onScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(velocityRaf);
    };
  }, []);

  return { progress, velocity, chapter };
}
