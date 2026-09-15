import React, { useState } from 'react';
import {
  Search,
  Bell,
  Menu,
  X,
  User,
  ShieldCheck,
  Cpu,
  Bot,
  Plus,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { useApp, AppSection } from '../context/AppContext';

export const Header: React.FC = () => {
  const {
    user,
    activeSection,
    setActiveSection,
    setSearchOpen,
    setNotificationsOpen,
    unreadNotifsCount,
    setAuthModalOpen,
    setAddEntityOpen
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks: { id: AppSection; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'category', label: 'Category' },
    { id: 'projects', label: 'Projects' },
    { id: 'news', label: 'News Feed' },
    { id: 'investment', label: 'Investment' },
    { id: 'invite', label: 'Invite Friends' },
    { id: 'bedha-ai', label: 'BEDHA AI' },
    { id: 'media', label: 'Media' },
    ...(user.role === 'admin' ? [{ id: 'admin' as AppSection, label: 'Admin Studio' }] : []),
    { id: 'contact', label: 'Contact' }
  ];

  const handleNavClick = (section: AppSection) => {
    setActiveSection(section);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/90 backdrop-blur-md border-b border-slate-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-3">
        {/* Brand Logo & Name */}
        <button
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-3 group text-left focus:outline-none"
          aria-label="BEDHA Home"
        >
          <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-xl overflow-hidden shadow-sm border border-blue-100 flex items-center justify-center bg-white group-hover:scale-105 transition-transform duration-200">
            <img
              src="/assets/brand/bedha_logo.jpg"
              alt="BEDHA Logo"
              className="w-full h-full object-contain p-0.5"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-xl sm:text-2xl font-extrabold tracking-wider text-slate-900 font-heading flex items-center gap-1.5">
              BEDHA
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse"></span>
            </span>
            <span className="text-[10px] tracking-widest text-slate-600 uppercase font-semibold hidden sm:inline">
              Technology Ecosystem
            </span>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navLinks.map(link => {
            const isActive = activeSection === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'text-blue-600 bg-blue-50/90 font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2.5">
          {/* Quick Add Button (Authorized/Admin) */}
          {(user.role === 'admin' || user.role === 'authorized') && (
            <button
              onClick={() => setAddEntityOpen(true)}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-blue-700 bg-blue-50 border border-blue-200 hover:bg-blue-100 transition-colors shadow-xs"
              title="Add New Project, Service or Category"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add</span>
            </button>
          )}

          {/* Search Trigger */}
          <button
            onClick={() => setSearchOpen(true)}
            className="p-2 sm:p-2.5 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            aria-label="Global Search"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Notifications Trigger */}
          <button
            onClick={() => setNotificationsOpen(true)}
            className="relative p-2 sm:p-2.5 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5" />
            {unreadNotifsCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-blue-600 text-white text-[10px] font-bold flex items-center justify-center">
                {unreadNotifsCount}
              </span>
            )}
          </button>

          {/* User Account / Profile */}
          <button
            onClick={() => handleNavClick('profile')}
            className="flex items-center gap-2 p-1 sm:px-2.5 sm:py-1.5 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors border border-transparent hover:border-slate-200"
            aria-label="User Profile"
          >
            <div className="w-8 h-8 rounded-lg overflow-hidden ring-1 ring-slate-200">
              <img
                src={user.avatarUrl}
                alt={user.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="hidden md:flex flex-col text-left">
              <span className="text-xs font-semibold text-slate-800 leading-tight">
                {user.name.split(' ')[0]}
              </span>
              <span className="text-[10px] text-blue-600 capitalize font-medium flex items-center gap-0.5">
                {user.role === 'admin' && <ShieldCheck className="w-2.5 h-2.5" />}
                {user.role}
              </span>
            </div>
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 lg:hidden transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer / Full Navigation Overlay */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-16 sm:top-20 bottom-0 bg-white/95 backdrop-blur-xl z-50 border-t border-slate-200 overflow-y-auto p-5 animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col gap-2">
            <div className="pb-3 mb-2 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={user.avatarUrl}
                  alt={user.name}
                  className="w-10 h-10 rounded-xl object-cover ring-1 ring-blue-200"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <div className="text-sm font-bold text-slate-900">{user.name}</div>
                  <div className="text-xs text-blue-600 capitalize font-medium">{user.role} Account</div>
                </div>
              </div>
              <button
                onClick={() => handleNavClick('profile')}
                className="text-xs font-medium text-blue-600 bg-blue-50 px-2.5 py-1 rounded-lg"
              >
                View
              </button>
            </div>

            {/* Major Sections List */}
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-600 px-3 pt-2">
              Ecosystem Navigation
            </div>
            {navLinks.map(link => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`flex items-center justify-between w-full px-4 py-3 rounded-xl text-base font-medium transition-all ${
                    isActive
                      ? 'bg-blue-600 text-white font-semibold shadow-xs'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <span>{link.label}</span>
                  <ChevronRight className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-600'}`} />
                </button>
              );
            })}

            {/* Quick Links to Settings and Add */}
            <div className="pt-4 mt-2 border-t border-slate-200/80 flex flex-col gap-2">
              <button
                onClick={() => handleNavClick('settings')}
                className="w-full text-left px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-xl"
              >
                Website Settings
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setAddEntityOpen(true);
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add New Project or Service
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
