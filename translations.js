
document.addEventListener("DOMContentLoaded", () => {
  const footer = document.getElementById("box800-footer");
  if (!footer) return;

  footer.classList.add("site-footer");

  footer.innerHTML = `
    <div class="footer-container">

      <div class="footer-grid">

        <!-- BOX800 -->
        <div class="footer-brand">
          <a href="index.html" aria-label="BOX800 forsíða">
            <img
              src="images/box800-logo-white.png"
              alt="BOX800"
              class="footer-logo"
            >
          </a>

          <p class="footer-tagline">
            Vertu hluti af frábæru samfélagi.
          </p>

          <p class="footer-description">
            Fjölbreytt þjálfun, góð stemning og
            sterkt samfélag á Selfossi.
            Hér er pláss fyrir alla.
          </p>
        </div>

        <!-- FLÝTILEIÐIR -->
        <div class="footer-column">
          <h3>FLÝTILEIÐIR</h3>

          <a href="index.html">Forsíða</a>
          <a href="verdskra.html">Verðskrá</a>
          <a href="timatafla.html">Tímatafla</a>
          <a href="namskeid.html">Námskeið</a>
          <a href="thjalfarar.html">Þjálfarar</a>
          <a href="dropin.html">Drop-in</a>
        </div>

        <!-- HAFA SAMBAND -->
        <div class="footer-column">
          <h3>HAFA SAMBAND</h3>

          <a
            href="https://www.google.com/maps/search/?api=1&query=Eyravegur+57%2C+800+Selfoss"
            target="_blank"
            rel="noopener noreferrer"
            class="footer-contact-link"
          >
            <span class="footer-contact-label">STAÐSETNING</span>
            Eyravegur 57<br>
            800 Selfoss
          </a>

          <a
            href="mailto:info@box800.is"
            class="footer-contact-link"
          >
            <span class="footer-contact-label">NETFANG</span>
            info@box800.is
          </a>

          <a href="samband.html" class="footer-contact-link">
            <span class="footer-contact-label">SPURNINGAR?</span>
            Hafðu samband 
          </a>
        </div>

        <!-- SAMFÉLAGSMIÐLAR -->
        <div class="footer-column">
          <h3>FYLGSTU MEÐ</h3>

          <a
            href="https://www.instagram.com/_box800/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Instagram 
          </a>

          <a
            href="https://www.facebook.com/box800selfossi"
            target="_blank"
            rel="noopener noreferrer"
          >
            Facebook 
          </a>

          <div class="footer-cta">
            <span>ERTU TILBÚIN(N)?</span>
            <a href="verdskra.html" class="footer-button">
              VERTU MEÐ OKKUR 
            </a>
          </div>
        </div>

      </div>

      <div class="footer-bottom">
        <p>© <span id="footer-year"></span> BOX800 · SELFOSS</p>

        <p>STYRKUR · ÞOL · SAMFÉLAG</p>

        <a href="#" class="footer-back-top">
          EFST Á SÍÐU ↑
        </a>
      </div>

    </div>
  `;

  const year = footer.querySelector("#footer-year");
  if (year) year.textContent = new Date().getFullYear();

  const backTop = footer.querySelector(".footer-back-top");
  backTop?.addEventListener("click", (event) => {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});
