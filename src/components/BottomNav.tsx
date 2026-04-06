import { Compass, Camera, Sparkles, User, BadgeDollarSign } from 'lucide-react';

type Tab = 'portfolio' | 'customPricing' | 'photoEdits' | 'designWork' | 'about';

interface BottomNavProps {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
}

export default function BottomNav({ activeTab, setActiveTab }: BottomNavProps) {
  const navItems: { icon: any; label: string; id: Tab }[] = [
    { icon: Compass, label: 'Portfolio', id: 'portfolio' },
    { icon: BadgeDollarSign, label: 'Pricing', id: 'customPricing' },
    { icon: Camera, label: 'Photo Edits', id: 'photoEdits' },
    { icon: Sparkles, label: 'Design Work', id: 'designWork' },
    { icon: User, label: 'About', id: 'about' },
  ];

  return (
    <footer className="fixed bottom-0 left-0 w-full flex justify-around items-center px-4 pb-6 pt-2 bg-sky-950/30 backdrop-blur-md z-50 border-t border-white/5 md:bg-transparent md:border-none md:pointer-events-none">
      {navItems.map((item) => (
        <div 
          key={item.id}
          onClick={() => setActiveTab(item.id)}
          className={`flex flex-col items-center justify-center p-3 transition-all cursor-pointer md:pointer-events-auto ${
            activeTab === item.id 
              ? 'bg-white/10 text-white rounded-full scale-90' 
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <item.icon className="w-6 h-6" />
          <span className="font-sans text-[10px] uppercase tracking-widest mt-1">{item.label}</span>
        </div>
      ))}
    </footer>
  );
}
