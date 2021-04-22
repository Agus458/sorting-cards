/* eslint-disable */
// import "bootstrap";
import "./style.css";
import validator from "validator";

let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
let colores = ["♦", "♥", "♠", "♣"];
let mazo = [];

function generateRandom(cant) {
  return Math.floor(Math.random() * cant);
}

function burbuja(arr) {
  let wall = arr.length - 1;

  while (wall > 0) {
    let i = 0;
    while (i < wall) {
      if (arr[i].numero > arr[i + 1].numero) {
        let aux = arr[i];
        arr[i] = arr[i + 1];
        arr[i + 1] = aux;
      }

      i++;
    }

    wall--;
  }
  return arr;
}

function mostrarCartas(div, arr) {
  // Vaciar el contenedor
  div.innerHTML = "";

  // Recorrer el arreglo de cartas a mostrar
  for (let i = 0; i < arr.length; i++) {
    let color = "";

    // Reviso el color de la carta
    if (arr[i].color == "♦" || arr[i].color == "♥") {
      color = "red";
    }

    let numero = arr[i].numero;
    if (numero === 11) {
      numero = "J";
    } else {
      if (numero === 12) {
        numero = "Q";
      } else {
        if (numero === 13) {
          numero = "K";
        }
      }
    }

    // agrega la carta al div contenedor
    div.innerHTML += `<div class="card ${color}">
          <div class="card-header">
            <div class="figure">${arr[i].color}</div>
          </div>
          <div class="card-body">
            <div class="number">${numero}</div>
          </div>
          <div class="card-footer">
            <div class="figure">${arr[i].color}</div>
          </div>
        </div>`;
  }
}

function generateCards(cantidad) {
  let res = [];

  for (let i = 0; i < cantidad; i++) {
    let carta = {};
    carta.numero = numbers[generateRandom(numbers.length)];
    carta.color = colores[generateRandom(colores.length)];
    res.push(carta);
  }

  return res;
}

let draw = document.getElementById("draw");
draw.addEventListener("click", function(event) {
  // Traigo la cantidad ingresada
  let cant = document.getElementById("cantidad").value;

  // Reviso que sea numerico
  if (!validator.isEmpty(cant) && validator.isNumeric(cant)) {
    mazo = generateCards(cant);

    let drawCards = document.getElementById("draw-cards");
    mostrarCartas(drawCards, mazo);
  }
});

let sort = document.getElementById("sort");
sort.addEventListener("click", function(event) {
  if (mazo.length > 0) {
    // Ordeno las cartas
    let mazoOrdenado = burbuja(mazo);

    let sortedCards = document.getElementById("sorted-cards");

    mostrarCartas(sortedCards, mazoOrdenado);
  }
});
