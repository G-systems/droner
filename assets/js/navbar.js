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
          <div class="lang-toggle-wrapper position-absolute ${isHebrew ? 'start-0 ms-3' : 'end-0 me-3'}">
            <a href="${navItems[navItems.length-1].href}" class="btn btn-outline-dark" style="color:#111 !important;">
              <i class="fas fa-globe" style="color:#111 !important;"></i>
              <span style="display:inline-block; width:0.15em;"></span>
              <strong style="color:#111 !important;">${navItems[navItems.length-1].text}</strong>
            </a>
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
      
      .lang-toggle-wrapper {
        z-index: 1001;
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

  function initNavbar() {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initNavbar);
      return;
    }

    // Add styles
    addNavbarStyles();

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

    // Ensure Bootstrap is loaded for dropdown functionality
    if (typeof bootstrap === 'undefined') {
      console.warn('Bootstrap JavaScript is required for dropdown functionality');
    }

    console.log('DRONER Unified Navbar initialized successfully');
  }

  // Initialize when script loads
  initNavbar();

})();