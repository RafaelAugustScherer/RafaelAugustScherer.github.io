/* Função para gerar as cores */

const guessText = document.getElementById('rgb-color');

function generateRGBColor() {
  let rgbColor = [];
  for (let idx = 0; idx < 3; idx += 1) {
    const rgbNum = Math.floor(Math.random() * 255);
    rgbColor.push(rgbNum);
  }

  rgbColor = `rgb(${rgbColor[0]}, ${rgbColor[1]}, ${rgbColor[2]})`;

  return rgbColor;
}

/* Função para gerar os círculos com as cores */

const guessBallsContainer = document.getElementById('ball-guess-container');

function createGuessBalls() {
  const rightBallPosition = Math.floor(Math.random() * 5);

  for (let idx = 0; idx < 6; idx += 1) {
    const ball = document.createElement('div');
    ball.className = 'ball';

    if (idx === rightBallPosition) {
      ball.style.backgroundColor = guessText.innerText;
    } else {
      ball.style.backgroundColor = generateRGBColor();
    }
    guessBallsContainer.appendChild(ball);
  }
}

/* Ativa o sistema de pontuação */

const scoreCounter = document.getElementById('score');
scoreCounter.innerText = 0;

/* Verifica se a resposta ao clicar no círculo está correta  */

let guessBalls = document.querySelectorAll('.ball');
const answerText = document.getElementById('answer');

function checkGuess(evt) {
  const selectedBall = evt.target;

  if (selectedBall.style.backgroundColor === guessText.innerText) {
    answerText.innerText = 'Acertou!';
    scoreCounter.innerText = Number(scoreCounter.innerText) + 3;
  } else {
    answerText.innerText = 'Errou! Tente novamente!';
  }

  guessBalls.forEach((ball) => {
    const ballText = document.createElement('span');
    ballText.innerText = ball.style.backgroundColor;
    ball.appendChild(ballText);
  });
}

/* Adiciona função para iniciar o jogo */

function startGame() {
  guessText.innerText = generateRGBColor();
  createGuessBalls();

  guessBalls = document.querySelectorAll('.ball');
  guessBalls.forEach((ball) => {
    ball.addEventListener('click', checkGuess);
  });
}

startGame();

/* Adiciona botão para reiniciar o jogo */

function resetGame() {
  // Exclui as bolas que estão em tela
  const initialBallsContainerLength = guessBallsContainer.childNodes.length;

  for (let idx = 0; idx < initialBallsContainerLength; idx += 1) {
    guessBallsContainer.removeChild(guessBallsContainer.firstChild);
  }

  // Reseta o valor da resposta
  answerText.innerText = 'Escolha uma cor';

  // Inicia novamente o jogo
  startGame();
}

function createResetButton() {
  const button = document.createElement('button');
  button.id = 'reset-game';
  button.addEventListener('click', resetGame);
  button.innerText = 'Reiniciar o Jogo';
  document.body.appendChild(button);
}
createResetButton();
