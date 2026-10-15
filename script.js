// BOX800 – Einföld valmynd fyrir síma
const menuButton = document.querySelector('.menu-toggle');
const menu = document.querySelector('.main-nav');

menuButton.addEventListener('click', () => {
  const open = menu.classList.toggle('is-open');
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Loka valmynd' : 'Opna valmynd');
});

// Loka valmynd þegar notandi velur tengil
menu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    menu.classList.remove('is-open');
    menuButton.setAttribute('aria-expanded', 'false');
  });
});

// Ártalið í footer uppfærist sjálfkrafa
 document.querySelector('#year').textContent = new Date().getFullYear();
