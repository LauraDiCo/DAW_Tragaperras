/* Laura DiCo - Desarrollo Web Entorno Cliente - PEC Desarrollo UF3 - La tragaperras o Slot Machine*/


//Las imágenes deberán obtenerse a partir del siguiente array que deberá declararse al comienzo del fichero JS del proyecto:
var listaImagenes = ["aubergine","banana","carrots","cherries","dollar","lemon","orange","peach","potato","tomato",];

var monedasTotales = 0; /*Monedas que en todo momento */
/*array con las imágenes de la slot machine (o slots) */
var slots = [
  document.getElementById("imagen1"),
  document.getElementById("imagen2"),
  document.getElementById("imagen3"),
];

/*Deberá tener un elemento para introducir monedas en la tragaperras y otro para aceptar la cantidad confirmarla*/
var introMonedas = document.getElementById("introMonedas");                             
var botonAceptar = document.getElementById("botonAceptar");   

/*La cantidad introducida se mostrará de forma predominante.*/
var monedasActuales = document.getElementById("monedasActuales");

/*Botón de cobrar */
var botonCobrar = document.getElementById("botonCobrar");

/*Palanca*/
var palanca = document.getElementById("palanca");                                       


/*Al introducir monedas, se indicará en el historial que se han introducido monedas en la máquina.*/
var historial = document.getElementById("historial");                                   

/*Inicio */
window.addEventListener("load", function () {
 
  botonAceptar.addEventListener("click", function () {
    introduceMonedas(introMonedas.value);
  });
  botonCobrar.addEventListener("click", function () {
    collect();
  });

/**Palanca */
  palanca.addEventListener("mousedown", activateHandle);
  palanca.addEventListener("mouseup", desactivateHandle);

  manageDisplayElement(botonCobrar, "none");
  manageDisplayElement(historial, "none");
  managemonedasActuales(0);

  createHistorial(); 
});

function manageDisplayElement(element, displayType) {
  element.style.display = displayType;
}

/*Actualiza las monedas */
function managemonedasActuales(coins) {
  monedasTotales += coins;
  monedasActuales.innerHTML = monedasTotales;
}

/*El historial se muestra como una lista*/
function createHistorial() {
 
  let ul = document.createElement("ul");
  ul.id = "ul-historial";

  historial.appendChild(ul);
  historial.style.fontSize = "12px";
}

/*•	Se van añadiendo todos los movimientos que se producen: cuando se introducen monedas, cuando se sacan, cuando se gastan y cuando se ganan*/
function setNewLineHistorial(line) {
  
  if (document.getElementsByClassName("li-historial").length == 0) {
    manageDisplayElement(historial, "flex");
  }

/*En modoo lista */
  let li = document.createElement("li");
  li.className = "li-historial";
  li.textContent = line;
  li.style.marginBottom = "1px";

/*En orden de más nuevo el primero*/
  if (document.getElementById("ul-historial").childNodes.length > 0) {
    document
      .getElementById("ul-historial")
      .insertBefore(li, document.getElementById("ul-historial").childNodes[0]);
  } else {
    document.getElementById("ul-historial").appendChild(li);
  }
}

/*Funcion para que las monedas siempre sean número positivo y sino nos de error*/
function introduceMonedas(monedas) {

  if (introMonedas.value > 0) {
    managemonedasActuales(parseInt(introMonedas.value));

    let nameCoin = introMonedas.value == 1 ? " euro." : " euros.";
    setNewLineHistorial(
      "Tienes  " +
      introMonedas.value +
        nameCoin +
        " Avance. Uno, dos, tres!"
    );
    introMonedas.value = 0;
    disableCoinsManager();
  } else setNewLineHistorial("Error. Inténtalo de nuevo. ");
}

/*Una vez introducidas las monedas, se bloqueará la posibilidad de introducir más monedas*/
function disableCoinsManager() {
 
  introMonedas.disabled = true;
  introMonedas.style.color = "rgb(209, 159, 20)";
  introMonedas.style.borderColor = "rgb(209, 159, 20)";

  botonAceptar.disabled = true;
  manageDisplayElement(botonAceptar, "none");
  manageDisplayElement(botonCobrar, "block");
}

function enableCoinsManager() {
  introMonedas.disabled = false;
  introMonedas.style.color = "rgb(209, 159, 20)";
  introMonedas.style.borderColor = "rgb(209, 159, 20)";

  botonAceptar.disabled = false;
  manageDisplayElement(botonAceptar, "inline-block");
}


/*En caso de no haber monedas, muestra un mensaje de error y no genera tirada*/
function activateHandle() {

  manageDisplayElement(document.getElementById("palancaUp"), "none");
  manageDisplayElement(document.getElementById("palancaDown"), "block");

  if (monedasTotales == 0) {
    setNewLineHistorial("Inserta más monedas para seguir jugando.");
  } else {
    setNewLineHistorial("Has gastado un euro.");
    managemonedasActuales(-1);

    play();
  }
}

/*La palanca empieza con la imagen hacia arriba*/
function desactivateHandle() {
  
  manageDisplayElement(document.getElementById("palancaDown"), "none");
  manageDisplayElement(document.getElementById("palancaUp"), "block");
}

/*La palanca solo podrá generar una nueva tirada si hay monedas introducidas en la tragaperras*/
function play() {
 
  let slotsNumbers = [            
    getRandomNumber(), 
    getRandomNumber(), 
    getRandomNumber()
  ];


  /*La selección será completamente aleatoria en cada una de las tres posiciones de la tragaperras*/
  slots.forEach(function (slot, index) {

    slot.getElementsByTagName("img")[0].src =
      "img/" + listaImagenes[slotsNumbers[index]] + ".png";

  });

  /*En caso de haber monedas, genera una tirada e indica que se ha gastado una moneda en el historial*/
  let calculatedValues = calculatemonedasGanadas(slotsNumbers); 
  managemonedasActuales(parseInt(calculatedValues[0]));
  setNewLineHistorial(calculatedValues[1]);
}

 /*Función que genera números aleatorios entre 0 y 10*/
function getRandomNumber() {
   return Math.floor(Math.random() * (10 - 0));
}

/*Calculamos las monedas de los premios */
function calculatemonedasGanadas(slotsNumbers) {

  let monedasGanadas = 0;
  let msg; 
  let frutas = 1; 
  let dolar = 0;

  slotsNumbers.forEach(function (slot) {
    if (listaImagenes[slot] == "dollar") {
      dolar++;
    }
  });

  if (dolar < 2) {
    repeatedfrutas = {};
    for (i = 0; i < slotsNumbers.length; ++i) {
      if (!repeatedfrutas[slotsNumbers[i]]) repeatedfrutas[slotsNumbers[i]] = 0;
      ++repeatedfrutas[slotsNumbers[i]];
    }

    if (Object.keys(repeatedfrutas).length == 3) frutas = 1;
    if (Object.keys(repeatedfrutas).length == 2) frutas = 2;
    if (Object.keys(repeatedfrutas).length == 1) frutas = 3;
  }

  /* Condiciones de ganancia */
    switch(dolar) {
    case 1: 
      monedasGanadas = 1;
      msg = "Un dolar. Ganas 1 euro."
      break;

    case 2: 
    monedasGanadas = 4;
      msg =  "Dos dolares. Ganas 4 euros."
      break;

    case 3: 
    monedasGanadas = 10;
      msg =  "Tres dolares. Ganas 10 euros!"
      break;
  }

  switch(frutas) {
    case 2: 
    monedasGanadas = 2;
      msg = "Dos hortalizas/frutas iguales. Ganas 2 euros!"
      break;

    case 3: 
    monedasGanadas = 5;
      msg = "Tres hortalizas/frutas iguales. Ganas 5 euros!"
      break;
  }

  if (frutas == 2 && dolar == 1)  {
    monedasGanadas = 3;
    msg = "Dos hortalizas/frutas iguales y un dolar. Ganas 3 euros!"
  }

  return [monedasGanadas, msg];
}

/*Al terminar la partida se mostrará una alerta con la cantidad recibida, 
se vaciará la cantidad almacenada en la tragaperras, se indicará por el historial 
y la cantidad recibida se mostrará el elemento pensado para introducir monedas*/
function collect() {

  setNewLineHistorial("Has retirado tu saldo.");
  enableCoinsManager();
  introMonedas.value = monedasTotales;

  window.alert("¡FINAL DE LA PARTIDA! \nHas ganado " + monedasTotales + " €.");

  managemonedasActuales(-monedasTotales);
  manageDisplayElement(botonCobrar, "none");

  slotsNumbers = [];
  slots.forEach(function (slot) {
    slot.getElementsByTagName("img")[0].src = "img/penguin.png";
  });

}


