/* ============================================================
   APP.JS — Interactions for Ana Belén Pérez portfolio
   ============================================================ */

(function () {
  'use strict';

  /* Mark JS as enabled for progressive enhancement */
  document.documentElement.classList.add('js');

  /* ---- Theme toggle ---- */
  const themeToggle = document.querySelector('[data-theme-toggle]');
  const root = document.documentElement;
  let theme = matchMedia('(prefers-color-scheme:dark)').matches ? 'dark' : 'light';
  root.setAttribute('data-theme', theme);

  function updateThemeIcon() {
    if (!themeToggle) return;
    themeToggle.innerHTML =
      theme === 'dark'
        ? '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>'
        : '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>';
  }
  updateThemeIcon();

  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      theme = theme === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', theme);
      updateThemeIcon();
      themeToggle.setAttribute('aria-label', 'Cambiar a modo ' + (theme === 'dark' ? 'claro' : 'oscuro'));
    });
  }

  /* ---- Mobile menu ---- */
  const menuToggle = document.querySelector('[data-menu-toggle]');
  const navMobile = document.querySelector('[data-nav-mobile]');
  const navOverlay = document.querySelector('[data-nav-overlay]');
  const mobileLinks = document.querySelectorAll('[data-nav-mobile-link]');

  function closeMenu() {
    if (!navMobile || !navOverlay) return;
    navMobile.classList.remove('open');
    navOverlay.classList.remove('open');
    document.body.classList.remove('menu-open');
  }

  if (menuToggle) {
    menuToggle.addEventListener('click', function () {
      if (navMobile.classList.contains('open')) {
        closeMenu();
      } else {
        navMobile.classList.add('open');
        navOverlay.classList.add('open');
        document.body.classList.add('menu-open');
      }
    });
  }
  if (navOverlay) {
    navOverlay.addEventListener('click', closeMenu);
  }
  mobileLinks.forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });

  /* ---- Merged scroll handler (header + active nav + parallax) ---- */
  const header = document.getElementById('header');
  const navLinks = document.querySelectorAll('[data-nav]');
  const sections = document.querySelectorAll('section[id]');
  const blobs = document.querySelectorAll('[data-parallax]');
  let lastScroll = 0;
  let scrollTicking = false;

  function onScroll() {
    const scrollY = window.scrollY;

    /* Header hide/show */
    if (scrollY > 80) {
      header.classList.add('header--scrolled');
    } else {
      header.classList.remove('header--scrolled');
    }
    if (scrollY > lastScroll && scrollY > 200) {
      header.classList.add('header--hidden');
    } else {
      header.classList.remove('header--hidden');
    }
    lastScroll = scrollY;

    /* Active nav link */
    let current = '';
    sections.forEach(function (section) {
      const rect = section.getBoundingClientRect();
      if (rect.top <= 120 && rect.bottom >= 120) {
        current = section.id;
      }
    });
    navLinks.forEach(function (link) {
      link.classList.toggle('active', link.getAttribute('href') === '#' + current);
    });

    /* Parallax blobs */
    blobs.forEach(function (blob) {
      const speed = parseFloat(blob.dataset.parallax) || 0.3;
      blob.style.transform = 'translateY(' + scrollY * speed + 'px)';
    });

    scrollTicking = false;
  }

  window.addEventListener('scroll', function () {
    if (!scrollTicking) {
      window.requestAnimationFrame(onScroll);
      scrollTicking = true;
    }
  });

  /* ---- Scroll reveal animations (IntersectionObserver + fallback) ---- */
  const revealElements = document.querySelectorAll('.reveal, .reveal-fade, .reveal-left, .reveal-right, .reveal-scale');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.05, rootMargin: '0px 0px -30px 0px' }
    );
    revealElements.forEach(function (el) {
      observer.observe(el);
    });

    /* Fallback: if any element hasn't become visible after 2.5s, reveal it */
    setTimeout(function () {
      revealElements.forEach(function (el) {
        if (!el.classList.contains('is-visible')) {
          el.classList.add('is-visible');
        }
      });
    }, 2500);
  } else {
    revealElements.forEach(function (el) {
      el.classList.add('is-visible');
    });
  }

  /* ---- Set current year ---- */
  const yearEl = document.querySelector('[data-year]');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  /* ---- Keyboard nav: ESC closes mobile menu ---- */
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      closeMenu();
    }
  });
})();
