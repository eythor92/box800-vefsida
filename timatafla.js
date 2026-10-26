/* ==========================================
   BOX800 - TÍMATAFLA
   Teiknar töfluna úr timatafla-data.js.
   Tímunum er breytt í timatafla-data.js,
   ekki hér.
========================================== */

(() => {

  const DAGAR = ["man", "thr", "mid", "fim", "fos", "lau", "sun"];

  const TEXTI = {
    is: {
      dagar: ["Mánudagur", "Þriðjudagur", "Miðvikudagur", "Fimmtudagur", "Föstudagur", "Laugardagur", "Sunnudagur"],
      stuttir: ["Mán", "Þri", "Mið", "Fim", "Fös", "Lau", "Sun"],
      timi: "Tími",
      idag: "Í dag",
      allir: "Allir tímar",
      opnir: "Opnir tímar",
      namskeid: "Námskeið",
      opinnMerki: "Opinn tími",
      namskeidMerki: "Námskeið",
      skyringOpnir: "Opnir tímar – innifaldir í korti",
      skyringNamskeid: "Námskeið – skráning sér",
      engir: "Engir tímar þennan dag.",
      veljaDag: "Veldu dag",
      vikan: "Öll vikan",
      sia: "Sía tíma",
      fyrirvari: "Birt með fyrirvara um breytingar.",
      tafla: "Vikuleg tímatafla BOX800"
    },
    en: {
      dagar: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      stuttir: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      timi: "Time",
      idag: "Today",
      allir: "All classes",
      opnir: "Group classes",
      namskeid: "Programs",
      opinnMerki: "Group class",
      namskeidMerki: "Program",
      skyringOpnir: "Group classes – included in membership",
      skyringNamskeid: "Programs – separate sign-up",
      engir: "No classes on this day.",
      veljaDag: "Choose a day",
      vikan: "Whole week",
      sia: "Filter classes",
      fyrirvari: "Subject to change.",
      tafla: "BOX800 weekly class schedule"
    }
  };

  const gogn = window.box800Timatafla;
  const rot = document.getElementById("timatafla");

  if (!gogn || !rot) return;

  /* Mánudagur = 0 ... sunnudagur = 6 */
  const idagIndex = (new Date().getDay() + 6) % 7;

  let valinnDagur = idagIndex;
  let sia = "allir";

  const tungumal = () =>
    window.Box800Language?.getLanguage?.() || "is";

  const esc = (str) =>
    String(str).replace(/[&<>"]/g, c =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  const flokkur = (heiti) =>
    gogn.flokkar[heiti] || { tegund: "opinn" };

  const heitiA = (heiti, lang) =>
    (lang === "en" && flokkur(heiti).en) || heiti;

  const timabil = (t) =>
    t.lok ? `${t.byrjun}–${t.lok}` : t.byrjun;

  const radad = [...gogn.timar].sort((a, b) =>
    a.byrjun.localeCompare(b.byrjun));

  /* ======================================
     RAÐIR Í TÖFLU
     Hver röð er upphafstími sem hefur
     lokatíma. Tímar sem passa ekki í röð
     fara í næstu röð á undan og sýna
     sinn eigin tíma.
  ====================================== */

  const radir = [];

  radad.forEach(t => {
    if (!t.lok) return;
    let rod = radir.find(r => r.byrjun === t.byrjun);
    if (!rod) {
      rod = { byrjun: t.byrjun, lok: t.lok };
      radir.push(rod);
    }
  });

  radir.sort((a, b) => a.byrjun.localeCompare(b.byrjun));

  const rodFyrir = (t) => {
    let valin = radir[0];
    radir.forEach(r => {
      if (r.byrjun <= t.byrjun) valin = r;
    });
    return valin;
  };

  /* ======================================
     HJÁLPARFÖLL
  ====================================== */

  function spjald(t, lang, syndTima) {

    const f = flokkur(t.heiti);
    const nafn = esc(heitiA(t.heiti, lang));
    const still = f.litur ? ` style="--tt-litur:${esc(f.litur)}"` : "";
    const timi = syndTima
      ? `<span class="tt-class-time">${esc(timabil(t))}</span>`
      : "";
    const klasi = `tt-class tt-${f.tegund}`;

    if (f.hlekkur) {
      return `<a class="${klasi}" href="${esc(f.hlekkur)}"${still}>${nafn}${timi}</a>`;
    }

    return `<span class="${klasi}"${still}>${nafn}${timi}</span>`;
  }

  /* ======================================
     TÖFLUSÝN (TÖLVA)
  ====================================== */

  function tafla(lang) {

    const T = TEXTI[lang];

    const haus = DAGAR.map((d, i) => `
      <th scope="col" class="${i === idagIndex ? "tt-today" : ""}">
        <abbr title="${T.dagar[i]}">${T.stuttir[i]}</abbr>
        ${i === idagIndex ? `<span class="tt-today-badge">${T.idag}</span>` : ""}
      </th>`).join("");

    const linur = radir.map(rod => {

      const reitir = DAGAR.map((d, i) => {

        const timar = radad.filter(t =>
          t.dagur === d && rodFyrir(t) === rod);

        const innihald = timar.map(t =>
          spjald(t, lang, t.byrjun !== rod.byrjun)).join("");

        return `<td class="${i === idagIndex ? "tt-today" : ""}">${innihald}</td>`;

      }).join("");

      return `
        <tr>
          <th scope="row">${rod.byrjun}<span>–${rod.lok}</span></th>
          ${reitir}
        </tr>`;

    }).join("");

    return `
      <div class="tt-table-wrap">
        <table class="tt-table">
          <caption class="tt-sr-only">${T.tafla}</caption>
          <thead>
            <tr>
              <th scope="col"><span class="tt-sr-only">${T.timi}</span></th>
              ${haus}
            </tr>
          </thead>
          <tbody>${linur}</tbody>
        </table>
      </div>`;
  }

  /* ======================================
     DAGASÝN (SÍMI)
  ====================================== */

  const VIKAN = 7;

  const passarSiu = (t) => {
    const tegund = flokkur(t.heiti).tegund;
    if (sia === "opnir") return tegund === "opinn";
    if (sia === "namskeid") return tegund === "namskeid";
    return true;
  };

  function dagListi(dagIndex, lang) {

    const T = TEXTI[lang];

    const timar = radad.filter(t =>
      t.dagur === DAGAR[dagIndex] && passarSiu(t));

    const listi = timar.length
      ? timar.map(t => {
          const f = flokkur(t.heiti);
          const still = f.litur ? ` style="--tt-litur:${esc(f.litur)}"` : "";
          const nafn = esc(heitiA(t.heiti, lang));
          const merki = f.tegund === "namskeid"
            ? T.namskeidMerki
            : T.opinnMerki;
          const nafnHtml = f.hlekkur
            ? `<a href="${esc(f.hlekkur)}">${nafn}</a>`
            : nafn;

          return `
            <li class="tt-row tt-${f.tegund}"${still}>
              <span class="tt-row-time">${esc(timabil(t))}</span>
              <span class="tt-row-name">${nafnHtml}</span>
              <span class="tt-row-tag">${merki}</span>
            </li>`;
        }).join("")
      : `<li class="tt-empty">${T.engir}</li>`;

    return `
      <h3 class="tt-day-title">
        ${T.dagar[dagIndex]}
        ${dagIndex === idagIndex ? `<span class="tt-today-badge">${T.idag}</span>` : ""}
      </h3>
      <ul class="tt-list">${listi}</ul>`;
  }

  function dagar(lang) {

    const T = TEXTI[lang];

    const hnappar = DAGAR.map((d, i) => `
      <button
        type="button"
        class="tt-day-btn${i === idagIndex ? " tt-is-today" : ""}"
        data-dagur="${i}"
        aria-pressed="${i === valinnDagur}"
      >
        ${T.stuttir[i]}
      </button>`).join("") + `
      <button
        type="button"
        class="tt-day-btn tt-week-btn"
        data-dagur="${VIKAN}"
        aria-pressed="${valinnDagur === VIKAN}"
      >
        ${T.vikan}
      </button>`;

    const efni = valinnDagur === VIKAN
      ? DAGAR.map((d, i) => dagListi(i, lang)).join("")
      : dagListi(valinnDagur, lang);

    return `
      <div class="tt-days${valinnDagur === VIKAN ? " tt-is-week" : ""}">
        <div class="tt-day-buttons" role="group" aria-label="${T.veljaDag}">
          ${hnappar}
        </div>
        ${efni}
      </div>`;
  }

  /* ======================================
     TEIKNA
  ====================================== */

  function teikna() {

    const lang = tungumal() === "en" ? "en" : "is";
    const T = TEXTI[lang];

    const siur = ["allir", "opnir", "namskeid"].map(s => `
      <button type="button" class="tt-filter-btn" data-sia="${s}" aria-pressed="${s === sia}">
        ${T[s]}
      </button>`).join("");

    rot.dataset.sia = sia;

    rot.innerHTML = `
      <div class="tt-toolbar">
        <p class="tt-valid">
          <strong>${esc(gogn.gildir?.[lang] || "")}</strong>
          <span>${T.fyrirvari}</span>
        </p>
        <div class="tt-filters" role="group" aria-label="${T.sia}">
          ${siur}
        </div>
      </div>

      ${tafla(lang)}
      ${dagar(lang)}

      <ul class="tt-legend">
        <li><span class="tt-swatch tt-swatch-open"></span>${T.skyringOpnir}</li>
        <li><span class="tt-swatch tt-swatch-course"></span>${T.skyringNamskeid}</li>
      </ul>`;
  }

  rot.addEventListener("click", (e) => {

    const dagHnappur = e.target.closest(".tt-day-btn");
    if (dagHnappur) {
      valinnDagur = Number(dagHnappur.dataset.dagur);
      teikna();
      rot.querySelector(`.tt-day-btn[data-dagur="${valinnDagur}"]`)?.focus();
      return;
    }

    const siuHnappur = e.target.closest(".tt-filter-btn");
    if (siuHnappur) {
      sia = siuHnappur.dataset.sia;
      teikna();
      rot.querySelector(`.tt-filter-btn[data-sia="${sia}"]`)?.focus();
    }

  });

  /* Teikna aftur þegar skipt er um tungumál */
  const tengjaTungumal = () => {
    const kerfi = window.Box800Language;
    if (!kerfi || kerfi._timataflaTengd) return;
    const upphaflegt = kerfi.setLanguage;
    kerfi.setLanguage = (lang) => {
      upphaflegt(lang);
      teikna();
    };
    kerfi._timataflaTengd = true;
  };

  tengjaTungumal();
  teikna();

})();
