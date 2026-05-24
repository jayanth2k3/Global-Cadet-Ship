// ===== Global Cadet Ship - Main JS =====

// Hamburger menu
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
  hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('open');
    hamburger.classList.toggle('open');
    document.body.style.overflow = navMenu.classList.contains('open') ? 'hidden' : '';
  });

  navMenu.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 768) {
        const navItem = link.parentElement;
        if (navItem.querySelector('.dropdown')) {
          navItem.classList.toggle('open');
          return;
        }
        navMenu.classList.remove('open');
        hamburger.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  });
}

// Active nav link
const currentPath = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-link').forEach(link => {
  const href = link.getAttribute('href');
  if (href === currentPath || (currentPath === '' && href === 'index.html')) {
    link.classList.add('active');
  }
});

// Back to top
const backToTop = document.querySelector('.back-to-top');
if (backToTop) {
  window.addEventListener('scroll', () => {
    backToTop.classList.toggle('show', window.scrollY > 400);
  });
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// Counter animation
function animateCounter(el, target, duration = 1800) {
  let start = 0;
  const step = target / (duration / 16);
  const timer = setInterval(() => {
    start += step;
    if (start >= target) {
      el.textContent = target.toLocaleString();
      clearInterval(timer);
    } else {
      el.textContent = Math.floor(start).toLocaleString();
    }
  }, 16);
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const counters = entry.target.querySelectorAll('[data-count]');
      counters.forEach(el => {
        const target = parseInt(el.getAttribute('data-count'));
        animateCounter(el, target);
      });
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

const statsSection = document.querySelector('.stats-bar');
if (statsSection) observer.observe(statsSection);

// Pill navbar scroll effect
const navPill = document.getElementById('navPill');
if (navPill) {
  window.addEventListener('scroll', () => {
    navPill.classList.toggle('scrolled', window.scrollY > 80);
  });
}

// Pill navbar mobile hamburger
const pillHamburger = document.getElementById('pillHamburger');
if (pillHamburger && navPill) {
  pillHamburger.addEventListener('click', () => {
    navPill.classList.toggle('mobile-open');
    document.body.style.overflow = navPill.classList.contains('mobile-open') ? 'hidden' : '';
  });

  // Level 1: pill-item-dropdown toggle
  navPill.querySelectorAll('.pill-link').forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth > 768) return;
      const parent = link.parentElement;
      if (parent.classList.contains('pill-item-dropdown')) {
        parent.classList.toggle('open');
        return;
      }
      navPill.classList.remove('mobile-open');
      document.body.style.overflow = '';
    });
  });

  // Level 2: pill-has-sub toggle
  navPill.querySelectorAll('.pill-has-sub > a').forEach(link => {
    link.addEventListener('click', (e) => {
      if (window.innerWidth > 768) return;
      e.preventDefault();
      link.parentElement.classList.toggle('open');
    });
  });
}

// Standard sticky navbar scroll shadow
const standardNav = document.querySelector('.navbar');
if (standardNav) {
  window.addEventListener('scroll', () => {
    standardNav.style.boxShadow = window.scrollY > 10
      ? '0 4px 24px rgba(13,33,68,0.15)'
      : '0 2px 20px rgba(13,33,68,0.10)';
  });
}
