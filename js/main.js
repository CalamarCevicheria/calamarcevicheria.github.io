// Menú en celular
const toggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.nav');

toggle.addEventListener('click', () => {
  const open = nav.classList.toggle('is-open');
  toggle.setAttribute('aria-expanded', open);
});

// Cerrar el menú al elegir una sección
nav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    nav.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', false);
  });
});

// Año del pie de página
document.getElementById('year').textContent = new Date().getFullYear();
