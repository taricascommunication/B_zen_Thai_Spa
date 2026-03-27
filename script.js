/* ============================================
   B ZEN THAI SPA — Main Script
   ============================================ */

(function () {
  'use strict';

  // ---------- HEADER SCROLL ----------
  const header = document.getElementById('header');
  let lastScroll = 0;

  function onScroll() {
    const y = window.scrollY;
    if (y > 40) {
      header.classList.add('header--scrolled');
    } else {
      header.classList.remove('header--scrolled');
    }
    lastScroll = y;
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ---------- ACTIVE NAV LINK ----------
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.header__nav-link');

  function updateActiveLink() {
    const scrollY = window.scrollY + 120;
    sections.forEach(function (section) {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');
      if (scrollY >= top && scrollY < top + height) {
        navLinks.forEach(function (link) {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + id) {
            link.classList.add('active');
          }
        });
      }
    });
  }
  window.addEventListener('scroll', updateActiveLink, { passive: true });
  updateActiveLink();

  // ---------- MOBILE MENU ----------
  const burger = document.querySelector('.header__burger');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileLinks = mobileMenu.querySelectorAll('.mobile-menu__link');

  function toggleMenu() {
    const isOpen = burger.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    mobileMenu.setAttribute('aria-hidden', !isOpen);
    burger.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }

  burger.addEventListener('click', toggleMenu);

  mobileLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      if (mobileMenu.classList.contains('active')) {
        toggleMenu();
      }
    });
  });

  // Close on mobile CTA clicks too
  mobileMenu.querySelectorAll('.btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      if (mobileMenu.classList.contains('active')) {
        toggleMenu();
      }
    });
  });

  // ---------- LIGHTBOX ----------
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = lightbox.querySelector('.lightbox__img');
  const lightboxClose = lightbox.querySelector('.lightbox__close');
  const lightboxPrev = lightbox.querySelector('.lightbox__prev');
  const lightboxNext = lightbox.querySelector('.lightbox__next');
  const galleryItems = document.querySelectorAll('.galerie__item[data-lightbox]');

  const gallerySrcs = [];
  galleryItems.forEach(function (item) {
    gallerySrcs.push(item.querySelector('img').src);
  });

  let currentIdx = 0;

  function openLightbox(idx) {
    currentIdx = idx;
    lightboxImg.src = gallerySrcs[currentIdx];
    lightbox.classList.add('active');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('active');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function nextPhoto() {
    currentIdx = (currentIdx + 1) % gallerySrcs.length;
    lightboxImg.src = gallerySrcs[currentIdx];
  }

  function prevPhoto() {
    currentIdx = (currentIdx - 1 + gallerySrcs.length) % gallerySrcs.length;
    lightboxImg.src = gallerySrcs[currentIdx];
  }

  galleryItems.forEach(function (item) {
    item.addEventListener('click', function () {
      openLightbox(parseInt(item.dataset.lightbox, 10));
    });
  });

  lightboxClose.addEventListener('click', closeLightbox);
  lightboxNext.addEventListener('click', nextPhoto);
  lightboxPrev.addEventListener('click', prevPhoto);

  lightbox.addEventListener('click', function (e) {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', function (e) {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') nextPhoto();
    if (e.key === 'ArrowLeft') prevPhoto();
  });

  // ---------- REVEAL ON SCROLL ----------
  const reveals = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    reveals.forEach(function (el) { observer.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('visible'); });
  }

  // ---------- SMOOTH SCROLL OFFSET ----------
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var href = this.getAttribute('href');
      if (href === '#') return;
      var target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        var offset = header.offsetHeight + 16;
        var top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });

})();
