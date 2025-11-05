// Variables globales
let aguaActual = 0;
let capacidadMaxima = 0;
let intervaloAutomatico = null;
// Funcion global para encender el calentador
let powerOn = false;
let tempSet = 55; //
let tempActual = 15;
const T_AMBIENTE = 15;
const T_MAX = 65;
let BANDA = 1.0;

const HEAT_PER_TICK = 0.15;
const COOL_PER_TICK = 0.05;
let loopId = null;

document.getElementById("myButton").onclick = calcularVolumen;
document.getElementById("myLlenadoBttn").onclick = llenadoManual;
document.getElementById("myVaciadoBttn").onclick = vaciadoManual;
document.getElementById("activarAuto").onclick = activarAutomatico;
document.getElementById("detenerAuto").onclick = detenerAutomatico;
document.getElementById("resetTank").onclick = resetearTanque;

// ---- Calcular Volumen ----
function calcularVolumen() {
  const radio = parseFloat(document.getElementById("myRadio").value);
  const altura = parseFloat(document.getElementById("myHeight").value);
  const unidad = document.getElementById("unitSelect").value;

  if (isNaN(radio) || isNaN(altura) || radio <= 0 || altura <= 0) {
    mostrarAlerta("⚠ Ingresa valores válidos en radio y altura.");
    return;
  }

  let r = unidad === "cm" ? radio / 100 : radio;
  let h = unidad === "cm" ? altura / 100 : altura;

  const volumen = Math.PI * r * r * h; // m3
  capacidadMaxima = volumen * 1000; // Litros
  aguaActual = 0; // Reiniciar

  document.getElementById("myResult").innerText = `Volumen: ${volumen.toFixed(
    2
  )} m³`;
  document.getElementById(
    "myResult2"
  ).innerText = `Capacidad máxima: ${capacidadMaxima.toFixed(2)} litros`;

  document.getElementById("capacidadDisplay").innerText =
    capacidadMaxima.toFixed(1);
  actualizarTanque();
  mostrarAlerta("✔ Volumen calculado correctamente", "ok");
}

// ---- Llenado Manual ----
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
}

// ---- Vaciado Manual ----
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
    if (aguaActual < capacidadMaxima) {
      // Sumar sin sobrepasar la capacidad máxima
      aguaActual = Math.min(
        aguaActual + capacidadMaxima * 0.01,
        capacidadMaxima
      );
      actualizarTanque();

      // Si alcanzó la capacidad máxima, detener el automático y notificar
      if (aguaActual >= capacidadMaxima) {
        clearInterval(intervaloAutomatico);
        intervaloAutomatico = null;
        mostrarAlerta("✅ Tanque lleno — sistema automático detenido.", "ok");
      }
    }
  }, 500);
}

function detenerAutomatico() {
  if (intervaloAutomatico) {
    clearInterval(intervaloAutomatico);
    intervaloAutomatico = null;
    mostrarAlerta("⏹ Sistema automático detenido.", "ok");
  } else {
    mostrarAlerta("⚠ El sistema automático no está activo.");
  }
}

function resetearTanque() {
  aguaActual = 0;
  actualizarTanque();
  mostrarAlerta("🔄 Tanque reiniciado.", "ok");
}

// ---- Actualizar visual del tanque ----
function actualizarTanque() {
  BANDA = bandaPorVolumen(aguaActual, capacidadMaxima);
  actualizarBandDisplay();

  const porcentaje = capacidadMaxima ? (aguaActual / capacidadMaxima) * 100 : 0;
  document.getElementById("water").style.height = `${porcentaje}%`;

  document.getElementById("nivelActualDisplay").innerText =
    aguaActual.toFixed(1);
  document.getElementById("porcentajeDisplay").innerText =
    porcentaje.toFixed(1);
  document.getElementById("capacidadDisplay").innerText =
    capacidadMaxima.toFixed(1);

   if (aguaActual <= 0) {
    tempActual = T_AMBIENTE; 
    actualizarTermometro();  
  }

  if (aguaActual <= 0) {
    tempActual = T_AMBIENTE;
    if (powerOn) apagarCalentador(); 
    document.getElementById("heaterStateText").textContent = "Calentador apagado (sin agua)";
    actualizarTermometro();
  }
}

// ---- Alertas ----
function mostrarAlerta(msg, tipo = "error") {
  const alertBox = document.getElementById("alertBox");
  alertBox.innerText = msg;
  alertBox.style.background = tipo === "ok" ? "#d4edda" : "#f8d7da";
  alertBox.style.color = tipo === "ok" ? "#155724" : "#721c24";
  alertBox.style.display = "block";
  setTimeout(() => (alertBox.style.display = "none"), 3000);
}

function encenderCalentador() {
  if (aguaActual <= 0) {
    mostrarAlerta("⚠ No puedes encender el calentador sin agua en el tanque.");
    return;
  }

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
  }
});

document.getElementById("myHeight").addEventListener("keydown", function (e) {
  if (e.key === "e" || e.key === "E") {
    e.preventDefault();
  }
});
