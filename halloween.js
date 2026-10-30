/* ==========================================
   BOX800 - HREKKJAVÖKUÞEMA

   Kviknar og slokknar sjálft eftir dagsetningu.
   Breyttu UPPHAF / LOK til að nota aftur seinna.
   (Tímar eru í UTC = íslenskum tíma.)

   Prófa: bættu ?halloween=1 aftan við slóðina
   (eða ?halloween=0 til að slökkva).
========================================== */

(() => {

  const UPPHAF = "2026-10-30T00:00:00Z";
  const LOK    = "2026-11-02T00:00:00Z";   // mánudagur 2. nóv. kl. 00:00

  const param = new URLSearchParams(location.search).get("halloween");
  const nu = Date.now();
  const virkt = param === "1" ||
    (param !== "0" && nu >= Date.parse(UPPHAF) && nu < Date.parse(LOK));

  if (!virkt) return;

  document.documentElement.classList.add("halloween");

  const TEXTI = {
    is: "GLEÐILEGA HREKKJAVÖKU",
    en: "HAPPY HALLOWEEN"
  };

  const LEDURBLAKA =
    '<svg viewBox="0 0 64 32" aria-hidden="true" focusable="false">' +
    '<path fill="currentColor" d="M32 10c1.6 0 2.6-2.2 3.2-4 .5 1.6.4 3.6-.2 5.2 3-1.6 7.6-2.4 11-1.2 3.2 1.1 6.4 3.6 8.4 6.4 2 2.8 3.6 5.6 5.6 6.6-3.2-.8-5.6.6-7.2 2.6-1.4-2.6-4.2-3.6-6.8-2.8-1.4-2.4-4.2-3.4-6.8-2.4-1.6.6-2.9 2.6-3.6 4.8-.6.4-1.6.4-2.2 0-.7-2.2-2-4.2-3.6-4.8-2.6-1-5.4 0-6.8 2.4-2.6-.8-5.4.2-6.8 2.8C14.4 26 12 24.6 8.8 25.4c2-1 3.6-3.8 5.6-6.6 2-2.8 5.2-5.3 8.4-6.4 3.4-1.2 8-.4 11 1.2-.6-1.6-.7-3.6-.2-5.2.6 1.8 1.6 4 3.2 4z"/>' +
    '</svg>';

  const GRASKER =
    '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">' +
    '<path fill="currentColor" d="M12 6.2c-.3-1.6.2-3 1.6-4l1 1.2c-.9.6-1.2 1.5-1.1 2.6 1-.3 2.2-.2 3.3.3 3.4.4 5.6 3.6 5.6 7.4 0 4.3-2.8 7.8-6.4 7.8-1.1 0-2.2-.4-3.1-1-.6.3-1.3.4-1.9.4s-1.3-.1-1.9-.4c-.9.6-2 1-3.1 1C2.8 21.5 0 18 0 13.7c0-3.8 2.2-7 5.6-7.4 2-.9 4.4-.9 6.4-.1z"/>' +
    '</svg>';

  document.addEventListener("DOMContentLoaded", () => {

    const tungumal = () =>
      window.Box800Language?.getLanguage?.() === "en" ? "en" : "is";

    /* KVEÐJA Á FORSÍÐU */

    const heroEfni = document.querySelector(".hero .hero-content");
    let kvedja = null;

    if (heroEfni) {
      kvedja = document.createElement("span");
      kvedja.className = "hw-kvedja";
      kvedja.innerHTML = GRASKER + '<span class="hw-kvedja-texti"></span>';
      heroEfni.prepend(kvedja);
    }

    const uppfaeraKvedju = () => {
      const t = kvedja?.querySelector(".hw-kvedja-texti");
      if (t) t.textContent = TEXTI[tungumal()];
    };

    uppfaeraKvedju();

    const kerfi = window.Box800Language;
    if (kerfi && !kerfi._hrekkjavakaTengd) {
      const upphaflegt = kerfi.setLanguage;
      kerfi.setLanguage = (lang) => {
        upphaflegt(lang);
        uppfaeraKvedju();
      };
      kerfi._hrekkjavakaTengd = true;
    }

    /* LEÐURBLÖKUR YFIR FORSÍÐUMYNDINNI */

    const hero = document.querySelector(".hero");

    if (hero) {
      const hopur = document.createElement("div");
      hopur.className = "hw-ledurblokur";
      hopur.setAttribute("aria-hidden", "true");

      for (let i = 1; i <= 5; i++) {
        const b = document.createElement("span");
        b.className = `hw-blaka hw-blaka-${i}`;
        b.innerHTML = LEDURBLAKA;
        hopur.appendChild(b);
      }

      hero.appendChild(hopur);
    }

  });

})();
