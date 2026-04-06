import { motion } from 'motion/react';

interface HeroProps {
  onBegin: () => void;
  onPricing: () => void;
}

export default function Hero({ onBegin, onPricing }: HeroProps) {
  return (
    <main className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center px-6 md:px-0">
      <div className="max-w-4xl space-y-8">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="font-headline text-5xl md:text-7xl leading-tight"
        >
          Precision <em className="not-italic text-on-surface-variant/60">edits.</em> Natural <em className="not-italic text-on-surface-variant/60">results.</em>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
          className="font-body text-lg md:text-xl text-on-surface-variant/80 max-w-2xl mx-auto leading-relaxed"
        >
          I transform ordinary images into clean, professional visuals without losing their identity.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.8 }}
          className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button
            onClick={onPricing}
            className="liquid-glass px-10 py-4 rounded-full font-sans uppercase tracking-[0.1em] text-sm font-bold text-white/90 transition-all duration-500 hover:tracking-[0.2em] hover:text-white"
          >
            Custom Pricing
          </button>
          <button
            onClick={onBegin}
            className="liquid-glass px-14 py-4 rounded-full font-sans uppercase tracking-[0.1em] text-sm font-bold text-white transition-all duration-500 hover:tracking-[0.2em]"
          >
            View My Work
          </button>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-40 hover:opacity-100 transition-opacity">
        <span className="font-label text-[10px] uppercase tracking-widest">Experience depth</span>
        <div className="w-px h-12 bg-gradient-to-b from-on-surface to-transparent"></div>
      </div>
    </main>
  );
}
