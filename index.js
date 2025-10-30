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

  if (capacidadMaxima <= 0) {
    alert("Primero calcula el volumen del cilindro.");
    return;
  }

  // Vaciar cantidad
  while (vaciado > 0 && aguaActual > 0) {
    aguaActual--;
    vaciado--;
  }

  if (aguaActual < 0) aguaActual = 0;

  // Mostrar resultado
  document.getElementById(
    "myResult2"
  ).textContent = `Agua actual: ${aguaActual.toFixed(
    2
  )} litros / ${capacidadMaxima.toFixed(2)} litros`;

  console.log(`Volumen tras vaciado: ${aguaActual} litros`);
}
