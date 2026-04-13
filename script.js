/* =============================================
   B2G JHARKHAND — script.js
   Black to Green · Premium Climate Initiative
   ============================================= */

// ─── NAVBAR SCROLL ───────────────────────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}, { passive: true });

// ─── MOBILE HAMBURGER ────────────────────────
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
});

// Close mobile menu on link click
mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
  });
});

// ─── REVEAL ON SCROLL ────────────────────────
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      // Stagger delay for sibling reveals
      const siblings = entry.target.parentElement.querySelectorAll('.reveal');
      const siblingIndex = Array.from(siblings).indexOf(entry.target);
      const delay = Math.min(siblingIndex * 80, 400);

      setTimeout(() => {
        entry.target.classList.add('visible');
      }, delay);

      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -60px 0px'
});

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ─── SMOOTH SCROLL FOR NAV LINKS ─────────────
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    const href = link.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (!target) return;
    e.preventDefault();
    const offset = 80; // navbar height
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

// ─── HERO STATS COUNTER ANIMATION ────────────
function animateCount(el, target, suffix, duration = 1800) {
  let start = 0;
  const step = target / (duration / 16);
  const timer = setInterval(() => {
    start += step;
    if (start >= target) {
      el.textContent = target + suffix;
      clearInterval(timer);
    } else {
      el.textContent = Math.floor(start) + suffix;
    }
  }, 16);
}

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const statNums = entry.target.querySelectorAll('.stat-num');
      statNums.forEach(num => {
        const text = num.textContent;
        if (text.includes('12')) animateCount(num, 12, '+');
        if (text.includes('500')) animateCount(num, 500, '+');
        if (text.includes('3M')) {
          // Special case for 3M+
          let start = 0;
          const timer = setInterval(() => {
            start += 0.1;
            if (start >= 3) {
              num.textContent = '3M+';
              clearInterval(timer);
            } else {
              num.textContent = start.toFixed(1) + 'M+';
            }
          }, 30);
        }
      });
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) statsObserver.observe(heroStats);

// ─── MARQUEE PAUSE ON HOVER ───────────────────
const marqueeTrack = document.querySelector('.marquee-track');
if (marqueeTrack) {
  marqueeTrack.addEventListener('mouseenter', () => {
    marqueeTrack.style.animationPlayState = 'paused';
  });
  marqueeTrack.addEventListener('mouseleave', () => {
    marqueeTrack.style.animationPlayState = 'running';
  });
}

// ─── ACTIVE NAV LINK ON SCROLL ───────────────
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      navLinks.forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href') === `#${id}`) {
          link.style.color = 'var(--green-light)';
        }
      });
    }
  });
}, {
  threshold: 0.4,
  rootMargin: '-80px 0px 0px 0px'
});

sections.forEach(section => sectionObserver.observe(section));

// ─── WHATSAPP PULSE EFFECT ───────────────────
const waBtn = document.querySelector('.whatsapp-float');
if (waBtn) {
  setInterval(() => {
    waBtn.style.transform = 'scale(1.08)';
    setTimeout(() => { waBtn.style.transform = ''; }, 400);
  }, 4000);
}

// ─── TILT EFFECT ON CARDS ────────────────────
function addTiltEffect(selector) {
  document.querySelectorAll(selector).forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -4;
      const rotateY = ((x - centerX) / centerX) * 4;
      card.style.transform = `translateY(-6px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      card.style.transition = 'transform 0.1s ease';
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.transition = 'transform 0.35s cubic-bezier(0.4, 0, 0.2, 1)';
    });
  });
}

addTiltEffect('.work-card');
addTiltEffect('.approach-card');
addTiltEffect('.cta-card');

// ─── INIT ────────────────────────────────────
console.log('%cB2G Jharkhand — Black to Green 🌿', 
  'font-size:14px;font-weight:bold;color:#66BB6A;background:#1C1C1C;padding:8px 16px;border-radius:4px;');
console.log('%cYouth-led just transition from the coal belt. Join us.', 
  'font-size:11px;color:#888885;padding:4px 16px;');
