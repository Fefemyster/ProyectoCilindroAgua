document.getElementById("myButton").onclick = calcularVolumen;

// Validar datos

let aguaActual = 0;
let capacidadMaxima = 0;

function calcularVolumen() {
  const radio = parseFloat(document.getElementById("myRadio").value);
  const altura = parseFloat(document.getElementById("myHeight").value);
  const unidad = document.getElementById("unitSelect").value;
  if (isNaN(radio) || isNaN(altura) || radio <= 0 || altura <= 0) {
    document.getElementById("myResult").textContent =
      "Por favor ingresa valores válidos.";
    document.getElementById("myResult2").textContent = "";
    return;
  }

  // Convertir a metros según la unidad seleccionada
  let radioMetros = radio;
  let alturaMetros = altura;

  if (unidad === "cm") {
    radioMetros = radio / 100;
    alturaMetros = altura / 100;
  } else if (unidad === "in") {
    radioMetros = radio * 0.0254;
    alturaMetros = altura * 0.0254;
  }

  //Calculo del volumen y conversion
  const volumen = Math.PI * Math.pow(radioMetros, 2) * alturaMetros;
  const volumenLitros = volumen * 1000;

  
  // Actualizar capacidad máxima
  capacidadMaxima = volumenLitros;

  //Mostrando resultados
  document.getElementById("myResult").textContent = `Volumen: ${volumen.toFixed(
    2
  )} m³`;

  document.getElementById(
    "myResult2"
  ).textContent = `Capacidad máxima: ${volumenLitros.toFixed(2)} litros`;

  return volumenLitros;
}

<<<<<<< Updated upstream
//Llenado y vaciado de agua

document.getElementById("myLlenadoBttn").onclick = llenadoTanque;

function llenadoTanque() {
  let llenado = parseFloat(document.getElementById("myLlenado").value);

  if (isNaN(llenado) || llenado <= 0) {
    alert("Por favor ingresa una cantidad válida para llenar.");
    return;
  }

  // Calcular capacidad primero
  if (capacidadMaxima <= 0) {
    alert("Primero calcula el volumen del cilindro.");
    return;
  }

  // Agregar cantidad
  do {
=======
function llenadoManual() {
  const cantidad = parseFloat(document.getElementById("myLlenado").value);
  if (isNaN(cantidad) || cantidad <= 0) {
    mostrarAlerta("⚠ Ingresa litros válidos para llenar.");
    return;
  }

  if (aguaActual + cantidad > capacidadMaxima) {
    aguaActual = capacidadMaxima;
    mostrarAlerta("✅ Tanque lleno al máximo.");
  } else {
    aguaActual += cantidad;
  }
  actualizarTanque();

  // Registrar en bitácora
  registrarCambio(tempActual, (aguaActual / capacidadMaxima) * 100);
}

function vaciadoManual() {
  const cantidad = parseFloat(document.getElementById("myVaciado").value);
  if (isNaN(cantidad) || cantidad <= 0) {
    mostrarAlerta("⚠ Ingresa litros válidos para vaciar.");
    return;
  }

  if (aguaActual - cantidad < 0) {
    aguaActual = 0;
    mostrarAlerta("⚠ El tanque está vacío.");
  } else {
    aguaActual -= cantidad;
  }
  actualizarTanque();

  // Registrar en bitácora
  registrarCambio(tempActual, (aguaActual / capacidadMaxima) * 100);
}

// ---- Control Automático ----
function activarAutomatico() {
  if (!capacidadMaxima) return mostrarAlerta("⚠ Primero calcula el volumen.");

  if (intervaloAutomatico) {
    mostrarAlerta("⚠ Ya está activo el sistema automático.");
    return;
  }

  mostrarAlerta("✅ Sistema automático activado.", "ok");

  intervaloAutomatico = setInterval(() => {
>>>>>>> Stashed changes
    if (aguaActual < capacidadMaxima) {
      aguaActual++;
      llenado--;
    } else {
      aguaActual = capacidadMaxima;
      break; // Limite alcanzado
    }
  } while (llenado > 0);

  document.getElementById(
    "myResult2"
  ).textContent = `Agua actual: ${aguaActual.toFixed(
    2
  )} litros / ${capacidadMaxima.toFixed(2)} litros`;

  console.log(`Volumen tras llenado: ${aguaActual} litros`);
}

// Vaciado de agua

document.getElementById("myVaciadoBttn").onclick = vaciadoTanque;

function vaciadoTanque() {
  let vaciado = parseFloat(document.getElementById("myVaciado").value);

  if (isNaN(vaciado) || vaciado <= 0) {
    alert("Por favor ingresa una cantidad válida para vaciar.");
    return;
  }

<<<<<<< Updated upstream
  if (capacidadMaxima <= 0) {
    alert("Primero calcula el volumen del cilindro.");
    return;
=======
  powerOn = true;

  const module = document.getElementById("tempModule");
  module.classList.remove("is-off");
  module.classList.add("is-on");

  const toggle = document.getElementById("heaterToggle");
  toggle.setAttribute("aria-pressed", "true");
  toggle.textContent = "🟢 Encendido";

  const slider = document.getElementById("tempSlider");
  slider.disabled = false;

  document.getElementById("heaterStateText").textContent =
    "Encendido (en espera)";

  // Registrar en bitacora
  registrarCambio(tempActual, (aguaActual / capacidadMaxima) * 100);
}

function apagarCalentador() {
  powerOn = false;

  const module = document.getElementById("tempModule");
  module.classList.remove("is-on");
  module.classList.add("is-off");

  const toggle = document.getElementById("heaterToggle");
  toggle.setAttribute("aria-pressed", "false");
  toggle.textContent = "🔴 Apagado";

  const slider = document.getElementById("tempSlider");
  slider.disabled = true;

  document.getElementById("heaterStateText").textContent = "Calentador apagado";

  // Registrar en bitácora
  registrarCambio(tempActual, (aguaActual / capacidadMaxima) * 100);
}


//funcion para apagar el calentador

function apagarCalentador() {
  powerOn = false;

  // modulo de apagado
  const module = document.getElementById("tempModule");
  module.classList.remove("is-on");
  module.classList.add("is-off");

  // Boton
  const toggle = document.getElementById("heaterToggle");
  toggle.setAttribute("aria-pressed", "false");
  toggle.textContent = "🔴 Apagado";

  // Deshabilitar slider
  const slider = document.getElementById("tempSlider");
  slider.disabled = true;

  // Estado texto
  document.getElementById("heaterStateText").textContent = "Calentador apagado";
}

//Boton de apagado
document.getElementById("heaterToggle").addEventListener("click", () => {
  if (powerOn) apagarCalentador();
  else encenderCalentador();
});

const slider = document.getElementById("tempSlider");
const setLabel = document.getElementById("tempSetValue");

slider.value = String(tempSet);
setLabel.textContent = tempSet;

slider.addEventListener("input", () => {
  tempSet = Number(slider.value);
  setLabel.textContent = tempSet;
});

slider.addEventListener("change", () => {});

if (slider && setLabel) {
  slider.value = String(tempSet);
  setLabel.textContent = tempSet;

  slider.addEventListener("input", () => {
    tempSet = Number(slider.value);
    setLabel.textContent = tempSet;
  });

  slider.addEventListener("change", () => {});
}

function actualizarTermometro() {
  const display = document.getElementById("tempCurrent");
  const level = document.getElementById("thermoLevel");

  // Mostrar número en pantalla
  display.textContent = tempActual.toFixed(1);

  const porcentaje = Math.min(100, Math.max(0, (tempActual / 60) * 100));
  level.style.height = `${porcentaje}%`;

  let color;
  if (tempActual < 25) color = "#00bfff";
  else if (tempActual < 45) color = "#ffa500";
  else color = "#ff4c4c";

  level.style.background = color;
}

function startTempLoop() {
  if (loopId) return;

  loopId = setInterval(() => {
    let heaterShouldHeat = false;
    if (powerOn) {
      const low = tempSet - BANDA / 2;
      const high = tempSet + BANDA / 2;

      if (tempActual < low) heaterShouldHeat = true;
      else if (tempActual > high) heaterShouldHeat = false;
    }

    if (heaterShouldHeat) {
      tempActual += HEAT_PER_TICK;
    } else {
      if (tempActual > T_AMBIENTE) tempActual -= COOL_PER_TICK;
      if (tempActual < T_AMBIENTE) tempActual = T_AMBIENTE;
    }

    if (tempActual > T_MAX) tempActual = T_MAX;

    actualizarTermometro();

    const stateEl = document.getElementById("heaterStateText");
    if (stateEl) {
      if (!powerOn) stateEl.textContent = "Calentador apagado";
      else
        stateEl.textContent = heaterShouldHeat
          ? "Calentando…"
          : "Encendido (en espera)";
    }

    // 🔹 Registrar en bitácora
    if (powerOn && aguaActual > 0 && capacidadMaxima > 0) {
      const porcentaje = (aguaActual / capacidadMaxima) * 100;
      registrarCambio(tempActual, porcentaje);
    }
  }, 500);
}


function bandaPorVolumen(litros, capacidadLitros) {
  if (!capacidadLitros || capacidadLitros <= 0) return 1.0;

  const frac = Math.max(0, Math.min(1, litros / capacidadLitros));

  const banda = 1.0 + 2.0 * frac;

  return Math.min(4.0, Math.max(0.5, banda));
}

BANDA = bandaPorVolumen(aguaActual, capacidadMaxima);

function actualizarBandDisplay() {
  const el = document.getElementById("bandDisplay");
  if (!el) return;
  el.textContent = typeof BANDA === "number" ? BANDA.toFixed(1) : "—";
}

apagarCalentador();
actualizarTermometro();
startTempLoop();
actualizarBandDisplay();

// Prevenir la entrada de 'e' en los inputs numéricos
document.getElementById("myRadio").addEventListener("keydown", function (e) {
  if (e.key === "e" || e.key === "E") {
    e.preventDefault();
>>>>>>> Stashed changes
  }

  // Vaciar cantidad
  while (vaciado > 0 && aguaActual > 0) {
    aguaActual--;
    vaciado--;
  }
<<<<<<< Updated upstream

  if (aguaActual < 0) aguaActual = 0;

  // Mostrar resultado
  document.getElementById(
    "myResult2"
  ).textContent = `Agua actual: ${aguaActual.toFixed(
    2
  )} litros / ${capacidadMaxima.toFixed(2)} litros`;

  console.log(`Volumen tras vaciado: ${aguaActual} litros`);
}
=======
});


// Cargar bitácora
let bitacora = JSON.parse(localStorage.getItem('bitacora')) || [];

// Función para actualizar la tabla en la página
function actualizarTabla() {
  const tbody = document.querySelector('#tablaBitacora tbody');
  tbody.innerHTML = ''; // limpiar tabla

  bitacora.forEach(registro => {
    const fila = document.createElement('tr');
    fila.innerHTML = `
      <td>${registro.fecha_hora}</td>
      <td>${registro.temperatura}</td>
      <td>${registro.nivel_agua}</td>
    `;
    tbody.appendChild(fila);
  });
}

// Función para registrar cambios
function registrarCambio(temp, nivel) {
  const fecha_hora = new Date().toLocaleString();
  const registro = { fecha_hora, temperatura: temp, nivel_agua: nivel };

  bitacora.push(registro);
  localStorage.setItem('bitacora', JSON.stringify(bitacora));
  actualizarTabla();
}

// Iniciar tabla al cargar la página
actualizarTabla();

document.getElementById("btnBorrarBitacora").addEventListener("click", () => {
  if (confirm("¿Estás seguro que quieres borrar toda la bitácora?")) {
    bitacora = [];
    localStorage.removeItem("bitacora");
    actualizarTabla();
  }
});
>>>>>>> Stashed changes
