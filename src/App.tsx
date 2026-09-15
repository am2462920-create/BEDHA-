/**
 * BEDHA Technology Ecosystem Application Entry
 * Built for scalable future expansion across projects, services, categories, and AI.
 */
import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { Footer } from './components/Footer';
import { FloatingChat } from './components/FloatingChat';
import { ChatModal } from './components/ChatModal';
import { SearchModal } from './components/SearchModal';
import { NotificationsModal } from './components/NotificationsModal';
import { AddEntityModal } from './components/AddEntityModal';
import { ProjectDetailModal } from './components/ProjectDetailModal';
import { AdminEditProjectModal } from './components/AdminEditProjectModal';
import { AdminControlPanel } from './components/AdminControlPanel';

// Views
import { HomeView } from './views/HomeView';
import { CategoryView } from './views/CategoryView';
import { ProjectsView } from './views/ProjectsView';
import { NewsView } from './views/NewsView';
import { InvestmentView } from './views/InvestmentView';
import { InviteView } from './views/InviteView';
import { BedhaAiView } from './views/BedhaAiView';
import { MediaView } from './views/MediaView';
import { ProfileView } from './views/ProfileView';
import { SettingsView } from './views/SettingsView';
import { ContactView } from './views/ContactView';

const MainContent: React.FC = () => {
  const { activeSection } = useApp();

  const renderSection = () => {
    switch (activeSection) {
      case 'home':
        return <HomeView />;
      case 'category':
        return <CategoryView />;
      case 'projects':
        return <ProjectsView />;
      case 'news':
        return <NewsView />;
      case 'investment':
        return <InvestmentView />;
      case 'invite':
        return <InviteView />;
      case 'bedha-ai':
        return <BedhaAiView />;
      case 'media':
        return <MediaView />;
      case 'profile':
        return <ProfileView />;
      case 'settings':
        return <SettingsView />;
      case 'contact':
        return <ContactView />;
      case 'admin':
        return <AdminControlPanel />;
      default:
        return <HomeView />;
    }
  };

  return (
    <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
      {renderSection()}
    </main>
  );
};

export default function App() {
  return (
    <AppProvider>
      <div className="min-h-screen flex flex-col bg-slate-50 bg-lotus-subtle text-slate-900 selection:bg-blue-600 selection:text-white relative">
        {/* Top Header */}
        <Header />

        {/* Dynamic Main View */}
        <MainContent />

        {/* Global Footer */}
        <Footer />

        {/* Mobile Bottom Navigation */}
        <BottomNav />

        {/* Draggable Floating Chat Button */}
        <FloatingChat />

        {/* Full Chat / BEDHA AI Dialog */}
        <ChatModal />

        {/* Global Search Dialog */}
        <SearchModal />

        {/* Ecosystem Notifications Dialog */}
        <NotificationsModal />

        {/* Add Entity / Project 17+ Dialog */}
        <AddEntityModal />

        {/* Detailed Project Modal */}
        <ProjectDetailModal />

        {/* Owner/Admin Project Editor Modal */}
        <AdminEditProjectModal />
      </div>
    </AppProvider>
  );
}
