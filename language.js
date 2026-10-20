
/* ==========================================
   BOX800 - LANGUAGE SYSTEM
========================================== */

(() => {

  const STORAGE_KEY = "box800-language";
  const originals = new WeakMap();

  /* ======================================
     PAGE TITLES & META DESCRIPTIONS
  ====================================== */

  const pageInfo = {

    "index.html": {
      title: "BOX800 | Be Part of an Amazing Community",
      description:
        "BOX800 fitness gym in Selfoss, Iceland. Varied training, quality coaching and a welcoming community for all fitness levels."
    },

    "um-okkur.html": {
      title: "About Us | BOX800",
      description:
        "Discover BOX800 in Selfoss, Iceland. Quality coaching, varied workouts and a strong, welcoming community."
    },

    "namskeid.html": {
      title: "Programs | BOX800",
      description:
        "Explore BOX800 fitness programs in Selfoss, Iceland. Training for beginners and experienced participants of all ages."
    },

    "timatafla.html": {
      title: "Class Schedule | BOX800",
      description:
        "Explore the BOX800 class schedule in Selfoss, Iceland. Discover Hreysti, HYROX and Barre classes for all fitness levels."
    },

    "thjalfarar.html": {
      title: "Our Coaches | BOX800",
      description:
        "Meet the coaches at BOX800 in Selfoss, Iceland. Experienced coaches, professional guidance and a welcoming fitness community."
    },

    "verdskra.html": {
      title: "Pricing & Memberships | BOX800",
      description:
        "Explore BOX800 membership prices, student memberships and fitness programs in Selfoss, Iceland."
    },

    "dropin.html": {
      title: "Drop-in Training | BOX800",
      description:
        "Visiting Selfoss or South Iceland? Join a group workout or HYROX class at BOX800. All fitness levels are welcome."
    },

    "samband.html": {
      title: "Contact Us | BOX800",
      description:
        "Contact BOX800 in Selfoss, Iceland. Find us at Eyravegur 57, ask about our classes or send us a message."
    }

  };

  const originalTitle = document.title;

  const descriptionElement =
    document.querySelector('meta[name="description"]');

  const originalDescription =
    descriptionElement?.getAttribute("content") || "";

  /* ======================================
     LANGUAGE STORAGE
  ====================================== */

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

  /* ======================================
     TRANSLATE PAGE
  ====================================== */

  function translatePage() {

    const translations =
      window.box800Translations?.en || {};

    document.documentElement.lang = currentLanguage;

    const currentPage =
      window.location.pathname.split("/").pop() ||
      "index.html";

    const info = pageInfo[currentPage];

    /* PAGE TITLE AND META DESCRIPTION */

    if (currentLanguage === "en") {

      if (info) {

        document.title = info.title;

        if (descriptionElement) {
          descriptionElement.setAttribute(
            "content",
            info.description
          );
        }

      }

    } else {

      document.title = originalTitle;

      if (descriptionElement) {
        descriptionElement.setAttribute(
          "content",
          originalDescription
        );
      }

    }

    /* TRANSLATE TEXT ELEMENTS */

    Object.entries(translations).forEach(
      ([selector, values]) => {

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

    /* ======================================
       COURSE READ MORE / READ LESS
    ====================================== */

    document.querySelectorAll(".course-read-btn")
      .forEach(button => {

        const isExpanded =
          button.getAttribute("aria-expanded") === "true";

        button.textContent = currentLanguage === "en"
          ? (isExpanded ? "READ LESS" : "READ MORE")
          : (isExpanded ? "LESA MINNA" : "LESA MEIRA");

      });

    /* ======================================
       LANGUAGE SWITCH BUTTONS
    ====================================== */

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

    /* ======================================
       PRICING NAVIGATION ACCESSIBILITY
    ====================================== */

    const priceTabs = document.querySelector(".price-tabs");

    if (priceTabs) {
      priceTabs.setAttribute(
        "aria-label",
        currentLanguage === "en"
          ? "Pricing categories"
          : "Verðflokkar"
      );
    }

    /* ======================================
       CONTACT FORM PLACEHOLDERS
    ====================================== */

    const placeholders = {
      name: {
        is: "Fullt nafn",
        en: "Full name"
      },
      email: {
        is: "jon@jon.is",
        en: "name@example.com"
      },
      subject: {
        is: "Viðfangsefni",
        en: "Subject"
      },
      message: {
        is: "Skilaboð...",
        en: "Your message..."
      }
    };

    Object.entries(placeholders).forEach(
      ([id, values]) => {

        const element = document.getElementById(id);

        if (element) {
          element.placeholder = values[currentLanguage];
        }

      }
    );

    /* ======================================
       CONTACT FORM ACCESSIBILITY
    ====================================== */

    const mapFrame =
      document.querySelector(".map-frame iframe");

    if (mapFrame) {
      mapFrame.title = currentLanguage === "en"
        ? "BOX800 location at Eyravegur 57, Selfoss"
        : "Staðsetning BOX800 á Eyravegi 57, Selfossi";
    }

    /* ======================================
       CONTACT FORM EMAIL SUBJECT
    ====================================== */

    const formSubject =
      document.querySelector(
        '.contact-form input[name="_subject"]'
      );

    if (formSubject) {
      formSubject.value = currentLanguage === "en"
        ? "New enquiry from the BOX800 website"
        : "Ný fyrirspurn frá BOX800 vefsíðunni";
    }

  }

  /* ======================================
     SET LANGUAGE
  ====================================== */

  function setLanguage(language) {

    if (!["is", "en"].includes(language)) return;

    currentLanguage = language;

    try {
      localStorage.setItem(STORAGE_KEY, language);
    } catch {
      // Language switching works without storage.
    }

    translatePage();
  }

  /* ======================================
     PUBLIC FUNCTIONS
  ====================================== */

  window.Box800Language = {
    setLanguage,
    translatePage,
    getLanguage: () => currentLanguage
  };

  /* ======================================
     INITIAL TRANSLATION
  ====================================== */

  document.addEventListener("DOMContentLoaded", () => {
    setTimeout(translatePage, 0);
  });

})();
