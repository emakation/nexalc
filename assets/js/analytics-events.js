(function () {
  'use strict';

  function sendGA4Event(eventName, params) {
    if (typeof window.gtag === 'function') {
      window.gtag('event', eventName, params);
    }
  }

  function cleanText(el) {
    if (!el) return '';
    return (el.textContent || '').replace(/\s+/g, ' ').trim();
  }

  function getToolName(pathname) {
    var path = (pathname || '/').replace(/\/+$/, '') || '/';
    if (path === '/') return 'Homepage';
    if (path.indexOf('/mortgage-calculator') === 0) return 'Mortgage Calculator';
    if (path.indexOf('/age-calculator') === 0) return 'Age Calculator';
    if (path.indexOf('/bmi-calculator') === 0) return 'BMI Calculator';
    if (path.indexOf('/countdown-timer') === 0) return 'Countdown Timer';
    if (path.indexOf('/currency-converter') === 0) return 'Currency Converter';
    if (path.indexOf('/percentage-calculator') === 0) return 'Percentage Calculator';
    if (path.indexOf('/tip-calculator') === 0) return 'Tip Calculator';
    if (path.indexOf('/blog') === 0) return 'Blog';
    return path.replace(/^\//, '').replace(/\//g, ' - ') || 'Site';
  }

  var CALC_ACTION_SELECTOR = [
    '.tab-btn',
    '.btn-calc',
    '.calc-btn',
    '.unit-btn',
    '.sex-btn',
    '.btn-start',
    '.quick-btn',
    '.cd-btn',
    '.convert-btn',
    '.swap-btn',
    '.pair-chip',
    '.region-btn',
    '.dp-mode-btn',
    '.term-btn',
    '.schedule-tab-btn',
    '.taxes-expand-btn',
    '.tip-pill',
    '.stepper-btn',
    '.btn-reset',
    '.cat-btn',
    'button[type="submit"]'
  ].join(', ');

  document.addEventListener('click', function (e) {
    var target = e.target;
    if (!target || typeof target.closest !== 'function') return;

    var pagePath = window.location.pathname || '/';

    // 1. Gumroad outbound / overlay callout clicks
    var gumroadLink = target.closest('a[href*="gumroad.com"]');
    if (gumroadLink) {
      sendGA4Event('gumroad_callout_click', {
        page_path: pagePath,
        product_url: gumroadLink.href,
        button_text: cleanText(gumroadLink) || 'Gumroad Callout'
      });
      return;
    }

    // 2. Header navigation category & dropdown item clicks (desktop + mobile panel)
    var navLink = target.closest('nav.nav a, .nexalc-mobile-dropdown-panel a');
    if (navLink) {
      var linkText = cleanText(navLink);
      if (!linkText) {
        var img = navLink.querySelector('img[alt]');
        linkText = img ? img.getAttribute('alt') : 'Logo';
      }
      sendGA4Event('nav_category_click', {
        page_path: pagePath,
        link_text: linkText,
        target_url: navLink.getAttribute('href') || navLink.href || ''
      });
      return;
    }

    // 3. Anonymous calculator UI interactions (tabs, presets, modes, submit/calculate buttons)
    var calcBtn = target.closest(CALC_ACTION_SELECTOR);
    if (calcBtn) {
      var label =
        cleanText(calcBtn) ||
        calcBtn.getAttribute('aria-label') ||
        calcBtn.getAttribute('title') ||
        (calcBtn.classList.contains('swap-btn') ? 'Swap Currencies' : 'Action');

      sendGA4Event('calculator_interaction', {
        page_path: pagePath,
        tool_name: getToolName(pagePath),
        action_label: label
      });
    }
  });
})();
