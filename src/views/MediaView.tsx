import React, { useState } from 'react';
import { Image as ImageIcon, Video, FileText, Plus, ExternalLink, Play, Eye } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { MediaItem } from '../types';

export const MediaView: React.FC = () => {
  const { mediaItems, addMediaItem, projects, setAddEntityOpen } = useApp();
  const [filter, setFilter] = useState<'all' | 'image' | 'video' | 'document'>('all');
  const [activeMediaModal, setActiveMediaModal] = useState<MediaItem | null>(null);

  const filtered =
    filter === 'all' ? mediaItems : mediaItems.filter(m => m.type === filter);

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="text-xs font-bold uppercase tracking-wider text-blue-600 font-tech">
            Visual & Technical Assets
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 font-heading">
            BEDHA Media & Blueprints
          </h2>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl">
            Explore high-resolution concept renders, photonic wafer diagrams, video overviews,
            and engineering whitepapers across all BEDHA initiatives.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {['all', 'image', 'video', 'document'].map(tab => (
            <button
              key={tab}
              onClick={() => setFilter(tab as any)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold capitalize transition-colors ${
                filter === tab
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Media Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(item => (
          <div
            key={item.id}
            onClick={() => setActiveMediaModal(item)}
            className="rounded-2xl bedha-card overflow-hidden group cursor-pointer flex flex-col justify-between"
          >
            <div className="relative h-48 w-full bg-slate-900 overflow-hidden">
              <img
                src={item.url || item.thumbnailUrl || '/assets/brand/banner_ecosystem.jpg'}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />

              <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-slate-900/80 text-white text-[10px] font-bold uppercase tracking-wider backdrop-blur-md flex items-center gap-1">
                {item.type === 'video' && <Video className="w-3 h-3 text-red-400" />}
                {item.type === 'image' && <ImageIcon className="w-3 h-3 text-blue-400" />}
                {item.type === 'document' && <FileText className="w-3 h-3 text-amber-400" />}
                <span>{item.type}</span>
              </span>

              {item.type === 'video' && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-blue-600/90 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <Play className="w-5 h-5 fill-white ml-0.5" />
                  </div>
                </div>
              )}
            </div>

            <div className="p-4 flex-1 flex flex-col justify-between">
              <div>
                <h4 className="text-sm font-bold text-slate-900 font-heading group-hover:text-blue-600 transition-colors line-clamp-1">
                  {item.title}
                </h4>
                <p className="text-xs text-slate-600 mt-1 line-clamp-2">
                  {item.description}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 mt-3 flex items-center justify-between text-[11px] text-slate-600">
                <span className="font-mono">{item.dateAdded}</span>
                <span className="font-semibold text-blue-600 flex items-center gap-1">
                  <Eye className="w-3 h-3" />
                  <span>Inspect</span>
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Media Detail Modal */}
      {activeMediaModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
          <div className="relative w-full max-w-3xl bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-200">
            <div className="relative h-72 sm:h-96 w-full bg-slate-950">
              <img
                src={activeMediaModal.url || activeMediaModal.thumbnailUrl || '/assets/brand/banner_ecosystem.jpg'}
                alt={activeMediaModal.title}
                className="w-full h-full object-contain"
                referrerPolicy="no-referrer"
              />
              <button
                onClick={() => setActiveMediaModal(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-slate-900/80 text-white hover:bg-slate-900"
              >
                ✕
              </button>
            </div>
            <div className="p-6 space-y-2">
              <div className="text-xs font-bold text-blue-600 uppercase font-tech">
                {activeMediaModal.type} Archive
              </div>
              <h3 className="text-xl font-bold text-slate-900 font-heading">
                {activeMediaModal.title}
              </h3>
              <p className="text-sm text-slate-600">
                {activeMediaModal.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
