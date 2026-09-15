import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, ArrowUpRight, Sparkles, Plus } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const BannerSlider: React.FC = () => {
  const { banners, setActiveSection, user, setAddEntityOpen } = useApp();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  // Auto-advance slider every 6 seconds if not paused
  useEffect(() => {
    if (isPaused || banners.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % banners.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [banners.length, isPaused]);

  const handlePrev = () => {
    setCurrentIndex(prev => (prev === 0 ? banners.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex(prev => (prev + 1) % banners.length);
  };

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const diff = touchStartX.current - touchEndX.current;
    if (diff > 50) {
      handleNext();
    } else if (diff < -50) {
      handlePrev();
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  if (!banners.length) return null;
  const current = banners[currentIndex];

  return (
    <div
      className="relative w-full overflow-hidden rounded-2xl sm:rounded-3xl shadow-lg border border-slate-200/80 bg-slate-900 group"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Aspect Ratio Container (16:9 on desktop, mobile responsive) */}
      <div className="relative w-full h-[380px] sm:h-[440px] md:h-[500px] lg:h-[540px]">
        {/* Banner Images Carousel */}
        {banners.map((slide, idx) => {
          const isCurrent = idx === currentIndex;
          return (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                isCurrent ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
              }`}
            >
              <img
                src={slide.imageUrl}
                alt={slide.title}
                className="w-full h-full object-cover object-center transform scale-100 group-hover:scale-102 transition-transform duration-1000"
                referrerPolicy="no-referrer"
              />
              {/* Dark Futuristic Gradient Overlay for pristine text contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/50 to-slate-900/20" />
            </div>
          );
        })}

        {/* Content Details Overlay */}
        <div className="absolute inset-0 z-20 flex flex-col justify-end p-6 sm:p-10 md:p-14 max-w-4xl">
          {current.badge && (
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/25 border border-blue-400/40 text-blue-300 text-xs font-semibold tracking-wider uppercase mb-3 backdrop-blur-md w-fit">
              <Sparkles className="w-3.5 h-3.5 text-blue-400" />
              <span>{current.badge}</span>
            </div>
          )}

          <span className="text-xs sm:text-sm font-bold tracking-widest text-blue-400 uppercase font-tech mb-1">
            {current.subtitle}
          </span>

          <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-white tracking-tight font-heading leading-tight mb-3">
            {current.title}
          </h2>

          <p className="text-sm sm:text-base text-slate-200 line-clamp-2 sm:line-clamp-3 mb-6 max-w-2xl font-normal leading-relaxed">
            {current.description}
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setActiveSection(current.ctaActionSection as any || 'projects')}
              className="inline-flex items-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm sm:text-base font-semibold transition-all shadow-md hover:shadow-blue-500/25 hover:translate-y-[-1px] active:translate-y-[0px]"
            >
              <span>{current.ctaText}</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>

            {(user.role === 'admin' || user.role === 'authorized') && (
              <button
                onClick={() => setAddEntityOpen(true)}
                className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-sm font-medium border border-white/20 backdrop-blur-md transition-colors"
                title="Add New Banner Slide"
              >
                <Plus className="w-4 h-4" />
                <span>Add Banner</span>
              </button>
            )}
          </div>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={handlePrev}
          className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 z-30 p-2.5 sm:p-3 rounded-full bg-black/40 hover:bg-black/70 text-white backdrop-blur-md border border-white/10 transition-all opacity-80 hover:opacity-100 hover:scale-105"
          aria-label="Previous Slide"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        <button
          onClick={handleNext}
          className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 z-30 p-2.5 sm:p-3 rounded-full bg-black/40 hover:bg-black/70 text-white backdrop-blur-md border border-white/10 transition-all opacity-80 hover:opacity-100 hover:scale-105"
          aria-label="Next Slide"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        {/* Slide Indicator Dots */}
        <div className="absolute bottom-4 sm:bottom-6 right-6 sm:right-10 z-30 flex items-center gap-2">
          {banners.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-2 rounded-full transition-all duration-300 ${
                idx === currentIndex ? 'w-8 bg-blue-500' : 'w-2 bg-white/50 hover:bg-white/80'
              }`}
              aria-label={`Slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
