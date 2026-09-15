import React from 'react';
import {
  Home,
  Grid,
  Newspaper,
  TrendingUp,
  UserPlus,
  ShieldCheck,
  Layers
} from 'lucide-react';
import { useApp, AppSection } from '../context/AppContext';

export const BottomNav: React.FC = () => {
  const { activeSection, setActiveSection, user } = useApp();

  const navItems: { id: AppSection; label: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'projects', label: 'Projects', icon: Layers },
    { id: 'news', label: 'News', icon: Newspaper },
    ...(user.role === 'admin'
      ? [{ id: 'admin' as AppSection, label: 'Admin', icon: ShieldCheck }]
      : [{ id: 'investment' as AppSection, label: 'Invest', icon: TrendingUp }]),
    { id: 'invite', label: 'Invite', icon: UserPlus }
  ];

  const handleSelect = (id: AppSection) => {
    setActiveSection(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed bottom-0 inset-x-0 z-40 lg:hidden bg-white/95 backdrop-blur-md border-t border-slate-200/80 px-2 py-1.5 shadow-lg safe-area-bottom">
      <nav className="flex items-center justify-around max-w-md mx-auto">
        {navItems.map(item => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleSelect(item.id)}
              className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all duration-200 min-w-[58px] ${
                isActive
                  ? 'text-blue-600 font-bold scale-105'
                  : 'text-slate-600 hover:text-slate-800 font-medium'
              }`}
              aria-label={item.label}
            >
              <div className={`relative p-1 rounded-lg transition-colors ${isActive ? 'bg-blue-50 text-blue-600' : ''}`}>
                <Icon className="w-5 h-5" />
                {isActive && (
                  <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                )}
              </div>
              <span className={`text-[10px] mt-0.5 tracking-tight ${isActive ? 'font-bold text-blue-600' : 'text-slate-600'}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};
