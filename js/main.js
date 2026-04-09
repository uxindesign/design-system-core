/* ============================================================
   MAIN.JS — Documentation Site Interactivity
   ============================================================ */

(function () {
  'use strict';

  /* ---------------------------------------------------------
     Theme Switcher
     --------------------------------------------------------- */
  function initThemeSwitcher() {
    var switcher = document.getElementById('theme-switcher');
    var modeToggle = document.getElementById('mode-toggle');

    /* Theme (palette) */
    if (switcher) {
      var savedTheme = localStorage.getItem('ds-theme');
      if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
        switcher.value = savedTheme;
      }

      switcher.addEventListener('change', function () {
        var theme = this.value;
        if (theme === 'default') {
          document.documentElement.removeAttribute('data-theme');
          localStorage.removeItem('ds-theme');
        } else {
          document.documentElement.setAttribute('data-theme', theme);
          localStorage.setItem('ds-theme', theme);
        }
      });
    }

    /* Mode (light / dark) */
    if (modeToggle) {
      var savedMode = localStorage.getItem('ds-mode');
      if (savedMode === 'dark') {
        document.documentElement.setAttribute('data-mode', 'dark');
        modeToggle.setAttribute('aria-pressed', 'true');
        modeToggle.textContent = 'Light';
      }

      modeToggle.addEventListener('click', function () {
        var isDark = document.documentElement.getAttribute('data-mode') === 'dark';
        if (isDark) {
          document.documentElement.removeAttribute('data-mode');
          localStorage.removeItem('ds-mode');
          this.setAttribute('aria-pressed', 'false');
          this.textContent = 'Dark';
        } else {
          document.documentElement.setAttribute('data-mode', 'dark');
          localStorage.setItem('ds-mode', 'dark');
          this.setAttribute('aria-pressed', 'true');
          this.textContent = 'Light';
        }
      });
    }
  }

  /* ---------------------------------------------------------
     Mobile Sidebar Toggle
     --------------------------------------------------------- */
  function initMobileNav() {
    var toggle = document.getElementById('menu-toggle');
    var sidebar = document.getElementById('sidebar');
    var overlay = document.getElementById('sidebar-overlay');
    if (!toggle || !sidebar) return;

    function openSidebar() {
      sidebar.classList.add('ds-sidebar--open');
      if (overlay) overlay.classList.add('ds-sidebar-overlay--visible');
      toggle.setAttribute('aria-expanded', 'true');
    }

    function closeSidebar() {
      sidebar.classList.remove('ds-sidebar--open');
      if (overlay) overlay.classList.remove('ds-sidebar-overlay--visible');
      toggle.setAttribute('aria-expanded', 'false');
    }

    toggle.addEventListener('click', function () {
      var isOpen = sidebar.classList.contains('ds-sidebar--open');
      if (isOpen) {
        closeSidebar();
      } else {
        openSidebar();
      }
    });

    if (overlay) {
      overlay.addEventListener('click', closeSidebar);
    }

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && sidebar.classList.contains('ds-sidebar--open')) {
        closeSidebar();
        toggle.focus();
      }
    });
  }

  /* ---------------------------------------------------------
     Copy to Clipboard
     --------------------------------------------------------- */
  function initCopyButtons() {
    document.querySelectorAll('.ds-preview__copy').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var codeBlock = this.closest('.ds-preview__code').querySelector('code');
        if (!codeBlock) return;

        var text = codeBlock.textContent;
        navigator.clipboard.writeText(text).then(function () {
          var original = btn.textContent;
          btn.textContent = 'Copied!';
          setTimeout(function () {
            btn.textContent = original;
          }, 2000);
        });
      });
    });
  }

  /* ---------------------------------------------------------
     Preview Tabs (Preview / Code toggle)
     --------------------------------------------------------- */
  function initPreviewTabs() {
    document.querySelectorAll('.ds-preview').forEach(function (preview) {
      var tabs = preview.querySelectorAll('.ds-preview__tab');
      var panels = preview.querySelectorAll('.ds-preview__panel');

      tabs.forEach(function (tab) {
        tab.addEventListener('click', function () {
          var target = this.getAttribute('data-tab');

          tabs.forEach(function (t) {
            t.classList.remove('ds-preview__tab--active');
            t.setAttribute('aria-selected', 'false');
          });
          panels.forEach(function (p) {
            p.classList.remove('ds-preview__panel--active');
          });

          this.classList.add('ds-preview__tab--active');
          this.setAttribute('aria-selected', 'true');

          var targetPanel = preview.querySelector('[data-panel="' + target + '"]');
          if (targetPanel) {
            targetPanel.classList.add('ds-preview__panel--active');
          }
        });

        tab.addEventListener('keydown', function (e) {
          var tabsArray = Array.from(tabs);
          var index = tabsArray.indexOf(this);
          var newIndex;

          if (e.key === 'ArrowRight') {
            newIndex = (index + 1) % tabsArray.length;
          } else if (e.key === 'ArrowLeft') {
            newIndex = (index - 1 + tabsArray.length) % tabsArray.length;
          } else {
            return;
          }

          e.preventDefault();
          tabsArray[newIndex].focus();
          tabsArray[newIndex].click();
        });
      });
    });
  }

  /* ---------------------------------------------------------
     Textarea Character Counter
     --------------------------------------------------------- */
  function initCharCounters() {
    document.querySelectorAll('[data-maxlength]').forEach(function (textarea) {
      var max = parseInt(textarea.getAttribute('data-maxlength'), 10);
      var counter = document.getElementById(textarea.getAttribute('data-counter'));
      if (!counter) return;

      function update() {
        var remaining = max - textarea.value.length;
        counter.textContent = textarea.value.length + ' / ' + max;
        if (remaining < 0) {
          counter.classList.add('ds-field__counter--over');
        } else {
          counter.classList.remove('ds-field__counter--over');
        }
      }

      textarea.addEventListener('input', update);
      update();
    });
  }

  /* ---------------------------------------------------------
     Active Sidebar Link Highlighting
     --------------------------------------------------------- */
  function initActiveLink() {
    var currentPath = window.location.pathname;
    document.querySelectorAll('.ds-sidebar__link').forEach(function (link) {
      var href = link.getAttribute('href');
      if (href && currentPath.endsWith(href.replace(/^\.\.\//, '').replace(/^\.\//, ''))) {
        link.classList.add('ds-sidebar__link--active');
      }
    });
  }

  /* ---------------------------------------------------------
     Contrast Ratio Calculator (WCAG 2.1)
     --------------------------------------------------------- */
  function initContrastBadges() {
    var swatches = document.querySelectorAll('.ds-swatch__color');
    if (!swatches.length) return;

    function sRGBtoLinear(c) {
      return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    }

    function luminance(r, g, b) {
      return 0.2126 * sRGBtoLinear(r / 255) + 0.7152 * sRGBtoLinear(g / 255) + 0.0722 * sRGBtoLinear(b / 255);
    }

    function contrastRatio(l1, l2) {
      var lighter = Math.max(l1, l2);
      var darker = Math.min(l1, l2);
      return (lighter + 0.05) / (darker + 0.05);
    }

    function wcagLevel(ratio) {
      if (ratio >= 7) return { label: 'AAA', cls: 'aaa' };
      if (ratio >= 4.5) return { label: 'AA', cls: 'aa' };
      if (ratio >= 3) return { label: 'AA+', cls: 'aa-large' };
      return { label: 'Fail', cls: 'fail' };
    }

    function parseColor(str) {
      var m = str.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
      if (m) return { r: parseInt(m[1]), g: parseInt(m[2]), b: parseInt(m[3]) };
      return null;
    }

    function updateSwatches() {
      swatches.forEach(function (el) {
        var computed = getComputedStyle(el).backgroundColor;
        var color = parseColor(computed);
        if (!color) return;

        var lum = luminance(color.r, color.g, color.b);
        var vsWhite = contrastRatio(1, lum);
        var vsBlack = contrastRatio(lum, 0);
        var whiteLevel = wcagLevel(vsWhite);
        var blackLevel = wcagLevel(vsBlack);

        // Find or create contrast container
        var swatch = el.parentElement;
        var container = swatch.querySelector('.ds-swatch__contrast');
        if (!container) {
          container = document.createElement('div');
          container.className = 'ds-swatch__contrast';
          swatch.appendChild(container);
        }

        container.innerHTML =
          '<span class="ds-swatch__badge ds-swatch__badge--' + whiteLevel.cls + '" title="vs White ' + vsWhite.toFixed(1) + ':1">' + whiteLevel.label + '</span>' +
          '<span class="ds-swatch__badge ds-swatch__badge--' + blackLevel.cls + '" title="vs Black ' + vsBlack.toFixed(1) + ':1">' + blackLevel.label + '</span>';
      });
    }

    // Run on load and on theme/mode change
    updateSwatches();

    // Re-compute when theme or mode changes
    var observer = new MutationObserver(function (mutations) {
      mutations.forEach(function (m) {
        if (m.attributeName === 'data-theme' || m.attributeName === 'data-mode') {
          setTimeout(updateSwatches, 50);
        }
      });
    });
    observer.observe(document.documentElement, { attributes: true });
  }

  /* ---------------------------------------------------------
     Initialize All
     --------------------------------------------------------- */
  document.addEventListener('DOMContentLoaded', function () {
    initThemeSwitcher();
    initMobileNav();
    initCopyButtons();
    initPreviewTabs();
    initCharCounters();
    initActiveLink();
    initContrastBadges();
  });
})();
