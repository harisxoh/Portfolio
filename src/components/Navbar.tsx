import { Globe } from 'lucide-react';
import { motion } from 'motion/react';

type Tab =
  | 'portfolio'
  | 'customPricing'
  | 'photoEdits'
  | 'moreEdits'
  | 'designWork'
  | 'about';

interface NavbarProps {
  onBegin: (tab: Tab) => void;
}

export default function Navbar({ onBegin }: NavbarProps) {
  return (
    <header className="fixed top-0 w-full z-50 px-6 py-4">
      <nav className="liquid-glass rounded-full px-6 py-3 flex items-center justify-between max-w-5xl mx-auto">
        {/* ── Logo ── */}
        <div className="flex items-center gap-2">
          <Globe size={24} className="text-white" />
          <span className="text-white font-semibold text-lg">Haris</span>
        </div>

        {/* ── Navigation links (desktop) ── */}
        <div className="hidden md:flex items-center gap-8">
          {([
            { label: 'Portfolio', id: 'portfolio' },
            { label: 'Pricing', id: 'customPricing' },
            { label: 'Services', id: 'photoEdits' },
            { label: 'About', id: 'about' },
          ] as const).map((item) => (
            <a
              key={item.id}
              href="#"
              onClick={(e) => {
                e.preventDefault();
                onBegin(item.id as Tab);
              }}
              className="text-white/80 hover:text-white transition-colors text-sm font-medium"
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* ── Right-side buttons ── */}
        <div className="flex items-center gap-4">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => onBegin('customPricing')}
            className="text-white text-sm font-medium hover:text-white/80 transition-colors hidden sm:block"
          >
            Custom Pricing
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => onBegin('portfolio')}
            className="liquid-glass rounded-full px-6 py-2 text-white text-sm font-medium"
          >
            View Work
          </motion.button>
        </div>
      </nav>
    </header>
  );
}
