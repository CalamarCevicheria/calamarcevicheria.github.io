# Calamar Cevicheria

Página web del restaurante Calamar Cevicheria. Es HTML, CSS y JavaScript simple, publicada con GitHub Pages.

## Estructura

```
index.html         Página principal (todas las secciones)
css/styles.css     Estilos, colores y tipografía
js/menu-data.js    Menú y precios: aquí se cambian
js/pedido.js       Armar ceviche, pedido y envío por WhatsApp
js/main.js         Menú en celular y detalles
img/               Logo y fotos
```

## Pedidos

El cliente arma su pedido en la página (ceviche con mariscos, tamaño, complemento,
salsa y comentario; platos; bebidas) y al final se abre WhatsApp al +504 8997-7604
con el pedido escrito y el total. No hay servidor: todo pasa en el navegador.

## Enlaces de las mesas (QR y NFC)

Cada stand lleva el mismo sitio con la mesa al final. El mensaje de WhatsApp dice
de qué mesa viene. En las mesas el nombre es opcional; en la barra es obligatorio.

| Stand | Enlace |
|---|---|
| Mesa 1 | https://calamarcevicheria.github.io/?mesa=1 |
| Mesa 2 | https://calamarcevicheria.github.io/?mesa=2 |
| Mesa 3 | https://calamarcevicheria.github.io/?mesa=3 |
| Mesa 4 | https://calamarcevicheria.github.io/?mesa=4 |
| Mesa 5 | https://calamarcevicheria.github.io/?mesa=5 |
| Mesa 6 | https://calamarcevicheria.github.io/?mesa=6 |
| Mesa 7 | https://calamarcevicheria.github.io/?mesa=7 |
| Mesa 8 | https://calamarcevicheria.github.io/?mesa=8 |
| Mesa 9 | https://calamarcevicheria.github.io/?mesa=9 |
| Mesa 10 | https://calamarcevicheria.github.io/?mesa=10 |
| Mesa 11 | https://calamarcevicheria.github.io/?mesa=11 |
| Mesa 12 | https://calamarcevicheria.github.io/?mesa=12 |
| Barra (los 3 stands) | https://calamarcevicheria.github.io/?mesa=barra |

Sin `?mesa=` (por ejemplo desde Instagram), el pedido sale como "Para recoger".
Para cambiar el número de mesas se edita `mesas` en `js/menu-data.js`.

## Pendiente

- [ ] Logo definitivo (el actual `img/logo.jpg` es provisional)
- [ ] Fotos: portada, local y galería

## Ver la página en tu computadora

Abre `index.html` con doble clic en el navegador.
