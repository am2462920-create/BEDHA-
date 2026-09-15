export type UserRole = 'visitor' | 'registered' | 'authorized' | 'admin';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: UserRole;
  avatarUrl: string;
  title?: string;
  joinedDate: string;
  joinDate?: string;
  referralCode: string;
  referralsCount: number;
  referralCount?: number;
}

export type ProjectStatus = 'Active' | 'Development' | 'Alpha' | 'Beta' | 'Production' | 'Vision';

export interface ProjectSpecification {
  key: string;
  value: string;
}

export interface ProjectMilestone {
  title: string;
  date?: string;
  status?: string;
  description?: string;
}

export interface ProjectMetric {
  label: string;
  value: string;
  change?: string;
}

export interface ProjectItem {
  id: string;
  name: string;
  entity: string; // Company / Organization / Entity name
  category: string;
  status: ProjectStatus;
  date: string; // Launch or Genesis date
  logo: string;
  heroImage: string; // Main showcase hero image
  gallery: string[];
  shortDescription: string;
  fullDescription: string;
  executiveOverview: string;
  breakthroughs: string[];
  capabilities: string[];
  specifications: ProjectSpecification[];
  technologies: string[];
  milestones: ProjectMilestone[];
  futureVision: string;
  metrics: ProjectMetric[];
  tags: string[];

  // Backwards-compatible aliases for existing components
  coverImage?: string;
  description?: string;
  detailedDescription?: string;
  leadCompany?: string;
  creationDate?: string;
  features?: string[];
  specs?: Record<string, string>;
  websiteUrl?: string;
  isFeatured?: boolean;
}

export interface EcosystemFinancials {
  ecosystemValuation: string;
  activeCapitalDeployed: string;
  treasuryReserves: string;
  communityMembersCount: string;
  quarterlyGrowthRate: string;
  lastAuditedDate: string;
}

export interface ServiceItem {
  id: string;
  name: string;
  category: string;
  description: string;
  iconName: string;
  image?: string;
  badge?: string;
  targetProjectId?: string;
}

export interface CategoryItem {
  id: string;
  name: string;
  description: string;
  iconName: string;
  projectCount: number;
  featuredImageUrl?: string;
}

export interface NewsPost {
  id: string;
  title: string;
  content: string;
  authorName: string;
  authorEmail: string;
  authorRole: UserRole;
  publishDate: string;
  imageUrl?: string;
  videoUrl?: string;
  tags: string[];
  likes: number;
  commentsCount: number;
  isPinned?: boolean;
}

export interface MediaItem {
  id: string;
  title: string;
  type: 'image' | 'video' | 'document';
  url: string;
  thumbnailUrl: string;
  category: string;
  relatedProjectName?: string;
  dateAdded: string;
  aspectRatio?: string;
  description?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant' | 'ai';
  text: string;
  timestamp: string;
  isLoading?: boolean;
}

export interface ChatConversation {
  id: string;
  title: string;
  preview?: string;
  lastMessage?: string;
  updatedAt: string;
  messages: ChatMessage[];
  unread?: boolean;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: 'project' | 'news' | 'system' | 'security' | 'wallet';
  timestamp: string;
  read: boolean;
  actionUrl?: string;
}

export type TransactionStatus = 'Pending' | 'Successful' | 'Failed' | 'Refunded';

export interface TransactionItem {
  id: string;
  type: 'Deposit' | 'Withdraw' | 'Reward' | 'Investment';
  amount: number;
  date: string;
  status: TransactionStatus;
  reference: string;
  method: string;
}

export interface BannerSlide {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  imageUrl: string;
  ctaText: string;
  ctaActionSection: string;
  badge?: string;
}
