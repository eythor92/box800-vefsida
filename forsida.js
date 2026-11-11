/* ==========================================
   BOX800 - FORSÍÐA
   Myndband í forsíðumynd (aðeins í síma)
========================================== */

(() => {

  /* ======================================
     MYNDBAND
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

})();
