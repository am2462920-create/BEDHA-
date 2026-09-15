import React, { useState } from 'react';
import {
  Bot,
  Sparkles,
  Cpu,
  Layers,
  MessageSquare,
  Send,
  RefreshCw,
  Terminal,
  Zap,
  Globe2,
  ShieldCheck,
  Code
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const BedhaAiView: React.FC = () => {
  const { setChatOpen, projects } = useApp();
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleQuery = async (queryText?: string) => {
    const q = (queryText || prompt).trim();
    if (!q || isLoading) return;

    setIsLoading(true);
    setResponse(null);

    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: q })
      });

      if (res.ok) {
        const data = await res.json();
        setResponse(data.reply);
      } else {
        setResponse(
          `BEDHA AI synthesizes your inquiry on "${q}". The BEDHA ecosystem comprises 16 flagship programs including Helium Flowzen photonic silicon, A1 mobile devices, HIMADRI municipal operating systems, and deep-space orbital nodes.`
        );
      }
    } catch (e) {
      setResponse(
        `BEDHA AI node active: Inquiry received for "${q}". Connect with founder Brindaban Mondal or view our 16 core projects.`
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-10 pb-12">
      {/* Hero Showcase with Robot Asset */}
      <div className="rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 text-white p-6 sm:p-12 border border-slate-800 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-4 max-w-2xl text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-blue-400" />
              <span>Cognitive Orchestration Layer</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-black font-heading tracking-tight text-white leading-tight">
              Meet BEDHA AI
            </h2>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
              The sentient intelligence and central cognitive core of the BEDHA Technology Ecosystem.
              Grounded across all 16 initiatives—from sub-nanometer photonic neural processors in
              Helium Flowzen to metropolitan HIMADRI smart city orchestration.
            </p>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
              <button
                onClick={() => setChatOpen(true)}
                className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm transition-all shadow-md flex items-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Open Interactive Chat</span>
              </button>
            </div>
          </div>

          {/* AI Robot Visual Representation */}
          <div className="relative w-56 h-56 sm:w-64 sm:h-64 rounded-3xl overflow-hidden ring-4 ring-blue-500/40 shadow-2xl bg-slate-900 shrink-0">
            <img
              src="/assets/brand/bedha_ai_robot.jpg"
              alt="BEDHA AI Robot"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
            <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-white">
              <span className="font-mono font-bold text-blue-300">BEDHA AI v4.8</span>
              <span className="flex items-center gap-1 text-emerald-400 text-[11px]">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                ONLINE
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Command Terminal */}
      <div className="rounded-3xl bedha-card p-6 sm:p-8 space-y-6">
        <div>
          <h3 className="text-xl font-bold text-slate-900 font-heading flex items-center gap-2">
            <Terminal className="w-5 h-5 text-blue-600" />
            <span>Direct Cognitive Inquiry Console</span>
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Test inquiries directly against BEDHA AI's grounded knowledge engine.
          </p>
        </div>

        {/* Quick Question Prompts */}
        <div className="flex flex-wrap gap-2">
          {[
            'Explain Helium Flowzen X1 architecture',
            'How does A1 integrate with BEDHA ecosystem?',
            'What are the features of Fangon camera optics?',
            'How does HIMADRI optimize municipal energy?',
            'Who is founder Brindaban Mondal?'
          ].map((sample, idx) => (
            <button
              key={idx}
              onClick={() => {
                setPrompt(sample);
                handleQuery(sample);
              }}
              className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-blue-50 hover:text-blue-600 text-xs font-medium text-slate-700 transition-colors"
            >
              {sample}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Type any technical or ecosystem question..."
            value={prompt}
            onChange={e => setPrompt(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleQuery()}
            className="flex-1 px-4 py-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          />
          <button
            onClick={() => handleQuery()}
            disabled={!prompt.trim() || isLoading}
            className="px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-semibold text-xs sm:text-sm transition-colors flex items-center gap-2 shadow-xs"
          >
            {isLoading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            <span className="hidden sm:inline">Ask AI</span>
          </button>
        </div>

        {/* AI Output Window */}
        {response && (
          <div className="p-5 rounded-2xl bg-blue-50/70 border border-blue-200 text-slate-800 text-sm leading-relaxed space-y-2 animate-in fade-in">
            <div className="flex items-center gap-2 text-xs font-bold text-blue-700 uppercase font-tech">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span>BEDHA AI Synthesized Analysis</span>
            </div>
            <div className="whitespace-pre-wrap font-normal">{response}</div>
          </div>
        )}
      </div>

      {/* Core AI Capabilities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {[
          {
            title: 'Sub-Nanometer Silicon Codec',
            desc: 'Interprets and simulates instruction sets for the 380B node Helium Flowzen X1 optical neural engine.',
            icon: Cpu
          },
          {
            title: 'Metropolitan Smart Grid Tuning',
            desc: 'Real-time telemetry aggregation for HIMADRI smart city water, traffic, and clean solar distributions.',
            icon: Globe2
          },
          {
            title: 'Autonomous Multi-Agent Synthesis',
            desc: 'Coordinates autonomous drone swarms, humanoid robotics, and space logistics across orbital links.',
            icon: Zap
          }
        ].map((cap, i) => {
          const Icon = cap.icon;
          return (
            <div key={i} className="p-6 rounded-2xl bedha-card flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-3">
                  <Icon className="w-5 h-5" />
                </div>
                <h4 className="text-base font-bold text-slate-900 font-heading mb-2">{cap.title}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{cap.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
