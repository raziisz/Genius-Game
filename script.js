let order = [];
let clickedOrder = [];
let score = 0;

// 0 - verde
// 1 - vermelho
// 2 - amarelo
// 3 - azul

const blue = document.querySelector(".blue");
const red = document.querySelector(".red");
const green = document.querySelector(".green");
const yellow = document.querySelector(".yellow");

//cria ordem aleatória de cores
let shuffleOrder = () => {
  let colorOrder = Math.floor(Math.random() * 4);

  order[order.length] = colorOrder;
  clickedOrder = [];

  for (let i in order) {
    let elementColor = createColorElement(order[i]);
    lightColor(elementColor, Number(i) + 1);
  }
};

//acende a próxima cor
let lightColor = (element, number) => {
  let time = number * 500;
  setTimeout(() => {
    element.classList.add("selected");
  }, time - 250);

  setTimeout(() => {
    element.classList.remove("selected");
  });
};

//che se os botoes clicados são os mesmos da ordem gerada no jogo
let checkOrder = () => {
  for (let i in clickedOrder) {
    if (clickedOrder[i] !== order[i]) {
      gameOver();
      break;
    }
  }

  if (clickedOrder.length === order.length) {
    alert(`Pontuação: ${score}\nVocê acertou! Iniciando próxima nível`);
    nextLevel();
  }
};

//função para o clique do usuario
let click = (color) => {
  clickedOrder[clickedOrder.length] = color;
  createColorElement(color).classList.add('selected');

  setTimeout(() => {
    createColorElement(color).classList.remove('selected');
    checkOrder();
  }, 250)

};

//função que retorna a cor
let createColorElement = (color) => {
  let colors = {
    0: green,
    1: red,
    2: yellow,
    3: blue
  }

  return colors[color];
}

//função para proximo nivel do jogo
let nextLevel = () => {
  score++;
  shuffleOrder();
}

//função para game over

let gameOver = () => {
  alert(`Pontuação: ${score}\nVocê perdeu o jogo!\nClique em OK para iniciar um novo jogo`);

  order = [];
  clickedOrder = [];
  playGame();
}

let playGame = () => {
  alert('Bem vindo a Gênesis! Iniciando um novo jogo!');
  score = 0;

  nextLevel();
}


green.addEventListener('click', click(0));
red.addEventListener('click', click(1));
yellow.addEventListener('click', click(2));
blue.addEventListener('click', click(3));

playGame();