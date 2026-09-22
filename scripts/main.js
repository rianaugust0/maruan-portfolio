// Ativar sistema de revelação apenas com JavaScript carregado com sucesso
document.documentElement.classList.add('js-ready');

// ============ BRAND INTRO CONTROLLER (MR LIFE CARE) ============
(function initBrandIntro() {
  const introOverlay = document.getElementById('brandIntroOverlay');
  if (!introOverlay) return;

  const storageKey = 'mr_life_care_intro_shown';
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const alreadyShown = sessionStorage.getItem(storageKey);

  if (alreadyShown || reduceMotion) {
    document.documentElement.classList.add('skip-brand-intro');
    introOverlay.classList.add('dismissed');
    introOverlay.style.display = 'none';
    return;
  }

  // Sequência cinematográfica curta (~1.75s total)
  const TOTAL_DURATION = 1750;
  const FADE_OUT_DURATION = 450;

  setTimeout(() => {
    introOverlay.classList.add('dismissed');
    try {
      sessionStorage.setItem(storageKey, 'true');
    } catch (e) {
      // Fallback gracioso caso sessionStorage esteja bloqueado
    }
    setTimeout(() => {
      introOverlay.style.display = 'none';
    }, FADE_OUT_DURATION);
  }, TOTAL_DURATION);
})();

// Header Scroll State
const nav = document.getElementById('siteNav');
const onScroll = () => {
  if (nav) {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  }
};
window.addEventListener('scroll', onScroll);
onScroll();

// Mobile Navigation Toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', open);
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// Reduced Motion Preference
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Scroll Reveal System
const revealEls = document.querySelectorAll('[data-reveal]');
if (reduceMotion) {
  revealEls.forEach(el => el.classList.add('in'));
} else if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  revealEls.forEach(el => io.observe(el));
} else {
  revealEls.forEach(el => el.classList.add('in'));
}

// FAQ Accordion System
const faqItems = document.querySelectorAll('.faq-item');
faqItems.forEach(item => {
  const btn = item.querySelector('.faq-question');
  if (btn) {
    btn.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      
      faqItems.forEach(other => {
        if (other !== item) {
          other.classList.remove('open');
          const otherBtn = other.querySelector('.faq-question');
          if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
        }
      });

      item.classList.toggle('open', !isOpen);
      btn.setAttribute('aria-expanded', !isOpen);
    });
  }
});

// Mobile WhatsApp Bar Smooth Observer (Desaparecer suavemente no CTA Final)
const mobileBar = document.getElementById('mobileWhatsappBar');
const ctaFinal = document.getElementById('contato');

if (mobileBar && ctaFinal && 'IntersectionObserver' in window) {
  const barObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        mobileBar.classList.add('hide');
      } else {
        mobileBar.classList.remove('hide');
      }
    });
  }, { threshold: 0.1 });

  barObserver.observe(ctaFinal);
}

// Modal de Referências Técnicas na Home
const btnOpenRefModal = document.getElementById('btnOpenRefModal');
const btnCloseRefModal = document.getElementById('btnCloseRefModal');
const refModalBackdrop = document.getElementById('refModalBackdrop');

if (btnOpenRefModal && refModalBackdrop) {
  const openModal = () => {
    refModalBackdrop.classList.add('is-open');
    refModalBackdrop.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    refModalBackdrop.classList.remove('is-open');
    refModalBackdrop.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  btnOpenRefModal.addEventListener('click', openModal);

  if (btnCloseRefModal) {
    btnCloseRefModal.addEventListener('click', closeModal);
  }

  refModalBackdrop.addEventListener('click', (e) => {
    if (e.target === refModalBackdrop) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && refModalBackdrop.classList.contains('is-open')) {
      closeModal();
    }
  });
}

