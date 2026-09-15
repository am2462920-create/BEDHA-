import React, { useState, useMemo } from 'react';
import { Search, X, Layers, Cpu, Newspaper, ArrowRight, CornerDownLeft } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const SearchModal: React.FC = () => {
  const {
    isSearchOpen,
    setSearchOpen,
    projects,
    services,
    newsPosts,
    setActiveProjectModal,
    setActiveSection
  } = useApp();

  const [query, setQuery] = useState('');

  const filteredResults = useMemo(() => {
    if (!query.trim()) return { projects: [], services: [], news: [] };
    const q = query.toLowerCase();

    const matchedProjects = projects.filter(
      p =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.detailedDescription.toLowerCase().includes(q)
    );

    const matchedServices = services.filter(
      s =>
        s.name.toLowerCase().includes(q) ||
        s.category.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q)
    );

    const matchedNews = newsPosts.filter(
      n =>
        n.title.toLowerCase().includes(q) ||
        n.category.toLowerCase().includes(q) ||
        n.summary.toLowerCase().includes(q)
    );

    return {
      projects: matchedProjects,
      services: matchedServices,
      news: matchedNews
    };
  }, [query, projects, services, newsPosts]);

  if (!isSearchOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-16 sm:pt-24 bg-slate-950/70 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-150">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col">
        {/* Search Bar Input */}
        <div className="p-4 border-b border-slate-100 flex items-center gap-3">
          <Search className="w-5 h-5 text-blue-600 shrink-0" />
          <input
            type="text"
            autoFocus
            placeholder="Search all 16 projects, services, technologies, news..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            className="flex-1 text-base text-slate-800 focus:outline-none placeholder:text-slate-400 font-medium"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-600 text-xs"
            >
              Clear
            </button>
          )}
          <button
            onClick={() => setSearchOpen(false)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results Container */}
        <div className="p-4 max-h-[60vh] overflow-y-auto no-scrollbar divide-y divide-slate-100">
          {!query.trim() ? (
            <div className="py-8 text-center">
              <div className="text-sm font-semibold text-slate-700">Explore the BEDHA Ecosystem</div>
              <p className="text-xs text-slate-600 mt-1">
                Try searching "Helium Flowzen X1", "A1", "My Play", "HIMADRI", or "Robotics".
              </p>
            </div>
          ) : (
            <>
              {/* Projects Results */}
              {filteredResults.projects.length > 0 && (
                <div className="py-3">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-blue-600 font-tech mb-2 flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5" />
                    <span>Projects ({filteredResults.projects.length})</span>
                  </div>
                  <div className="space-y-1.5">
                    {filteredResults.projects.map(p => (
                      <button
                        key={p.id}
                        onClick={() => {
                          setActiveProjectModal(p);
                          setSearchOpen(false);
                        }}
                        className="w-full p-2.5 rounded-xl hover:bg-blue-50/70 text-left flex items-center justify-between group transition-colors"
                      >
                        <div>
                          <div className="text-sm font-bold text-slate-900 group-hover:text-blue-600">
                            {p.name}
                          </div>
                          <div className="text-xs text-slate-600 truncate max-w-md">
                            {p.description}
                          </div>
                        </div>
                        <span className="text-xs text-blue-600 font-semibold opacity-0 group-hover:opacity-100 flex items-center gap-1 transition-opacity">
                          <span>View</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Services Results */}
              {filteredResults.services.length > 0 && (
                <div className="py-3">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-blue-600 font-tech mb-2 flex items-center gap-1.5">
                    <Cpu className="w-3.5 h-3.5" />
                    <span>Services ({filteredResults.services.length})</span>
                  </div>
                  <div className="space-y-1.5">
                    {filteredResults.services.map(s => (
                      <button
                        key={s.id}
                        onClick={() => {
                          setActiveSection('category');
                          setSearchOpen(false);
                        }}
                        className="w-full p-2.5 rounded-xl hover:bg-slate-100 text-left flex items-center justify-between group transition-colors"
                      >
                        <div>
                          <div className="text-sm font-bold text-slate-900 group-hover:text-blue-600">
                            {s.name}
                          </div>
                          <div className="text-xs text-slate-600 truncate max-w-md">
                            {s.description}
                          </div>
                        </div>
                        <span className="text-xs text-slate-600">{s.category}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* News Results */}
              {filteredResults.news.length > 0 && (
                <div className="py-3">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-blue-600 font-tech mb-2 flex items-center gap-1.5">
                    <Newspaper className="w-3.5 h-3.5" />
                    <span>News & Updates ({filteredResults.news.length})</span>
                  </div>
                  <div className="space-y-1.5">
                    {filteredResults.news.map(n => (
                      <button
                        key={n.id}
                        onClick={() => {
                          setActiveSection('news');
                          setSearchOpen(false);
                        }}
                        className="w-full p-2.5 rounded-xl hover:bg-slate-100 text-left flex items-center justify-between group transition-colors"
                      >
                        <div>
                          <div className="text-sm font-bold text-slate-900 group-hover:text-blue-600">
                            {n.title}
                          </div>
                          <div className="text-xs text-slate-600 truncate max-w-md">
                            {n.summary}
                          </div>
                        </div>
                        <span className="text-xs text-slate-600">{n.publishDate}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {filteredResults.projects.length === 0 &&
                filteredResults.services.length === 0 &&
                filteredResults.news.length === 0 && (
                  <div className="py-8 text-center text-sm text-slate-600">
                    No results found for "{query}".
                  </div>
                )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
