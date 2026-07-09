import { Compass, Camera, Sparkles, User, BadgeDollarSign } from 'lucide-react';

type Tab = 'portfolio' | 'customPricing' | 'photoEdits' | 'moreEdits' | 'designWork' | 'about';

interface BottomNavProps {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
}

export default function BottomNav({ activeTab, setActiveTab }: BottomNavProps) {
  const navItems: { icon: any; label: string; id: Tab }[] = [
    { icon: Compass, label: 'Portfolio', id: 'portfolio' },
    { icon: BadgeDollarSign, label: 'Pricing', id: 'customPricing' },
    { icon: Camera, label: 'Photo Edits', id: 'photoEdits' },
    { icon: Sparkles, label: 'More Edits', id: 'moreEdits' },
    { icon: Sparkles, label: 'Design Work', id: 'designWork' },
    { icon: User, label: 'About', id: 'about' },
  ];

  return (
    <footer className="fixed bottom-0 left-0 w-full flex justify-around items-center px-4 pb-6 pt-2 bg-sky-950/60 backdrop-blur-xl z-50 border-t border-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] md:bg-transparent md:border-none md:pointer-events-none">
      {navItems.map((item) => (
        <div 
          key={item.id}
          onClick={() => setActiveTab(item.id)}
          className={`flex flex-col items-center justify-center p-3 rounded-3xl transition-all duration-300 cursor-pointer md:pointer-events-auto ${
            activeTab === item.id 
              ? 'bg-white/20 text-white ring-1 ring-white/20 shadow-[0_12px_30px_-18px_rgba(255,255,255,0.5)] scale-95' 
              : 'bg-slate-950/55 text-slate-100 hover:bg-white/10 hover:text-white'
          }`}
        >
          <item.icon className="w-6 h-6" />
          <span className="font-sans text-[10px] uppercase tracking-widest mt-1 drop-shadow-[0_1px_1px_rgba(0,0,0,0.35)]">{item.label}</span>
        </div>
      ))}
    </footer>
  );
}
