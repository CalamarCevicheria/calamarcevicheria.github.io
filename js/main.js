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

// WiFi: mostrar red y copiar la contraseña
document.getElementById('wifi-red').textContent = MENU.wifi.red;
document.getElementById('wifi-clave').textContent = MENU.wifi.clave;

const copiarWifi = document.getElementById('copiar-wifi');
copiarWifi.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(MENU.wifi.clave);
  } catch {
    // Navegadores sin acceso al portapapeles
    const t = document.createElement('textarea');
    t.value = MENU.wifi.clave;
    document.body.appendChild(t);
    t.select();
    document.execCommand('copy');
    t.remove();
  }
  copiarWifi.textContent = '¡Copiada!';
  setTimeout(() => { copiarWifi.textContent = 'Copiar contraseña'; }, 2000);
});

// Año del pie de página
document.getElementById('year').textContent = new Date().getFullYear();
