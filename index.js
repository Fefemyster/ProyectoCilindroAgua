document.getElementById("myButton").onclick = calcularVolumen;

// Validar datos

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

  //Mostrando resultados
  document.getElementById("myResult").textContent = `Volumen: ${volumen.toFixed(
    2
  )} m³`;

  document.getElementById(
    "myResult2"
  ).textContent = `Volumen: ${volumenLitros.toFixed(2)} litros`;

  return volumenLitros;
}

//Llenado y vaciado de agua

document.getElementById("myLlenadoBttn").onclick = llenadoTanque;

function llenadoTanque() {
  let llenado = parseFloat(document.getElementById("myLlenado").value);
  let volumenLitros = calcularVolumen(); //Llama la función y guarda su resultado

  if (isNaN(llenado) || llenado < 0) {
    console.log("Datos inválidos en vaciado");
    return;
  }

  let volumenActual = volumenLitros + llenado;

  if (volumenActual > volumenLitros) {
    console.log("El tanque se esta rebalsando/Vaciado inminente");
  }

  console.log("Volumen tras llenado: ", volumenActual);

  return volumenActual;
}

document.getElementById("myVaciadoBttn").onclick = vaciadoTanque;

function vaciadoTanque() {
  let vaciado = parseFloat(document.getElementById("myVaciado").value);
  let volumenActual = llenadoTanque(); //Llama la función y guarda su resultado

  if (isNaN(vaciado) || vaciado < 0) {
    console.log("Datos inválidos en vaciado");
    return;
  }

  volumenActual = volumenActual - vaciado;

  console.log("Volumen tras vaciado: ", volumenActual);

  return volumenActual;
}
