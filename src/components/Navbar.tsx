import { ArrowUpRight, Leaf } from 'lucide-react';

export type Tab = 'portfolio' | 'customPricing' | 'photoEdits' | 'designWork' | 'about' | 'contact';

interface NavbarProps { activeTab: Tab; onBegin: (tab: Tab) => void }

const items: { label: string; id: Tab }[] = [
  { label: 'Home', id: 'portfolio' },
  { label: 'Photo edits', id: 'photoEdits' },
  { label: 'Design', id: 'designWork' },
  { label: 'Pricing', id: 'customPricing' },
  { label: 'About', id: 'about' },
];

export default function Navbar({ activeTab, onBegin }: NavbarProps) {
  return (
    <header className="site-header">
      <nav className="site-nav" aria-label="Main navigation">
        <button className="brand" onClick={() => onBegin('portfolio')} aria-label="Haris home">
          <span className="brand-mark"><Leaf size={20} /></span><span>Haris<span className="brand-dot">.</span></span>
        </button>
        <div className="nav-links">
          {items.map((item) => (
            <button key={item.id} onClick={() => onBegin(item.id)} className={activeTab === item.id ? 'nav-link active' : 'nav-link'}>
              {item.label}
            </button>
          ))}
        </div>
        <button className="contact-button" onClick={() => onBegin('contact')}>Let’s talk <ArrowUpRight size={15} /></button>
      </nav>
    </header>
  );
}
