import React, { useState } from 'react';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Cpu,
  Layers,
  Zap,
  Globe2,
  TrendingUp,
  MessageSquare,
  Share2,
  CheckCircle2,
  Plus
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { BannerSlider } from '../components/BannerSlider';
import { ServiceMenu } from '../components/ServiceMenu';
import { ProjectCard } from '../components/ProjectCard';

export const HomeView: React.FC = () => {
  const {
    projects,
    newsPosts,
    setActiveSection,
    setActiveProjectModal,
    setChatOpen,
    setAddEntityOpen,
    categories
  } = useApp();

  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const filteredProjects =
    selectedCategory === 'All'
      ? projects
      : projects.filter(p => p.category === selectedCategory);

  const flagshipProjects = projects.filter(p => p.isFeatured).slice(0, 3);

  return (
    <div className="space-y-12 sm:space-y-16 pb-12">
      {/* 1. Large Responsive Banner Slider */}
      <section className="w-full">
        <BannerSlider />
      </section>

      {/* 2. Key Ecosystem Metric Badges / Tickers */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {[
          { label: 'Active Initiatives', value: `${projects.length}+ Projects`, sub: 'Continuously Expanding', icon: Layers },
          { label: 'Core Photonic Tech', value: '380B+ Nodes', sub: 'Sub-Nanometer Silicon', icon: Cpu },
          { label: 'Clean Energy Target', value: '100% Zero Emission', sub: 'Perovskite & Solid-State', icon: Zap },
          { label: 'Global Community', value: '1.2M+ Members', sub: 'Worldwide Reach', icon: Globe2 }
        ].map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div
              key={i}
              className="p-4 sm:p-5 rounded-2xl bedha-card flex items-center gap-3 sm:gap-4"
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div className="min-w-0">
                <div className="text-[11px] font-bold uppercase tracking-wider text-slate-600 font-tech truncate">
                  {stat.label}
                </div>
                <div className="text-base sm:text-xl font-black text-slate-900 font-heading truncate">
                  {stat.value}
                </div>
                <div className="text-[10px] sm:text-xs text-slate-600 truncate">
                  {stat.sub}
                </div>
              </div>
            </div>
          );
        })}
      </section>

      {/* 3. Service Menu (Horizontal on mobile, responsive grid on desktop) */}
      <section>
        <ServiceMenu />
      </section>

      {/* 4. Flagship Spotlight: Helium Flowzen X1 & A1 */}
      {flagshipProjects.length > 0 && (
        <section className="w-full rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 text-white p-6 sm:p-10 lg:p-12 relative overflow-hidden border border-slate-800 shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 mb-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-semibold uppercase tracking-wider mb-2">
                <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                <span>Flagship Frontier</span>
              </div>
              <h3 className="text-2xl sm:text-4xl font-extrabold text-white font-heading tracking-tight">
                Helium Flowzen X1 & A1 Flagship
              </h3>
              <p className="text-sm sm:text-base text-slate-300 max-w-2xl mt-1">
                Engineering sub-nanometer photonic neural processors in concert with next-generation
                titanium mobile hardware and decentralized operating layers.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setActiveSection('projects')}
                className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold transition-colors flex items-center gap-2"
              >
                <span>View All Projects</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 relative z-10">
            {flagshipProjects.map(proj => (
              <div
                key={proj.id}
                onClick={() => setActiveProjectModal(proj)}
                className="p-5 rounded-2xl bg-slate-900/80 border border-slate-700/80 hover:border-blue-500/60 cursor-pointer group transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="text-[11px] font-mono text-blue-400 uppercase tracking-wider">
                      {proj.category}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/20">
                      {proj.status}
                    </span>
                  </div>
                  <h4 className="text-lg font-bold text-white font-heading group-hover:text-blue-400 transition-colors mb-2">
                    {proj.name}
                  </h4>
                  <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed mb-4">
                    {proj.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-blue-400 font-semibold">
                  <span>Explore Specs</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 5. Complete Project Ecosystem (16 Initial + Scalable for 17, 18, 19, 20...) */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-blue-600 font-tech">
              Continuous Technological Evolution
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
              BEDHA Project Ecosystem
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              16 core active ventures spanning silicon, spatial computing, clean energy, and robotics.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setAddEntityOpen(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-blue-700 bg-blue-50 border border-blue-200 hover:bg-blue-100 transition-colors shadow-xs"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Project</span>
            </button>
            <button
              onClick={() => setActiveSection('projects')}
              className="hidden sm:inline-flex items-center gap-1 text-xs font-bold text-slate-600 hover:text-blue-600 transition-colors px-3 py-2"
            >
              <span>Explore All ({projects.length})</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Category Pill Filter Bar */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2 -mx-4 px-4 sm:mx-0 sm:px-0">
          <button
            onClick={() => setSelectedCategory('All')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-colors whitespace-nowrap ${
              selectedCategory === 'All'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
            }`}
          >
            All Initiatives ({projects.length})
          </button>
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.name)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-colors whitespace-nowrap ${
                selectedCategory === cat.name
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredProjects.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>

      {/* 6. BEDHA AI Sentient Teaser Banner */}
      <section className="rounded-3xl bg-blue-50/80 border border-blue-100 p-6 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden ring-2 ring-blue-500/30 shadow-md bg-slate-900 shrink-0">
            <img
              src="/assets/brand/bedha_ai_robot.jpg"
              alt="BEDHA AI Robot"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-blue-600 font-tech">
              Autonomous Intelligence
            </div>
            <h4 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-heading">
              Have Questions About the BEDHA Ecosystem?
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-xl">
              Interact with BEDHA AI for real-time insights regarding semiconductor architecture,
              smart city deployments, or technology roadmaps.
            </p>
          </div>
        </div>

        <button
          onClick={() => setChatOpen(true)}
          className="shrink-0 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold transition-all shadow-md flex items-center gap-2"
        >
          <MessageSquare className="w-4 h-4" />
          <span>Launch BEDHA AI</span>
        </button>
      </section>

      {/* 7. Ecosystem News Teaser */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-blue-600 font-tech">
              Broadcasts & Developments
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-heading">
              Latest from the Ecosystem
            </h3>
          </div>
          <button
            onClick={() => setActiveSection('news')}
            className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1"
          >
            <span>View All News</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {newsPosts.slice(0, 3).map(post => (
            <div
              key={post.id}
              onClick={() => setActiveSection('news')}
              className="rounded-2xl bedha-card overflow-hidden cursor-pointer group hover:translate-y-[-2px] transition-all flex flex-col"
            >
              <div className="h-40 w-full overflow-hidden bg-slate-900">
                <img
                  src={post.imageUrl || '/assets/brand/banner_ecosystem.jpg'}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-[11px] text-blue-600 font-semibold mb-1">
                    <span>{post.category}</span>
                    <span className="text-slate-600 font-normal">{post.publishDate}</span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 font-heading group-hover:text-blue-600 transition-colors line-clamp-2">
                    {post.title}
                  </h4>
                  <p className="text-xs text-slate-600 mt-1 line-clamp-2">
                    {post.summary}
                  </p>
                </div>
                <div className="pt-3 border-t border-slate-100 mt-3 text-xs font-semibold text-blue-600 flex items-center gap-1">
                  <span>Read Broadcast</span>
                  <ArrowRight className="w-3 h-3" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
