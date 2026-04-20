/* ============================================================
   MAIN.JS — Documentation Site Interactivity
   ============================================================ */

(function () {
  'use strict';

  /* ---------------------------------------------------------
     Navigation — single source of truth for the sidebar
     --------------------------------------------------------- */
  var NAV_DATA = [
    {
      heading: 'Overview',
      items: [
        { label: 'Getting Started', path: 'index.html' },
        { label: 'Token Architecture', path: 'docs/token-architecture.html' },
        { label: 'Design Principles', path: 'docs/design-principles.html' },
        { label: 'Changelog', path: 'docs/changelog.html' }
      ]
    },
    {
      heading: 'Foundations',
      items: [
        { label: 'Overview',      path: 'docs/foundations.html' },
        { label: 'Colors',        path: 'docs/foundations-colors.html' },
        { label: 'Theme Colors',  path: 'docs/foundations-theme-colors.html' },
        { label: 'Typography',    path: 'docs/foundations-typography.html' },
        { label: 'Spacing',       path: 'docs/foundations-spacing.html' },
        { label: 'Radius',        path: 'docs/foundations-radius.html' },
        { label: 'Elevation',     path: 'docs/foundations-elevation.html' },
        { label: 'Borders',       path: 'docs/foundations-borders.html' },
        { label: 'Motion',        path: 'docs/foundations-motion.html' },
        { label: 'Opacity',       path: 'docs/foundations-opacity.html' },
        { label: 'Z-index',       path: 'docs/foundations-zindex.html' }
      ]
    },
    {
      heading: 'Components',
      items: [
        { label: 'Button',     path: 'docs/button.html' },
        { label: 'Input',      path: 'docs/input.html' },
        { label: 'Textarea',   path: 'docs/textarea.html' },
        { label: 'Select',     path: 'docs/select.html' },
        { label: 'Checkbox',   path: 'docs/checkbox.html' },
        { label: 'Radio',      path: 'docs/radio.html' },
        { label: 'Toggle',     path: 'docs/toggle.html' },
        { label: 'Badge',      path: 'docs/badge.html' },
        { label: 'Alert',      path: 'docs/alert.html' },
        { label: 'Card',       path: 'docs/card.html' },
        { label: 'Modal',      path: 'docs/modal.html' },
        { label: 'Tooltip',    path: 'docs/tooltip.html' },
        { label: 'Tabs',       path: 'docs/tabs.html' },
        { label: 'Breadcrumb', path: 'docs/breadcrumb.html' },
        { label: 'Avatar',     path: 'docs/avatar.html' },
        { label: 'Divider',    path: 'docs/divider.html' },
        { label: 'Spinner',    path: 'docs/spinner.html' },
        { label: 'Skeleton',   path: 'docs/skeleton.html' },
        { label: 'Form Field', path: 'docs/form-field.html' }
      ]
    },
    {
      heading: 'Guidelines',
      items: [
        { label: 'Theming',        path: 'docs/theming.html' },
        { label: 'Accessibility',  path: 'docs/accessibility.html' },
        { label: 'Control Sizing', path: 'docs/control-sizing.html' }
      ]
    },
    {
      heading: 'Decisions',
      items: [
        { label: 'Overview',       path: 'docs/decisions/index.html' }
      ]
    },
    {
      heading: 'Process',
      items: [
        { label: 'Contributing',   path: 'docs/process-contributing.html' },
        { label: 'Versioning',     path: 'docs/process-versioning.html' },
        { label: 'Releasing',      path: 'docs/process-releasing.html' },
        { label: 'Backlog',        path: 'docs/backlog.html' },
        { label: 'Tokens sync',    path: 'docs/tokens-sync.html' }
      ]
    },
    {
      heading: 'Brand',
      items: [
        { label: 'Brand Principles', path: 'docs/brand-principles.html' }
      ]
    }
  ];

  function buildSidebar() {
    var sidebar = document.getElementById('sidebar');
    if (!sidebar) return;

    // Deriva o caminho atual relativo à raiz do site (mesma forma do NAV_DATA),
    // para que a comparação de item ativo funcione sem colisão entre páginas
    // com o mesmo nome de arquivo em diretórios diferentes (ex: index.html
    // na raiz vs docs/decisions/index.html).
    var pathname = window.location.pathname;
    var segments = pathname.split('/').filter(Boolean);
    var fileName = segments.pop() || 'index.html';
    var docsIdx  = segments.indexOf('docs');
    var currentPath, depth;
    if (docsIdx === -1) {
      // Raiz do site (eventualmente dentro de um basepath do GitHub Pages).
      currentPath = fileName;
      depth = 0;
    } else {
      var relDirs = segments.slice(docsIdx);
      currentPath = relDirs.concat([fileName]).join('/');
      depth = relDirs.length;
    }
    var upToRoot = depth === 0 ? '' : '../'.repeat(depth);

    var html = NAV_DATA.map(function (section) {
      var items = section.items.map(function (item) {
        // item.path é sempre relativo à raiz (ex: 'docs/button.html' ou 'index.html').
        // href correto é upToRoot + item.path — funciona de qualquer profundidade.
        var href = upToRoot + item.path;
        var active = item.path === currentPath ? ' ds-sidebar__link--active' : '';
        return '<li><a href="' + href + '" class="ds-sidebar__link' + active + '">'
          + item.label + '</a></li>';
      }).join('');
      return '<div class="ds-sidebar__section ds-sidebar__section--expanded">'
        + '<button class="ds-sidebar__heading" aria-expanded="true">'
        + '<span class="ds-sidebar__heading-label">' + section.heading + '</span>'
        + '<span class="ds-sidebar__chevron" aria-hidden="true"></span>'
        + '</button>'
        + '<ul class="ds-sidebar__nav">' + items + '</ul></div>';
    }).join('');

    sidebar.innerHTML = html;

    var savedScroll = sessionStorage.getItem('ds-sidebar-scroll');
    if (savedScroll !== null) {
      sidebar.scrollTop = parseInt(savedScroll, 10);
    }

    sidebar.querySelectorAll('.ds-sidebar__link').forEach(function (link) {
      link.addEventListener('click', function () {
        sessionStorage.setItem('ds-sidebar-scroll', sidebar.scrollTop);
      });
    });

    sidebar.querySelectorAll('.ds-sidebar__heading').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var section = this.closest('.ds-sidebar__section');
        var isExpanded = section.classList.contains('ds-sidebar__section--expanded');
        section.classList.toggle('ds-sidebar__section--expanded', !isExpanded);
        this.setAttribute('aria-expanded', String(!isExpanded));
      });
    });
  }

  /* ---------------------------------------------------------
     Internationalization (i18n)
     --------------------------------------------------------- */
  var UI_STRINGS = {
    pt: {
      'Overview': 'Visão Geral',
      'Foundations': 'Foundations',
      'Components': 'Components',
      'Guidelines': 'Guidelines',
      'Getting Started': 'Comece por aqui',
      'Token Architecture': 'Token Architecture',
      'Design Principles': 'Design Principles',
      'Changelog': 'Changelog',
      'Colors': 'Colors',
      'Theme Colors': 'Theme Colors',
      'Typography': 'Typography',
      'Spacing': 'Spacing',
      'Radius': 'Radius',
      'Elevation': 'Elevation',
      'Borders': 'Borders',
      'Motion': 'Motion',
      'Opacity': 'Opacity',
      'Z-index': 'Z-index',
      'Button': 'Button',
      'Input': 'Input',
      'Textarea': 'Textarea',
      'Select': 'Select',
      'Checkbox': 'Checkbox',
      'Radio': 'Radio',
      'Toggle': 'Toggle',
      'Badge': 'Badge',
      'Alert': 'Alert',
      'Card': 'Card',
      'Modal': 'Modal',
      'Tooltip': 'Tooltip',
      'Tabs': 'Tabs',
      'Breadcrumb': 'Breadcrumb',
      'Avatar': 'Avatar',
      'Divider': 'Divider',
      'Spinner': 'Spinner',
      'Skeleton': 'Skeleton',
      'Form Field': 'Form Field',
      'Theming': 'Theming',
      'Accessibility': 'Accessibility',
      'Control Sizing': 'Control Sizing',
      'Theme': 'Theme',
      'Preview': 'Preview',
      'Code': 'Código',
      'Copy': 'Copiar',
      'Copied!': 'Copiado!',
      'Do': 'Faça',
      "Don't": 'Não faça'
    }
  };

  function getLang() {
    return document.documentElement.getAttribute('lang') || 'pt';
  }

  function translateSharedUI() {
    var lang = getLang();
    var map = UI_STRINGS[lang] || {};
    var hasMap = Object.keys(map).length > 0;

    var els = document.querySelectorAll(
      '.ds-sidebar__heading-label, .ds-sidebar__link, .ds-component-card, ' +
      '.ds-preview__tab, .ds-preview__copy'
    );
    els.forEach(function (el) {
      if (!el.hasAttribute('data-i18n-src')) {
        el.setAttribute('data-i18n-src', el.textContent.trim());
      }
      var src = el.getAttribute('data-i18n-src');
      el.textContent = hasMap ? (map[src] || src) : src;
    });

    // Do/Don't labels (text only, not the class part)
    document.querySelectorAll('.ds-dodont__label').forEach(function (el) {
      if (!el.hasAttribute('data-i18n-src')) {
        el.setAttribute('data-i18n-src', el.textContent.trim());
      }
      var src = el.getAttribute('data-i18n-src');
      el.textContent = hasMap ? (map[src] || src) : src;
    });

    updateModeToggleText();
    translatePageTitle();
  }

  var ICON_MOON = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 3a9 9 0 1 0 9 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 0 1-4.4 2.26 5.403 5.403 0 0 1-3.14-9.8c-.44-.06-.9-.1-1.36-.1z"/></svg>';
  var ICON_SUN  = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 7a5 5 0 1 0 0 10A5 5 0 0 0 12 7zm0-5a1 1 0 0 1 1 1v1a1 1 0 0 1-2 0V3a1 1 0 0 1 1-1zm0 17a1 1 0 0 1 1 1v1a1 1 0 0 1-2 0v-1a1 1 0 0 1 1-1zm9-9a1 1 0 0 1 0 2h-1a1 1 0 0 1 0-2h1zM4 12a1 1 0 0 1-1 1H2a1 1 0 0 1 0-2h1a1 1 0 0 1 1 1zm14.95-6.36a1 1 0 0 1 0 1.41l-.71.71a1 1 0 1 1-1.41-1.41l.71-.71a1 1 0 0 1 1.41 0zM6.17 17.83a1 1 0 0 1 0 1.41l-.71.71a1 1 0 1 1-1.41-1.41l.71-.71a1 1 0 0 1 1.41 0zm12.02 1.41a1 1 0 0 1-1.41 0l-.71-.71a1 1 0 0 1 1.41-1.41l.71.71a1 1 0 0 1 0 1.41zM6.17 6.17a1 1 0 0 1-1.41 0l-.71-.71a1 1 0 0 1 1.41-1.41l.71.71a1 1 0 0 1 0 1.41z"/></svg>';

  function updateModeToggleText() {
    var modeToggle = document.getElementById('mode-toggle');
    if (!modeToggle) return;
    var isDark = document.documentElement.getAttribute('data-mode') === 'dark';
    modeToggle.innerHTML = isDark
      ? ICON_SUN  + ' Light'
      : ICON_MOON + ' Dark';
  }

  function translatePageTitle() {
    if (!document.documentElement.hasAttribute('data-i18n-title')) {
      document.documentElement.setAttribute('data-i18n-title', document.title);
    }
    var original = document.documentElement.getAttribute('data-i18n-title');
    var lang = getLang();
    var map = UI_STRINGS[lang] || {};
    if (Object.keys(map).length) {
      var parts = original.split(' \u2014 ');
      if (parts.length === 2) {
        document.title = (map[parts[0]] || parts[0]) + ' \u2014 Design System';
      }
    } else {
      document.title = original;
    }
  }

  function initI18n() {
    translateSharedUI();

    var select = document.getElementById('lang-switcher');
    if (!select) return;

    select.value = getLang();

    select.addEventListener('change', function () {
      var newLang = this.value;
      document.documentElement.setAttribute('lang', newLang);
      localStorage.setItem('ds-lang', newLang);
      translateSharedUI();
    });
  }

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
      }

      modeToggle.addEventListener('click', function () {
        var isDark = document.documentElement.getAttribute('data-mode') === 'dark';
        if (isDark) {
          document.documentElement.removeAttribute('data-mode');
          localStorage.removeItem('ds-mode');
          this.setAttribute('aria-pressed', 'false');
        } else {
          document.documentElement.setAttribute('data-mode', 'dark');
          localStorage.setItem('ds-mode', 'dark');
          this.setAttribute('aria-pressed', 'true');
        }
        updateModeToggleText();
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
        var currentBtn = btn;
        navigator.clipboard.writeText(text).then(function () {
          currentBtn.textContent = getLang() === 'pt' ? 'Copiado!' : 'Copied!';
          currentBtn.setAttribute('data-i18n-src', getLang() === 'pt' ? 'Copiado!' : 'Copied!');
          setTimeout(function () {
            currentBtn.textContent = getLang() === 'pt' ? 'Copiar' : 'Copy';
            currentBtn.setAttribute('data-i18n-src', getLang() === 'pt' ? 'Copiar' : 'Copy');
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
      var tabs   = preview.querySelectorAll('.ds-preview__tab');
      var panels = preview.querySelectorAll('.ds-preview__panel'); // Pattern B
      var canvas = preview.querySelector('.ds-preview__canvas');   // Pattern A
      var code   = preview.querySelector('.ds-preview__code');     // Pattern A
      var usesPanels = panels.length > 0;

      tabs.forEach(function (tab) {
        tab.addEventListener('click', function () {
          var target = this.getAttribute('data-tab');

          tabs.forEach(function (t) {
            t.classList.remove('ds-preview__tab--active');
            t.setAttribute('aria-selected', 'false');
          });
          this.classList.add('ds-preview__tab--active');
          this.setAttribute('aria-selected', 'true');

          if (usesPanels) {
            // Pattern B: data-panel + ds-preview__panel--active
            panels.forEach(function (p) {
              p.classList.toggle('ds-preview__panel--active', p.getAttribute('data-panel') === target);
            });
          } else {
            // Pattern A: canvas/code siblings with inline display
            if (canvas) canvas.style.display = target === 'preview' ? '' : 'none';
            if (code)   code.style.display   = target === 'code'    ? '' : 'none';
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
    buildSidebar();
    initThemeSwitcher();
    initI18n();
    initMobileNav();
    initCopyButtons();
    initPreviewTabs();
    initCharCounters();
    initContrastBadges();
  });
})();
