// radio y altura en metros

document.getElementById("myButton").onclick = function () {
  const radio = parseFloat(document.getElementById("myRadio").value);
  const altura = parseFloat(document.getElementById("myHeight").value);

  const volumen = Math.PI * Math.pow(radio, 2) * altura;

  const volumenLitros = volumen * 1000;

  document.getElementById("myResult").textContent = `Volumen: ${volumen.toFixed(
    2
  )} m³`;

  document.getElementById(
    "myResult2"
  ).textContent = `Volumen: ${volumenLitros.toFixed(2)} litros`;
};
