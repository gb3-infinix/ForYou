// ==== Очікуємо завантаження DOM ====
document.addEventListener("DOMContentLoaded", () => {
  const spoilers = document.querySelectorAll(".spoiler");
  const spoilerTexts = document.querySelectorAll(".spoiler-text");

  // Функція відкриття спойлера з плавним ефектом
  const openSpoiler = (element) => {
    element.classList.add("clicked");
    element.style.transition = "filter 0.5s ease";
  };

  // Події для фото (спойлер)
  spoilers.forEach((spoiler) => {
    ["click", "touchstart"].forEach((evt) => {
      spoiler.addEventListener(evt, () => openSpoiler(spoiler), { passive: true });
    });
  });

  // Події для текстових блоків
  spoilerTexts.forEach((textBlock) => {
    ["click", "touchstart"].forEach((evt) => {
      textBlock.addEventListener(
        evt,
        () => openSpoiler(textBlock.parentElement),
        { passive: true }
      );
    });
  });

  // ==== Анімація при скролі ====
  const elementsToAnimate = document.querySelectorAll(".step, .image-container, .text-container");

  const fadeInObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          fadeInObserver.unobserve(entry.target); // розвантажуємо
        }
      });
    },
    { threshold: 0.15 }
  );

  elementsToAnimate.forEach((el) => fadeInObserver.observe(el));

  // ==== Модалка підтвердження ====
  const confirmButton = document.getElementById("confirm-button");
  const modalOverlay = document.getElementById("love-check");

  if (confirmButton) {
    confirmButton.addEventListener("click", () => {
      modalOverlay.style.opacity = "0";
      modalOverlay.style.pointerEvents = "none";
      setTimeout(() => {
        modalOverlay.style.display = "none";
      }, 400);
      // Запускаємо музику автоматично після підтвердження
      if (music.paused) {
        music.play().catch(() => {
          console.warn("Автозапуск музики заблоковано браузером");
        });
        toggle.textContent = "🔊";
      }
    });
  }

  // ==== Музика ====
  const music = document.getElementById("bg-music");
  const toggle = document.getElementById("music-toggle");

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
