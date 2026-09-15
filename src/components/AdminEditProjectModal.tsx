import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Save,
  Upload,
  Image as ImageIcon,
  Plus,
  Trash2,
  Check,
  AlertCircle,
  Sparkles,
  Layers,
  FileText,
  Cpu,
  Target,
  ExternalLink,
  ChevronRight,
  RotateCcw
} from 'lucide-react';
import { ProjectItem, ProjectSpecification, ProjectMilestone, ProjectMetric, ProjectStatus } from '../types';
import { useApp } from '../context/AppContext';

// Preset assets available in the ecosystem
const PRESET_ASSETS = [
  { label: 'BEDHA Official Logo', url: '/assets/brand/bedha_official_logo.jpg', type: 'logo' },
  { label: 'Helium Flowzen Logo', url: '/assets/projects/helium_flowzen_logo.jpg', type: 'logo' },
  { label: 'A1 Brand Variants Logo', url: '/assets/projects/a1_brand_variants.jpg', type: 'logo' },
  { label: 'My Play Store Logo', url: '/assets/projects/my_play_store.jpg', type: 'logo' },
  { label: 'Fangon Camera Logo', url: '/assets/projects/fangon_camera_logo.jpg', type: 'logo' },
  { label: 'A1 G7 Handset Hero', url: '/assets/projects/a1_g7_phone.jpg', type: 'hero' },
  { label: 'Fangon 4K Cinema Box Hero', url: '/assets/projects/fangon_camera_box.jpg', type: 'hero' },
  { label: 'Silicon Quantum Die Banner', url: '/assets/brand/banner_chip.jpg', type: 'hero' },
  { label: 'BEDHA Ecosystem Grid Banner', url: '/assets/brand/banner_ecosystem.jpg', type: 'hero' },
  { label: 'Cognitive AI Robot', url: '/assets/brand/bedha_ai_robot.jpg', type: 'hero' }
];

const STATUS_OPTIONS: ProjectStatus[] = ['Active', 'Development', 'Alpha', 'Beta', 'Production', 'Vision'];

export const AdminEditProjectModal: React.FC = () => {
  const {
    editingProject,
    isEditProjectModalOpen,
    setEditProjectModalOpen,
    updateProject,
    addProject,
    uploadImageFile,
    categories
  } = useApp();

  const isAddMode = !editingProject;
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [activeUploadTarget, setActiveUploadTarget] = useState<'logo' | 'hero' | 'gallery'>('logo');
  const [isUploading, setIsUploading] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<'basics' | 'media' | 'content' | 'breakthroughs' | 'specs' | 'milestones'>('basics');

  // Form state
  const [formData, setFormData] = useState<Partial<ProjectItem>>({
    name: '',
    entity: '',
    category: 'Technology',
    status: 'Active',
    date: new Date().toISOString().split('T')[0],
    logo: '/assets/brand/bedha_official_logo.jpg',
    heroImage: '/assets/brand/banner_ecosystem.jpg',
    gallery: [],
    shortDescription: '',
    fullDescription: '',
    executiveOverview: '',
    breakthroughs: [],
    capabilities: [],
    specifications: [],
    technologies: [],
    milestones: [],
    futureVision: '',
    metrics: [],
    tags: [],
    websiteUrl: ''
  });

  // Inputs for arrays
  const [newBreakthrough, setNewBreakthrough] = useState('');
  const [newCapability, setNewCapability] = useState('');
  const [newTech, setNewTech] = useState('');
  const [newTag, setNewTag] = useState('');
  const [newSpecKey, setNewSpecKey] = useState('');
  const [newSpecValue, setNewSpecValue] = useState('');
  const [newMilestoneTitle, setNewMilestoneTitle] = useState('');
  const [newMilestoneDate, setNewMilestoneDate] = useState('');
  const [newMilestoneStatus, setNewMilestoneStatus] = useState('Upcoming');
  const [newMilestoneDesc, setNewMilestoneDesc] = useState('');
  const [newMetricLabel, setNewMetricLabel] = useState('');
  const [newMetricValue, setNewMetricValue] = useState('');
  const [newMetricChange, setNewMetricChange] = useState('');

  // Sync form when editingProject changes
  useEffect(() => {
    if (editingProject) {
      setFormData({
        ...editingProject,
        entity: editingProject.entity || editingProject.leadCompany || 'BEDHA Ecosystem',
        heroImage: editingProject.heroImage || editingProject.coverImage || '/assets/brand/banner_ecosystem.jpg',
        shortDescription: editingProject.shortDescription || editingProject.description || '',
        fullDescription: editingProject.fullDescription || editingProject.detailedDescription || '',
        executiveOverview: editingProject.executiveOverview || editingProject.fullDescription || editingProject.shortDescription || '',
        breakthroughs: editingProject.breakthroughs || editingProject.features || [],
        capabilities: editingProject.capabilities || editingProject.features || [],
        specifications: editingProject.specifications || (editingProject.specs ? Object.entries(editingProject.specs).map(([key, value]) => ({ key, value })) : []),
        technologies: editingProject.technologies || [],
        milestones: editingProject.milestones || [],
        metrics: editingProject.metrics || [],
        tags: editingProject.tags || [editingProject.category],
        gallery: editingProject.gallery || [editingProject.heroImage || editingProject.coverImage || '']
      });
    } else {
      setFormData({
        name: '',
        entity: 'BEDHA Technologies',
        category: categories[0]?.name || 'Technology',
        status: 'Active',
        date: new Date().toISOString().split('T')[0],
        logo: '/assets/brand/bedha_official_logo.jpg',
        heroImage: '/assets/brand/banner_ecosystem.jpg',
        gallery: ['/assets/brand/banner_ecosystem.jpg'],
        shortDescription: '',
        fullDescription: '',
        executiveOverview: '',
        breakthroughs: ['High-efficiency architecture', 'Quantum neural interconnect'],
        capabilities: ['Sub-millisecond latency', 'Edge inference acceleration'],
        specifications: [
          { key: 'Architecture', value: 'BEDHA Gen 1' },
          { key: 'Integration', value: 'Neural Grid Matrix' }
        ],
        technologies: ['Neural Core', 'Photonic Bus', 'Quantum Fabric'],
        milestones: [
          { title: 'Research & Validation', date: 'Q1 2026', status: 'Completed', description: 'Core prototype benchmarked.' },
          { title: 'Commercial Deployment', date: 'Q3 2026', status: 'Active', description: 'Integration into ecosystem nodes.' }
        ],
        futureVision: 'Advancing global computing boundaries through unified cognitive hardware and sovereign systems.',
        metrics: [
          { label: 'Performance Gain', value: '3.4x', change: '+240%' },
          { label: 'Energy Reduction', value: '65%', change: '-65%' }
        ],
        tags: ['Innovation', 'BEDHA 2026'],
        websiteUrl: ''
      });
    }
    setActiveTab('basics');
    setSaveSuccess(false);
  }, [editingProject, isEditProjectModalOpen, categories]);

  if (!isEditProjectModalOpen) return null;

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    const file = files[0];
    setIsUploading(true);
    try {
      const uploadedUrl = await uploadImageFile(file);
      if (activeUploadTarget === 'logo') {
        setFormData(prev => ({ ...prev, logo: uploadedUrl }));
      } else if (activeUploadTarget === 'hero') {
        setFormData(prev => ({ ...prev, heroImage: uploadedUrl, coverImage: uploadedUrl }));
      } else if (activeUploadTarget === 'gallery') {
        setFormData(prev => ({
          ...prev,
          gallery: [...(prev.gallery || []), uploadedUrl]
        }));
      }
    } catch (err) {
      console.error('File upload failed:', err);
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const triggerUpload = (target: 'logo' | 'hero' | 'gallery') => {
    setActiveUploadTarget(target);
    fileInputRef.current?.click();
  };

  const selectPresetAsset = (url: string, target: 'logo' | 'hero' | 'gallery') => {
    if (target === 'logo') {
      setFormData(prev => ({ ...prev, logo: url }));
    } else if (target === 'hero') {
      setFormData(prev => ({ ...prev, heroImage: url, coverImage: url }));
    } else if (target === 'gallery') {
      if (!formData.gallery?.includes(url)) {
        setFormData(prev => ({ ...prev, gallery: [...(prev.gallery || []), url] }));
      }
    }
  };

  // Breakthroughs
  const addBreakthrough = () => {
    if (!newBreakthrough.trim()) return;
    setFormData(prev => ({ ...prev, breakthroughs: [...(prev.breakthroughs || []), newBreakthrough.trim()] }));
    setNewBreakthrough('');
  };
  const removeBreakthrough = (idx: number) => {
    setFormData(prev => ({
      ...prev,
      breakthroughs: (prev.breakthroughs || []).filter((_, i) => i !== idx)
    }));
  };

  // Capabilities
  const addCapability = () => {
    if (!newCapability.trim()) return;
    setFormData(prev => ({ ...prev, capabilities: [...(prev.capabilities || []), newCapability.trim()] }));
    setNewCapability('');
  };
  const removeCapability = (idx: number) => {
    setFormData(prev => ({
      ...prev,
      capabilities: (prev.capabilities || []).filter((_, i) => i !== idx)
    }));
  };

  // Tech tags
  const addTechnology = () => {
    if (!newTech.trim()) return;
    setFormData(prev => ({ ...prev, technologies: [...(prev.technologies || []), newTech.trim()] }));
    setNewTech('');
  };
  const removeTechnology = (idx: number) => {
    setFormData(prev => ({
      ...prev,
      technologies: (prev.technologies || []).filter((_, i) => i !== idx)
    }));
  };

  // Project Tags
  const addTag = () => {
    if (!newTag.trim()) return;
    setFormData(prev => ({ ...prev, tags: [...(prev.tags || []), newTag.trim()] }));
    setNewTag('');
  };
  const removeTag = (idx: number) => {
    setFormData(prev => ({
      ...prev,
      tags: (prev.tags || []).filter((_, i) => i !== idx)
    }));
  };

  // Specifications
  const addSpecification = () => {
    if (!newSpecKey.trim() || !newSpecValue.trim()) return;
    setFormData(prev => ({
      ...prev,
      specifications: [...(prev.specifications || []), { key: newSpecKey.trim(), value: newSpecValue.trim() }]
    }));
    setNewSpecKey('');
    setNewSpecValue('');
  };
  const removeSpecification = (idx: number) => {
    setFormData(prev => ({
      ...prev,
      specifications: (prev.specifications || []).filter((_, i) => i !== idx)
    }));
  };

  // Milestones
  const addMilestone = () => {
    if (!newMilestoneTitle.trim()) return;
    setFormData(prev => ({
      ...prev,
      milestones: [
        ...(prev.milestones || []),
        {
          title: newMilestoneTitle.trim(),
          date: newMilestoneDate.trim() || '2026',
          status: newMilestoneStatus,
          description: newMilestoneDesc.trim()
        }
      ]
    }));
    setNewMilestoneTitle('');
    setNewMilestoneDate('');
    setNewMilestoneDesc('');
  };
  const removeMilestone = (idx: number) => {
    setFormData(prev => ({
      ...prev,
      milestones: (prev.milestones || []).filter((_, i) => i !== idx)
    }));
  };

  // Metrics
  const addMetric = () => {
    if (!newMetricLabel.trim() || !newMetricValue.trim()) return;
    setFormData(prev => ({
      ...prev,
      metrics: [
        ...(prev.metrics || []),
        {
          label: newMetricLabel.trim(),
          value: newMetricValue.trim(),
          change: newMetricChange.trim()
        }
      ]
    }));
    setNewMetricLabel('');
    setNewMetricValue('');
    setNewMetricChange('');
  };
  const removeMetric = (idx: number) => {
    setFormData(prev => ({
      ...prev,
      metrics: (prev.metrics || []).filter((_, i) => i !== idx)
    }));
  };

  const removeGalleryImage = (idx: number) => {
    setFormData(prev => ({
      ...prev,
      gallery: (prev.gallery || []).filter((_, i) => i !== idx)
    }));
  };

  // Save Project
  const handleSave = async () => {
    if (!formData.name?.trim()) {
      alert('Please enter a project name.');
      return;
    }

    setIsSaving(true);
    try {
      if (isAddMode) {
        await addProject(formData);
      } else if (editingProject) {
        await updateProject(editingProject.id, formData);
      }
      setSaveSuccess(true);
      setTimeout(() => {
        setSaveSuccess(false);
        setEditProjectModalOpen(false);
      }, 1000);
    } catch (err) {
      console.error('Failed to save project:', err);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      {/* Hidden File Input for Mobile Camera / Gallery */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileUpload}
      />

      <div className="relative w-full max-w-4xl max-h-[92vh] flex flex-col bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
        {/* Sticky Modal Header */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/80 backdrop-blur-sm z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-600 to-blue-600 flex items-center justify-center text-white shadow-sm overflow-hidden flex-shrink-0">
              {formData.logo ? (
                <img src={formData.logo} alt="Logo" className="w-full h-full object-cover" />
              ) : (
                <Sparkles className="w-5 h-5" />
              )}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-slate-900 dark:text-white leading-tight">
                  {isAddMode ? 'Add New Project' : `Edit: ${formData.name || 'Project'}`}
                </h2>
                <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-cyan-100 dark:bg-cyan-950 text-cyan-700 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-800">
                  {formData.status || 'Active'}
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {formData.entity || 'BEDHA Technology Ecosystem'}
              </p>
            </div>
          </div>

          <button
            id="btn-close-edit-modal"
            onClick={() => setEditProjectModalOpen(false)}
            className="p-2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Navigation Tabs */}
        <div className="flex items-center gap-1.5 px-4 sm:px-6 py-2 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 overflow-x-auto no-scrollbar flex-shrink-0">
          {[
            { id: 'basics', label: 'Basics', icon: FileText },
            { id: 'media', label: 'Media & Logos', icon: ImageIcon },
            { id: 'content', label: 'Descriptions', icon: Layers },
            { id: 'breakthroughs', label: 'Breakthroughs', icon: Sparkles },
            { id: 'specs', label: 'Specs & Tech', icon: Cpu },
            { id: 'milestones', label: 'Milestones & Metrics', icon: Target }
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                id={`tab-btn-${tab.id}`}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-cyan-600 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Modal Body with Mobile-First Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {/* TAB 1: BASICS */}
          {activeTab === 'basics' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                    Project Name *
                  </label>
                  <input
                    id="input-project-name"
                    type="text"
                    value={formData.name || ''}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g., Helium Flowzen X1, A1, Fangon..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                    Company / Organization / Entity *
                  </label>
                  <input
                    id="input-project-entity"
                    type="text"
                    value={formData.entity || ''}
                    onChange={e => setFormData({ ...formData, entity: e.target.value, leadCompany: e.target.value })}
                    placeholder="e.g., Helium Flowzen Technologies, A1 Mobile..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                    Category *
                  </label>
                  <select
                    id="select-project-category"
                    value={formData.category || ''}
                    onChange={e => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                  >
                    {categories.map(c => (
                      <option key={c.id} value={c.name}>
                        {c.name}
                      </option>
                    ))}
                    <option value="Semiconductor Technology">Semiconductor Technology</option>
                    <option value="Mobile Technology">Mobile Technology</option>
                    <option value="Camera Manufacturing Company">Camera Manufacturing Company</option>
                    <option value="Artificial Intelligence">Artificial Intelligence</option>
                    <option value="Robotics">Robotics</option>
                    <option value="Space Technology">Space Technology</option>
                    <option value="Clean Energy">Clean Energy</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                    Status *
                  </label>
                  <select
                    id="select-project-status"
                    value={formData.status || 'Active'}
                    onChange={e => setFormData({ ...formData, status: e.target.value as ProjectStatus })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                  >
                    {STATUS_OPTIONS.map(opt => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                    Launch / Genesis Date
                  </label>
                  <input
                    id="input-project-date"
                    type="date"
                    value={formData.date || ''}
                    onChange={e => setFormData({ ...formData, date: e.target.value, creationDate: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                    Website / Internal Endpoint URL
                  </label>
                  <input
                    id="input-project-url"
                    type="url"
                    value={formData.websiteUrl || ''}
                    onChange={e => setFormData({ ...formData, websiteUrl: e.target.value })}
                    placeholder="https://bedha.internal/..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Tags */}
              <div className="pt-2">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                  Project Tags
                </label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {(formData.tags || []).map((tag, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => removeTag(idx)}
                        className="text-slate-400 hover:text-red-500"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newTag}
                    onChange={e => setNewTag(e.target.value)}
                    onKeyDown={e => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addTag();
                      }
                    }}
                    placeholder="Add a tag (e.g. Semiconductor, Flagship, 5G)"
                    className="flex-1 px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={addTag}
                    className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold"
                  >
                    Add Tag
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: MEDIA & LOGOS */}
          {activeTab === 'media' && (
            <div className="space-y-6">
              {/* Quick Preset Asset Chooser */}
              <div className="p-4 rounded-xl bg-cyan-50/50 dark:bg-cyan-950/20 border border-cyan-100 dark:border-cyan-900/50">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-cyan-900 dark:text-cyan-300 uppercase tracking-wider">
                    Quick Preset Assets (Tap to Assign)
                  </span>
                  <span className="text-xs text-cyan-600 dark:text-cyan-400">
                    Official BEDHA Assets
                  </span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                  {PRESET_ASSETS.map((asset, idx) => (
                    <div
                      key={idx}
                      className="group relative rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-2 text-center hover:border-cyan-500 transition-all flex flex-col items-center"
                    >
                      <div className="w-12 h-12 rounded-lg overflow-hidden mb-1.5 bg-slate-100 dark:bg-slate-700 flex items-center justify-center">
                        <img src={asset.url} alt={asset.label} className="w-full h-full object-cover" />
                      </div>
                      <span className="text-[10px] font-medium text-slate-700 dark:text-slate-200 line-clamp-1">
                        {asset.label}
                      </span>
                      <div className="flex gap-1 mt-1.5 w-full">
                        <button
                          type="button"
                          onClick={() => selectPresetAsset(asset.url, 'logo')}
                          className="flex-1 py-1 rounded bg-slate-100 dark:bg-slate-700 hover:bg-cyan-500 hover:text-white text-[9px] font-semibold text-slate-700 dark:text-slate-300 transition-colors"
                        >
                          Logo
                        </button>
                        <button
                          type="button"
                          onClick={() => selectPresetAsset(asset.url, 'hero')}
                          className="flex-1 py-1 rounded bg-slate-100 dark:bg-slate-700 hover:bg-blue-500 hover:text-white text-[9px] font-semibold text-slate-700 dark:text-slate-300 transition-colors"
                        >
                          Hero
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Logo & Hero Images */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Logo Editor */}
                <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50">
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                    Project Logo
                  </label>
                  <div className="flex items-center gap-4 mb-3">
                    <div className="w-16 h-16 rounded-xl bg-slate-100 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 overflow-hidden flex items-center justify-center flex-shrink-0 shadow-sm">
                      {formData.logo ? (
                        <img src={formData.logo} alt="Project Logo" className="w-full h-full object-cover" />
                      ) : (
                        <ImageIcon className="w-8 h-8 text-slate-400" />
                      )}
                    </div>
                    <div className="flex-1 space-y-2">
                      <button
                        type="button"
                        id="btn-upload-logo"
                        onClick={() => triggerUpload('logo')}
                        disabled={isUploading}
                        className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold shadow-sm transition-colors"
                      >
                        <Upload className="w-3.5 h-3.5" />
                        Upload Device / Camera
                      </button>
                      <input
                        type="text"
                        value={formData.logo || ''}
                        onChange={e => setFormData({ ...formData, logo: e.target.value })}
                        placeholder="Or paste image URL"
                        className="w-full px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs"
                      />
                    </div>
                  </div>
                </div>

                {/* Hero / Cover Image Editor */}
                <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50">
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                    Hero Showcase Image
                  </label>
                  <div className="flex items-center gap-4 mb-3">
                    <div className="w-24 h-16 rounded-xl bg-slate-100 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 overflow-hidden flex items-center justify-center flex-shrink-0 shadow-sm">
                      {formData.heroImage ? (
                        <img src={formData.heroImage} alt="Hero Image" className="w-full h-full object-cover" />
                      ) : (
                        <ImageIcon className="w-8 h-8 text-slate-400" />
                      )}
                    </div>
                    <div className="flex-1 space-y-2">
                      <button
                        type="button"
                        id="btn-upload-hero"
                        onClick={() => triggerUpload('hero')}
                        disabled={isUploading}
                        className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-sm transition-colors"
                      >
                        <Upload className="w-3.5 h-3.5" />
                        Upload Device / Camera
                      </button>
                      <input
                        type="text"
                        value={formData.heroImage || ''}
                        onChange={e => setFormData({ ...formData, heroImage: e.target.value, coverImage: e.target.value })}
                        placeholder="Or paste image URL"
                        className="w-full px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Gallery Manager */}
              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50">
                <div className="flex items-center justify-between mb-3">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                    Gallery Images Matrix
                  </label>
                  <button
                    type="button"
                    onClick={() => triggerUpload('gallery')}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-semibold hover:bg-cyan-600 hover:text-white transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Gallery Photo
                  </button>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {(formData.gallery || []).map((imgUrl, idx) => (
                    <div
                      key={idx}
                      className="relative group rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 aspect-video bg-slate-100 dark:bg-slate-900"
                    >
                      <img src={imgUrl} alt={`Gallery ${idx}`} className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => removeGalleryImage(idx)}
                        className="absolute top-1 right-1 p-1 rounded-md bg-red-600/90 text-white opacity-90 group-hover:opacity-100 hover:bg-red-700 transition-opacity"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: CONTENT & DESCRIPTIONS */}
          {activeTab === 'content' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                  Short Description (Sub-header / Card Summary)
                </label>
                <input
                  id="input-short-desc"
                  type="text"
                  value={formData.shortDescription || ''}
                  onChange={e => setFormData({ ...formData, shortDescription: e.target.value, description: e.target.value })}
                  placeholder="e.g. Chip Company / Sub-Nanometer Quantum Silicon..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                  Full Description
                </label>
                <textarea
                  id="textarea-full-desc"
                  rows={4}
                  value={formData.fullDescription || ''}
                  onChange={e => setFormData({ ...formData, fullDescription: e.target.value, detailedDescription: e.target.value })}
                  placeholder="Provide a comprehensive operational and technological narrative..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                  Executive Strategic Overview
                </label>
                <textarea
                  id="textarea-exec-overview"
                  rows={3}
                  value={formData.executiveOverview || ''}
                  onChange={e => setFormData({ ...formData, executiveOverview: e.target.value })}
                  placeholder="High-level strategic impact within the BEDHA ecosystem..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                  Future Vision
                </label>
                <textarea
                  id="textarea-future-vision"
                  rows={3}
                  value={formData.futureVision || ''}
                  onChange={e => setFormData({ ...formData, futureVision: e.target.value })}
                  placeholder="Long-term horizon and planetary transformation objectives..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                />
              </div>
            </div>
          )}

          {/* TAB 4: BREAKTHROUGHS & CAPABILITIES */}
          {activeTab === 'breakthroughs' && (
            <div className="space-y-6">
              {/* Breakthroughs */}
              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                  Key Breakthroughs & Achievements
                </label>
                <div className="space-y-2 mb-3">
                  {(formData.breakthroughs || []).map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between gap-2 p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-800 dark:text-slate-200"
                    >
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-cyan-100 dark:bg-cyan-900 text-cyan-700 dark:text-cyan-300 flex items-center justify-center font-bold text-[10px]">
                          {idx + 1}
                        </span>
                        <span>{item}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeBreakthrough(idx)}
                        className="text-slate-400 hover:text-red-500 p-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newBreakthrough}
                    onChange={e => setNewBreakthrough(e.target.value)}
                    onKeyDown={e => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addBreakthrough();
                      }
                    }}
                    placeholder="e.g. Sub-nanometer Photonic Silicon Die with Zero-Resistance Traces"
                    className="flex-1 px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={addBreakthrough}
                    className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold"
                  >
                    Add
                  </button>
                </div>
              </div>

              {/* Capabilities */}
              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                  Operational Capabilities
                </label>
                <div className="space-y-2 mb-3">
                  {(formData.capabilities || []).map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between gap-2 p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-800 dark:text-slate-200"
                    >
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 flex items-center justify-center font-bold text-[10px]">
                          {idx + 1}
                        </span>
                        <span>{item}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeCapability(idx)}
                        className="text-slate-400 hover:text-red-500 p-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newCapability}
                    onChange={e => setNewCapability(e.target.value)}
                    onKeyDown={e => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addCapability();
                      }
                    }}
                    placeholder="e.g. Trillion-parameter neural network edge inferencing"
                    className="flex-1 px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={addCapability}
                    className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold"
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: SPECS & TECHNOLOGIES */}
          {activeTab === 'specs' && (
            <div className="space-y-6">
              {/* Specifications Matrix Table */}
              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                  Key Specifications Matrix (Key-Value)
                </label>
                <div className="space-y-2 mb-3">
                  {(formData.specifications || []).map((spec, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between gap-3 p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs"
                    >
                      <div className="flex items-center gap-2 flex-1">
                        <span className="font-bold text-slate-900 dark:text-white min-w-[120px]">
                          {spec.key}:
                        </span>
                        <span className="text-slate-600 dark:text-slate-300">
                          {spec.value}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeSpecification(idx)}
                        className="text-slate-400 hover:text-red-500 p-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-2">
                  <input
                    type="text"
                    value={newSpecKey}
                    onChange={e => setNewSpecKey(e.target.value)}
                    placeholder="Key (e.g. Transistor Density)"
                    className="sm:col-span-5 px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs"
                  />
                  <input
                    type="text"
                    value={newSpecValue}
                    onChange={e => setNewSpecValue(e.target.value)}
                    placeholder="Value (e.g. 380 Billion Nodes)"
                    className="sm:col-span-5 px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs"
                  />
                  <button
                    type="button"
                    onClick={addSpecification}
                    className="sm:col-span-2 px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold"
                  >
                    Add Spec
                  </button>
                </div>
              </div>

              {/* Technologies Tags */}
              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                  Underlying Technologies & Architecture
                </label>
                <div className="flex flex-wrap gap-2 mb-3">
                  {(formData.technologies || []).map((t, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-cyan-50 dark:bg-cyan-950 text-cyan-700 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-800"
                    >
                      {t}
                      <button
                        type="button"
                        onClick={() => removeTechnology(idx)}
                        className="text-cyan-400 hover:text-red-500"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newTech}
                    onChange={e => setNewTech(e.target.value)}
                    onKeyDown={e => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addTechnology();
                      }
                    }}
                    placeholder="Add core technology (e.g. RISC-Q, Quantum Photonic Bus, HBM4)"
                    className="flex-1 px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs"
                  />
                  <button
                    type="button"
                    onClick={addTechnology}
                    className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold"
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: MILESTONES & METRICS */}
          {activeTab === 'milestones' && (
            <div className="space-y-6">
              {/* Milestones Roadmap */}
              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                  Project Milestones Roadmap
                </label>
                <div className="space-y-2 mb-3">
                  {(formData.milestones || []).map((ms, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-900 dark:text-white">{ms.title}</span>
                          <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
                            {ms.date}
                          </span>
                          <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-cyan-100 dark:bg-cyan-900 text-cyan-700 dark:text-cyan-300">
                            {ms.status}
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeMilestone(idx)}
                          className="text-slate-400 hover:text-red-500 p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      {ms.description && (
                        <p className="text-slate-500 dark:text-slate-400 text-[11px]">{ms.description}</p>
                      )}
                    </div>
                  ))}
                </div>
                <div className="space-y-2">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <input
                      type="text"
                      value={newMilestoneTitle}
                      onChange={e => setNewMilestoneTitle(e.target.value)}
                      placeholder="Milestone Title"
                      className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs"
                    />
                    <input
                      type="text"
                      value={newMilestoneDate}
                      onChange={e => setNewMilestoneDate(e.target.value)}
                      placeholder="Target Date (e.g. Q3 2026)"
                      className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs"
                    />
                    <select
                      value={newMilestoneStatus}
                      onChange={e => setNewMilestoneStatus(e.target.value)}
                      className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs"
                    >
                      <option value="Completed">Completed</option>
                      <option value="Active">Active</option>
                      <option value="Upcoming">Upcoming</option>
                    </select>
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newMilestoneDesc}
                      onChange={e => setNewMilestoneDesc(e.target.value)}
                      placeholder="Milestone description"
                      className="flex-1 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs"
                    />
                    <button
                      type="button"
                      onClick={addMilestone}
                      className="px-4 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold"
                    >
                      Add Milestone
                    </button>
                  </div>
                </div>
              </div>

              {/* Key Performance Metrics */}
              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                  Key Metrics & Performance Indicators
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3">
                  {(formData.metrics || []).map((m, idx) => (
                    <div
                      key={idx}
                      className="relative p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                    >
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                        {m.label}
                      </span>
                      <div className="flex items-baseline gap-2 mt-1">
                        <span className="text-base font-extrabold text-slate-900 dark:text-white">
                          {m.value}
                        </span>
                        {m.change && (
                          <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">
                            {m.change}
                          </span>
                        )}
                      </div>
                      <button
                        type="button"
                        onClick={() => removeMetric(idx)}
                        className="absolute top-2 right-2 text-slate-400 hover:text-red-500"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-2">
                  <input
                    type="text"
                    value={newMetricLabel}
                    onChange={e => setNewMetricLabel(e.target.value)}
                    placeholder="Metric Label (e.g. Latency)"
                    className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs"
                  />
                  <input
                    type="text"
                    value={newMetricValue}
                    onChange={e => setNewMetricValue(e.target.value)}
                    placeholder="Value (e.g. 0.18 ms)"
                    className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs"
                  />
                  <input
                    type="text"
                    value={newMetricChange}
                    onChange={e => setNewMetricChange(e.target.value)}
                    placeholder="Change (e.g. -92%)"
                    className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs"
                  />
                  <button
                    type="button"
                    onClick={addMetric}
                    className="px-4 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold"
                  >
                    Add Metric
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Sticky Modal Bottom Action Bar */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 border-t border-slate-100 dark:border-slate-800 bg-slate-50/90 dark:bg-slate-900/90 backdrop-blur-sm z-10">
          <button
            type="button"
            id="btn-cancel-edit-project"
            onClick={() => setEditProjectModalOpen(false)}
            className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold transition-colors"
          >
            Cancel
          </button>

          <div className="flex items-center gap-3">
            {saveSuccess && (
              <span className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400 animate-fadeIn">
                <Check className="w-4 h-4" /> Changes Saved!
              </span>
            )}
            <button
              type="button"
              id="btn-save-project-changes"
              onClick={handleSave}
              disabled={isSaving}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white text-xs font-bold shadow-lg shadow-cyan-500/25 transition-all disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              {isSaving ? 'Saving...' : isAddMode ? 'Create Project' : 'Save Project Changes'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
