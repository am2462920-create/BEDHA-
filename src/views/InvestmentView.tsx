import React, { useState } from 'react';
import {
  TrendingUp,
  Wallet,
  ArrowUpRight,
  ArrowDownLeft,
  ShieldCheck,
  Clock,
  DollarSign,
  PieChart,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const InvestmentView: React.FC = () => {
  const { walletBalance, transactions, executeTransaction, projects, financials } = useApp();

  const [modalType, setModalType] = useState<'deposit' | 'withdraw' | 'invest' | null>(null);
  const [targetProject, setTargetProject] = useState(projects[0]?.name || 'Helium Flowzen X1');
  const [amountInput, setAmountInput] = useState<string>('500');
  const [paymentMethod, setPaymentMethod] = useState('Bank Wire / Sovereign Grid');

  const handleAction = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = parseFloat(amountInput);
    if (isNaN(parsed) || parsed <= 0) return;

    if (modalType === 'deposit') {
      executeTransaction('Deposit', parsed, paymentMethod);
    } else if (modalType === 'withdraw') {
      executeTransaction('Withdraw', Math.min(walletBalance, parsed), paymentMethod);
    } else if (modalType === 'invest') {
      executeTransaction('Investment', Math.min(walletBalance, parsed), `Direct Equity: ${targetProject}`);
    }

    setModalType(null);
    setAmountInput('500');
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div>
        <div className="text-xs font-bold uppercase tracking-wider text-blue-600 font-tech">
          Treasury & Capital Deployment
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 font-heading">
          BEDHA Investment & Wallet
        </h2>
        <p className="text-sm text-slate-600 mt-1 max-w-2xl">
          Participate in capital allocations across deep-tech research ventures. Secure,
          transparent simulated treasury engine for the BEDHA ecosystem.
        </p>
      </div>

      {/* Financial Metrics Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 font-tech block">
            Ecosystem Valuation
          </span>
          <div className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
            {financials.ecosystemValuation}
          </div>
          <span className="text-[10px] text-emerald-600 font-bold">Audited Multi-Entity Asset Base</span>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 font-tech block">
            Active R&D Allocation
          </span>
          <div className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
            {financials.activeRndBudget}
          </div>
          <span className="text-[10px] text-cyan-600 font-bold">Direct Research Capital</span>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 font-tech block">
            Sovereign Reserves
          </span>
          <div className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
            {financials.sovereignReserves}
          </div>
          <span className="text-[10px] text-blue-600 font-bold">Unencumbered Liquidity</span>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 font-tech block">
            Institutional Nodes
          </span>
          <div className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
            {financials.institutionalPartners}
          </div>
          <span className="text-[10px] text-purple-600 font-bold">Tier-1 Strategic Alliances</span>
        </div>
      </div>

      {/* Wallet Balance Hero Card */}
      <div className="rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 text-white p-6 sm:p-10 border border-slate-800 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-blue-300 uppercase tracking-widest mb-1">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Verified Ecosystem Treasury Account</span>
            </div>
            <div className="text-3xl sm:text-5xl font-black font-heading tracking-tight text-white mt-2">
              ${walletBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <p className="text-xs text-slate-400 mt-2">
              Available balance for research syndication, project backing, and hardware pre-orders.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setModalType('deposit')}
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs sm:text-sm transition-colors flex items-center gap-1.5 shadow-md"
            >
              <ArrowDownLeft className="w-4 h-4" />
              <span>Deposit Funds</span>
            </button>
            <button
              onClick={() => setModalType('withdraw')}
              className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm border border-white/20 transition-colors flex items-center gap-1.5 backdrop-blur-md"
            >
              <ArrowUpRight className="w-4 h-4" />
              <span>Withdraw</span>
            </button>
            <button
              onClick={() => setModalType('invest')}
              className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs sm:text-sm transition-colors flex items-center gap-1.5 shadow-md"
            >
              <TrendingUp className="w-4 h-4" />
              <span>Allocate to Project</span>
            </button>
          </div>
        </div>
      </div>

      {/* Featured Project Syndicates / Opportunities */}
      <div className="space-y-4">
        <h3 className="text-lg sm:text-xl font-bold text-slate-900 font-heading flex items-center gap-2">
          <PieChart className="w-5 h-5 text-blue-600" />
          <span>Active Project Investment Tranches</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            {
              name: 'Helium Flowzen X1',
              round: 'Phase IV Photonic Scale',
              target: '$24.0M',
              raised: '84%',
              desc: 'Sub-nanometer silicon packaging and optical wave distribution.'
            },
            {
              name: 'HIMADRI Smart Cities',
              round: 'Series B Municipal',
              target: '$18.5M',
              raised: '92%',
              desc: 'Subsurface pneumatic transport and dynamic urban grid OS.'
            },
            {
              name: 'BEDHA Space',
              round: 'Orbital Logistics Tranche',
              target: '$45.0M',
              raised: '68%',
              desc: 'Reusable space transport and orbital microwave clean power.'
            }
          ].map((item, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bedha-card flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="font-bold text-blue-600 font-tech uppercase">{item.round}</span>
                  <span className="font-semibold text-emerald-600">{item.raised} Filled</span>
                </div>
                <h4 className="text-base font-bold text-slate-900 font-heading mb-1">
                  {item.name}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  {item.desc}
                </p>

                <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden mb-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                    style={{ width: item.raised }}
                  />
                </div>
                <div className="flex justify-between text-[11px] text-slate-600">
                  <span>Target: {item.target}</span>
                  <span className="font-medium text-slate-700">Min: $100</span>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100">
                <button
                  onClick={() => {
                    setTargetProject(item.name);
                    setModalType('invest');
                  }}
                  className="w-full py-2 rounded-xl bg-blue-50 hover:bg-blue-600 hover:text-white text-blue-600 font-bold text-xs transition-colors"
                >
                  Allocate Capital
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Transaction History Table */}
      <div className="rounded-3xl bedha-card p-6 space-y-4">
        <h3 className="text-base font-bold text-slate-900 font-heading flex items-center gap-2">
          <Clock className="w-4 h-4 text-blue-600" />
          <span>Treasury Transaction Ledger</span>
        </h3>

        <div className="overflow-x-auto no-scrollbar">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-600 uppercase tracking-wider font-tech">
                <th className="pb-3 font-bold">Reference</th>
                <th className="pb-3 font-bold">Type</th>
                <th className="pb-3 font-bold">Method / Initiative</th>
                <th className="pb-3 font-bold">Date</th>
                <th className="pb-3 font-bold text-right">Amount</th>
                <th className="pb-3 font-bold text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {transactions.map(tx => (
                <tr key={tx.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3 font-mono text-slate-700">{tx.reference}</td>
                  <td className="py-3">
                    <span
                      className={`px-2 py-0.5 rounded-md font-bold text-[10px] uppercase tracking-wider ${
                        tx.type === 'Deposit' || tx.type === 'Reward'
                          ? 'bg-emerald-50 text-emerald-700'
                          : 'bg-blue-50 text-blue-700'
                      }`}
                    >
                      {tx.type}
                    </span>
                  </td>
                  <td className="py-3 text-slate-600">{tx.method}</td>
                  <td className="py-3 text-slate-600">{tx.date}</td>
                  <td className="py-3 text-right font-mono font-bold text-slate-900">
                    {tx.type === 'Withdraw' || tx.type === 'Investment' ? '-' : '+'}
                    ${tx.amount.toLocaleString()}
                  </td>
                  <td className="py-3 text-right">
                    <span className="inline-flex items-center gap-1 text-emerald-600 font-medium">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>{tx.status}</span>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Transaction Modal (Deposit / Withdraw / Invest) */}
      {modalType && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in">
          <div className="relative w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl border border-slate-200 space-y-4">
            <h3 className="text-lg font-bold text-slate-900 font-heading capitalize">
              {modalType === 'deposit' && 'Deposit into BEDHA Treasury'}
              {modalType === 'withdraw' && 'Withdraw from BEDHA Treasury'}
              {modalType === 'invest' && `Allocate Capital to ${targetProject}`}
            </h3>

            <form onSubmit={handleAction} className="space-y-4">
              {modalType === 'invest' && (
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
                    Select Venture
                  </label>
                  <select
                    value={targetProject}
                    onChange={e => setTargetProject(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm bg-white"
                  >
                    {projects.map(p => (
                      <option key={p.id} value={p.name}>
                        {p.name} ({p.category})
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
                  Amount ($ USD)
                </label>
                <div className="relative">
                  <DollarSign className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="number"
                    min="10"
                    max={modalType === 'withdraw' ? walletBalance : 100000}
                    value={amountInput}
                    onChange={e => setAmountInput(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-300 text-sm font-mono font-bold"
                  />
                </div>
                {modalType === 'withdraw' && (
                  <span className="text-[10px] text-slate-600 mt-1 block">
                    Maximum withdrawable: ${walletBalance.toLocaleString()}
                  </span>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
                  Channel / Protocol
                </label>
                <select
                  value={paymentMethod}
                  onChange={e => setPaymentMethod(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm bg-white"
                >
                  <option value="Direct Bank Wire / ACH">Direct Bank Wire / ACH</option>
                  <option value="BEDHA Sovereign Settlement">BEDHA Sovereign Settlement</option>
                  <option value="Institutional Liquidity Node">Institutional Liquidity Node</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setModalType(null)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-xs"
                >
                  Confirm Action
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
