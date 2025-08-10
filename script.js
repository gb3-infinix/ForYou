// Очікуємо завантаження DOM
document.addEventListener("DOMContentLoaded", () => {
  const spoilers = document.querySelectorAll(".spoiler");
  const spoilerTexts = document.querySelectorAll(".spoiler-text");

  // Функція відкриття спойлера
  const openSpoiler = (element) => {
    element.classList.add("clicked");
  };

  // Обробка кліку та торкання по фото (спойлер)
  spoilers.forEach((spoiler) => {
    ["click", "touchstart"].forEach((evt) => {
      spoiler.addEventListener(evt, () => openSpoiler(spoiler));
    });
  });

  // Обробка кліку та торкання по текстовому блоку
  spoilerTexts.forEach((textBlock) => {
    ["click", "touchstart"].forEach((evt) => {
      textBlock.addEventListener(evt, () =>
        openSpoiler(textBlock.parentElement)
      );
    });
  });

  // М'яка анімація появи блоків при скролі
  const elementsToAnimate = document.querySelectorAll(".step, .image-container, .text-container");
  const options = {
    threshold: 0.1,
  };

  const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, options);

  elementsToAnimate.forEach((el) => {
    fadeInObserver.observe(el);
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
