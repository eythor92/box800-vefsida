/* ==========================================
   BOX800 - FORSÍÐA
   1. Myndband í forsíðumynd (aðeins í síma)
   2. „Næsti tími“ úr timatafla-data.js
========================================== */

(() => {

  const tungumal = () =>
    window.Box800Language?.getLanguage?.() === "en" ? "en" : "is";

  /* ======================================
     1. MYNDBAND
     Hleðst bara í síma (lóðrétt), ekki ef
     notandi vill minni hreyfingu eða
     sparar gögn.
  ====================================== */

  const video = document.querySelector(".hero-video");

  if (video) {
    const simi = window.matchMedia("(max-width: 760px) and (orientation: portrait)");
    const minniHreyfing = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sparaGogn = navigator.connection?.saveData;

    const hlada = () => {
      if (!simi.matches || minniHreyfing.matches || sparaGogn || video.dataset.hladid) return;
      video.src = video.dataset.src;
      video.dataset.hladid = "1";
      video.play().catch(() => {});
      video.addEventListener("playing", () => video.classList.add("is-playing"), { once: true });
    };

    hlada();
    simi.addEventListener?.("change", hlada);
  }

  /* ======================================
     2. NÆSTI TÍMI
  ====================================== */

  const reitur = document.getElementById("naesti-timi");
  const gogn = window.box800Timatafla;

  if (!reitur || !gogn) return;

  const DAGAR = ["man", "thr", "mid", "fim", "fos", "lau", "sun"];

  const TEXTI = {
    is: {
      naesti: "Næsti tími",
      igangi: "Í gangi núna",
      eftir: (m) => m < 60 ? `eftir ${m} mín.` : `eftir ${Math.floor(m / 60)} klst. ${m % 60 ? (m % 60) + " mín." : ""}`.trim(),
      a_morgun: "á morgun",
      dagar: ["mánudag", "þriðjudag", "miðvikudag", "fimmtudag", "föstudag", "laugardag", "sunnudag"],
      a: "á",
      kl: "kl.",
      tafla: "Tímatafla"
    },
    en: {
      naesti: "Next class",
      igangi: "Happening now",
      eftir: (m) => m < 60 ? `in ${m} min` : `in ${Math.floor(m / 60)} h ${m % 60 ? (m % 60) + " min" : ""}`.trim(),
      a_morgun: "tomorrow",
      dagar: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      a: "on",
      kl: "at",
      tafla: "Schedule"
    }
  };

  const minutur = (hhmm) => {
    const [h, m] = hhmm.split(":").map(Number);
    return h * 60 + m;
  };

  const heiti = (t, lang) =>
    (lang === "en" && gogn.flokkar?.[t.heiti]?.en) || t.heiti;

  /* Ísland er á UTC allt árið */
  function finnaNaesta() {
    const nu = new Date();
    const dagur = (nu.getUTCDay() + 6) % 7;
    const nuMin = nu.getUTCHours() * 60 + nu.getUTCMinutes();

    for (let d = 0; d < 7; d++) {
      const idx = (dagur + d) % 7;
      const timar = gogn.timar
        .filter(t => t.dagur === DAGAR[idx])
        .sort((a, b) => a.byrjun.localeCompare(b.byrjun));

      for (const t of timar) {
        const b = minutur(t.byrjun);
        const l = t.lok ? minutur(t.lok) : b + 50;

        if (d === 0 && nuMin >= b && nuMin < l) return { t, d, igangi: true };
        if (d > 0 || b > nuMin) return { t, d, eftir: d === 0 ? b - nuMin : null, idx };
      }
    }
    return null;
  }

  function teikna() {
    const lang = tungumal();
    const T = TEXTI[lang];
    const n = finnaNaesta();

    if (!n) { reitur.hidden = true; return; }

    let hvenaer;
    if (n.igangi) hvenaer = `${T.kl} ${n.t.byrjun}`;
    else if (n.d === 0) hvenaer = `${T.kl} ${n.t.byrjun} · ${T.eftir(n.eftir)}`;
    else if (n.d === 1) hvenaer = `${T.a_morgun} ${T.kl} ${n.t.byrjun}`;
    else hvenaer = `${T.a} ${T.dagar[n.idx]} ${T.kl} ${n.t.byrjun}`;

    reitur.hidden = false;
    reitur.innerHTML = `
      <span class="nt-punktur${n.igangi ? " nt-live" : ""}" aria-hidden="true"></span>
      <span class="nt-merki">${n.igangi ? T.igangi : T.naesti}</span>
      <strong>${heiti(n.t, lang)}</strong>
      <span class="nt-timi">${hvenaer}</span>
      <span class="nt-tengill">${T.tafla} →</span>`;
  }

  teikna();
  setInterval(teikna, 30000);

  const kerfi = window.Box800Language;
  if (kerfi && !kerfi._forsidaTengd) {
    const upphaflegt = kerfi.setLanguage;
    kerfi.setLanguage = (lang) => { upphaflegt(lang); teikna(); };
    kerfi._forsidaTengd = true;
  }

})();
