import React, { useState, useRef } from 'react';
import {
  User,
  ShieldCheck,
  Mail,
  Phone,
  Calendar,
  Key,
  Award,
  Users,
  CheckCircle2,
  Lock,
  Plus,
  Settings,
  Camera
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { UserRole } from '../types';

export const ProfileView: React.FC = () => {
  const { user, setUser, switchUserRole, setAddEntityOpen, setActiveSection, addNotification } = useApp();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone || '7029687893');

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        if (result) {
          setUser(prev => ({
            ...prev,
            avatarUrl: result
          }));
          addNotification('Admin Photo Updated', 'Profile avatar photo updated successfully.', 'system');
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setUser(prev => ({
      ...prev,
      name,
      email,
      phone
    }));
    setIsEditing(false);
    addNotification('Profile Saved', 'Profile credentials updated.', 'system');
  };

  const roles: { role: UserRole; title: string; desc: string }[] = [
    {
      role: 'admin',
      title: 'Founder & Administrator',
      desc: 'Full control over project directory, services, broadcasts, and system metadata.'
    },
    {
      role: 'authorized',
      title: 'Authorized Research Lead',
      desc: 'Can publish new projects, update specifications, and add media blueprints.'
    },
    {
      role: 'registered',
      title: 'Registered Ecosystem Member',
      desc: 'Can allocate investment capital, access chat dialogues, and participate in surveys.'
    },
    {
      role: 'visitor',
      title: 'Guest Visitor',
      desc: 'Public read-only browsing of the BEDHA technology ecosystem.'
    }
  ];

  return (
    <div className="space-y-8 pb-12 max-w-4xl mx-auto">
      {/* Profile Card Header */}
      <div className="rounded-3xl bedha-card p-6 sm:p-10 flex flex-col sm:flex-row items-center sm:items-start gap-6 relative overflow-hidden">
        <div className="relative group shrink-0">
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl overflow-hidden ring-4 ring-blue-100 shadow-md bg-slate-900">
            <img
              src={user.avatarUrl}
              alt={user.name}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
          </div>
          <button
            onClick={() => fileInputRef.current?.click()}
            title="Change Profile Photo"
            className="absolute -bottom-1 -right-1 w-9 h-9 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-lg hover:bg-blue-700 transition-all border-2 border-white ring-2 ring-blue-500/30"
          >
            <Camera className="w-4 h-4" />
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleAvatarUpload}
            className="hidden"
          />
        </div>

        <div className="flex-1 text-center sm:text-left space-y-2">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-heading">
                {user.name}
              </h2>
              <div className="text-sm font-semibold text-blue-600">{user.title}</div>
            </div>

            <div className="flex items-center gap-2 justify-center sm:justify-end">
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider border border-blue-200">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>{user.role}</span>
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs text-slate-600 pt-2">
            <span className="flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-blue-600" />
              {user.email}
            </span>
            <span className="flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-emerald-600" />
              {user.phone}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              Joined {user.joinDate}
            </span>
          </div>
        </div>
      </div>

      {/* Access Control & Role Switcher */}
      <div className="rounded-3xl bedha-card p-6 sm:p-8 space-y-4">
        <div>
          <div className="text-xs font-bold uppercase tracking-wider text-blue-600 font-tech">
            Access Control System
          </div>
          <h3 className="text-xl font-bold text-slate-900 font-heading">
            Switch Testing Role
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Test how the BEDHA interface renders across each user permission level.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          {roles.map(item => {
            const isCurrent = user.role === item.role;
            return (
              <button
                key={item.role}
                onClick={() => switchUserRole(item.role)}
                className={`p-4 rounded-2xl text-left border transition-all flex flex-col justify-between ${
                  isCurrent
                    ? 'bg-blue-50 border-blue-400 ring-2 ring-blue-200'
                    : 'bg-white border-slate-200 hover:border-blue-200 hover:bg-slate-50'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-slate-900 font-heading">
                      {item.title}
                    </span>
                    {isCurrent && <CheckCircle2 className="w-4 h-4 text-blue-600" />}
                  </div>
                  <p className="text-xs text-slate-600 mt-1">{item.desc}</p>
                </div>

                <div className="mt-3 text-[10px] uppercase tracking-wider font-bold text-blue-600 font-tech">
                  Role: {item.role}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Admin Action Shortcuts */}
      {(user.role === 'admin' || user.role === 'authorized') && (
        <div className="rounded-3xl bg-blue-900 text-white p-6 sm:p-8 space-y-4 shadow-xl">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-blue-400" />
            <h3 className="text-lg font-bold font-heading">
              Administrative & Founder Privileges
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-blue-100">
            As an authorized administrator, you have permission to expand the 16 core projects to
            unlimited future ventures (Project 17, 18, 19...), register new services, and publish news dispatches.
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            <button
              onClick={() => setActiveSection('admin')}
              className="px-4 py-2.5 rounded-xl bg-cyan-400 text-slate-950 text-xs font-bold hover:bg-cyan-300 transition-colors flex items-center gap-1.5 shadow-md"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Owner & Admin Control Suite</span>
            </button>
            <button
              onClick={() => setAddEntityOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-white text-blue-900 text-xs font-bold hover:bg-blue-50 transition-colors flex items-center gap-1.5 shadow-xs"
            >
              <Plus className="w-4 h-4" />
              <span>Register New Project</span>
            </button>
            <button
              onClick={() => setActiveSection('news')}
              className="px-4 py-2.5 rounded-xl bg-blue-800 text-white text-xs font-semibold hover:bg-blue-700 transition-colors"
            >
              Broadcast News Feed
            </button>
            <button
              onClick={() => setActiveSection('settings')}
              className="px-4 py-2.5 rounded-xl bg-blue-800 text-white text-xs font-semibold hover:bg-blue-700 transition-colors flex items-center gap-1.5"
            >
              <Settings className="w-3.5 h-3.5" />
              <span>Ecosystem Settings</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
