// Variables globales
let aguaActual = 0;
let capacidadMaxima = 0;
let intervaloAutomatico = null;

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
  capacidadMaxima = volumen * 1000;     // Litros
  aguaActual = 0;                       // Reiniciar

  document.getElementById("myResult").innerText = `Volumen: ${volumen.toFixed(2)} m³`;
  document.getElementById("myResult2").innerText = `Capacidad máxima: ${capacidadMaxima.toFixed(2)} litros`;

  document.getElementById("capacidadDisplay").innerText = capacidadMaxima.toFixed(1);
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
    // Simular llenado → si llega al 100%, vacía
    if (aguaActual < capacidadMaxima) {
      aguaActual += capacidadMaxima * 0.01;
    } else {
      aguaActual = 0;
      mostrarAlerta("♻ Tanque lleno → vaciando automático");
    }
    actualizarTanque();
  }, 500);
}

function detenerAutomatico() {
  clearInterval(intervaloAutomatico);
  intervaloAutomatico = null;
  mostrarAlerta("⏹ Sistema automático detenido.", "ok");
}

function resetearTanque() {
  aguaActual = 0;
  actualizarTanque();
  mostrarAlerta("🔄 Tanque reiniciado.", "ok");
}

// ---- Actualizar visual del tanque ----
function actualizarTanque() {
  const porcentaje = capacidadMaxima ? (aguaActual / capacidadMaxima) * 100 : 0;
  document.getElementById("water").style.height = `${porcentaje}%`;

  document.getElementById("nivelActualDisplay").innerText = aguaActual.toFixed(1);
  document.getElementById("porcentajeDisplay").innerText = porcentaje.toFixed(1);
  document.getElementById("capacidadDisplay").innerText = capacidadMaxima.toFixed(1);
}

// ---- Alertas ----
function mostrarAlerta(msg, tipo = "error") {
  const alertBox = document.getElementById("alertBox");
  alertBox.innerText = msg;
  alertBox.style.background = tipo === "ok" ? "#d4edda" : "#f8d7da";
  alertBox.style.color = tipo === "ok" ? "#155724" : "#721c24";
  alertBox.style.display = "block";
  setTimeout(() => alertBox.style.display = "none", 3000);
}
