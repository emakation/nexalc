(function () {
  'use strict';

  var MOBILE_QUERY = '(max-width: 768px)';

  function isMobileViewport() {
    return window.matchMedia(MOBILE_QUERY).matches;
  }

  function initMobileHeader() {
    var nav = document.querySelector('nav.nav');
    if (!nav) return;

    var navLinks = nav.querySelector('.nav-links');
    var navItems = Array.prototype.slice.call(nav.querySelectorAll('.nav-item'));
    if (!navLinks || !navItems.length) return;

    // Mount unclipped fixed backdrop + panel directly on document.body
    var backdrop = document.createElement('div');
    backdrop.className = 'nexalc-mobile-dropdown-backdrop';
    backdrop.setAttribute('aria-hidden', 'true');

    var panel = document.createElement('div');
    panel.className = 'nexalc-mobile-dropdown-panel';
    panel.setAttribute('role', 'menu');
    panel.setAttribute('aria-hidden', 'true');

    document.body.appendChild(backdrop);
    document.body.appendChild(panel);

    var activeItem = null;

    function closeDropdown() {
      if (activeItem) {
        activeItem.classList.remove('mobile-open');
        var prevTrigger = activeItem.querySelector(':scope > a');
        if (prevTrigger) prevTrigger.setAttribute('aria-expanded', 'false');
        activeItem = null;
      }
      backdrop.classList.remove('open');
      panel.classList.remove('open');
      panel.setAttribute('aria-hidden', 'true');
      panel.innerHTML = '';
    }

    function positionPanel() {
      if (!activeItem) return;
      var rect = nav.getBoundingClientRect();
      var topPx = Math.max(0, Math.round(rect.bottom + 6));
      panel.style.top = topPx + 'px';
    }

    function openDropdown(item) {
      var trigger = item.querySelector(':scope > a');
      var sourceDropdown = item.querySelector('.nav-dropdown');
      if (!trigger || !sourceDropdown) return;

      if (activeItem === item) {
        closeDropdown();
        return;
      }

      closeDropdown();
      activeItem = item;
      item.classList.add('mobile-open');
      trigger.setAttribute('aria-expanded', 'true');

      var categoryLabel = (trigger.textContent || '').replace(/\s+/g, ' ').trim();
      var heading = document.createElement('div');
      heading.className = 'nexalc-mobile-dropdown-header';
      heading.textContent = categoryLabel;
      panel.appendChild(heading);

      var links = sourceDropdown.querySelectorAll('a');
      for (var i = 0; i < links.length; i++) {
        var orig = links[i];
        var clone = document.createElement('a');
        clone.href = orig.getAttribute('href') || '#';
        clone.textContent = (orig.textContent || '').replace(/\s+/g, ' ').trim();
        clone.setAttribute('role', 'menuitem');
        if (orig.classList.contains('active')) {
          clone.classList.add('active');
        }
        clone.addEventListener('click', function () {
          closeDropdown();
        });
        panel.appendChild(clone);
      }

      positionPanel();
      backdrop.classList.add('open');
      panel.classList.add('open');
      panel.setAttribute('aria-hidden', 'false');
    }

    navItems.forEach(function (item) {
      var trigger = item.querySelector(':scope > a');
      var dropdown = item.querySelector('.nav-dropdown');
      if (!trigger || !dropdown) return;

      trigger.setAttribute('aria-haspopup', 'true');
      trigger.setAttribute('aria-expanded', 'false');

      trigger.addEventListener('click', function (e) {
        if (!isMobileViewport()) return;
        e.preventDefault();
        openDropdown(item);
      });
    });

    backdrop.addEventListener('click', closeDropdown);

    document.addEventListener('click', function (e) {
      if (!activeItem) return;
      if (!nav.contains(e.target) && !panel.contains(e.target)) {
        closeDropdown();
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && activeItem) {
        closeDropdown();
      }
    });

    navLinks.addEventListener('scroll', function () {
      if (activeItem) closeDropdown();
    }, { passive: true });

    window.addEventListener('resize', function () {
      if (!isMobileViewport()) {
        closeDropdown();
      } else if (activeItem) {
        positionPanel();
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMobileHeader);
  } else {
    initMobileHeader();
  }
})();
