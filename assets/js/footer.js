/**
 * DRONER Website Footer Generator (Modern, Flexible Logo)
 * Inserts a styled footer with a large, unconstrained logo.
 */

(function() {
  function initFooter() {
    try {
      // Detect language and direction
      const htmlLang = document.documentElement.lang.toLowerCase();
      const isRTL = document.documentElement.dir === 'rtl';
      const isEnglish = htmlLang.includes('en') || !isRTL;

      // Add footer styles
      addFooterStyles();

      // Move logo higher by adjusting its CSS (see below)

      // Push footer to the bottom by adding a spacer div if needed
      const minFooterHeight = 220; // px, adjust as needed
      const bodyHeight = document.body.scrollHeight;
      const windowHeight = window.innerHeight;
      if (bodyHeight < windowHeight - minFooterHeight) {
        const spacer = document.createElement('div');
        spacer.style.height = (windowHeight - bodyHeight - minFooterHeight) + 'px';
        document.body.appendChild(spacer);
      }

      // Create footer element
      const footer = document.createElement('footer');
      footer.className = 'main-footer-modern py-5';
      footer.innerHTML = isEnglish ? generateFooter({
        logoUrl: `${getRelativePath()}assets/images/bothlogos3.webp`,
        links: [
          { href: `${getRelativePath()}index.html`, label: 'Home' },
          { href: `${getRelativePath()}pages/about.html`, label: 'About' },
          { href: `${getRelativePath()}pages/products/SMARTER.html`, label: 'SMARTER' },
          { href: `${getRelativePath()}pages/products/dock-d135.html`, label: 'DOCKER' },
          { href: `${getRelativePath()}pages/products/CONTROLLER.html`, label: 'CONTROLLER' },
          { href: `${getRelativePath()}pages/contact.html`, label: 'Contact' },
          { href: `${getRelativePath()}pages/FAQ.html`, label: 'FAQ' },
          { href: `${getRelativePath()}pages/privacy-policy.html`, label: 'Privacy Policy' },
          { href: `${getRelativePath()}terms-of-service.html`, label: 'Terms of Service' }
        ],
        phone: '050-363-5555',
        email: 'info@droner.app',
        copyright: `&copy; ${new Date().getFullYear()} G-SYSTEM. All rights reserved. | Design: G-SYSTEM Team`,
        dir: 'ltr'
      }) : generateFooter({
        logoUrl: `${getRelativePath()}assets/images/bothlogos3.webp`,
        links: [
          { href: `${getRelativePath()}index.html`, label: 'בית' },
          { href: `${getRelativePath()}pages/about.html`, label: 'אודות' },
          { href: `${getRelativePath()}pages/products/SMARTER.html`, label: 'SMARTER' },
          { href: `${getRelativePath()}pages/products/dock-d135.html`, label: 'DOCKER' },
          { href: `${getRelativePath()}pages/products/CONTROLLER.html`, label: 'CONTROLLER' },
          { href: `${getRelativePath()}pages/FAQ.html`, label: 'שאלות נפוצות' },
          { href: `${getRelativePath()}terms-of-service.html`, label: 'תנאי שימוש' },
          { href: `${getRelativePath()}pages/privacy-policy.html`, label: 'מדיניות פרטיות' },
          { href: `${getRelativePath()}pages/contact.html`, label: 'צור קשר' }
        ],
        phone: '050-363-5555',
        email: 'info@droner.app',
        copyright: `&copy; ${new Date().getFullYear()} G-SYSTEM. כל הזכויות שמורות. | עיצוב: צוות G-SYSTEM`,
        dir: 'rtl'
      });

      document.body.appendChild(footer);
    } catch (error) {
      console.error("Error initializing footer:", error);
    }
  }

  // DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initFooter);
  } else {
    initFooter();
  }
  window.addEventListener('load', function() {
    if (!document.querySelector('footer.main-footer-modern')) {
      initFooter();
    }
  });

  /**
   * Generate the footer HTML with a large, unconstrained logo.
   */
  function generateFooter({ logoUrl, links, phone, email, copyright, dir }) {
    return `
      <div class="footer-top-line"></div>
      <div class="footer-inner overlay-logo-layout" dir="${dir}">
      <div class="footer-content-centered">
        <nav class="footer-links">
        ${links.map(link => `<a href="${link.href}" class="footer-link">${link.label}</a>`).join('<span class="footer-link-divider"></span>')}
        </nav>
        <hr class="footer-divider footer-divider-links">
        <div class="footer-contact-row-with-logo">
        <div class="footer-contact-row">
          <a href="https://wa.me/972503635555" target="_blank" class="footer-contact-link">
          <i class="fa fa-phone"></i> ${phone}
          </a>
          <a href="mailto:${email}" class="footer-contact-link">
          <i class="fa fa-envelope"></i> ${email}
          </a>
          <div class="footer-social">
          <a href="https://wa.me/972503635555" target="_blank" aria-label="WhatsApp" class="footer-social-link"><i class="fab fa-whatsapp"></i></a>
          <a href="https://www.facebook.com/gsystem5" target="_blank" aria-label="Facebook" class="footer-social-link"><i class="fab fa-facebook"></i></a>
          <a href="#" aria-label="LinkedIn" class="footer-social-link"><i class="fab fa-linkedin"></i></a>
          </div>
        </div>
        ${logoUrl ? `
        <div class="footer-logo-side">
          <img src="${logoUrl}" alt="DRONER Logo" class="footer-logo-centered-img">
        </div>
        ` : ''}
        </div>
        <hr class="footer-divider">
        <div class="footer-copyright">
        ${copyright}
        </div>
      </div>
      </div>
    `;
  }

  /**
   * Add CSS styles for the footer, including unlimited logo size.
   */
  function addFooterStyles() {
    if (document.getElementById('droner-footer-styles')) return;
    const styleElement = document.createElement('style');
    styleElement.id = 'droner-footer-styles';
    styleElement.textContent = `
      .main-footer-modern {
        background: linear-gradient(120deg, var(--color-dark) 70%, var(--color-gold) 120%);
        color: #fff;
        border-radius: 0 0 18px 18px;
        box-shadow: 0 -2px 18px rgba(0,0,0,0.10);
        margin-top: 2rem;
        font-family: 'Rubik', sans-serif;
        position: relative;
        overflow: hidden;
        min-height: 180px;
        padding-bottom: 0; /* Ensure no extra bottom padding */
      }
      .footer-top-line {
        width: 100%;
        height: 2px;
        background: var(--color-gold);
        box-shadow: 0 2px 16px 0 rgba(176,141,87,0.18);
        border-radius: 18px 18px 0 0;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
      }
      .footer-inner.overlay-logo-layout {
        position: relative;
        max-width: 1400px;
        margin: 0 auto;
        padding-top: 1.2rem;
        padding-bottom: 0; /* Further reduced from 0.7rem to 0 */
        z-index: 1;
        min-height: unset;
      }
      .footer-contact-row-with-logo {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        gap: 2.5rem;
        width: 100%;
      }
      .footer-contact-row {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 0.2rem;
        margin-bottom: 0;
      }
      .footer-logo-side {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
      }
      .footer-logo-centered-img {
        width: 140px;
        max-width: 180px;
        min-width: 80px;
        height: auto;
        filter: drop-shadow(0 3px 5px rgba(0,0,0,0.18));
        opacity: 0.98;
        transition: transform 0.3s;
        display: block;
        margin: 0;
      }
      .footer-logo-centered-img:hover {
        transform: scale(1.05) translateY(-3px);
      }
      .footer-content-centered {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 0.4rem;
        position: relative;
        z-index: 3;
        text-align: center;
      }
      .footer-links {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 1.2rem;
        margin-bottom: 0.2rem;
        position: relative;
      }
      .footer-link-divider {
        display: inline-block;
        width: 1px;
        height: 1.2em;
        background: var(--color-gold, #b08d57);
        margin: 0 0.6rem;
        opacity: 0.5;
        vertical-align: middle;
      }
      .footer-links .footer-link:last-child + .footer-link-divider {
        display: none;
      }
      .footer-divider {
        border: none;
        border-top: 1.5px solid var(--color-gold, #b08d57);
        opacity: 0.7;
        margin: 0.3rem 0 0.2rem 0;
      }
      .footer-divider.footer-divider-links {
        margin: 0.2rem 0 0.5rem 0;
      }
      .footer-contact-row {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.2rem;
        margin-bottom: 0.2rem;
      }
      .footer-contact-link {
        color: #fffde7;
        font-size: 1rem;
        font-weight: 400;
        text-decoration: none;
        display: flex;
        align-items: center;
        gap: 0.5rem;
      }
      .footer-contact-link i {
        color: var(--color-gold);
        font-size: 1.1em;
        vertical-align: middle;
      }
      .footer-social {
        margin-top: 0.5rem;
        gap: 1rem;
        display: flex;
        justify-content: center;
      }
      .footer-social-link {
        color: #fff;
        font-size: 1.35rem;
        transition: color 0.2s, transform 0.2s;
        display: inline-block;
        vertical-align: middle;
      }
      .footer-social-link:hover {
        color: var(--color-gold);
        transform: scale(1.15);
      }
      .footer-copyright {
        text-align: center;
        font-size: 0.98rem;
        opacity: 0.92;
        margin-top: 0.1rem;
      }
      @media (max-width: 1000px) {
        .footer-logo-centered-img {
          width: 90px;
        }
      }
      @media (max-width: 767px) {
        .footer-contact-row-with-logo {
          flex-direction: column;
          gap: 1.2rem;
        }
        .footer-contact-row {
          align-items: center;
        }
        .footer-logo-centered-img {
          width: 90px;
          max-width: 120px;
        }
      }
      @media (max-width: 480px) {
        .footer-logo-centered-img {
          width: 70px;
          max-width: 90px;
        }
      }
    `;
    document.head.appendChild(styleElement);
  }

  /**
   * Helper: get relative path to root for links.
   */
  function getRelativePath() {
    try {
      const path = window.location.pathname;
      const segments = path.split('/').filter(p => p);
      if (segments.includes('en')) {
        const enIndex = segments.indexOf('en');
        const depth = segments.length - enIndex - 1;
        return depth <= 0 ? '' : '../'.repeat(depth);
      }
      const depth = segments.length;
      return depth <= 0 ? '' : '../'.repeat(depth);
    } catch {
      return '';
    }
  }
})();