import React, { useState, useMemo } from 'react';
import { Search, Filter, Plus, ArrowUpDown, Layers, CheckCircle2, ShieldCheck, SlidersHorizontal } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ProjectCard } from '../components/ProjectCard';
import { ProjectStatus } from '../types';

export const ProjectsView: React.FC = () => {
  const { projects, categories, openProjectEditor, setActiveSection, user } = useApp();

  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'default' | 'name' | 'status'>('default');

  const filteredProjects = useMemo(() => {
    return projects
      .filter(p => {
        const nameMatch = p.name ? p.name.toLowerCase().includes(search.toLowerCase()) : false;
        const descMatch = (p.shortDescription || p.description || '').toLowerCase().includes(search.toLowerCase());
        const fullDescMatch = (p.fullDescription || p.detailedDescription || '').toLowerCase().includes(search.toLowerCase());
        const entityMatch = (p.entity || p.leadCompany || '').toLowerCase().includes(search.toLowerCase());
        
        const matchesSearch = nameMatch || descMatch || fullDescMatch || entityMatch;
        const matchesCat = selectedCategory === 'All' || p.category === selectedCategory;
        const matchesStatus = selectedStatus === 'All' || p.status === selectedStatus;
        return matchesSearch && matchesCat && matchesStatus;
      })
      .sort((a, b) => {
        if (sortBy === 'name') return a.name.localeCompare(b.name);
        if (sortBy === 'status') return a.status.localeCompare(b.status);
        return 0;
      });
  }, [projects, search, selectedCategory, selectedStatus, sortBy]);

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="text-xs font-bold uppercase tracking-wider text-blue-600 font-tech">
            Ecosystem Directory
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 font-heading">
            BEDHA Projects & Companies
          </h2>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl">
            Explore all {projects.length} core technology initiatives engineered under the BEDHA umbrella.
            The ecosystem supports infinite future expansion.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {user.role === 'admin' && (
            <button
              onClick={() => setActiveSection('admin')}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-cyan-500 hover:text-white transition-colors border border-slate-200 dark:border-slate-700 shadow-xs"
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span>Admin Management</span>
            </button>
          )}
          <button
            onClick={() => openProjectEditor(null)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-md w-fit"
          >
            <Plus className="w-4 h-4" />
            <span>Add Project / Initiative</span>
          </button>
        </div>
      </div>

      {/* Control Bar: Search & Filters */}
      <div className="p-4 rounded-2xl bedha-card flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Search Field */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search projects (e.g. Helium Flowzen X1, A1, Fangon)..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          />
        </div>

        {/* Filter Dropdowns */}
        <div className="flex flex-wrap items-center gap-2.5">
          <select
            value={selectedCategory}
            onChange={e => setSelectedCategory(e.target.value)}
            className="px-3 py-2 rounded-xl border border-slate-200 text-xs font-medium bg-white text-slate-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="All">All Categories</option>
            {categories.map(c => (
              <option key={c.id} value={c.name}>
                {c.name}
              </option>
            ))}
          </select>

          <select
            value={selectedStatus}
            onChange={e => setSelectedStatus(e.target.value)}
            className="px-3 py-2 rounded-xl border border-slate-200 text-xs font-medium bg-white text-slate-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="All">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Development">Development</option>
            <option value="Beta">Beta</option>
            <option value="Alpha">Alpha</option>
            <option value="Vision">Vision</option>
          </select>

          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value as any)}
            className="px-3 py-2 rounded-xl border border-slate-200 text-xs font-medium bg-white text-slate-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="default">Sort: Default</option>
            <option value="name">Sort: Name (A-Z)</option>
            <option value="status">Sort: Status</option>
          </select>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map(project => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="py-16 text-center bg-white rounded-3xl border border-slate-200 p-8">
          <Layers className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-800">No matching projects found</h3>
          <p className="text-xs text-slate-600 mt-1 max-w-sm mx-auto">
            Try adjusting your search query or filters, or add a new project to the directory.
          </p>
          <button
            onClick={() => openProjectEditor(null)}
            className="mt-4 px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-semibold inline-flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Add Project Now</span>
          </button>
        </div>
      )}
    </div>
  );
};
