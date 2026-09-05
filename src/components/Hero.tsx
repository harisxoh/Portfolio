import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Instagram, Twitter, Globe, Mail } from 'lucide-react';

interface HeroProps {
  onBegin: () => void;
  onPricing: () => void;
}

export default function Hero({ onBegin, onPricing }: HeroProps) {
  const [showContact, setShowContact] = useState(false);

  return (
    <main className="relative z-10 flex flex-col min-h-screen">
      {/* ── Hero content area ── */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-5xl md:text-6xl lg:text-7xl text-white mb-8 tracking-tight whitespace-nowrap"
          style={{ fontFamily: "'Instrument Serif', serif" }}
        >
          Precision edits. Natural results.
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut', delay: 0.5 }}
          className="max-w-xl w-full space-y-6"
        >
          {/* Primary CTA — glass pill with arrow button */}
          <div className="flex items-center justify-center">
            <button
              onClick={onBegin}
              className="liquid-glass rounded-full pl-6 pr-2 py-2 flex items-center gap-3"
            >
              <span className="text-white text-base">View My Work</span>
              <span className="bg-white rounded-full p-3 text-black">
                <ArrowRight size={20} />
              </span>
            </button>
          </div>

          {/* Subtitle */}
          <p className="text-white text-sm leading-relaxed px-4">
            I transform ordinary images into clean, professional visuals
            without losing their identity. High-end retouching, restoration,
            and design — all with a focus on natural, authentic results.
          </p>

          {/* Secondary CTAs */}
          <div className="flex flex-col items-center gap-4">
            <button
              onClick={onPricing}
              className="liquid-glass rounded-full px-8 py-3 text-white text-sm font-medium hover:bg-white/5 transition-colors"
            >
              Custom Pricing
            </button>

            <div className="relative">
              <AnimatePresence mode="wait">
                {!showContact ? (
                  <motion.button
                    key="contact-btn"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    onClick={() => setShowContact(true)}
                    className="liquid-glass rounded-full px-8 py-3 text-white/80 text-sm font-medium hover:bg-white/5 transition-colors"
                  >
                    Contact Me
                  </motion.button>
                ) : (
                  <motion.div
                    key="contact-options"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex items-center gap-3"
                  >
                    <a
                      href="https://www.reddit.com/user/Designer_Diamond6327/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="liquid-glass rounded-full px-6 py-2.5 flex items-center gap-2 text-white/90 text-sm font-medium hover:text-white hover:bg-white/10 transition-all"
                    >
                      <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg"><path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.505 1.12-1.036 3.107-1.638 5.166-1.644l.926-4.321c.03-.139.155-.231.298-.216l3.393.717a1.264 1.264 0 0 1 1.238-.909L17.01 4.745zm-9.255 7.424c-.752 0-1.365.613-1.365 1.365 0 .753.613 1.365 1.365 1.365.753 0 1.365-.612 1.365-1.365 0-.752-.612-1.365-1.365-1.365zm8.49 0c-.753 0-1.365.613-1.365 1.365 0 .753.613 1.365 1.365 1.365.752 0 1.365-.612 1.365-1.365 0-.752-.613-1.365-1.365-1.365zm-4.245 4.316c-1.572 0-2.83-.81-2.83-.81-.22-.162-.27-.473-.109-.693.161-.22.472-.27.693-.109 0 0 1.01.626 2.246.626 1.236 0 2.245-.626 2.245-.626.221-.16.533-.11.694.11.161.22.11.531-.11.692 0 0-1.258.81-2.83.81z"/></svg>
                      Reddit
                    </a>
                    <a
                      href="mailto:auxiyusufhasan@gmail.com"
                      className="liquid-glass rounded-full px-6 py-2.5 flex items-center gap-2 text-white/90 text-sm font-medium hover:text-white hover:bg-white/10 transition-all"
                    >
                      <Mail size={16} />
                      Email
                    </a>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ── Social icons footer ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="flex justify-center gap-4 pb-24 md:pb-12"
      >
        {[
          { icon: Instagram, label: 'Instagram' },
          { icon: Twitter, label: 'Twitter' },
          { icon: Globe, label: 'Website' },
        ].map(({ icon: Icon, label }) => (
          <button
            key={label}
            className="liquid-glass rounded-full p-4 text-white/80 hover:text-white hover:bg-white/5 transition-all"
            aria-label={label}
          >
            <Icon size={20} />
          </button>
        ))}
      </motion.div>
    </main>
  );
}
