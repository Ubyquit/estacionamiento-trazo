//! OJO SE AJUSTA SOLO A 2 FILAS, SI SE QUIEREN MAS SE TIENE QUE AJUSTAR EL ALTO Y LOS PUNTOS DE QUIEBRE.

// Variables
const anchoCajon = 50; // Ajustar según escala
const altoCajon = 150; // Ajustar según escala
const margen = 20;
const filas = 2;
const columnas = 19; // Ajustar el numero de columnas segun la necesidad del estacionamiento
const cajones = [];
let cajonSeleccionado = null;
let cajonesOcupados = []; // Lista de cajones ocupados
let lienzo;
let rutaLinea;

// Función para dibujar el estacionamiento
function dibujarEstacionamiento() {
  lienzo = Raphael("estacionamiento", 1500, 400);

  for (let i = 0; i < filas; i++) {
    for (let j = 0; j < columnas; j++) {
      const x = margen + j * (anchoCajon + margen);
      const y = margen + i * (altoCajon + margen);
      const cajon = lienzo.rect(x, y, anchoCajon, altoCajon);
      cajon.attr({
        fill: "#ffffff",
        stroke: "#000000",
        "stroke-width": 2,
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
        cajon.attr({ fill: "#ff0000" }); // Marcar en rojo si está ocupado
      }

      // Agregar evento click a cada cajón
      cajon.click(function () {
        if (!cajonSeleccionado || cajonSeleccionado !== cajon) {
          if (cajonSeleccionado) {
            cajonSeleccionado.attr({ fill: "#ffffff" }); // Restaurar color del cajón anterior
          }
          cajonSeleccionado = cajon;
          cajon.attr({ fill: "#ff9999" }); // Cambiar color del cajón seleccionado
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

  // Dibujar la línea
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

  // Mostrar texto de la ruta
  const rutaTexto = document.getElementById('rutaTexto');
  rutaTexto.textContent = `Ruta hacia el cajón ${numeroCajon}`;
}

// Simulación de cajones ocupados
cajonesOcupados.push(2); // Ejemplo: cajón 2 ocupado
cajonesOcupados.push(7); // Ejemplo: cajón 7 ocupado
cajonesOcupados.push(1); // Ejemplo: cajón 7 ocupado

// Inicializar el estacionamiento
dibujarEstacionamiento();
