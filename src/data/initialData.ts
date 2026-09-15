import {
  ProjectItem,
  ServiceItem,
  CategoryItem,
  NewsPost,
  MediaItem,
  BannerSlide,
  TransactionItem,
  NotificationItem,
  UserProfile,
  ChatConversation,
  ProjectStatus,
  ProjectSpecification,
  ProjectMilestone,
  ProjectMetric,
  EcosystemFinancials
} from '../types';

export function normalizeProject(raw: Partial<ProjectItem> & { [key: string]: any }): ProjectItem {
  const name = raw.name || 'Untitled Project';
  const entity = raw.entity || raw.leadCompany || 'BEDHA Ecosystem';
  const category = raw.category || 'Technology';
  const status = (raw.status as ProjectStatus) || 'Active';
  const date = raw.date || raw.creationDate || new Date().toISOString().split('T')[0];
  const logo = raw.logo || '/assets/brand/bedha_logo.jpg';
  const heroImage = raw.heroImage || raw.coverImage || '/assets/brand/banner_ecosystem.jpg';
  const gallery = Array.isArray(raw.gallery) && raw.gallery.length > 0 ? raw.gallery : [heroImage];
  const shortDescription = raw.shortDescription || raw.description || 'Ecosystem initiative by BEDHA.';
  const fullDescription = raw.fullDescription || raw.detailedDescription || shortDescription;
  const executiveOverview = raw.executiveOverview || fullDescription;

  // Breakthroughs & capabilities
  const breakthroughs = Array.isArray(raw.breakthroughs) && raw.breakthroughs.length > 0
    ? raw.breakthroughs
    : Array.isArray(raw.features) && raw.features.length > 0
    ? raw.features
    : ['Next-generation proprietary architecture', 'High efficiency autonomous computing'];

  const capabilities = Array.isArray(raw.capabilities) && raw.capabilities.length > 0
    ? raw.capabilities
    : breakthroughs;

  // Specifications
  let specifications: ProjectSpecification[] = [];
  if (Array.isArray(raw.specifications) && raw.specifications.length > 0) {
    specifications = raw.specifications;
  } else if (raw.specs && typeof raw.specs === 'object') {
    specifications = Object.entries(raw.specs).map(([key, value]) => ({ key, value: String(value) }));
  } else {
    specifications = [
      { key: 'Architecture', value: `${name} Gen 1` },
      { key: 'Integration', value: 'BEDHA Neural Grid' }
    ];
  }

  // specs record for backwards compatibility
  const specsRecord: Record<string, string> = {};
  specifications.forEach(s => {
    specsRecord[s.key] = s.value;
  });

  // Technologies
  const technologies = Array.isArray(raw.technologies) && raw.technologies.length > 0
    ? raw.technologies
    : ['Neural Compute', 'Quantum Photonic', 'Autonomous Logic'];

  // Milestones
  const milestones: ProjectMilestone[] = Array.isArray(raw.milestones) && raw.milestones.length > 0
    ? raw.milestones
    : [
        { title: 'Foundational Research', date: 'Q1 2026', status: 'Completed', description: 'Core architectural validation completed.' },
        { title: 'Ecosystem Deployment', date: 'Q2 2026', status: 'Active', description: 'Live integration across BEDHA infrastructure.' }
      ];

  const futureVision = raw.futureVision || `Pioneering the future of ${category.toLowerCase()} across the global BEDHA ecosystem.`;

  const metrics: ProjectMetric[] = Array.isArray(raw.metrics) && raw.metrics.length > 0
    ? raw.metrics
    : [
        { label: 'Efficiency Index', value: '99.4%', change: '+18%' },
        { label: 'Grid Latency', value: '< 2.4ms', change: '-40%' }
      ];

  const tags = Array.isArray(raw.tags) && raw.tags.length > 0
    ? raw.tags
    : [category, 'Innovation', 'BEDHA 2026'];

  return {
    id: raw.id || `proj_${Date.now()}`,
    name,
    entity,
    category,
    status,
    date,
    logo,
    heroImage,
    gallery,
    shortDescription,
    fullDescription,
    executiveOverview,
    breakthroughs,
    capabilities,
    specifications,
    technologies,
    milestones,
    futureVision,
    metrics,
    tags,

    // Aliases
    coverImage: heroImage,
    description: shortDescription,
    detailedDescription: fullDescription,
    leadCompany: entity,
    creationDate: date,
    features: breakthroughs,
    specs: specsRecord,
    websiteUrl: raw.websiteUrl || `https://bedha.internal/${name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
    isFeatured: raw.isFeatured ?? true
  };
}

export const INITIAL_FINANCIALS: EcosystemFinancials = {
  ecosystemValuation: '$48.5 Billion',
  activeCapitalDeployed: '$12.4 Billion',
  treasuryReserves: '$6.8 Billion',
  communityMembersCount: '1,420,000+',
  quarterlyGrowthRate: '+34.8%',
  lastAuditedDate: 'Q1 2026'
};

export const INITIAL_USER: UserProfile = {
  id: 'user_admin_01',
  name: 'Brindaban Mondal',
  email: 'brindabanmondal987@gmail.com',
  phone: '7029687893',
  role: 'admin',
  avatarUrl: '/assets/brand/admin_photo.jpg',
  title: 'BEDHA Founder & Chief Architect',
  joinedDate: 'January 2026',
  joinDate: 'January 2026',
  referralCode: 'BEDHA-VIP-7029',
  referralsCount: 42,
  referralCount: 42
};

export const INITIAL_BANNERS: BannerSlide[] = [
  {
    id: 'banner_01',
    title: 'THE NEXT ERA OF HUMAN INNOVATION',
    subtitle: 'BEDHA ECOSYSTEM 2026',
    description: 'A unified frontier across neuromorphic silicon, autonomous flight, sentient AI, and sustainable planetary grids.',
    imageUrl: '/assets/brand/banner_ecosystem.jpg',
    ctaText: 'Explore Projects',
    ctaActionSection: 'projects',
    badge: 'Flagship Architecture'
  },
  {
    id: 'banner_02',
    title: 'HELIUM FLOWZEN X1',
    subtitle: 'SUB-NANOMETER SILICON ARCHITECTURE',
    description: 'Quantum-accelerated neural computing cores engineered for trillion-parameter ambient edge intelligence.',
    imageUrl: '/assets/brand/banner_chip.jpg',
    ctaText: 'View Chip Specs',
    ctaActionSection: 'projects',
    badge: 'Hardware Breakthrough'
  },
  {
    id: 'banner_03',
    title: 'BEDHA AI INTELLECT',
    subtitle: 'SENTIENT ECOSYSTEM ASSISTANT',
    description: 'Zero-latency neural network orchestration powering all 16 ecosystem companies and millions of interconnected nodes.',
    imageUrl: '/assets/brand/bedha_ai_robot.jpg',
    ctaText: 'Launch BEDHA AI',
    ctaActionSection: 'bedha-ai',
    badge: 'Real-time Intelligence'
  }
];

export const INITIAL_SERVICES: ServiceItem[] = [
  {
    id: 'srv_chips',
    name: 'Quantum Silicon',
    category: 'Semiconductor Technology',
    description: 'Helium Flowzen sub-nanometer wafer processing & neural accelerator dies.',
    iconName: 'Cpu',
    badge: 'Next-Gen',
    targetProjectId: 'proj_helium'
  },
  {
    id: 'srv_mobile',
    name: 'A1 Smartphone OS',
    category: 'Mobile Technology',
    description: 'Titanium-forged biometric neural communication hardware.',
    iconName: 'Smartphone',
    targetProjectId: 'proj_a1'
  },
  {
    id: 'srv_myplay',
    name: 'My Play App Store',
    category: 'Mobile Technology',
    description: 'Curated decentralized ecosystem applications, spatial tools & games.',
    iconName: 'Store',
    badge: 'Official Store',
    targetProjectId: 'proj_myplay'
  },
  {
    id: 'srv_fangon',
    name: 'Fangon Optics',
    category: 'Camera Manufacturing',
    description: 'Spectral cinematography sensors, computational multi-lens modules.',
    iconName: 'Camera',
    targetProjectId: 'proj_fangon'
  },
  {
    id: 'srv_ai',
    name: 'BEDHA AI Core',
    category: 'Artificial Intelligence',
    description: 'Autonomous synthetic reasoning, conversational agent & contextual search.',
    iconName: 'Bot',
    badge: 'Flagship AI',
    targetProjectId: 'proj_ai'
  },
  {
    id: 'srv_robotics',
    name: 'BEDHA Robotics',
    category: 'Robotics',
    description: 'Humanoid bi-pedal dynamics & agile precision industrial automation.',
    iconName: 'Activity',
    targetProjectId: 'proj_robotics'
  },
  {
    id: 'srv_home',
    name: 'BEDHA Home IoT',
    category: 'Smart Home',
    description: 'Zero-touch ambient dwelling automation and biometric climate harmony.',
    iconName: 'Home',
    targetProjectId: 'proj_home'
  },
  {
    id: 'srv_drones',
    name: 'Autonomous Drones',
    category: 'Drones',
    description: 'High-endurance optical swarm reconnaissance and aerial logistics.',
    iconName: 'Navigation',
    targetProjectId: 'proj_drones'
  },
  {
    id: 'srv_mobility',
    name: 'Intelligent EV',
    category: 'Mobility',
    description: 'Solid-state powertrain electric vehicles with self-calibrating autopilot.',
    iconName: 'Zap',
    targetProjectId: 'proj_mobility'
  },
  {
    id: 'srv_aero',
    name: 'Aero Aviation',
    category: 'Aviation',
    description: 'Next-generation eVTOL urban air transit and hyper-efficient jet craft.',
    iconName: 'Plane',
    targetProjectId: 'proj_aero'
  },
  {
    id: 'srv_himadri',
    name: 'HIMADRI Smart City',
    category: 'Smart City',
    description: 'Intelligent civic grid, autonomous municipal telemetry & green zones.',
    iconName: 'Building2',
    badge: 'Megaproject',
    targetProjectId: 'proj_himadri'
  },
  {
    id: 'srv_cloud',
    name: 'BEDHA Cloud Grid',
    category: 'Cloud',
    description: 'Decentralized high-throughput compute clusters and quantum storage.',
    iconName: 'Cloud',
    targetProjectId: 'proj_cloud'
  }
];

const RAW_PROJECTS: any[] = [
  {
    id: 'proj_helium',
    name: 'Helium Flowzen X1',
    entity: 'Helium Flowzen Technologies',
    category: 'Semiconductor Technology',
    shortDescription: 'Sub-Nanometer Quantum Silicon Architecture',
    fullDescription: 'Helium Flowzen X1 is BEDHA\'s flagship semiconductor venture, pioneering revolutionary sub-nanometer photonic neural processors. It powers real-time localized machine learning models with 80% reduced thermal dissipation and unrivaled tensor acceleration across the entire ecosystem.',
    executiveOverview: 'Helium Flowzen X1 represents a quantum leap in solid-state computing, combining sub-nanometer lithography with photonic interconnects to deliver 380 billion computing nodes on a single thermal-optimized die.',
    logo: '/assets/projects/helium_flowzen_logo.jpg',
    heroImage: '/assets/brand/banner_chip.jpg',
    coverImage: '/assets/brand/banner_chip.jpg',
    status: 'Active',
    breakthroughs: [
      'Sub-nanometer Photonic Silicon Die with Zero-Resistance Traces',
      'Quantum-assisted Tensor Processing Unit (Q-TPU)',
      'Ultra-low Power Neuromorphic Architecture (0.4pJ/MAC)',
      'Integrated High-Bandwidth Unified Memory (HBM4) at 3.2 TB/s'
    ],
    capabilities: [
      'Trillion-parameter neural network edge inferencing without cloud offload',
      'Instantaneous cryptographic matrix operations for post-quantum networks',
      'Direct optic-fiber interconnect bus interface for cluster scale-out'
    ],
    specifications: [
      { key: 'Transistor Density', value: '380 Billion Nodes' },
      { key: 'Architecture', value: 'BEDHA Flowzen Gen 1 RISC-Q' },
      { key: 'Process Node', value: 'Sub-nanometer Photonic Silicon' },
      { key: 'Thermal Design Power', value: '45W Peak Under Max Load' },
      { key: 'Primary Deployment', value: 'BEDHA AI, Mobile A1, HIMADRI Edge' }
    ],
    technologies: ['Quantum Silicon', 'Photonic Bus', 'RISC-Q', 'HBM4 Memory', 'Sub-Nanometer'],
    milestones: [
      { title: 'Wafer Tape-out', date: 'Dec 2025', status: 'Completed', description: 'First batch sub-nanometer test dies successfully passed cryogenic stress tests.' },
      { title: 'Pilot Integration', date: 'Feb 2026', status: 'Active', description: 'Deployed in A1 flagship handsets and BEDHA AI server clusters.' },
      { title: 'Mass Fabrication', date: 'Q3 2026', status: 'Upcoming', description: 'Commercial ramp-up for enterprise server grids and consumer devices.' }
    ],
    futureVision: 'Enabling autonomous ambient computing where artificial intelligence executes locally with zero power penalty and instantaneous human latency.',
    metrics: [
      { label: 'Compute Density', value: '380B Transistors', change: '+310%' },
      { label: 'Power Draw', value: '45W Peak', change: '-80%' },
      { label: 'Inference Latency', value: '0.18 ms', change: '-92%' }
    ],
    tags: ['Semiconductor', 'Quantum Silicon', 'Flagship Hardware', 'RISC-Q'],
    gallery: [
      '/assets/brand/banner_chip.jpg',
      '/assets/projects/helium_flowzen_logo.jpg',
      '/assets/brand/banner_ecosystem.jpg'
    ],
    websiteUrl: 'https://bedha.internal/helium-flowzen',
    date: '2026-01-15',
    creationDate: '2026-01-15',
    leadCompany: 'Helium Flowzen Technologies',
    isFeatured: true
  },
  {
    id: 'proj_a1',
    name: 'A1',
    entity: 'A1 Mobile Corporation',
    category: 'Mobile Technology',
    shortDescription: 'Next-Generation Titanium Smartphone',
    fullDescription: 'A1 is a revolutionary next-generation mobile hardware enterprise. Crafting handsets with liquid-metal titanium unibodies, borderless OLED arrays, and native Helium Flowzen X1 silicon integration, A1 redefines personal computing for modern visionaries.',
    executiveOverview: 'The A1 Smartphone merges aerospace-grade titanium, custom photonic silicon, and tactile BEDHA OS to produce a handheld supercomputer with infinite multi-day battery endurance and seamless spatial computing bridge.',
    logo: '/assets/projects/a1_brand_variants.jpg',
    heroImage: '/assets/projects/a1_g7_phone.jpg',
    coverImage: '/assets/projects/a1_g7_phone.jpg',
    status: 'Active',
    breakthroughs: [
      'Bespoke Titanium & Ceramic Chassis with zero flex',
      'Native Helium Flowzen Edge Co-processor with 50MP AI Vision Module',
      'True Spatial Holographic Display Capability with 240Hz refresh',
      'Zero-Latency Satellite Neural Link and local LLM execution'
    ],
    capabilities: [
      'On-device sovereign artificial intelligence with private memory isolation',
      '6500mAh solid-state cell supporting 180W flash charging in 12 minutes',
      'Dynamic ecosystem handoff to BEDHA Vision and HIMADRI smart city terminal'
    ],
    specifications: [
      { key: 'Display', value: '6.8" Quad-MicroLED 240Hz HDR3000' },
      { key: 'Processor', value: 'Helium Flowzen X1 Mobile Die' },
      { key: 'Battery', value: 'Solid-State 6500mAh 180W Flash Charge' },
      { key: 'Camera Matrix', value: '50MP AI Dual-Prism Optical Sensor' },
      { key: 'Operating System', value: 'BEDHA OS v1.0' }
    ],
    technologies: ['Solid-State Battery', 'Titanium Unibody', 'BEDHA OS', '50MP AI Camera', 'Satellite Link'],
    milestones: [
      { title: 'Industrial Design Finalization', date: 'Jan 2026', status: 'Completed', description: 'Chassis ergonomics and camera sensor geometry verified.' },
      { title: 'Carrier & Satellite Certification', date: 'Feb 2026', status: 'Completed', description: 'Global band and satellite fallback network approved.' },
      { title: 'Global Launch Edition', date: 'May 2026', status: 'Active', description: 'Commenced rollout across global flagship hubs.' }
    ],
    futureVision: 'Transforming the smartphone into a sentient companion that anticipates human intent, protects privacy unconditionally, and connects to every node in the ecosystem.',
    metrics: [
      { label: 'Display Refresh', value: '240 Hz', change: '+100%' },
      { label: 'Charge Speed', value: '180W / 12m', change: '+350%' },
      { label: 'AI TOPS', value: '140 TOPS', change: '+240%' }
    ],
    tags: ['Mobile Hardware', 'Flagship Smartphone', 'BEDHA OS', '5G Satellite'],
    gallery: [
      '/assets/projects/a1_g7_phone.jpg',
      '/assets/projects/a1_brand_variants.jpg',
      '/assets/brand/banner_ecosystem.jpg'
    ],
    websiteUrl: 'https://bedha.internal/a1-mobile',
    date: '2026-02-01',
    creationDate: '2026-02-01',
    leadCompany: 'A1 Mobile Corporation',
    isFeatured: true
  },
  {
    id: 'proj_myplay',
    name: 'My Play',
    entity: 'My Play Digital Services',
    category: 'Mobile Technology',
    shortDescription: 'Decentralized Ecosystem App Store',
    fullDescription: 'My Play is the ecosystem application hub and digital marketplace connecting developers with millions of users across A1 mobile, BEDHA Vision, and Smart Home devices. Features instant streaming apps, zero-bloat sandbox execution, and transparent developer royalties.',
    executiveOverview: 'My Play dismantles conventional app store monopolies through decentralized peer-to-peer distribution, automated security auditing, and native BEDHA Wallet micro-transactions with zero middleman fees.',
    logo: '/assets/projects/my_play_store.jpg',
    heroImage: '/assets/projects/my_play_store.jpg',
    coverImage: '/assets/projects/my_play_store.jpg',
    status: 'Active',
    breakthroughs: [
      'Decentralized Peer-to-Peer App Distribution with instant streaming',
      'Real-time Security Verification Sandbox preventing malicious telemetry',
      'Built-in BEDHA Wallet Micro-transactions with zero network gas fees',
      'Universal Binary Architecture: Single build for Mobile, AR/VR & Smart City'
    ],
    capabilities: [
      'Zero-install instant execution of enterprise and recreational tools',
      'Algorithmic curation engine respecting consumer privacy without tracking',
      'Open developer portal with 95% revenue retention for independent creators'
    ],
    specifications: [
      { key: 'Distribution Protocol', value: 'Decentralized Encrypted P2P Matrix' },
      { key: 'Execution Sandbox', value: 'WASM-Zero Secure Isolation' },
      { key: 'Supported Platforms', value: 'A1 Mobile, BEDHA Vision, BEDHA OS' },
      { key: 'Payment Pipeline', value: 'Native BEDHA Wallet & Instant UPI' }
    ],
    technologies: ['P2P Network', 'WASM Sandbox', 'BEDHA Wallet', 'Universal Binary', 'Zero-Bloat'],
    milestones: [
      { title: 'Marketplace Architecture', date: 'Jan 2026', status: 'Completed', description: 'Core smart contract sandbox and developer SDK released.' },
      { title: 'Developer Onboarding', date: 'Feb 2026', status: 'Active', description: 'Over 12,000 certified spatial and mobile tools registered.' },
      { title: 'Spatial App Store Update', date: 'Q3 2026', status: 'Upcoming', description: 'Direct 3D holographic tool installation for BEDHA Vision.' }
    ],
    futureVision: 'A friction-free global digital bazaar where creation is immediately rewarded and users have full autonomy over their applications and data.',
    metrics: [
      { label: 'Registered Apps', value: '18,500+', change: '+140%' },
      { label: 'Security Score', value: '100% Audited', change: 'Zero Exploit' },
      { label: 'Dev Revenue Share', value: '95%', change: 'Industry Max' }
    ],
    tags: ['App Store', 'Decentralized', 'Developer Platform', 'BEDHA OS'],
    gallery: [
      '/assets/projects/my_play_store.jpg',
      '/assets/projects/a1_g7_phone.jpg',
      '/assets/brand/banner_ecosystem.jpg'
    ],
    websiteUrl: 'https://bedha.internal/my-play',
    date: '2026-02-15',
    creationDate: '2026-02-15',
    leadCompany: 'My Play Digital Services',
    isFeatured: true
  },
  {
    id: 'proj_fangon',
    name: 'Fangon',
    entity: 'Fangon Optical Industries',
    category: 'Camera Manufacturing Company',
    shortDescription: 'Precision 16K Computational Optics',
    fullDescription: 'Fangon engineers the world\'s most precise optoelectronic sensor arrays, computational cinema cameras, and ultra-high-resolution modules for drones, autonomous EVs, and medical imaging devices.',
    executiveOverview: 'Fangon leads optical physics by synthesizing multi-element fluorite lenses with computational sensor arrays to capture spectral fidelity beyond human sight, even in zero ambient illumination.',
    logo: '/assets/projects/fangon_camera_logo.jpg',
    heroImage: '/assets/projects/fangon_camera_box.jpg',
    coverImage: '/assets/projects/fangon_camera_box.jpg',
    status: 'Active',
    breakthroughs: [
      'Continuous 16K Optical Sensor Matrix with quantum pixel efficiency',
      'Real-time Photonic Depth Mapping for autonomous vehicles & cinematography',
      'Dynamic Micro-mechanic Gimbal Stabilization integrated on sensor plane',
      'Extreme Low-Light Quantum Pixel Technology capturing color at 0.001 lux'
    ],
    capabilities: [
      'Cinema-grade 4K/8K/16K uncompressed RAW capture at up to 1200 FPS',
      'Autonomous object categorization and depth segmentation in under 2ms',
      'Hermetically sealed titanium barrel resilient to extreme temperatures (-40°C to 85°C)'
    ],
    specifications: [
      { key: 'Sensor Resolution', value: '16K Computational Optoelectronic Matrix' },
      { key: 'Lens Element', value: 'Fluorite Multi-Coated Nano-Crystal Array' },
      { key: 'Dynamic Range', value: '18.5 Stops' },
      { key: 'Stabilization', value: '7-Axis Micro-Mechanical Sensor Shift' },
      { key: 'Primary Deployment', value: 'Fangon Digital Cameras, Drones, A1 Mobile, Mobility' }
    ],
    technologies: ['Quantum Pixel', 'Computational Optics', 'Nano-Crystal Coating', '16K Cinema Sensor'],
    milestones: [
      { title: 'Optical Sensor Fabrication', date: 'Jan 2026', status: 'Completed', description: 'Quantum pixel array achieved 18.5 stops dynamic range.' },
      { title: 'Retail Packaging & Camera Release', date: 'Feb 2026', status: 'Active', description: 'Fangon Professional Digital Camera 4K Ultra HD in production.' },
      { title: 'Autonomous EV Vision Package', date: 'Q4 2026', status: 'Upcoming', description: 'Integration into BEDHA Mobility fleet prototypes.' }
    ],
    futureVision: 'Unlocking universal machine and human perception with optical sensors that capture the full electromagnetic spectrum in real time.',
    metrics: [
      { label: 'Dynamic Range', value: '18.5 Stops', change: '+3.5 Stops' },
      { label: 'Low-Light Sensitivity', value: '0.001 Lux', change: '+500%' },
      { label: 'Optical Resolution', value: '16K Matrix', change: 'Industry First' }
    ],
    tags: ['Optics', 'Camera Manufacturing', 'Cinematography', 'Sensors'],
    gallery: [
      '/assets/projects/fangon_camera_box.jpg',
      '/assets/projects/fangon_camera_logo.jpg',
      '/assets/brand/banner_ecosystem.jpg'
    ],
    websiteUrl: 'https://bedha.internal/fangon-optics',
    date: '2026-01-20',
    creationDate: '2026-01-20',
    leadCompany: 'Fangon Optical Industries',
    isFeatured: true
  },
  {
    id: 'proj_ai',
    name: 'BEDHA AI',
    category: 'Artificial Intelligence',
    description: 'AI Assistant & Intelligent Systems',
    detailedDescription: 'BEDHA AI is the cognitive backbone of the entire ecosystem. Combining multivariant neural language modeling with sensory vision models, BEDHA AI guides users, orchestrates HIMADRI municipal sensors, and optimizes energy distribution autonomously.',
    logo: '/assets/brand/bedha_ai_robot.jpg',
    coverImage: '/assets/brand/bedha_ai_robot.jpg',
    status: 'Active',
    features: [
      'Zero-Latency Conversational Reasoning',
      'Cross-Device Context Awareness & Sync',
      'Ecosystem Telemetry & Code Synthesizer',
      'Privacy-First Local Silicon Edge Execution'
    ],
    creationDate: '2026-01-01',
    leadCompany: 'BEDHA Artificial Intelligence Labs',
    isFeatured: true
  },
  {
    id: 'proj_robotics',
    name: 'BEDHA Robotics',
    category: 'Robotics',
    description: 'Humanoid / Industrial Robotics',
    detailedDescription: 'BEDHA Robotics produces humanoid cybernetic units and industrial harmonic manipulators designed for dangerous aerospace assembly, hazardous facility management, and empathetic healthcare assistance.',
    logo: '/assets/brand/bedha_logo.jpg',
    coverImage: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1200&q=80',
    status: 'Development',
    features: [
      'Biomimetic Tendon-Actuated Joints',
      'Real-time Dynamic Balance Gyroscopes',
      'Adaptive Soft-touch Sensory Grippers',
      'Certified Autonomous Industrial Safety Logic'
    ],
    creationDate: '2026-02-10',
    leadCompany: 'BEDHA Robotics Division'
  },
  {
    id: 'proj_home',
    name: 'BEDHA Home',
    category: 'Smart Home',
    description: 'Smart Home Ecosystem',
    detailedDescription: 'BEDHA Home transforms living spaces into responsive, symbiotic sanctuaries. Through predictive climate tuning, circadian bio-lighting, and ambient security wards, BEDHA Home learns family preferences effortlessly.',
    logo: '/assets/brand/bedha_logo.jpg',
    coverImage: 'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=1200&q=80',
    status: 'Active',
    features: [
      'Predictive Biometric Climate Calibration',
      'Solar-Storage Microgrid Balancing',
      'Touchless Gesture & Acoustic Command Zones',
      'End-to-End Quantum Encrypted Mesh Protocol'
    ],
    creationDate: '2026-01-25',
    leadCompany: 'BEDHA Living Systems'
  },
  {
    id: 'proj_drones',
    name: 'BEDHA Drones',
    category: 'Drones',
    description: 'Autonomous Drones',
    detailedDescription: 'Autonomous aerial vehicles designed for medical delivery logistics, disaster relief reconnaissance, environmental forest canopy monitoring, and high-altitude wireless relay arrays.',
    logo: '/assets/brand/bedha_logo.jpg',
    coverImage: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=1200&q=80',
    status: 'Active',
    features: [
      'LiDAR & Optical Swarm Avoidance Mesh',
      'Solar-Boosted 8-Hour Flight Endurance',
      'Precision All-Weather Payload Deployer',
      'Encrypted Real-Time Aerial Telemetry'
    ],
    creationDate: '2026-02-05',
    leadCompany: 'BEDHA Autonomous Aerospace'
  },
  {
    id: 'proj_mobility',
    name: 'BEDHA Mobility',
    category: 'Mobility',
    description: 'Intelligent Electric Vehicles',
    detailedDescription: 'Next-generation electric passenger and transport vehicles engineered with structural solid-state battery packs, steer-by-wire dual-motor torque vectoring, and level 4 autonomous highway cruising.',
    logo: '/assets/brand/bedha_logo.jpg',
    coverImage: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1200&q=80',
    status: 'Development',
    features: [
      '1,000 km Single Charge Solid-State Cell',
      'Dual-Motor 800V Ultra-Fast Architecture',
      'Aerodynamic Drag Coefficient 0.19 Cd',
      'Autonomous Summon & Automated Docking'
    ],
    creationDate: '2026-02-12',
    leadCompany: 'BEDHA Mobility Inc.'
  },
  {
    id: 'proj_aero',
    name: 'BEDHA Aero',
    category: 'Aviation',
    description: 'Aviation & Future Mobility',
    detailedDescription: 'BEDHA Aero develops electric vertical takeoff and landing (eVTOL) passenger shuttles and low-emission regional aviation aircraft connecting future smart cities with quiet, rapid transit corridors.',
    logo: '/assets/brand/bedha_logo.jpg',
    coverImage: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1200&q=80',
    status: 'Vision',
    features: [
      'Quiet Tilt-Rotor Multi-propeller Thrust',
      'Triple-Redundant Fly-By-Light Avionics',
      'Zero Direct Carbon Emission Propulsion',
      'Inter-City Skyport Rapid Turnaround'
    ],
    creationDate: '2026-01-30',
    leadCompany: 'BEDHA Aero Systems'
  },
  {
    id: 'proj_himadri',
    name: 'HIMADRI',
    category: 'Smart City',
    description: 'Smart City Ecosystem',
    detailedDescription: 'HIMADRI is a visionary civil blueprint and real-time metropolitan operating system for sustainable futuristic cities. Unifies smart traffic signals, digital water conservation grids, automated waste routing, and citizen welfare networks.',
    logo: '/assets/brand/bedha_logo.jpg',
    coverImage: '/assets/brand/banner_ecosystem.jpg',
    status: 'Active',
    features: [
      'Dynamic AI-Orchestrated Traffic Flow',
      'Automated Subsurface Waste Vacuum Tubing',
      'Smart Desalination & Aquifer Monitoring',
      'Universal Citizen Digital ID & Welfare Grid'
    ],
    creationDate: '2026-01-10',
    leadCompany: 'HIMADRI Urban Developments',
    isFeatured: true
  },
  {
    id: 'proj_cloud',
    name: 'BEDHA Cloud',
    category: 'Cloud',
    description: 'AI / Cloud Infrastructure',
    detailedDescription: 'Distributed sovereign cloud infrastructure engineered for hyperscale AI model training, zero-knowledge relational storage, edge compute delivery, and global developer API hosting.',
    logo: '/assets/brand/bedha_logo.jpg',
    coverImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80',
    status: 'Active',
    features: [
      'Global 200+ Edge Micro-Datacenters',
      'Hardware-Enforced Zero Knowledge Enclaves',
      'Sub-5ms Global API Latency Routing',
      'Carbon-Negative Geothermal & Solar Powered'
    ],
    creationDate: '2026-01-05',
    leadCompany: 'BEDHA Cloud Infrastructure'
  },
  {
    id: 'proj_secure',
    name: 'BEDHA Secure',
    category: 'Cybersecurity',
    description: 'Cybersecurity',
    detailedDescription: 'Military-grade post-quantum cryptographic shields, real-time intrusion interception, biometric identity attestation, and autonomic network self-healing engines guarding critical infrastructure.',
    logo: '/assets/brand/bedha_logo.jpg',
    coverImage: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80',
    status: 'Active',
    features: [
      'Post-Quantum Lattice-Based Cryptography',
      'Autonomous AI Threat Neutralizer',
      'Zero-Trust Immutable Audit Ledger',
      'Decentralized Biometric Attestation'
    ],
    creationDate: '2026-02-18',
    leadCompany: 'BEDHA Secure Systems'
  },
  {
    id: 'proj_vision',
    name: 'BEDHA Vision',
    category: 'AR/VR',
    description: 'AR/VR & Spatial Computing',
    detailedDescription: 'Ultra-lightweight spatial eyewear with photonic retinal projection, micro-gesture tracking, and hyper-realistic digital twin overlays for engineering, surgical telepresence, and creative studios.',
    logo: '/assets/brand/bedha_logo.jpg',
    coverImage: 'https://images.unsplash.com/photo-1593508512255-86ab42a8e620?auto=format&fit=crop&w=1200&q=80',
    status: 'Beta',
    features: [
      'Direct Retinal Waveguide Holography',
      'Millimeter-Accurate Spatial Anchor Engine',
      'Neural EMG Wristband Control Interface',
      'Seamless Sync with A1 and My Play Ecosystem'
    ],
    creationDate: '2026-02-22',
    leadCompany: 'BEDHA Vision Labs'
  },
  {
    id: 'proj_space',
    name: 'BEDHA Space',
    category: 'Space Technology',
    description: 'Future Space Technology',
    detailedDescription: 'Pioneering reusable orbital transport craft, orbital solar power collectors, lunar surface habitat robotics, and laser deep-space communication relays expanding human horizons beyond Earth.',
    logo: '/assets/brand/bedha_logo.jpg',
    coverImage: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=1200&q=80',
    status: 'Vision',
    features: [
      'Methane-Oxygen Reusable Aerospike Engines',
      'Deep Space Optical Laser Transceiver Array',
      'Orbital Solar Microwave Power Harvesters',
      'Autonomous Lunar Regolith Sintering Units'
    ],
    creationDate: '2026-01-18',
    leadCompany: 'BEDHA Space Exploration'
  },
  {
    id: 'proj_energy',
    name: 'BEDHA Energy',
    category: 'Clean Energy',
    description: 'Clean Energy Technology',
    detailedDescription: 'Revolutionizing planetary sustainability through next-generation perovskite solar cells, deep-well supercritical geothermal extractors, and modular grid-scale sodium-ion battery reservoirs.',
    logo: '/assets/brand/bedha_logo.jpg',
    coverImage: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=1200&q=80',
    status: 'Active',
    features: [
      '32% Efficiency Tandem Perovskite Layers',
      'Closed-Loop Supercritical Geothermal Generators',
      'High-Cycle Megawatt Sodium Energy Storage',
      'Direct-to-Grid Dynamic Frequency Modulation'
    ],
    creationDate: '2026-01-22',
    leadCompany: 'BEDHA Energy Solutions'
  }
];

export const INITIAL_PROJECTS: ProjectItem[] = RAW_PROJECTS.map(normalizeProject);

export const INITIAL_CATEGORIES: CategoryItem[] = [
  {
    id: 'cat_ai',
    name: 'Artificial Intelligence',
    description: 'Neural cognitive models, edge accelerators, generative logic.',
    iconName: 'Bot',
    projectCount: 2,
    featuredImageUrl: '/assets/brand/bedha_ai_robot.jpg'
  },
  {
    id: 'cat_semi',
    name: 'Semiconductor Technology',
    description: 'Sub-nanometer silicon, quantum photonics, micro-architectures.',
    iconName: 'Cpu',
    projectCount: 1,
    featuredImageUrl: '/assets/brand/banner_chip.jpg'
  },
  {
    id: 'cat_mobile',
    name: 'Mobile Technology',
    description: 'Next-generation smartphones, tactile OS, decentralized apps.',
    iconName: 'Smartphone',
    projectCount: 2,
    featuredImageUrl: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'cat_camera',
    name: 'Camera Manufacturing Company',
    description: 'Computational optics, spectral arrays, 16K cinema systems.',
    iconName: 'Camera',
    projectCount: 1,
    featuredImageUrl: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'cat_robotics',
    name: 'Robotics',
    description: 'Bipedal humanoids, agile manipulators, collaborative agents.',
    iconName: 'Activity',
    projectCount: 1,
    featuredImageUrl: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'cat_home',
    name: 'Smart Home',
    description: 'Ambient residential IoT, circadian lighting, zero-touch living.',
    iconName: 'Home',
    projectCount: 1,
    featuredImageUrl: 'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'cat_drones',
    name: 'Drones',
    description: 'Autonomous swarm flight, long-range transport, optical scouting.',
    iconName: 'Navigation',
    projectCount: 1,
    featuredImageUrl: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'cat_mobility',
    name: 'Mobility',
    description: 'Solid-state electric hyper-EVs, autonomous driving grids.',
    iconName: 'Zap',
    projectCount: 1,
    featuredImageUrl: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'cat_aviation',
    name: 'Aviation',
    description: 'Urban eVTOL passenger transit, low-emission regional aviation.',
    iconName: 'Plane',
    projectCount: 1,
    featuredImageUrl: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'cat_smartcity',
    name: 'Smart City',
    description: 'Metropolitan operating systems, digital water & clean civic power.',
    iconName: 'Building2',
    projectCount: 1,
    featuredImageUrl: '/assets/brand/banner_ecosystem.jpg'
  },
  {
    id: 'cat_cloud',
    name: 'Cloud',
    description: 'Sovereign distributed datacenters, sub-millisecond edge API.',
    iconName: 'Cloud',
    projectCount: 1,
    featuredImageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'cat_cyber',
    name: 'Cybersecurity',
    description: 'Post-quantum encryption, autonomous threat suppression.',
    iconName: 'Shield',
    projectCount: 1,
    featuredImageUrl: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'cat_arvr',
    name: 'AR/VR',
    description: 'Spatial computing, direct photonic waveguides, neural input.',
    iconName: 'Glasses',
    projectCount: 1,
    featuredImageUrl: 'https://images.unsplash.com/photo-1593508512255-86ab42a8e620?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'cat_space',
    name: 'Space Technology',
    description: 'Reusable aerospike rocketry, orbital power arrays, lunar robotics.',
    iconName: 'Rocket',
    projectCount: 1,
    featuredImageUrl: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'cat_energy',
    name: 'Clean Energy',
    description: 'Perovskite solar, grid-scale sodium cells, closed-loop geothermal.',
    iconName: 'Sun',
    projectCount: 1,
    featuredImageUrl: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=600&q=80'
  }
];

export const INITIAL_NEWS: NewsPost[] = [
  {
    id: 'news_01',
    title: 'BEDHA Announces Helium Flowzen X1 Tape-Out & Sub-Nanometer Benchmarks',
    content: 'Today, BEDHA Silicon Foundry confirmed the successful tape-out of Helium Flowzen X1, achieving an unprecedented 380 billion nodes on a single photonic chip. The processor exhibits 4x greater throughput for multimodal neural networks compared to industry benchmarks.',
    authorName: 'Brindaban Mondal',
    authorEmail: 'brindabanmondal987@gmail.com',
    authorRole: 'admin',
    publishDate: 'September 12, 2026',
    imageUrl: '/assets/brand/banner_chip.jpg',
    tags: ['Semiconductor', 'Helium Flowzen', 'Silicon', 'Breakthrough'],
    likes: 1240,
    commentsCount: 88,
    isPinned: true
  },
  {
    id: 'news_02',
    title: 'HIMADRI Phase-1 Metropolitan Operating Grid Goes Live in Pilot Tech Zones',
    content: 'The HIMADRI smart city telemetry network has initiated active autonomous traffic and municipal grid balancing across 450 square kilometers. Real-time energy savings exceed 31% within the first 72 hours of continuous monitoring.',
    authorName: 'BEDHA Architecture Team',
    authorEmail: 'press@bedha.io',
    authorRole: 'authorized',
    publishDate: 'September 10, 2026',
    imageUrl: '/assets/brand/banner_ecosystem.jpg',
    tags: ['Smart City', 'HIMADRI', 'Sustainability'],
    likes: 890,
    commentsCount: 42
  },
  {
    id: 'news_03',
    title: 'BEDHA AI 3.0 Multimodal Assistant Rolled Out to All Ecosystem Devices',
    content: 'The updated BEDHA AI assistant now features localized zero-latency inference on A1 smartphones and BEDHA Vision headsets. Users can experience fluid natural dialogue, code synthesis, and whole-home telemetry management.',
    authorName: 'BEDHA AI Research',
    authorEmail: 'ai@bedha.io',
    authorRole: 'authorized',
    publishDate: 'September 05, 2026',
    imageUrl: '/assets/brand/bedha_ai_robot.jpg',
    tags: ['AI', 'BEDHA AI', 'Neural Networks'],
    likes: 2150,
    commentsCount: 154
  }
];

export const INITIAL_MEDIA: MediaItem[] = [
  {
    id: 'media_01',
    title: 'Helium Flowzen X1 Quantum Die Architecture',
    type: 'image',
    url: '/assets/brand/banner_chip.jpg',
    thumbnailUrl: '/assets/brand/banner_chip.jpg',
    category: 'Semiconductors',
    relatedProjectName: 'Helium Flowzen X1',
    dateAdded: '2026-09-12'
  },
  {
    id: 'media_02',
    title: 'HIMADRI Skyport & Autonomous Aerial Transit',
    type: 'image',
    url: '/assets/brand/banner_ecosystem.jpg',
    thumbnailUrl: '/assets/brand/banner_ecosystem.jpg',
    category: 'Smart City',
    relatedProjectName: 'HIMADRI',
    dateAdded: '2026-09-10'
  },
  {
    id: 'media_03',
    title: 'BEDHA AI Sentient Assistant Hologram',
    type: 'image',
    url: '/assets/brand/bedha_ai_robot.jpg',
    thumbnailUrl: '/assets/brand/bedha_ai_robot.jpg',
    category: 'Artificial Intelligence',
    relatedProjectName: 'BEDHA AI',
    dateAdded: '2026-09-08'
  },
  {
    id: 'media_04',
    title: 'A1 Smartphone Titanium Unibody Showcase',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1200&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80',
    category: 'Mobile',
    relatedProjectName: 'A1',
    dateAdded: '2026-09-01'
  },
  {
    id: 'media_05',
    title: 'Fangon 16K Sensor Optical Precision Test',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1200&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=600&q=80',
    category: 'Optics',
    relatedProjectName: 'Fangon',
    dateAdded: '2026-08-28'
  },
  {
    id: 'media_06',
    title: 'BEDHA Robotics Humanoid Agility Run (Prototype Clip)',
    type: 'video',
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=600&q=80',
    category: 'Robotics',
    relatedProjectName: 'BEDHA Robotics',
    dateAdded: '2026-08-25'
  }
];

export const INITIAL_TRANSACTIONS: TransactionItem[] = [
  {
    id: 'tx_01',
    type: 'Deposit',
    amount: 50000,
    date: '2026-09-12 14:32',
    status: 'Successful',
    reference: 'REF-BDH-94821',
    method: 'Quantum Bank Wire'
  },
  {
    id: 'tx_02',
    type: 'Investment',
    amount: 15000,
    date: '2026-09-10 11:15',
    status: 'Successful',
    reference: 'INV-FLOWZEN-01',
    method: 'Helium Flowzen Pool'
  },
  {
    id: 'tx_03',
    type: 'Reward',
    amount: 2400,
    date: '2026-09-08 09:00',
    status: 'Successful',
    reference: 'REW-REFERRAL-42',
    method: 'Invite Friends Bonus'
  },
  {
    id: 'tx_04',
    type: 'Withdraw',
    amount: 5000,
    date: '2026-09-04 18:22',
    status: 'Pending',
    reference: 'WTH-BDH-1109',
    method: 'Secure Vault Settlement'
  }
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif_01',
    title: 'Helium Flowzen X1 Tape-Out Complete',
    message: 'Next-gen sub-nanometer neural silicon has verified all architecture benchmarks.',
    type: 'project',
    timestamp: '10m ago',
    read: false
  },
  {
    id: 'notif_02',
    title: 'HIMADRI Smart City Expansion',
    message: 'New municipal clean energy grid nodes added to live dashboard.',
    type: 'news',
    timestamp: '2h ago',
    read: false
  },
  {
    id: 'notif_03',
    title: 'Security Shield Updated',
    message: 'BEDHA Secure updated post-quantum lattice certificates across all sessions.',
    type: 'security',
    timestamp: '1d ago',
    read: true
  }
];

export const INITIAL_CONVERSATIONS: ChatConversation[] = [
  {
    id: 'conv_1',
    title: 'Helium Flowzen Photonic Silicon',
    lastMessage: 'Photonic wave packaging confirmed with 380B nodes.',
    updatedAt: '12m ago',
    messages: [
      {
        id: 'msg_1',
        sender: 'user',
        text: 'What makes Helium Flowzen X1 different from traditional silicon?',
        timestamp: '10:42 AM'
      },
      {
        id: 'msg_2',
        sender: 'ai',
        text: 'Helium Flowzen X1 replaces electronic metal interconnects with on-die laser optical waveguides. This yields over 380 billion computing nodes with 80% lower heat emission and 100x higher interconnect bandwidth.',
        timestamp: '10:43 AM'
      }
    ]
  },
  {
    id: 'conv_2',
    title: 'HIMADRI Smart City Deployment',
    lastMessage: 'Pilot telemetry in sector 7 shows 31% energy savings.',
    updatedAt: '2h ago',
    messages: [
      {
        id: 'msg_3',
        sender: 'user',
        text: 'How does HIMADRI handle dynamic energy balancing?',
        timestamp: '08:15 AM'
      },
      {
        id: 'msg_4',
        sender: 'ai',
        text: 'HIMADRI operates a real-time neural grid connecting municipal solar, geothermal micro-wells, and industrial sodium battery storage, re-routing power within 4 milliseconds of load spikes.',
        timestamp: '08:16 AM'
      }
    ]
  }
];

