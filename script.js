document.addEventListener("DOMContentLoaded", () => {
  // === Функція автоматичного зняття блюру ===
  const openSpoiler = (element) => {
    element.classList.add("clicked");
  };

  // === Анімація при скролі ===
  const elementsToAnimate = document.querySelectorAll(".step, .image-container, .text-container");

  const fadeInObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");

          // Знімаємо блюр з фото
          if (entry.target.classList.contains("image-container")) {
            const spoilerEl = entry.target.querySelector(".spoiler");
            if (spoilerEl) openSpoiler(spoilerEl);
          }

          // Знімаємо блюр з тексту (рамки)
          if (entry.target.classList.contains("text-container")) {
            openSpoiler(entry.target);
          }

          fadeInObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  elementsToAnimate.forEach((el) => fadeInObserver.observe(el));

  // ==== Модалка підтвердження ====
  const confirmButton = document.getElementById("confirm-button");
  const modalOverlay = document.getElementById("love-check");
  const music = document.getElementById("bg-music");
  const toggle = document.getElementById("music-toggle");

  if (confirmButton) {
    confirmButton.addEventListener("click", () => {
      modalOverlay.style.opacity = "0";
      modalOverlay.style.pointerEvents = "none";
      setTimeout(() => {
        modalOverlay.style.display = "none";
      }, 400);
      if (music.paused) {
        music.play().catch(() => {});
        toggle.textContent = "🔊";
      }
    });
  }

  // ==== Музика ====
  if (toggle && music) {
    toggle.addEventListener("click", () => {
      if (music.paused) {
        music.play();
        toggle.textContent = "🔊";
      } else {
        music.pause();
        toggle.textContent = "🎵";
      }
    });
  }
});
