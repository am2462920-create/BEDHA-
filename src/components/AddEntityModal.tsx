import React, { useState } from 'react';
import { X, Plus, Layers, Cpu, Grid, Image as ImageIcon, Sparkles, Check } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ProjectStatus } from '../types';

export const AddEntityModal: React.FC = () => {
  const {
    isAddEntityOpen,
    setAddEntityOpen,
    addProject,
    addService,
    addCategory,
    addBanner,
    categories,
    user
  } = useApp();

  const [activeTab, setActiveTab] = useState<'project' | 'service' | 'category' | 'banner'>('project');
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Form states for Project
  const [projName, setProjName] = useState('');
  const [projCategory, setProjCategory] = useState(categories[0]?.name || 'Artificial Intelligence');
  const [projDescription, setProjDescription] = useState('');
  const [projDetailed, setProjDetailed] = useState('');
  const [projStatus, setProjStatus] = useState<ProjectStatus>('Active');
  const [projFeatures, setProjFeatures] = useState('');
  const [projCover, setProjCover] = useState('');
  const [projCompany, setProjCompany] = useState('');

  // Form states for Service
  const [srvName, setSrvName] = useState('');
  const [srvCategory, setSrvCategory] = useState(categories[0]?.name || 'Artificial Intelligence');
  const [srvDescription, setSrvDescription] = useState('');
  const [srvIcon, setSrvIcon] = useState('Cpu');
  const [srvBadge, setSrvBadge] = useState('');

  // Form states for Category
  const [catName, setCatName] = useState('');
  const [catDescription, setCatDescription] = useState('');

  // Form states for Banner
  const [banTitle, setBanTitle] = useState('');
  const [banSubtitle, setBanSubtitle] = useState('');
  const [banDescription, setBanDescription] = useState('');
  const [banImage, setBanImage] = useState('');
  const [banCta, setBanCta] = useState('Explore');

  if (!isAddEntityOpen) return null;

  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!projName.trim()) return;

    const featuresList = projFeatures
      .split('\n')
      .map(f => f.trim())
      .filter(Boolean);

    addProject({
      name: projName.trim(),
      category: projCategory,
      description: projDescription.trim() || 'New BEDHA Ecosystem Initiative',
      detailedDescription:
        projDetailed.trim() ||
        `${projName} is an expanding ecosystem initiative by BEDHA exploring next-generation technology breakthroughs.`,
      logo: '/assets/brand/bedha_logo.jpg',
      coverImage: projCover.trim() || '/assets/brand/banner_ecosystem.jpg',
      status: projStatus,
      features: featuresList.length > 0 ? featuresList : ['Autonomous Intelligent Node', 'Zero-Latency Grid Sync'],
      leadCompany: projCompany.trim() || `${projName} Technologies Ltd.`,
      isFeatured: false
    });

    setSuccessMessage(`Project "${projName}" registered into BEDHA ecosystem!`);
    setTimeout(() => {
      setSuccessMessage(null);
      setAddEntityOpen(false);
      setProjName('');
      setProjDescription('');
      setProjDetailed('');
      setProjFeatures('');
    }, 1200);
  };

  const handleCreateService = (e: React.FormEvent) => {
    e.preventDefault();
    if (!srvName.trim()) return;

    addService({
      name: srvName.trim(),
      category: srvCategory,
      description: srvDescription.trim() || 'Scalable ecosystem utility service.',
      iconName: srvIcon,
      badge: srvBadge.trim() || undefined
    });

    setSuccessMessage(`Service "${srvName}" added to the active directory!`);
    setTimeout(() => {
      setSuccessMessage(null);
      setAddEntityOpen(false);
      setSrvName('');
      setSrvDescription('');
    }, 1200);
  };

  const handleCreateCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!catName.trim()) return;

    addCategory({
      name: catName.trim(),
      description: catDescription.trim() || 'Future emerging technology domain.',
      iconName: 'Cpu'
    });

    setSuccessMessage(`Category "${catName}" added!`);
    setTimeout(() => {
      setSuccessMessage(null);
      setAddEntityOpen(false);
      setCatName('');
      setCatDescription('');
    }, 1200);
  };

  const handleCreateBanner = (e: React.FormEvent) => {
    e.preventDefault();
    if (!banTitle.trim()) return;

    addBanner({
      title: banTitle.trim(),
      subtitle: banSubtitle.trim() || 'BEDHA ANNOUNCEMENT',
      description: banDescription.trim() || 'Next-generation technological frontier for human progress.',
      imageUrl: banImage.trim() || '/assets/brand/banner_ecosystem.jpg',
      ctaText: banCta.trim() || 'Learn More',
      ctaActionSection: 'projects'
    });

    setSuccessMessage(`Banner "${banTitle}" added to home slider!`);
    setTimeout(() => {
      setSuccessMessage(null);
      setAddEntityOpen(false);
      setBanTitle('');
      setBanDescription('');
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-150">
      <div className="relative w-full max-w-xl bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-auto">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-blue-600 font-tech">
              Authorized Ecosystem Portal
            </div>
            <h3 className="text-xl font-extrabold text-slate-900 font-heading">
              Expand BEDHA Ecosystem
            </h3>
          </div>
          <button
            onClick={() => setAddEntityOpen(false)}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selection */}
        <div className="flex border-b border-slate-200 bg-slate-50/70 px-6 pt-2 gap-2 overflow-x-auto no-scrollbar">
          {[
            { id: 'project', label: 'Add Project', icon: Layers },
            { id: 'service', label: 'Add Service', icon: Cpu },
            { id: 'category', label: 'Add Category', icon: Grid },
            { id: 'banner', label: 'Add Banner', icon: ImageIcon }
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-1.5 pb-2.5 px-3 text-xs sm:text-sm font-semibold border-b-2 transition-colors whitespace-nowrap ${
                  isActive
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Success Alert */}
        {successMessage && (
          <div className="m-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-center gap-2 text-sm font-semibold animate-in fade-in">
            <Check className="w-5 h-5 text-emerald-600" />
            <span>{successMessage}</span>
          </div>
        )}

        {/* Tab Forms */}
        <div className="p-6 max-h-[70vh] overflow-y-auto no-scrollbar">
          {activeTab === 'project' && (
            <form onSubmit={handleCreateProject} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
                  Project / Company Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Project 17, Quantum Core Labs, BioGen X"
                  value={projName}
                  onChange={e => setProjName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
                    Category *
                  </label>
                  <select
                    value={projCategory}
                    onChange={e => setProjCategory(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white"
                  >
                    {categories.map(c => (
                      <option key={c.id} value={c.name}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
                    Development Status
                  </label>
                  <select
                    value={projStatus}
                    onChange={e => setProjStatus(e.target.value as ProjectStatus)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white"
                  >
                    <option value="Active">Active</option>
                    <option value="Development">Development</option>
                    <option value="Beta">Beta</option>
                    <option value="Alpha">Alpha</option>
                    <option value="Vision">Vision</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
                  Short Tagline / Sector
                </label>
                <input
                  type="text"
                  placeholder="e.g. Quantum Computing Foundry / Autonomous Marine Craft"
                  value={projDescription}
                  onChange={e => setProjDescription(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
                  Comprehensive Description
                </label>
                <textarea
                  rows={3}
                  placeholder="Detailed technological overview and mission objectives..."
                  value={projDetailed}
                  onChange={e => setProjDetailed(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
                  Key Features (one per line)
                </label>
                <textarea
                  rows={2}
                  placeholder="Feature 1&#10;Feature 2&#10;Feature 3"
                  value={projFeatures}
                  onChange={e => setProjFeatures(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
                  Lead Organization / Company
                </label>
                <input
                  type="text"
                  placeholder="e.g. BEDHA Advanced Research Group"
                  value={projCompany}
                  onChange={e => setProjCompany(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm transition-colors shadow-md flex items-center justify-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>Register New Project</span>
                </button>
              </div>
            </form>
          )}

          {activeTab === 'service' && (
            <form onSubmit={handleCreateService} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
                  Service Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Neuromorphic Gateway"
                  value={srvName}
                  onChange={e => setSrvName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
                    Category
                  </label>
                  <select
                    value={srvCategory}
                    onChange={e => setSrvCategory(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white"
                  >
                    {categories.map(c => (
                      <option key={c.id} value={c.name}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
                    Badge (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. New, Flagship, Beta"
                    value={srvBadge}
                    onChange={e => setSrvBadge(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
                  Service Description
                </label>
                <textarea
                  rows={3}
                  placeholder="Brief description of service capabilities..."
                  value={srvDescription}
                  onChange={e => setSrvDescription(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm transition-colors shadow-md flex items-center justify-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>Publish Service</span>
                </button>
              </div>
            </form>
          )}

          {activeTab === 'category' && (
            <form onSubmit={handleCreateCategory} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
                  Category Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Synthetic Biology, Quantum Networks"
                  value={catName}
                  onChange={e => setCatName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
                  Category Description
                </label>
                <textarea
                  rows={3}
                  placeholder="Technological scope for this domain..."
                  value={catDescription}
                  onChange={e => setCatDescription(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm transition-colors shadow-md flex items-center justify-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Category</span>
                </button>
              </div>
            </form>
          )}

          {activeTab === 'banner' && (
            <form onSubmit={handleCreateBanner} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
                  Banner Headline *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. PROJECT 17 DEEP-SPACE LINK CONFIRMED"
                  value={banTitle}
                  onChange={e => setBanTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
                  Subtitle
                </label>
                <input
                  type="text"
                  placeholder="e.g. BEDHA ASTRONOMY & AEROSPACE"
                  value={banSubtitle}
                  onChange={e => setBanSubtitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
                  Description
                </label>
                <textarea
                  rows={2}
                  placeholder="Key highlight message..."
                  value={banDescription}
                  onChange={e => setBanDescription(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm transition-colors shadow-md flex items-center justify-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Banner to Slider</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
