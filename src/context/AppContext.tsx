import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  ProjectItem,
  ServiceItem,
  CategoryItem,
  NewsPost,
  MediaItem,
  BannerSlide,
  UserProfile,
  NotificationItem,
  TransactionItem,
  UserRole,
  EcosystemFinancials
} from '../types';
import {
  INITIAL_USER,
  INITIAL_PROJECTS,
  INITIAL_SERVICES,
  INITIAL_CATEGORIES,
  INITIAL_BANNERS,
  INITIAL_NEWS,
  INITIAL_MEDIA,
  INITIAL_NOTIFICATIONS,
  INITIAL_TRANSACTIONS,
  INITIAL_FINANCIALS,
  normalizeProject
} from '../data/initialData';

export type AppSection =
  | 'home'
  | 'category'
  | 'projects'
  | 'news'
  | 'investment'
  | 'invite'
  | 'bedha-ai'
  | 'chat'
  | 'media'
  | 'profile'
  | 'settings'
  | 'contact'
  | 'admin';

interface AppContextType {
  user: UserProfile;
  setUser: React.Dispatch<React.SetStateAction<UserProfile>>;
  switchUserRole: (role: UserRole) => void;
  activeSection: AppSection;
  setActiveSection: (section: AppSection) => void;
  
  // Projects
  projects: ProjectItem[];
  addProject: (project: Partial<ProjectItem>) => Promise<ProjectItem>;
  updateProject: (id: string, updates: Partial<ProjectItem>) => Promise<void>;
  deleteProject: (id: string) => Promise<void>;
  reorderProjects: (newOrder: ProjectItem[]) => Promise<void>;
  activeProjectModal: ProjectItem | null;
  setActiveProjectModal: (proj: ProjectItem | null) => void;

  // Dedicated Project Editor
  editingProject: ProjectItem | null;
  isEditProjectModalOpen: boolean;
  setEditProjectModalOpen: (open: boolean) => void;
  openProjectEditor: (project?: ProjectItem | null) => void;

  // Media & Upload helper
  uploadImageFile: (file: File) => Promise<string>;

  // Financials
  financials: EcosystemFinancials;
  updateFinancials: (updates: Partial<EcosystemFinancials>) => Promise<void>;

  // Services
  services: ServiceItem[];
  addService: (service: Omit<ServiceItem, 'id'>) => ServiceItem;

  // Categories
  categories: CategoryItem[];
  addCategory: (category: Omit<CategoryItem, 'id' | 'projectCount'>) => CategoryItem;

  // Banners
  banners: BannerSlide[];
  addBanner: (banner: Omit<BannerSlide, 'id'>) => BannerSlide;

  // News
  newsPosts: NewsPost[];
  addNewsPost: (post: Omit<NewsPost, 'id' | 'publishDate' | 'likes' | 'commentsCount'>) => NewsPost;
  deleteNewsPost: (id: string) => void;
  likeNewsPost: (id: string) => void;

  // Media
  mediaItems: MediaItem[];
  addMediaItem: (item: Omit<MediaItem, 'id' | 'dateAdded'>) => MediaItem;

  // Modals & Floating UI
  isAddEntityOpen: boolean;
  setAddEntityOpen: (open: boolean) => void;
  isSearchOpen: boolean;
  setSearchOpen: (open: boolean) => void;
  isAuthModalOpen: boolean;
  setAuthModalOpen: (open: boolean) => void;
  authModalMode: 'login' | 'signup';
  setAuthModalMode: (mode: 'login' | 'signup') => void;
  isChatOpen: boolean;
  setChatOpen: (open: boolean) => void;
  isNotificationsOpen: boolean;
  setNotificationsOpen: (open: boolean) => void;

  // Notifications
  notifications: NotificationItem[];
  unreadNotifsCount: number;
  markNotificationsAsRead: () => void;
  addNotification: (title: string, message: string, type?: NotificationItem['type']) => void;

  // Wallet / Investment (Safe Prototype)
  walletBalance: number;
  transactions: TransactionItem[];
  executeTransaction: (type: TransactionItem['type'], amount: number, method: string) => void;

  // Search
  searchQuery: string;
  setSearchQuery: (q: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // User State
  const [user, setUser] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('bedha_user');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (!parsed.avatarUrl || parsed.avatarUrl.includes('unsplash.com')) {
          parsed.avatarUrl = '/assets/brand/admin_photo.jpg';
        }
        return parsed;
      } catch (e) {
        return INITIAL_USER;
      }
    }
    return INITIAL_USER;
  });

  // Navigation State
  const [activeSection, setActiveSection] = useState<AppSection>('home');

  // Projects State
  const [projects, setProjects] = useState<ProjectItem[]>(() => {
    const saved = localStorage.getItem('bedha_projects');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed.map(normalizeProject);
        }
      } catch (e) {
        // fallback
      }
    }
    return INITIAL_PROJECTS;
  });

  // Financials State
  const [financials, setFinancials] = useState<EcosystemFinancials>(() => {
    const saved = localStorage.getItem('bedha_financials');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return INITIAL_FINANCIALS;
      }
    }
    return INITIAL_FINANCIALS;
  });

  // Services State
  const [services, setServices] = useState<ServiceItem[]>(() => {
    const saved = localStorage.getItem('bedha_services');
    return saved ? JSON.parse(saved) : INITIAL_SERVICES;
  });

  // Categories State
  const [categories, setCategories] = useState<CategoryItem[]>(() => {
    const saved = localStorage.getItem('bedha_categories');
    return saved ? JSON.parse(saved) : INITIAL_CATEGORIES;
  });

  // Banners State
  const [banners, setBanners] = useState<BannerSlide[]>(() => {
    const saved = localStorage.getItem('bedha_banners');
    return saved ? JSON.parse(saved) : INITIAL_BANNERS;
  });

  // News State
  const [newsPosts, setNewsPosts] = useState<NewsPost[]>(() => {
    const saved = localStorage.getItem('bedha_news');
    return saved ? JSON.parse(saved) : INITIAL_NEWS;
  });

  // Media State
  const [mediaItems, setMediaItems] = useState<MediaItem[]>(() => {
    const saved = localStorage.getItem('bedha_media');
    return saved ? JSON.parse(saved) : INITIAL_MEDIA;
  });

  // Notifications State
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);

  // Wallet State
  const [walletBalance, setWalletBalance] = useState<number>(37400);
  const [transactions, setTransactions] = useState<TransactionItem[]>(INITIAL_TRANSACTIONS);

  // Modals
  const [activeProjectModal, setActiveProjectModal] = useState<ProjectItem | null>(null);
  const [editingProject, setEditingProject] = useState<ProjectItem | null>(null);
  const [isEditProjectModalOpen, setEditProjectModalOpen] = useState(false);
  const [isAddEntityOpen, setAddEntityOpen] = useState(false);
  const [isSearchOpen, setSearchOpen] = useState(false);
  const [isAuthModalOpen, setAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'signup'>('login');
  const [isChatOpen, setChatOpen] = useState(false);
  const [isNotificationsOpen, setNotificationsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch initial data from server on startup
  useEffect(() => {
    fetch('/api/projects')
      .then(res => (res.ok ? res.json() : null))
      .then(serverProjects => {
        if (Array.isArray(serverProjects) && serverProjects.length > 0) {
          const normalized = serverProjects.map(normalizeProject);
          setProjects(normalized);
          localStorage.setItem('bedha_projects', JSON.stringify(normalized));
        }
      })
      .catch(err => console.warn('Could not sync projects from server:', err));

    fetch('/api/financials')
      .then(res => (res.ok ? res.json() : null))
      .then(serverFin => {
        if (serverFin && serverFin.ecosystemValuation) {
          setFinancials(serverFin);
          localStorage.setItem('bedha_financials', JSON.stringify(serverFin));
        }
      })
      .catch(err => console.warn('Could not sync financials:', err));

    fetch('/api/news')
      .then(res => (res.ok ? res.json() : null))
      .then(serverNews => {
        if (Array.isArray(serverNews) && serverNews.length > 0) {
          setNewsPosts(serverNews);
          localStorage.setItem('bedha_news', JSON.stringify(serverNews));
        }
      })
      .catch(err => console.warn('Could not sync news:', err));
  }, []);

  // Persist to localStorage safely
  useEffect(() => {
    localStorage.setItem('bedha_user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('bedha_projects', JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem('bedha_financials', JSON.stringify(financials));
  }, [financials]);

  useEffect(() => {
    localStorage.setItem('bedha_services', JSON.stringify(services));
  }, [services]);

  useEffect(() => {
    localStorage.setItem('bedha_categories', JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem('bedha_news', JSON.stringify(newsPosts));
  }, [newsPosts]);

  const switchUserRole = (role: UserRole) => {
    setUser(prev => ({
      ...prev,
      role,
      title: role === 'admin' ? 'BEDHA Founder & Administrator' : role === 'authorized' ? 'BEDHA Research Lead' : role === 'registered' ? 'BEDHA Community Member' : 'Guest Visitor'
    }));
  };

  const openProjectEditor = (project?: ProjectItem | null) => {
    if (project) {
      setEditingProject(project);
    } else {
      setEditingProject(null); // Add new project mode
    }
    setEditProjectModalOpen(true);
  };

  const uploadImageFile = async (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = async () => {
        try {
          const base64 = reader.result as string;
          const res = await fetch('/api/upload', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ filename: file.name, base64 })
          });
          if (res.ok) {
            const data = await res.json();
            resolve(data.url);
          } else {
            // fallback to base64 if server offline
            resolve(base64);
          }
        } catch (err) {
          // fallback
          resolve(reader.result as string);
        }
      };
      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.readAsDataURL(file);
    });
  };

  const addProject = async (item: Partial<ProjectItem>): Promise<ProjectItem> => {
    const newId = item.id || `proj_${Date.now()}`;
    const normalized = normalizeProject({
      ...item,
      id: newId,
      date: item.date || item.creationDate || new Date().toISOString().split('T')[0]
    });

    setProjects(prev => [normalized, ...prev]);
    // update category projectCount
    setCategories(prev =>
      prev.map(cat => (cat.name === normalized.category ? { ...cat, projectCount: cat.projectCount + 1 } : cat))
    );
    addNotification('New Project Launched', `${normalized.name} was successfully registered in the BEDHA ecosystem.`, 'project');

    // Sync to server
    try {
      await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(normalized)
      });
    } catch (err) {
      console.warn('Server project save failed, saved locally:', err);
    }

    return normalized;
  };

  const updateProject = async (id: string, updates: Partial<ProjectItem>) => {
    setProjects(prev =>
      prev.map(p => {
        if (p.id === id) {
          return normalizeProject({ ...p, ...updates, id });
        }
        return p;
      })
    );
    if (activeProjectModal && activeProjectModal.id === id) {
      setActiveProjectModal(prev => (prev ? normalizeProject({ ...prev, ...updates, id }) : null));
    }
    if (editingProject && editingProject.id === id) {
      setEditingProject(prev => (prev ? normalizeProject({ ...prev, ...updates, id }) : null));
    }
    addNotification('Project Updated', `Changes to project were saved successfully.`, 'project');

    // Sync to server
    try {
      await fetch(`/api/projects/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates)
      });
    } catch (err) {
      console.warn('Server project update failed, saved locally:', err);
    }
  };

  const deleteProject = async (id: string) => {
    setProjects(prev => prev.filter(p => p.id !== id));
    if (activeProjectModal && activeProjectModal.id === id) {
      setActiveProjectModal(null);
    }
    if (editingProject && editingProject.id === id) {
      setEditingProject(null);
      setEditProjectModalOpen(false);
    }
    addNotification('Project Removed', `Project was removed from the active directory.`, 'project');

    // Sync to server
    try {
      await fetch(`/api/projects/${id}`, { method: 'DELETE' });
    } catch (err) {
      console.warn('Server project delete failed, saved locally:', err);
    }
  };

  const reorderProjects = async (newOrder: ProjectItem[]) => {
    const normalized = newOrder.map(normalizeProject);
    setProjects(normalized);
    try {
      await fetch('/api/projects/reorder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ projects: normalized })
      });
    } catch (err) {
      console.warn('Server reorder failed:', err);
    }
  };

  const updateFinancials = async (updates: Partial<EcosystemFinancials>) => {
    const updated = { ...financials, ...updates };
    setFinancials(updated);
    try {
      await fetch('/api/financials', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated)
      });
    } catch (err) {
      console.warn('Server financials update failed:', err);
    }
  };

  const addService = (srv: Omit<ServiceItem, 'id'>): ServiceItem => {
    const newSrv: ServiceItem = {
      ...srv,
      id: `srv_${Date.now()}`
    };
    setServices(prev => [...prev, newSrv]);
    addNotification('New Ecosystem Service', `${newSrv.name} has been added to the services directory.`, 'system');
    return newSrv;
  };

  const addCategory = (cat: Omit<CategoryItem, 'id' | 'projectCount'>): CategoryItem => {
    const newCat: CategoryItem = {
      ...cat,
      id: `cat_${Date.now()}`,
      projectCount: 0
    };
    setCategories(prev => [...prev, newCat]);
    return newCat;
  };

  const addBanner = (b: Omit<BannerSlide, 'id'>): BannerSlide => {
    const newBanner: BannerSlide = {
      ...b,
      id: `banner_${Date.now()}`
    };
    setBanners(prev => [...prev, newBanner]);
    return newBanner;
  };

  const addNewsPost = (post: Omit<NewsPost, 'id' | 'publishDate' | 'likes' | 'commentsCount'>): NewsPost => {
    const newPost: NewsPost = {
      ...post,
      id: `news_${Date.now()}`,
      publishDate: 'Just now',
      likes: 1,
      commentsCount: 0
    };
    setNewsPosts(prev => [newPost, ...prev]);
    addNotification('New Ecosystem Broadcast', newPost.title, 'news');

    // Sync to server
    fetch('/api/news', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newPost)
    }).catch(err => console.warn('Could not sync news to server:', err));

    return newPost;
  };

  const deleteNewsPost = (id: string) => {
    setNewsPosts(prev => prev.filter(p => p.id !== id));
    fetch(`/api/news/${id}`, { method: 'DELETE' }).catch(err => console.warn('Could not sync delete to server:', err));
  };

  const likeNewsPost = (id: string) => {
    setNewsPosts(prev =>
      prev.map(p => (p.id === id ? { ...p, likes: p.likes + 1 } : p))
    );
  };

  const addMediaItem = (item: Omit<MediaItem, 'id' | 'dateAdded'>): MediaItem => {
    const newMedia: MediaItem = {
      ...item,
      id: `media_${Date.now()}`,
      dateAdded: new Date().toISOString().split('T')[0]
    };
    setMediaItems(prev => [newMedia, ...prev]);
    return newMedia;
  };

  const unreadNotifsCount = notifications.filter(n => !n.read).length;

  const markNotificationsAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const addNotification = (title: string, message: string, type: NotificationItem['type'] = 'system') => {
    const newNotif: NotificationItem = {
      id: `notif_${Date.now()}`,
      title,
      message,
      type,
      timestamp: 'Just now',
      read: false
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const executeTransaction = (type: TransactionItem['type'], amount: number, method: string) => {
    const newTx: TransactionItem = {
      id: `tx_${Date.now()}`,
      type,
      amount,
      date: new Date().toLocaleString(),
      status: 'Successful',
      reference: `BDH-TX-${Math.floor(100000 + Math.random() * 900000)}`,
      method
    };
    setTransactions(prev => [newTx, ...prev]);
    if (type === 'Deposit' || type === 'Reward') {
      setWalletBalance(prev => prev + amount);
    } else if (type === 'Withdraw' || type === 'Investment') {
      setWalletBalance(prev => Math.max(0, prev - amount));
    }
    addNotification('Wallet Activity', `${type} of $${amount.toLocaleString()} completed successfully.`, 'wallet');
  };

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        switchUserRole,
        activeSection,
        setActiveSection,
        projects,
        addProject,
        updateProject,
        deleteProject,
        reorderProjects,
        activeProjectModal,
        setActiveProjectModal,
        editingProject,
        isEditProjectModalOpen,
        setEditProjectModalOpen,
        openProjectEditor,
        uploadImageFile,
        financials,
        updateFinancials,
        services,
        addService,
        categories,
        addCategory,
        banners,
        addBanner,
        newsPosts,
        addNewsPost,
        deleteNewsPost,
        likeNewsPost,
        mediaItems,
        addMediaItem,
        isAddEntityOpen,
        setAddEntityOpen,
        isSearchOpen,
        setSearchOpen,
        isAuthModalOpen,
        setAuthModalOpen,
        authModalMode,
        setAuthModalMode,
        isChatOpen,
        setChatOpen,
        isNotificationsOpen,
        setNotificationsOpen,
        notifications,
        unreadNotifsCount,
        markNotificationsAsRead,
        addNotification,
        walletBalance,
        transactions,
        executeTransaction,
        searchQuery,
        setSearchQuery
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
