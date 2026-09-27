// Client-side router supporting hash navigation and dynamic routes
// SEO and View State Management for Chartered Integrated Services Private Limited

const Router = {
  routes: {},
  currentPath: '',

  register(path, handler) {
    this.routes[path] = handler;
  },

  getCurrentPath() {
    if (window.location.hash && window.location.hash.startsWith('#/')) {
      return window.location.hash.slice(1);
    }
    if (window.location.protocol === 'file:') {
      return window.location.hash ? window.location.hash.replace(/^#/, '') : '/';
    }
    return window.location.pathname || '/';
  },

  navigateTo(path) {
    if (!path.startsWith('/')) path = '/' + path;
    window.location.hash = '#' + path;
    this.handleRoute(path);
  },

  handleRoute(path) {
    if (!path) path = this.getCurrentPath();
    if (!path.startsWith('/')) path = '/' + path;
    this.currentPath = path;

    // Scroll to top instantly
    window.scrollTo({ top: 0, behavior: 'instant' });

    // Update active nav links
    this.updateActiveLinks(path);

    // Close mobile nav drawer if open
    const mobileNav = document.getElementById('mobile-navigation-panel');
    const mobileBtn = document.getElementById('mobile-navigation-toggle-button');
    if (mobileNav) mobileNav.classList.add('hidden');
    if (mobileBtn) {
      mobileBtn.setAttribute('aria-label', 'Open navigation');
      mobileBtn.innerHTML = renderIcon('menu', 'size-5');
    }

    // Close any open desktop dropdowns
    document.querySelectorAll('.nav-dropdown-menu').forEach(el => el.classList.add('hidden'));

    // 1. Direct route match
    if (this.routes[path]) {
      this.routes[path]({});
      this.updatePageMeta(path);
      return;
    }

    // 2. Dynamic route: /solutions/:solutionId
    if (path.startsWith('/solutions/')) {
      const solutionId = path.replace('/solutions/', '').split('?')[0].split('#')[0];
      if (this.routes['/solutions/:solutionId']) {
        this.routes['/solutions/:solutionId']({ solutionId });
        this.updatePageMeta(path, solutionId);
        return;
      }
    }

    // 3. Dynamic route backward compatibility: /services/:serviceId -> redirect or handle
    if (path.startsWith('/services/')) {
      const solutionId = path.replace('/services/', '').split('?')[0].split('#')[0];
      if (this.routes['/solutions/:solutionId']) {
        this.routes['/solutions/:solutionId']({ solutionId });
        this.updatePageMeta(path, solutionId);
        return;
      }
    }

    if (path === '/services') {
      if (this.routes['/solutions']) {
        this.routes['/solutions']({});
        this.updatePageMeta('/solutions');
        return;
      }
    }

    // 4. Dynamic route: /market-updates/:updateId
    if (path.startsWith('/market-updates/')) {
      const updateId = path.replace('/market-updates/', '').split('?')[0].split('#')[0];
      if (this.routes['/market-updates/:updateId']) {
        this.routes['/market-updates/:updateId']({ updateId });
        this.updatePageMeta(path, updateId);
        return;
      }
    }

    // 5. Default route fallback
    if (this.routes['/']) {
      this.routes['/']({});
      this.updatePageMeta('/');
    }
  },

  updatePageMeta(path, paramId = '') {
    const titles = {
      '/': 'Chartered Integrated Services | Research Driven Wealth Creation | Ahmedabad',
      '/about': 'About Us & Leadership | CA Haresh Bhatreja | Chartered Integrated Services',
      '/solutions': 'Investment Solutions | Equities, PMS, AIF, Mutual Funds, Bonds | Chartered Integrated Services',
      '/research': 'Research & Insights | Institutional Market Research | Chartered Integrated Services',
      '/market-updates': 'Market Updates Desk | Indian & Global Capital Signals | Chartered Integrated Services',
      '/entrepreneurs': 'For Entrepreneurs & Business Owners | Personal Wealth & Corporate Advisory',
      '/who-we-serve': 'Who We Serve | Individuals, HNIs, UHNIs & Families | Chartered Integrated Services',
      '/calculators': 'Financial Calculators | SIP, CAGR, XIRR, Retirement, EMI | Chartered Integrated Services',
      '/contact': 'Contact & Consultation | B-807 The Gateway, Nikol, Ahmedabad | Chartered Integrated Services'
    };

    if (paramId && (path.startsWith('/solutions/') || path.startsWith('/services/'))) {
      const sol = SOLUTIONS_DATA.find(s => s.id === paramId);
      if (sol) {
        document.title = `${sol.name} | Investment Solutions | Chartered Integrated Services`;
        return;
      }
    }

    document.title = titles[path] || 'Chartered Integrated Services | Research Driven Wealth Creation';
  },

  updateActiveLinks(path) {
    const baseSection = path === '/' ? '/' : '/' + path.split('/')[1];

    document.querySelectorAll('[data-nav-to]').forEach(link => {
      const target = link.getAttribute('data-nav-to');
      const isTargetActive = (target === '/' && path === '/') || (target !== '/' && (baseSection === target || path.startsWith(target)));

      if (link.dataset.navType === 'desktop') {
        if (isTargetActive) {
          link.className = 'relative px-3 py-2 text-[0.72rem] font-bold uppercase tracking-[0.14em] text-[#059669] after:absolute after:inset-x-3 after:bottom-0 after:h-[2px] after:bg-[#059669] after:scale-x-100 transition-all duration-200';
        } else {
          link.className = 'relative px-3 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-slate-600 hover:text-[#0a192f] after:absolute after:inset-x-3 after:bottom-0 after:h-[2px] after:bg-[#059669] after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-200 transition-colors duration-200';
        }
      } else if (link.dataset.navType === 'mobile') {
        if (isTargetActive) {
          link.className = 'flex items-center justify-between rounded-xl px-4 py-3 text-sm font-bold text-[#059669] bg-emerald-50';
        } else {
          link.className = 'flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-[#0a192f]';
        }
      }
    });
  },

  init() {
    window.addEventListener('hashchange', () => {
      this.handleRoute();
    });

    window.addEventListener('popstate', () => {
      this.handleRoute();
    });

    // Intercept navigation clicks
    document.addEventListener('click', e => {
      const target = e.target.closest('a[data-nav-to]');
      if (target) {
        e.preventDefault();
        const route = target.getAttribute('data-nav-to');
        this.navigateTo(route);
      }
    });

    // Initial route
    this.handleRoute();
  }
};
