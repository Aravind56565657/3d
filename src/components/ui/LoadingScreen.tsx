import { useEffect, useState } from 'react';
import { personal } from '@/data/portfolioData';

export function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);
  const [showEnter, setShowEnter] = useState(false);

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      current += Math.random() * 8 + 3;
      if (current >= 100) {
        current = 100;
        clearInterval(interval);
        setProgress(100);
        setTimeout(() => setShowEnter(true), 400);
      } else {
        setProgress(Math.floor(current));
      }
    }, 120);

    return () => clearInterval(interval);
  }, []);

  const handleEnter = () => {
    setDone(true);
    setTimeout(onComplete, 800);
  };

  if (done) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] bg-ink-black flex flex-col items-center justify-center transition-opacity duration-700 ${
        showEnter ? 'opacity-100' : 'opacity-100'
      }`}
    >
      {/* Forging text */}
      <div className="mb-8 overflow-hidden">
        <p className="font-mono text-xs tracking-ultra text-bone-faint uppercase">
          {progress < 100 ? 'FORGING SYSTEM...' : 'SYSTEM READY'}
        </p>
      </div>

      {/* Progress bar */}
      <div className="w-48 md:w-64 h-px bg-bone-faint/20 relative overflow-hidden">
        <div
          className="absolute top-0 left-0 h-full bg-blood transition-all duration-200"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Percentage */}
      <div className="mt-4 font-mono text-sm text-bone-dim tabular-nums">
        {progress}%
      </div>

      {/* Enter button */}
      {showEnter && (
        <div className="mt-12 text-center animate-in fade-in duration-700">
          <h1 className="font-display text-5xl md:text-7xl text-bone leading-none mb-2">
            {personal.display}
          </h1>
          <p className="font-mono text-xs tracking-ultra text-bone-faint uppercase mb-8">
            {personal.role}
          </p>
          <button
            onClick={handleEnter}
            className="group relative font-mono text-sm tracking-ultra uppercase text-bone border border-bone-faint/30 px-8 py-3 hover:border-blood hover:text-blood transition-all duration-300"
          >
            <span className="relative z-10">ENTER</span>
            <span className="absolute inset-0 bg-blood/0 group-hover:bg-blood/10 transition-colors duration-300" />
          </button>
        </div>
      )}
    </div>
  );
}
