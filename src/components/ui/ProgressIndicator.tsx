import { chapters } from '@/data/portfolioData';

export function ProgressIndicator({ activeChapter, progress }: { activeChapter: number; progress: number }) {
  return (
    <div className="fixed right-4 md:right-6 top-1/2 -translate-y-1/2 z-40 flex flex-col items-center gap-3">
      {chapters.map((ch, i) => {
        const isActive = i === activeChapter;
        const isPast = i < activeChapter;
        return (
          <div key={i} className="group flex flex-col items-center gap-1.5">
            <span
              className={`font-mono text-[8px] tracking-widest transition-colors duration-300 ${
                isActive ? 'text-blood' : isPast ? 'text-bone-dim' : 'text-bone-faint/40'
              }`}
            >
              {ch.id}
            </span>
            <div
              className={`rounded-full transition-all duration-300 ${
                isActive
                  ? 'w-2 h-2 bg-blood'
                  : isPast
                  ? 'w-1.5 h-1.5 bg-bone-dim'
                  : 'w-1 h-1 bg-bone-faint/30'
              }`}
            />
          </div>
        );
      })}
      {/* Progress bar */}
      <div className="mt-3 w-px h-16 bg-bone-faint/20 relative overflow-hidden">
        <div
          className="absolute top-0 left-0 w-full bg-blood transition-transform duration-100"
          style={{ height: '100%', transform: `scaleY(${progress})`, transformOrigin: 'top' }}
        />
      </div>
    </div>
  );
}
