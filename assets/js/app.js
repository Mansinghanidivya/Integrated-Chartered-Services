// Main Application View Controller & Page Renderers
// Chartered Integrated Services Private Limited — Research Driven Wealth Creation
// Clean, Modular, Institutional Wealth-Management Architecture

const appRoot = document.getElementById('main-content');

// Helper to open Consultation Modal with preselected topic
function openConsultationModal(initialTopic = 'Investment Consultation', defaultCategory = 'Individual') {
  const modal = document.getElementById('consultation-modal');
  const topicSelect = document.getElementById('modal-interest');
  const categorySelect = document.getElementById('modal-category');

  if (topicSelect && initialTopic) {
    // If exact option exists, select it
    for (let i = 0; i < topicSelect.options.length; i++) {
      if (topicSelect.options[i].text.toLowerCase().includes(initialTopic.toLowerCase()) || 
          topicSelect.options[i].value.toLowerCase().includes(initialTopic.toLowerCase())) {
        topicSelect.selectedIndex = i;
        break;
      }
    }
  }

  if (categorySelect && defaultCategory) {
    categorySelect.value = defaultCategory;
  }

  if (modal) {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    document.body.style.overflow = 'hidden';
  }
}

function closeConsultationModal() {
  const modal = document.getElementById('consultation-modal');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    document.body.style.overflow = 'auto';
  }
}

// --------------------------------------------------------------------------
// 1. HOMEPAGE VIEW
// --------------------------------------------------------------------------
function renderHomePage() {
  // Solutions cards preview (All 10 solutions)
  const solutionsCardsHtml = SOLUTIONS_DATA.map((sol, index) => {
    return `
      <div class="group relative flex flex-col justify-between rounded-3xl border border-slate-200/80 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-emerald-300 hover:shadow-xl" data-testid="solution-card-${sol.id}">
        <div>
          <div class="flex items-start justify-between">
            <span class="grid size-12 place-items-center rounded-2xl bg-emerald-50 text-[#059669] transition-colors duration-300 group-hover:bg-[#059669] group-hover:text-white">
              ${renderIcon(sol.icon, 'size-6')}
            </span>
            <span class="font-mono text-xs font-bold text-slate-300">0${index + 1}</span>
          </div>

          <p class="mt-6 text-[0.68rem] font-bold uppercase tracking-[0.16em] text-[#d97706]">${sol.category}</p>
          <h3 class="mt-2 text-xl font-bold text-[#0a192f] font-heading group-hover:text-[#059669] transition-colors">
            <a href="#/solutions/${sol.id}" data-nav-to="/solutions/${sol.id}">${sol.name}</a>
          </h3>
          <p class="mt-3 text-sm leading-relaxed text-slate-600">${sol.summary}</p>
        </div>

        <div class="mt-8 border-t border-slate-100 pt-5">
          <div class="flex flex-wrap gap-1.5 mb-4">
            ${sol.highlights.slice(0, 2).map(h => `<span class="rounded-full bg-slate-50 px-2.5 py-1 text-[0.66rem] font-semibold text-slate-500 border border-slate-100">${h}</span>`).join('')}
          </div>
          <div class="flex items-center justify-between">
            <a href="#/solutions/${sol.id}" data-nav-to="/solutions/${sol.id}" class="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#0a192f] hover:text-[#059669] transition-colors">
              <span>Explore Solution</span>
              ${renderIcon('arrow-right', 'size-3.5')}
            </a>
            <button type="button" class="btn-consultation grid size-8 place-items-center rounded-full bg-slate-100 text-slate-600 hover:bg-[#059669] hover:text-white transition-colors cursor-pointer" data-interest="${sol.name}" title="Enquire about ${sol.name}">
              ${renderIcon('message-circle', 'size-3.5')}
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');

  // Differentiators HTML
  const diffsHtml = DIFFERENTIATORS.map((d, i) => `
    <div class="rounded-3xl border border-slate-200/80 bg-white p-7 shadow-sm transition-all duration-300 hover:shadow-md hover:border-slate-300">
      <div class="grid size-11 place-items-center rounded-2xl bg-[#0a192f] text-emerald-400">
        ${renderIcon(d.icon, 'size-5')}
      </div>
      <h3 class="mt-5 text-lg font-bold text-[#0a192f] font-heading">${d.title}</h3>
      <p class="mt-2.5 text-sm leading-relaxed text-slate-600">${d.description}</p>
    </div>
  `).join('');

  // 5-step process timeline HTML
  const approachTimelineHtml = INVESTMENT_APPROACH.map((step, idx) => `
    <div class="relative flex flex-col items-start rounded-3xl border border-slate-200 bg-white p-6 sm:p-7 shadow-sm transition-all hover:shadow-md hover:border-emerald-300">
      <div class="flex items-center justify-between w-full border-b border-slate-100 pb-3 mb-4">
        <span class="font-mono text-xs font-bold tracking-widest text-[#059669] bg-emerald-50 px-2.5 py-1 rounded-full">STEP ${step.step}</span>
        <span class="text-[0.66rem] font-bold uppercase tracking-wider text-[#d97706]">${step.name}</span>
      </div>
      <h3 class="text-lg font-bold text-[#0a192f] font-heading">${step.title}</h3>
      <p class="mt-1 text-xs font-semibold text-slate-400 font-mono">${step.tagline}</p>
      <p class="mt-3 text-sm leading-relaxed text-slate-600">${step.description}</p>
    </div>
  `).join('');

  // Who We Serve HTML
  const audienceHtml = AUDIENCE_PROFILES.map((aud) => `
    <div class="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm flex flex-col justify-between hover:border-slate-300 transition-all hover:shadow-md">
      <div>
        <div class="flex items-center justify-between">
          <span class="grid size-11 place-items-center rounded-2xl bg-emerald-50 text-[#059669]">
            ${renderIcon(aud.icon, 'size-5')}
          </span>
          <span class="text-[0.66rem] font-bold uppercase tracking-wider text-[#d97706]">${aud.eyebrow}</span>
        </div>
        <h3 class="mt-5 text-xl font-bold text-[#0a192f] font-heading">${aud.title}</h3>
        <p class="mt-2.5 text-sm leading-relaxed text-slate-600">${aud.desc}</p>
      </div>
      <div class="mt-6 border-t border-slate-100 pt-4">
        <ul class="space-y-1.5 text-xs text-slate-500 font-medium">
          ${aud.keyPoints.map(kp => `<li class="flex items-center gap-2">${renderIcon('check', 'size-3.5 text-[#059669]')} ${kp}</li>`).join('')}
        </ul>
      </div>
    </div>
  `).join('');

  // Research Articles Preview
  const researchPreviewHtml = RESEARCH_ARTICLES.slice(0, 3).map(art => `
    <article class="flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-7 shadow-sm hover:shadow-md hover:border-emerald-200 transition-all">
      <div>
        <div class="flex items-center justify-between text-xs text-slate-400 font-mono mb-3">
          <span class="text-[0.68rem] font-bold uppercase tracking-wider text-[#059669]">${art.category}</span>
          <span>${art.readTime}</span>
        </div>
        <h3 class="text-lg font-bold text-[#0a192f] font-heading leading-snug">
          <a href="#/research" data-nav-to="/research" class="hover:text-[#059669] transition-colors">${art.title}</a>
        </h3>
        <p class="mt-3 text-sm leading-relaxed text-slate-600">${art.summary}</p>
      </div>
      <div class="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
        <div class="flex gap-1.5">
          ${art.tags.map(t => `<span class="rounded bg-slate-100 px-2 py-0.5 text-[0.65rem] font-semibold text-slate-500 font-mono">#${t}</span>`).join('')}
        </div>
        <a href="#/research" data-nav-to="/research" class="text-xs font-bold text-[#0a192f] hover:text-[#059669] inline-flex items-center gap-1">
          Read ${renderIcon('arrow-right', 'size-3')}
        </a>
      </div>
    </article>
  `).join('');

  appRoot.innerHTML = `
    <div data-testid="home-page">
      <!-- 1. HERO SECTION -->
      <section class="relative overflow-hidden bg-gradient-to-b from-[#f8fafc] via-white to-[#f8fafc] py-16 sm:py-24 lg:py-28" data-testid="home-hero-section">
        <div class="pointer-events-none absolute -right-32 top-8 hidden size-[600px] rounded-full border border-emerald-500/10 lg:block"></div>
        <div class="pointer-events-none absolute -right-16 top-24 hidden size-[420px] rounded-full border border-amber-500/10 lg:block"></div>
        
        <div class="mx-auto max-w-[1320px] px-5 sm:px-8 lg:px-12">
          <div class="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
            <!-- Hero Copy -->
            <div>
              <div class="inline-flex items-center gap-2.5 rounded-full border border-emerald-200 bg-emerald-50/80 px-4 py-1.5 text-[0.68rem] font-bold uppercase tracking-[0.16em] text-[#059669]">
                <span class="size-2 rounded-full bg-[#059669] animate-pulse"></span>
                Chartered Integrated Services · Estd. 2017
              </div>

              <h1 class="mt-6 font-heading text-4xl font-extrabold tracking-tight text-[#0a192f] sm:text-6xl lg:text-[4.25rem] leading-[1.05]" data-testid="hero-title">
                Research Driven <br class="hidden sm:inline" />
                <span class="text-transparent bg-clip-text bg-gradient-to-r from-[#059669] to-[#0a192f]">Wealth Creation.</span>
              </h1>

              <p class="mt-6 text-lg sm:text-xl font-medium text-slate-800 leading-relaxed font-heading" data-testid="hero-subheadline">
                Comprehensive investment and wealth-management solutions for individuals, entrepreneurs, professionals, HNIs and families.
              </p>

              <p class="mt-4 text-sm sm:text-base leading-relaxed text-slate-600 max-w-2xl" data-testid="hero-supporting-copy">
                From Indian equities and mutual funds to PMS, AIFs, bonds, REITs, InvITs, global investments and insurance, Chartered Integrated Services brings multiple financial solutions under one professional platform — supported by research, disciplined decision-making and a long-term approach to wealth creation.
              </p>

              <div class="mt-9 flex flex-col gap-3.5 sm:flex-row sm:items-center">
                <button type="button" class="btn-consultation inline-flex items-center justify-center gap-2 h-13 rounded-2xl bg-[#0a192f] px-7 font-bold text-white shadow-lg shadow-slate-900/10 hover:bg-[#059669] transition-all duration-200 cursor-pointer text-sm" data-interest="General Wealth Consultation">
                  ${renderIcon('message-circle', 'size-4')}
                  <span>Book a Consultation</span>
                  ${renderIcon('arrow-right', 'size-4')}
                </button>
                <a href="#/solutions" data-nav-to="/solutions" class="inline-flex items-center justify-center gap-2 h-13 rounded-2xl border border-slate-300 bg-white px-7 font-bold text-[#0a192f] hover:border-[#059669] hover:bg-emerald-50/50 transition-all duration-200 text-sm">
                  <span>Explore Our Investment Solutions</span>
                  ${renderIcon('arrow-up-right', 'size-4 text-[#059669]')}
                </a>
              </div>

              <!-- Trust bullets -->
              <div class="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 text-xs font-semibold text-slate-600">
                <span class="flex items-center gap-2">
                  ${renderIcon('shield-check', 'size-4 text-[#059669]')} NISM Certified Research Analyst
                </span>
                <span class="flex items-center gap-2">
                  ${renderIcon('chart-column', 'size-4 text-[#059669]')} Multi-Asset Portfolio Architecture
                </span>
                <span class="flex items-center gap-2">
                  ${renderIcon('target', 'size-4 text-[#059669]')} Long-Term Fiduciary Approach
                </span>
              </div>
            </div>

            <!-- Hero Visual Widget -->
            <div class="relative mx-auto w-full max-w-[540px]">
              <div class="rounded-3xl bg-[#0a192f] p-7 sm:p-9 text-white shadow-2xl relative overflow-hidden border border-slate-800">
                <div class="pointer-events-none absolute -right-16 -top-16 size-48 rounded-full border border-amber-500/20"></div>
                <div class="pointer-events-none absolute -bottom-16 -left-16 size-48 rounded-full border border-emerald-500/20"></div>

                <div class="relative z-10 flex items-center justify-between border-b border-white/10 pb-5">
                  <div>
                    <p class="font-mono text-[0.66rem] uppercase tracking-widest text-emerald-300">Investment Desk</p>
                    <h3 class="text-xl font-bold font-heading text-white mt-1">Institutional Wealth Framework</h3>
                  </div>
                  <span class="grid size-10 place-items-center rounded-xl bg-white/10 text-amber-400">
                    ${renderIcon('award', 'size-5')}
                  </span>
                </div>

                <div class="relative my-7 space-y-3 font-mono text-xs">
                  <div class="flex items-center justify-between rounded-xl bg-white/5 p-3.5 border border-white/5">
                    <span class="text-slate-300">Equities & PMS / AIF</span>
                    <span class="text-emerald-300 font-bold">Growth Capital</span>
                  </div>
                  <div class="flex items-center justify-between rounded-xl bg-white/5 p-3.5 border border-white/5">
                    <span class="text-slate-300">Mutual Funds & SIPs</span>
                    <span class="text-emerald-300 font-bold">Disciplined Compounding</span>
                  </div>
                  <div class="flex items-center justify-between rounded-xl bg-white/5 p-3.5 border border-white/5">
                    <span class="text-slate-300">Bonds, REITs & InvITs</span>
                    <span class="text-amber-300 font-bold">Income & Cash Flow</span>
                  </div>
                  <div class="flex items-center justify-between rounded-xl bg-white/5 p-3.5 border border-white/5">
                    <span class="text-slate-300">Global Markets (US/LRS)</span>
                    <span class="text-sky-300 font-bold">Geographic Hedge</span>
                  </div>
                  <div class="flex items-center justify-between rounded-xl bg-white/5 p-3.5 border border-white/5">
                    <span class="text-slate-300">Insurance & Protection</span>
                    <span class="text-rose-300 font-bold">Wealth Defense</span>
                  </div>
                </div>

                <div class="border-t border-white/10 pt-5 flex items-center justify-between">
                  <div>
                    <p class="text-[0.65rem] uppercase tracking-widest text-slate-400 font-mono">Philosophy</p>
                    <p class="text-xs font-bold text-slate-200 mt-0.5">Research. Discipline. Diversification.</p>
                  </div>
                  <span class="rounded-full bg-emerald-500/20 px-3 py-1 text-[0.68rem] font-bold text-[#86efac]">
                    Estd. 2017
                  </span>
                </div>
              </div>

              <!-- Floating badge -->
              <div class="absolute -bottom-4 -left-3 sm:-left-6 rounded-2xl bg-white p-4 shadow-xl border border-slate-200 flex items-center gap-3">
                <span class="grid size-10 place-items-center rounded-xl bg-emerald-100 text-[#059669]">
                  ${renderIcon('sparkles', 'size-5')}
                </span>
                <div>
                  <p class="text-xs font-bold text-[#0a192f]">Invest · Manage · Protect · Grow</p>
                  <p class="text-[0.68rem] text-slate-500 font-mono">End-to-End Wealth Advisory</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 2. TRUST / CREDIBILITY STRIP -->
      <section class="border-y border-slate-200 bg-white py-8" data-testid="home-trust-strip">
        <div class="mx-auto max-w-[1320px] px-5 sm:px-8 lg:px-12">
          <div class="grid grid-cols-2 gap-6 md:grid-cols-4">
            <div class="flex items-center gap-3.5">
              <span class="font-mono text-2xl font-bold text-[#059669]">2017</span>
              <div class="text-xs text-slate-600">
                <p class="font-bold text-[#0a192f]">Established Year</p>
                <p>Decade-long market presence</p>
              </div>
            </div>
            <div class="flex items-center gap-3.5">
              <span class="font-mono text-2xl font-bold text-[#059669]">10+</span>
              <div class="text-xs text-slate-600">
                <p class="font-bold text-[#0a192f]">Investment Solutions</p>
                <p>One unified platform</p>
              </div>
            </div>
            <div class="flex items-center gap-3.5">
              <span class="font-mono text-2xl font-bold text-[#059669]">NISM</span>
              <div class="text-xs text-slate-600">
                <p class="font-bold text-[#0a192f]">Research Analyst</p>
                <p>Certified security analysis</p>
              </div>
            </div>
            <div class="flex items-center gap-3.5">
              <span class="font-mono text-2xl font-bold text-[#059669]">360°</span>
              <div class="text-xs text-slate-600">
                <p class="font-bold text-[#0a192f]">Integrated Wealth</p>
                <p>Invest · Protect · Compound</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 3. WHAT WE DO: ONE PLATFORM. MULTIPLE INVESTMENT OPPORTUNITIES -->
      <section class="py-20 sm:py-28 bg-[#f8fafc]" data-testid="home-what-we-do-section">
        <div class="mx-auto max-w-[1320px] px-5 sm:px-8 lg:px-12">
          <div class="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p class="text-[0.68rem] font-bold uppercase tracking-[0.18em] text-[#059669]">What We Do</p>
              <h2 class="mt-3 font-heading text-3xl font-extrabold text-[#0a192f] sm:text-5xl tracking-tight">
                One Platform. Multiple Investment Opportunities.
              </h2>
              <p class="mt-4 max-w-2xl text-base text-slate-600">
                We bring a comprehensive universe of capital market instruments together under a research-driven, disciplined decision framework.
              </p>
            </div>
            <a href="#/solutions" data-nav-to="/solutions" class="inline-flex items-center gap-2 rounded-xl bg-[#0a192f] px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-white hover:bg-[#059669] transition-colors shrink-0">
              <span>Explore All Solutions</span>
              ${renderIcon('arrow-right', 'size-4')}
            </a>
          </div>

          <div class="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
            ${solutionsCardsHtml}
          </div>
        </div>
      </section>

      <!-- 4. WHY CHARTERED INTEGRATED SERVICES? -->
      <section class="py-20 sm:py-28 bg-white border-y border-slate-200" data-testid="home-why-us-section">
        <div class="mx-auto max-w-[1320px] px-5 sm:px-8 lg:px-12">
          <div class="text-center max-w-3xl mx-auto">
            <p class="text-[0.68rem] font-bold uppercase tracking-[0.18em] text-[#d97706]">Evidence-Based Distinction</p>
            <h2 class="mt-3 font-heading text-3xl font-extrabold text-[#0a192f] sm:text-5xl tracking-tight">
              Why Chartered Integrated Services?
            </h2>
            <p class="mt-4 text-base text-slate-600 leading-relaxed">
              We replace market speculation with institutional discipline. Here is how our practice is built differently.
            </p>
          </div>

          <div class="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            ${diffsHtml}
          </div>
        </div>
      </section>

      <!-- 5. OUR INVESTMENT APPROACH (5-Step Process) -->
      <section class="py-20 sm:py-28 bg-[#f8fafc]" data-testid="home-approach-section">
        <div class="mx-auto max-w-[1320px] px-5 sm:px-8 lg:px-12">
          <div class="text-center max-w-3xl mx-auto">
            <p class="text-[0.68rem] font-bold uppercase tracking-[0.18em] text-[#059669]">Disciplined Execution</p>
            <h2 class="mt-3 font-heading text-3xl font-extrabold text-[#0a192f] sm:text-5xl tracking-tight">
              Our Investment Approach
            </h2>
            <p class="mt-4 text-base text-slate-600 leading-relaxed">
              We do not sell isolated products. Every portfolio is engineered through our structured 5-step wealth-creation cycle.
            </p>
            <div class="mt-5 inline-flex items-center gap-2 font-mono text-xs font-bold text-slate-700 bg-white border border-slate-200 px-4 py-2 rounded-full">
              <span>Understand</span>
              ${renderIcon('arrow-right', 'size-3 text-[#059669]')}
              <span>Research</span>
              ${renderIcon('arrow-right', 'size-3 text-[#059669]')}
              <span>Strategise</span>
              ${renderIcon('arrow-right', 'size-3 text-[#059669]')}
              <span>Invest</span>
              ${renderIcon('arrow-right', 'size-3 text-[#059669]')}
              <span>Review</span>
            </div>
          </div>

          <div class="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            ${approachTimelineHtml}
          </div>
        </div>
      </section>

      <!-- 6. RESEARCH DRIVEN WEALTH CREATION -->
      <section class="py-20 sm:py-28 bg-[#0a192f] text-white relative overflow-hidden" data-testid="home-research-section">
        <div class="pointer-events-none absolute right-0 top-0 size-[500px] rounded-full border border-emerald-500/10"></div>
        <div class="mx-auto max-w-[1320px] px-5 sm:px-8 lg:px-12 relative z-10">
          <div class="grid items-center gap-12 lg:grid-cols-[1fr_1fr]">
            <div>
              <p class="text-[0.68rem] font-bold uppercase tracking-[0.18em] text-[#86efac]">Our Core Philosophy</p>
              <h2 class="mt-3 font-heading text-3xl font-extrabold sm:text-5xl tracking-tight text-white leading-tight">
                Research Driven. <br /><span class="text-emerald-400">Not Noise Driven.</span>
              </h2>
              <p class="mt-6 text-base text-slate-300 leading-relaxed">
                Financial markets generate enormous amounts of information every day. Our approach is to look beyond short-term noise and focus on research, business fundamentals, industry trends, valuations, risk and long-term opportunity.
              </p>

              <div class="mt-8 grid grid-cols-2 gap-3.5">
                <div class="rounded-2xl bg-white/5 p-4 border border-white/10">
                  <p class="font-bold text-white text-sm font-heading">Equity Research</p>
                  <p class="text-xs text-slate-400 mt-1">Deep fundamental balance sheet analysis</p>
                </div>
                <div class="rounded-2xl bg-white/5 p-4 border border-white/10">
                  <p class="font-bold text-white text-sm font-heading">Company Analysis</p>
                  <p class="text-xs text-slate-400 mt-1">Competitive moats, cash flows & governance</p>
                </div>
                <div class="rounded-2xl bg-white/5 p-4 border border-white/10">
                  <p class="font-bold text-white text-sm font-heading">Sector Outlooks</p>
                  <p class="text-xs text-slate-400 mt-1">Identifying structural cyclical expansions</p>
                </div>
                <div class="rounded-2xl bg-white/5 p-4 border border-white/10">
                  <p class="font-bold text-white text-sm font-heading">Portfolio Insights</p>
                  <p class="text-xs text-slate-400 mt-1">Asset allocation & risk-budgeting discipline</p>
                </div>
              </div>

              <div class="mt-9 flex items-center gap-4">
                <a href="#/research" data-nav-to="/research" class="inline-flex items-center gap-2 rounded-xl bg-[#059669] px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-white hover:bg-emerald-600 transition-colors">
                  <span>Explore Research & Insights</span>
                  ${renderIcon('arrow-right', 'size-4')}
                </a>
              </div>
            </div>

            <!-- Curated Research Publications Box -->
            <div class="space-y-4">
              <p class="text-xs font-mono uppercase tracking-widest text-slate-400 mb-2">Featured Institutional Briefings</p>
              ${researchPreviewHtml}
            </div>
          </div>
        </div>
      </section>

      <!-- 7. FOR ENTREPRENEURS & BUSINESS OWNERS -->
      <section class="py-20 sm:py-28 bg-white" data-testid="home-entrepreneurs-section">
        <div class="mx-auto max-w-[1320px] px-5 sm:px-8 lg:px-12">
          <div class="rounded-3xl bg-gradient-to-br from-[#0a192f] via-[#071526] to-[#0a192f] p-8 sm:p-14 text-white relative overflow-hidden shadow-2xl">
            <div class="pointer-events-none absolute -right-20 -bottom-20 size-80 rounded-full border border-amber-500/20"></div>

            <div class="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] relative z-10">
              <div>
                <span class="inline-flex items-center gap-2 rounded-full bg-amber-500/10 border border-amber-500/30 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#d97706]">
                  Dedicated Wealth Advisory
                </span>
                <h2 class="mt-5 font-heading text-3xl font-extrabold sm:text-5xl tracking-tight text-white leading-tight">
                  For Entrepreneurs & <br class="hidden sm:inline" />Business Owners
                </h2>
                <p class="mt-6 text-base sm:text-lg text-slate-300 leading-relaxed">
                  Building a successful business and building personal wealth are two different journeys. We help entrepreneurs look beyond their business and build a structured approach to managing and growing personal wealth.
                </p>

                <div class="mt-8 grid grid-cols-2 gap-4 text-xs font-medium text-slate-300">
                  <div class="flex items-center gap-2.5">
                    ${renderIcon('check', 'size-4 text-[#86efac]')} Personal Wealth Planning
                  </div>
                  <div class="flex items-center gap-2.5">
                    ${renderIcon('check', 'size-4 text-[#86efac]')} Surplus Cash Deployment
                  </div>
                  <div class="flex items-center gap-2.5">
                    ${renderIcon('check', 'size-4 text-[#86efac]')} Investment Diversification
                  </div>
                  <div class="flex items-center gap-2.5">
                    ${renderIcon('check', 'size-4 text-[#86efac]')} Family Wealth Architecture
                  </div>
                  <div class="flex items-center gap-2.5">
                    ${renderIcon('check', 'size-4 text-[#86efac]')} Risk & Key-Man Coverage
                  </div>
                  <div class="flex items-center gap-2.5">
                    ${renderIcon('check', 'size-4 text-[#86efac]')} Portfolio & PMS Management
                  </div>
                </div>

                <div class="mt-10 flex flex-wrap gap-4">
                  <button type="button" class="btn-consultation inline-flex items-center gap-2 rounded-xl bg-[#059669] px-7 py-3.5 text-xs font-bold uppercase tracking-wider text-white hover:bg-emerald-600 transition-colors cursor-pointer" data-interest="Entrepreneur Wealth Advisory" data-category="Entrepreneur">
                    ${renderIcon('message-circle', 'size-4')}
                    <span>Talk to an Investment Professional</span>
                  </button>
                  <a href="#/entrepreneurs" data-nav-to="/entrepreneurs" class="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-white hover:bg-white/10 transition-colors">
                    <span>Learn More About Entrepreneur Solutions</span>
                    ${renderIcon('arrow-right', 'size-4')}
                  </a>
                </div>
              </div>

              <!-- Quote card -->
              <div class="rounded-2xl border border-white/10 bg-white/5 p-7 backdrop-blur-sm">
                <div class="flex items-center gap-3 text-amber-400">
                  ${renderIcon('award', 'size-6')}
                  <span class="text-xs uppercase tracking-widest font-mono text-slate-300">Promoter Advisory Lens</span>
                </div>
                <blockquote class="mt-4 text-sm leading-relaxed text-slate-300 italic">
                  “A business owner’s net worth is often 90% concentrated inside their company. Our priority is creating an unassailable personal liquidity and compounding cushion that stands independent of business cycles.”
                </blockquote>
                <div class="mt-6 pt-5 border-t border-white/10 flex items-center justify-between text-xs">
                  <div>
                    <p class="font-bold text-white font-heading">CA Haresh Bhatreja</p>
                    <p class="text-slate-400">Wealth Manager | Portfolio Manager</p>
                  </div>
                  <span class="font-mono text-[#86efac]">Ahmedabad Desk</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 8. WHO WE SERVE -->
      <section class="py-20 sm:py-28 bg-[#f8fafc] border-b border-slate-200" data-testid="home-who-we-serve-section">
        <div class="mx-auto max-w-[1320px] px-5 sm:px-8 lg:px-12">
          <div class="text-center max-w-3xl mx-auto">
            <p class="text-[0.68rem] font-bold uppercase tracking-[0.18em] text-[#059669]">Tailored Solutions</p>
            <h2 class="mt-3 font-heading text-3xl font-extrabold text-[#0a192f] sm:text-5xl tracking-tight">
              Who We Serve
            </h2>
            <p class="mt-4 text-base text-slate-600 leading-relaxed">
              Every client segment carries distinct risk appetites, liquidity obligations, and time horizons.
            </p>
          </div>

          <div class="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            ${audienceHtml}
          </div>
        </div>
      </section>

      <!-- 9. CALCULATORS & INVESTOR TOOLS PREVIEW -->
      <section class="py-20 sm:py-28 bg-white" data-testid="home-calculators-section">
        <div class="mx-auto max-w-[1320px] px-5 sm:px-8 lg:px-12">
          <div class="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p class="text-[0.68rem] font-bold uppercase tracking-[0.18em] text-[#d97706]">Interactive Planning Tools</p>
              <h2 class="mt-3 font-heading text-3xl font-extrabold text-[#0a192f] sm:text-5xl tracking-tight">
                Plan Your Compounding Journey
              </h2>
              <p class="mt-4 max-w-2xl text-base text-slate-600">
                Explore our full suite of 9 institutional calculators — from SIP and step-up compounding to retirement corpus and goal planning.
              </p>
            </div>
            <a href="#/calculators" data-nav-to="/calculators" class="inline-flex items-center gap-2 rounded-xl bg-[#0a192f] px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-white hover:bg-[#059669] transition-colors shrink-0">
              <span>View All 9 Calculators</span>
              ${renderIcon('arrow-right', 'size-4')}
            </a>
          </div>

          <!-- Embedded Quick SIP Calculator Widget -->
          <div class="mt-12 rounded-3xl border border-slate-200 bg-slate-50/50 p-6 sm:p-10">
            <div id="home-calc-embed">
              <!-- Rendered via CalculatorEngine -->
              <div class="grid gap-8 lg:grid-cols-2 items-center">
                <div class="space-y-6 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm">
                  <div class="flex justify-between items-center">
                    <h3 class="text-lg font-bold text-[#0a192f] font-heading">Quick SIP Projection</h3>
                    <span class="text-xs font-mono font-bold text-[#059669] bg-emerald-50 px-2.5 py-1 rounded-full">Interactive</span>
                  </div>

                  <div>
                    <div class="flex justify-between text-xs font-semibold mb-2 text-slate-700">
                      <span>Monthly Investment</span>
                      <span class="font-mono text-[#059669] font-bold" id="home-sip-m-lbl">₹20,000</span>
                    </div>
                    <input type="range" id="home-sip-m" min="1000" max="150000" step="1000" value="20000" class="w-full accent-[#059669] cursor-pointer">
                  </div>

                  <div>
                    <div class="flex justify-between text-xs font-semibold mb-2 text-slate-700">
                      <span>Time Horizon</span>
                      <span class="font-mono text-[#059669] font-bold" id="home-sip-y-lbl">12 Years</span>
                    </div>
                    <input type="range" id="home-sip-y" min="1" max="30" step="1" value="12" class="w-full accent-[#059669] cursor-pointer">
                  </div>

                  <div>
                    <div class="flex justify-between text-xs font-semibold mb-2 text-slate-700">
                      <span>Expected Return</span>
                      <span class="font-mono text-[#059669] font-bold" id="home-sip-r-lbl">13% p.a.</span>
                    </div>
                    <input type="range" id="home-sip-r" min="5" max="22" step="0.5" value="13" class="w-full accent-[#059669] cursor-pointer">
                  </div>
                </div>

                <div class="rounded-2xl bg-[#0a192f] p-7 text-white space-y-4">
                  <p class="text-xs uppercase tracking-widest text-emerald-300 font-mono">Illustrative Compounding Result</p>
                  <div>
                    <p class="text-xs text-slate-400">Total Capital Invested</p>
                    <p class="text-xl font-bold font-mono text-white mt-0.5" id="home-sip-inv-val">₹28,80,000</p>
                  </div>
                  <div>
                    <p class="text-xs text-slate-400">Estimated Wealth Gain</p>
                    <p class="text-xl font-bold font-mono text-[#86efac] mt-0.5" id="home-sip-gain-val">+ ₹42,75,419</p>
                  </div>
                  <div class="pt-4 border-t border-white/10">
                    <p class="text-xs uppercase tracking-wider text-emerald-200">Total Expected Corpus</p>
                    <p class="text-3xl font-extrabold font-mono text-white mt-1" id="home-sip-mat-val">₹71,55,419</p>
                  </div>
                  <div class="pt-4 flex gap-3">
                    <button type="button" class="btn-consultation flex-1 text-center rounded-xl bg-[#059669] py-3 text-xs font-bold uppercase tracking-wider text-white hover:bg-emerald-600 transition-colors cursor-pointer" data-interest="SIP & Mutual Fund Portfolio">
                      Review My Portfolio
                    </button>
                    <a href="#/calculators" data-nav-to="/calculators" class="text-center rounded-xl border border-white/20 px-4 py-3 text-xs font-bold uppercase tracking-wider text-white hover:bg-white/10 transition-colors">
                      All Calculators
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 10. FINAL HOMEPAGE CTA -->
      <section class="py-20 sm:py-24 bg-gradient-to-br from-[#0a192f] to-[#071526] text-white relative overflow-hidden" data-testid="home-final-cta-section">
        <div class="pointer-events-none absolute right-12 top-12 size-72 rounded-full border border-emerald-500/10"></div>
        <div class="mx-auto max-w-[1320px] px-5 sm:px-8 lg:px-12 text-center relative z-10">
          <p class="text-[0.68rem] font-bold uppercase tracking-[0.2em] text-[#86efac]">Start Your Journey</p>
          <h2 class="mt-4 font-heading text-3xl font-extrabold sm:text-5xl tracking-tight text-white max-w-3xl mx-auto leading-tight">
            Start Your Wealth Journey with Research-Backed Guidance
          </h2>
          <p class="mt-5 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Whether you want to construct a disciplined equity portfolio, access PMS & AIF opportunities, or protect your business wealth, our professional desk is ready to advise.
          </p>

          <div class="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button type="button" class="btn-consultation inline-flex items-center justify-center gap-2 h-13 rounded-2xl bg-[#059669] px-8 text-sm font-bold text-white shadow-xl hover:bg-emerald-600 transition-all cursor-pointer" data-interest="Full Wealth Consultation">
              ${renderIcon('message-circle', 'size-4')}
              <span>Book a Consultation</span>
            </button>
            <a href="${SITE_CONFIG.whatsappUrl}" target="_blank" rel="noreferrer" class="inline-flex items-center justify-center gap-2 h-13 rounded-2xl border border-white/20 bg-white/5 px-8 text-sm font-bold text-white hover:bg-white/10 transition-all">
              <span>Discuss My Investments on WhatsApp</span>
              ${renderIcon('arrow-up-right', 'size-4')}
            </a>
          </div>

          <div class="mt-12 pt-8 border-t border-white/10 text-xs text-slate-400 font-mono max-w-3xl mx-auto leading-relaxed">
            B-807, The Gateway, Nikol, Ahmedabad, Gujarat – 380049 · Contact: +91 98533 37222 · chartered.social@gmail.com
          </div>
        </div>
      </section>
    </div>
  `;

  // Attach quick home SIP listeners
  const hm = document.getElementById('home-sip-m');
  const hy = document.getElementById('home-sip-y');
  const hr = document.getElementById('home-sip-r');
  const updateHomeSIP = () => {
    if (!hm || !hy || !hr) return;
    const m = Number(hm.value);
    const y = Number(hy.value);
    const r = Number(hr.value);

    document.getElementById('home-sip-m-lbl').textContent = CalculatorEngine.formatCurrency(m);
    document.getElementById('home-sip-y-lbl').textContent = `${y} Years`;
    document.getElementById('home-sip-r-lbl').textContent = `${r}% p.a.`;

    const res = CalculatorEngine.calcSIP(m, y, r);
    document.getElementById('home-sip-inv-val').textContent = CalculatorEngine.formatCurrency(res.invested);
    document.getElementById('home-sip-gain-val').textContent = `+ ${CalculatorEngine.formatCurrency(res.gain)}`;
    document.getElementById('home-sip-mat-val').textContent = CalculatorEngine.formatCurrency(res.maturity, true);
  };

  if (hm) hm.addEventListener('input', updateHomeSIP);
  if (hy) hy.addEventListener('input', updateHomeSIP);
  if (hr) hr.addEventListener('input', updateHomeSIP);
  updateHomeSIP();

  // Attach global consultation button click handlers
  bindConsultationButtons();
}

// --------------------------------------------------------------------------
// 2. ABOUT US VIEW
// --------------------------------------------------------------------------
function renderAboutPage() {
  appRoot.innerHTML = `
    <div data-testid="about-page">
      <!-- About Hero -->
      <section class="bg-[#0a192f] text-white py-16 sm:py-24">
        <div class="mx-auto max-w-[1320px] px-5 sm:px-8 lg:px-12">
          <p class="text-[0.68rem] font-bold uppercase tracking-[0.2em] text-[#86efac]">Corporate Profile & Inception</p>
          <h1 class="mt-4 font-heading text-4xl sm:text-6xl font-extrabold tracking-tight">
            About Chartered Integrated Services
          </h1>
          <p class="mt-6 text-base sm:text-xl text-slate-300 max-w-3xl leading-relaxed font-heading">
            Chartered Integrated Services Private Limited is a wealth management and investment services company focused on helping individuals, entrepreneurs, professionals, HNIs and families make informed financial decisions and build long-term wealth.
          </p>
        </div>
      </section>

      <!-- Core Corporate Narrative & Philosophy -->
      <section class="py-16 sm:py-24 bg-white border-b border-slate-200">
        <div class="mx-auto max-w-[1320px] px-5 sm:px-8 lg:px-12">
          <div class="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] items-start">
            <div class="space-y-6 text-slate-600 text-base leading-relaxed">
              <h2 class="text-2xl sm:text-3xl font-bold font-heading text-[#0a192f]">
                Built on Rigor, Discipline & Fiduciary Integrity
              </h2>
              <p>
                Established in 2017, the company brings together investment research, market access and a broad range of financial solutions under one professional platform.
              </p>
              <p>
                Our approach is based on understanding the client's objectives, risk profile, financial circumstances and investment horizon before identifying appropriate investment strategies and solutions.
              </p>
              <p>
                We believe successful wealth creation is not about chasing individual products or short-term market movements. It is about research, discipline, diversification, risk awareness and long-term thinking.
              </p>

              <div class="rounded-2xl bg-emerald-50 border border-emerald-200 p-6 text-slate-800">
                <p class="text-xs uppercase tracking-widest font-mono font-bold text-[#059669]">Our Central Philosophy</p>
                <p class="text-xl font-bold font-heading text-[#0a192f] mt-1">Research. Discipline. Diversification. Long-Term Thinking.</p>
                <p class="text-sm text-slate-600 mt-2">
                  Our objective is to become a trusted long-term financial partner for our clients — helping them invest, manage, protect and grow their wealth.
                </p>
              </div>
            </div>

            <!-- Credentials & Inception Card -->
            <div class="rounded-3xl border border-slate-200 bg-slate-50 p-8 space-y-6">
              <h3 class="text-lg font-bold text-[#0a192f] font-heading border-b border-slate-200 pb-4">Firm Overview</h3>
              <div class="space-y-3 font-mono text-xs">
                <div class="flex justify-between border-b border-slate-200/60 pb-2">
                  <span class="text-slate-500">Corporate Name</span>
                  <span class="text-[#0a192f] font-bold text-right">Chartered Integrated Services Pvt Ltd</span>
                </div>
                <div class="flex justify-between border-b border-slate-200/60 pb-2">
                  <span class="text-slate-500">Inception Year</span>
                  <span class="text-[#0a192f] font-bold">2017</span>
                </div>
                <div class="flex justify-between border-b border-slate-200/60 pb-2">
                  <span class="text-slate-500">Headquarters</span>
                  <span class="text-[#0a192f] font-bold">Ahmedabad, Gujarat</span>
                </div>
                <div class="flex justify-between border-b border-slate-200/60 pb-2">
                  <span class="text-slate-500">Primary Core Focus</span>
                  <span class="text-[#059669] font-bold">Research Driven Wealth Creation</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-slate-500">Registered Office</span>
                  <span class="text-slate-700 text-right max-w-[200px]">B-807, The Gateway, Nikol, Ahmedabad – 380049</span>
                </div>
              </div>

              <div class="pt-2">
                <button type="button" class="btn-consultation w-full rounded-xl bg-[#0a192f] py-3 text-xs font-bold uppercase tracking-wider text-white hover:bg-[#059669] transition-colors cursor-pointer" data-interest="Firm Introduction & Consultation">
                  Schedule an In-Person Consultation
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Leadership Profile (CA Haresh Bhatreja) -->
      <section class="py-16 sm:py-24 bg-[#f8fafc]" data-testid="leadership-section">
        <div class="mx-auto max-w-[1320px] px-5 sm:px-8 lg:px-12">
          <div class="rounded-3xl border border-slate-200 bg-white p-8 sm:p-14 shadow-lg">
            <div class="grid items-start gap-12 lg:grid-cols-[0.8fr_1.2fr]">
              <!-- Profile Head -->
              <div class="space-y-4 border-b lg:border-b-0 lg:border-r border-slate-200 pb-8 lg:pb-0 lg:pr-10">
                <div class="size-24 rounded-3xl bg-gradient-to-br from-[#0a192f] to-[#059669] grid place-items-center text-white text-3xl font-extrabold font-heading shadow-md">
                  HB
                </div>
                <div>
                  <h2 class="text-2xl sm:text-3xl font-bold text-[#0a192f] font-heading">${LEADERSHIP_DATA.name}</h2>
                  <p class="text-sm font-semibold text-[#059669] mt-1">${LEADERSHIP_DATA.role}</p>
                </div>
                <div class="rounded-xl bg-slate-50 p-3.5 border border-slate-200/80">
                  <p class="text-[0.66rem] font-bold uppercase tracking-wider text-[#d97706] font-mono">Professional Credentials</p>
                  <p class="text-xs font-bold text-slate-800 font-mono mt-1">${LEADERSHIP_DATA.credentials}</p>
                </div>
                <p class="text-xs text-slate-500 font-mono">
                  Ahmedabad, Gujarat · Wealth Management Leadership
                </p>
              </div>

              <!-- Biography & Expertise -->
              <div class="space-y-6">
                <div>
                  <p class="text-[0.68rem] font-bold uppercase tracking-[0.18em] text-[#059669]">Leadership Profile</p>
                  <h3 class="text-xl sm:text-2xl font-bold text-[#0a192f] font-heading mt-1">
                    Establishing Fiduciary Excellence & Research Rigor
                  </h3>
                </div>

                <p class="text-sm sm:text-base text-slate-600 leading-relaxed">
                  ${LEADERSHIP_DATA.bio}
                </p>

                <div>
                  <p class="text-xs uppercase tracking-widest font-bold text-[#0a192f] mb-3">Core Areas of Professional Expertise:</p>
                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    ${LEADERSHIP_DATA.expertiseAreas.map(exp => `
                      <div class="flex items-center gap-2.5 text-xs text-slate-700 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                        ${renderIcon('check', 'size-3.5 text-[#059669] shrink-0')}
                        <span>${exp}</span>
                      </div>
                    `).join('')}
                  </div>
                </div>

                <div class="rounded-2xl bg-amber-500/10 border border-amber-500/20 p-5">
                  <blockquote class="text-xs sm:text-sm text-slate-700 italic leading-relaxed">
                    "${LEADERSHIP_DATA.quote}"
                  </blockquote>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  `;

  bindConsultationButtons();
}

// --------------------------------------------------------------------------
// 3. INVESTMENT SOLUTIONS CATALOG VIEW
// --------------------------------------------------------------------------
function renderSolutionsPage() {
  const cardsHtml = SOLUTIONS_DATA.map((sol, index) => `
    <div class="group flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-emerald-300 hover:shadow-xl" data-testid="solution-item-${sol.id}">
      <div>
        <div class="flex items-start justify-between">
          <span class="grid size-12 place-items-center rounded-2xl bg-emerald-50 text-[#059669] transition-colors group-hover:bg-[#059669] group-hover:text-white">
            ${renderIcon(sol.icon, 'size-6')}
          </span>
          <span class="font-mono text-xs font-bold text-slate-300">0${index + 1}</span>
        </div>

        <p class="mt-6 text-[0.68rem] font-bold uppercase tracking-[0.16em] text-[#d97706]">${sol.category}</p>
        <h2 class="mt-2 text-2xl font-bold text-[#0a192f] font-heading group-hover:text-[#059669] transition-colors">
          <a href="#/solutions/${sol.id}" data-nav-to="/solutions/${sol.id}">${sol.name}</a>
        </h2>
        <p class="mt-3 text-sm leading-relaxed text-slate-600">${sol.summary}</p>

        <div class="mt-6 space-y-2">
          ${sol.pillars.slice(0, 2).map(p => `
            <div class="flex items-start gap-2 text-xs text-slate-600">
              ${renderIcon('check', 'size-3.5 text-[#059669] mt-0.5 shrink-0')}
              <span><strong>${p.title}:</strong> ${p.desc}</span>
            </div>
          `).join('')}
        </div>
      </div>

      <div class="mt-8 pt-5 border-t border-slate-100 flex items-center justify-between">
        <a href="#/solutions/${sol.id}" data-nav-to="/solutions/${sol.id}" class="text-xs font-bold uppercase tracking-wider text-[#0a192f] hover:text-[#059669] inline-flex items-center gap-1.5">
          <span>Read Full Architecture</span>
          ${renderIcon('arrow-right', 'size-3.5')}
        </a>
        <button type="button" class="btn-consultation rounded-xl bg-slate-100 px-3 py-2 text-xs font-bold text-slate-700 hover:bg-[#059669] hover:text-white transition-colors cursor-pointer" data-interest="${sol.name}">
          Enquire
        </button>
      </div>
    </div>
  `).join('');

  appRoot.innerHTML = `
    <div data-testid="solutions-page">
      <section class="bg-[#0a192f] text-white py-16 sm:py-24">
        <div class="mx-auto max-w-[1320px] px-5 sm:px-8 lg:px-12">
          <p class="text-[0.68rem] font-bold uppercase tracking-[0.2em] text-[#86efac]">Multi-Asset Platform</p>
          <h1 class="mt-4 font-heading text-4xl sm:text-6xl font-extrabold tracking-tight">
            Investment Solutions
          </h1>
          <p class="mt-6 text-base sm:text-xl text-slate-300 max-w-3xl leading-relaxed font-heading">
            Comprehensive, research-backed financial solutions across Indian equities, mutual funds, PMS, AIF, fixed income, global markets, and wealth protection.
          </p>
        </div>
      </section>

      <section class="py-16 sm:py-24 bg-[#f8fafc]">
        <div class="mx-auto max-w-[1320px] px-5 sm:px-8 lg:px-12">
          <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            ${cardsHtml}
          </div>
        </div>
      </section>
    </div>
  `;

  bindConsultationButtons();
}

// --------------------------------------------------------------------------
// 4. SOLUTION DETAIL VIEW
// --------------------------------------------------------------------------
function renderSolutionDetailPage(params) {
  const solutionId = params.solutionId || 'indian-equities';
  const sol = SOLUTIONS_DATA.find(s => s.id === solutionId) || SOLUTIONS_DATA[0];

  const pillarsHtml = sol.pillars.map((p, i) => `
    <div class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div class="flex items-center gap-3">
        <span class="font-mono text-xs font-bold text-[#059669] bg-emerald-50 size-7 grid place-items-center rounded-lg">0${i + 1}</span>
        <h3 class="text-lg font-bold text-[#0a192f] font-heading">${p.title}</h3>
      </div>
      <p class="mt-3 text-sm leading-relaxed text-slate-600">${p.desc}</p>
    </div>
  `).join('');

  appRoot.innerHTML = `
    <div data-testid="solution-detail-${sol.id}">
      <!-- Solution Hero -->
      <section class="bg-[#0a192f] text-white py-16 sm:py-24 relative overflow-hidden">
        <div class="pointer-events-none absolute right-0 top-0 size-96 rounded-full border border-white/5"></div>
        <div class="mx-auto max-w-[1320px] px-5 sm:px-8 lg:px-12 relative z-10">
          <a href="#/solutions" data-nav-to="/solutions" class="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400 hover:text-white transition-colors mb-6">
            ${renderIcon('arrow-left', 'size-3.5')}
            <span>Back to All Solutions</span>
          </a>

          <p class="text-[0.68rem] font-bold uppercase tracking-[0.2em] text-[#86efac]">${sol.category}</p>
          <h1 class="mt-3 font-heading text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight">
            ${sol.name}
          </h1>
          <p class="mt-6 text-base sm:text-xl text-slate-300 max-w-3xl leading-relaxed">
            ${sol.heroText}
          </p>

          <div class="mt-9 flex flex-wrap gap-4">
            <button type="button" class="btn-consultation inline-flex items-center gap-2 rounded-xl bg-[#059669] px-7 py-3.5 text-xs font-bold uppercase tracking-wider text-white hover:bg-emerald-600 transition-colors cursor-pointer" data-interest="${sol.name}">
              ${renderIcon('message-circle', 'size-4')}
              <span>Consult on ${sol.shortName}</span>
            </button>
            <a href="${SITE_CONFIG.whatsappUrl}&text=Hello,%20I%20would%20like%20to%20know%20more%20about%20your%20${encodeURIComponent(sol.name)}%20solutions." target="_blank" rel="noreferrer" class="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-white hover:bg-white/10 transition-colors">
              <span>Quick WhatsApp Enquiry</span>
              ${renderIcon('arrow-up-right', 'size-4')}
            </a>
          </div>
        </div>
      </section>

      <!-- Solution Architecture & Pillars -->
      <section class="py-16 sm:py-24 bg-white border-b border-slate-200">
        <div class="mx-auto max-w-[1320px] px-5 sm:px-8 lg:px-12">
          <div class="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] items-start">
            <div>
              <p class="text-[0.68rem] font-bold uppercase tracking-[0.18em] text-[#d97706]">${sol.eyebrow}</p>
              <h2 class="mt-2 text-3xl sm:text-4xl font-extrabold text-[#0a192f] font-heading">
                ${sol.headline}
              </h2>
              <div class="mt-8 grid gap-4 sm:grid-cols-2">
                ${pillarsHtml}
              </div>
            </div>

            <!-- Suitability & Fiduciary Box -->
            <div class="space-y-6">
              <div class="rounded-3xl border border-slate-200 bg-slate-50 p-8">
                <h3 class="text-lg font-bold text-[#0a192f] font-heading border-b border-slate-200 pb-3">Investor Suitability & Fit</h3>
                <p class="mt-4 text-sm leading-relaxed text-slate-700">
                  ${sol.suitability}
                </p>

                <div class="mt-6 pt-5 border-t border-slate-200">
                  <p class="text-xs uppercase tracking-widest font-mono font-bold text-slate-500 mb-2">Key Highlights:</p>
                  <ul class="space-y-2 text-xs text-slate-700">
                    ${sol.highlights.map(h => `<li class="flex items-center gap-2">${renderIcon('check', 'size-3.5 text-[#059669]')} ${h}</li>`).join('')}
                  </ul>
                </div>
              </div>

              <!-- Mandatory Disclosure -->
              <div class="rounded-2xl border border-amber-200 bg-amber-50/70 p-6 text-xs text-slate-600 leading-relaxed">
                <div class="flex items-center gap-2 font-bold text-[#d97706] mb-1">
                  ${renderIcon('info', 'size-4')}
                  <span>Regulatory & Risk Notice</span>
                </div>
                ${sol.disclaimer}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  `;

  bindConsultationButtons();
}

// --------------------------------------------------------------------------
// 5. FOR ENTREPRENEURS & BUSINESS OWNERS VIEW
// --------------------------------------------------------------------------
function renderEntrepreneursPage() {
  appRoot.innerHTML = `
    <div data-testid="entrepreneurs-page">
      <section class="bg-[#0a192f] text-white py-16 sm:py-24">
        <div class="mx-auto max-w-[1320px] px-5 sm:px-8 lg:px-12">
          <p class="text-[0.68rem] font-bold uppercase tracking-[0.2em] text-[#86efac]">Promoter & Founder Advisory</p>
          <h1 class="mt-4 font-heading text-4xl sm:text-6xl font-extrabold tracking-tight">
            For Entrepreneurs & Business Owners
          </h1>
          <p class="mt-6 text-base sm:text-xl text-slate-300 max-w-3xl leading-relaxed font-heading">
            Building a successful business and building personal wealth are two different journeys. We help entrepreneurs look beyond their business and build a structured approach to managing and growing personal wealth.
          </p>
        </div>
      </section>

      <section class="py-16 sm:py-24 bg-white border-b border-slate-200">
        <div class="mx-auto max-w-[1320px] px-5 sm:px-8 lg:px-12">
          <div class="text-center max-w-3xl mx-auto">
            <h2 class="text-3xl sm:text-4xl font-extrabold text-[#0a192f] font-heading">
              Structuring Personal Liquidity Independent of Business Cycles
            </h2>
            <p class="mt-4 text-base text-slate-600 leading-relaxed">
              Business risk should not compromise family security. We establish a diversified wealth architecture that compounds outside your company’s balance sheet.
            </p>
          </div>

          <div class="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div class="rounded-3xl border border-slate-200 bg-slate-50 p-6 space-y-3">
              <span class="grid size-11 place-items-center rounded-2xl bg-[#0a192f] text-amber-400">
                ${renderIcon('briefcase-business', 'size-5')}
              </span>
              <h3 class="text-lg font-bold text-[#0a192f] font-heading">Personal Wealth Planning</h3>
              <p class="text-xs text-slate-600 leading-relaxed">Creating systematic personal investment streams separate from company reinvestment cycles.</p>
            </div>

            <div class="rounded-3xl border border-slate-200 bg-slate-50 p-6 space-y-3">
              <span class="grid size-11 place-items-center rounded-2xl bg-[#0a192f] text-emerald-400">
                ${renderIcon('coins', 'size-5')}
              </span>
              <h3 class="text-lg font-bold text-[#0a192f] font-heading">Surplus Cash Deployment</h3>
              <p class="text-xs text-slate-600 leading-relaxed">Parking business operating reserves and treasury cash into secure, yield-bearing debt instruments.</p>
            </div>

            <div class="rounded-3xl border border-slate-200 bg-slate-50 p-6 space-y-3">
              <span class="grid size-11 place-items-center rounded-2xl bg-[#0a192f] text-sky-400">
                ${renderIcon('globe', 'size-5')}
              </span>
              <h3 class="text-lg font-bold text-[#0a192f] font-heading">Investment Diversification</h3>
              <p class="text-xs text-slate-600 leading-relaxed">Allocating to equities, PMS, AIFs, and global assets to reduce single-business concentration risk.</p>
            </div>

            <div class="rounded-3xl border border-slate-200 bg-slate-50 p-6 space-y-3">
              <span class="grid size-11 place-items-center rounded-2xl bg-[#0a192f] text-rose-400">
                ${renderIcon('shield-check', 'size-5')}
              </span>
              <h3 class="text-lg font-bold text-[#0a192f] font-heading">Risk & Key-Person Shield</h3>
              <p class="text-xs text-slate-600 leading-relaxed">Protecting promoter personal guarantees and structuring key-man and partner insurances.</p>
            </div>
          </div>

          <div class="mt-14 text-center">
            <button type="button" class="btn-consultation inline-flex items-center gap-2 rounded-2xl bg-[#059669] px-8 py-4 text-sm font-bold text-white shadow-xl hover:bg-emerald-600 transition-all cursor-pointer" data-interest="Entrepreneur Wealth Blueprint" data-category="Entrepreneur">
              ${renderIcon('message-circle', 'size-4')}
              <span>Talk to an Investment Professional for Business Owners</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  `;

  bindConsultationButtons();
}

// --------------------------------------------------------------------------
// 6. RESEARCH & INSIGHTS EDITORIAL VIEW
// --------------------------------------------------------------------------
function renderResearchPage() {
  const articlesHtml = RESEARCH_ARTICLES.map(art => `
    <article class="flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-7 shadow-sm hover:shadow-md hover:border-emerald-300 transition-all">
      <div>
        <div class="flex items-center justify-between text-xs text-slate-400 font-mono mb-3">
          <span class="text-[0.68rem] font-bold uppercase tracking-wider text-[#059669] bg-emerald-50 px-2 py-0.5 rounded">${art.category}</span>
          <span>${art.readTime}</span>
        </div>
        <h2 class="text-xl font-bold text-[#0a192f] font-heading leading-snug">${art.title}</h2>
        <p class="mt-3 text-sm leading-relaxed text-slate-600">${art.summary}</p>
      </div>

      <div class="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
        <div class="flex gap-1.5">
          ${art.tags.map(t => `<span class="rounded bg-slate-100 px-2 py-0.5 text-[0.65rem] font-semibold text-slate-500 font-mono">#${t}</span>`).join('')}
        </div>
        <span class="text-xs font-mono text-slate-400">${art.date}</span>
      </div>
    </article>
  `).join('');

  appRoot.innerHTML = `
    <div data-testid="research-page">
      <section class="bg-[#0a192f] text-white py-16 sm:py-24">
        <div class="mx-auto max-w-[1320px] px-5 sm:px-8 lg:px-12">
          <p class="text-[0.68rem] font-bold uppercase tracking-[0.2em] text-[#86efac]">Editorial Research Platform</p>
          <h1 class="mt-4 font-heading text-4xl sm:text-6xl font-extrabold tracking-tight">
            Research & Insights
          </h1>
          <p class="mt-6 text-base sm:text-xl text-slate-300 max-w-3xl leading-relaxed font-heading">
            Institutional investment perspectives, fundamental equity analysis, asset allocation frameworks, and macro market outlooks.
          </p>
        </div>
      </section>

      <!-- Research Categories -->
      <section class="py-12 bg-white border-b border-slate-200">
        <div class="mx-auto max-w-[1320px] px-5 sm:px-8 lg:px-12">
          <div class="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-4">
            ${RESEARCH_CATEGORIES.map(rc => `
              <div class="rounded-2xl border border-slate-200 p-4 hover:border-emerald-300 transition-colors bg-slate-50/50">
                <span class="text-[#059669]">${renderIcon(rc.icon, 'size-5')}</span>
                <h3 class="text-sm font-bold text-[#0a192f] font-heading mt-2">${rc.label}</h3>
                <p class="text-xs text-slate-500 mt-1 leading-snug">${rc.desc}</p>
              </div>
            `).join('')}
          </div>
        </div>
      </section>

      <!-- Articles Grid -->
      <section class="py-16 sm:py-24 bg-[#f8fafc]">
        <div class="mx-auto max-w-[1320px] px-5 sm:px-8 lg:px-12">
          <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            ${articlesHtml}
          </div>
        </div>
      </section>
    </div>
  `;
}

// --------------------------------------------------------------------------
// 7. MARKET UPDATES DESK VIEW
// --------------------------------------------------------------------------
function renderMarketUpdatesPage() {
  appRoot.innerHTML = `
    <div data-testid="market-updates-page">
      <section class="bg-[#0a192f] text-white py-16 sm:py-24">
        <div class="mx-auto max-w-[1320px] px-5 sm:px-8 lg:px-12">
          <p class="text-[0.68rem] font-bold uppercase tracking-[0.2em] text-[#86efac]">Capital Markets Signals</p>
          <h1 class="mt-4 font-heading text-4xl sm:text-6xl font-extrabold tracking-tight">
            Market Updates Desk
          </h1>
          <p class="mt-6 text-base sm:text-xl text-slate-300 max-w-3xl leading-relaxed font-heading">
            Organised capital market updates covering Indian benchmarks, global indices, commodities, currencies, and institutional flows.
          </p>
        </div>
      </section>

      <section class="py-16 sm:py-24 bg-[#f8fafc]">
        <div class="mx-auto max-w-[1320px] px-5 sm:px-8 lg:px-12 space-y-12">
          <!-- Live Notice -->
          <div class="rounded-2xl border border-slate-200 bg-white p-6 flex items-start gap-4 shadow-sm">
            <span class="text-[#059669] mt-0.5">${renderIcon('info', 'size-5')}</span>
            <div class="text-xs text-slate-600 leading-relaxed">
              <strong class="text-[#0a192f]">${MARKET_DESK_DATA.lastUpdated}:</strong> ${MARKET_DESK_DATA.notice} For real-time updates and portfolio impacts, contact our desk.
            </div>
          </div>

          <!-- Indices Grid -->
          <div class="grid gap-8 lg:grid-cols-2">
            <!-- Indian Indices -->
            <div class="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
              <h3 class="text-xl font-bold text-[#0a192f] font-heading border-b border-slate-100 pb-4">Indian Market Benchmarks</h3>
              <div class="divide-y divide-slate-100 mt-4 font-mono text-sm">
                ${MARKET_DESK_DATA.indianIndices.map(idx => `
                  <div class="py-3 flex justify-between items-center">
                    <div>
                      <p class="font-bold text-[#0a192f]">${idx.name}</p>
                      <p class="text-xs text-slate-400 font-sans">${idx.focus}</p>
                    </div>
                    <span class="text-xs bg-slate-100 px-2.5 py-1 rounded text-slate-600">${idx.tag}</span>
                  </div>
                `).join('')}
              </div>
            </div>

            <!-- Global Indices -->
            <div class="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
              <h3 class="text-xl font-bold text-[#0a192f] font-heading border-b border-slate-100 pb-4">Global Market Watch</h3>
              <div class="divide-y divide-slate-100 mt-4 font-mono text-sm">
                ${MARKET_DESK_DATA.globalIndices.map(idx => `
                  <div class="py-3 flex justify-between items-center">
                    <div>
                      <p class="font-bold text-[#0a192f]">${idx.name}</p>
                      <p class="text-xs text-slate-400 font-sans">${idx.focus}</p>
                    </div>
                    <span class="text-xs bg-slate-100 px-2.5 py-1 rounded text-slate-600">${idx.tag}</span>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>

          <!-- Commodities & Currencies -->
          <div class="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
            <h3 class="text-xl font-bold text-[#0a192f] font-heading border-b border-slate-100 pb-4">Commodities, Currencies & Sovereign Yields</h3>
            <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
              ${MARKET_DESK_DATA.commoditiesCurrencies.map(c => `
                <div class="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                  <p class="text-xs font-mono text-[#059669] font-bold">${c.metric}</p>
                  <p class="text-base font-bold text-[#0a192f] mt-1">${c.asset}</p>
                  <p class="text-xs text-slate-500 mt-1">${c.role}</p>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      </section>
    </div>
  `;
}

// --------------------------------------------------------------------------
// 8. CALCULATORS HUB VIEW
// --------------------------------------------------------------------------
function renderCalculatorsPage() {
  appRoot.innerHTML = `
    <div data-testid="calculators-page">
      <section class="bg-[#0a192f] text-white py-16 sm:py-24">
        <div class="mx-auto max-w-[1320px] px-5 sm:px-8 lg:px-12">
          <p class="text-[0.68rem] font-bold uppercase tracking-[0.2em] text-[#86efac]">Investor Calculators & Tools</p>
          <h1 class="mt-4 font-heading text-4xl sm:text-6xl font-extrabold tracking-tight">
            Financial Calculators
          </h1>
          <p class="mt-6 text-base sm:text-xl text-slate-300 max-w-3xl leading-relaxed font-heading">
            Accurate, interactive modeling tools to calculate compounding, annualized CAGR/XIRR returns, retirement requirements, inflation impact, and loan EMIs.
          </p>
        </div>
      </section>

      <section class="py-12 sm:py-20 bg-[#f8fafc]">
        <div class="mx-auto max-w-[1320px] px-5 sm:px-8 lg:px-12">
          <div id="calc-container" class="space-y-8">
            ${CalculatorsUI.renderTabs()}
            <div class="mt-8">
              ${CalculatorsUI.renderActiveCalculator()}
            </div>
          </div>
        </div>
      </section>
    </div>
  `;

  CalculatorsUI.bindEvents();
  bindConsultationButtons();
}

// --------------------------------------------------------------------------
// 9. CONTACT VIEW
// --------------------------------------------------------------------------
function renderContactPage() {
  appRoot.innerHTML = `
    <div data-testid="contact-page">
      <section class="bg-[#0a192f] text-white py-16 sm:py-24">
        <div class="mx-auto max-w-[1320px] px-5 sm:px-8 lg:px-12">
          <p class="text-[0.68rem] font-bold uppercase tracking-[0.2em] text-[#86efac]">Connect With Our Desk</p>
          <h1 class="mt-4 font-heading text-4xl sm:text-6xl font-extrabold tracking-tight">
            Contact & Consultation
          </h1>
          <p class="mt-6 text-base sm:text-xl text-slate-300 max-w-3xl leading-relaxed font-heading">
            Schedule an in-person or virtual consultation with our portfolio management and wealth advisory desk in Ahmedabad.
          </p>
        </div>
      </section>

      <section class="py-16 sm:py-24 bg-[#f8fafc]">
        <div class="mx-auto max-w-[1320px] px-5 sm:px-8 lg:px-12">
          <div class="grid gap-12 lg:grid-cols-[1fr_1.1fr]">
            <!-- Contact Details Card -->
            <div class="space-y-6">
              <div class="rounded-3xl border border-slate-200 bg-white p-8 sm:p-10 shadow-sm space-y-7">
                <div>
                  <p class="text-[0.68rem] font-bold uppercase tracking-[0.18em] text-[#d97706]">Official Headquarters</p>
                  <h3 class="text-2xl font-bold text-[#0a192f] font-heading mt-1">Chartered Integrated Services Private Limited</h3>
                </div>

                <div class="space-y-5 text-sm text-slate-700">
                  <div class="flex items-start gap-3.5">
                    <span class="grid size-10 place-items-center rounded-xl bg-emerald-50 text-[#059669] shrink-0 mt-0.5">
                      ${renderIcon('map-pin', 'size-5')}
                    </span>
                    <div>
                      <p class="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">Office Address</p>
                      <p class="font-semibold text-[#0a192f] mt-1">${SITE_CONFIG.address}</p>
                    </div>
                  </div>

                  <div class="flex items-start gap-3.5">
                    <span class="grid size-10 place-items-center rounded-xl bg-emerald-50 text-[#059669] shrink-0 mt-0.5">
                      ${renderIcon('phone', 'size-5')}
                    </span>
                    <div>
                      <p class="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">Telephone</p>
                      <a href="${SITE_CONFIG.phoneUrl}" class="font-semibold text-[#0a192f] hover:text-[#059669] mt-1 block">${SITE_CONFIG.phone}</a>
                    </div>
                  </div>

                  <div class="flex items-start gap-3.5">
                    <span class="grid size-10 place-items-center rounded-xl bg-emerald-50 text-[#059669] shrink-0 mt-0.5">
                      ${renderIcon('mail', 'size-5')}
                    </span>
                    <div>
                      <p class="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">Email Address</p>
                      <a href="${SITE_CONFIG.emailUrl}" class="font-semibold text-[#0a192f] hover:text-[#059669] mt-1 block">${SITE_CONFIG.email}</a>
                    </div>
                  </div>
                </div>

                <div class="pt-4 border-t border-slate-100 flex flex-col sm:flex-row gap-3">
                  <a href="${SITE_CONFIG.whatsappUrl}" target="_blank" rel="noreferrer" class="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-[#25d366] px-5 py-3.5 text-xs font-bold uppercase tracking-wider text-[#062d16] hover:bg-emerald-500 hover:text-white transition-colors">
                    ${renderIcon('message-circle', 'size-4')}
                    <span>WhatsApp Direct Desk</span>
                  </a>
                  <a href="${SITE_CONFIG.googleMapsUrl}" target="_blank" rel="noreferrer" class="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 px-5 py-3.5 text-xs font-bold uppercase tracking-wider text-[#0a192f] hover:bg-slate-50 transition-colors">
                    <span>Google Maps</span>
                    ${renderIcon('arrow-up-right', 'size-4')}
                  </a>
                </div>
              </div>
            </div>

            <!-- Interactive Consultation Booking Form -->
            <div class="rounded-3xl border border-slate-200 bg-white p-8 sm:p-10 shadow-lg">
              <p class="text-[0.68rem] font-bold uppercase tracking-[0.18em] text-[#059669]">Schedule An Advisory Session</p>
              <h2 class="text-2xl sm:text-3xl font-bold text-[#0a192f] font-heading mt-1">Book a Confidential Consultation</h2>
              <p class="text-sm text-slate-600 mt-2">Submit your details and our team will get in touch within one business day.</p>

              <form id="contact-form" class="mt-8 space-y-5">
                <div class="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label class="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">Full Name *</label>
                    <input type="text" id="contact-name" required placeholder="Your Name" class="w-full rounded-xl border border-slate-300 p-3 text-sm focus:border-[#059669] focus:outline-none">
                  </div>
                  <div>
                    <label class="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">Phone / WhatsApp *</label>
                    <input type="tel" id="contact-phone" required placeholder="+91 98765 43210" class="w-full rounded-xl border border-slate-300 p-3 text-sm focus:border-[#059669] focus:outline-none">
                  </div>
                </div>

                <div class="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label class="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">Email Address *</label>
                    <input type="email" id="contact-email" required placeholder="name@example.com" class="w-full rounded-xl border border-slate-300 p-3 text-sm focus:border-[#059669] focus:outline-none">
                  </div>
                  <div>
                    <label class="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">Client Profile</label>
                    <select id="contact-category" class="w-full rounded-xl border border-slate-300 p-3 text-sm focus:border-[#059669] focus:outline-none bg-white">
                      <option value="Individual">Individual Investor</option>
                      <option value="Entrepreneur">Entrepreneur / Business Owner</option>
                      <option value="Professional">Corporate Professional / Doctor</option>
                      <option value="HNI">HNI / UHNI Client</option>
                      <option value="Family">Family Office</option>
                      <option value="Corporate">Corporate Treasury</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label class="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">Primary Area of Interest</label>
                  <select id="contact-interest" class="w-full rounded-xl border border-slate-300 p-3 text-sm focus:border-[#059669] focus:outline-none bg-white">
                    <option value="Indian Equities">Indian Equities & Security Research</option>
                    <option value="Mutual Funds">Goal-Based Mutual Funds & SIPs</option>
                    <option value="PMS">Portfolio Management Services (PMS)</option>
                    <option value="AIF">Alternative Investment Funds (AIF)</option>
                    <option value="Bonds">Bonds & Fixed Income Securities</option>
                    <option value="Global">Global Investments & US Equities</option>
                    <option value="Protection">Insurance & Wealth Protection</option>
                    <option value="Entrepreneur">Entrepreneur & Business Wealth Advisory</option>
                    <option value="Portfolio Review">Comprehensive Portfolio Health Check</option>
                  </select>
                </div>

                <div>
                  <label class="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">Message / Goals</label>
                  <textarea id="contact-message" rows="3" placeholder="Briefly describe your objectives or existing portfolio queries..." class="w-full rounded-xl border border-slate-300 p-3 text-sm focus:border-[#059669] focus:outline-none"></textarea>
                </div>

                <div id="contact-feedback" class="hidden p-4 rounded-xl text-xs font-semibold"></div>

                <button type="submit" class="w-full rounded-xl bg-[#0a192f] py-4 text-xs font-bold uppercase tracking-wider text-white hover:bg-[#059669] transition-colors cursor-pointer">
                  Submit Consultation Request
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  `;

  // Attach contact form validation and handler
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('contact-name').value.trim();
      const phone = document.getElementById('contact-phone').value.trim();
      const email = document.getElementById('contact-email').value.trim();
      const category = document.getElementById('contact-category').value;
      const interest = document.getElementById('contact-interest').value;
      const message = document.getElementById('contact-message').value.trim();

      const fb = document.getElementById('contact-feedback');
      if (fb) {
        fb.className = 'p-4 rounded-xl text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 block';
        fb.innerHTML = `
          <p class="font-bold text-sm">Thank you, ${name}!</p>
          <p class="mt-1">Your enquiry for <strong>${interest}</strong> has been received. Our advisory desk will reach you at ${phone} or ${email}.</p>
          <p class="mt-2 text-[0.7rem] text-emerald-600">You may also proceed to <a href="${SITE_CONFIG.whatsappUrl}&text=Hello,%20my%20name%20is%20${encodeURIComponent(name)}.%20I%20requested%20a%20consultation%20regarding%20${encodeURIComponent(interest)}." target="_blank" class="underline font-bold">connect immediately on WhatsApp</a>.</p>
        `;
        form.reset();
      }
    });
  }
}

// --------------------------------------------------------------------------
// Navigation and Global Handlers
// --------------------------------------------------------------------------
function initHeaderAndNav() {
  const desktopNav = document.getElementById('desktop-navigation');
  const mobileNavContainer = document.getElementById('mobile-navigation-links');
  const mobileToggle = document.getElementById('mobile-navigation-toggle-button');
  const mobilePanel = document.getElementById('mobile-navigation-panel');

  if (desktopNav) {
    desktopNav.innerHTML = NAV_ITEMS.map(item => {
      if (item.hasDropdown) {
        return `
          <div class="relative group/dropdown">
            <button type="button" class="relative inline-flex items-center gap-1 px-3 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-slate-600 hover:text-[#0a192f] transition-colors duration-200 cursor-pointer" data-testid="header-nav-solutions-trigger">
              <span>${item.label}</span>
              ${renderIcon('chevron-down', 'size-3 text-slate-400 group-hover/dropdown:rotate-180 transition-transform')}
            </button>

            <!-- Dropdown Menu -->
            <div class="absolute left-0 top-full pt-2 hidden group-hover/dropdown:block z-50 w-72 nav-dropdown-menu">
              <div class="rounded-2xl border border-slate-200 bg-white p-2.5 shadow-2xl space-y-1">
                ${item.children.map(child => `
                  <a href="#${child.to}" data-nav-to="${child.to}" class="block rounded-xl px-3 py-2 text-xs hover:bg-emerald-50 transition-colors">
                    <p class="font-bold text-[#0a192f]">${child.label}</p>
                    <p class="text-[0.66rem] text-slate-500">${child.desc}</p>
                  </a>
                `).join('')}
              </div>
            </div>
          </div>
        `;
      }
      return `
        <a href="#${item.to}" data-nav-to="${item.to}" data-nav-type="desktop" class="relative px-3 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.14em] transition-colors duration-200 hover:text-[#059669] text-slate-600" data-testid="header-nav-${item.label.toLowerCase().replaceAll(' ', '-')}-link">
          ${item.label}
        </a>
      `;
    }).join('');
  }

  if (mobileNavContainer) {
    mobileNavContainer.innerHTML = NAV_ITEMS.map(item => {
      if (item.hasDropdown) {
        return `
          <div class="border-b border-slate-100 pb-2">
            <a href="#${item.to}" data-nav-to="${item.to}" data-nav-type="mobile" class="rounded-xl px-4 py-3 text-sm font-bold text-[#0a192f]">
              ${item.label}
            </a>
            <div class="pl-4 space-y-1 mt-1">
              ${item.children.slice(0, 5).map(c => `
                <a href="#${c.to}" data-nav-to="${c.to}" class="block px-3 py-2 text-xs font-semibold text-slate-600 hover:text-[#059669]">
                  • ${c.label}
                </a>
              `).join('')}
              <a href="#/solutions" data-nav-to="/solutions" class="block px-3 py-1.5 text-xs font-bold text-[#059669]">
                View All Solutions →
              </a>
            </div>
          </div>
        `;
      }
      return `
        <a href="#${item.to}" data-nav-to="${item.to}" data-nav-type="mobile" class="rounded-xl px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50" data-testid="mobile-nav-${item.label.toLowerCase().replaceAll(' ', '-')}-link">
          ${item.label}
        </a>
      `;
    }).join('');
  }

  if (mobileToggle && mobilePanel) {
    mobileToggle.innerHTML = renderIcon('menu', 'size-5');
    mobileToggle.addEventListener('click', () => {
      const isHidden = mobilePanel.classList.toggle('hidden');
      if (isHidden) {
        mobileToggle.setAttribute('aria-label', 'Open navigation');
        mobileToggle.innerHTML = renderIcon('menu', 'size-5');
      } else {
        mobileToggle.setAttribute('aria-label', 'Close navigation');
        mobileToggle.innerHTML = renderIcon('x', 'size-5');
      }
    });
  }

  // Setup Consultation Modal listeners
  const closeBtn = document.getElementById('modal-close-btn');
  const modalOverlay = document.getElementById('modal-overlay');
  if (closeBtn) closeBtn.addEventListener('click', closeConsultationModal);
  if (modalOverlay) modalOverlay.addEventListener('click', closeConsultationModal);

  const modalForm = document.getElementById('consultation-modal-form');
  if (modalForm) {
    modalForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('modal-name').value.trim();
      const phone = document.getElementById('modal-phone').value.trim();
      const email = document.getElementById('modal-email').value.trim();
      const interest = document.getElementById('modal-interest').value;
      const feedback = document.getElementById('modal-feedback');

      if (feedback) {
        feedback.className = 'p-4 rounded-xl text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 block';
        feedback.innerHTML = `
          <p class="font-bold text-sm">Consultation Scheduled!</p>
          <p class="mt-1">Thank you ${name}. Our investment manager will contact you at ${phone} to discuss <strong>${interest}</strong>.</p>
        `;
        setTimeout(() => {
          modalForm.reset();
          closeConsultationModal();
        }, 3000);
      }
    });
  }
}

// Binds all buttons with `.btn-consultation` to open the modal
function bindConsultationButtons() {
  document.querySelectorAll('.btn-consultation').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const target = e.currentTarget;
      const interest = target.getAttribute('data-interest') || 'Comprehensive Wealth Consultation';
      const category = target.getAttribute('data-category') || 'Individual';
      openConsultationModal(interest, category);
    });
  });
}

// Router Route Definitions
Router.register('/', () => renderHomePage());
Router.register('/about', () => renderAboutPage());
Router.register('/solutions', () => renderSolutionsPage());
Router.register('/solutions/:solutionId', (params) => renderSolutionDetailPage(params));
Router.register('/services', () => renderSolutionsPage());
Router.register('/services/:solutionId', (params) => renderSolutionDetailPage(params));
Router.register('/entrepreneurs', () => renderEntrepreneursPage());
Router.register('/research', () => renderResearchPage());
Router.register('/market-updates', () => renderMarketUpdatesPage());
Router.register('/who-we-serve', () => renderHomePage());
Router.register('/calculators', () => renderCalculatorsPage());
Router.register('/contact', () => renderContactPage());

// Boot on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  initHeaderAndNav();
  Router.init();
});
