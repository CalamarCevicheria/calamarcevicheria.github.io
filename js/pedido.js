// Pinta el menú y maneja el pedido que se envía por WhatsApp
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
const L = (n) => `L.${n}`;
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => (
  { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]
));

const C = MENU.ceviche;

// ---------- Menú ----------
function pintarMenu() {
  $('#ceviche-precios').innerHTML = [
    ['1 marisco', C.precios[1]],
    ['Mixto de 2 mariscos', C.precios[2]],
    ['Mixto de 3 mariscos', C.precios[3]],
    ['Medio ceviche', C.medio],
  ].map(([n, p]) => `<li><span>${n}</span><span class="price">${L(p)}</span></li>`).join('');

  $('#ceviche-salsas').innerHTML = C.salsas
    .map((s) => `<li><strong>${s.nombre}</strong> <span>${s.desc}</span></li>`).join('');
  $('#ceviche-complementos').innerHTML = C.complementos.map((c) => `<li>${c}</li>`).join('');

  $('#platos').innerHTML = MENU.platos.map((p) => `
    <article class="dish">
      <div class="dish__head">
        <h4>${p.nombre}</h4>
        <span class="price">${L(p.precio)}</span>
      </div>
      ${p.desc ? `<p>${p.desc}</p>` : ''}
      <button class="btn btn--small btn--outline" data-plato="${p.id}">Agregar</button>
    </article>`).join('');

  $('#bebidas').innerHTML = MENU.bebidas.map((g) => `
    <div class="drink-group">
      <h4>${g.grupo}</h4>
      <ul>
        ${g.items.map(([n, p]) => `
          <li>
            <span>${n}</span>
            <span class="price">${L(p)}</span>
            <button class="add-btn" data-bebida="${esc(n)}" data-precio="${p}" aria-label="Agregar ${esc(n)}">+</button>
          </li>`).join('')}
      </ul>
    </div>`).join('');
}

// ---------- Pedido ----------
let pedido = cargar();

function cargar() {
  try { return JSON.parse(localStorage.getItem('calamar-pedido')) || []; } catch { return []; }
}
function guardar() {
  try { localStorage.setItem('calamar-pedido', JSON.stringify(pedido)); } catch {}
}

const total = () => pedido.reduce((t, l) => t + l.precio * l.cantidad, 0);

function agregar(linea) {
  // Las bebidas iguales se juntan en una sola línea
  const igual = linea.clave && pedido.find((l) => l.clave === linea.clave);
  if (igual) igual.cantidad += linea.cantidad;
  else pedido.push({ id: Date.now() + Math.random(), detalle: [], nota: '', ...linea });
  guardar();
  pintarPedido();
  avisar(`${linea.nombre} agregado al pedido`);
}

function pintarPedido() {
  const n = pedido.reduce((t, l) => t + l.cantidad, 0);
  $('#cart-fab').hidden = n === 0;
  $('#cart-count').textContent = n;
  $('#cart-fab-total').textContent = L(total());
  $('#cart-total').textContent = L(total());

  $('#cart-items').innerHTML = pedido.length ? pedido.map((l) => `
    <div class="cart-line" data-id="${l.id}">
      <div class="cart-line__info">
        <strong>${esc(l.nombre)}</strong>
        ${l.detalle.map((d) => `<small>${esc(d)}</small>`).join('')}
        ${l.nota ? `<small class="cart-line__nota">Nota: ${esc(l.nota)}</small>` : ''}
      </div>
      <div class="cart-line__side">
        <span class="price">${L(l.precio * l.cantidad)}</span>
        <div class="qty qty--small">
          <button type="button" data-linea="-1" aria-label="Menos">&minus;</button>
          <output>${l.cantidad}</output>
          <button type="button" data-linea="1" aria-label="Más">+</button>
        </div>
      </div>
    </div>`).join('') : '<p class="muted center">Tu pedido está vacío.</p>';
}

let avisoTimer;
function avisar(texto) {
  const t = $('#toast');
  t.textContent = texto;
  t.classList.add('is-visible');
  clearTimeout(avisoTimer);
  avisoTimer = setTimeout(() => t.classList.remove('is-visible'), 2000);
}

// ---------- Cantidad (− 1 +) ----------
function leerCantidad(form) { return Number($('[data-qty] output', form).textContent); }
function ponerCantidad(form, n) { $('[data-qty] output', form).textContent = n; }

document.addEventListener('click', (e) => {
  const step = e.target.closest('[data-step]');
  if (!step) return;
  const form = step.closest('form');
  ponerCantidad(form, Math.max(1, leerCantidad(form) + Number(step.dataset.step)));
  form.dispatchEvent(new Event('input'));
});

// ---------- Armar ceviche ----------
const formCeviche = $('#form-ceviche');

function chip(tipo, name, value, texto, checked = false) {
  return `<label class="chip"><input type="${tipo}" name="${name}" value="${esc(value)}"${checked ? ' checked' : ''}><span>${texto}</span></label>`;
}

function pintarOpcionesCeviche() {
  $('#opt-mariscos').innerHTML = C.mariscos.map((m) => chip('checkbox', 'marisco', m, m)).join('');
  $('#opt-tamano').innerHTML =
    chip('radio', 'tamano', 'completo', 'Completo <em id="precio-completo"></em>', true) +
    chip('radio', 'tamano', 'medio', `Medio <em>${L(C.medio)}</em>`);
  $('#opt-complementos').innerHTML = C.complementos.map((c) => chip('checkbox', 'complemento', c, c)).join('');
  $('#opt-salsas').innerHTML = C.salsas
    .map((s) => chip('checkbox', 'salsa', s.nombre, `${s.nombre} <em>${s.desc}</em>`)).join('');
}

function leerCeviche() {
  const marcados = (name) => $$(`input[name="${name}"]:checked`, formCeviche).map((i) => i.value);
  const mariscos = marcados('marisco');
  const complementos = marcados('complemento');
  const salsas = marcados('salsa');
  const medio = $('input[name="tamano"]:checked', formCeviche).value === 'medio';

  const base = medio ? C.medio : (C.precios[mariscos.length] || C.precios[1]);
  const extras = Math.max(0, complementos.length - 1) + Math.max(0, salsas.length - 1);
  const precio = base + extras * C.extra;

  const lista = mariscos.map((m) => m.toLowerCase());
  const nombreMariscos = lista.length > 1
    ? `${lista.slice(0, -1).join(', ')} y ${lista[lista.length - 1]}`
    : lista[0] || '';
  const nombre = `${medio ? 'Medio ceviche' : 'Ceviche'}${mariscos.length > 1 ? ' mixto' : ''} de ${nombreMariscos}`;

  return { mariscos, complementos, salsas, precio, nombre };
}

function actualizarCeviche() {
  const c = leerCeviche();
  // Máximo 3 mariscos: ya son todos, pero se deja por si se agregan más
  $$('input[name="marisco"]', formCeviche).forEach((i) => {
    i.disabled = !i.checked && c.mariscos.length >= 3;
  });
  $('#precio-completo').textContent = L(C.precios[Math.max(1, c.mariscos.length)]);
  $('#ceviche-add').textContent = `Agregar · ${L(c.precio * leerCantidad(formCeviche))}`;
  $('#ceviche-error').hidden = true;
}

formCeviche.addEventListener('input', actualizarCeviche);
formCeviche.addEventListener('change', actualizarCeviche);

formCeviche.addEventListener('submit', (e) => {
  e.preventDefault();
  const c = leerCeviche();
  const falta = !c.mariscos.length ? 'Elige al menos un marisco.'
    : !c.complementos.length ? 'Elige un complemento.'
      : !c.salsas.length ? 'Elige una salsa.' : '';
  if (falta) {
    $('#ceviche-error').textContent = falta;
    $('#ceviche-error').hidden = false;
    return;
  }
  agregar({
    nombre: c.nombre,
    detalle: [
      `Complemento: ${c.complementos.join(', ')}`,
      `Salsa: ${c.salsas.join(', ')}`,
    ],
    nota: formCeviche.nota.value.trim(),
    precio: c.precio,
    cantidad: leerCantidad(formCeviche),
  });
  $('#dlg-ceviche').close();
});

$('#abrir-ceviche').addEventListener('click', () => {
  formCeviche.reset();
  ponerCantidad(formCeviche, 1);
  actualizarCeviche();
  $('#dlg-ceviche').showModal();
});

// ---------- Agregar plato ----------
const formPlato = $('#form-plato');
let platoActual = null;

function actualizarPlato() {
  $('#plato-add').textContent = `Agregar · ${L(platoActual.precio * leerCantidad(formPlato))}`;
}
formPlato.addEventListener('input', actualizarPlato);

formPlato.addEventListener('submit', (e) => {
  e.preventDefault();
  agregar({
    nombre: platoActual.nombre,
    nota: formPlato.nota.value.trim(),
    precio: platoActual.precio,
    cantidad: leerCantidad(formPlato),
  });
  $('#dlg-plato').close();
});

// ---------- Clics del menú ----------
document.addEventListener('click', (e) => {
  const plato = e.target.closest('[data-plato]');
  if (plato) {
    platoActual = MENU.platos.find((p) => p.id === plato.dataset.plato);
    formPlato.reset();
    ponerCantidad(formPlato, 1);
    $('#plato-nombre').textContent = platoActual.nombre;
    $('#plato-desc').textContent = platoActual.desc || '';
    formPlato.nota.placeholder = platoActual.nota || 'Ej.: sin cebolla';
    actualizarPlato();
    $('#dlg-plato').showModal();
    return;
  }

  const bebida = e.target.closest('[data-bebida]');
  if (bebida) {
    agregar({
      clave: `bebida:${bebida.dataset.bebida}`,
      nombre: bebida.dataset.bebida,
      precio: Number(bebida.dataset.precio),
      cantidad: 1,
    });
    return;
  }

  const linea = e.target.closest('[data-linea]');
  if (linea) {
    const id = Number(linea.closest('.cart-line').dataset.id);
    const l = pedido.find((x) => x.id === id);
    l.cantidad += Number(linea.dataset.linea);
    if (l.cantidad < 1) pedido = pedido.filter((x) => x !== l);
    guardar();
    pintarPedido();
    return;
  }

  if (e.target.closest('[data-close]')) e.target.closest('dialog').close();
});

// Cerrar un diálogo al tocar fuera de él
$$('dialog').forEach((d) => d.addEventListener('click', (e) => {
  if (e.target === d) d.close();
}));

// ---------- Enviar por WhatsApp ----------
const formPedido = $('#form-pedido');

formPedido.addEventListener('change', () => {
  $('#campo-direccion').hidden = formPedido.entrega.value !== 'A domicilio';
});

function mensaje({ nombre, entrega, direccion }) {
  const lineas = pedido.map((l) => [
    `• ${l.cantidad}x ${l.nombre} — ${L(l.precio * l.cantidad)}`,
    ...l.detalle.map((d) => `   ${d}`),
    ...(l.nota ? [`   Nota: ${l.nota}`] : []),
  ].join('\n'));

  return [
    'Hola Calamar Cevicheria, quiero hacer un pedido:',
    '',
    ...lineas,
    '',
    `*Total: ${L(total())}*`,
    '',
    `Nombre: ${nombre}`,
    `Entrega: ${entrega}${direccion ? ` — ${direccion}` : ''}`,
  ].join('\n');
}

formPedido.addEventListener('submit', (e) => {
  e.preventDefault();
  const datos = {
    nombre: formPedido.nombre.value.trim(),
    entrega: formPedido.entrega.value,
    direccion: formPedido.entrega.value === 'A domicilio' ? formPedido.direccion.value.trim() : '',
  };
  const falta = !pedido.length ? 'Tu pedido está vacío.'
    : !datos.nombre ? 'Escribe tu nombre.'
      : datos.entrega === 'A domicilio' && !datos.direccion ? 'Escribe la dirección de entrega.' : '';
  if (falta) {
    $('#pedido-error').textContent = falta;
    $('#pedido-error').hidden = false;
    return;
  }
  $('#pedido-error').hidden = true;
  window.open(`https://wa.me/${MENU.whatsapp}?text=${encodeURIComponent(mensaje(datos))}`, '_blank');
});

$('#vaciar').addEventListener('click', () => {
  if (!confirm('¿Vaciar todo el pedido?')) return;
  pedido = [];
  guardar();
  pintarPedido();
});

$('#cart-fab').addEventListener('click', () => $('#dlg-pedido').showModal());

pintarMenu();
pintarOpcionesCeviche();
pintarPedido();
