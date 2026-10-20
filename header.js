/* ==========================================
   BOX800 - SHARED HEADER
========================================== */

document.addEventListener("DOMContentLoaded", () => {

  const header =
    document.getElementById("box800-header");

  if (!header) return;

  const links = [
    { name: "Um okkur", url: "um-okkur.html" },
    { name: "Námskeið", url: "namskeid.html" },
    { name: "Tímatafla", url: "timatafla.html" },
    { name: "Þjálfarar", url: "thjalfarar.html" },
    { name: "Verðskrá", url: "verdskra.html" },
    { name: "Drop-in", url: "dropin.html" },
    { name: "Hafa samband", url: "samband.html" },
    {
      name: "Kaupa kort",
      url: "https://www.abler.io/shop/box800",
      cta: true
    }
  ];

  const currentPage =
    window.location.pathname.split("/").pop()
    || "index.html";

  header.className = "site-header";

  header.innerHTML = `
    <div class="header-container nav-wrap">

      <a
        class="brand"
        href="index.html"
        aria-label="BOX800 forsíða"
      >
        <img
          class="brand-logo"
          src="images/box800-logo-white.png"
          alt="BOX800"
        >
      </a>

      <button
        class="menu-toggle"
        type="button"
        aria-label="Opna valmynd"
        aria-controls="box800-navigation"
        aria-expanded="false"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <nav
        class="main-nav"
        id="box800-navigation"
        aria-label="Aðalvalmynd"
      >

        ${links.map(link => `
          <a
            href="${link.url}"
            class="${link.cta ? "nav-cta" : ""}"
            ${currentPage === link.url
              ? 'aria-current="page"'
              : ""}
          >
            ${link.name}
          </a>
        `).join("")}

        <div
          class="language-switch"
          aria-label="Veldu tungumál"
        >
          <button
            type="button"
            data-lang="is"
            aria-label="Íslenska"
          >
            IS
          </button>

          <span aria-hidden="true">/</span>

          <button
            type="button"
            data-lang="en"
            aria-label="English"
          >
            EN
          </button>
        </div>

      </nav>

    </div>
  `;

  const toggle =
    header.querySelector(".menu-toggle");

  const nav =
    header.querySelector(".main-nav");

  toggle.addEventListener("click", () => {

    const isOpen =
      nav.classList.toggle("is-open");

    toggle.setAttribute(
      "aria-expanded",
      String(isOpen)
    );

    toggle.setAttribute(
      "aria-label",
      isOpen ? "Loka valmynd" : "Opna valmynd"
    );

  });

  nav.querySelectorAll("a").forEach(link => {

    link.addEventListener("click", () => {

      nav.classList.remove("is-open");

      toggle.setAttribute("aria-expanded", "false");

      toggle.setAttribute(
        "aria-label",
        "Opna valmynd"
      );

    });

  });

  header.querySelectorAll(
    ".language-switch button"
  ).forEach(button => {

    button.addEventListener("click", () => {

      const language = button.dataset.lang;

      window.Box800Language?.setLanguage(language);

      nav.classList.remove("is-open");

      toggle.setAttribute("aria-expanded", "false");

      toggle.setAttribute(
        "aria-label",
        "Opna valmynd"
      );

    });

  });

});