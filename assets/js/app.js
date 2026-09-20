// Main Application View Renderers and Controller for Chartered Integrated Services

const appRoot = document.getElementById('main-content');

// Helper to render single service card
function renderServiceCard(service, index) {
  const iconName = ACCENT_ICONS[service.accent] || 'chart-column';
  const highlightsHtml = service.highlights.slice(0, 2).map(h => 
    `<span class="rounded-full bg-slate-50 px-2.5 py-1 text-[0.66rem] font-semibold text-slate-500">${h}</span>`
  ).join('');

  return `
    <article class="group relative flex min-h-[315px] flex-col overflow-hidden rounded-[24px] border border-slate-200 bg-white p-7 shadow-[0_14px_50px_rgba(15,23,42,0.05)] transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-[0_24px_60px_rgba(15,23,42,0.1)]" data-testid="service-card-${service.id}">
      <div class="flex items-start justify-between gap-4">
        <span class="grid size-11 place-items-center rounded-2xl bg-[#f0fdf4] text-[#059669] transition-colors duration-300 group-hover:bg-[#059669] group-hover:text-white" data-testid="service-card-${service.id}-icon">
          ${renderIcon(iconName, 'size-5')}
        </span>
        <span class="font-mono text-[0.68rem] font-bold tracking-[0.18em] text-slate-300" data-testid="service-card-${service.id}-number">0${index + 1}</span>
      </div>
      <p class="mt-8 text-[0.68rem] font-bold uppercase tracking-[0.17em] text-[#d97706]" data-testid="service-card-${service.id}-category">${service.category}</p>
      <h3 class="mt-3 font-heading text-xl font-bold leading-tight text-[#0a192f]" data-testid="service-card-${service.id}-title">${service.name}</h3>
      <p class="mt-3 text-sm leading-6 text-slate-500" data-testid="service-card-${service.id}-summary">${service.summary}</p>
      <div class="mt-auto flex items-end justify-between gap-3 pt-6">
        <div class="flex flex-wrap gap-2" data-testid="service-card-${service.id}-highlights">
          ${highlightsHtml}
        </div>
        <a href="#${service.route}" data-nav-to="${service.route}" class="grid size-10 shrink-0 place-items-center rounded-full border border-slate-200 text-[#0a192f] transition-[background-color,color,transform] duration-200 group-hover:border-[#0a192f] group-hover:bg-[#0a192f] group-hover:text-white" aria-label="View ${service.name}" data-testid="service-card-${service.id}-link">
          ${renderIcon('arrow-right', 'size-4')}
        </a>
      </div>
    </article>
  `;
}

// 1. HOME VIEW
function renderHomePage() {
  const serviceCardsHtml = ACTIVE_SERVICES.slice(0, 6).map((s, i) => renderServiceCard(s, i)).join('');

  const proofCardsHtml = HOME_PROOFS.map(p => `
    <div class="bg-white px-4 py-8 sm:px-7" data-testid="home-proof-${p.value}">
      <p class="font-mono text-xs font-bold tracking-[0.17em] text-[#d97706]" data-testid="home-proof-${p.value}-value">${p.value}</p>
      <p class="mt-3 font-heading text-lg font-bold text-[#0a192f]" data-testid="home-proof-${p.value}-label">${p.label}</p>
      <p class="mt-2 text-sm leading-6 text-slate-500" data-testid="home-proof-${p.value}-copy">${p.copy}</p>
    </div>
  `).join('');

  const updatesCardsHtml = HOME_MARKET_UPDATES.map((u, i) => `
    <a href="#${u.link}" data-nav-to="${u.link}" class="group flex min-h-[245px] flex-col justify-between rounded-[22px] p-6 transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.2)] ${u.tone}" data-testid="home-update-card-${i + 1}">
      <div class="flex items-start justify-between">
        <span class="grid size-10 place-items-center rounded-xl bg-white/10 text-white">
          ${renderIcon(u.icon, 'size-4')}
        </span>
        ${renderIcon('arrow-up-right', 'size-4 text-white/60 transition-transform duration-200 group-hover:-translate-y-1 group-hover:translate-x-1')}
      </div>
      <div>
        <p class="text-[0.65rem] font-bold uppercase tracking-[0.15em] text-white/60" data-testid="home-update-card-${i + 1}-eyebrow">${u.eyebrow}</p>
        <h3 class="mt-2 font-heading text-2xl font-bold" data-testid="home-update-card-${i + 1}-title">${u.title}</h3>
        <p class="mt-3 text-sm leading-6 text-white/70" data-testid="home-update-card-${i + 1}-copy">${u.copy}</p>
      </div>
    </a>
  `).join('');

  const approachCardsHtml = HOME_APPROACH.map((a, i) => `
    <div class="rounded-[22px] border border-slate-200 bg-white p-6 shadow-[0_12px_40px_rgba(15,23,42,0.04)]" data-testid="home-approach-card-${i + 1}">
      <span class="grid size-10 place-items-center rounded-xl bg-[#0a192f] text-[#d97706]" data-testid="home-approach-card-${i + 1}-icon">
        ${renderIcon(a.icon, 'size-4')}
      </span>
      <h3 class="mt-6 font-heading text-lg font-bold text-[#0a192f]" data-testid="home-approach-card-${i + 1}-title">${a.title}</h3>
      <p class="mt-2 text-sm leading-6 text-slate-500" data-testid="home-approach-card-${i + 1}-copy">${a.copy}</p>
    </div>
  `).join('');

  appRoot.innerHTML = `
    <div data-testid="home-page">
      <!-- HERO -->
      <section class="relative overflow-hidden bg-[#f8fafc]" data-testid="home-hero-section">
        <div class="pointer-events-none absolute -right-28 top-16 hidden size-[540px] rounded-full border border-[#d97706]/15 lg:block"></div>
        <div class="pointer-events-none absolute -right-8 top-36 hidden size-[380px] rounded-full border border-[#059669]/15 lg:block"></div>
        <div class="pointer-events-none absolute left-[43%] top-16 hidden h-[360px] w-px rotate-[31deg] bg-slate-200 lg:block"></div>
        <div class="mx-auto grid min-h-[680px] max-w-[1320px] items-center gap-12 px-5 pb-16 pt-20 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:px-12 lg:pb-24 lg:pt-28">
          <div class="relative z-10 max-w-2xl">
            <div class="mb-7 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50/80 px-3 py-2 text-[0.66rem] font-bold uppercase tracking-[0.16em] text-[#059669]" data-testid="hero-eyebrow">
              <span class="size-1.5 rounded-full bg-[#059669] shadow-[0_0_0_5px_rgba(5,150,105,0.1)]"></span>
              ${SITE_CONFIG.addressShort}
            </div>
            <h1 class="max-w-[750px] font-heading text-5xl font-extrabold leading-[0.98] tracking-[-0.055em] text-[#0a192f] sm:text-6xl lg:text-[5.55rem]" data-testid="hero-title">
              Make the next move <span class="text-[#059669]">considered.</span>
            </h1>
            <p class="mt-8 max-w-xl text-base leading-8 text-slate-500 sm:text-lg" data-testid="hero-description">
              Chartered Integrated Services brings market access, wealth planning, compliance, and long-term family thinking into one connected conversation.
            </p>
            <div class="mt-9 flex flex-col gap-3 sm:flex-row" data-testid="hero-actions">
              <a href="${SITE_CONFIG.whatsappUrl}" target="_blank" rel="noreferrer" class="inline-flex items-center justify-center gap-2 h-12 rounded-xl bg-[#0a192f] px-5 text-white shadow-[0_8px_24px_rgba(10,25,47,0.16)] transition-colors duration-200 hover:bg-[#059669]" data-testid="hero-whatsapp-link">
                ${renderIcon('message-circle', 'size-4')}
                Start a conversation
                ${renderIcon('arrow-up-right', 'size-4')}
              </a>
              <a href="#/services" data-nav-to="/services" class="inline-flex items-center justify-center gap-2 h-12 rounded-xl border border-slate-300 bg-white px-5 text-[#0a192f] transition-colors duration-200 hover:border-[#059669] hover:bg-emerald-50" data-testid="hero-services-link">
                Explore services
                ${renderIcon('arrow-right', 'size-4')}
              </a>
            </div>
            <div class="mt-12 flex flex-wrap items-center gap-x-7 gap-y-3 text-xs font-semibold text-slate-500" data-testid="hero-trust-points">
              <span class="flex items-center gap-2">
                ${renderIcon('check', 'size-4 text-[#059669]')} Active AMFI registered support
              </span>
              <span class="flex items-center gap-2">
                ${renderIcon('check', 'size-4 text-[#059669]')} Local, responsive guidance
              </span>
            </div>
          </div>

          <!-- HERO VISUAL WIDGET -->
          <div class="relative mx-auto w-full max-w-[560px] lg:ml-auto" data-testid="hero-visual">
            <div class="relative aspect-[0.94] overflow-hidden rounded-[34px] bg-[#0a192f] p-6 shadow-[0_35px_80px_rgba(10,25,47,0.2)] sm:p-9">
              <div class="absolute -right-16 -top-16 size-64 rounded-full border border-[#d97706]/40"></div>
              <div class="absolute -bottom-24 -left-20 size-72 rounded-full border border-emerald-300/20"></div>
              <div class="relative z-10 flex h-full flex-col justify-between">
                <div class="flex items-start justify-between">
                  <div>
                    <p class="font-mono text-[0.63rem] uppercase tracking-[0.2em] text-emerald-200" data-testid="hero-visual-label">The integrated view</p>
                    <p class="mt-3 max-w-[220px] font-heading text-2xl font-semibold leading-tight text-white" data-testid="hero-visual-title">Your goals, seen from every angle.</p>
                  </div>
                  <span class="grid size-12 place-items-center rounded-2xl bg-white/10 text-[#d97706]" data-testid="hero-visual-icon">
                    ${renderIcon('sparkles', 'size-5')}
                  </span>
                </div>
                <div class="relative mx-auto my-8 grid size-52 place-items-center sm:size-64">
                  <div class="absolute inset-0 rounded-full border border-white/10"></div>
                  <div class="absolute inset-5 rounded-full border border-[#d97706]/50"></div>
                  <div class="absolute inset-12 rounded-full bg-gradient-to-br from-[#059669] to-[#0a192f] shadow-[0_0_70px_rgba(5,150,105,0.5)]"></div>
                  <div class="relative text-center">
                    <p class="font-mono text-[0.6rem] uppercase tracking-[0.18em] text-emerald-100" data-testid="hero-visual-center-label">Direction</p>
                    <p class="mt-2 font-heading text-2xl font-bold text-white" data-testid="hero-visual-center-value">with clarity</p>
                  </div>
                  <span class="absolute right-1 top-1 grid size-9 place-items-center rounded-full bg-[#d97706] text-white" data-testid="hero-visual-trend-icon">
                    ${renderIcon('trending-up', 'size-4')}
                  </span>
                  <span class="absolute bottom-4 left-0 grid size-9 place-items-center rounded-full bg-white/10 text-emerald-200" data-testid="hero-visual-shield-icon">
                    ${renderIcon('shield-check', 'size-4')}
                  </span>
                </div>
                <div class="grid grid-cols-3 gap-2 border-t border-white/10 pt-5" data-testid="hero-visual-stats">
                  <div>
                    <p class="font-mono text-lg font-bold text-white" data-testid="hero-stat-one-value">01</p>
                    <p class="mt-1 text-[0.6rem] uppercase tracking-[0.1em] text-slate-400" data-testid="hero-stat-one-label">clear view</p>
                  </div>
                  <div>
                    <p class="font-mono text-lg font-bold text-white" data-testid="hero-stat-two-value">08</p>
                    <p class="mt-1 text-[0.6rem] uppercase tracking-[0.1em] text-slate-400" data-testid="hero-stat-two-label">active paths</p>
                  </div>
                  <div>
                    <p class="font-mono text-lg font-bold text-white" data-testid="hero-stat-three-value">360°</p>
                    <p class="mt-1 text-[0.6rem] uppercase tracking-[0.1em] text-slate-400" data-testid="hero-stat-three-label">thinking</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="absolute -bottom-5 -left-4 flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-[0_14px_40px_rgba(15,23,42,0.1)] sm:-left-8" data-testid="hero-floating-note">
              <span class="grid size-9 place-items-center rounded-xl bg-emerald-50 text-[#059669]">
                ${renderIcon('circle-dollar-sign', 'size-4')}
              </span>
              <div>
                <p class="text-xs font-bold text-[#0a192f]" data-testid="hero-floating-title">Built around you</p>
                <p class="text-[0.65rem] text-slate-500" data-testid="hero-floating-copy">not a standard template</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- PROOF STRIP -->
      <section class="border-y border-slate-200 bg-white" data-testid="home-proof-section">
        <div class="mx-auto grid max-w-[1320px] gap-px bg-slate-200 px-5 sm:px-8 md:grid-cols-3 lg:px-12">
          ${proofCardsHtml}
        </div>
      </section>

      <!-- WHAT WE DO / SERVICES GRID -->
      <section class="mx-auto max-w-[1320px] px-5 py-20 sm:px-8 lg:px-12 lg:py-28" data-testid="home-services-section">
        <div class="flex flex-col justify-between gap-7 md:flex-row md:items-end">
          <div class="max-w-2xl">
            <p class="text-[0.68rem] font-bold uppercase tracking-[0.18em] text-[#059669]" data-testid="home-services-eyebrow">What we do</p>
            <h2 class="mt-4 font-heading text-4xl font-bold tracking-[-0.04em] text-[#0a192f] sm:text-5xl" data-testid="home-services-title">A sharper view of the opportunities ahead.</h2>
          </div>
          <a href="#/services" data-nav-to="/services" class="group inline-flex items-center gap-2 text-sm font-bold text-[#0a192f]" data-testid="home-services-view-all-link">
            View all services
            <span class="grid size-8 place-items-center rounded-full bg-emerald-50 text-[#059669] transition-transform duration-200 group-hover:translate-x-1">
              ${renderIcon('chevron-right', 'size-4')}
            </span>
          </a>
        </div>
        <div class="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3" data-testid="home-services-grid">
          ${serviceCardsHtml}
        </div>
      </section>

      <!-- DAILY DESK / MARKET UPDATES -->
      <section class="bg-[#0a192f] text-white" data-testid="home-updates-section">
        <div class="mx-auto max-w-[1320px] px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
          <div class="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div>
              <p class="text-[0.68rem] font-bold uppercase tracking-[0.18em] text-emerald-300" data-testid="home-updates-eyebrow">The daily desk</p>
              <h2 class="mt-4 font-heading text-4xl font-bold leading-[1.02] tracking-[-0.04em] sm:text-5xl" data-testid="home-updates-title">Keep an eye on what is moving.</h2>
              <p class="mt-6 max-w-md text-sm leading-7 text-slate-400" data-testid="home-updates-copy">Static preview cards for the market signals we follow closely. Reach out when you want the latest update.</p>
              <a href="#/market-updates" data-nav-to="/market-updates" class="mt-8 inline-flex items-center gap-2 text-sm font-bold text-white transition-colors duration-200 hover:text-emerald-300" data-testid="home-updates-view-link">
                See market updates
                ${renderIcon('arrow-right', 'size-4')}
              </a>
            </div>
            <div class="grid gap-4 md:grid-cols-3" data-testid="home-updates-grid">
              ${updatesCardsHtml}
            </div>
          </div>
        </div>
      </section>

      <!-- OUR APPROACH -->
      <section class="mx-auto max-w-[1320px] px-5 py-20 sm:px-8 lg:px-12 lg:py-28" data-testid="home-approach-section">
        <div class="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p class="text-[0.68rem] font-bold uppercase tracking-[0.18em] text-[#d97706]" data-testid="home-approach-eyebrow">Our approach</p>
            <h2 class="mt-4 max-w-md font-heading text-4xl font-bold leading-[1.05] tracking-[-0.04em] text-[#0a192f] sm:text-5xl" data-testid="home-approach-title">More context. Better questions. Clearer action.</h2>
            <a href="${SITE_CONFIG.emailUrl}" class="mt-8 inline-flex items-center gap-2 text-sm font-bold text-[#059669]" data-testid="home-approach-email-link">
              Email our desk
              ${renderIcon('arrow-up-right', 'size-4')}
            </a>
          </div>
          <div class="grid gap-5 sm:grid-cols-2" data-testid="home-approach-grid">
            ${approachCardsHtml}
          </div>
        </div>
      </section>

      <!-- HOME CTA -->
      <section class="mx-5 mb-20 overflow-hidden rounded-[30px] bg-[#e9f7f0] sm:mx-8 lg:mx-auto lg:mb-28 lg:max-w-[1232px]" data-testid="home-cta-section">
        <div class="relative grid gap-8 px-7 py-12 sm:px-12 lg:grid-cols-[1fr_auto] lg:items-center lg:px-16 lg:py-14">
          <div class="pointer-events-none absolute -right-16 -top-20 size-60 rounded-full border border-emerald-200"></div>
          <div class="relative">
            <p class="text-[0.68rem] font-bold uppercase tracking-[0.18em] text-[#059669]" data-testid="home-cta-eyebrow">Start with a conversation</p>
            <h2 class="mt-3 max-w-2xl font-heading text-3xl font-bold leading-tight tracking-[-0.03em] text-[#0a192f] sm:text-4xl" data-testid="home-cta-title">Your next move deserves a fuller picture.</h2>
            <p class="mt-3 max-w-xl text-sm leading-6 text-slate-600" data-testid="home-cta-copy">Tell us where you are today. We will help you see the possible paths from here.</p>
          </div>
          <a href="${SITE_CONFIG.whatsappUrl}" target="_blank" rel="noreferrer" class="relative inline-flex items-center justify-center gap-2 h-12 rounded-xl bg-[#059669] px-5 text-white transition-colors duration-200 hover:bg-[#0a192f]" data-testid="home-cta-whatsapp-link">
            ${renderIcon('message-circle', 'size-4')}
            Enquire on WhatsApp
            ${renderIcon('arrow-up-right', 'size-4')}
          </a>
        </div>
      </section>
    </div>
  `;
}

// 2. SERVICES CATALOG VIEW
function renderServicesPage() {
  const serviceCardsHtml = ACTIVE_SERVICES.map((s, i) => renderServiceCard(s, i)).join('');

  appRoot.innerHTML = `
    <div data-testid="services-page">
      <section class="bg-[#0a192f] text-white" data-testid="services-hero-section">
        <div class="mx-auto max-w-[1320px] px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
          <p class="text-[0.68rem] font-bold uppercase tracking-[0.18em] text-emerald-300" data-testid="services-hero-eyebrow">Our active services</p>
          <h1 class="mt-5 max-w-3xl font-heading text-5xl font-extrabold leading-[0.98] tracking-[-0.055em] sm:text-6xl" data-testid="services-hero-title">The right expertise for the decision in front of you.</h1>
          <p class="mt-7 max-w-2xl text-base leading-8 text-slate-400" data-testid="services-hero-copy">From first access to long-term planning, explore focused services built for the moments where clarity matters most.</p>
        </div>
      </section>

      <section class="mx-auto max-w-[1320px] px-5 py-16 sm:px-8 lg:px-12 lg:py-24" data-testid="services-list-section">
        <div class="flex items-end justify-between gap-6">
          <div>
            <p class="text-[0.68rem] font-bold uppercase tracking-[0.18em] text-[#d97706]" data-testid="services-list-eyebrow">Focused, not crowded</p>
            <h2 class="mt-3 font-heading text-3xl font-bold tracking-[-0.04em] text-[#0a192f] sm:text-4xl" data-testid="services-list-title">Active pathways to explore</h2>
          </div>
          <span class="hidden items-center gap-2 text-xs font-bold uppercase tracking-[0.13em] text-slate-400 sm:flex" data-testid="services-count">
            ${renderIcon('compass', 'size-4 text-[#059669]')}
            ${ACTIVE_SERVICES.length} services
          </span>
        </div>
        <div class="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3" data-testid="services-grid">
          ${serviceCardsHtml}
        </div>
      </section>

      <section class="mx-5 mb-20 rounded-[28px] bg-[#e9f7f0] sm:mx-8 lg:mx-auto lg:max-w-[1232px]" data-testid="services-cta-section">
        <div class="flex flex-col gap-6 px-7 py-10 sm:px-12 lg:flex-row lg:items-center lg:justify-between lg:px-14">
          <div>
            <h2 class="font-heading text-3xl font-bold tracking-[-0.04em] text-[#0a192f]" data-testid="services-cta-title">Not sure where to start?</h2>
            <p class="mt-2 text-sm text-slate-600" data-testid="services-cta-copy">A short conversation can help put the right path in focus.</p>
          </div>
          <a href="${SITE_CONFIG.whatsappUrl}" target="_blank" rel="noreferrer" class="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0a192f] px-6 py-3 text-white transition-colors duration-200 hover:bg-[#059669]" data-testid="services-cta-whatsapp-link">
            ${renderIcon('message-circle', 'size-4')}
            Talk to our team
            ${renderIcon('arrow-right', 'size-4')}
          </a>
        </div>
      </section>
    </div>
  `;
}

// 3. SERVICE / MARKET DETAIL VIEW
function renderDetailPage(params) {
  const serviceId = params.serviceId || 'broking';
  const item = SERVICES_DATA.find(s => s.id === serviceId) || SERVICES_DATA[0];
  const isMarket = item.kind === 'market';
  const backRoute = isMarket ? '/market-updates' : '/services';
  const backLabel = isMarket ? 'market updates' : 'services';

  const highlightsHtml = item.highlights.map((h, i) => `
    <div class="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4" data-testid="service-detail-highlight-${i + 1}">
      <span class="grid size-8 place-items-center rounded-lg bg-emerald-50 text-[#059669]">
        ${renderIcon('check', 'size-4')}
      </span>
      <span class="text-sm font-semibold text-[#0a192f]">${h}</span>
    </div>
  `).join('');

  const deliverablesHtml = item.deliverables.map((d, i) => `
    <div class="flex gap-3" data-testid="service-detail-deliverable-${i + 1}">
      <span class="mt-1 font-mono text-xs font-bold text-[#d97706]">0${i + 1}</span>
      <p class="text-sm leading-6 text-slate-600">${d}</p>
    </div>
  `).join('');

  appRoot.innerHTML = `
    <div data-testid="service-detail-page">
      <section class="relative overflow-hidden bg-[#0a192f] text-white" data-testid="service-detail-hero-section">
        <div class="pointer-events-none absolute -right-20 -top-24 size-[430px] rounded-full border border-[#d97706]/30"></div>
        <div class="mx-auto max-w-[1320px] px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
          <a href="#${backRoute}" data-nav-to="${backRoute}" class="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-slate-400 transition-colors duration-200 hover:text-white" data-testid="service-detail-back-link">
            ${renderIcon('arrow-left', 'size-4')}
            Back to ${backLabel}
          </a>
          <div class="mt-14 max-w-4xl">
            <p class="text-[0.68rem] font-bold uppercase tracking-[0.18em] text-[#86efac]" data-testid="service-detail-category">${item.category}</p>
            <h1 class="mt-5 font-heading text-5xl font-extrabold leading-[0.98] tracking-[-0.055em] sm:text-6xl" data-testid="service-detail-title">${item.name}</h1>
            <p class="mt-7 max-w-2xl text-base leading-8 text-slate-400" data-testid="service-detail-summary">${item.summary}</p>
            <div class="mt-9 flex flex-col gap-3 sm:flex-row">
              <a href="${SITE_CONFIG.whatsappUrl}" target="_blank" rel="noreferrer" class="inline-flex items-center justify-center gap-2 h-12 rounded-xl bg-[#059669] px-5 text-white transition-colors duration-200 hover:bg-[#d97706]" data-testid="service-detail-whatsapp-link">
                ${renderIcon('message-circle', 'size-4')}
                Enquire about this service
                ${renderIcon('arrow-up-right', 'size-4')}
              </a>
              <a href="#/contact" data-nav-to="/contact" class="inline-flex items-center justify-center gap-2 h-12 rounded-xl border border-white/20 bg-white/5 px-5 text-white transition-colors duration-200 hover:bg-white/10" data-testid="service-detail-contact-link">
                Contact details
                ${renderIcon('arrow-up-right', 'size-4')}
              </a>
            </div>
          </div>
        </div>
      </section>

      <section class="mx-auto grid max-w-[1320px] gap-12 px-5 py-16 sm:px-8 lg:grid-cols-[1fr_0.8fr] lg:px-12 lg:py-24" data-testid="service-detail-content-section">
        <div>
          <p class="text-[0.68rem] font-bold uppercase tracking-[0.18em] text-[#d97706]" data-testid="service-detail-eyebrow">${item.eyebrow}</p>
          <h2 class="mt-4 max-w-xl font-heading text-3xl font-bold leading-tight tracking-[-0.04em] text-[#0a192f] sm:text-4xl" data-testid="service-detail-content-title">
            A clearer way to think about ${item.shortName.toLowerCase()}.
          </h2>
          <p class="mt-6 max-w-2xl text-base leading-8 text-slate-500" data-testid="service-detail-content-copy">
            The right choice depends on context: what you are trying to achieve, how long you have, and the trade-offs you are willing to make. Our role is to bring those questions into the open and help you take the next step with more confidence.
          </p>
          <div class="mt-9 grid gap-4 sm:grid-cols-2" data-testid="service-detail-highlights">
            ${highlightsHtml}
          </div>
        </div>

        <aside class="relative overflow-hidden rounded-[28px] bg-[#f0fdf4] p-7 sm:p-9" data-testid="service-detail-aside">
          <div class="absolute -right-10 -top-10 size-40 rounded-full border border-emerald-200"></div>
          ${renderIcon('shield-check', 'relative size-7 text-[#059669]', 'data-testid="service-detail-aside-icon"')}
          <h3 class="relative mt-8 font-heading text-2xl font-bold text-[#0a192f]" data-testid="service-detail-aside-title">What the conversation covers</h3>
          <div class="relative mt-6 grid gap-4">
            ${deliverablesHtml}
          </div>
          <a href="${SITE_CONFIG.whatsappUrl}" target="_blank" rel="noreferrer" class="relative mt-8 inline-flex items-center gap-2 text-sm font-bold text-[#0a192f] transition-colors duration-200 hover:text-[#059669]" data-testid="service-detail-aside-whatsapp-link">
            Ask about fit
            ${renderIcon('arrow-up-right', 'size-4')}
          </a>
        </aside>
      </section>

      <section class="border-t border-slate-200 bg-white" data-testid="service-detail-next-section">
        <div class="mx-auto flex max-w-[1320px] flex-col gap-6 px-5 py-12 sm:px-8 md:flex-row md:items-center md:justify-between lg:px-12">
          <div>
            <p class="text-xs font-bold uppercase tracking-[0.15em] text-slate-400" data-testid="service-detail-next-label">Next step</p>
            <p class="mt-2 font-heading text-2xl font-bold text-[#0a192f]" data-testid="service-detail-next-copy">Good decisions start with better context.</p>
          </div>
          <a href="#/contact" data-nav-to="/contact" class="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 px-6 py-3 text-[#0a192f] transition-colors duration-200 hover:border-[#059669] hover:bg-emerald-50" data-testid="service-detail-next-contact-link">
            Contact Chartered Integrated Services
            ${renderIcon('arrow-up-right', 'size-4')}
          </a>
        </div>
      </section>
    </div>
  `;
}

// 4. MARKET UPDATES HUB VIEW
function renderMarketUpdatesPage() {
  const cardsHtml = MARKET_UPDATES_HERO_CARDS.map((c, i) => {
    const targetRoute = c.serviceId === 'fixed-income' ? '/services/fixed-income' : `/market-updates/${c.serviceId}`;
    return `
      <article class="min-h-[300px] rounded-[26px] p-7 text-white shadow-[0_18px_50px_rgba(15,23,42,0.1)] ${c.color}" data-testid="market-update-card-${c.serviceId}">
        <div class="flex items-start justify-between">
          <span class="grid size-11 place-items-center rounded-2xl bg-white/10">
            ${renderIcon(c.icon, 'size-5')}
          </span>
          <span class="font-mono text-xs font-bold tracking-[0.15em] text-white/50" data-testid="market-update-card-${c.serviceId}-number">0${i + 1}</span>
        </div>
        <div class="mt-20">
          <p class="text-[0.66rem] font-bold uppercase tracking-[0.16em] text-white/60" data-testid="market-update-card-${c.serviceId}-label">${c.label}</p>
          <h2 class="mt-2 font-heading text-3xl font-bold" data-testid="market-update-card-${c.serviceId}-title">${c.value}</h2>
          <p class="mt-3 text-sm leading-6 text-white/70" data-testid="market-update-card-${c.serviceId}-detail">${c.detail}</p>
          <a href="#${targetRoute}" data-nav-to="${targetRoute}" class="mt-5 inline-flex items-center gap-2 text-sm font-bold" data-testid="market-update-card-${c.serviceId}-link">
            Explore update
            ${renderIcon('arrow-up-right', 'size-4')}
          </a>
        </div>
      </article>
    `;
  }).join('');

  const notesHtml = MARKET_UPDATES_NOTES.map((n, i) => `
    <div class="rounded-2xl border border-slate-200 p-5" data-testid="market-updates-note-${i + 1}">
      ${renderIcon(n.icon, 'size-5 text-[#059669]')}
      <h3 class="mt-5 font-heading text-lg font-bold text-[#0a192f]" data-testid="market-updates-note-${i + 1}-title">${n.title}</h3>
      <p class="mt-2 text-sm leading-6 text-slate-500" data-testid="market-updates-note-${i + 1}-copy">${n.copy}</p>
    </div>
  `).join('');

  appRoot.innerHTML = `
    <div data-testid="market-updates-page">
      <section class="bg-[#f0fdf4]" data-testid="market-updates-hero-section">
        <div class="mx-auto max-w-[1320px] px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
          <p class="text-[0.68rem] font-bold uppercase tracking-[0.18em] text-[#059669]" data-testid="market-updates-hero-eyebrow">The daily desk</p>
          <h1 class="mt-5 max-w-3xl font-heading text-5xl font-extrabold leading-[0.98] tracking-[-0.055em] text-[#0a192f] sm:text-6xl" data-testid="market-updates-hero-title">The signals worth keeping in view.</h1>
          <p class="mt-7 max-w-2xl text-base leading-8 text-slate-500" data-testid="market-updates-hero-copy">Static previews of our update pathways across IPOs, unlisted shares, and fixed income. Message us for the latest version.</p>
        </div>
      </section>

      <section class="mx-auto max-w-[1320px] px-5 py-16 sm:px-8 lg:px-12 lg:py-24" data-testid="market-updates-cards-section">
        <div class="grid gap-5 lg:grid-cols-3" data-testid="market-updates-grid">
          ${cardsHtml}
        </div>
      </section>

      <section class="border-y border-slate-200 bg-white" data-testid="market-updates-notes-section">
        <div class="mx-auto grid max-w-[1320px] gap-10 px-5 py-16 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:px-12 lg:py-20">
          <div>
            <p class="text-[0.68rem] font-bold uppercase tracking-[0.18em] text-[#d97706]" data-testid="market-updates-notes-eyebrow">How to use these updates</p>
            <h2 class="mt-3 font-heading text-3xl font-bold tracking-[-0.04em] text-[#0a192f]" data-testid="market-updates-notes-title">A starting point, not a shortcut.</h2>
          </div>
          <div class="grid gap-4 sm:grid-cols-3" data-testid="market-updates-note-grid">
            ${notesHtml}
          </div>
        </div>
      </section>

      <section class="mx-5 my-20 rounded-[28px] bg-[#0a192f] px-7 py-10 text-white sm:mx-8 sm:px-12 lg:mx-auto lg:max-w-[1232px]" data-testid="market-updates-cta-section">
        <div class="flex flex-col gap-7 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 class="font-heading text-3xl font-bold" data-testid="market-updates-cta-title">Want the latest daily update?</h2>
            <p class="mt-2 text-sm text-slate-400" data-testid="market-updates-cta-copy">Join the conversation on the channel that suits you.</p>
          </div>
          <a href="${SITE_CONFIG.whatsappUrl}" target="_blank" rel="noreferrer" class="inline-flex items-center justify-center gap-2 rounded-xl bg-[#25d366] px-6 py-3 font-bold text-[#062d16] transition-colors duration-200 hover:bg-white" data-testid="market-updates-cta-whatsapp-link">
            ${renderIcon('message-circle', 'size-4')}
            Ask on WhatsApp
            ${renderIcon('arrow-up-right', 'size-4')}
          </a>
        </div>
      </section>
    </div>
  `;
}

// 5. CALCULATORS VIEW
function renderCalculatorsPage() {
  const planningHtml = PLANNING_PROMPTS.map((p, i) => `
    <div class="rounded-[22px] border border-slate-200 p-6" data-testid="planning-tool-card-${i + 1}">
      ${renderIcon(p.icon, 'size-6 text-[#059669]')}
      <h3 class="mt-6 font-heading text-xl font-bold text-[#0a192f]" data-testid="planning-tool-card-${i + 1}-title">${p.title}</h3>
      <p class="mt-2 text-sm leading-6 text-slate-500" data-testid="planning-tool-card-${i + 1}-copy">${p.copy}</p>
    </div>
  `).join('');

  appRoot.innerHTML = `
    <div data-testid="calculators-page">
      <section class="bg-[#0a192f] text-white" data-testid="calculators-hero-section">
        <div class="mx-auto max-w-[1320px] px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
          <p class="text-[0.68rem] font-bold uppercase tracking-[0.18em] text-emerald-300" data-testid="calculators-hero-eyebrow">Plan with perspective</p>
          <h1 class="mt-5 max-w-3xl font-heading text-5xl font-extrabold leading-[0.98] tracking-[-0.055em] sm:text-6xl" data-testid="calculators-hero-title">Turn a goal into a number you can work with.</h1>
          <p class="mt-7 max-w-2xl text-base leading-8 text-slate-400" data-testid="calculators-hero-copy">Use this simple SIP illustration to explore how regular investing and time can shape a future outcome. It is a starting point for a conversation, not a promise.</p>
        </div>
      </section>

      <section class="mx-auto grid max-w-[1320px] gap-8 px-5 py-16 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:px-12 lg:py-24" data-testid="sip-calculator-section">
        <!-- INPUTS -->
        <div class="rounded-[28px] border border-slate-200 bg-white p-7 shadow-[0_18px_50px_rgba(15,23,42,0.06)] sm:p-9">
          <div class="flex items-center gap-3">
            <span class="grid size-11 place-items-center rounded-2xl bg-emerald-50 text-[#059669]">
              ${renderIcon('calculator', 'size-5')}
            </span>
            <div>
              <p class="text-[0.66rem] font-bold uppercase tracking-[0.16em] text-[#d97706]" data-testid="sip-calculator-eyebrow">Illustrative SIP calculator</p>
              <h2 class="mt-1 font-heading text-2xl font-bold text-[#0a192f]" data-testid="sip-calculator-title">Change the inputs</h2>
            </div>
          </div>
          <div class="mt-9 grid gap-7">
            <label class="grid gap-3" data-testid="sip-monthly-input-field">
              <span class="flex justify-between text-sm font-semibold text-slate-600">
                <span>Monthly investment</span>
                <span class="font-mono text-[#059669]" id="sip-monthly-display">₹10,000</span>
              </span>
              <input type="range" min="1000" max="100000" step="1000" value="10000" class="accent-[#059669] cursor-pointer" id="sip-monthly-input" data-testid="sip-monthly-input">
            </label>
            <label class="grid gap-3" data-testid="sip-years-input-field">
              <span class="flex justify-between text-sm font-semibold text-slate-600">
                <span>Time horizon</span>
                <span class="font-mono text-[#059669]" id="sip-years-display">10 years</span>
              </span>
              <input type="range" min="1" max="30" value="10" class="accent-[#059669] cursor-pointer" id="sip-years-input" data-testid="sip-years-input">
            </label>
            <label class="grid gap-3" data-testid="sip-rate-input-field">
              <span class="flex justify-between text-sm font-semibold text-slate-600">
                <span>Illustrative return</span>
                <span class="font-mono text-[#059669]" id="sip-rate-display">12% p.a.</span>
              </span>
              <input type="range" min="4" max="20" value="12" class="accent-[#059669] cursor-pointer" id="sip-rate-input" data-testid="sip-rate-input">
            </label>
          </div>
        </div>

        <!-- RESULTS -->
        <div class="rounded-[28px] bg-[#f0fdf4] p-7 sm:p-9" data-testid="sip-result-card">
          <p class="text-[0.66rem] font-bold uppercase tracking-[0.16em] text-[#059669]" data-testid="sip-result-eyebrow">Your illustration</p>
          <h2 class="mt-3 max-w-md font-heading text-3xl font-bold leading-tight tracking-[-0.04em] text-[#0a192f]" data-testid="sip-result-title">Small, consistent actions can build meaningful momentum.</h2>
          <div class="mt-10 grid gap-4 sm:grid-cols-2">
            <div class="rounded-2xl border border-emerald-200 bg-white p-5" data-testid="sip-invested-result">
              <p class="text-xs font-semibold text-slate-500" data-testid="sip-invested-label">Total invested</p>
              <p class="mt-2 font-mono text-2xl font-bold text-[#0a192f]" id="sip-invested-val" data-testid="sip-invested-value">₹12,00,000</p>
            </div>
            <div class="rounded-2xl bg-[#0a192f] p-5 text-white" data-testid="sip-maturity-result">
              <p class="text-xs font-semibold text-slate-400" data-testid="sip-maturity-label">Illustrative value</p>
              <p class="mt-2 font-mono text-2xl font-bold text-emerald-300" id="sip-maturity-val" data-testid="sip-maturity-value">₹23,23,391</p>
            </div>
          </div>
          <p class="mt-7 flex items-start gap-2 text-xs leading-5 text-slate-500" data-testid="sip-disclaimer">
            ${renderIcon('check', 'mt-0.5 size-3 shrink-0 text-[#059669]')}
            Returns are illustrative only and actual outcomes vary with market conditions.
          </p>
          <a href="${SITE_CONFIG.whatsappUrl}" target="_blank" rel="noreferrer" class="mt-7 inline-flex items-center gap-2 text-sm font-bold text-[#0a192f] transition-colors duration-200 hover:text-[#059669]" data-testid="sip-enquiry-link">
            Discuss your goal
            ${renderIcon('arrow-up-right', 'size-4')}
          </a>
        </div>
      </section>

      <!-- PLANNING PROMPTS -->
      <section class="border-y border-slate-200 bg-white" data-testid="planning-tools-section">
        <div class="mx-auto max-w-[1320px] px-5 py-16 sm:px-8 lg:px-12 lg:py-20">
          <p class="text-[0.68rem] font-bold uppercase tracking-[0.18em] text-[#d97706]" data-testid="planning-tools-eyebrow">Planning prompts</p>
          <h2 class="mt-3 font-heading text-3xl font-bold tracking-[-0.04em] text-[#0a192f]" data-testid="planning-tools-title">Start with the goal, then shape the plan.</h2>
          <div class="mt-9 grid gap-5 md:grid-cols-3" data-testid="planning-tools-grid">
            ${planningHtml}
          </div>
        </div>
      </section>
    </div>
  `;

  // Attach real-time slider listener
  initCalculator();
}

// 6. ABOUT US VIEW
function renderAboutPage() {
  const valuesHtml = ABOUT_VALUES.map((v, i) => `
    <div class="rounded-2xl border border-slate-200 bg-white p-5" data-testid="about-value-${i + 1}">
      ${renderIcon(v.icon, 'size-5 text-[#059669]')}
      <p class="mt-4 text-sm font-bold text-[#0a192f]" data-testid="about-value-${i + 1}-title">${v.title}</p>
    </div>
  `).join('');

  const principlesHtml = ABOUT_PRINCIPLES.map(p => `
    <div data-testid="about-principle-${p.number}">
      <p class="font-mono text-xs font-bold tracking-[0.16em] text-[#d97706]" data-testid="about-principle-${p.number}-number">${p.number}</p>
      <h3 class="mt-5 font-heading text-xl font-bold" data-testid="about-principle-${p.number}-title">${p.title}</h3>
      <p class="mt-3 text-sm leading-6 text-slate-400" data-testid="about-principle-${p.number}-copy">${p.copy}</p>
    </div>
  `).join('');

  appRoot.innerHTML = `
    <div data-testid="about-page">
      <section class="bg-[#f0fdf4]" data-testid="about-hero-section">
        <div class="mx-auto max-w-[1320px] px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
          <p class="text-[0.68rem] font-bold uppercase tracking-[0.18em] text-[#059669]" data-testid="about-hero-eyebrow">About Chartered Integrated Services</p>
          <h1 class="mt-5 max-w-4xl font-heading text-5xl font-extrabold leading-[0.98] tracking-[-0.055em] text-[#0a192f] sm:text-6xl" data-testid="about-hero-title">Integrated thinking for decisions that outlast the moment.</h1>
          <p class="mt-7 max-w-2xl text-base leading-8 text-slate-500" data-testid="about-hero-copy">We are a private limited company based in Ahmedabad, bringing together market, wealth, compliance, and family-office conversations for people building what comes next.</p>
        </div>
      </section>

      <section class="mx-auto grid max-w-[1320px] gap-12 px-5 py-16 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:px-12 lg:py-24" data-testid="about-story-section">
        <div>
          <p class="text-[0.68rem] font-bold uppercase tracking-[0.18em] text-[#d97706]" data-testid="about-story-eyebrow">Our point of view</p>
          <h2 class="mt-4 max-w-sm font-heading text-4xl font-bold leading-[1.05] tracking-[-0.04em] text-[#0a192f]" data-testid="about-story-title">Finance is personal because the future is.</h2>
        </div>
        <div class="grid gap-6 text-base leading-8 text-slate-500">
          <p data-testid="about-story-paragraph-one">The most useful financial conversation is rarely about a single product. It is about trade-offs, timing, people, and the kind of life or legacy you are trying to shape.</p>
          <p data-testid="about-story-paragraph-two">That is why Chartered Integrated Services is designed as an integrated desk. We can help you move from a first market question to a more complete plan, with clarity at each step.</p>
          <div class="grid gap-4 pt-3 sm:grid-cols-3" data-testid="about-values-grid">
            ${valuesHtml}
          </div>
        </div>
      </section>

      <section class="bg-[#0a192f] text-white" data-testid="about-principles-section">
        <div class="mx-auto max-w-[1320px] px-5 py-16 sm:px-8 lg:px-12 lg:py-20">
          <div class="grid gap-10 md:grid-cols-3" data-testid="about-principles-grid">
            ${principlesHtml}
          </div>
        </div>
      </section>

      <section class="mx-auto max-w-[1320px] px-5 py-16 sm:px-8 lg:px-12 lg:py-24" data-testid="about-cta-section">
        <div class="flex flex-col gap-7 rounded-[28px] bg-[#e9f7f0] px-7 py-10 sm:px-12 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p class="text-[0.68rem] font-bold uppercase tracking-[0.18em] text-[#059669]" data-testid="about-cta-eyebrow">Meet the integrated desk</p>
            <h2 class="mt-3 font-heading text-3xl font-bold text-[#0a192f]" data-testid="about-cta-title">Bring us the question behind the question.</h2>
          </div>
          <a href="#/contact" data-nav-to="/contact" class="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0a192f] px-6 py-3 font-semibold text-white transition-colors duration-200 hover:bg-[#059669]" data-testid="about-cta-contact-link">
            Get in touch
            ${renderIcon('arrow-up-right', 'size-4')}
          </a>
        </div>
      </section>
    </div>
  `;
}

// 7. CONTACT VIEW
function renderContactPage() {
  appRoot.innerHTML = `
    <div data-testid="contact-page">
      <section class="bg-[#0a192f] text-white" data-testid="contact-hero-section">
        <div class="mx-auto max-w-[1320px] px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
          <p class="text-[0.68rem] font-bold uppercase tracking-[0.18em] text-emerald-300" data-testid="contact-hero-eyebrow">Contact & enquiry</p>
          <h1 class="mt-5 max-w-3xl font-heading text-5xl font-extrabold leading-[0.98] tracking-[-0.055em] sm:text-6xl" data-testid="contact-hero-title">Let’s talk about what comes next.</h1>
          <p class="mt-7 max-w-2xl text-base leading-8 text-slate-400" data-testid="contact-hero-copy">Choose the channel that works for you. We are here for a first question, a specific service need, or a broader planning conversation.</p>
        </div>
      </section>

      <section class="mx-auto grid max-w-[1320px] gap-7 px-5 py-16 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:px-12 lg:py-24" data-testid="contact-options-section">
        <div class="grid gap-5">
          <a href="${SITE_CONFIG.whatsappUrl}" target="_blank" rel="noreferrer" class="group rounded-[25px] bg-[#25d366] p-7 text-[#062d16] transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_20px_45px_rgba(37,211,102,0.25)]" data-testid="contact-whatsapp-card">
            <div class="flex items-start justify-between">
              ${renderIcon('message-circle', 'size-7')}
              ${renderIcon('arrow-up-right', 'size-5 transition-transform duration-200 group-hover:-translate-y-1 group-hover:translate-x-1')}
            </div>
            <h2 class="mt-16 font-heading text-3xl font-bold" data-testid="contact-whatsapp-title">WhatsApp us</h2>
            <p class="mt-2 text-sm" data-testid="contact-whatsapp-copy">The quickest route to a first conversation.</p>
          </a>

          <a href="${SITE_CONFIG.emailUrl}" class="group rounded-[25px] bg-[#f0fdf4] p-7 text-[#0a192f] transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_20px_45px_rgba(15,23,42,0.08)]" data-testid="contact-email-card">
            <div class="flex items-start justify-between">
              ${renderIcon('mail', 'size-7 text-[#059669]')}
              ${renderIcon('arrow-up-right', 'size-5 text-[#059669] transition-transform duration-200 group-hover:-translate-y-1 group-hover:translate-x-1')}
            </div>
            <h2 class="mt-16 font-heading text-3xl font-bold" data-testid="contact-email-title">Send an email</h2>
            <p class="mt-2 text-sm text-slate-600" data-testid="contact-email-copy">${SITE_CONFIG.email}</p>
          </a>
        </div>

        <div class="rounded-[25px] border border-slate-200 bg-white p-7 shadow-[0_18px_50px_rgba(15,23,42,0.05)] sm:p-10" data-testid="contact-details-card">
          <p class="text-[0.68rem] font-bold uppercase tracking-[0.18em] text-[#d97706]" data-testid="contact-details-eyebrow">Visit or call</p>
          <h2 class="mt-4 max-w-md font-heading text-3xl font-bold leading-tight tracking-[-0.04em] text-[#0a192f]" data-testid="contact-details-title">A real desk, with a real address.</h2>
          <div class="mt-10 grid gap-7">
            <a href="${SITE_CONFIG.phoneUrl}" class="flex gap-4" data-testid="contact-phone-link">
              <span class="grid size-10 shrink-0 place-items-center rounded-xl bg-emerald-50 text-[#059669]">
                ${renderIcon('phone', 'size-4')}
              </span>
              <span>
                <span class="block text-xs font-bold uppercase tracking-[0.14em] text-slate-400">Call us</span>
                <span class="mt-1 block text-sm font-semibold text-[#0a192f]">${SITE_CONFIG.phone}</span>
              </span>
            </a>

            <a href="${SITE_CONFIG.emailUrl}" class="flex gap-4" data-testid="contact-email-details-link">
              <span class="grid size-10 shrink-0 place-items-center rounded-xl bg-emerald-50 text-[#059669]">
                ${renderIcon('mail', 'size-4')}
              </span>
              <span>
                <span class="block text-xs font-bold uppercase tracking-[0.14em] text-slate-400">Email us</span>
                <span class="mt-1 block text-sm font-semibold text-[#0a192f]">${SITE_CONFIG.email}</span>
              </span>
            </a>

            <div class="flex gap-4" data-testid="contact-address-details">
              <span class="grid size-10 shrink-0 place-items-center rounded-xl bg-emerald-50 text-[#059669]">
                ${renderIcon('map-pin', 'size-4')}
              </span>
              <span>
                <span class="block text-xs font-bold uppercase tracking-[0.14em] text-slate-400">Office</span>
                <span class="mt-1 block max-w-sm text-sm font-semibold leading-6 text-[#0a192f]">${SITE_CONFIG.address}</span>
              </span>
            </div>
          </div>

          <a href="${SITE_CONFIG.whatsappUrl}" target="_blank" rel="noreferrer" class="mt-10 inline-flex items-center justify-center gap-2 h-12 w-full sm:w-auto rounded-xl bg-[#0a192f] px-6 text-white transition-colors duration-200 hover:bg-[#059669]" data-testid="contact-details-whatsapp-link">
            ${renderIcon('message-circle', 'size-4')}
            Start a WhatsApp enquiry
            ${renderIcon('arrow-up-right', 'size-4')}
          </a>
        </div>
      </section>
    </div>
  `;
}

// Initialize Navigation and Header
function initNav() {
  const desktopNav = document.getElementById('desktop-navigation');
  const mobileNavContainer = document.getElementById('mobile-navigation-links');
  const mobileToggle = document.getElementById('mobile-navigation-toggle-button');
  const mobilePanel = document.getElementById('mobile-navigation-panel');

  if (desktopNav) {
    desktopNav.innerHTML = NAV_ITEMS.map(item => `
      <a href="#${item.to}" data-nav-to="${item.to}" data-nav-type="desktop" class="relative px-3 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.12em] transition-colors duration-200 after:absolute after:inset-x-3 after:bottom-0 after:h-px after:origin-left after:bg-[#d97706] after:transition-transform after:duration-200 hover:text-[#059669] hover:after:scale-x-100 text-slate-500 after:scale-x-0" data-testid="header-nav-${item.label.toLowerCase().replaceAll(' ', '-')}-link">
        ${item.label}
      </a>
    `).join('');
  }

  if (mobileNavContainer) {
    mobileNavContainer.innerHTML = NAV_ITEMS.map(item => `
      <a href="#${item.to}" data-nav-to="${item.to}" data-nav-type="mobile" class="rounded-xl px-4 py-3 text-sm font-semibold text-slate-600 hover:bg-emerald-50 hover:text-[#059669]" data-testid="mobile-nav-${item.label.toLowerCase().replaceAll(' ', '-')}-link">
        ${item.label}
      </a>
    `).join('');
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
}

// Router route mappings
Router.register('/', () => renderHomePage());
Router.register('/services', () => renderServicesPage());
Router.register('/services/:serviceId', (params) => renderDetailPage(params));
Router.register('/market-updates', () => renderMarketUpdatesPage());
Router.register('/market-updates/:serviceId', (params) => renderDetailPage(params));
Router.register('/calculators', () => renderCalculatorsPage());
Router.register('/about', () => renderAboutPage());
Router.register('/contact', () => renderContactPage());

// Boot the app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  initNav();
  Router.init();
});
