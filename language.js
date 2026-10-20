/* ==========================================
   BOX800 - LANGUAGE SYSTEM
========================================== */

(() => {
  const STORAGE_KEY = "box800-language";

  const originals = new WeakMap();

  function getSavedLanguage() {
    try {
      return localStorage.getItem(STORAGE_KEY) === "en"
        ? "en"
        : "is";
    } catch {
      return "is";
    }
  }

  let currentLanguage = getSavedLanguage();

  function translatePage() {
    const translations =
      window.box800Translations?.en || {};

    document.documentElement.lang = currentLanguage;

    Object.entries(translations).forEach(
      ([selector, values]) => {

        if (selector === "title") {
          if (currentLanguage === "en") {
            if (!document.title.includes("Amazing Community")) {
              document.documentElement.dataset.originalTitle =
                document.title;
            }

            document.title = values[0];
          } else {
            document.title =
              document.documentElement.dataset.originalTitle ||
              document.title;
          }

          return;
        }

        const elements =
          document.querySelectorAll(selector);

        elements.forEach((element, index) => {

          if (values[index] === undefined) return;

          if (!originals.has(element)) {
            originals.set(element, element.innerHTML);
          }

          if (currentLanguage === "en") {
            element.innerHTML = values[index];
          } else {
            element.innerHTML = originals.get(element);
          }

        });
      }
    );

    document.querySelectorAll(
      ".language-switch button"
    ).forEach(button => {

      const active =
        button.dataset.lang === currentLanguage;

      button.classList.toggle("is-active", active);

      button.setAttribute(
        "aria-pressed",
        String(active)
      );
    });
  }

  function setLanguage(language) {
    if (!["is", "en"].includes(language)) return;

    currentLanguage = language;

    try {
      localStorage.setItem(STORAGE_KEY, language);
    } catch {
      // Language switching still works without storage.
    }

    translatePage();
  }

  window.Box800Language = {
    setLanguage,
    translatePage,
    getLanguage: () => currentLanguage
  };

  document.addEventListener("DOMContentLoaded", () => {
    // Wait until the shared header and footer are rendered.
    setTimeout(translatePage, 0);
  });

})();