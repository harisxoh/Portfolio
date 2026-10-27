import { useEffect, useRef, type PointerEvent } from 'react';
import { ArrowDownRight, ArrowRight, Heart } from 'lucide-react';
import { motion } from 'motion/react';
import type { Tab } from './Navbar';

interface HeroProps { onBegin: (tab?: Tab) => void; onPricing: () => void }

const projects = [
  { src: '/images/Restoration1.webp', title: 'Photo restoration', tab: 'photoEdits' as Tab },
  { src: '/design/SpotifyLog.webp', title: 'Logo design', tab: 'designWork' as Tab },
  { src: '/images/Upscale.webp', title: 'Image enhancement', tab: 'photoEdits' as Tab },
  { src: '/design/TshirtDesign.webp', title: 'Apparel design', tab: 'designWork' as Tab },
  { src: '/images/BgChange.webp', title: 'Background editing', tab: 'photoEdits' as Tab },
  { src: '/design/PizzaLog.webp', title: 'Brand identity', tab: 'designWork' as Tab },
  { src: '/images/PeopleRemoval.webp', title: 'Clean retouching', tab: 'photoEdits' as Tab },
  { src: '/images/BgChange2.webp', title: 'A new backdrop', tab: 'photoEdits' as Tab },
  { src: '/images/BirthdayEdit.webp', title: 'A moment, restored', tab: 'photoEdits' as Tab },
  { src: '/images/DressChange.webp', title: 'Portrait editing', tab: 'photoEdits' as Tab },
  { src: '/images/headshot1.webp', title: 'Natural headshot retouch', tab: 'photoEdits' as Tab },
  { src: '/images/Headshot3.webp', title: 'Professional portrait', tab: 'photoEdits' as Tab },
  { src: '/images/imageEnhance.webp', title: 'Photo enhancement', tab: 'photoEdits' as Tab },
  { src: '/images/AddPerson.webp', title: 'Custom photo edit', tab: 'photoEdits' as Tab },
  { src: '/images/more%20images/Beige%20Minimalist%20Before%20After%20Hair%20Salon%20Instagram%20Post.webp', title: 'Hair transformation', tab: 'photoEdits' as Tab },
  { src: '/images/more%20images/catedited11.webp', title: 'Pet photo edit', tab: 'photoEdits' as Tab },
  { src: '/images/more%20images/edited%20fixx.webp', title: 'Portrait retouch', tab: 'photoEdits' as Tab },
  { src: '/images/more%20images/fixededit%20(1).webp', title: 'Photo cleanup', tab: 'photoEdits' as Tab },
  { src: '/images/more%20images/hairedt11.webp', title: 'Hair retouching', tab: 'photoEdits' as Tab },
  { src: '/images/more%20images/oldimage.webp', title: 'Photo restoration', tab: 'photoEdits' as Tab },
];

export default function Hero({ onBegin, onPricing }: HeroProps) {
  const cards = [...projects, ...projects];
  const reelRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef(0);
  const velocityRef = useRef(0);
  const dragRef = useRef<{ pointerId: number; startX: number; lastX: number; lastTime: number; startOffset: number } | null>(null);
  const draggedRef = useRef(false);

  useEffect(() => {
    let frame = 0;
    let lastFrame = performance.now();
    const tick = (now: number) => {
      const track = trackRef.current;
      if (track) {
        const dt = Math.min(now - lastFrame, 40);
        const groupWidth = track.scrollWidth / 2;
        if (groupWidth > 0) {
          if (!dragRef.current) {
            velocityRef.current *= Math.exp(-dt / 260);
            if (Math.abs(velocityRef.current) < .015) velocityRef.current = 0;
            offsetRef.current += (22 + velocityRef.current) * dt / 1000;
          }
          while (offsetRef.current >= 0) offsetRef.current -= groupWidth;
          while (offsetRef.current < -groupWidth) offsetRef.current += groupWidth;
          track.style.transform = `translate3d(${offsetRef.current}px, 0, 0)`;
        }
      }
      lastFrame = now;
      frame = requestAnimationFrame(tick);
    };
    const firstFrame = requestAnimationFrame((now) => {
      if (trackRef.current) offsetRef.current = -(trackRef.current.scrollWidth / 2);
      lastFrame = now;
      tick(now);
    });
    return () => { cancelAnimationFrame(firstFrame); cancelAnimationFrame(frame); };
  }, []);

  const startDrag = (event: PointerEvent<HTMLDivElement>) => {
    if (event.button !== 0) return;
    if (event.target instanceof HTMLElement) event.target.setPointerCapture(event.pointerId);
    dragRef.current = { pointerId: event.pointerId, startX: event.clientX, lastX: event.clientX, lastTime: performance.now(), startOffset: offsetRef.current };
    velocityRef.current = 0;
  };
  const moveDrag = (event: PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;
    const now = performance.now();
    const dx = event.clientX - drag.startX;
    if (Math.abs(dx) > 6) draggedRef.current = true;
    offsetRef.current = drag.startOffset + dx;
    const elapsed = Math.max(now - drag.lastTime, 1);
    velocityRef.current = (event.clientX - drag.lastX) / elapsed;
    drag.lastX = event.clientX;
    drag.lastTime = now;
  };
  const endDrag = (event: PointerEvent<HTMLDivElement>) => {
    if (dragRef.current?.pointerId !== event.pointerId) return;
    dragRef.current = null;
    if (draggedRef.current) window.setTimeout(() => { draggedRef.current = false; }, 0);
  };

  return (
    <main className="reel-home">
      <section className="reel-intro">
        <motion.div className="reel-copy" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .65 }}>
          <div className="reel-badge"><Heart size={13} /> Independent editor & designer</div>
          <h1>Making your ideas<br />look their best.</h1>
          <p>From natural photo edits to fresh design work, I help good ideas show up at their best.</p>
        </motion.div>
        <span className="reel-doodle-slashes" aria-hidden="true">//</span>
        <div className="reel-handnote" aria-hidden="true">Natural, just refined <ArrowDownRight size={38} /></div>
      </section>

      <section ref={reelRef} className="portfolio-reel" aria-label="Selected portfolio work. Drag left or right to browse."
        onPointerDown={startDrag} onPointerMove={moveDrag} onPointerUp={endDrag} onPointerCancel={endDrag}>
        <div ref={trackRef} className="reel-track">
          {cards.map((project, index) => (
            <button key={`${project.title}-${index}`} className={`reel-card reel-card-${index % 7}`} onClick={() => {
              if (draggedRef.current) { draggedRef.current = false; return; }
              onBegin(project.tab);
            }} aria-label={`View ${project.title}`}>
              <img src={project.src} alt={project.title} loading={index < 7 ? 'eager' : 'lazy'} decoding="async" fetchPriority={index < 7 ? 'high' : 'auto'} draggable={false} />
            </button>
          ))}
        </div>
      </section>

      <div className="reel-bottom">
        <button className="reel-main-cta" onClick={() => onBegin()}>Explore my work <ArrowRight size={16} /></button>
        <button className="reel-secondary" onClick={onPricing}>Check pricing <ArrowRight size={13} /></button>
      </div>
    </main>
  );
}
