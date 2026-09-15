import React from 'react';
import { Settings, Shield, RefreshCw, CheckCircle2, Server, Globe, Database, Info } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const SettingsView: React.FC = () => {
  const { addNotification } = useApp();

  const handleReset = () => {
    if (window.confirm('Reset local ecosystem state back to initial 16 projects?')) {
      localStorage.clear();
      window.location.reload();
    }
  };

  return (
    <div className="space-y-8 pb-12 max-w-4xl mx-auto">
      {/* Header */}
      <div>
        <div className="text-xs font-bold uppercase tracking-wider text-blue-600 font-tech">
          System Diagnostics & Preferences
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 font-heading">
          Ecosystem Settings
        </h2>
        <p className="text-sm text-slate-600 mt-1">
          Configure local client environment, review security policies, and verify neural server health.
        </p>
      </div>

      {/* System Status Matrix */}
      <div className="rounded-3xl bedha-card p-6 sm:p-8 space-y-4">
        <h3 className="text-lg font-bold text-slate-900 font-heading flex items-center gap-2">
          <Server className="w-5 h-5 text-blue-600" />
          <span>Core Infrastructure Diagnostics</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          {[
            { label: 'Ecosystem Port & Ingress', value: 'Port 3000 (Active)', status: 'Operational' },
            { label: 'BEDHA AI Neural Engine', value: 'Gemini / Local Intellect', status: 'Synchronized' },
            { label: 'Database & Local Registry', value: '16 Flagship Projects', status: 'Loaded' },
            { label: 'Photonic Security Node', value: 'Zero-Exposure API Layer', status: 'Secured' }
          ].map((item, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div>
                <div className="text-xs text-slate-500 font-medium">{item.label}</div>
                <div className="text-sm font-bold text-slate-800 font-heading">{item.value}</div>
              </div>
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{item.status}</span>
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Local Storage & Cache Management */}
      <div className="rounded-3xl bedha-card p-6 sm:p-8 space-y-4">
        <h3 className="text-lg font-bold text-slate-900 font-heading flex items-center gap-2">
          <Database className="w-5 h-5 text-blue-600" />
          <span>State & Cache Management</span>
        </h3>
        <p className="text-xs sm:text-sm text-slate-600">
          Your active changes (such as new projects, services, chats, and wallet simulations) are cached
          in your browser session. You can re-synchronize with initial ecosystem defaults at any time.
        </p>

        <div className="pt-2">
          <button
            onClick={handleReset}
            className="px-4 py-2.5 rounded-xl border border-red-200 text-red-600 hover:bg-red-50 text-xs font-bold transition-colors inline-flex items-center gap-2"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset Local Ecosystem State</span>
          </button>
        </div>
      </div>

      {/* Security & Privacy Principles */}
      <div className="rounded-3xl bg-slate-900 text-white p-6 sm:p-8 space-y-3">
        <div className="flex items-center gap-2 text-blue-400">
          <Shield className="w-5 h-5" />
          <h4 className="text-sm font-bold uppercase tracking-wider font-tech">
            BEDHA Security & Confidentiality Charter
          </h4>
        </div>
        <p className="text-xs text-slate-300 leading-relaxed">
          The BEDHA ecosystem strictly prohibits exposing sensitive private API keys or personal
          credentials to the public client layer. All neural calls are safely proxied through the
          dedicated container backend server.
        </p>
      </div>
    </div>
  );
};
