import React, { useState } from 'react';
import {
  Heart,
  MessageCircle,
  Share2,
  Calendar,
  Sparkles,
  Plus,
  ArrowUpRight,
  Check
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { NewsPost } from '../types';

export const NewsView: React.FC = () => {
  const { newsPosts, addNewsPost, likeNewsPost, addNotification, user } = useApp();
  const [isPosting, setIsPosting] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('Ecosystem News');
  const [newSummary, setNewSummary] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newImage, setNewImage] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newSummary.trim()) return;

    addNewsPost({
      title: newTitle.trim(),
      category: newCategory,
      summary: newSummary.trim(),
      content: newContent.trim() || newSummary.trim(),
      author: user.name,
      imageUrl: newImage.trim() || '/assets/brand/banner_ecosystem.jpg'
    });

    setNewTitle('');
    setNewSummary('');
    setNewContent('');
    setNewImage('');
    setIsPosting(false);
  };

  const handleShare = (id: string, title: string) => {
    navigator.clipboard?.writeText(`${window.location.origin}#news-${id}`);
    setCopiedId(id);
    addNotification('Link Copied', `Article "${title}" copied to clipboard.`, 'system');
    setTimeout(() => setCopiedId(null), 1800);
  };

  return (
    <div className="space-y-8 pb-12 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="text-xs font-bold uppercase tracking-wider text-blue-600 font-tech">
            Dispatches & Roadmaps
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 font-heading">
            BEDHA News Feed
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            Official announcements, research papers, hardware milestones, and technology releases.
          </p>
        </div>

        <button
          onClick={() => setIsPosting(!isPosting)}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-xs w-fit"
        >
          <Plus className="w-4 h-4" />
          <span>{isPosting ? 'Cancel' : 'Broadcast Update'}</span>
        </button>
      </div>

      {/* Broadcast Form (Expandable) */}
      {isPosting && (
        <form
          onSubmit={handleCreatePost}
          className="p-6 rounded-3xl bg-white border border-blue-200 shadow-xl space-y-4 animate-in fade-in"
        >
          <h3 className="text-base font-bold text-slate-900 font-heading">
            Broadcast New Ecosystem Dispatch
          </h3>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
              Headline *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Helium Flowzen X1 Tape-Out Completed"
              value={newTitle}
              onChange={e => setNewTitle(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 text-sm"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
                Category
              </label>
              <select
                value={newCategory}
                onChange={e => setNewCategory(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm bg-white"
              >
                <option value="Hardware Architecture">Hardware Architecture</option>
                <option value="Operating System">Operating System</option>
                <option value="Artificial Intelligence">Artificial Intelligence</option>
                <option value="Smart Cities">Smart Cities</option>
                <option value="Space Exploration">Space Exploration</option>
                <option value="Clean Energy">Clean Energy</option>
                <option value="Ecosystem News">Ecosystem News</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
                Banner Image URL (Optional)
              </label>
              <input
                type="text"
                placeholder="Leave blank for default"
                value={newImage}
                onChange={e => setNewImage(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
              Executive Summary *
            </label>
            <textarea
              rows={2}
              required
              placeholder="Brief preview of the breakthrough..."
              value={newSummary}
              onChange={e => setNewSummary(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
              Full Article Body
            </label>
            <textarea
              rows={4}
              placeholder="Full article body content and technical specifics..."
              value={newContent}
              onChange={e => setNewContent(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setIsPosting(false)}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs"
            >
              Publish Dispatch
            </button>
          </div>
        </form>
      )}

      {/* Feed List */}
      <div className="space-y-6">
        {newsPosts.map(post => (
          <article
            key={post.id}
            id={`news-${post.id}`}
            className="rounded-3xl bedha-card overflow-hidden transition-all duration-200 hover:border-blue-300"
          >
            {post.imageUrl && (
              <div className="relative h-56 sm:h-72 w-full overflow-hidden bg-slate-900">
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between text-xs text-slate-200">
                  <span className="px-3 py-1 rounded-full bg-blue-600/80 text-white font-bold text-[11px] uppercase tracking-wider backdrop-blur-md">
                    {post.category}
                  </span>
                  <span className="font-mono text-xs">{post.publishDate}</span>
                </div>
              </div>
            )}

            <div className="p-6 sm:p-8 space-y-4">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 font-heading leading-snug">
                  {post.title}
                </h3>
                <div className="text-xs text-slate-600 mt-1">
                  Published by <strong className="text-slate-800">{post.author}</strong>
                </div>
              </div>

              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                {post.content || post.summary}
              </p>

              {/* Action Bar */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => likeNewsPost(post.id)}
                    className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-red-500 transition-colors"
                  >
                    <Heart className="w-4 h-4 text-red-500 fill-red-500/20" />
                    <span>{post.likes}</span>
                  </button>

                  <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-600">
                    <MessageCircle className="w-4 h-4 text-blue-500" />
                    <span>{post.commentsCount} comments</span>
                  </div>
                </div>

                <button
                  onClick={() => handleShare(post.id, post.title)}
                  className="p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors flex items-center gap-1 text-xs"
                  title="Share dispatch"
                >
                  {copiedId === post.id ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-600" />
                      <span className="text-emerald-600 font-semibold">Copied</span>
                    </>
                  ) : (
                    <>
                      <Share2 className="w-4 h-4" />
                      <span>Share</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};
