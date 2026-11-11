/* ==========================================
   BOX800 - FORSÍÐA
   Myndband í forsíðumynd:
   - í síma fyllir það bakgrunninn
   - á tölvu birtist það sem spjald til hægri
========================================== */

(() => {

  /* Hvert myndband hleðst bara þegar skjárinn passar
     (data-media), og ekki ef notandi vill minni
     hreyfingu eða sparar gögn. */

  const minniHreyfing = window.matchMedia("(prefers-reduced-motion: reduce)");
  const sparaGogn = navigator.connection?.saveData;

  document.querySelectorAll(".hero-video[data-src]").forEach((video) => {
    const mq = window.matchMedia(video.dataset.media || "all");

    const hlada = () => {
      if (!mq.matches || minniHreyfing.matches || sparaGogn || video.dataset.hladid) return;
      video.src = video.dataset.src;
      video.dataset.hladid = "1";
      video.addEventListener("playing", () => video.classList.add("is-playing"), { once: true });
      video.play().catch(() => {});
    };

    hlada();
    mq.addEventListener?.("change", hlada);
  });

})();
