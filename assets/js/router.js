// Client-side router supporting both hash and HTML5 history routing
const Router = {
  routes: {},
  currentPath: '',

  register(path, handler) {
    this.routes[path] = handler;
  },

  getCurrentPath() {
    // If hash routing is used (e.g. #/services/broking), parse hash
    if (window.location.hash && window.location.hash.startsWith('#/')) {
      return window.location.hash.slice(1);
    }
    // If opened via file:/// without hash, default to '/'
    if (window.location.protocol === 'file:') {
      return window.location.hash ? window.location.hash.replace(/^#/, '') : '/';
    }
    // Otherwise fallback to pathname or default '/'
    return window.location.pathname || '/';
  },

  navigateTo(path) {
    if (!path.startsWith('/')) path = '/' + path;
    
    // Always use hash routing so the site works perfectly on file://, GitHub Pages, Netlify, and local servers
    window.location.hash = '#' + path;
    this.handleRoute(path);
  },

  handleRoute(path) {
    if (!path) path = this.getCurrentPath();
    if (!path.startsWith('/')) path = '/' + path;
    this.currentPath = path;

    // Scroll to top
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

    // Match exact route
    if (this.routes[path]) {
      this.routes[path]({});
      return;
    }

    // Match dynamic route: /services/:serviceId
    if (path.startsWith('/services/')) {
      const serviceId = path.replace('/services/', '').split('?')[0].split('#')[0];
      if (this.routes['/services/:serviceId']) {
        this.routes['/services/:serviceId']({ serviceId });
        return;
      }
    }

    // Match dynamic route: /market-updates/:serviceId
    if (path.startsWith('/market-updates/')) {
      const serviceId = path.replace('/market-updates/', '').split('?')[0].split('#')[0];
      if (this.routes['/market-updates/:serviceId']) {
        this.routes['/market-updates/:serviceId']({ serviceId });
        return;
      }
    }

    // Default route
    if (this.routes['/']) {
      this.routes['/']({});
    }
  },

  updateActiveLinks(path) {
    // Top-level section for matching active tab
    const baseSection = path === '/' ? '/' : '/' + path.split('/')[1];

    document.querySelectorAll('[data-nav-to]').forEach(link => {
      const target = link.getAttribute('data-nav-to');
      const isTargetActive = (target === '/' && path === '/') || (target !== '/' && baseSection === target);

      if (link.dataset.navType === 'desktop') {
        if (isTargetActive) {
          link.className = 'relative px-3 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.12em] transition-colors duration-200 after:absolute after:inset-x-3 after:bottom-0 after:h-px after:origin-left after:bg-[#d97706] after:transition-transform after:duration-200 hover:text-[#059669] hover:after:scale-x-100 text-[#059669] after:scale-x-100';
        } else {
          link.className = 'relative px-3 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.12em] transition-colors duration-200 after:absolute after:inset-x-3 after:bottom-0 after:h-px after:origin-left after:bg-[#d97706] after:transition-transform after:duration-200 hover:text-[#059669] hover:after:scale-x-100 text-slate-500 after:scale-x-0';
        }
      } else if (link.dataset.navType === 'mobile') {
        if (isTargetActive) {
          link.className = 'rounded-xl px-4 py-3 text-sm font-semibold text-[#059669] bg-emerald-50';
        } else {
          link.className = 'rounded-xl px-4 py-3 text-sm font-semibold text-slate-600 hover:bg-emerald-50 hover:text-[#059669]';
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
