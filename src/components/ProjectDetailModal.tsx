import React, { useState } from 'react';
import {
  X,
  CheckCircle2,
  Calendar,
  Layers,
  Sparkles,
  Share2,
  MessageSquare,
  Building2,
  Tag,
  Check,
  Cpu,
  Target,
  Edit3,
  TrendingUp,
  Globe
} from 'lucide-react';
import { ProjectItem } from '../types';
import { useApp } from '../context/AppContext';

export const ProjectDetailModal: React.FC = () => {
  const { activeProjectModal, setActiveProjectModal, setChatOpen, addNotification, openProjectEditor, user } = useApp();
  const [copied, setCopied] = useState(false);

  if (!activeProjectModal) return null;
  const project = activeProjectModal;

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    addNotification('Link Copied', `Sharable link for ${project.name} copied to clipboard.`, 'system');
    setTimeout(() => setCopied(false), 2000);
  };

  const coverImg = project.heroImage || project.coverImage || '/assets/brand/banner_ecosystem.jpg';
  const logoImg = project.logo || '/assets/brand/bedha_official_logo.jpg';
  const entityName = project.entity || project.leadCompany || 'BEDHA Ecosystem';
  const shortDesc = project.shortDescription || project.description || '';
  const fullDesc = project.fullDescription || project.detailedDescription || '';
  const overviewText = project.executiveOverview || fullDesc || shortDesc;
  const breakthroughsList = project.breakthroughs && project.breakthroughs.length > 0 
    ? project.breakthroughs 
    : project.features || [];
  const capabilitiesList = project.capabilities && project.capabilities.length > 0 
    ? project.capabilities 
    : [];

  // Specs array
  const specsList = project.specifications && project.specifications.length > 0
    ? project.specifications
    : (project.specs ? Object.entries(project.specs).map(([key, value]) => ({ key, value })) : []);

  // Milestones
  const milestonesList = project.milestones || [];

  // Metrics
  const metricsList = project.metrics || [];

  // Technologies
  const techList = project.technologies || [];

  // Gallery
  const galleryList = project.gallery && project.gallery.length > 0 ? project.gallery : [coverImg];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-white dark:bg-slate-900 rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Modal Header Bar with Close and Edit Buttons */}
        <div className="absolute top-4 right-4 z-30 flex items-center gap-2">
          {user.role === 'admin' && (
            <button
              onClick={() => {
                setActiveProjectModal(null);
                openProjectEditor(project);
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold shadow-lg backdrop-blur-md transition-colors"
              title="Edit Project"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit Project</span>
            </button>
          )}
          <button
            onClick={handleShare}
            className="p-2 rounded-full bg-slate-900/60 hover:bg-slate-900 text-white backdrop-blur-md transition-colors"
            title="Share Project"
            aria-label="Share"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
          </button>
          <button
            onClick={() => setActiveProjectModal(null)}
            className="p-2 rounded-full bg-slate-900/60 hover:bg-slate-900 text-white backdrop-blur-md transition-colors"
            aria-label="Close Modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content Container */}
        <div className="overflow-y-auto flex-1 no-scrollbar">
          {/* Hero Banner Section */}
          <div className="relative h-56 sm:h-72 w-full bg-slate-900 overflow-hidden">
            <img
              src={coverImg}
              alt={project.name}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

            {/* Bottom Title Info */}
            <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-8 right-4 flex items-end justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white p-1.5 shadow-xl border border-slate-200 flex items-center justify-center overflow-hidden flex-shrink-0">
                  <img
                    src={logoImg}
                    alt={`${project.name} logo`}
                    className="w-full h-full object-contain"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div>
                  <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-blue-300 font-tech">
                    <Tag className="w-3 h-3" />
                    <span>{project.category}</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-heading leading-tight">
                    {project.name}
                  </h2>
                  <p className="text-xs sm:text-sm text-blue-200">{shortDesc}</p>
                </div>
              </div>

              <div className="hidden sm:block">
                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-500/30 text-blue-200 border border-blue-400/30 backdrop-blur-md">
                  Status: {project.status}
                </span>
              </div>
            </div>
          </div>

          {/* Modal Body Content */}
          <div className="p-6 sm:p-8 space-y-8">
            {/* Executive Overview */}
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white font-heading mb-2 flex items-center gap-2">
                <Layers className="w-5 h-5 text-blue-600" />
                <span>Executive Overview</span>
              </h3>
              <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
                {overviewText}
              </p>
            </div>

            {/* Key Performance Metrics Bar */}
            {metricsList.length > 0 && (
              <div>
                <h3 className="text-sm font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-cyan-600" />
                  <span>Performance Indicators</span>
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {metricsList.map((metric, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80"
                    >
                      <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 block uppercase">
                        {metric.label}
                      </span>
                      <div className="flex items-baseline gap-2 mt-1">
                        <span className="text-xl font-extrabold text-slate-900 dark:text-white">
                          {metric.value}
                        </span>
                        {metric.change && (
                          <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                            {metric.change}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Key Breakthroughs & Achievements */}
            {breakthroughsList.length > 0 && (
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white font-heading mb-3 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-blue-600" />
                  <span>Key Breakthroughs & Achievements</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {breakthroughsList.map((item, i) => (
                    <div
                      key={i}
                      className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/80 flex items-start gap-2.5"
                    >
                      <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                      <span className="text-sm font-medium text-slate-800 dark:text-slate-200">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Operational Capabilities */}
            {capabilitiesList.length > 0 && (
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white font-heading mb-3 flex items-center gap-2">
                  <Cpu className="w-5 h-5 text-cyan-600" />
                  <span>Operational Capabilities</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {capabilitiesList.map((cap, i) => (
                    <div
                      key={i}
                      className="p-3 rounded-xl bg-cyan-50/40 dark:bg-cyan-950/20 border border-cyan-100 dark:border-cyan-900/50 flex items-start gap-2.5"
                    >
                      <span className="w-5 h-5 rounded-full bg-cyan-100 dark:bg-cyan-900 text-cyan-700 dark:text-cyan-300 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      <span className="text-sm font-medium text-slate-800 dark:text-slate-200">{cap}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Specifications Matrix */}
            {specsList.length > 0 && (
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white font-heading mb-3 flex items-center gap-2">
                  <Cpu className="w-5 h-5 text-blue-600" />
                  <span>Technical Architecture Matrix</span>
                </h3>
                <div className="rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden divide-y divide-slate-200 dark:divide-slate-700 bg-slate-50/50 dark:bg-slate-800/50">
                  {specsList.map((spec, idx) => (
                    <div key={idx} className="px-4 py-3 flex flex-col sm:flex-row sm:justify-between text-sm gap-1">
                      <span className="font-semibold text-slate-600 dark:text-slate-300">{spec.key}</span>
                      <span className="font-mono text-slate-900 dark:text-white font-medium">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Underlying Technologies */}
            {techList.length > 0 && (
              <div>
                <h3 className="text-sm font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                  Core Technologies & Architecture
                </h3>
                <div className="flex flex-wrap gap-2">
                  {techList.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Milestones Roadmap */}
            {milestonesList.length > 0 && (
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white font-heading mb-3 flex items-center gap-2">
                  <Target className="w-5 h-5 text-cyan-600" />
                  <span>Milestones & Deployment Roadmap</span>
                </h3>
                <div className="space-y-3">
                  {milestonesList.map((ms, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs"
                    >
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span className="font-bold text-slate-900 dark:text-white text-sm">
                          {ms.title}
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded text-xs font-semibold bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
                            {ms.date}
                          </span>
                          <span className="px-2 py-0.5 rounded text-xs font-semibold bg-cyan-100 dark:bg-cyan-950 text-cyan-700 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-800">
                            {ms.status}
                          </span>
                        </div>
                      </div>
                      {ms.description && (
                        <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                          {ms.description}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Future Vision */}
            {project.futureVision && (
              <div className="p-4 rounded-2xl bg-gradient-to-br from-cyan-500/10 via-blue-500/5 to-transparent border border-cyan-500/20">
                <h4 className="text-xs font-bold text-cyan-700 dark:text-cyan-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <Globe className="w-4 h-4 text-cyan-600" />
                  <span>Planetary Impact & Vision</span>
                </h4>
                <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed italic">
                  "{project.futureVision}"
                </p>
              </div>
            )}

            {/* Visual Media Gallery Preview */}
            {galleryList.length > 0 && (
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white font-heading mb-3">
                  Visual Assets & Diagrams
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {galleryList.map((img, idx) => (
                    <div key={idx} className="relative h-44 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 bg-slate-900">
                      <img
                        src={img}
                        alt={`${project.name} asset ${idx + 1}`}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Metadata Footer */}
            <div className="p-4 rounded-2xl bg-blue-50/60 dark:bg-slate-800 border border-blue-100 dark:border-slate-700 flex flex-wrap items-center justify-between gap-4 text-xs">
              <div className="flex items-center gap-4 text-slate-600 dark:text-slate-300">
                <span className="flex items-center gap-1.5">
                  <Building2 className="w-4 h-4 text-blue-600" />
                  <strong>Entity:</strong> {entityName}
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-blue-600" />
                  <strong>Genesis:</strong> {project.date || project.creationDate || '2026'}
                </span>
              </div>

              <div className="flex items-center gap-2">
                {user.role === 'admin' && (
                  <button
                    onClick={() => {
                      setActiveProjectModal(null);
                      openProjectEditor(project);
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-700 hover:bg-cyan-600 hover:text-white text-slate-700 dark:text-slate-200 font-semibold transition-colors"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>Edit Project</span>
                  </button>
                )}
                <button
                  onClick={() => {
                    setActiveProjectModal(null);
                    setChatOpen(true);
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-colors"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Ask BEDHA AI</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
