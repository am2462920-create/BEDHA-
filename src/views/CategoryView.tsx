import React, { useState } from 'react';
import {
  Layers,
  Cpu,
  Smartphone,
  Bot,
  Home,
  Navigation,
  Globe2,
  Cloud,
  Shield,
  Glasses,
  Rocket,
  Sun,
  Camera,
  Plus,
  ArrowRight,
  Filter
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ProjectCard } from '../components/ProjectCard';

export const CategoryView: React.FC = () => {
  const { categories, projects, services, setAddEntityOpen } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>(categories[0]?.name || 'All');

  const filteredProjects =
    selectedCategory === 'All'
      ? projects
      : projects.filter(p => p.category === selectedCategory);

  const filteredServices =
    selectedCategory === 'All'
      ? services
      : services.filter(s => s.category === selectedCategory);

  return (
    <div className="space-y-8 pb-12">
      {/* Category Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="text-xs font-bold uppercase tracking-wider text-blue-600 font-tech">
            Domain Classification
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 font-heading">
            Technology Categories
          </h2>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl">
            Browse initiatives categorized across hardware, artificial intelligence, robotics,
            infrastructure, and deep-tech domains.
          </p>
        </div>

        <button
          onClick={() => setAddEntityOpen(true)}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-blue-700 bg-blue-50 border border-blue-200 hover:bg-blue-100 transition-colors shadow-xs w-fit"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Category</span>
        </button>
      </div>

      {/* Category Selection Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
        <button
          onClick={() => setSelectedCategory('All')}
          className={`p-4 rounded-2xl text-left transition-all border ${
            selectedCategory === 'All'
              ? 'bg-blue-600 text-white border-blue-600 shadow-md'
              : 'bg-white text-slate-800 border-slate-200 hover:border-blue-300'
          }`}
        >
          <div className="text-xs font-bold font-heading">All Disciplines</div>
          <div className={`text-xs mt-1 ${selectedCategory === 'All' ? 'text-blue-100' : 'text-slate-600'}`}>
            {projects.length} Total Projects
          </div>
        </button>

        {categories.map(cat => {
          const isSelected = selectedCategory === cat.name;
          const count = projects.filter(p => p.category === cat.name).length;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.name)}
              className={`p-4 rounded-2xl text-left transition-all border ${
                isSelected
                  ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                  : 'bg-white text-slate-800 border-slate-200 hover:border-blue-300'
              }`}
            >
              <div className="text-sm font-bold font-heading truncate">{cat.name}</div>
              <div
                className={`text-xs mt-1 truncate ${
                  isSelected ? 'text-blue-100' : 'text-slate-600'
                }`}
              >
                {count} {count === 1 ? 'Project' : 'Projects'}
              </div>
            </button>
          );
        })}
      </div>

      {/* Filtered Projects Section */}
      <div className="space-y-4 pt-4">
        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
          <h3 className="text-lg font-bold text-slate-900 font-heading flex items-center gap-2">
            <span>{selectedCategory === 'All' ? 'All Initiatives' : `${selectedCategory} Initiatives`}</span>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
              {filteredProjects.length}
            </span>
          </h3>
        </div>

        {filteredProjects.length === 0 ? (
          <div className="py-12 text-center bg-white rounded-2xl border border-slate-200 p-6">
            <div className="text-sm font-semibold text-slate-700">
              No initiatives registered under this category yet.
            </div>
            <p className="text-xs text-slate-600 mt-1">
              Authorized members can register Project 17 or new ventures here anytime.
            </p>
            <button
              onClick={() => setAddEntityOpen(true)}
              className="mt-4 px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-semibold"
            >
              Register Initiative
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredProjects.map(project => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
