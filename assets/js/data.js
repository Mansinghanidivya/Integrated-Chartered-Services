// Master data store for Chartered Integrated Services Private Limited
// Positioning: Research Driven Wealth Creation
// Approved Inception: 2017 | Ahmedabad, Gujarat

const SITE_CONFIG = {
  companyName: 'Chartered Integrated Services Private Limited',
  brandName: 'Chartered Integrated Services',
  tagline: 'Research Driven Wealth Creation',
  supportingProposition: 'Comprehensive Investment & Wealth Management Solutions for Individuals, Entrepreneurs, Professionals, HNIs and Families.',
  coreMessage: 'Invest. Manage. Protect. Grow.',
  philosophy: 'Research. Discipline. Diversification. Long-Term Thinking.',
  objective: 'Our objective is to become a trusted long-term financial partner for our clients — helping them invest, manage, protect and grow their wealth.',
  establishedYear: '2017',
  logoUrl: 'assets/images/logo.png',
  whatsappNumber: '+919853337222',
  whatsappUrl: 'https://wa.me/919853337222?text=Hello%20Chartered%20Integrated%20Services,%20I%20would%20like%20to%20consult%20on%20investment%20and%20wealth%20management%20solutions.',
  email: 'chartered.social@gmail.com',
  emailUrl: 'mailto:chartered.social@gmail.com',
  phone: '+91 98533 37222',
  phoneUrl: 'tel:+919853337222',
  address: 'B-807, The Gateway, Nikol, Ahmedabad, Gujarat – 380049',
  addressShort: 'Ahmedabad, Gujarat · Wealth Management Desk',
  googleMapsUrl: 'https://maps.google.com/?q=The+Gateway+Nikol+Ahmedabad+380049',
  disclaimer: 'Investment in securities market are subject to market risks. Read all the related documents carefully before investing. Chartered Integrated Services Private Limited provides investment research, wealth management, and market solutions. Past performance is not indicative of future returns. Nothing on this website constitutes a performance guarantee or an assurance of returns.',
  regulatoryNotice: 'Portfolio Management Services (PMS) and Alternative Investment Funds (AIF) are subject to regulatory minimum investment criteria and eligibility requirements as defined by SEBI. Mutual funds investments are subject to market risks, read all scheme related documents carefully.',
  copyright: '© 2025 Chartered Integrated Services Private Limited. All rights reserved.'
};

const NAV_ITEMS = [
  { label: 'Home', to: '/' },
  { label: 'About Us', to: '/about' },
  { 
    label: 'Investment Solutions', 
    to: '/solutions',
    hasDropdown: true,
    children: [
      { label: 'Indian Equities', to: '/solutions/indian-equities', desc: 'Research-driven equity portfolios & analysis' },
      { label: 'Mutual Funds', to: '/solutions/mutual-funds', desc: 'Goal-oriented asset allocation & portfolios' },
      { label: 'PMS (Portfolio Management)', to: '/solutions/pms', desc: 'Discretionary & non-discretionary equity portfolios' },
      { label: 'AIF (Alternative Investments)', to: '/solutions/aif', desc: 'Specialised alternative strategies for eligible investors' },
      { label: 'Bonds & Fixed Income', to: '/solutions/fixed-income', desc: 'Income, diversification & capital preservation' },
      { label: 'REITs & InvITs', to: '/solutions/reits-invits', desc: 'Listed real-estate & infrastructure trusts' },
      { label: 'Global Investments', to: '/solutions/global-investments', desc: 'Invest beyond borders & international equities' },
      { label: 'Commodities', to: '/solutions/commodities', desc: 'Gold, silver & strategic portfolio diversification' },
      { label: 'Insurance (Wealth Protection)', to: '/solutions/insurance', desc: 'Life, health & family risk protection' },
      { label: 'Financial & Corporate Solutions', to: '/solutions/financial-solutions', desc: 'Capital structuring & business-owner advisory' }
    ]
  },
  { label: 'Research & Insights', to: '/research' },
  { label: 'For Entrepreneurs', to: '/entrepreneurs' },
  { label: 'Calculators', to: '/calculators' },
  { label: 'Contact', to: '/contact' }
];

// All 10 Core Investment & Wealth Management Solutions
const SOLUTIONS_DATA = [
  {
    id: 'indian-equities',
    name: 'Indian Equities',
    shortName: 'Equities',
    category: 'Equity Investment',
    eyebrow: 'Fundamental research · Long-term ownership',
    headline: 'Research-Driven Equity Investing for Sustainable Wealth',
    summary: 'Research-driven equity investment and portfolio solutions built around business fundamentals, industry tailwinds, and disciplined valuation assessment.',
    heroText: 'Equities remain one of the most powerful wealth-creation engines over the long term. Our equity solutions focus on rigorous company analysis, sectoral research, and disciplined portfolio construction rather than speculative trading.',
    route: '/solutions/indian-equities',
    accent: 'blue',
    icon: 'trending-up',
    highlights: ['Fundamental Company Research', 'Sectoral Trend Analysis', 'Disciplined Valuation Framework', 'Ongoing Portfolio Reviews'],
    pillars: [
      { title: 'Company Research', desc: 'In-depth analysis of balance sheet strength, return on equity (ROE), cash flows, management integrity, and competitive moats.' },
      { title: 'Sector Analysis', desc: 'Identifying structural growth themes and emerging opportunities in the Indian economic expansion cycle.' },
      { title: 'Portfolio Construction', desc: 'Constructing focused, diversified equity portfolios designed to withstand volatility and capture long-term compounding.' },
      { title: 'Active Review & Rebalancing', desc: 'Systematic performance tracking and discipline to rebalance allocations as business realities or valuations change.' }
    ],
    suitability: 'Suitable for individuals, HNIs, and family offices seeking capital appreciation with an investment horizon of 3 to 5+ years.',
    disclaimer: 'Equity investments are subject to market risks. Volatility is inherent in listed equity markets.'
  },
  {
    id: 'mutual-funds',
    name: 'Mutual Funds',
    shortName: 'Mutual Funds',
    category: 'Wealth Management',
    eyebrow: 'Goal alignment · Asset allocation',
    headline: 'Goal-Oriented Mutual Fund Portfolios Supported by Research',
    summary: 'Comprehensive mutual fund strategies across equity, hybrid, debt, and index categories — tailored to your life goals and risk profile, not product sales.',
    heroText: 'Mutual fund investing is not simply about picking yesterday’s top performer. We structure disciplined, goal-mapped portfolios combining active fund selection with cost-efficient index solutions and periodic rebalancing.',
    route: '/solutions/mutual-funds',
    accent: 'emerald',
    icon: 'pie-chart',
    highlights: ['Equity, Debt & Hybrid Funds', 'Index Funds & ETFs', 'Systematic SIP & Lumpsum', 'Asset Allocation & Portfolio Review'],
    pillars: [
      { title: 'Diverse Asset Spectrum', desc: 'Access across Large-Cap, Mid-Cap, Flexi-Cap, Hybrid, Liquid, Short-Duration, and International feeder funds.' },
      { title: 'Goal-Mapped Planning', desc: 'Aligning SIP and lumpsum contributions precisely to timelines: retirement, higher education, capital accumulation.' },
      { title: 'Manager Due Diligence', desc: 'Evaluating fund managers’ track record across market cycles, investment mandates, portfolio churn, and risk ratios.' },
      { title: 'Consolidated Reviews', desc: 'Periodic health-checks on overlapping holdings, expense ratios, and asset allocation deviations.' }
    ],
    suitability: 'Ideal for individuals, professionals, and families seeking structured wealth compounding with disciplined monthly SIPs or strategic lump-sum deployments.',
    disclaimer: 'Mutual fund investments are subject to market risks. Read all scheme-related documents carefully before investing.'
  },
  {
    id: 'pms',
    name: 'Portfolio Management Services (PMS)',
    shortName: 'PMS',
    category: 'Specialised Equity',
    eyebrow: 'Institutional management · Direct ownership',
    headline: 'Professional Portfolio Management for Eligible Investors',
    summary: 'Customised, professionally managed equity portfolios offering direct stock ownership and focused investment mandates for qualified investors.',
    heroText: 'PMS provides high-conviction, professional investment management with direct holding of securities in the investor’s individual demat account. Designed for discerning investors seeking institutional rigor.',
    route: '/solutions/pms',
    accent: 'gold',
    icon: 'briefcase-business',
    highlights: ['Direct Equity Ownership', 'Customised Investment Mandates', 'High-Conviction Strategies', 'Direct Demat Holding'],
    pillars: [
      { title: 'Professional Portfolio Managers', desc: 'Experienced institutional fund managers operating with defined investment frameworks and concentrated portfolios.' },
      { title: 'Direct Demat Account Holding', desc: 'Securities are held directly in your individual demat account, providing complete transparency into daily holdings.' },
      { title: 'Customised Strategies', desc: 'Access to thematic, multi-cap, small/mid-cap, and value-oriented mandates tailored to high-net-worth risk appetites.' },
      { title: 'Transparent Reporting', desc: 'Comprehensive portfolio performance statements, corporate action tracking, and institutional-grade disclosures.' }
    ],
    suitability: 'Strictly for eligible HNI, UHNI, and corporate clients meeting regulatory minimum ticket size requirements (current SEBI minimum: ₹50 Lakhs).',
    disclaimer: 'PMS investments are subject to market risks. There are no assured returns. Please review the PMS Disclosure Document before investing.'
  },
  {
    id: 'aif',
    name: 'Alternative Investment Funds (AIF)',
    shortName: 'AIF',
    category: 'Alternative Assets',
    eyebrow: 'Private capital · Specialised strategies',
    headline: 'Specialised Alternative Investment Opportunities',
    summary: 'Access to Category I, II, and III alternative investment funds providing differentiated return drivers and low correlation to traditional listed benchmarks.',
    heroText: 'Alternative Investment Funds open doors to private equity, structured credit, pre-IPO opportunities, and long-short strategies. We evaluate fund quality, governance, and strategy sustainability for eligible sophisticated investors.',
    route: '/solutions/aif',
    accent: 'purple',
    icon: 'layers',
    highlights: ['Private Equity & Venture Debt', 'Category II Structured Credit', 'Category III Long-Short Strategies', 'Portfolio Diversification'],
    pillars: [
      { title: 'Uncorrelated Return Streams', desc: 'Strategies designed to deliver risk-adjusted returns with reduced correlation to public equity benchmarks.' },
      { title: 'In-Depth Due Diligence', desc: 'Independent evaluation of the general partner (GP), past track record, vintage performance, and liquidity terms.' },
      { title: 'Private Market Access', desc: 'Access to late-stage growth companies, specialised credit opportunities, and mezzanine structures.' },
      { title: 'Disciplined Capital Allocation', desc: 'Integrating alternative assets purposefully into an overall family office or UHNI wealth architecture.' }
    ],
    suitability: 'Exclusively for qualified HNI, UHNI, and institutional investors meeting the statutory minimum ticket threshold (current SEBI minimum: ₹1 Crore).',
    disclaimer: 'AIF investments involve significant liquidity risk and capital risk. No guarantees or fixed returns are offered.'
  },
  {
    id: 'fixed-income',
    name: 'Bonds & Fixed Income',
    shortName: 'Fixed Income',
    category: 'Capital Preservation',
    eyebrow: 'Predictable cash flows · Capital stability',
    headline: 'Income, Diversification & Capital Preservation Solutions',
    summary: 'Curated corporate bonds, sovereign securities, PSU debt, and structured fixed-income instruments designed to provide stability and steady cash flow.',
    heroText: 'A resilient wealth portfolio balances growth with capital defense. Our fixed income solutions focus on credit quality, yield-to-maturity (YTM), interest rate cycles, and cash flow predictability.',
    route: '/solutions/fixed-income',
    accent: 'blue',
    icon: 'landmark',
    highlights: ['Corporate Bonds (AAA / AA+)', 'Government Securities & T-Bills', 'Corporate Fixed Deposits', 'Cash-Flow Structuring'],
    pillars: [
      { title: 'Credit Quality First', desc: 'Prioritising safety of principal by screening balance sheets, debt service ratios, and credit ratings.' },
      { title: 'Sovereign & PSU Instruments', desc: 'Access to Government of India bonds, state development loans (SDLs), and high-grade PSU papers.' },
      { title: 'Cash Flow Customisation', desc: 'Matching bond coupon maturities to specific upcoming liabilities, education expenses, or business cash needs.' },
      { title: 'Interest Rate Cycle Navigation', desc: 'Calibrating duration and maturity profiles based on macro interest-rate environment and central bank policy.' }
    ],
    suitability: 'Recommended for investors seeking steady regular income, low-volatility asset allocation, or capital preservation for short-to-medium horizons.',
    disclaimer: 'Fixed income securities are subject to credit risk, interest rate risk, and liquidity risk.'
  },
  {
    id: 'reits-invits',
    name: 'REITs & InvITs',
    shortName: 'REITs & InvITs',
    category: 'Real Assets',
    eyebrow: 'Yield-bearing real assets · Listed transparency',
    headline: 'Access to Listed Real Estate & Infrastructure Trusts',
    summary: 'Participate in grade-A commercial real estate and national infrastructure assets with regular cash distributions, liquidity, and professional management.',
    heroText: 'Real Estate Investment Trusts (REITs) and Infrastructure Investment Trusts (InvITs) offer the benefits of real-estate and infrastructure ownership without the illiquidity, heavy ticket sizes, and tenant management burdens of physical property.',
    route: '/solutions/reits-invits',
    accent: 'teal',
    icon: 'building-2',
    highlights: ['Grade-A Commercial Real Estate', 'Operational Infrastructure Assets', 'Mandatory 90% NDCF Payouts', 'High Liquidity on Stock Exchanges'],
    pillars: [
      { title: 'Regular Cash Distributions', desc: 'SEBI regulations mandate distributing at least 90% of net distributable cash flows to unit-holders regularly.' },
      { title: 'Institutional Real Estate', desc: 'Exposure to marquee IT parks, Grade-A office campuses, highways, power transmission lines, and logistics hubs.' },
      { title: 'Exchange-Traded Liquidity', desc: 'Trade on NSE/BSE seamlessly like common shares, eliminating physical property registration and broker hassles.' },
      { title: 'Inflation Hedge', desc: 'Periodic rent escalation clauses in commercial lease contracts provide a natural defense against inflationary trends.' }
    ],
    suitability: 'Suited for individuals, retirees, and families looking for income-generating real assets with capital appreciation potential.',
    disclaimer: 'REITs and InvITs carry commercial occupancy risks, tenant concentration risks, and market price fluctuations.'
  },
  {
    id: 'global-investments',
    name: 'Global Investments',
    shortName: 'Global Investing',
    category: 'International Exposure',
    eyebrow: 'Geographic diversification · Currency hedge',
    headline: 'Invest Beyond Borders — Global Wealth Opportunities',
    summary: 'Expand your wealth beyond domestic borders. Access international equity markets, leading global innovators, and currency diversification under RBI’s LRS route.',
    heroText: 'India accounts for approximately 3-4% of global stock market capitalisation. Investing globally enables Indian investors to participate in global mega-caps, frontier technology leaders, and hedge domestic currency depreciation.',
    route: '/solutions/global-investments',
    accent: 'indigo',
    icon: 'globe',
    highlights: ['US Stock & ETF Markets', 'Global Innovation Leaders', 'Currency Diversification (USD Hedge)', 'Compliant with RBI LRS Norms'],
    pillars: [
      { title: 'Access to Global Titans', desc: 'Invest in the world’s leading technology, healthcare, and industrial giants shaping international commerce.' },
      { title: 'Currency Diversification', desc: 'Holding assets denominated in USD provides a natural hedge against historical rupee depreciation over multi-year horizons.' },
      { title: 'RBI LRS Compliance', desc: 'Seamlessly facilitated within the Reserve Bank of India’s Liberalised Remittance Scheme ($250,000 per person per financial year).' },
      { title: 'Global Thematic ETFs', desc: 'Cost-effective access to broad international indexes (S&P 500, Nasdaq 100) and specialised sectoral themes.' }
    ],
    suitability: 'Essential for forward-thinking individuals, entrepreneurs, and families with overseas liabilities, foreign education goals, or diversification objectives.',
    disclaimer: 'Overseas investments are subject to currency exchange rate risk, geopolitical risks, and tax compliance under Indian LRS and foreign regulations.'
  },
  {
    id: 'commodities',
    name: 'Commodities',
    shortName: 'Commodities',
    category: 'Portfolio Diversification',
    eyebrow: 'Inflation hedge · Risk mitigation',
    headline: 'Strategic Commodity Allocation for Portfolio Resilience',
    summary: 'Strategic exposure to precious metals and critical commodities — gold, silver, and energy — as a hedge against inflation and macroeconomic stress.',
    heroText: 'Commodities serve as an essential stabilizing pillar in a multi-asset portfolio. We position commodity investing around long-term portfolio diversification, store of value, and tail-risk defense rather than speculative intraday trading.',
    route: '/solutions/commodities',
    accent: 'gold',
    icon: 'coins',
    highlights: ['Sovereign Gold Bonds & Gold ETFs', 'Silver Investment Structures', 'Inflation Defense Mechanism', 'Crisis Alpha & Risk Hedging'],
    pillars: [
      { title: 'Store of Value', desc: 'Gold has maintained purchasing power across centuries and provides portfolio protection during geopolitical and financial crises.' },
      { title: 'Efficient Digital Vehicles', desc: 'Utilising Gold ETFs, Fund of Funds, and sovereign instruments that avoid storage costs, making charges, and purity risks.' },
      { title: 'Industrial & Green Transition', desc: 'Exposure to silver and strategic metals benefiting from the global shift toward solar energy, EVs, and semiconductors.' },
      { title: 'Disciplined Allocation', desc: 'Maintaining a measured 5% to 15% strategic portfolio weighting to cushion broader portfolio drawdowns.' }
    ],
    suitability: 'Ideal as a strategic allocation layer for all investors seeking portfolio stability and long-term purchasing power preservation.',
    disclaimer: 'Commodity markets are subject to global supply-demand dynamics and economic cycles. Past price behavior does not guarantee future results.'
  },
  {
    id: 'insurance',
    name: 'Insurance & Wealth Protection',
    shortName: 'Wealth Protection',
    category: 'Risk Management',
    eyebrow: 'Wealth defense · Family security',
    headline: 'Wealth Creation is Incomplete Without Wealth Protection',
    summary: 'Comprehensive risk management covering life, health, critical illness, and key-person insurance to safeguard what you have worked tirelessly to build.',
    heroText: 'Wealth creation and wealth protection are two sides of the same coin. An unexpected health event or loss of a primary earner can dismantle decades of portfolio compounding. We ensure your family balance sheet is ironclad.',
    route: '/solutions/insurance',
    accent: 'rose',
    icon: 'shield-check',
    highlights: ['Comprehensive Term Life Protection', 'High-Sum Insured Health Covers', 'Key-Person & Partnership Insurance', 'Family Balance Sheet Defense'],
    pillars: [
      { title: 'Pure Risk Life Cover', desc: 'High-cover, cost-effective term insurance designed to replace economic value and secure family liabilities.' },
      { title: 'Comprehensive Health Cover', desc: 'High-sum insured global and domestic health insurance with restorative benefits to prevent medical wealth erosion.' },
      { title: 'Business & Key-Person Protection', desc: 'Protecting enterprises against the loss of key promoters, partners, or executive drivers.' },
      { title: 'Liability & Asset Protection', desc: 'Commercial, directors & officers (D&O), and general insurance tailored to enterprise requirements.' }
    ],
    suitability: 'Essential for every individual, entrepreneur, breadwinner, and business owner managing substantial personal and professional commitments.',
    disclaimer: 'Insurance is the subject matter of solicitation. Policy terms, exclusions, and conditions apply as outlined by respective insurers.'
  },
  {
    id: 'financial-solutions',
    name: 'Financial & Business Solutions',
    shortName: 'Business Advisory',
    category: 'Corporate Finance',
    eyebrow: 'Capital structuring · Strategic advisory',
    headline: 'Financial Planning & Business Finance Solutions',
    summary: 'Strategic advisory for business owners and enterprises — covering capital structuring, project finance, working capital optimization, and financial planning.',
    heroText: 'Bridging enterprise finance with long-term wealth objectives. We advise entrepreneurs on balancing business capital requirements, liquidity structuring, and tax-efficient surplus deployment.',
    route: '/solutions/financial-solutions',
    accent: 'indigo',
    icon: 'scale',
    highlights: ['Corporate Financial Planning', 'Capital Structuring & Advisory', 'Project & Business Finance Support', 'Surplus Liquidity Management'],
    pillars: [
      { title: 'Capital Structuring', desc: 'Optimising debt-equity ratios, cost of capital, and debt servicing feasibility for sustained business growth.' },
      { title: 'Project Finance & Loans', desc: 'Assisting growing businesses with structured financing, term loan structuring, and working capital advisory.' },
      { title: 'Corporate Cash Flow Deployment', desc: 'Structuring corporate treasury cash into secure, liquid, and tax-efficient short-term yield instruments.' },
      { title: 'Promoter Financial Planning', desc: 'De-risking personal balance sheets from corporate guarantees and business cyclicity.' }
    ],
    suitability: 'Designed for entrepreneurs, SME founders, corporate promoters, and growing enterprises seeking professional financial guidance.',
    disclaimer: 'Advisory and financial assistance are provided in accordance with applicable statutory guidelines.'
  }
];

// 5-Step Investment Approach Process
const INVESTMENT_APPROACH = [
  {
    step: '01',
    name: 'UNDERSTAND',
    title: 'Listen & Diagnose',
    tagline: 'Goals · Risk Profile · Time Horizon · Existing Assets',
    description: 'We begin with an exhaustive assessment of your current financial position, existing investments, cash flow requirements, risk tolerance, and long-term milestones. No strategy is initiated without a comprehensive diagnostic of your unique balance sheet.'
  },
  {
    step: '02',
    name: 'RESEARCH',
    title: 'Analyze & Evaluate',
    tagline: 'Fundamental Analysis · Valuations · Macro & Sector Trends',
    description: 'Our research desk analyzes businesses, asset classes, fund manager track records, macro trends, and regulatory changes. We filter through market noise to identify genuine fundamentals, reasonable valuations, and risk-adjusted opportunities.'
  },
  {
    step: '03',
    name: 'STRATEGISE',
    title: 'Architect Asset Allocation',
    tagline: 'Diversified Blueprint · Risk Budgeting · Return Expectation',
    description: 'Asset allocation accounts for over 90% of long-term portfolio return variance. We develop a personalised investment blueprint balancing equity compounding, income predictability, liquidity needs, and wealth protection.'
  },
  {
    step: '04',
    name: 'INVEST',
    title: 'Disciplined Implementation',
    tagline: 'Execution Excellence · Phased Deployment · Cost Efficiency',
    description: 'We execute the chosen strategy using suitable institutional solutions — Indian equities, mutual funds, PMS, AIF, bonds, global markets, or REITs. We employ phased investment pacing where appropriate to manage entry valuation risk.'
  },
  {
    step: '05',
    name: 'REVIEW',
    title: 'Monitor & Rebalance',
    tagline: 'Periodic Health Checks · Rebalancing · Goal Tracking',
    description: 'Financial markets and life circumstances evolve continuously. We conduct structured periodic reviews to evaluate asset allocation drift, fund performance, and tax efficiency — systematically rebalancing back to your strategic target.'
  }
];

// Evidence-based Differentiators (Strictly compliant, NO unsupported hype)
const DIFFERENTIATORS = [
  {
    icon: 'search',
    title: 'Research Driven',
    description: 'Every recommendation is rooted in rigorous fundamental analysis, valuation frameworks, and business economics — not short-term speculation or market noise.'
  },
  {
    icon: 'layers',
    title: 'Comprehensive Ecosystem',
    description: 'Access Indian equities, mutual funds, PMS, AIF, fixed income, REITs, global assets, and wealth protection seamlessly under one professional roof.'
  },
  {
    icon: 'target',
    title: 'Personalised Architecture',
    description: 'No cookie-cutter templates. Solutions are meticulously mapped to your specific cash flow needs, liquidity requirements, risk tolerance, and horizon.'
  },
  {
    icon: 'award',
    title: 'Professional Credibility',
    description: 'Led by certified finance professionals with Chartered Accountancy rigor and NISM Research Analyst credentials, adhering to high fiduciary standards.'
  },
  {
    icon: 'trending-up',
    title: 'Long-Term Orientation',
    description: 'We focus on sustainable compounding over 5 to 10+ year time horizons, shielding client capital from emotional panic and speculative fads.'
  },
  {
    icon: 'shield-check',
    title: 'Integrated Governance',
    description: 'We bridge wealth growth with wealth protection, succession awareness, and risk mitigation — protecting family balance sheets for generations.'
  }
];

// Target Audience Profiles (Who We Serve)
const AUDIENCE_PROFILES = [
  {
    id: 'individuals',
    title: 'Individuals',
    eyebrow: 'Personal Wealth Compounding',
    icon: 'users',
    desc: 'Goal-aligned investment portfolios, disciplined SIP compounding, and long-term wealth creation strategies designed for financial freedom and milestone planning.',
    keyPoints: ['Goal-mapped portfolios', 'Tax-efficient SIPs', 'Regular portfolio reviews']
  },
  {
    id: 'entrepreneurs',
    title: 'Entrepreneurs',
    eyebrow: 'Business & Personal Wealth Separation',
    icon: 'briefcase-business',
    desc: 'Helping business founders diversify beyond enterprise risk, deploy operating cash surpluses, and construct enduring family wealth separate from company liabilities.',
    keyPoints: ['De-linking personal & business risk', 'Treasury surplus management', 'Structured promoter wealth']
  },
  {
    id: 'professionals',
    title: 'Professionals',
    eyebrow: 'High-Earning Executives & Doctors',
    icon: 'award',
    desc: 'Time-efficient, disciplined wealth management for doctors, corporate executives, and consultants who need professional oversight while focusing on their careers.',
    keyPoints: ['Hassle-free automated investing', 'Multi-asset allocation', 'Risk & health protection']
  },
  {
    id: 'hni-uhni',
    title: 'HNIs & UHNI Clients',
    eyebrow: 'High Net-Worth Solutions',
    icon: 'landmark',
    desc: 'Customised PMS mandates, private AIF allocations, curated corporate bonds, global market access, and structured wealth governance for high-net-worth families.',
    keyPoints: ['Exclusive PMS & AIF access', 'Direct equity & debt placement', 'Tailored wealth architecture']
  },
  {
    id: 'families',
    title: 'Families',
    eyebrow: 'Multi-Generational Preservation',
    icon: 'house',
    desc: 'Comprehensive family office guidance, children’s higher education funding, retirement income architecture, and wealth protection across generations.',
    keyPoints: ['Family wealth governance', 'Retirement cash flows', 'Complete risk hedging']
  },
  {
    id: 'corporate',
    title: 'Corporate Clients',
    eyebrow: 'Treasury & Financial Planning',
    icon: 'building-2',
    desc: 'Institutional cash management, short-term liquidity parking, capital structuring advice, and key-person risk management for private enterprises.',
    keyPoints: ['Liquidity management', 'Working capital yield optimization', 'Key-man insurance']
  }
];

// Leadership Profile (Strictly approved credentials, no invented statistics)
const LEADERSHIP_DATA = {
  name: 'CA Haresh Bhatreja',
  role: 'Wealth Manager | Portfolio Manager',
  credentials: 'CA | FCA | PFDIFA | B.Com. | NISM Certified Research Analyst',
  firmInception: '2017',
  bio: 'CA Haresh Bhatreja leads Chartered Integrated Services Private Limited with an uncompromising commitment to research-driven wealth creation and disciplined portfolio management. Combining rigorous Chartered Accountancy financial analysis with NISM Research Analyst accreditation, he specializes in identifying long-term market trends, evaluating business economics, and structuring comprehensive investment portfolios for individuals, entrepreneurs, and HNI families.',
  expertiseAreas: [
    'Investment Research & Security Analysis',
    'Wealth & Portfolio Management',
    'Equity Market Valuation Frameworks',
    'Mutual Fund Asset Allocation Strategies',
    'Entrepreneur & Business-Owner Wealth Planning',
    'Fixed Income & Yield Optimization',
    'Long-Term Capital Compounding Frameworks',
    'Risk Management & Wealth Protection'
  ],
  quote: 'Successful wealth creation is not about chasing short-term market fads or predicting tomorrow’s headlines. It is about deep fundamental research, disciplined asset allocation, diversification, and having the temperament to compound over the long run.'
};

// Research & Insights Content Categories
const RESEARCH_CATEGORIES = [
  { id: 'equity-research', label: 'Equity Research', icon: 'trending-up', desc: 'Fundamental company analysis and balance sheet diagnostics' },
  { id: 'company-analysis', label: 'Company Analysis', icon: 'search', desc: 'Moats, management quality, cash flows, and valuation metrics' },
  { id: 'sector-research', label: 'Sector Research', icon: 'layers', desc: 'Evaluating structural shifts in Indian banking, manufacturing, and technology' },
  { id: 'market-outlook', label: 'Market Outlook', icon: 'activity', desc: 'Macroeconomic indicators, central bank policies, and liquidity cycles' },
  { id: 'investment-themes', label: 'Investment Themes', icon: 'target', desc: 'Multi-year structural megatrends driving economic expansion' },
  { id: 'portfolio-insights', label: 'Portfolio Insights', icon: 'pie-chart', desc: 'Asset allocation strategies, risk management, and rebalancing principles' },
  { id: 'market-updates', label: 'Market Updates', icon: 'clock', desc: 'Important developments across Indian and international capital markets' },
  { id: 'educational-insights', label: 'Educational Insights', icon: 'book-open', desc: 'Demystifying complex investment structures into actionable wisdom' }
];

// Sample Curated Editorial Research Articles (Institutional quality)
const RESEARCH_ARTICLES = [
  {
    id: 'capex-cycle-india',
    category: 'Investment Themes',
    categoryLabel: 'Investment Themes',
    readTime: '6 min read',
    date: 'September 2026',
    title: 'The Multi-Year Indian Capex Revival: Where Capital is Flowing',
    summary: 'An analytical examination of private capital expenditure, government infrastructure spending, and the resurgence of domestic manufacturing through PLI frameworks.',
    tags: ['Manufacturing', 'Infrastructure', 'Equities']
  },
  {
    id: 'asset-allocation-discipline',
    category: 'Portfolio Insights',
    categoryLabel: 'Portfolio Insights',
    readTime: '5 min read',
    date: 'September 2026',
    title: 'Why Asset Allocation Matters More Than Stock Picking in Market Volatility',
    summary: 'Empirical data demonstrates that over 90% of portfolio return stability comes from asset allocation. How balancing equities with fixed income cushions downside drawdowns.',
    tags: ['Asset Allocation', 'Risk Management', 'Compounding']
  },
  {
    id: 'evaluating-pms-aif',
    category: 'Educational Insights',
    categoryLabel: 'Educational Insights',
    readTime: '7 min read',
    date: 'August 2026',
    title: 'Demystifying PMS vs. AIF: An Investor’s Decision Matrix',
    summary: 'A clear, non-technical breakdown of differences in structure, tax treatment, liquidity, and regulatory frameworks between Portfolio Management Services and Category II/III AIFs.',
    tags: ['PMS', 'AIF', 'HNIs']
  },
  {
    id: 'global-diversification-lrs',
    category: 'Market Outlook',
    categoryLabel: 'Global Markets',
    readTime: '5 min read',
    date: 'August 2026',
    title: 'Why Geographical Diversification Protects Indian Balance Sheets',
    summary: 'Analyzing the long-term impact of USD-INR dynamics and how international equity participation via RBI’s Liberalised Remittance Scheme dampens single-country concentration risk.',
    tags: ['Global Markets', 'US Equities', 'LRS']
  },
  {
    id: 'fixed-income-rate-cycle',
    category: 'Equity Research',
    categoryLabel: 'Fixed Income',
    readTime: '4 min read',
    date: 'July 2026',
    title: 'Navigating Peak Interest Rates: Locking in Quality Yields',
    summary: 'How investors can strategically position bond portfolios across duration and credit tiers when central bank monetary tightening cycles reach their zenith.',
    tags: ['Bonds', 'Yields', 'Fixed Income']
  },
  {
    id: 'entrepreneur-personal-wealth',
    category: 'Portfolio Insights',
    categoryLabel: 'Entrepreneurs',
    readTime: '6 min read',
    date: 'July 2026',
    title: 'The Entrepreneur’s Dilemma: Diversifying Beyond the Company Balance Sheet',
    summary: 'Why business owners must create an unassailable personal liquidity buffer that does not depend on their operational business performance or working capital cycles.',
    tags: ['Entrepreneurs', 'Family Office', 'Liquidity']
  }
];

// Market Updates Dashboard Data Structure
const MARKET_DESK_DATA = {
  notice: 'Indicative market snapshots curated for investor perspective. Live feeds require exchange connectivity and data subscriptions. All data is for educational reference.',
  lastUpdated: 'Daily Market Briefing Desk',
  indianIndices: [
    { name: 'NIFTY 50', focus: 'Indian Benchmark', tag: 'Core Market' },
    { name: 'BSE SENSEX', focus: 'Large Cap 30', tag: 'Bluechip' },
    { name: 'NIFTY MIDCAP 150', focus: 'Mid-Sized Growth', tag: 'High Growth' },
    { name: 'NIFTY SMALLCAP 250', focus: 'Small Cap Enterprises', tag: 'Domestic Themes' },
    { name: 'GIFT NIFTY', focus: 'International Trading Desk', tag: 'Early Signals' }
  ],
  globalIndices: [
    { name: 'S&P 500 (US)', focus: 'Global Benchmark', tag: 'US Market' },
    { name: 'NASDAQ 100', focus: 'Global Tech Leaders', tag: 'Technology' },
    { name: 'FTSE 100 (UK)', focus: 'European Hub', tag: 'Global Value' },
    { name: 'NIKKEI 225', focus: 'Asian Expansion', tag: 'Japan Market' }
  ],
  commoditiesCurrencies: [
    { asset: 'Gold (MCX / Comex)', metric: 'Precious Metals', role: 'Inflation & Crisis Hedge' },
    { asset: 'Silver', metric: 'Industrial Precious', role: 'Clean Energy & Electronics' },
    { asset: 'Brent Crude Oil', metric: 'Energy Benchmark', role: 'Macro Inflation Indicator' },
    { asset: 'USD / INR', metric: 'Currency Pair', role: 'Trade & Overseas Remittance' },
    { asset: '10-Yr Benchmark G-Sec', metric: 'Sovereign Yield', role: 'Cost of Capital Anchor' }
  ],
  institutionalFlows: [
    { category: 'FII Net Activity', note: 'Foreign Institutional Investors flow trends reflect global risk appetite.' },
    { category: 'DII Net Activity', note: 'Domestic Institutional Investors (Mutual Funds & Insurance) provide systemic domestic liquidity.' },
    { category: 'SIP Inflows', note: 'Indian monthly retail SIP commitments provide strong ongoing support to equities.' }
  ]
};
