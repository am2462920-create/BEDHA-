import React, { useState } from 'react';
import {
  ShieldCheck,
  Plus,
  ArrowUp,
  ArrowDown,
  Edit3,
  Trash2,
  Newspaper,
  TrendingUp,
  Layers,
  Database,
  Check,
  RefreshCw,
  Sparkles,
  ExternalLink,
  ChevronRight,
  DollarSign,
  AlertCircle,
  Cpu,
  Search,
  SlidersHorizontal,
  Download
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ProjectItem } from '../types';

export const AdminControlPanel: React.FC = () => {
  const {
    projects,
    reorderProjects,
    deleteProject,
    openProjectEditor,
    newsPosts,
    addNewsPost,
    deleteNewsPost,
    financials,
    updateFinancials,
    addNotification
  } = useApp();

  const [activeTab, setActiveTab] = useState<'projects' | 'news' | 'financials' | 'system'>('projects');
  const [projectSearch, setProjectSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  
  // News Form
  const [newsTitle, setNewsTitle] = useState('');
  const [newsCategory, setNewsCategory] = useState('Ecosystem Update');
  const [newsExcerpt, setNewsExcerpt] = useState('');
  const [newsContent, setNewsContent] = useState('');
  const [isAddingNews, setIsAddingNews] = useState(false);

  // Financials Form
  const [finValuation, setFinValuation] = useState(financials.ecosystemValuation || '$42.8B');
  const [finBudget, setFinBudget] = useState(financials.activeRndBudget || '$8.4B');
  const [finReserves, setFinReserves] = useState(financials.sovereignReserves || '$16.2B');
  const [finRevenue, setFinRevenue] = useState(financials.projectedRevenue2027 || '$14.6B');
  const [finPartners, setFinPartners] = useState(financials.institutionalPartners || '18 Strategic Nodes');
  const [finEfficiency, setFinEfficiency] = useState(financials.capitalEfficiency || '94.6%');
  const [finSaved, setFinSaved] = useState(false);

  // Reorder Handlers
  const moveProject = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= projects.length) return;

    const updated = [...projects];
    const temp = updated[index];
    updated[index] = updated[targetIndex];
    updated[targetIndex] = temp;

    reorderProjects(updated);
  };

  const handleCreateNews = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsTitle.trim() || !newsExcerpt.trim()) return;

    addNewsPost({
      title: newsTitle.trim(),
      category: newsCategory,
      excerpt: newsExcerpt.trim(),
      content: newsContent.trim() || newsExcerpt.trim(),
      author: 'BEDHA Executive Directorate',
      readTime: '3 min read',
      coverImage: '/assets/brand/banner_ecosystem.jpg'
    });

    setNewsTitle('');
    setNewsExcerpt('');
    setNewsContent('');
    setIsAddingNews(false);
  };

  const handleSaveFinancials = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateFinancials({
      ecosystemValuation: finValuation,
      activeRndBudget: finBudget,
      sovereignReserves: finReserves,
      projectedRevenue2027: finRevenue,
      institutionalPartners: finPartners,
      capitalEfficiency: finEfficiency
    });
    setFinSaved(true);
    setTimeout(() => setFinSaved(false), 2000);
  };

  const exportDataJson = () => {
    const backup = {
      timestamp: new Date().toISOString(),
      projects,
      financials,
      newsPosts
    };
    const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `bedha_ecosystem_backup_${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    addNotification('Backup Exported', 'Full ecosystem JSON snapshot downloaded.', 'system');
  };

  // Filter projects
  const filteredProjects = projects.filter(p => {
    const matchesSearch =
      (p.name && p.name.toLowerCase().includes(projectSearch.toLowerCase())) ||
      (p.entity && p.entity.toLowerCase().includes(projectSearch.toLowerCase())) ||
      (p.category && p.category.toLowerCase().includes(projectSearch.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categoriesList = Array.from(new Set(projects.map(p => p.category).filter(Boolean)));

  return (
    <div className="space-y-6 pb-20">
      {/* Mobile-First Admin Header */}
      <div className="rounded-3xl bg-gradient-to-r from-slate-900 via-slate-800 to-cyan-950 p-5 sm:p-7 text-white shadow-xl border border-slate-700/60 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="p-1 rounded-md bg-cyan-500/20 text-cyan-400 border border-cyan-400/30">
                <ShieldCheck className="w-4 h-4" />
              </span>
              <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 font-tech">
                Founder & Owner Control Suite
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black font-heading tracking-tight">
              BEDHA Ecosystem Management
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
              Live persistent controls for all ecosystem entities, hardware specifications, press releases, and financial metrics.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => openProjectEditor(null)}
              className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold shadow-lg shadow-cyan-500/25 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Project</span>
            </button>
            <button
              onClick={exportDataJson}
              title="Export Snapshot JSON"
              className="p-3 rounded-2xl bg-slate-800/80 hover:bg-slate-700 border border-slate-600 text-slate-200 transition-colors"
            >
              <Download className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* System Persistence Status Strip */}
        <div className="mt-5 pt-4 border-t border-slate-700/60 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="font-semibold text-emerald-300">
              Persistent Storage Active
            </span>
            <span className="text-slate-400 hidden sm:inline">
              (JSON disk persistence & dynamic BEDHA AI synchronization)
            </span>
          </div>
          <div className="text-slate-400 font-tech">
            {projects.length} Total Projects Loaded
          </div>
        </div>
      </div>

      {/* Control Tabs Navigation */}
      <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-slate-100 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 overflow-x-auto no-scrollbar">
        {[
          { id: 'projects', label: `Projects (${projects.length})`, icon: Layers },
          { id: 'news', label: `News & Broadcasts (${newsPosts.length})`, icon: Newspaper },
          { id: 'financials', label: 'Ecosystem Financials', icon: DollarSign },
          { id: 'system', label: 'System & Storage', icon: Database }
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex-1 justify-center ${
                isActive
                  ? 'bg-white dark:bg-slate-900 text-cyan-600 dark:text-cyan-400 shadow-sm border border-slate-200 dark:border-slate-700'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: PROJECTS MANAGEMENT */}
      {activeTab === 'projects' && (
        <div className="space-y-4">
          {/* Filter & Search Bar */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                value={projectSearch}
                onChange={e => setProjectSearch(e.target.value)}
                placeholder="Search projects by name, company, or category..."
                className="w-full pl-9 pr-4 py-2.5 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-cyan-500 focus:outline-none"
              />
            </div>

            <select
              value={selectedCategory}
              onChange={e => setSelectedCategory(e.target.value)}
              className="px-3.5 py-2.5 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-cyan-500 focus:outline-none"
            >
              <option value="all">All Categories</option>
              {categoriesList.map(cat => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Projects List with Mobile-First Action Rows */}
          <div className="space-y-3">
            {filteredProjects.map((project, index) => {
              const actualIndex = projects.findIndex(p => p.id === project.id);
              const isFirst = actualIndex === 0;
              const isLast = actualIndex === projects.length - 1;

              return (
                <div
                  key={project.id}
                  className="p-3.5 sm:p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs hover:border-cyan-500/50 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  {/* Project Summary */}
                  <div className="flex items-center gap-3.5 flex-1 min-w-0">
                    <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 overflow-hidden flex items-center justify-center flex-shrink-0 shadow-xs">
                      <img
                        src={project.logo || '/assets/brand/bedha_official_logo.jpg'}
                        alt={project.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-bold text-slate-900 dark:text-white text-sm truncate">
                          {project.name}
                        </h3>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-cyan-50 dark:bg-cyan-950 text-cyan-700 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-800">
                          {project.status || 'Active'}
                        </span>
                        <span className="text-slate-400 text-xs hidden sm:inline">•</span>
                        <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 truncate">
                          {project.entity || project.leadCompany || 'BEDHA Ecosystem'}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 truncate mt-0.5">
                        {project.shortDescription || project.description}
                      </p>
                    </div>
                  </div>

                  {/* Action Buttons (Mobile-Optimized Touch Targets) */}
                  <div className="flex items-center gap-1.5 self-end sm:self-center">
                    {/* Reorder Buttons */}
                    <div className="flex items-center bg-slate-100 dark:bg-slate-700 rounded-xl p-0.5">
                      <button
                        onClick={() => moveProject(actualIndex, 'up')}
                        disabled={isFirst}
                        title="Move Up"
                        className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-600 disabled:opacity-30 transition-colors"
                      >
                        <ArrowUp className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => moveProject(actualIndex, 'down')}
                        disabled={isLast}
                        title="Move Down"
                        className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-600 disabled:opacity-30 transition-colors"
                      >
                        <ArrowDown className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Edit Project */}
                    <button
                      onClick={() => openProjectEditor(project)}
                      className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-cyan-50 dark:bg-cyan-950/60 hover:bg-cyan-600 text-cyan-700 dark:text-cyan-300 hover:text-white border border-cyan-200 dark:border-cyan-800 text-xs font-bold transition-all"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>Edit</span>
                    </button>

                    {/* Delete Project */}
                    <button
                      onClick={() => {
                        if (confirm(`Are you sure you want to remove ${project.name} from the active directory?`)) {
                          deleteProject(project.id);
                        }
                      }}
                      title="Delete Project"
                      className="p-2 rounded-xl text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 2: NEWS MANAGEMENT */}
      {activeTab === 'news' && (
        <div className="space-y-6">
          {/* Add News Trigger / Form */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Newspaper className="w-4 h-4 text-cyan-600" />
                <span>Publish Ecosystem News & Broadcasts</span>
              </h3>
              <button
                onClick={() => setIsAddingNews(!isAddingNews)}
                className="text-xs font-semibold text-cyan-600 dark:text-cyan-400 hover:underline"
              >
                {isAddingNews ? 'Cancel' : '+ New Broadcast'}
              </button>
            </div>

            {isAddingNews && (
              <form onSubmit={handleCreateNews} className="space-y-3 pt-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    required
                    value={newsTitle}
                    onChange={e => setNewsTitle(e.target.value)}
                    placeholder="Broadcast Headline / Title *"
                    className="px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs"
                  />
                  <select
                    value={newsCategory}
                    onChange={e => setNewsCategory(e.target.value)}
                    className="px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs"
                  >
                    <option value="Ecosystem Update">Ecosystem Update</option>
                    <option value="Semiconductor Technology">Semiconductor Technology</option>
                    <option value="Mobile Technology">Mobile Technology</option>
                    <option value="Strategic Partnership">Strategic Partnership</option>
                    <option value="Financial Milestone">Financial Milestone</option>
                  </select>
                </div>

                <input
                  type="text"
                  required
                  value={newsExcerpt}
                  onChange={e => setNewsExcerpt(e.target.value)}
                  placeholder="Summary / Excerpt *"
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs"
                />

                <textarea
                  rows={3}
                  value={newsContent}
                  onChange={e => setNewsContent(e.target.value)}
                  placeholder="Full Press Release or Strategic Details..."
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs"
                />

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold shadow-sm"
                  >
                    Publish News Post
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Current News Posts List */}
          <div className="space-y-3">
            {newsPosts.map(post => (
              <div
                key={post.id}
                className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-start justify-between gap-4"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-cyan-100 dark:bg-cyan-950 text-cyan-700 dark:text-cyan-300">
                      {post.category}
                    </span>
                    <span className="text-xs text-slate-400">{post.publishDate}</span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                    {post.title}
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 line-clamp-2">
                    {post.excerpt}
                  </p>
                </div>

                <button
                  onClick={() => {
                    if (confirm(`Delete post "${post.title}"?`)) {
                      deleteNewsPost(post.id);
                    }
                  }}
                  className="p-2 text-slate-400 hover:text-red-500 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: FINANCIALS & VALUATION */}
      {activeTab === 'financials' && (
        <form onSubmit={handleSaveFinancials} className="space-y-4">
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-cyan-600" />
              <span>Public-Facing Financial & Investment Indicators</span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              These figures populate the public Investment & Ecosystem Capital portal and are referenced by BEDHA AI.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                  Ecosystem Valuation
                </label>
                <input
                  type="text"
                  value={finValuation}
                  onChange={e => setFinValuation(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                  Active R&D Allocation
                </label>
                <input
                  type="text"
                  value={finBudget}
                  onChange={e => setFinBudget(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                  Sovereign Capital Reserves
                </label>
                <input
                  type="text"
                  value={finReserves}
                  onChange={e => setFinReserves(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                  Projected 2027 Run-Rate
                </label>
                <input
                  type="text"
                  value={finRevenue}
                  onChange={e => setFinRevenue(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                  Tier-1 Institutional Partners
                </label>
                <input
                  type="text"
                  value={finPartners}
                  onChange={e => setFinPartners(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                  Capital Efficiency Ratio
                </label>
                <input
                  type="text"
                  value={finEfficiency}
                  onChange={e => setFinEfficiency(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-mono"
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              {finSaved ? (
                <span className="flex items-center gap-1 text-xs font-bold text-emerald-600">
                  <Check className="w-4 h-4" /> Financials Saved to Persistent Storage
                </span>
              ) : (
                <span />
              )}
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold shadow-sm"
              >
                Save Financial Indicators
              </button>
            </div>
          </div>
        </form>
      )}

      {/* TAB 4: SYSTEM & STORAGE */}
      {activeTab === 'system' && (
        <div className="space-y-4">
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Database className="w-4 h-4 text-cyan-600" />
              <span>Storage Architecture & Reliability</span>
            </h3>

            <div className="space-y-3 text-xs text-slate-600 dark:text-slate-300">
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <div>
                  <span className="font-bold text-slate-900 dark:text-white block">Projects Storage Node</span>
                  <span className="text-slate-400 font-mono">/data/projects.json</span>
                </div>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                  Synced & Persistent
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <div>
                  <span className="font-bold text-slate-900 dark:text-white block">Financials Storage Node</span>
                  <span className="text-slate-400 font-mono">/data/financials.json</span>
                </div>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                  Synced & Persistent
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <div>
                  <span className="font-bold text-slate-900 dark:text-white block">BEDHA AI Real-Time Grounding</span>
                  <span className="text-slate-400">Dynamically generated from current projects on every prompt</span>
                </div>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-cyan-100 text-cyan-800 dark:bg-cyan-950 dark:text-cyan-300">
                  Active
                </span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={exportDataJson}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-700 hover:bg-cyan-600 hover:text-white text-slate-800 dark:text-slate-200 text-xs font-bold transition-all"
              >
                <Download className="w-4 h-4" />
                <span>Export Full Ecosystem JSON Backup</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
