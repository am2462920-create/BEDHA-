import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode';
import {
  UserPlus,
  Copy,
  Check,
  Share2,
  Gift,
  Users,
  Award,
  ArrowRight,
  Phone,
  Send,
  Facebook,
  Twitter
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const InviteView: React.FC = () => {
  const { user, addNotification } = useApp();
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [qrDataUrl, setQrDataUrl] = useState<string>('');

  const referralCode = user.referralCode || 'BEDHA-BM987';
  const referralLink = `${window.location.origin}?ref=${referralCode}`;

  useEffect(() => {
    QRCode.toDataURL(referralLink, {
      width: 240,
      margin: 2,
      color: {
        dark: '#0f172a',
        light: '#ffffff'
      }
    })
      .then(url => setQrDataUrl(url))
      .catch(err => console.error(err));
  }, [referralLink]);

  const handleCopyLink = () => {
    navigator.clipboard?.writeText(referralLink);
    setCopiedLink(true);
    addNotification('Referral Link Copied', 'Your unique invitation link has been copied.', 'system');
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleCopyCode = () => {
    navigator.clipboard?.writeText(referralCode);
    setCopiedCode(true);
    addNotification('Referral Code Copied', `Code ${referralCode} copied.`, 'system');
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="space-y-8 pb-12 max-w-4xl mx-auto">
      {/* Header */}
      <div>
        <div className="text-xs font-bold uppercase tracking-wider text-blue-600 font-tech">
          Community Growth Protocol
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 font-heading">
          Invite Friends to BEDHA
        </h2>
        <p className="text-sm text-slate-600 mt-1">
          Expand the BEDHA technology community. Earn ecosystem points and research priority
          access when peers register through your invitation link.
        </p>
      </div>

      {/* Referral Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: 'Invited Members', value: `${user.referralCount || 14}`, sub: 'Active participants', icon: Users },
          { label: 'Ecosystem Credits', value: `$${(user.referralCount || 14) * 25}`, sub: 'Redeemable rewards', icon: Gift },
          { label: 'Network Tier', value: 'Founding Node', sub: 'Top 5% ambassador', icon: Award }
        ].map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="p-5 rounded-2xl bedha-card flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                <Icon className="w-6 h-6" />
              </div>
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-slate-600 font-tech">
                  {stat.label}
                </div>
                <div className="text-xl font-black text-slate-900 font-heading">
                  {stat.value}
                </div>
                <div className="text-xs text-slate-600">{stat.sub}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Share Box & QR Code Card */}
      <div className="rounded-3xl bedha-card p-6 sm:p-10 flex flex-col md:flex-row items-center gap-8">
        {/* Left: Interactive QR Code */}
        <div className="flex flex-col items-center p-4 bg-white rounded-2xl border border-slate-200 shadow-sm shrink-0">
          {qrDataUrl ? (
            <img
              src={qrDataUrl}
              alt="Referral QR Code"
              className="w-44 h-44 rounded-xl object-contain"
            />
          ) : (
            <div className="w-44 h-44 bg-slate-100 rounded-xl flex items-center justify-center text-xs text-slate-400">
              Generating QR...
            </div>
          )}
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mt-2">
            Scan to Join BEDHA
          </span>
        </div>

        {/* Right: Code & Link Controls */}
        <div className="flex-1 w-full space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
              Your Personal Referral Code
            </label>
            <div className="flex items-center gap-2">
              <div className="flex-1 px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 font-mono font-bold text-slate-900 text-sm">
                {referralCode}
              </div>
              <button
                onClick={handleCopyCode}
                className="px-4 py-2.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 font-semibold text-xs transition-colors flex items-center gap-1.5"
              >
                {copiedCode ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                <span>{copiedCode ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
              Sharable Invitation URL
            </label>
            <div className="flex items-center gap-2">
              <div className="flex-1 px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 font-mono text-xs text-slate-700 truncate">
                {referralLink}
              </div>
              <button
                onClick={handleCopyLink}
                className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition-colors flex items-center gap-1.5 shadow-xs"
              >
                {copiedLink ? <Check className="w-4 h-4 text-white" /> : <Copy className="w-4 h-4" />}
                <span>{copiedLink ? 'Copied Link' : 'Copy Link'}</span>
              </button>
            </div>
          </div>

          {/* Social Share Buttons */}
          <div className="pt-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
              Quick Social Broadcast
            </label>
            <div className="flex flex-wrap items-center gap-2">
              <a
                href={`https://wa.me/?text=${encodeURIComponent(`Join me on BEDHA - The Next-Generation Technology Ecosystem: ${referralLink}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-semibold text-xs flex items-center gap-1.5 transition-colors"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </a>

              <a
                href={`https://t.me/share/url?url=${encodeURIComponent(referralLink)}&text=${encodeURIComponent('Explore the BEDHA technology ecosystem!')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2 rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-700 font-semibold text-xs flex items-center gap-1.5 transition-colors"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Telegram</span>
              </a>

              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`Exploring the future of photonics, quantum computing, and smart cities on BEDHA: ${referralLink}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 font-semibold text-xs flex items-center gap-1.5 transition-colors"
              >
                <Twitter className="w-3.5 h-3.5" />
                <span>Twitter / X</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
