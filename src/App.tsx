import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Check } from 'lucide-react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import BottomNav from './components/BottomNav';
import BackgroundMedia from './components/BackgroundMedia';

type Tab = 'portfolio' | 'customPricing' | 'photoEdits' | 'designWork' | 'about';

/** Images in public/images — order is preserved in the Photo Edits gallery. */
const PHOTO_EDIT_FILES = [
  'AddPerson.png',
  'BgChange.png',
  'BgChange2.png',
  'BirthdayEdit.png',
  'CustomTshirt.png',
  'DressChange.png',
  'headshot1.png',
  'Headshot3.png',
  'imageEnhance.png',
  'ImgEnhance.png',
  'LowPolly.png',
  'PeopleRemoval.png',
  'PizzaLog.png',
  'Restoration1.png',
  'Restoration2.png',
  'Restoration3.png',
  'Upscale.png',
] as const;

/** Images in public/design — order is preserved in the Design Work gallery. */
const DESIGN_WORK_FILES = [
  'AppLog.png',
  'AppVar.png',
  'AvatarDesign.jpeg',
  'BookLog.png',
  'CustomEdit.jpg',
  'CustomFix.png',
  'DinoLog.png',
  'elementsEdit.png',
  'IcecreamLog.png',
  'PizzaLog.jpeg',
  'PizzaLog1.jpg',
  'PokemonBack.png',
  'PokemonFront.png',
  'SpotifyLog.jpeg',
  'SpotifyLog2.jpeg',
  'Tattoo1.png',
  'TattooVar.webp',
  'tavern.png',
  'TshirtDesign.jpeg',
] as const;

function titleFromImageFile(filename: string): string {
  const base = filename.replace(/\.[^.]+$/, '');
  const spaced = base
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/([A-Za-z])(\d)/g, '$1 $2')
    .replace(/(\d)([A-Za-z])/g, '$1 $2');
  return spaced
    .split(/[\s_]+/)
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(' ');
}

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('portfolio');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [activeTab]);

  const renderContent = () => {
    switch (activeTab) {
      case 'portfolio':
        return (
          <Hero
            onBegin={() => setActiveTab('photoEdits')}
            onPricing={() => setActiveTab('customPricing')}
          />
        );
      case 'customPricing':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="relative z-10 pt-32 pb-32 px-6 max-w-6xl mx-auto"
          >
            <div className="text-center mb-16">
              <h2 className="font-headline text-5xl md:text-6xl mb-4 italic">Custom Pricing</h2>
              <p className="text-on-surface-variant/80 max-w-2xl mx-auto">
                Clear, flexible rates based on complexity and project scope.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                { tier: 'Basic edits', price: '$5 - $10', note: 'Quick touch-ups, small corrections, and clean enhancements.' },
                { tier: 'Headshots / detailed edits', price: '$10 - $20', note: 'Natural retouching, detail work, and professional profile polishing.' },
                { tier: 'Complex edits', price: '$20+', note: 'Advanced composites, object/person changes, and high-complexity requests.' },
                { tier: 'Logo/UI design', price: '$25 - $60+', note: 'Branding and interface design, priced by scope and revision needs.' },
              ].map((item, idx) => (
                <motion.div
                  key={item.tier}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.08 }}
                  className="liquid-glass p-8 rounded-3xl border border-white/10 relative overflow-hidden"
                >
                  <div className="absolute -top-16 -right-16 w-36 h-36 bg-tertiary/10 blur-3xl rounded-full" />
                  <p className="text-[10px] uppercase tracking-[0.25em] text-on-surface-variant/50 mb-3 relative z-10">
                    Pricing Tier
                  </p>
                  <h3 className="text-2xl md:text-3xl font-headline italic mb-3 relative z-10">{item.tier}</h3>
                  <p className="text-3xl md:text-4xl font-headline italic text-tertiary mb-4 relative z-10">{item.price}</p>
                  <p className="text-sm text-on-surface-variant/75 leading-relaxed relative z-10">{item.note}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        );
      case 'photoEdits':
        return (
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: -20 }}
            className="relative z-10 pt-32 pb-32 px-6 max-w-7xl mx-auto"
          >
            <div className="text-center mb-16">
              <h2 className="font-headline text-5xl md:text-6xl mb-4 italic">Photo Editing Portfolio</h2>
              <p className="text-on-surface-variant/80 max-w-2xl mx-auto">High-end retouching and restoration with a focus on natural textures and realistic results.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {PHOTO_EDIT_FILES.map((file, idx) => {
                const title = titleFromImageFile(file);
                return (
                  <motion.div
                    key={file}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: Math.min(idx * 0.05, 0.4) }}
                    className="group relative liquid-glass rounded-2xl overflow-hidden border border-white/5"
                  >
                    <div className="relative flex items-center justify-center bg-black/10 px-3 py-4 sm:px-4 sm:py-5">
                      <img
                        src={`/images/${file}`}
                        alt={title}
                        className="block h-auto max-h-[min(70vh,560px)] w-auto max-w-full object-contain object-center"
                        loading="lazy"
                      />
                      <div className="pointer-events-none absolute top-4 left-4 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-[10px] uppercase tracking-widest max-w-[calc(100%-2rem)] truncate">
                        {file.replace(/\.[^.]+$/, '')}
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-headline italic mb-1">{title}</h3>
                      <p className="text-[10px] uppercase tracking-widest text-on-surface-variant/50 font-mono">
                        {file}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Services Section */}
            <div className="mt-32">
              <div className="text-center mb-16">
                <h2 className="font-headline text-4xl md:text-5xl mb-4 italic">Services</h2>
                <div className="w-24 h-px bg-tertiary/30 mx-auto" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="liquid-glass p-8 rounded-3xl border border-white/5">
                  <h3 className="text-2xl font-headline italic mb-6 text-tertiary">Image Editing</h3>
                  <ul className="space-y-4">
                    {[
                      'Professional headshots (LinkedIn, corporate, etc.)',
                      'Background removal & replacement',
                      'Lighting, color correction & enhancement',
                      'Natural skin retouching (no plastic look)',
                      'Object/person removal',
                      'Old photo restoration & upscaling',
                      'Custom edits based on request'
                    ].map((service, i) => (
                      <li key={i} className="flex items-start gap-3 text-on-surface-variant/80">
                        <Check className="w-4 h-4 mt-1 text-tertiary" />
                        <span>{service}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="space-y-8">
                  <div className="liquid-glass p-8 rounded-3xl border border-white/5">
                    <h3 className="text-2xl font-headline italic mb-4 text-tertiary">Pricing</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center border-b border-white/10 pb-2">
                        <span className="text-sm uppercase tracking-widest">Basic</span>
                        <span className="font-headline text-xl">$5 – $10</span>
                      </div>
                      <div className="flex justify-between items-center border-b border-white/10 pb-2">
                        <span className="text-sm uppercase tracking-widest">Standard</span>
                        <span className="font-headline text-xl">$10 – $20</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm uppercase tracking-widest">Premium</span>
                        <span className="font-headline text-xl">$20+</span>
                      </div>
                    </div>
                  </div>
                  <div className="liquid-glass p-8 rounded-3xl border border-white/5">
                    <h3 className="text-xl font-headline italic mb-4">Our Approach</h3>
                    <ul className="space-y-3">
                      {['Natural, realistic edits', 'High attention to detail', 'Preserves original identity'].map((item, i) => (
                        <li key={i} className="flex items-center gap-2 text-xs uppercase tracking-widest opacity-60">
                          <Check className="w-3 h-3 text-tertiary" /> {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        );
      case 'designWork':
        return (
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: -20 }}
            className="relative z-10 pt-32 pb-32 px-6 max-w-7xl mx-auto"
          >
            <div className="text-center mb-16">
              <h2 className="font-headline text-5xl md:text-6xl mb-4 italic">Design Work</h2>
              <p className="text-on-surface-variant/80 max-w-2xl mx-auto">Modern, minimal, and user-focused design solutions for brands and applications.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {DESIGN_WORK_FILES.map((file, idx) => {
                const title = titleFromImageFile(file);
                return (
                  <motion.div
                    key={file}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: Math.min(idx * 0.05, 0.4) }}
                    className="group relative liquid-glass rounded-2xl overflow-hidden border border-white/5"
                  >
                    <div className="relative flex items-center justify-center bg-black/10 px-3 py-4 sm:px-4 sm:py-5">
                      <img
                        src={`/design/${file}`}
                        alt={title}
                        className="block h-auto max-h-[min(70vh,560px)] w-auto max-w-full object-contain object-center"
                        loading="lazy"
                      />
                      <div className="pointer-events-none absolute top-4 left-4 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-[10px] uppercase tracking-widest max-w-[calc(100%-2rem)] truncate">
                        {file.replace(/\.[^.]+$/, '')}
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-headline italic mb-1">{title}</h3>
                      <p className="text-[10px] uppercase tracking-widest text-on-surface-variant/50 font-mono">
                        {file}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <div className="mt-24 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="liquid-glass p-10 rounded-3xl border border-white/5">
                <h3 className="text-3xl font-headline italic mb-6 text-tertiary">Design Services</h3>
                <ul className="space-y-4">
                  {[
                    'Logo design (modern, minimal, brand-ready)',
                    'App UI/UX design (clean, user-focused)',
                    'Consistent branding across designs',
                    'Previous client work in the $50+ range'
                  ].map((service, i) => (
                    <li key={i} className="flex items-start gap-3 text-on-surface-variant/80">
                      <Check className="w-4 h-4 mt-1 text-tertiary" />
                      <span>{service}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="liquid-glass p-10 rounded-3xl border border-white/5 flex flex-col justify-center text-center">
                <span className="text-xs uppercase tracking-[0.3em] opacity-40 mb-2">Starting from</span>
                <h3 className="text-6xl font-headline italic mb-4">$25 – $60+</h3>
                <p className="text-xs uppercase tracking-widest opacity-60">Based on project scope and complexity</p>
              </div>
            </div>
          </motion.div>
        );
      case 'about':
        return (
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: -20 }}
            className="relative z-10 pt-32 pb-32 px-6 max-w-4xl mx-auto"
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-32 h-32 rounded-full border-2 border-tertiary p-1 mb-8">
                <img src="https://picsum.photos/seed/profile/400/400" alt="Profile" className="w-full h-full rounded-full object-cover grayscale" />
              </div>
              <h2 className="font-headline text-5xl mb-6 italic">The Visionary Behind the Lens</h2>
              <p className="text-on-surface-variant/80 leading-relaxed mb-12">
                I am a dedicated image editor and designer focused on the intersection of precision and natural beauty. My goal is to enhance the essence of every visual I touch, ensuring that the final result feels both professional and authentic.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full mb-24">
                {[
                  'Natural, realistic edits (not overdone)',
                  'High attention to detail',
                  'Preserves original textures & identity',
                  'Clean, modern design style'
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 p-4 liquid-glass rounded-xl text-left">
                    <Check className="w-5 h-5 text-tertiary" />
                    <span className="text-xs uppercase tracking-widest">{item}</span>
                  </div>
                ))}
              </div>

              {/* CTA Section */}
              <div className="w-full p-12 liquid-glass rounded-[3rem] border border-white/10 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-tertiary/10 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2" />
                <h3 className="text-4xl md:text-5xl font-headline italic mb-8 relative z-10">Ready to upgrade your images?</h3>
                <div className="flex flex-col md:flex-row gap-4 justify-center relative z-10">
                  <button className="px-10 py-4 bg-white text-surface font-bold uppercase tracking-widest text-xs rounded-full hover:bg-tertiary transition-colors">
                    Start a Project
                  </button>
                  <button className="px-10 py-4 liquid-glass border border-white/20 font-bold uppercase tracking-widest text-xs rounded-full hover:bg-white/10 transition-colors">
                    Contact Me
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="relative min-h-screen">
      <BackgroundMedia />
      <Navbar onBegin={(tab) => setActiveTab(tab)} />
      <AnimatePresence mode="wait">
        <div key={activeTab}>
          {renderContent()}
        </div>
      </AnimatePresence>
      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
}
