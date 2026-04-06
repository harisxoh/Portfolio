import { Menu } from 'lucide-react';
import { motion } from 'motion/react';

interface NavbarProps {
  onBegin: (tab: 'portfolio' | 'customPricing' | 'photoEdits' | 'designWork' | 'about') => void;
}

export default function Navbar({ onBegin }: NavbarProps) {
  return (
    <header className="fixed top-0 w-full z-50 bg-sky-950/70 backdrop-blur-xl flex justify-between items-center px-6 py-4 shadow-[0_40px_40px_-15px_rgba(0,16,27,0.06)]">
      <div className="flex items-center gap-4">
        <Menu className="w-6 h-6 text-slate-300 cursor-pointer hover:text-white transition-colors" />
        <h1 className="font-headline text-2xl italic text-slate-100 tracking-tight select-none">Haris</h1>
      </div>
      
      <nav className="hidden md:flex gap-8 items-center">
        {[
          { label: 'Portfolio', id: 'portfolio' },
          { label: 'Pricing', id: 'customPricing' },
          { label: 'Services', id: 'photoEdits' },
          { label: 'About', id: 'about' }
        ].map((item, idx) => (
          <a
            key={item.id}
            href="#"
            onClick={(e) => { e.preventDefault(); onBegin(item.id as any); }}
            className={`font-sans uppercase tracking-[0.05em] text-xs font-bold px-3 py-1 transition-colors duration-300 rounded hover:bg-white/10 ${
              idx === 0 ? 'text-slate-100' : 'text-slate-400'
            }`}
          >
            {item.label}
          </a>
        ))}
      </nav>

      <div className="flex items-center gap-2">
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => onBegin('customPricing')}
          className="liquid-glass px-4 py-2 rounded-full font-sans uppercase tracking-[0.05em] text-xs font-semibold text-slate-100/90 hover:text-slate-100 transition-colors"
        >
          Custom Pricing
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => onBegin('portfolio')}
          className="liquid-glass px-5 py-2 rounded-full font-sans uppercase tracking-[0.05em] text-xs font-semibold text-slate-100"
        >
          View My Work
        </motion.button>
      </div>
    </header>
  );
}
