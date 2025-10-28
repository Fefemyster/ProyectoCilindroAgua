// radio y altura en metros

document.getElementById("myButton").onclick = function () {
  const radio = parseFloat(document.getElementById("myRadio").value);
  const altura = parseFloat(document.getElementById("myHeight").value);
  const unidad = document.getElementById("unitSelect").value;

  // Validar datos
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
};
