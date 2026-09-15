import React from 'react';
import {
  Cpu,
  Smartphone,
  Store,
  Camera,
  Bot,
  Activity,
  Home,
  Navigation,
  Zap,
  Plane,
  Building2,
  Cloud,
  Shield,
  Glasses,
  Rocket,
  Sun,
  Plus,
  ArrowRight
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ServiceItem } from '../types';

const iconMap: Record<string, React.FC<{ className?: string }>> = {
  Cpu,
  Smartphone,
  Store,
  Camera,
  Bot,
  Activity,
  Home,
  Navigation,
  Zap,
  Plane,
  Building2,
  Cloud,
  Shield,
  Glasses,
  Rocket,
  Sun
};

export const ServiceMenu: React.FC = () => {
  const { services, setActiveSection, setActiveProjectModal, projects, setAddEntityOpen } = useApp();

  const handleServiceClick = (srv: ServiceItem) => {
    if (srv.targetProjectId) {
      const match = projects.find(p => p.id === srv.targetProjectId);
      if (match) {
        setActiveProjectModal(match);
        return;
      }
    }
    setActiveSection('projects');
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="text-xs font-bold uppercase tracking-wider text-blue-600 font-tech">
            Ecosystem Portals
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-heading">
            Core Technology Services
          </h3>
        </div>

        <div className="flex items-center gap-2">
          {/* Add Service / Project Button */}
          <button
            onClick={() => setAddEntityOpen(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-blue-700 bg-blue-50 border border-blue-200 hover:bg-blue-100 transition-colors shadow-xs"
            aria-label="Add Service or Project"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Service</span>
          </button>
          <button
            onClick={() => setActiveSection('category')}
            className="hidden sm:inline-flex items-center gap-1 text-xs font-semibold text-slate-600 hover:text-blue-600 transition-colors"
          >
            <span>All Categories</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Horizontal Scroll on Mobile, Flexible Grid on Desktop */}
      <div className="flex sm:grid sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 overflow-x-auto no-scrollbar pb-3 sm:pb-0 pt-1 -mx-4 px-4 sm:mx-0 sm:px-0 scroll-smooth">
        {services.map(service => {
          const IconComponent = iconMap[service.iconName] || Cpu;
          return (
            <button
              key={service.id}
              onClick={() => handleServiceClick(service)}
              className="flex-shrink-0 w-36 sm:w-auto p-3.5 sm:p-4 rounded-2xl bedha-card text-left flex flex-col justify-between group hover:translate-y-[-2px] transition-all relative overflow-hidden"
            >
              {service.badge && (
                <span className="absolute top-2 right-2 text-[9px] font-bold px-1.5 py-0.5 rounded-md bg-blue-50 text-blue-600 border border-blue-100">
                  {service.badge}
                </span>
              )}

              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-3 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <IconComponent className="w-5 h-5" />
              </div>

              <div>
                <h4 className="text-sm font-bold text-slate-800 font-heading leading-snug group-hover:text-blue-600 transition-colors">
                  {service.name}
                </h4>
                <p className="text-[11px] text-slate-600 mt-1 line-clamp-2 leading-tight">
                  {service.description}
                </p>
              </div>
            </button>
          );
        })}

        {/* Scalable '+' Add Card at the end of the Service Menu */}
        <button
          onClick={() => setAddEntityOpen(true)}
          className="flex-shrink-0 w-36 sm:w-auto p-3.5 sm:p-4 rounded-2xl border-2 border-dashed border-blue-200 hover:border-blue-400 bg-blue-50/50 hover:bg-blue-50/90 text-left flex flex-col justify-center items-center gap-2 group transition-all"
        >
          <div className="w-10 h-10 rounded-xl bg-white text-blue-600 shadow-xs flex items-center justify-center group-hover:scale-110 transition-transform">
            <Plus className="w-5 h-5" />
          </div>
          <span className="text-xs font-bold text-blue-700">Add New</span>
          <span className="text-[10px] text-slate-600 text-center">Service / Project</span>
        </button>
      </div>
    </div>
  );
};
