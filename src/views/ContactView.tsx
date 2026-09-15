import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare, Check, ShieldCheck } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const ContactView: React.FC = () => {
  const { addNotification } = useApp();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    addNotification('Message Transmitted', 'Your inquiry has been relayed to the BEDHA Executive Office.', 'system');
    setTimeout(() => {
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
      setSent(false);
    }, 2500);
  };

  return (
    <div className="space-y-8 pb-12 max-w-4xl mx-auto">
      {/* Header */}
      <div>
        <div className="text-xs font-bold uppercase tracking-wider text-blue-600 font-tech">
          Executive Liaison & Partnerships
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 font-heading">
          Contact BEDHA
        </h2>
        <p className="text-sm text-slate-600 mt-1">
          Connect directly with the founder, institutional research teams, or media relations.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Founder & Direct Channel Card */}
        <div className="md:col-span-1 rounded-3xl bedha-card p-6 space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center gap-3.5">
              <div className="w-14 h-14 rounded-2xl overflow-hidden ring-2 ring-blue-500/30 shadow-md shrink-0 bg-slate-900">
                <img
                  src="/assets/brand/admin_photo.jpg"
                  alt="Brindaban Mondal"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 font-heading">
                  Brindaban Mondal
                </h3>
                <div className="text-xs text-blue-600 font-semibold">
                  Founder & Principal Architect
                </div>
              </div>
            </div>

            <div className="space-y-3 pt-2 text-xs">
              <a
                href="https://wa.me/917029687893"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 hover:bg-emerald-50 text-slate-700 hover:text-emerald-700 transition-colors border border-slate-200/80"
              >
                <Phone className="w-4 h-4 text-emerald-600 shrink-0" />
                <div className="truncate">
                  <div className="font-bold">WhatsApp / Direct</div>
                  <div className="text-slate-500 font-mono">7029687893</div>
                </div>
              </a>

              <a
                href="mailto:brindabanmondal987@gmail.com"
                className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 hover:bg-blue-50 text-slate-700 hover:text-blue-700 transition-colors border border-slate-200/80"
              >
                <Mail className="w-4 h-4 text-blue-600 shrink-0" />
                <div className="truncate">
                  <div className="font-bold">Official Email</div>
                  <div className="text-slate-500 truncate font-mono">
                    brindabanmondal987@gmail.com
                  </div>
                </div>
              </a>

              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 text-slate-700 border border-slate-200/80">
                <MapPin className="w-4 h-4 text-slate-500 shrink-0" />
                <div>
                  <div className="font-bold">BEDHA Headquarters</div>
                  <div className="text-slate-500">Global Tech & Innovation Center</div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-blue-50/60 border border-blue-100 text-[11px] text-slate-600">
            Official response guaranteed within 24 hours for verified research partners.
          </div>
        </div>

        {/* Message Form Card */}
        <div className="md:col-span-2 rounded-3xl bedha-card p-6 sm:p-8">
          <h3 className="text-lg font-bold text-slate-900 font-heading mb-1">
            Transmit Direct Inquiry
          </h3>
          <p className="text-xs text-slate-600 mb-6">
            Submit your inquiry regarding partnerships, capital deployment, or technical licensing.
          </p>

          {sent ? (
            <div className="p-8 text-center space-y-3 bg-emerald-50 rounded-2xl border border-emerald-200 animate-in fade-in">
              <Check className="w-10 h-10 text-emerald-600 mx-auto" />
              <div className="text-base font-bold text-emerald-900">
                Inquiry Successfully Relayed
              </div>
              <p className="text-xs text-emerald-700 max-w-sm mx-auto">
                Thank you. Founder Brindaban Mondal and the BEDHA team will review your dispatch.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
                    Your Email *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="name@organization.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
                  Topic / Area of Interest
                </label>
                <input
                  type="text"
                  placeholder="e.g. Helium Flowzen X1 Silicon Sampling / Smart City Pilot"
                  value={subject}
                  onChange={e => setSubject(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
                  Message Details *
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Elaborate on your collaboration proposal or question..."
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm transition-colors shadow-md flex items-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Transmit Inquiry</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
