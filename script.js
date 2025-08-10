// Очікуємо завантаження DOM
document.addEventListener("DOMContentLoaded", () => {
  const spoilers = document.querySelectorAll(".spoiler");
  const spoilerTexts = document.querySelectorAll(".spoiler-text");

  // Обробка кліку по фото (спойлер)
  spoilers.forEach((spoiler) => {
    spoiler.addEventListener("click", () => {
      spoiler.classList.add("clicked");
    });
  });

  // Обробка кліку по текстовому блоку
  spoilerTexts.forEach((textBlock) => {
    textBlock.addEventListener("click", () => {
      textBlock.parentElement.classList.add("clicked");
    });
  });

  // М'яка анімація появи блоків при скролі
  const steps = document.querySelectorAll(".step");
  const options = {
    threshold: 0.1,
  };

  const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, options);

  steps.forEach((step) => {
    fadeInObserver.observe(step);
  });
});

// Реєстрація
const confirmButton = document.getElementById("confirm-button");
const modalOverlay = document.getElementById("love-check");

if (confirmButton) {
  confirmButton.addEventListener("click", () => {
    modalOverlay.style.display = "none";
  });
}

// Музика
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
