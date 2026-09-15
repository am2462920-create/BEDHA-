import React from 'react';
import { ArrowUpRight, Edit3 } from 'lucide-react';
import { ProjectItem } from '../types';
import { useApp } from '../context/AppContext';

interface ProjectCardProps {
  project: ProjectItem;
  variant?: 'default' | 'compact' | 'featured';
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, variant = 'default' }) => {
  const { setActiveProjectModal, openProjectEditor, user } = useApp();

  const getStatusColor = (status: ProjectItem['status']) => {
    switch (status) {
      case 'Active':
      case 'Production':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Development':
      case 'Beta':
      case 'Alpha':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Vision':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  const coverImg = project.heroImage || project.coverImage || '/assets/brand/banner_ecosystem.jpg';
  const logoImg = project.logo || '/assets/brand/bedha_official_logo.jpg';
  const entityName = project.entity || project.leadCompany || 'BEDHA Ecosystem';
  const shortDesc = project.shortDescription || project.description || '';
  const fullDesc = project.fullDescription || project.detailedDescription || '';
  const featuresList = project.breakthroughs && project.breakthroughs.length > 0 
    ? project.breakthroughs 
    : (project.capabilities && project.capabilities.length > 0 ? project.capabilities : project.features || []);

  return (
    <div
      className={`rounded-2xl bedha-card overflow-hidden flex flex-col group transition-all duration-300 hover:translate-y-[-3px] ${
        variant === 'featured' ? 'border-blue-200 ring-1 ring-blue-100' : ''
      }`}
    >
      {/* Cover Image */}
      <div className="relative h-44 sm:h-48 w-full overflow-hidden bg-slate-900">
        <img
          src={coverImg}
          alt={project.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          referrerPolicy="no-referrer"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />

        {/* Project Logo Emblem */}
        <div className="absolute bottom-3 left-4 flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-white p-1 shadow-md border border-slate-200/80 flex items-center justify-center overflow-hidden">
            <img
              src={logoImg}
              alt={`${project.name} logo`}
              className="w-full h-full object-contain"
              referrerPolicy="no-referrer"
            />
          </div>
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-blue-300 font-tech">
              {project.category}
            </span>
            <h4 className="text-base sm:text-lg font-bold text-white font-heading leading-tight drop-shadow-xs">
              {project.name}
            </h4>
          </div>
        </div>

        {/* Top Right Badges */}
        <div className="absolute top-3 right-3 flex items-center gap-2">
          {user.role === 'admin' && (
            <button
              onClick={e => {
                e.stopPropagation();
                openProjectEditor(project);
              }}
              className="px-2.5 py-1 text-[11px] font-bold rounded-full bg-slate-900/80 hover:bg-cyan-600 text-white border border-slate-700 backdrop-blur-md transition-colors flex items-center gap-1 shadow-sm"
              title="Edit Project as Admin"
            >
              <Edit3 className="w-3 h-3" />
              <span>Edit</span>
            </button>
          )}
          <span
            className={`px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider rounded-full border shadow-xs backdrop-blur-md ${getStatusColor(
              project.status
            )}`}
          >
            {project.status}
          </span>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="text-xs font-semibold text-blue-600 mb-1">
            {shortDesc}
          </div>
          <p className="text-sm text-slate-600 line-clamp-3 leading-relaxed mb-4">
            {fullDesc}
          </p>

          {/* Key Features Pill previews */}
          {featuresList.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-4">
              {featuresList.slice(0, 2).map((feat, i) => (
                <span
                  key={i}
                  className="text-[11px] px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 font-medium truncate max-w-[200px]"
                >
                  {feat}
                </span>
              ))}
              {featuresList.length > 2 && (
                <span className="text-[11px] px-1.5 py-0.5 rounded-md bg-slate-100 text-slate-600 font-medium">
                  +{featuresList.length - 2} more
                </span>
              )}
            </div>
          )}
        </div>

        {/* Bottom Action */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
          <span className="text-xs text-slate-600 font-medium">
            {entityName}
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveProjectModal(project)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-blue-600 bg-blue-50 hover:bg-blue-600 hover:text-white transition-colors"
            >
              <span>View Details</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
