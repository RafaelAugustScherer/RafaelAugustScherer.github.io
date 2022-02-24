const countdown = document.getElementById('countdown');
const btnStart = document.getElementById('start-button');
let cars = document.getElementsByClassName('car');
let gearCounter = document.getElementsByClassName('gear-counter')[0];
sessionStorage.revCount = 1000;
sessionStorage.gear = 1;
sessionStorage.raceCount = 0;

if (!localStorage.getItem('keyAccelerate')) {
  localStorage.keyAccelerate = ' ';
}
if (!localStorage.getItem('keyChangeGear')) {
  localStorage.keyChangeGear = 'Enter';
}

function startCountDown() {
  btnStart.style.display = 'none';
  countdown.innerText = '3';
  setTimeout(() => {
    countdown.innerText = '2';
  }, 1000);
  setTimeout(() => {
    countdown.innerText = '1';
  }, 2000);
  setTimeout(() => {
    startRace();
    countdown.innerText = 'GO!';
  }, 3000);
  setTimeout(() => {
    countdown.innerText = '';
  }, 4000);
}

function startRace() {
  // Hide custom keys input
  let customKeysDiv = document.getElementById('custom-keys');
  customKeysDiv.style.display = 'none';

  // Register custom keys as body listeners
  document.body.addEventListener('keyup', (event) => {
    let keyAccelerate = localStorage.getItem('keyAccelerate');
    let keyChangeGear = localStorage.getItem('keyChangeGear');
    let btnChangeGear = document.getElementById('btn-change-gear');

    if (event.key == keyAccelerate) {
      movePlayer();
    } else if (
      event.key == keyChangeGear &&
      btnChangeGear.style.display == 'inline-block'
    ) {
      changeGear();
    }
  });

  // Check if the buttons to accelerate and change gear need to be created
  if (sessionStorage.getItem('raceCount') > 0) {
    let btnAccelerate = document.getElementById('btn-accelerate');

    btnAccelerate.style.display = 'inline-block';
  } else {
    document.body.appendChild(createBtnAccelerate());
    document.body.appendChild(createBtnChangeGear());
  }

  sessionStorage.multiplyFactorBots = 10;

  for (car of cars) {
    car.style.marginLeft = '1px';
  }
  let race = setInterval(() => {
    moveBots([cars[1], cars[2], cars[3]], race);
  }, 175);
}

function moveBots(bots, race) {
  let multiplyFactorBots = Number(sessionStorage.getItem('multiplyFactorBots'));
  for (bot of bots) {
    bot.style.marginLeft =
      parseInt(bot.style.marginLeft) +
      Math.floor(Math.random() * multiplyFactorBots) +
      'px';
  }
  if (multiplyFactorBots < 65) {
    sessionStorage.setItem('multiplyFactorBots', multiplyFactorBots + 0.5);
  }
  checkVictory(cars, race);
}

function movePlayer() {
  let playerCar = cars[0];

  if (Number(sessionStorage.getItem('revCount')) < 7000) {
    sessionStorage.setItem(
      'revCount',
      Number(sessionStorage.getItem('revCount')) + 1000
    );
  }

  if (
    Number(sessionStorage.getItem('revCount')) >= 7000 &&
    Number(sessionStorage.getItem('gear')) < 6
  ) {
    let btnChangeGear = document.getElementById('btn-change-gear');
    btnChangeGear.style.display = 'inline-block';
  }

  let revPosition = document.getElementsByClassName('rev-position')[0];
  console.log(Number(sessionStorage.getItem('revCount')));
  revPosition.style.marginLeft =
    Number(sessionStorage.getItem('revCount')) * 0.045 + 'px';

  let multiplyFactor = sessionStorage.getItem('gear') * 5;

  playerCar.style.marginLeft =
    parseInt(playerCar.style.marginLeft) + multiplyFactor + 'px';
}

function changeGear() {
  let revPosition = document.getElementsByClassName('rev-position')[0];
  let btnChangeGear = document.getElementById('btn-change-gear');

  sessionStorage.setItem('gear', Number(sessionStorage.getItem('gear')) + 1);
  sessionStorage.setItem(
    'revCount',
    Number(sessionStorage.getItem('revCount')) - 4000
  );
  revPosition.style.marginLeft =
    Number(sessionStorage.getItem('revCount')) * 0.045 + 'px';
  gearCounter.innerText = 'Marcha: ' + sessionStorage.getItem('gear');
  btnChangeGear.style.display = 'none';
}

function checkVictory(cars, race) {
  for (idx = 0; idx < cars.length; idx += 1) {
    if (parseInt(cars[idx].style.marginLeft) >= window.innerWidth - 50) {
      if (idx == 0) {
        window.alert(
          'Aí! Nada mal para um novato!\nVocê venceu a corrida! #VQV'
        );
      } else if (idx == 1) {
        window.alert('O Mazda vermelho é o vitorioso. Boa sorte na próxima :(');
      } else if (idx == 2) {
        window.alert('O Dodge laranja se saiu melhor nessa, o prêmio é dele.');
      } else if (idx == 3) {
        window.alert(
          'O Honda verdinho levou a melhor, não foi dessa vez parceiro.'
        );
      }
      resetPlayers(cars, race);

      let customKeysDiv = document.getElementById('custom-keys');
      customKeysDiv.style.display = 'block';
      sessionStorage.setItem(
        'raceCount',
        Number(sessionStorage.getItem('raceCount')) + 1
      );
    }
  }
}

function resetPlayers(bots, race) {
  let btnAccelerate = document.getElementById('btn-accelerate');
  let btnChangeGear = document.getElementById('btn-change-gear');
  let revPosition = document.getElementsByClassName('rev-position')[0];

  for (bot of bots) {
    bot.style.marginLeft = '0px';
  }
  clearInterval(race);
  sessionStorage.setItem('gear', '1');
  sessionStorage.setItem('revCount', 1000);
  btnStart.style.display = 'inline-block';
  btnAccelerate.style.display = 'none';
  btnChangeGear.style.display = 'none';

  revPosition.style.marginLeft = '5px';
  gearCounter.innerText = 'Marcha: 1';
}

const btnChangeGear = document.createElement('button');

function createBtnAccelerate() {
  let btnAccelerate = document.createElement('button');
  btnAccelerate.id = 'btn-accelerate';
  btnAccelerate.innerText = 'Acelerar!';
  btnAccelerate.addEventListener('click', movePlayer);

  return btnAccelerate;
}

function createBtnChangeGear() {
  let btnChangeGear = document.createElement('button');
  btnChangeGear.id = 'btn-change-gear';
  btnChangeGear.innerText = 'Trocar de marcha';
  btnChangeGear.style.backgroundColor = '#FF7485';
  btnChangeGear.style.display = 'none';
  btnChangeGear.style.marginLeft = '5px';
  btnChangeGear.addEventListener('click', changeGear);

  return btnChangeGear;
}

function createRevMeter() {
  const revPosition = document.getElementsByClassName('rev-position')[0];

  let revMeter = document.createElement('div');
  revMeter.style.backgroundColor = 'red';
  revMeter.style.width = '7px';
  revMeter.style.height = '20px';
  revMeter.style.marginBottom = '10px';
  revMeter.style.marginTop = '5px';
  revMeter.style.marginLeft = '10px';

  revPosition.appendChild(revMeter);
}

function createInputKeys() {
  const customKeyAccelerateDiv = document.getElementsByClassName(
    'custom-key-accelerate'
  )[0];
  const customKeyChangeGearDiv = document.getElementsByClassName(
    'custom-key-change-gear'
  )[0];

  let inputAccelerate = document.createElement('input');
  inputAccelerate.id = 'input-accelerate';
  inputAccelerate.placeholder = localStorage.getItem('keyAccelerate');
  inputAccelerate.addEventListener('keyup', (event) => {
    keyLogger(event);
    changeKey(event);
  });

  let inputChangeGear = document.createElement('input');
  inputChangeGear.id = 'input-change-gear';
  inputChangeGear.placeholder = localStorage.getItem('keyChangeGear');
  inputChangeGear.addEventListener('keyup', (event) => {
    keyLogger(event);
    changeKey(event);
  });

  customKeyAccelerateDiv.appendChild(inputAccelerate);
  customKeyChangeGearDiv.appendChild(inputChangeGear);
}

function keyLogger(event) {
  event.target.value = event.key;
}

function changeKey(event) {
  if (event.target.id == 'input-accelerate') {
    localStorage.setItem('keyAccelerate', event.key);
  } else if (event.target.id == 'input-change-gear') {
    localStorage.setItem('keyChangeGear', event.key);
  }
}

createRevMeter();
createInputKeys();
gearCounter.innerText = 'Marcha: ' + sessionStorage.getItem('gear');
btnStart.addEventListener('click', startCountDown);

function spanWindowSize() {
  let windowWidthSpan = document.getElementsByClassName('window-width')[0];

  windowWidthSpan.innerText = window.innerWidth + ' px';
}

window.onload = spanWindowSize;
window.onresize = spanWindowSize;
