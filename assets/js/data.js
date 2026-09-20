// Master data store for Chartered Integrated Services
const SITE_CONFIG = {
  companyName: 'Chartered Integrated Services',
  tagline: 'Integrated thinking. Considered action.',
  logoUrl: 'assets/images/logo.png',
  whatsappUrl: 'https://wa.me/919853337222?text=Hello%20Chartered%20Integrated%20Services,%20I%20would%20like%20to%20enquire%20about%20your%20services.',
  email: 'chartered.social@gmail.com',
  emailUrl: 'mailto:chartered.social@gmail.com',
  phone: '+91 98533 37222',
  phoneUrl: 'tel:+919853337222',
  address: 'B: 807-808, The Gateway, Nr. Parikh Hospital, Nikol, Ahmedabad - 380049',
  addressShort: 'Ahmedabad · Capital & advisory desk',
  disclaimer: 'Investment decisions should reflect your own goals, horizon, and suitability. Chartered Integrated Services provides considered market access, advisory support, and digital compliance pathways. Please read all scheme and product-related documents carefully before investing.',
  copyright: '© 2025 Chartered Integrated Services. All rights reserved.'
};

const NAV_ITEMS = [
  { label: 'Home', to: '/' },
  { label: 'Services', to: '/services' },
  { label: 'Market Updates', to: '/market-updates' },
  { label: 'Calculators', to: '/calculators' },
  { label: 'About Us', to: '/about' },
  { label: 'Contact', to: '/contact' }
];

const SERVICES_DATA = [
  {
    id: 'broking',
    name: 'Broking Services',
    shortName: 'Broking',
    category: 'Capital Markets',
    eyebrow: 'Market access, made considered',
    summary: 'Execution and advisory across equities, commodities, and global equities for investors who value a clear, informed route to market.',
    route: '/services/broking',
    kind: 'service',
    highlights: ['Equities', 'Commodities', 'Global equities'],
    deliverables: [
      'Guidance on market access and execution journeys',
      'A considered approach to equity and commodity exposure',
      'Support for local and global equity conversations'
    ],
    accent: 'gold',
    icon: 'trending-up'
  },
  {
    id: 'mutual-funds',
    name: 'Mutual Funds',
    shortName: 'Mutual Funds',
    category: 'Wealth Management',
    eyebrow: 'A disciplined path to long-term wealth',
    summary: 'Full active AMFI registered mutual fund support, helping you connect goals with practical, diversified investment choices.',
    route: '/services/mutual-funds',
    kind: 'service',
    highlights: ['AMFI registered', 'Goal-based SIPs', 'Portfolio review'],
    deliverables: [
      'Goal-led fund selection and portfolio construction',
      'SIP conversations built around your time horizon',
      'Review support as your priorities evolve'
    ],
    accent: 'emerald',
    icon: 'chart-column'
  },
  {
    id: 'fixed-income',
    name: 'Fixed Income & Bonds',
    shortName: 'Fixed Income',
    category: 'Income Solutions',
    eyebrow: 'Visibility when income matters',
    summary: 'Curated fixed-income opportunities, Bond Bazaar linkage, daily rate updates, and practical access to the income side of your plan.',
    route: '/services/fixed-income',
    kind: 'service',
    highlights: ['Daily bond matrix', 'Bond Bazaar linkage', 'Broadcast updates'],
    deliverables: [
      'Daily Excel and WhatsApp update pathways',
      'Access conversations across government and corporate bonds',
      'A clear view of income, tenure, and liquidity considerations'
    ],
    accent: 'blue',
    icon: 'landmark'
  },
  {
    id: 'dsc',
    name: 'Digital Signature Certificates',
    shortName: 'DSC',
    category: 'Compliance & Corporate',
    eyebrow: 'Essential digital compliance, simplified',
    summary: 'Fully active Digital Signature Certificate support for individuals, directors, filings, and day-to-day corporate compliance needs.',
    route: '/services/dsc',
    kind: 'service',
    highlights: ['Class 3 certificates', 'Verification support', 'Corporate orders'],
    deliverables: [
      'Guidance through certificate selection and documentation',
      'Support for individual and corporate issuance journeys',
      'A straightforward route from request to activation'
    ],
    accent: 'purple',
    icon: 'shield-check'
  },
  {
    id: 'management-consultancy',
    name: 'Management Consultancy & Family Office',
    shortName: 'Management Consultancy',
    category: 'Advisory',
    eyebrow: 'Structure for what you are building',
    summary: 'Thoughtful support across wills, estate planning, succession conversations, and family office structures for enduring wealth.',
    route: '/services/management-consultancy',
    kind: 'service',
    highlights: ['Will & estate planning', 'Family office', 'Succession'],
    deliverables: [
      'A structured conversation around family priorities',
      'Planning support for continuity, governance, and succession',
      'A long-term lens on preserving what matters'
    ],
    accent: 'rose',
    icon: 'users'
  },
  {
    id: 'alternate-investments',
    name: 'Alternate Investments',
    shortName: 'Alternate Investments',
    category: 'Structured Products',
    eyebrow: 'Expand the architecture of your portfolio',
    summary: 'Access conversations across AIF, SIF, REIT, InvIT, MLD, and other alternate investment structures for suitable investors.',
    route: '/services/alternate-investments',
    kind: 'service',
    highlights: ['AIF & SIF', 'REITs & InvITs', 'MLDs'],
    deliverables: [
      'An orientation to alternate investment structures',
      'Conversation around suitability, liquidity, and horizon',
      'A more complete view of portfolio diversification'
    ],
    accent: 'teal',
    icon: 'earth'
  },
  {
    id: 'ipo',
    name: 'IPO Advisory & Updates',
    shortName: 'IPO Updates',
    category: 'Primary Markets',
    eyebrow: 'Stay close to the primary market',
    summary: 'Daily IPO updates, subscription context, and market signals sourced from InvestorGain for a faster, more informed first read.',
    route: '/market-updates/ipo',
    kind: 'market',
    highlights: ['Daily updates', 'Subscription context', 'GMP watch'],
    deliverables: [
      'Daily Mainboard and SME IPO snapshots',
      'Subscription and grey market premium context',
      'A direct enquiry route when you want to go deeper'
    ],
    accent: 'orange',
    icon: 'trending-up'
  },
  {
    id: 'unlisted-shares',
    name: 'Unlisted & Pre-IPO Shares',
    shortName: 'Unlisted Shares',
    category: 'Private Markets',
    eyebrow: 'A considered view beyond the listed screen',
    summary: 'Daily unlisted share updates and pre-IPO conversations, with curated reference points from multiple market sources.',
    route: '/market-updates/unlisted-shares',
    kind: 'market',
    highlights: ['Daily price updates', 'Pre-IPO context', 'Source-led research'],
    deliverables: [
      'Daily updates with reference to available market sources',
      'Conversation around price, liquidity, and transfer considerations',
      'A direct link to UnlistedZone for further exploration'
    ],
    accent: 'indigo',
    icon: 'earth'
  }
];

const ACTIVE_SERVICES = SERVICES_DATA.filter(s => s.kind === 'service');

const ACCENT_ICONS = {
  gold: 'trending-up',
  emerald: 'chart-column',
  blue: 'landmark',
  purple: 'shield-check',
  rose: 'users',
  teal: 'earth',
  orange: 'file-text',
  indigo: 'briefcase-business'
};

const HOME_PROOFS = [
  { value: '01', label: 'Connected thinking', copy: 'Capital markets, wealth, and planning in one conversation.' },
  { value: '02', label: 'Active pathways', copy: 'Focused services you can act on today, without the clutter.' },
  { value: '03', label: 'Human guidance', copy: 'Responsive support from a team based in Ahmedabad.' }
];

const HOME_MARKET_UPDATES = [
  {
    eyebrow: 'Primary markets',
    title: 'IPO pulse',
    copy: 'Daily Mainboard and SME IPO snapshots with subscription context.',
    tone: 'bg-[#0a192f]',
    link: '/market-updates/ipo',
    icon: 'trending-up'
  },
  {
    eyebrow: 'Private markets',
    title: 'Unlisted watch',
    copy: 'A clear daily view of unlisted and pre-IPO market conversations.',
    tone: 'bg-[#059669]',
    link: '/market-updates/unlisted-shares',
    icon: 'earth'
  },
  {
    eyebrow: 'Income solutions',
    title: 'Bond matrix',
    copy: 'Fixed income updates, rates, and Bond Bazaar pathways in one place.',
    tone: 'bg-[#d97706]',
    link: '/services/fixed-income',
    icon: 'chart-column'
  }
];

const HOME_APPROACH = [
  { icon: 'shield-check', title: 'Risk first', copy: 'Every conversation starts with your objectives, constraints, and comfort with uncertainty.' },
  { icon: 'chart-column', title: 'Evidence over noise', copy: 'We bring structure to the information that matters, without chasing every headline.' },
  { icon: 'earth', title: 'One integrated view', copy: 'Your investment and family decisions rarely live in separate boxes. Neither should our thinking.' },
  { icon: 'sparkles', title: 'Built for the long run', copy: 'A responsive relationship that can keep pace as your life and ambitions change.' }
];

const MARKET_UPDATES_HERO_CARDS = [
  {
    serviceId: 'ipo',
    icon: 'trending-up',
    label: 'Primary markets',
    value: 'IPO pulse',
    detail: 'Daily IPO updates from InvestorGain, with subscription and market context.',
    color: 'bg-[#0a192f]'
  },
  {
    serviceId: 'unlisted-shares',
    icon: 'earth',
    label: 'Private markets',
    value: 'Unlisted watch',
    detail: 'Daily unlisted and pre-IPO updates sourced from the wider market.',
    color: 'bg-[#059669]'
  },
  {
    serviceId: 'fixed-income',
    icon: 'chart-column',
    label: 'Income solutions',
    value: 'Bond matrix',
    detail: 'Bond Bazaar linkage, daily Excel pathways, and fixed income conversations.',
    color: 'bg-[#d97706]'
  }
];

const MARKET_UPDATES_NOTES = [
  { icon: 'file-text', title: 'Read the context', copy: 'A number is only useful when you know what sits behind it.' },
  { icon: 'earth', title: 'Ask the question', copy: 'We can help translate an update into your own situation.' },
  { icon: 'trending-up', title: 'Choose deliberately', copy: 'Suitability, horizon, and liquidity still matter most.' }
];

const PLANNING_PROMPTS = [
  { icon: 'landmark', title: 'Retirement planning', copy: 'Work backward from the life you want to fund.' },
  { icon: 'graduation-cap', title: 'Child education', copy: 'Bring future costs and time horizons into view.' },
  { icon: 'house', title: 'Dream home', copy: 'Test the impact of a major goal before you commit.' }
];

const ABOUT_VALUES = [
  { icon: 'compass', title: 'Context' },
  { icon: 'shield-check', title: 'Care' },
  { icon: 'users', title: 'Continuity' }
];

const ABOUT_PRINCIPLES = [
  { number: '01', title: 'Listen before advising', copy: 'Good direction starts with the details that make your situation different.' },
  { number: '02', title: 'Make complexity usable', copy: 'We turn a wide choice set into a small number of understandable next steps.' },
  { number: '03', title: 'Stay close to the journey', copy: 'The relationship continues after a decision, when context matters most.' }
];
