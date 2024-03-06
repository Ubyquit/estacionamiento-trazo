// Variables
const anchoCajon = 90; // Ajustar según escala
const altoCajon = 150; // Ajustar según escala
const margen = 20;
const filas = 2;
const columnas = 5;
const cajones = [];
let cajonSeleccionado = null;
let cajonesOcupados = []; // Lista de cajones ocupados
let lienzo;
let rutaLinea;

// Imágenes SVG disponibles
const imagenesSVG = [
  "./img/Slice-1.svg",
  "./img/Slice-2.svg",
  "./img/Slice-3.svg",
  "./img/Slice-4.svg",
  "./img/Slice-5.svg",
  "./img/Slice-6.svg",
  "./img/Slice-7.svg",
  "./img/Slice-8.svg",
];

// Función para dibujar el estacionamiento
function dibujarEstacionamiento() {
  lienzo = Raphael("estacionamiento", 1000, 400);

  for (let i = 0; i < filas; i++) {
    for (let j = 0; j < columnas; j++) {
      const x = margen + j * (anchoCajon + margen);
      const y = margen + i * (altoCajon + margen);
      const cajon = lienzo.rect(x, y, anchoCajon, altoCajon);
      cajon.attr({
        fill: "#ffffff",
        stroke: "#000000",
        "stroke-width": 5,
      });
      const numeroCajon = i * columnas + j + 1;
      cajon.data("numero", numeroCajon);
      cajones.push(cajon);

      // Agregar número de cajón
      const numeroTexto = lienzo.text(x + anchoCajon / 2, y + altoCajon / 2, numeroCajon);
      numeroTexto.attr({
        "font-size": 14,
        "text-anchor": "middle",
        "alignment-baseline": "middle",
      });

      // Verificar si el cajón está ocupado
      if (cajonesOcupados.includes(numeroCajon)) {
        const imagenRandom = imagenesSVG[Math.floor(Math.random() * imagenesSVG.length)];
        const imagen = lienzo.image(imagenRandom, x + 0.15 * anchoCajon, y + 0.15 * altoCajon, 0.7 * anchoCajon, 0.7 * altoCajon);
        cajon.data("imagen", imagen); // Guardar referencia a la imagen en el cajón
      }

      // Agregar evento click a cada cajón
      cajon.click(function () {
        if (!cajonSeleccionado || (cajonSeleccionado !== cajon && !cajonesOcupados.includes(cajon.data("numero")))) {
          if (cajonSeleccionado) {
            cajonSeleccionado.show(); // Mostrar cajón anterior si estaba ocupado
            cajonSeleccionado.attr({ fill: "#ffffff" }); // Restaurar color del cajón anterior
          }
          cajonSeleccionado = cajon;
          cajon.hide(); // Ocultar cajón seleccionado
          mostrarRuta(this.data("numero"));
        }
      });
    }
  }
}

// Función para mostrar la ruta al cajón seleccionado
function mostrarRuta(numeroCajon) {
  if (rutaLinea) {
    rutaLinea.remove(); // Remover la línea existente
  }

  // Calcular la posición del cajón
  const fila = Math.floor((numeroCajon - 1) / columnas);
  const columna = (numeroCajon - 1) % columnas;
  const xCajon = margen + columna * (anchoCajon + margen) + anchoCajon / 2;
  const yCajon = margen + fila * (altoCajon + margen) + altoCajon / 2;

  // Dibujar la línea si el cajón no está ocupado
  if (!cajonesOcupados.includes(numeroCajon)) {
    rutaLinea = lienzo.path(`M0,0L0,180L${xCajon},180L${xCajon},${yCajon}`);
    rutaLinea.attr({
      stroke: "#0000ff",
      "stroke-width": 5,
    });

    // Animación de la línea
    rutaLinea.animate({
      path: `M0,0L0,180L${xCajon},180L${xCajon},${yCajon}`,
      duration: 1000,
    });
  }

  // Mostrar texto de la ruta
  const rutaTexto = document.getElementById('rutaTexto');
  rutaTexto.textContent = cajonesOcupados.includes(numeroCajon) ? `Cajón ${numeroCajon} ocupado` : `Ruta hacia el cajón ${numeroCajon}`;
}

// Simulación de cajones ocupados (aleatoriamente)
for (let i = 0; i < 4; i++) {
  cajonesOcupados.push(Math.floor(Math.random() * 10) + 1);
}

// Inicializar el estacionamiento
dibujarEstacionamiento();
