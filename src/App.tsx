import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Check } from 'lucide-react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import BottomNav from './components/BottomNav';
import BackgroundMedia from './components/BackgroundMedia';

type Tab = 'portfolio' | 'customPricing' | 'photoEdits' | 'moreEdits' | 'designWork' | 'about';

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

const MORE_EDIT_FILES = [
  '0f4d6feb-584d-4056-85c0-e50146ba05bc.jpeg',
  '1 (1).png',
  '6802513b-278d-419c-aca6-42b47f9e3222.jpeg',
  '8d9e8f95-ff22-41f1-8ce7-ac5f17c693eb.jpg',
  '8q631cuib27h1.jpg',
  'a60b1564-39f3-4e20-a7ff-13e4fb00e6a2 (1).png',
  'a814ccc8-ae7b-44a1-bcef-ace09162a413.png',
  'b9975e70-ac9a-4210-97ae-fd9e254ddaec.jpeg',
  'bd24a0cp1ed8h1.jpg',
  'Beige Minimalist Before After Hair Salon Instagram Post (4).png',
  'Beige Minimalist Before After Hair Salon Instagram Post.png',
  'catedited11.jpg',
  'edited fixx.jpg',
  'fixed1.jpg',
  'fixededit (1).jpg',
  'hairedt11.png',
  'IMG_6500~6 (1) (2).jpg',
  'oldimage.jpg',
  'Remove background project - 04 June 2026 at 10.40.08.png',
] as const;

const AMORE_EDIT_FILES = [
  '06c92a81-0f80-451e-8df7-55c89a5c1a81.png',
  '07e161e0-b0e0-498a-b536-1da4ee1678bb.png',
  '097ed45b70a443b1b8661ab252581dd5.jpeg',
  '0b3b0825497e1d8884b5cb9a0d5d866c.jpg',
  '0f4d6feb-584d-4056-85c0-e50146ba05bc (1).jpeg',
  '1aba98bc-fc32-4b03-9af0-2aba988f9642.png',
  '1ed0a11c-702a-4b52-964a-94eaa1b82c51.png',
  '28167d1c-6f1d-4a28-a9d2-e63102781ff9.jpeg',
  '2d9bc8af4de43d2a196011c1487ed1f8.png',
  '2nd.jpeg',
  '3443be0b2eba4005bcd824d55b0350ed.png',
  '3rd1.jpg',
  '5341e7c5-1f61-43a7-826e-15f87afc94ce.png',
  '5b50034d-b676-4f19-94ec-2ee8ea9e79bd.png',
  '5fc7ae8c0f95403ba40c1fcda3f03959.jpeg',
  '5jzxqn96f9wg1.jpg',
  '61654d83-4637-498d-8039-d9c9c45434da.jpg',
  '6802513b-278d-419c-aca6-42b47f9e3222 (1).jpeg',
  '6eeb491611bfc2e63bdab7c5143b03ae.jpg',
  '73cc8a1d-2ccc-49ad-ab40-3fc5a6b1c15b.png',
  '76953af9-15e9-4849-bba4-da4ce6bf62bb.png',
  '786fce8d9a00a2977cbf7fc354f7bde9.png',
  '79c5e658-dfe9-4129-bc7b-b77d0553c6bf.png',
  '7c25a4eff8d5280d3a0b0cea2dd0545a.jpg',
  '865bf4cfad074588b63ab15e63b6211b.jpeg',
  '86995ca6-2f90-41c6-b4f2-0b1084853f7f (1).jpeg',
  '882aef6d-0e28-41bf-8b83-8cab58dc271b.jpg',
  '8d549cfcbb167d7747095aeffc5df29f.jpg',
  '9cc51698-4cbc-488c-99a4-f41f24bd85a1.png',
  'a3b1462a-45ba-40af-aad1-6778feb36b36 (1).jpeg',
  'c3b48c36-5f4a-4789-bb53-f0a59b00d155.png',
  'd2cfcfa6-1429-4067-a50e-d43eeb33041d (1).jpeg',
  'd9mbdw4hmkxg1.png',
  'Design25.png',
  'HouseColorDesign.png',
  'weq8wu5rzyug1.jpg',
] as const;

const MORE_EDIT_ITEMS = [
  ...MORE_EDIT_FILES.map((file) => ({ file, folder: 'more images' })),
  ...AMORE_EDIT_FILES.map((file) => ({ file, folder: 'amore' })),
];

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

function webpPath(src: string): string {
  return src.replace(/\.(png|jpe?g)$/i, '.webp');
}

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('portfolio');
  const [hiddenFiles, setHiddenFiles] = useState<Set<string>>(new Set());

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
                { tier: 'Express delivery', price: '$15 - $25', note: 'Fast turnaround for urgent edits with priority scheduling.' },
                { tier: 'Batch edits', price: '$12 - $18 per image', note: 'Consistent styling and cleanup for multiple images in one project.' },
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
                        decoding="async"
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
      case 'moreEdits':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="relative z-10 pt-32 pb-32 px-6 max-w-6xl mx-auto"
          >
            <div className="text-center mb-16">
              <h2 className="font-headline text-5xl md:text-6xl mb-4 italic">More Edits</h2>
              <p className="text-on-surface-variant/80 max-w-2xl mx-auto">Additional creative enhancements for portraits, products, and social content that need a polished, premium finish.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {MORE_EDIT_ITEMS.filter(({ file, folder }) => !hiddenFiles.has(`${folder}/${file}`)).map(({ file, folder }, idx) => {
                const title = titleFromImageFile(file);
                const imagePath = `/images/${encodeURIComponent(folder)}/${encodeURIComponent(file)}`;
                const imageKey = `${folder}/${file}`;
                return (
                  <motion.div
                    key={imageKey}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: Math.min(idx * 0.03, 0.3) }}
                    className="group relative liquid-glass rounded-2xl overflow-hidden border border-white/5"
                  >
                    <div className="relative flex items-center justify-center bg-black/10 px-3 py-4 sm:px-4 sm:py-5">
                      <img
                        src={imagePath}
                        alt={title}
                        className="block h-auto max-h-[min(70vh,420px)] w-auto max-w-full object-contain object-center"
                        loading="lazy"
                        decoding="async"
                        onError={() => setHiddenFiles((set) => new Set(set).add(imageKey))}
                      />
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
                        decoding="async"
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
            className="relative z-10 pt-40 pb-32 px-6 max-w-4xl mx-auto"
          >
            <div className="flex flex-col items-center text-center">
              <span className="text-xs uppercase tracking-[0.3em] text-white/50 mb-6">About the artist</span>
              <h2 
                className="text-6xl md:text-7xl mb-8 tracking-tight text-white"
                style={{ fontFamily: "'Instrument Serif', serif" }}
              >
                Crafting visual <em className="not-italic text-white/60">authenticity.</em>
              </h2>
              
              <div className="space-y-6 max-w-2xl mx-auto mb-20">
                <p className="text-white/80 leading-relaxed text-lg font-light">
                  I am a dedicated image editor and designer working at the intersection of precision and natural beauty. My approach is rooted in the belief that the best edits are the ones you can't see.
                </p>
                <p className="text-white/60 leading-relaxed text-base font-light">
                  Whether it's restoring a faded memory, removing distractions from a perfect shot, or designing clean, minimal branding, my goal is to enhance the essence of every visual I touch—ensuring the final result feels both professional and profoundly authentic.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full mb-24">
                {[
                  'Subtle, realistic enhancements',
                  'Meticulous attention to detail',
                  'Preservation of original textures',
                  'Modern, minimal design aesthetics'
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 p-5 liquid-glass rounded-2xl text-left border border-white/5">
                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-sm font-medium tracking-wide text-white/90">{item}</span>
                  </div>
                ))}
              </div>

              {/* CTA Section */}
              <div className="w-full p-12 md:p-16 liquid-glass rounded-[2.5rem] border border-white/10 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />
                <h3 
                  className="text-5xl md:text-6xl mb-8 relative z-10 text-white tracking-tight"
                  style={{ fontFamily: "'Instrument Serif', serif" }}
                >
                  Let's create <em className="not-italic text-white/60">something.</em>
                </h3>
                <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
                  <button 
                    onClick={() => setActiveTab('customPricing')}
                    className="px-8 py-3.5 bg-white text-black font-semibold text-sm rounded-full hover:bg-white/90 transition-colors"
                  >
                    View Pricing
                  </button>
                  <a 
                    href="mailto:auxiyusufhasan@gmail.com"
                    className="px-8 py-3.5 liquid-glass border border-white/20 text-white font-medium text-sm rounded-full hover:bg-white/10 transition-colors inline-flex items-center justify-center"
                  >
                    Contact Me
                  </a>
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
