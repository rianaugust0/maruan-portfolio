// Central PICC & Experiência Interativa PICC (Redesign Cinematográfico Fidelidade Mockup)
document.addEventListener('DOMContentLoaded', () => {
  // 1. CENTRAL PICC - TIMELINE COM 5 TÓPICOS
  const topicBtns = document.querySelectorAll('[data-topic-target]');
  const topicPanels = document.querySelectorAll('[data-topic-panel]');
  const counterCurrent = document.getElementById('piccCurrentStep');
  const progressBar = document.getElementById('piccProgressBar');
  const prevBtn = document.getElementById('piccPrevBtn');
  const nextBtn = document.getElementById('piccNextBtn');
  const carouselTrack = document.getElementById('piccCarouselTrack');

  let currentIndex = 0;
  const totalTopics = topicBtns.length;

  function setActiveTopic(index, scrollIntoView = false) {
    if (index < 0 || index >= totalTopics) return;
    currentIndex = index;

    topicBtns.forEach((btn, i) => {
      const isActive = i === index;
      btn.classList.toggle('active', isActive);
      btn.setAttribute('aria-selected', isActive ? 'true' : 'false');
      btn.setAttribute('tabindex', isActive ? '0' : '-1');
    });

    topicPanels.forEach((panel, i) => {
      const isActive = i === index;
      panel.classList.toggle('active', isActive);
      panel.setAttribute('aria-hidden', isActive ? 'false' : 'true');
    });

    if (counterCurrent) {
      counterCurrent.textContent = String(index + 1).padStart(2, '0');
    }
    if (progressBar) {
      progressBar.style.width = `${((index + 1) / totalTopics) * 100}%`;
    }

    if (carouselTrack && window.innerWidth <= 860) {
      const activePanel = topicPanels[index];
      if (activePanel && scrollIntoView) {
        activePanel.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      }
    }

    if (prevBtn) prevBtn.disabled = index === 0;
    if (nextBtn) nextBtn.disabled = index === totalTopics - 1;
  }

  topicBtns.forEach((btn, i) => {
    btn.addEventListener('click', () => setActiveTopic(i));
    btn.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        e.preventDefault();
        setActiveTopic((i + 1) % totalTopics);
        topicBtns[(i + 1) % totalTopics].focus();
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        e.preventDefault();
        setActiveTopic((i - 1 + totalTopics) % totalTopics);
        topicBtns[(i - 1 + totalTopics).focus()];
      }
    });
  });

  if (prevBtn) {
    prevBtn.addEventListener('click', () => setActiveTopic(currentIndex - 1, true));
  }
  if (nextBtn) {
    nextBtn.addEventListener('click', () => setActiveTopic(currentIndex + 1, true));
  }

  // Touch Swipe para Mobile
  if (carouselTrack) {
    let touchStartX = 0;
    let touchEndX = 0;

    carouselTrack.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    carouselTrack.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      const diff = touchStartX - touchEndX;
      if (Math.abs(diff) > 40) {
        if (diff > 0 && currentIndex < totalTopics - 1) {
          setActiveTopic(currentIndex + 1, true);
        } else if (diff < 0 && currentIndex > 0) {
          setActiveTopic(currentIndex - 1, true);
        }
      }
    }, { passive: true });
  }

  setActiveTopic(0);

  // 2. PERCURSO DE SITUAÇÕES ("QUAL É A SUA SITUAÇÃO?")
  const sitBtns = document.querySelectorAll('[data-situation-target]');
  const sitPanels = document.querySelectorAll('[data-situation-panel]');

  function setSituation(id) {
    sitBtns.forEach(btn => {
      const isTarget = btn.getAttribute('data-situation-target') === id;
      btn.classList.toggle('active', isTarget);
      btn.setAttribute('aria-expanded', isTarget ? 'true' : 'false');
    });

    sitPanels.forEach(panel => {
      const isTarget = panel.getAttribute('data-situation-panel') === id;
      panel.classList.toggle('active', isTarget);
    });
  }

  sitBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const sitId = btn.getAttribute('data-situation-target');
      setSituation(sitId);
    });
  });

  // 3. CONSTRUTOR DE MENSAGEM WHATSAPP (1ª PESSOA)
  const q1Btns = document.querySelectorAll('[data-q1]');
  const q2Btns = document.querySelectorAll('[data-q2]');
  const waPreviewText = document.getElementById('waPreviewText');
  const waBuilderCta = document.getElementById('waBuilderCta');

  let stateQ1 = 'SIM';
  let stateQ2 = 'ENTENDER';

  function updateWhatsAppMessage() {
    let q1Text = 'O paciente já utiliza PICC';
    if (stateQ1 === 'NAO') q1Text = 'O paciente ainda não utiliza PICC';
    if (stateQ1 === 'NAO_SEI') q1Text = 'Estou em dúvida se o paciente utiliza PICC';

    let q2Text = 'e gostaria de entender se o atendimento é possível.';
    if (stateQ2 === 'ORIENTACAO') q2Text = 'e tenho uma orientação e gostaria de tirar dúvidas.';
    if (stateQ2 === 'CUIDADO') q2Text = 'e preciso de um cuidado que foi solicitado.';
    if (stateQ2 === 'DUVIDA') q2Text = 'e tenho algumas dúvidas sobre o atendimento.';
    if (stateQ2 === 'NAO_SEI') q2Text = 'e gostaria de explicar nossa situação para entender o próximo passo.';

    const message = `Olá, Maruan! Encontrei sua página sobre PICC. ${q1Text} ${q2Text}`;

    if (waPreviewText) {
      waPreviewText.textContent = `"${message}"`;
    }

    if (waBuilderCta) {
      const encodedMsg = encodeURIComponent(message);
      waBuilderCta.href = `https://wa.me/5527997740754?text=${encodedMsg}`;
    }
  }

  q1Btns.forEach(btn => {
    btn.addEventListener('click', () => {
      q1Btns.forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      stateQ1 = btn.getAttribute('data-q1');
      updateWhatsAppMessage();
    });
  });

  q2Btns.forEach(btn => {
    btn.addEventListener('click', () => {
      q2Btns.forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      stateQ2 = btn.getAttribute('data-q2');
      updateWhatsAppMessage();
    });
  });

  updateWhatsAppMessage();

  // 4. EFEITO PARALLAX E REVEAL SUAVE (DESKTOP)
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reduceMotion && window.innerWidth > 920) {
    const heroImg = document.querySelector('.hero-cinematic-bg img');
    if (heroImg) {
      window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        if (scrolled < 1000) {
          heroImg.style.transform = `scale(1.03) translateY(${scrolled * 0.1}px)`;
        }
      }, { passive: true });
    }
  }
});
