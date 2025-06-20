/**
 * DRONER Unified Modern Navbar
 * Usage: Add this single line to any HTML page (before closing </body> tag):
 * <script src="assets/js/navbar.js"></script>
 * 
 * The script automatically detects language and applies appropriate navbar
 */

(function() {
  'use strict';

  // Detect current language and relative path
  function detectLanguage() {
    const path = window.location.pathname;
    const isEnglish = path.includes('/en/') || path.startsWith('/en');
    return isEnglish ? 'en' : 'he';
  }

  function getRelativePath() {
    const path = window.location.pathname;
    let relativePath = '';
    
    if (path.includes('/pages/')) {
      relativePath = '../';
    }
    if (path.includes('/products/')) {
      relativePath = '../../';
    }
    if (path.includes('/en/pages/')) {
      relativePath = '../../';
    }
    if (path.includes('/en/pages/products/')) {
      relativePath = '../../../';
    }
    
    return relativePath;
  }

  // Theme toggle logic (only override safe variables and force light text on dark cards in light mode)
  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);

    // Only override variables that are safe for light theme
    if (theme === 'light') {
      document.documentElement.style.setProperty('--color-dark-bg', '#f4f4f4');
      document.documentElement.style.setProperty('--color-light', '#222');
      document.documentElement.style.setProperty('--color-black', '#fff');
      document.documentElement.style.setProperty('--color-white', '#222');
      document.documentElement.style.setProperty('--color-gold', '#2A5D94');
      document.documentElement.style.setProperty('--color-brand', '#39A9DC');
      // Add light theme overrides for card text
      addLightCardTextOverrides();
    } else {
      document.documentElement.style.setProperty('--color-dark-bg', '#1E1E1E');
      document.documentElement.style.setProperty('--color-light', '#f4f4f4');
      document.documentElement.style.setProperty('--color-black', '#1E1E1E');
      document.documentElement.style.setProperty('--color-white', '#fff');
      document.documentElement.style.setProperty('--color-gold', '#39A9DC');
      document.documentElement.style.setProperty('--color-brand', '#2A5D94');
      removeLightCardTextOverrides();
    }
    updateThemeToggleBtn();
  }
  function getSavedTheme() {
    return localStorage.getItem('theme');
  }
  function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme') || 'dark';
    setTheme(current === 'dark' ? 'light' : 'dark');
  }
  function updateThemeToggleBtn() {
    const btn = document.getElementById('theme-toggle-btn');
    if (!btn) return;
    const theme = document.documentElement.getAttribute('data-theme') || 'dark';
    btn.innerHTML = theme === 'dark'
      ? '<i class="fa fa-sun" style="color:#fff !important;"></i>'
      : '<i class="fa fa-moon"></i>';
    btn.setAttribute('aria-label', theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
  }

  function createNavbar() {
    const lang = detectLanguage();
    const relativePath = getRelativePath();
    const isHebrew = lang === 'he';

    // Always return absolute /en/ path for English nav items
    function enHref(path) {
      return `/en/${path}`;
    }

    function getLanguageToggleHref() {
      const currentPath = window.location.pathname;
      if (isHebrew) {
        if (currentPath === '/' || currentPath === '/index.html') {
          return '/en/index.html';
        }
        return '/en' + currentPath;
      } else {
        return currentPath.replace(/^\/en/, '') || '/index.html';
      }
    }

    const navItems = isHebrew ? [
      { text: 'בית', href: `${relativePath}index.html` },
      { text: 'אודות', href: `${relativePath}pages/about.html` },
      {
        text: 'המוצרים שלנו',
        dropdown: [
          { text: 'SMARTER', href: `${relativePath}pages/products/SMARTER.html` },
          {
            text: 'DOCKER',
            subDropdown: [
              { text: 'D100 / D135', href: `${relativePath}pages/products/dock-d135.html` },
              { text: 'DJI Dock 2 / 3', href: `${relativePath}pages/products/dock-dji.html` }
            ]
          },
          { text: 'CONTROLLER', href: `${relativePath}pages/products/CONTROLLER.html` }
        ]
      },
      { text: 'מדיה', href: `${relativePath}pages/workingonit.html` },
      { text: 'קריירה ב-G-SYSTEM', href: `${relativePath}pages/careers.html` },
      { text: 'תמיכה מרחוק', href: `${relativePath}pages/workingonit.html` },
      { text: 'צור קשר', href: `${relativePath}pages/contact.html` },
      { langToggle: true, text: 'English', href: getLanguageToggleHref() }
    ] : [
      { text: 'Home', href: enHref('index.html') },
      { text: 'About', href: enHref('pages/about.html') },
      {
        text: 'Our Products',
        dropdown: [
          { text: 'SMARTER', href: enHref('pages/products/SMARTER.html') },
          {
            text: 'DOCKER',
            subDropdown: [
              { text: 'D100 / D135', href: enHref('pages/products/dock-d135.html') },
              { text: 'DJI Dock 2 / 3', href: enHref('pages/products/dock-dji.html') }
            ]
          },
          { text: 'CONTROLLER', href: enHref('pages/products/CONTROLLER.html') }
        ]
      },
      { text: 'Media', href: enHref('pages/workingonit.html') },
      { text: 'Careers at G-SYSTEM', href: enHref('pages/careers.html') },
      { text: 'Remote Support', href: enHref('pages/workingonit.html') },
      { text: 'Contact', href: enHref('pages/contact.html') },
      { langToggle: true, text: 'עברית', href: getLanguageToggleHref() }
    ];

    // Build navbar HTML with nested dropdown for DOCKER
    const navbarHTML = `
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top shadow-sm" dir="${isHebrew ? 'rtl' : 'ltr'}">
        <div class="container justify-content-center d-flex">
          <a class="navbar-brand d-flex align-items-center mx-auto" href="${navItems[0].href}">
            <img src="${relativePath}assets/images/bothlogos3.webp" alt="DRONER Logo" height="40" decoding="async" width="120">
          </a>
          <div class="lang-toggle-wrapper position-absolute ${isHebrew ? 'start-0 ms-3' : 'end-0 me-3'} d-flex align-items-center" style="gap:0.5em;">
            <a href="${navItems[navItems.length-1].href}" class="btn btn-outline-dark" style="color:#111 !important;">
              <i class="fas fa-globe" style="color:#111 !important;"></i>
              <span style="display:inline-block; width:0.15em;"></span>
              <strong style="color:#111 !important;">${navItems[navItems.length-1].text}</strong>
            </a>
            <button id="theme-toggle-btn" class="btn btn-icon theme-toggle" type="button" aria-label="Switch theme">
              <i class="fa fa-sun"></i>
            </button>
          </div>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse justify-content-center" id="navbarNav">
            <ul class="navbar-nav mx-auto">
              <li class="nav-item">
                <a class="nav-link" href="${navItems[0].href}">${navItems[0].text}</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="${navItems[1].href}">${navItems[1].text}</a>
              </li>
              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  ${navItems[2].text}
                </a>
                <ul class="dropdown-menu ${isHebrew ? 'text-end' : ''} shadow border-0" style="margin-top:0;">
                  <li><a class="dropdown-item" href="${navItems[2].dropdown[0].href}">${navItems[2].dropdown[0].text}</a></li>
                  <li class="dropdown-submenu ${isHebrew ? 'dropstart' : 'dropend'}" style="position:relative;">
                    <a class="dropdown-item dropdown-toggle" href="#" data-bs-toggle="dropdown" aria-expanded="false">
                      ${navItems[2].dropdown[1].text}
                    </a>
                    <ul class="dropdown-menu shadow border-0 ${isHebrew ? 'text-end' : ''}">
                      <li><a class="dropdown-item" href="${navItems[2].dropdown[1].subDropdown[0].href}">${navItems[2].dropdown[1].subDropdown[0].text}</a></li>
                      <li><a class="dropdown-item" href="${navItems[2].dropdown[1].subDropdown[1].href}">${navItems[2].dropdown[1].subDropdown[1].text}</a></li>
                    </ul>
                  </li>
                  <li><a class="dropdown-item" href="${navItems[2].dropdown[2].href}">${navItems[2].dropdown[2].text}</a></li>
                </ul>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="${navItems[3].href}">${navItems[3].text}</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="${navItems[4].href}">${navItems[4].text}</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="${navItems[5].href}">${navItems[5].text}</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="${navItems[6].href}">${navItems[6].text}</a>
              </li>
              <li class="nav-item">
                <a class="nav-link btn btn-yellow px-3 py-1 ms-2" data-bs-toggle="modal" data-bs-target="#loginModal" style="color:#111 !important;">
                  <i class="fa fa-user" style="color:#111 !important;"></i>
                  <span style="display:inline-block; width:0.15em;"></span>
                  <strong style="color:#111 !important;">${isHebrew ? 'כניסה' : 'Login'}</strong>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    `;

    const loginModalHTML = `
      <div class="modal fade" id="loginModal" tabindex="-1" aria-labelledby="loginModalLabel" aria-hidden="true" dir="${isHebrew ? 'rtl' : 'ltr'}">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content bg-dark text-white border-3 rounded-3 shadow">
            <div class="modal-header">
              <h5 class="modal-title" id="loginModalLabel">${isHebrew ? 'התחברות לקוח' : 'Client Login'}</h5>
              <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <form>
                <div class="mb-3">
                  <label for="loginEmail" class="form-label-plain">${isHebrew ? 'אימייל' : 'Email'}</label>
                  <input type="email" class="form-control-plain" id="loginEmail" required>
                </div>
                <div class="mb-3">
                  <label for="loginPassword" class="form-label-plain">${isHebrew ? 'סיסמה' : 'Password'}</label>
                  <input type="password" class="form-control-plain" id="loginPassword" required>
                </div>
                <div class="mb-3 form-check">
                  <input type="checkbox" class="form-check-input" id="rememberMe">
                  <label class="form-check-label" for="rememberMe">${isHebrew ? 'זכור אותי' : 'Remember me'}</label>
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">${isHebrew ? 'סגור' : 'Close'}</button>
              <button type="button" class="btn btn-warning">${isHebrew ? 'התחבר' : 'Login'}</button>
            </div>
          </div>
        </div>
      </div>
    `;

    // Insert theme toggle button next to language toggle
    return navbarHTML + loginModalHTML;
  }

  function addNavbarStyles() {
    if (document.getElementById('navbar-styles')) return; // Prevent duplicate styles
    
    const style = document.createElement('style');
    style.id = 'navbar-styles';
    style.textContent = `
      /* DRONER Unified Navbar Styles */
      .navbar {
        padding: 0.5rem 1rem;
        background-color: var(--color-dark-bg, #1E1E1E) !important;
        box-shadow: 0 8px 32px rgba(57,169,220,0.10);
        border-bottom: 1px solid rgba(57,169,220,0.1);
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        width: 100%;
        z-index: 1030;
      }
      
      /* Fix for index page specifically */
      body.home .navbar,
      body[class*="index"] .navbar,
      .index-page .navbar {
        position: fixed !important;
        top: 0 !important;
        left: 0 !important;
        right: 0 !important;
        z-index: 1030 !important;
      }
      
      /* Extra styles to counter any potential overrides */
      .navbar.fixed-top {
        position: fixed !important;
        top: 0 !important;
        right: 0 !important;
        left: 0 !important;
        z-index: 1030 !important;
      }
      
      .navbar-brand img {
        height: 52px;
        width: auto;
        transition: transform 0.2s ease;
      }
      
      .navbar-brand:hover img {
        transform: scale(1.05);
      }
      
      .nav-link {
        font-size: 1rem;
        color: var(--color-light, #f4f4f4) !important;
        transition: all 0.2s ease;
        font-weight: 500;
        position: relative;
        margin: 0 0.2rem;
      }
      
      .nav-link:hover,
      .nav-link.active {
        color: var(--color-gold, #39A9DC) !important;
        background-color: rgba(57,169,220,0.1);
        border-radius: 8px;
        transform: translateY(-1px);
      }
      
      .dropdown-menu {
        background-color: var(--color-dark-bg, #1E1E1E) !important;
        border: 1px solid var(--color-gold, #39A9DC);
        border-radius: 12px;
        box-shadow: 0 8px 32px rgba(57,169,220,0.2);
        padding: 0.5rem 0;
        margin-top: 0.5rem;
      }
      
      .dropdown-item {
        color: var(--color-light, #f4f4f4) !important;
        padding: 0.5rem 1rem;
        transition: all 0.2s ease;
        font-weight: 500;
      }
      
      .dropdown-item:hover {
        background-color: var(--color-gold, #39A9DC) !important;
        color: var(--color-black, #1E1E1E) !important;
        transform: translateX(5px);
      }
      
      .btn-yellow {
        background: var(--color-gold, #39A9DC) !important;
        color: var(--color-black, #1E1E1E) !important;
        border: 2px solid var(--color-gold, #39A9DC);
        border-radius: 25px;
        font-weight: 600;
        transition: all 0.2s ease;
        text-decoration: none;
      }
      
      .btn-yellow:hover {
        background: var(--color-brand, #2A5D94) !important;
        color: var(--color-white, #fff) !important;
        border-color: var(--color-brand, #2A5D94);
        transform: translateY(-2px);
        box-shadow: 0 4px 15px rgba(57,169,220,0.3);
      }
      
      .btn-outline-dark {
        color: var(--color-gold, #39A9DC) !important;
        border-color: var(--color-gold, #39A9DC) !important;
        background: transparent;
        border-radius: 20px;
        font-weight: 500;
        transition: all 0.2s ease;
      }
      
      .btn-outline-dark:hover {
        background: var(--color-gold, #39A9DC) !important;
        color: var(--color-black, #1E1E1E) !important;
        transform: translateY(-1px);
      }
      
      /* Theme toggle button styles */
      #theme-toggle-btn {
        color: var(--color-light, #f4f4f4) !important;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0;
        border: 1px solid var(--color-gold, #39A9DC);
        background: transparent;
        transition: all 0.2s ease;
      }
      
      #theme-toggle-btn:hover {
        background: var(--color-gold, #39A9DC) !important;
        transform: translateY(-1px);
      }
      
      #theme-toggle-btn .fa-sun,
      #theme-toggle-btn .fa-moon {
        color: var(--color-light, #f4f4f4) !important;
        font-size: 1.2rem;
      }
      
      html[data-theme="light"] #theme-toggle-btn,
      html[data-theme="light"] #theme-toggle-btn .fa-moon {
        color: #222 !important;
      }
      
      .btn-icon.theme-toggle {
        min-width: 40px;
      }
      
      /* Mobile responsive */
      @media (max-width: 991.98px) {
        .navbar-collapse {
          background: var(--color-dark-bg, #1E1E1E);
          border-radius: 0 0 18px 18px;
          box-shadow: 0 4px 18px rgba(0,0,0,0.10);
          margin-top: 0.5rem;
          padding: 1rem;
        }
        
        .navbar-nav {
          flex-direction: column !important;
          align-items: flex-start !important;
          gap: 0.2rem !important;
          width: 100%;
        }
        
        .nav-item {
          width: 100%;
        }
        
        .nav-link {
          width: 100%;
          padding: 0.7rem 1rem;
          text-align: right;
          border-radius: 8px;
        }
        
        .dropdown-menu {
          position: static !important;
          float: none;
          box-shadow: none;
          width: 100% !important;
          border: none;
          background: rgba(57,169,220,0.05) !important;
          margin: 0.5rem 0;
        }
        
        .lang-toggle-wrapper {
          position: static !important;
          margin: 0.5rem 0 !important;
          order: -1;
        }
        
        .btn-yellow {
          width: 100%;
          text-align: center;
          margin-top: 0.5rem;
        }
      }
      
      /* Login Modal Styles */
      .modal-content {
        background: var(--color-dark-bg, #1E1E1E) !important;
        border: 3px solid var(--color-gold, #39A9DC) !important;
        box-shadow: 0 20px 60px rgba(57,169,220,0.3);
      }
      
      .modal-header, .modal-footer {
        border-color: var(--color-brand, #2A5D94) !important;
      }
      
      .modal-title {
        color: var(--color-gold, #39A9DC) !important;
        font-weight: 600;
      }
      
      .form-label-plain {
        color: var(--color-white, #fff) !important;
        font-weight: 500;
        margin-bottom: 0.5rem;
        display: block;
      }
      
      .form-control-plain {
        background: #22304A !important;
        color: var(--color-light, #f4f4f4) !important;
        border: none !important;
        border-radius: 10px;
        padding: 0.75rem 1rem;
        width: 100%;
        font-size: 1rem;
        outline: none;
        transition: all 0.2s ease;
      }
      
      .form-control-plain:focus {
        background: #2A3A5A !important;
        color: var(--color-light, #f4f4f4) !important;
        box-shadow: 0 0 0 3px rgba(57,169,220,0.25);
        outline: none;
      }
      
      .form-check-input:checked {
        background-color: var(--color-gold, #39A9DC);
        border-color: var(--color-gold, #39A9DC);
      }
      
      .btn-close-white {
        filter: brightness(0) saturate(100%) invert(75%) sepia(66%) saturate(2532%) hue-rotate(170deg) brightness(91%) contrast(87%);
      }
      
      .btn-warning {
        background: var(--color-gold, #39A9DC) !important;
        border-color: var(--color-gold, #39A9DC) !important;
        color: var(--color-black, #1E1E1E) !important;
        font-weight: 600;
      }
      
      .btn-warning:hover {
        background: var(--color-brand, #2A5D94) !important;
        border-color: var(--color-brand, #2A5D94) !important;
        color: var(--color-white, #fff) !important;
      }
    `;
    
    document.head.appendChild(style);
  }

  // Inject style to force light backgrounds and dark text on cards/sections in light mode
  function addLightCardTextOverrides() {
    let style = document.getElementById('theme-light-overrides');
    if (!style) {
      style = document.createElement('style');
      style.id = 'theme-light-overrides';
      style.textContent = `
        /* General page background */
        html[data-theme="light"] body {
          background-color: #f4f4f4 !important;
          color: #222 !important;
        }
        
        /* Make navbar hamburger icon (toggler) dark in light theme */
        html[data-theme="light"] .navbar-toggler-icon {
          background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='rgba%280, 0, 0, 0.75%29' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e") !important;
        }
        
        html[data-theme="light"] .navbar-toggler {
          border-color: rgba(0, 0, 0, 0.3) !important;
        }
        
        html[data-theme="light"] .navbar-toggler:focus {
          box-shadow: 0 0 0 0.25rem rgba(42, 93, 148, 0.25) !important;
        }
        
        /* Main card backgrounds and about/careers specific cards/sections */
        html[data-theme="light"] body .card,
        html[data-theme="light"] body .gsmart-card,
        html[data-theme="light"] body .gdock-card,
        html[data-theme="light"] body .advantage-card,
        html[data-theme="light"] body .solution-card,
        html[data-theme="light"] body .use-case-card,
        html[data-theme="light"] body .cta-card,
        html[data-theme="light"] body .contact-section,
        html[data-theme="light"] body .contact-info-card,
        html[data-theme="light"] body .main-footer-modern,
        html[data-theme="light"] body .modal-content,
        html[data-theme="light"] body .about-card,
        html[data-theme="light"] body .about-feature-card,
        html[data-theme="light"] body .about-advantage-card,
        html[data-theme="light"] body .about-section-card,
        html[data-theme="light"] body .about-section,
        html[data-theme="light"] body .about-content,
        html[data-theme="light"] body .careers-card,
        html[data-theme="light"] body .careers-section,
        html[data-theme="light"] body .careers-feature-card,
        html[data-theme="light"] body .careers-content,
        html[data-theme="light"] body .careers-list,
        html[data-theme="light"] body .feature-tile {
          background-color: #fff !important;
          color: #222 !important;
          box-shadow: 0 2px 12px rgba(42,93,148,0.07) !important;
          border-color: #e3eaf3 !important;
        }
        
        /* Text inside cards properly colored in light theme */
        html[data-theme="light"] body .card p,
        html[data-theme="light"] body .gsmart-card p,
        html[data-theme="light"] body .gdock-card p,
        html[data-theme="light"] body .advantage-card p,
        html[data-theme="light"] body .solution-card p,
        html[data-theme="light"] body .use-case-card p,
        html[data-theme="light"] body .cta-card p,
        html[data-theme="light"] body .cta-desc,
        html[data-theme="light"] body .contact-section p,
        html[data-theme="light"] body .contact-info-card p,
        html[data-theme="light"] body .about-card p,
        html[data-theme="light"] body .about-section p,
        html[data-theme="light"] body .careers-card p {
          color: #444 !important;
        }
        
        /* Feature tiles: very light blue */
        html[data-theme="light"] body .feature-tile {
          background-color: #f4f8fb !important;
          color: #234 !important;
          border-color: #dbeafe !important;
          box-shadow: 0 2px 12px rgba(42,93,148,0.06) !important;
        }
        /* Flip cards: very light blue/gray */
        html[data-theme="light"] body .gsmart-advantage-flip-card,
        html[data-theme="light"] body .gsmart-advantage-flip-front,
        html[data-theme="light"] body .gsmart-advantage-flip-back,
        html[data-theme="light"] body .gdock-advantage-card,
        html[data-theme="light"] body .gdock-advantage-flip-card,
        html[data-theme="light"] body .gdock-advantage-flip-front,
        html[data-theme="light"] body .gdock-advantage-flip-back {
          background-color: #f7faff !important;
          color: #2A5D94 !important;
          border-color: #dbeafe !important;
          box-shadow: 0 2px 12px rgba(42,93,148,0.06) !important;
        }
        /* Glass, holo, orbit, cube, futuristic cards: off-white */
        html[data-theme="light"] body .glass-card,
        html[data-theme="light"] body .holo-card,
        html[data-theme="light"] body .orbit-card,
        html[data-theme="light"] body .futuristic-adv-card,
        html[data-theme="light"] body .cube-face {
          background-color: #f7f7fa !important;
          color: #2A5D94 !important;
          border-color: #e3eaf3 !important;
          box-shadow: 0 2px 12px rgba(42,93,148,0.06) !important;
        }
        /* Fix for text in glass, holo, orbit, cube, futuristic cards */
        html[data-theme="light"] body .glass-card p,
        html[data-theme="light"] body .holo-card p, 
        html[data-theme="light"] body .orbit-card p,
        html[data-theme="light"] body .futuristic-adv-card p,
        html[data-theme="light"] body .cube-face p,
        html[data-theme="light"] body .advantage-text {
          color: #444 !important;
        }
        /* Section backgrounds */
        html[data-theme="light"] .section-wrap,
        html[data-theme="light"] .about-hero {
          background-color: #f7f7fa !important;
          color: #222 !important;
        }
        /* Hero/banner section: white background, dark headline */
        html[data-theme="light"] .hero-section {
          background-color: #fff !important;
        }
        html[data-theme="light"] .hero-section h1,
        html[data-theme="light"] .hero-section .section-title,
        html[data-theme="light"] .about-hero h1,
        html[data-theme="light"] .about-hero .section-title {
          color: #2A5D94 !important;
          text-shadow: none !important;
        }
        html[data-theme="light"] .hero-section p,
        html[data-theme="light"] .hero-section .lead,
        html[data-theme="light"] .about-hero p,
        html[data-theme="light"] .about-hero .lead {
          color: #444 !important;
          text-shadow: none !important;
        }
        /* Section titles and lines */
        html[data-theme="light"] .section-title,
        html[data-theme="light"] h1,
        html[data-theme="light"] h2,
        html[data-theme="light"] h3,
        html[data-theme="light"] h4,
        html[data-theme="light"] h5,
        html[data-theme="light"] h6 {
          color: #2A5D94 !important;
          text-shadow: none !important;
        }
        html[data-theme="light"] .section-line {
          background: #2A5D94 !important;
        }
        /* Buttons */
        html[data-theme="light"] .btn,
        html[data-theme="light"] .btn-yellow,
        html[data-theme="light"] .btn-warning {
          background: #2A5D94 !important;
          color: #fff !important;
          border-color: #2A5D94 !important;
        }
        html[data-theme="light"] .btn-outline-dark {
          color: #2A5D94 !important;
          border-color: #2A5D94 !important;
          background: transparent !important;
        }
        html[data-theme="light"] .btn-outline-dark:hover {
          background: #2A5D94 !important;
          color: #fff !important;
        }
        /* Inputs */
        html[data-theme="light"] .form-control,
        html[data-theme="light"] .form-label,
        html[data-theme="light"] .form-label-plain,
        html[data-theme="light"] .form-control-plain {
          background: #f4f4f4 !important;
          color: #222 !important;
          border-color: #2A5D94 !important;
        }
        html[data-theme="light"] .form-control:focus,
        html[data-theme="light"] .form-control-plain:focus {
          background: #fff !important;
          color: #222 !important;
          box-shadow: 0 0 0 3px rgba(42,93,148,0.18) !important;
        }
        /* Dropdowns */
        html[data-theme="light"] .dropdown-menu {
          background: #fff !important;
          color: #222 !important;
          border-color: #2A5D94 !important;
        }
        html[data-theme="light"] .dropdown-item {
          color: #222 !important;
        }
        html[data-theme="light"] .dropdown-item:hover {
          background: #2A5D94 !important;
          color: #fff !important;
        }
        /* Icons */
        html[data-theme="light"] .fa,
        html[data-theme="light"] .fas,
        html[data-theme="light"] .far,
        html[data-theme="light"] .fab,
        html[data-theme="light"] .gsmart-feature-icon,
        html[data-theme="light"] .gsmart-advantage-card .fa,
        html[data-theme="light"] .gsmart-advantage-flip-card .fa,
        html[data-theme="light"] .advantage-icon,
        html[data-theme="light"] .use-case-icon {
          color: #2A5D94 !important;
        }
        /* Main footer gradient */
        html[data-theme="light"] .main-footer-modern {
          background: linear-gradient(120deg, #f4f4f4 70%, #2A5D94 120%) !important;
        }
        /* Footer links proper color in light theme */
        html[data-theme="light"] .main-footer-modern .footer-link {
          color: #333 !important;
        }
        html[data-theme="light"] .main-footer-modern .footer-link:hover, 
        html[data-theme="light"] .main-footer-modern .footer-link:focus {
          color: #2A5D94 !important;
        }
        html[data-theme="light"] .main-footer-modern .footer-copyright {
          color: #444 !important;
        }

        /* Banner text block: light blue background and dark text in light theme (NEW SPECIFIC COLOR) */
        html[data-theme="light"] .top-image-section-text {
          background: #dce8f7 !important;
          background-color: #dce8f7 !important;
          color: #2A5D94 !important;
        }
        html[data-theme="light"] .top-image-section-text h2 {
          color: #2A5D94 !important;
          text-shadow: none !important;
        }
        html[data-theme="light"] .top-image-section-text p {
          color: #444 !important;
        }
        html[data-theme="light"] .top-image-section-text .learn-more-btn {
          background: #2A5D94 !important;
          color: #fff !important;
          border-color: #2A5D94 !important;
        }
        html[data-theme="light"] .top-image-section-text .learn-more-btn:hover {
          background: #fff !important;
          color: #2A5D94 !important;
          border-color: #2A5D94 !important;
        }
        
        /* Fix for arrow in the "גלה עוד" (Learn More) button */
        .learn-more-btn i,
        .learn-more-btn .fa,
        .learn-more-btn .fas,
        .learn-more-btn .fa-arrow-right,
        .learn-more-btn .fa-arrow-left {
          color: inherit !important;
        }
        /* In dark theme, make sure the arrow matches the button text color */
        html[data-theme="dark"] .learn-more-btn i,
        html[data-theme="dark"] .learn-more-btn .fa,
        html[data-theme="dark"] .learn-more-btn .fas,
        html[data-theme="dark"] .learn-more-btn .fa-arrow-right,
        html[data-theme="dark"] .learn-more-btn .fa-arrow-left {
          color: #fff !important;
        }
        /* In light theme, make sure arrow color adapts to button state */
        html[data-theme="light"] .top-image-section-text .learn-more-btn i,
        html[data-theme="light"] .top-image-section-text .learn-more-btn .fa {
          color: #fff !important;
        }
        html[data-theme="light"] .top-image-section-text .learn-more-btn:hover i,
        html[data-theme="light"] .top-image-section-text .learn-more-btn:hover .fa {
          color: #2A5D94 !important;
        }

        /* Force all .gdock-card and .gdock-card-content to be fully light in light theme */
        html[data-theme="light"] body .gdock-card,
        html[data-theme="light"] body .gdock-card[style] {
          background: #fff !important;
          background-color: #fff !important;
          background-image: none !important;
          color: #222 !important;
          border-color: #e3eaf3 !important;
          box-shadow: 0 2px 12px rgba(42,93,148,0.07) !important;
        }
        html[data-theme="light"] body .gdock-card-content,
        html[data-theme="light"] body .gdock-card-content[style] {
          background: #fff !important;
          background-color: #fff !important;
          color: #222 !important;
          border: none !important;
          box-shadow: none !important;
        }
        /* Fix for any text inside gdock-card-content */
        html[data-theme="light"] body .gdock-card-content p {
          color: #444 !important;
        }
        /* Also force .feature-tile and .feature-tile.bg-dark to be light */
        html[data-theme="light"] body .feature-tile,
        html[data-theme="light"] body .feature-tile.bg-dark,
        html[data-theme="light"] body .feature-tile.bg-dark.bg-opacity-75 {
          background: #f4f8fb !important;
          background-color: #f4f8fb !important;
          background-image: none !important;
          color: #234 !important;
          border-color: #dbeafe !important;
          box-shadow: 0 2px 12px rgba(42,93,148,0.06) !important;
        }

        /* --- CONTROLLER PAGE ADVANTAGE CARDS FIX: Ensure consistent colors with other product pages --- */
        html[data-theme="light"] body .gcontrol-advantage-card,
        html[data-theme="light"] body .gcontrol-advantage-flip-card,
        html[data-theme="light"] body .gcontrol-advantage-flip-front,
        html[data-theme="light"] body .gcontrol-advantage-flip-back,
        html[data-theme="light"] body .gsmart-advantage-card,
        html[data-theme="light"] body .gdock-advantage-card,
        html[data-theme="light"] body .gsmart-advantage-flip-card,
        html[data-theme="light"] body .gdock-advantage-flip-card,
        html[data-theme="light"] body .gsmart-advantage-flip-front,
        html[data-theme="light"] body .gsmart-advantage-flip-back,
        html[data-theme="light"] body .gdock-advantage-flip-front,
        html[data-theme="light"] body .gdock-advantage-flip-back {
          background: #f7faff !important;
          background-color: #f7faff !important;
          background-image: none !important;
          color: #2A5D94 !important;
          border-color: #dbeafe !important;
          box-shadow: 0 2px 12px rgba(42,93,148,0.06) !important;
        }
        
        /* Fix for text inside advantage cards */
        html[data-theme="light"] body .gsmart-advantage-card p,
        html[data-theme="light"] body .gdock-advantage-card p,
        html[data-theme="light"] body .gcontrol-advantage-card p,
        html[data-theme="light"] body .gsmart-advantage-flip-card p,
        html[data-theme="light"] body .gdock-advantage-flip-card p,
        html[data-theme="light"] body .gcontrol-advantage-flip-card p,
        html[data-theme="light"] body .gsmart-advantage-flip-front p,
        html[data-theme="light"] body .gsmart-advantage-flip-back p,
        html[data-theme="light"] body .gdock-advantage-flip-front p,
        html[data-theme="light"] body .gdock-advantage-flip-back p,
        html[data-theme="light"] body .gcontrol-advantage-flip-front p,
        html[data-theme="light"] body .gcontrol-advantage-flip-back p {
          color: #444 !important;
        }
        
        /* --- FIX SUBLINE TEXT AFTER HEADLINE IN FEATURES SECTIONS --- */
        html[data-theme="light"] .feature-subtitle,
        html[data-theme="light"] .product-subtitle,
        html[data-theme="light"] .product-section .subtitle,
        html[data-theme="light"] .product-feature .subtitle,
        html[data-theme="light"] .gdock-feature-subtitle,
        html[data-theme="light"] .gsmart-feature-subtitle {
          color: #444 !important;
        }
        
        /* --- FIX TEXT BELOW IMAGES IN PRODUCT PAGES (KEEP LIGHT ON DARK) --- */
        html[data-theme="light"] .image-caption,
        html[data-theme="light"] .product-image-caption,
        html[data-theme="light"] .image-description,
        html[data-theme="light"] .gdock-image-caption,
        html[data-theme="light"] .product-img-caption,
        html[data-theme="light"] figcaption,
        html[data-theme="light"] .figure-caption,
        html[data-theme="light"] .image-container .caption,
        html[data-theme="light"] .product-image-container .caption {
          color: rgba(255, 255, 255, 0.9) !important;
          background: rgba(0, 0, 0, 0.7) !important;
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.8) !important;
        }
        
        /* --- FIX EMAIL ADDRESS IN CTA CARD (CAREERS PAGE) --- */
        html[data-theme="light"] body .cta-card a:not(.btn),
        html[data-theme="light"] body .cta-card .cta-email,
        html[data-theme="light"] body .cta-card .email,
        html[data-theme="light"] body .cta-card a[href^="mailto:"] {
          color: #fff !important;
          text-decoration: underline !important;
          font-weight: 500 !important;
        }
        html[data-theme="light"] body .cta-card a:not(.btn):hover,
        html[data-theme="light"] body .cta-card .cta-email:hover,
        html[data-theme="light"] body .cta-card .email:hover,
        html[data-theme="light"] body .cta-card a[href^="mailto:"]:hover {
          color: #f0f0f0 !important;
          text-decoration: none !important;
        }

        /* --- ADVANTAGE CARDS: Force light scheme for all product advantages cards in light theme --- */
        html[data-theme="light"] body .gsmart-advantage-card *,
        html[data-theme="light"] body .gdock-advantage-card *,
        html[data-theme="light"] body .gcontrol-advantage-card *,
        html[data-theme="light"] body .gsmart-advantage-flip-card *,
        html[data-theme="light"] body .gdock-advantage-flip-card *,
        html[data-theme="light"] body .gcontrol-advantage-flip-card *,
        html[data-theme="light"] body .gsmart-advantage-flip-front *,
        html[data-theme="light"] body .gsmart-advantage-flip-back *,
        html[data-theme="light"] body .gdock-advantage-flip-front *,
        html[data-theme="light"] body .gdock-advantage-flip-back *,
        html[data-theme="light"] body .gcontrol-advantage-flip-front *,
        html[data-theme="light"] body .gcontrol-advantage-flip-back * {
          color: #2A5D94 !important;
          background: transparent !important;
          background-color: transparent !important;
          border-color: #dbeafe !important;
        }
        
        /* Ensure good contrast for advantage card headings */
        html[data-theme="light"] body .gsmart-advantage-card h3,
        html[data-theme="light"] body .gdock-advantage-card h3,
        html[data-theme="light"] body .gcontrol-advantage-card h3,
        html[data-theme="light"] body .gsmart-advantage-card h4,
        html[data-theme="light"] body .gdock-advantage-card h4,
        html[data-theme="light"] body .gcontrol-advantage-card h4,
        html[data-theme="light"] body .gsmart-advantage-card .advantage-title,
        html[data-theme="light"] body .gdock-advantage-card .advantage-title,
        html[data-theme="light"] body .gcontrol-advantage-card .advantage-title,
        html[data-theme="light"] body .gsmart-advantage-flip-card h3,
        html[data-theme="light"] body .gdock-advantage-flip-card h3,
        html[data-theme="light"] body .gcontrol-advantage-flip-card h3,
        html[data-theme="light"] body .gsmart-advantage-flip-card h4,
        html[data-theme="light"] body .gdock-advantage-flip-card h4,
        html[data-theme="light"] body .gcontrol-advantage-flip-card h4,
        html[data-theme="light"] body .gsmart-advantage-flip-card .advantage-title,
        html[data-theme="light"] body .gdock-advantage-flip-card .advantage-title,
        html[data-theme="light"] body .gcontrol-advantage-flip-card .advantage-title {
          color: #2A5D94 !important;
        }
        
        html[data-theme="light"] body .gsmart-advantage-card .fa,
        html[data-theme="light"] body .gdock-advantage-card .fa,
        html[data-theme="light"] body .gcontrol-advantage-card .fa,
        html[data-theme="light"] body .gsmart-advantage-flip-card .fa,
        html[data-theme="light"] body .gdock-advantage-flip-card .fa,
        html[data-theme="light"] body .gcontrol-advantage-flip-card .fa {
          color: #2A5D94 !important;
        }

        /* --- FORCE LIGHT THEME FOR ADVANTAGE FLIP CARDS (SMARTER, DOCKER, CONTROLLER) --- */
        html[data-theme="light"] body .gsmart-advantage-flip-card,
        html[data-theme="light"] body .gdock-advantage-flip-card,
        html[data-theme="light"] body .gcontrol-advantage-flip-card {
          background: #f7faff !important;
          background-color: #f7faff !important;
          background-image: none !important;
          color: #2A5D94 !important;
          border-color: #dbeafe !important;
          box-shadow: 0 2px 12px rgba(42,93,148,0.06) !important;
        }
        html[data-theme="light"] body .gsmart-advantage-flip-front,
        html[data-theme="light"] body .gdock-advantage-flip-front,
        html[data-theme="light"] body .gcontrol-advantage-flip-front,
        html[data-theme="light"] body .gsmart-advantage-flip-back,
        html[data-theme="light"] body .gdock-advantage-flip-back,
        html[data-theme="light"] body .gcontrol-advantage-flip-back {
          background: #f7faff !important;
          background-color: #f7faff !important;
          background-image: none !important;
          color: #2A5D94 !important;
          border-color: #dbeafe !important;
          box-shadow: 0 2px 12px rgba(42,93,148,0.06) !important;
        }
        html[data-theme="light"] body .gsmart-advantage-flip-card *,
        html[data-theme="light"] body .gdock-advantage-flip-card *,
        html[data-theme="light"] body .gcontrol-advantage-flip-card *,
        html[data-theme="light"] body .gsmart-advantage-flip-front *,
        html[data-theme="light"] body .gdock-advantage-flip-front *,
        html[data-theme="light"] body .gcontrol-advantage-flip-front *,
        html[data-theme="light"] body .gsmart-advantage-flip-back *,
        html[data-theme="light"] body .gdock-advantage-flip-back *,
        html[data-theme="light"] body .gcontrol-advantage-flip-back * {
          color: #2A5D94 !important;
          background: transparent !important;
          background-color: transparent !important;
          border-color: #dbeafe !important;
        }
        
        /* Ensure good contrast for flip card text */
        html[data-theme="light"] body .gsmart-advantage-flip-front p,
        html[data-theme="light"] body .gdock-advantage-flip-front p,
        html[data-theme="light"] body .gcontrol-advantage-flip-front p,
        html[data-theme="light"] body .gsmart-advantage-flip-back p,
        html[data-theme="light"] body .gdock-advantage-flip-back p,
        html[data-theme="light"] body .gcontrol-advantage-flip-back p,
        html[data-theme="light"] body .gsmart-advantage-flip-front .advantage-text,
        html[data-theme="light"] body .gdock-advantage-flip-front .advantage-text,
        html[data-theme="light"] body .gcontrol-advantage-flip-front .advantage-text,
        html[data-theme="light"] body .gsmart-advantage-flip-back .advantage-text,
        html[data-theme="light"] body .gdock-advantage-flip-back .advantage-text,
        html[data-theme="light"] body .gcontrol-advantage-flip-back .advantage-text {
          color: #444 !important;
        }
        
        html[data-theme="light"] body .gsmart-advantage-flip-card .fa,
        html[data-theme="light"] body .gdock-advantage-flip-card .fa,
        html[data-theme="light"] body .gcontrol-advantage-flip-card .fa,
        html[data-theme="light"] body .gsmart-advantage-flip-front .fa,
        html[data-theme="light"] body .gdock-advantage-flip-front .fa,
        html[data-theme="light"] body .gcontrol-advantage-flip-front .fa,
        html[data-theme="light"] body .gsmart-advantage-flip-back .fa,
        html[data-theme="light"] body .gdock-advantage-flip-back .fa,
        html[data-theme="light"] body .gcontrol-advantage-flip-back .fa {
          color: #2A5D94 !important;
        }
        /* Remove any inline background on flip cards in light theme */
        html[data-theme="light"] body .gsmart-advantage-flip-card[style],
        html[data-theme="light"] body .gdock-advantage-flip-card[style],
        html[data-theme="light"] body .gcontrol-advantage-flip-card[style],
        html[data-theme="light"] body .gsmart-advantage-flip-front[style],
        html[data-theme="light"] body .gdock-advantage-flip-front[style],
        html[data-theme="light"] body .gcontrol-advantage-flip-front[style],
        html[data-theme="light"] body .gsmart-advantage-flip-back[style],
        html[data-theme="light"] body .gdock-advantage-flip-back[style],
        html[data-theme="light"] body .gcontrol-advantage-flip-back[style] {
          background: #f7faff !important;
          background-color: #f7faff !important;
          background-image: none !important;
        }

        /* --- END OF ADVANTAGE FLIP CARDS OVERRIDES --- */
        
        /* --- CTA CARD: Ensure proper contrast in light theme --- */
        html[data-theme="light"] body .cta-card {
          background: #2A5D94 !important;
          color: #fff !important;
        }
        html[data-theme="light"] body .cta-card h2,
        html[data-theme="light"] body .cta-card h3,
        html[data-theme="light"] body .cta-card .cta-title {
          color: #fff !important;
        }
        html[data-theme="light"] body .cta-card p,
        html[data-theme="light"] body .cta-card .cta-desc {
          color: #fff !important;
        }
        html[data-theme="light"] body .cta-card .btn,
        html[data-theme="light"] body .cta-card a.btn {
          background: #fff !important;
          color: #2A5D94 !important;
          border-color: #fff !important;
        }
        html[data-theme="light"] body .cta-card .btn:hover,
        html[data-theme="light"] body .cta-card a.btn:hover {
          background: transparent !important;
          color: #fff !important;
          border-color: #fff !important;
        }
        
        /* --- Footer contact info: text black, icons dark blue in light theme --- */
        html[data-theme="light"] .main-footer-modern .footer-contact-info,
        html[data-theme="light"] .main-footer-modern .footer-contact-link,
        html[data-theme="light"] .main-footer-modern .footer-contact-info *,
        html[data-theme="light"] .main-footer-modern .footer-contact-link * {
          color: #222 !important;
        }
        html[data-theme="light"] .main-footer-modern .footer-contact-icon,
        html[data-theme="light"] .main-footer-modern .footer-contact-icon *,
        html[data-theme="light"] .main-footer-modern .footer-contact-info .fa,
        html[data-theme="light"] .main-footer-modern .footer-contact-link .fa {
          color: #2A5D94 !important;
        }

        /* --- Navbar fixes in light theme --- */
        html[data-theme="light"] .navbar {
          background-color: #f4f4f4 !important;
        }
        html[data-theme="light"] .navbar .nav-link {
          color: #222 !important;
        }
        html[data-theme="light"] .navbar .nav-link:hover,
        html[data-theme="light"] .navbar .nav-link:focus,
        html[data-theme="light"] .navbar .nav-link.active {
          color: #2A5D94 !important;
          background-color: rgba(42,93,148,0.1);
        }

        /* --- Login button in navbar: white bg, dark blue text/icon/border in light theme --- */
        html[data-theme="light"] .navbar .btn-yellow {
          background: #fff !important;
          color: #2A5D94 !important;
          border: 2px solid #2A5D94 !important;
        }
        html[data-theme="light"] .navbar .btn-yellow *,
        html[data-theme="light"] .navbar .btn-yellow .fa,
        html[data-theme="light"] .navbar .btn-yellow .fa-user {
          color: #2A5D94 !important;
        }
        html[data-theme="light"] .navbar .btn-yellow:hover,
        html[data-theme="light"] .navbar .btn-yellow:focus {
          background: #2A5D94 !important;
          color: #fff !important;
          border-color: #2A5D94 !important;
        }
        html[data-theme="light"] .navbar .btn-yellow:hover *,
        html[data-theme="light"] .navbar .btn-yellow:focus *,
        html[data-theme="light"] .navbar .btn-yellow:hover .fa,
        html[data-theme="light"] .navbar .btn-yellow:focus .fa,
        html[data-theme="light"] .navbar .btn-yellow:hover .fa-user,
        html[data-theme="light"] .navbar .btn-yellow:focus .fa-user {
          color: #fff !important;
        }

        /* --- Product hero/feature section fixes for light theme (force color) --- */
        /* Subtitle (e.g., שליטה אוטונומית, בינה מלאכותית...) */
        html[data-theme="light"] .product-hero-subtitle,
        html[data-theme="light"] .product-hero .subtitle,
        html[data-theme="light"] .product-hero .product-subtitle,
        html[data-theme="light"] .product-feature-subtitle,
        html[data-theme="light"] .product-feature .subtitle,
        html[data-theme="light"] .product-feature .product-subtitle,
        html[data-theme="light"] .product-hero .subtitle *,
        html[data-theme="light"] .product-feature .subtitle *,
        html[data-theme="light"] .product-hero-subtitle *,
        html[data-theme="light"] .product-feature-subtitle *,
        html[data-theme="light"] .product-hero h2,
        html[data-theme="light"] .product-feature h2 {
          color: #444 !important;
        }
        /* Main product title (e.g., SMARTER – קיט שליטה חכמה) */
        html[data-theme="light"] .product-hero-title,
        html[data-theme="light"] .product-hero .title,
        html[data-theme="light"] .product-hero .product-title,
        html[data-theme="light"] .product-feature-title,
        html[data-theme="light"] .product-feature .title,
        html[data-theme="light"] .product-feature .product-title,
        html[data-theme="light"] .product-hero .title *,
        html[data-theme="light"] .product-feature .title *,
        html[data-theme="light"] .product-hero-title *,
        html[data-theme="light"] .product-feature-title *,
        html[data-theme="light"] .product-hero h1,
        html[data-theme="light"] .product-feature h1 {
          color: #2A5D94 !important;
        }
        /* In dark theme, force main product title to be white for contrast */
        html[data-theme="dark"] .product-hero-title,
        html[data-theme="dark"] .product-hero .title,
        html[data-theme="dark"] .product-hero .product-title,
        html[data-theme="dark"] .product-feature-title,
        html[data-theme="dark"] .product-feature .title,
        html[data-theme="dark"] .product-feature .product-title,
        html[data-theme="dark"] .product-hero .title *,
        html[data-theme="dark"] .product-feature .title *,
        html[data-theme="dark"] .product-hero-title *,
        html[data-theme="dark"] .product-feature-title *,
        html[data-theme="dark"] .product-hero h1,
        html[data-theme="dark"] .product-feature h1 {
          color: #fff !important;
        }

        /* Fallback: force all h1/h2 in .product-hero or .product-feature */
        html[data-theme="light"] .product-hero h1,
        html[data-theme="light"] .product-feature h1 {
          color: #2A5D94 !important;
        }
        html[data-theme="light"] .product-hero h2,
        html[data-theme="light"] .product-feature h2 {
          color: #444 !important;
        }
        html[data-theme="dark"] .product-hero h1,
        html[data-theme="dark"] .product-feature h1 {
          color: #fff !important;
        }
        html[data-theme="dark"] .product-hero h2,
        html[data-theme="dark"] .product-feature h2 {
          color: #fff !important;
        }

        /* Also force language toggle and theme toggle icons/text to be dark in light theme for contrast */
        html[data-theme="light"] .navbar .lang-toggle-wrapper .btn-outline-dark,
        html[data-theme="light"] .navbar .lang-toggle-wrapper .btn-outline-dark * ,
        html[data-theme="light"] .navbar .lang-toggle-wrapper .fa-globe,
        html[data-theme="light"] .navbar .lang-toggle-wrapper .fa-moon {
          color: #222 !important;
        }
        
        html[data-theme="light"] .navbar .lang-toggle-wrapper .fa-sun {
          color: #222 !important;
        }
        
        /* Fix for timeline elements */
        html[data-theme="light"] .advantage-timeline-content,
        html[data-theme="light"] .d135-timeline-card,
        html[data-theme="light"] .gdock-timeline-card,
        html[data-theme="light"] .gdock-step-content {
          background: #f7faff !important;
          color: #222 !important;
          border-color: #e3eaf3 !important;
        }
        
        html[data-theme="light"] .advantage-timeline-content h4,
        html[data-theme="light"] .d135-timeline-card h4,
        html[data-theme="light"] .gdock-timeline-card h4,
        html[data-theme="light"] .gdock-step-content h4 {
          color: #2A5D94 !important;
        }
        
        html[data-theme="light"] .advantage-timeline-content p,
        html[data-theme="light"] .d135-timeline-card p,
        html[data-theme="light"] .gdock-timeline-card p,
        html[data-theme="light"] .gdock-step-content p {
          color: #444 !important;
        }
        
        /* Fix for table text in light theme */
        html[data-theme="light"] table,
        html[data-theme="light"] th,
        html[data-theme="light"] td {
          color: #222 !important;
        }
        
        /* Fix for modal dialog and content */
        html[data-theme="light"] .modal-header,
        html[data-theme="light"] .modal-body,
        html[data-theme="light"] .modal-footer {
          color: #222 !important;
        }
      `;
      document.head.appendChild(style);
    } else {
      document.head.appendChild(style);
    }
  }
  function removeLightCardTextOverrides() {
    const style = document.getElementById('theme-light-overrides');
    if (style) style.remove();
  }

  function initNavbar() {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initNavbar);
      return;
    }

    // Add styles
    addNavbarStyles();

    // Set initial theme
    const savedTheme = getSavedTheme();
    setTheme(savedTheme === 'light' ? 'light' : 'dark');

    // Create navbar HTML
    const navbarHTML = createNavbar();

    // Insert navbar at the beginning of body
    document.body.insertAdjacentHTML('afterbegin', navbarHTML);

    // Add active class to current page nav link
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href && (currentPath.endsWith(href) || (href.includes('index.html') && (currentPath === '/' || currentPath.endsWith('/index.html'))))) {
        link.classList.add('active');
      }
    });

    // Check if current page is index page and add class to body
    if (currentPath === '/' || currentPath.endsWith('/index.html') || currentPath.endsWith('/en/index.html')) {
      document.body.classList.add('index-page');
    }

    // Ensure Bootstrap is loaded for dropdown functionality
    if (typeof bootstrap === 'undefined') {
      console.warn('Bootstrap JavaScript is required for dropdown functionality');
    }

    // Theme toggle button event
    const themeBtn = document.getElementById('theme-toggle-btn');
    if (themeBtn) {
      themeBtn.addEventListener('click', toggleTheme);
      updateThemeToggleBtn();
    }

    // Add scroll event listener to handle navbar visibility
    window.addEventListener('scroll', handleNavbarScroll, { passive: true });

    console.log('DRONER Unified Navbar initialized successfully');
  }
  
  // Function to ensure navbar remains visible when scrolling
  function handleNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;
    
    // Always ensure the navbar is visible and fixed
    navbar.style.position = 'fixed';
    navbar.style.top = '0';
    navbar.style.left = '0';
    navbar.style.right = '0';
    navbar.style.zIndex = '1030';
    
    // Add a class that can be used for additional styling if needed
    navbar.classList.add('is-scrolled');
    
    // If we're on the index page, force the navbar to be visible
    const isIndexPage = window.location.pathname === '/' || 
                        window.location.pathname.endsWith('/index.html') || 
                        window.location.pathname.endsWith('/en/index.html');
                        
    if (isIndexPage) {
      navbar.style.display = 'block';
      navbar.style.opacity = '1';
      navbar.classList.add('index-fixed');
    }
  }

  // Initialize when script loads
  initNavbar();

})();