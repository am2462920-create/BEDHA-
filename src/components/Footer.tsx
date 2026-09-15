import React from 'react';
import {
  Youtube,
  Instagram,
  Twitter,
  Facebook,
  Send,
  Phone,
  Mail,
  MapPin,
  Sparkles,
  ShieldCheck,
  ArrowUpRight,
  Heart
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Footer: React.FC = () => {
  const { setActiveSection, setActiveProjectModal, projects } = useApp();

  const socialLinks = [
    { name: 'WhatsApp', href: 'https://wa.me/917029687893', icon: Phone, color: 'hover:text-emerald-400' },
    { name: 'Telegram', href: 'https://t.me/bedha_official', icon: Send, color: 'hover:text-sky-400' },
    { name: 'YouTube', href: 'https://youtube.com', icon: Youtube, color: 'hover:text-red-400' },
    { name: 'Instagram', href: 'https://instagram.com', icon: Instagram, color: 'hover:text-pink-400' },
    { name: 'Twitter/X', href: 'https://twitter.com', icon: Twitter, color: 'hover:text-blue-400' },
    { name: 'Facebook', href: 'https://facebook.com', icon: Facebook, color: 'hover:text-blue-500' }
  ];

  return (
    <footer className="w-full bg-slate-950 text-slate-300 border-t border-slate-800/80 pt-16 pb-24 lg:pb-16 relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-slate-800">
          {/* Col 1 & 2: Brand Identity & About */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white p-1 border border-slate-700 overflow-hidden flex items-center justify-center">
                <img
                  src="/assets/brand/bedha_logo.jpg"
                  alt="BEDHA Logo"
                  className="w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
              <span className="text-2xl font-black text-white tracking-wider font-heading">
                BEDHA
              </span>
            </div>

            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              BEDHA is a next-generation technology ecosystem engineering photonics,
              quantum silicon, humanoid robotics, smart city neural operating systems,
              and deep-space exploration platforms.
            </p>

            {/* Social Links Icons */}
            <div className="flex items-center gap-3 pt-2">
              {socialLinks.map(social => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 transition-colors ${social.color}`}
                    aria-label={social.name}
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Col 3: Core Ecosystem */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white font-tech mb-4">
              Core Initiatives
            </h4>
            <ul className="space-y-2.5 text-sm">
              {['Helium Flowzen X1', 'A1 Smartphone', 'My Play Store', 'Fangon Optics', 'HIMADRI Smart City', 'BEDHA Robotics'].map(name => {
                const match = projects.find(p => p.name.toLowerCase().includes(name.toLowerCase()));
                return (
                  <li key={name}>
                    <button
                      onClick={() => {
                        if (match) setActiveProjectModal(match);
                        else setActiveSection('projects');
                      }}
                      className="text-slate-400 hover:text-blue-400 transition-colors text-left flex items-center gap-1 group"
                    >
                      <span>{name}</span>
                      <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Col 4: Portals & Community */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white font-tech mb-4">
              Ecosystem Portals
            </h4>
            <ul className="space-y-2.5 text-sm">
              {[
                { id: 'projects', label: 'All 16 Projects' },
                { id: 'category', label: 'Technology Categories' },
                { id: 'news', label: 'News & Broadcasts' },
                { id: 'investment', label: 'Investment & Treasury' },
                { id: 'invite', label: 'Referral & Invitation' },
                { id: 'bedha-ai', label: 'BEDHA AI Assistant' },
                { id: 'media', label: 'Media Gallery' }
              ].map(item => (
                <li key={item.id}>
                  <button
                    onClick={() => {
                      setActiveSection(item.id as any);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 5: Official Founder & Contact Details */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white font-tech mb-4">
              Leadership & Contact
            </h4>
            <div className="space-y-3 text-xs text-slate-400">
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5">
                <div className="text-white font-bold text-sm">Brindaban Mondal</div>
                <div className="text-[11px] text-blue-400 font-semibold uppercase tracking-wider">
                  Founder & Principal Architect
                </div>
              </div>

              <div className="space-y-2 pt-1">
                <a
                  href="https://wa.me/917029687893"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-slate-300 hover:text-emerald-400 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>+91 7029687893 (WhatsApp)</span>
                </a>

                <a
                  href="mailto:brindabanmondal987@gmail.com"
                  className="flex items-center gap-2 text-slate-300 hover:text-blue-400 transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                  <span className="truncate">brindabanmondal987@gmail.com</span>
                </a>

                <div className="flex items-center gap-2 text-slate-400">
                  <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                  <span>Global Technology Hub</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Guarantee */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} BEDHA. All rights reserved.</span>
            <span className="text-slate-700">•</span>
            <span className="text-slate-400">Pioneering the Next Era of Technology.</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setActiveSection('contact')}
              className="hover:text-slate-300 transition-colors"
            >
              Contact Support
            </button>
            <span>•</span>
            <button
              onClick={() => setActiveSection('settings')}
              className="hover:text-slate-300 transition-colors"
            >
              System Status
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
