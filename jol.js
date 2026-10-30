/* ==========================================
   BOX800 - JÓLAÞEMA

   Kviknar og slokknar sjálft eftir dagsetningu.
   Breyttu UPPHAF / LOK til að nota aftur seinna.
   (Tímar eru í UTC = íslenskum tíma.)

   Prófa: bættu ?jol=1 aftan við slóðina
   (eða ?jol=0 til að slökkva).
========================================== */

(() => {

  const UPPHAF = "2026-12-01T00:00:00Z";
  const LOK    = "2027-01-07T00:00:00Z";   // eftir þrettándann

  const param = new URLSearchParams(location.search).get("jol");
  const nu = Date.now();
  const virkt = param === "1" ||
    (param !== "0" && nu >= Date.parse(UPPHAF) && nu < Date.parse(LOK));

  if (!virkt) return;

  document.documentElement.classList.add("jol");

  /* Fyrir jól: "Gleðileg jól". Eftir jól: "Gleðilegt nýtt ár". */
  const eftirJol = new Date(nu).getUTCMonth() === 0 ||
    (new Date(nu).getUTCMonth() === 11 && new Date(nu).getUTCDate() >= 27);

  const TEXTI = eftirJol
    ? { is: "GLEÐILEGT NÝTT ÁR", en: "HAPPY NEW YEAR" }
    : { is: "GLEÐILEG JÓL", en: "MERRY CHRISTMAS" };

  const STJARNA =
    '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">' +
    '<path d="M12 2v20M3.3 7l17.4 10M20.7 7L3.3 17"/>' +
    '<path d="M9.5 3.5L12 6l2.5-2.5M9.5 20.5L12 18l2.5 2.5"/>' +
    '</svg>';

  document.addEventListener("DOMContentLoaded", () => {

    const tungumal = () =>
      window.Box800Language?.getLanguage?.() === "en" ? "en" : "is";

    /* KVEÐJA Á FORSÍÐU */

    const heroEfni = document.querySelector(".hero .hero-content");
    let kvedja = null;

    if (heroEfni) {
      kvedja = document.createElement("span");
      kvedja.className = "jol-kvedja";
      kvedja.innerHTML = STJARNA + '<span class="jol-kvedja-texti"></span>';
      heroEfni.prepend(kvedja);
    }

    const uppfaeraKvedju = () => {
      const t = kvedja?.querySelector(".jol-kvedja-texti");
      if (t) t.textContent = TEXTI[tungumal()];
    };

    uppfaeraKvedju();

    const kerfi = window.Box800Language;
    if (kerfi && !kerfi._jolTengd) {
      const upphaflegt = kerfi.setLanguage;
      kerfi.setLanguage = (lang) => {
        upphaflegt(lang);
        uppfaeraKvedju();
      };
      kerfi._jolTengd = true;
    }

    /* SNJÓKOMA YFIR FORSÍÐUMYNDINNI */

    const hero = document.querySelector(".hero");

    if (hero) {
      const snjor = document.createElement("div");
      snjor.className = "jol-snjor";
      snjor.setAttribute("aria-hidden", "true");

      const fjoldi = window.innerWidth < 760 ? 28 : 55;

      for (let i = 0; i < fjoldi; i++) {
        const k = document.createElement("span");
        k.className = "jol-korn";
        const staerd = 2 + Math.random() * 4;
        k.style.left = `${Math.random() * 100}%`;
        k.style.width = `${staerd}px`;
        k.style.height = `${staerd}px`;
        k.style.opacity = String(0.35 + Math.random() * 0.55);
        k.style.animationDuration = `${9 + Math.random() * 10}s, ${3 + Math.random() * 3}s`;
        k.style.animationDelay = `${-Math.random() * 18}s, ${-Math.random() * 6}s`;
        snjor.appendChild(k);
      }

      hero.appendChild(snjor);
    }

  });

})();
