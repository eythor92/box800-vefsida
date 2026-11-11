/* ==========================================
   BOX800 - BLACK FRIDAY

   Kviknar og slokknar sjálft eftir dagsetningu.
   (Tímar eru í UTC = íslenskum tíma.)

   Prófa: bættu ?bf=1 aftan við slóðina
   (eða ?bf=0 til að slökkva).

   Til að breyta tilboðinu seinna: breyttu
   UPPHAF / LOK, AFSLATTUR og KORT hér fyrir neðan.
========================================== */

(() => {

  const UPPHAF = "2026-11-27T00:00:00Z";   // föstudagur 27. nóv.
  const LOK    = "2026-12-01T00:00:00Z";   // út mánudaginn 30. nóv.

  const AFSLATTUR = 30;                    // prósent
  const KORT = {
    nr: 3,                                 // 3. spjaldið í „Almenn áskrift“ á verðskránni
    verdAMan: 17900,                       // venjulegt verð á mánuði
    manudir: 3,
    /* Sérstakur Abler-tengill fyrir tilboðið, ef hann er til.
       Annars er venjulegi tengillinn á spjaldinu notaður. */
    tengill: ""
  };

  const param = new URLSearchParams(location.search).get("bf");
  const nu = Date.now();
  const virkt = param === "1" ||
    (param !== "0" && nu >= Date.parse(UPPHAF) && nu < Date.parse(LOK));

  if (!virkt) return;

  document.documentElement.classList.add("bf");

  const kr = (n) => Math.round(n).toLocaleString("de-DE");   // 12.530
  const nyttAMan = KORT.verdAMan * (1 - AFSLATTUR / 100);
  const samtalsAdur = KORT.verdAMan * KORT.manudir;
  const samtalsNytt = nyttAMan * KORT.manudir;

  const TEXTI = {
    is: {
      borði: `BLACK FRIDAY — ${AFSLATTUR}% AFSLÁTTUR AF 3JA MÁNAÐA KORTI — 27.–30. NÓVEMBER —`,
      pilla: `BLACK FRIDAY · ${AFSLATTUR}% AFSLÁTTUR`,
      merki: `BLACK FRIDAY −${AFSLATTUR}%`,
      samtals: `${kr(samtalsNytt)} kr. samtals <s>${kr(samtalsAdur)} kr.</s>`,
      endar: "Tilboðið endar eftir",
      d: "d", klst: "klst", min: "mín", sek: "sek",
      hnappur: "NÝTA TILBOÐIÐ"
    },
    en: {
      borði: `BLACK FRIDAY — ${AFSLATTUR}% OFF THE 3-MONTH CARD — 27–30 NOVEMBER —`,
      pilla: `BLACK FRIDAY · ${AFSLATTUR}% OFF`,
      merki: `BLACK FRIDAY −${AFSLATTUR}%`,
      samtals: `${kr(samtalsNytt)} ISK in total <s>${kr(samtalsAdur)} ISK</s>`,
      endar: "Offer ends in",
      d: "d", klst: "h", min: "min", sek: "s",
      hnappur: "GET THE OFFER"
    }
  };

  document.addEventListener("DOMContentLoaded", () => {

    const tungumal = () =>
      window.Box800Language?.getLanguage?.() === "en" ? "en" : "is";
    const t = () => TEXTI[tungumal()];

    const verdskraSlod = "verdskra.html#almenn";
    const uppfaerslur = [];

    /* ---------- FORSÍÐA: pilla í forsíðumynd + rennandi borði ---------- */

    const heroEfni = document.querySelector(".hero .hero-content");
    if (heroEfni) {
      const pilla = document.createElement("a");
      pilla.className = "bf-pilla";
      pilla.href = verdskraSlod;
      heroEfni.prepend(pilla);
      uppfaerslur.push(() => { pilla.textContent = t().pilla + " →"; });
    }

    const hero = document.querySelector("section.hero");
    if (hero) {
      const bordi = document.createElement("a");
      bordi.className = "ticker bf-ticker";
      bordi.href = verdskraSlod;
      bordi.innerHTML =
        '<div class="ticker-track"><span></span><span aria-hidden="true"></span></div>';
      hero.after(bordi);
      uppfaerslur.push(() => {
        const texti = (t().borði + " ").repeat(2);
        bordi.querySelectorAll(".ticker-track span").forEach((s) => { s.textContent = texti; });
        bordi.setAttribute("aria-label", t().borði.replace(/ —$/, ""));
      });
    }

    /* ---------- VERÐSKRÁ: tilboðsspjald ---------- */

    const spjald = document.querySelectorAll("#almenn .price-card")[KORT.nr - 1];

    if (spjald) {
      spjald.classList.add("bf-card");

      const merki = document.createElement("span");
      merki.className = "bf-merki";
      spjald.prepend(merki);

      const upph = spjald.querySelector(".price-amount");
      const adur = document.createElement("div");
      adur.className = "bf-adur";
      adur.textContent = kr(KORT.verdAMan);
      upph.before(adur);

      /* Skipta bara um töluna; <small> (kr./mán.) er þýtt af language.js */
      const talan = [...upph.childNodes].find((n) => n.nodeType === 3 && n.textContent.trim());
      if (talan) talan.textContent = kr(nyttAMan) + " ";

      const samtals = document.createElement("div");
      samtals.className = "bf-samtals";
      upph.after(samtals);

      const nidurtalning = document.createElement("div");
      nidurtalning.className = "bf-nidurtalning";
      samtals.after(nidurtalning);

      const hnappur = spjald.querySelector(".price-button");
      if (KORT.tengill && hnappur) hnappur.href = KORT.tengill;

      const telja = () => {
        let s = Math.max(0, Math.floor((Date.parse(LOK) - Date.now()) / 1000));
        const d = Math.floor(s / 86400); s %= 86400;
        const h = Math.floor(s / 3600); s %= 3600;
        const m = Math.floor(s / 60); s %= 60;
        const x = t();
        const tvo = (n) => String(n).padStart(2, "0");
        nidurtalning.innerHTML =
          `${x.endar} <b>${d}${x.d} ${tvo(h)}${x.klst} ${tvo(m)}${x.min} ${tvo(s)}${x.sek}</b>`;
      };

      uppfaerslur.push(() => {
        merki.textContent = t().merki;
        samtals.innerHTML = t().samtals;
        if (hnappur) hnappur.textContent = t().hnappur;
        telja();
      });

      setInterval(telja, 1000);
    }

    /* ---------- Tungumál ---------- */

    const uppfaera = () => uppfaerslur.forEach((f) => f());
    uppfaera();

    const kerfi = window.Box800Language;
    if (kerfi && !kerfi._bfTengd) {
      const upphaflegt = kerfi.setLanguage;
      kerfi.setLanguage = (lang) => {
        upphaflegt(lang);
        uppfaera();
      };
      kerfi._bfTengd = true;
    }

  });

})();
