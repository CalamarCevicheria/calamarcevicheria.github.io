// Menú de Calamar Cevicheria. Precios en lempiras.
// Para cambiar un precio o agregar un plato, solo se edita este archivo.
const MENU = {
  whatsapp: '50489977604',
  telefono: '+504 8997-7604',

  ceviche: {
    mariscos: ['Camarón', 'Caracol', 'Pescado'],
    // Precio según cuántos mariscos lleva
    precios: { 1: 260, 2: 280, 3: 300 },
    medio: 200,
    extra: 30, // cada complemento o salsa adicional
    complementos: [
      'Tajadas de plátano',
      'Tajadas de malanga',
      'Tajadas de yuca',
      'Galleta club social',
      'Galleta salada',
    ],
    salsas: [
      { nombre: 'La negrita', desc: 'ácida picante' },
      { nombre: 'La dulce', desc: 'dulce ácida' },
      { nombre: 'La rojita picosa', desc: 'dulce picante' },
      { nombre: 'La blanquita', desc: 'aderezo a base de mayonesa' },
      { nombre: 'Estilo peruano', desc: 'limón más especias' },
    ],
  },

  platos: [
    {
      id: 'sopa',
      nombre: 'Sopa de mariscos',
      precio: 350,
      desc: 'Camarón, caracol, calamar y jaiba. Acompañada de plátano.',
      nota: 'Ej.: sin jaiba',
    },
    {
      id: 'chicharrones',
      nombre: 'Chicharrones de marisco',
      precio: 380,
      desc: 'Camarón, pescado y calamar. Con papas fritas y ensalada de cebolla.',
      nota: 'Ej.: sin ensalada de cebolla',
    },
    { id: 'tacos-camaron', nombre: 'Tacos de camarón', precio: 260 },
    { id: 'tacos-pollo', nombre: 'Tacos de pollo', precio: 200 },
    { id: 'pasta-camaron', nombre: 'Pasta fettuccine alfredo con camarones', precio: 350 },
    { id: 'pasta-pollo', nombre: 'Pasta fettuccine alfredo con pollo', precio: 300 },
  ],

  bebidas: [
    {
      grupo: 'Cervezas',
      items: [['Ultra', 70], ['Corona', 70], ['Heineken', 70], ['Miller Draft', 70],
        ['Coors Light', 60], ['Miller Lite', 60], ['Salva Vida', 60], ['Imperial', 60]],
    },
    {
      grupo: 'Refrescos',
      items: [['Coca-Cola', 45], ['Coca-Cola Zero', 45], ['Canada Dry', 45], ['Fresca', 45], ['Agua', 45]],
    },
    {
      grupo: 'Naturales',
      items: [['Limonada', 50], ['Limonada de fresa', 50], ['Jamaica', 50], ['Mora', 50], ['Maracuyá', 50]],
    },
    {
      grupo: 'La Penca',
      items: [['Trago de maracuyá', 60], ['Trago de sandía', 60], ['Trago de limón', 60],
        ['Botella de maracuyá', 250], ['Botella de sandía', 250], ['Botella de limón', 250]],
    },
    {
      grupo: 'Whisky',
      items: [['Old Parr', 120], ["Buchanan's", 120], ['Cinta negra', 120], ['Cinta roja', 80]],
    },
    {
      grupo: 'Tequila',
      items: [['1800 Cristalino', 120], ['Gran Malo Tamarindo', 120], ['José Cuervo', 80]],
    },
    {
      grupo: 'Ron y otros',
      items: [['Flor de Caña 12 años', 100], ['Flor de Caña 7 años', 80], ['Gin tonic', 120], ['Vodka', 100]],
    },
  ],
};
