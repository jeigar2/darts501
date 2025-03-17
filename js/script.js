const START_POINTS = 501;
const paths = document.querySelectorAll('path');
const circles = document.querySelectorAll('circle');
const textNumbers = document.querySelectorAll('text');
const elements = paths + circles;
// si es true, si el jugador llega a valor menor de 0, reinicia el contador y se le descuenta el resto del último tiro
// si es false, si el jugador llega a valor menor de 0, reinicia el contador
const SUPERA_Y_RESTA = false;

paths.forEach(path => {
    if (path.getAttribute('value')) {

        path.addEventListener('click', () => {
            const id = path.getAttribute('id');
            const value = path.getAttribute('value');
            //alert(`ID: ${id}\nValue: ${value}`);
            updateScore(currentPlayer, value, false, id);
            throwDart();
        });
    }
});

circles.forEach(circle => {
    if (circle.getAttribute('value')) {

        circle.addEventListener('click', () => {
            const id = circle.getAttribute('id');
            const value = circle.getAttribute('value');
            //alert(`ID: ${id}\nValue: ${value}`);
            updateScore(currentPlayer, value, false, id);
            throwDart();
        });
    }
});

textNumbers.forEach(textNumber => {
    if (textNumber.getAttribute('value')) {

        textNumber.addEventListener('click', () => {
            const id = textNumber.getAttribute('id');
            const value = textNumber.getAttribute('value');
            //alert(`ID: ${id}\nValue: ${value}`);
            updateScore(currentPlayer, value, true, id);
            //throwDart();
        });
    }
});

const board = document.getElementById('board');
const player1ScoreDisplay = document.getElementById('player1Score');
const player2ScoreDisplay = document.getElementById('player2Score');
const player1Name = document.getElementById('player1-name');
const player2Name = document.getElementById('player2-name');

const totalDartsDisplay = document.getElementById('totalDarts');
let currentPlayer = 1;
let prefix = 'player1';
let dart1 = document.getElementById(prefix + 'dart1');
let dart2 = document.getElementById(prefix + 'dart2');
let dart3 = document.getElementById(prefix + 'dart3');
let currentThrows = 0;
let currentDart = 1;
let totalDarts = 0;

function updateScore(player, points, fix, id) {

    if (player === 1) {
        prefix = 'player1';
        if (fix) {
            player1Score += parseInt(points);
        } else {
            if (player1Score - points >= 0) {
                player1Score -= points;
                if (player1Score === 0 && (id.indexOf('simple') > -1)) {
                    if(SUPERA_Y_RESTA){
                        player1Score = START_POINTS - points;
                    } else {
                        player1Score = START_POINTS; 
                    }
                }
            } else {
                if(SUPERA_Y_RESTA){
                    player1Score = START_POINTS - points;
                } else {
                    player1Score = START_POINTS; 
                }
            }
        }
        player1ScoreDisplay.textContent = player1Score;
        if (player1Score === 0) {
            showWinMessage(player);
        }
    } else if (player === 2) {
        prefix = 'player2';
        if (fix) {
            player2Score += parseInt(points);
        } else {
            if (player2Score - points >= 0) {
                player2Score -= points;
                if (player2Score === 0 && (id.indexOf('simple') > -1)) {
                    if(SUPERA_Y_RESTA){
                        player1Score = START_POINTS - points;
                    } else {
                        player1Score = START_POINTS; 
                    }
                }
            } else {
                if(SUPERA_Y_RESTA){
                    player1Score = START_POINTS - points;
                } else {
                    player1Score = START_POINTS; 
                }
            }
        }
        player2ScoreDisplay.textContent = player2Score;
        if (player2Score === 0) {
            showWinMessage(player);
        }
    }
    dart1 = document.getElementById(prefix + 'dart1');
    dart2 = document.getElementById(prefix + 'dart2');
    dart3 = document.getElementById(prefix + 'dart3');
    switch (currentDart) {
        case 1:
            dart1.textContent = points;
            if (player === 1) {
                dart1.style.color = 'rgba(195, 240, 196, 0.7)';
                dart3.style.color = 'rgba(23, 53, 23, 0.7)';
            }
            else {
                dart1.style.color = "rgba(235, 162, 156, 0.7)";
                dart3.style.color = "rgba(49, 30, 30, 0.7)";
            }
            dart3.textContent = 0;
            totalDarts = parseInt(points);
            break;
        case 2:
            dart2.textContent = points;
            if (player === 1) {
                dart2.style.color = 'rgba(195, 240, 196, 0.7)';
                dart1.style.color = 'rgba(23, 53, 23, 0.7)';
            }
            else {
                dart2.style.color = "rgba(235, 162, 156, 0.7)";
                dart1.style.color = "rgba(49, 30, 30, 0.7)";
            }
            totalDarts += parseInt(points);
            break;
        case 3:
            if (player === 1) {
                dart3.style.color = 'rgba(195, 240, 196, 0.7)';
                dart2.style.color = 'rgba(23, 53, 23, 0.7)';
            }
            else {
                dart3.style.color = "rgba(235, 162, 156, 0.7)";
                dart2.style.color = "rgba(49, 30, 30, 0.7)";
            }
            dart3.textContent = points;
            totalDarts += parseInt(points);
            break;
    }
    totalDartsDisplay.textContent = totalDarts;
}

function throwDart() {
    if (currentDart % 3 === 0) {
        currentDart = 1;
    }
    if (currentThrows < 3) {
        currentThrows++;
        currentDart++;

        if (currentThrows === 3) {
            currentThrows = 0;
            currentDart = 1;
            currentPlayer = currentPlayer === 1 ? 2 : 1;
            playerActive();
        }
    }
}

function playerActive() {
    if (currentPlayer === 1) {
        player1ScoreDisplay.style.color = 'rgba(195, 240, 196, 0.7)';
        player2ScoreDisplay.style.color = 'rgba(23, 53, 23, 0.7)';
        player1Name.style.color = 'white';
        player2Name.style.color = 'rgba(49, 30, 30, 0.7)';
    } else {
        player2ScoreDisplay.style.color = 'rgba(235, 162, 156, 0.7)';
        player1ScoreDisplay.style.color = 'rgba(49, 30, 30, 0.7)';
        player2Name.style.color = 'white';
        player1Name.style.color = 'rgba(23, 53, 23, 0.7)';
    }
    dart1.textContent = dart2.textContent = 0;
}

let player1Score;
let player2Score;

function resetGame() {
    player1Score = START_POINTS;
    player2Score = START_POINTS;
    player1ScoreDisplay.textContent = player1Score;
    player2ScoreDisplay.textContent = player2Score;
    playerActive();
    totalDarts = 0;
    totalDartsDisplay.textContent = totalDarts;
    dart1.textContent = dart2.textContent = dart3.textContent = 0;
    currentThrows = 0;
    currentDart = 1;
    totalDarts = 0;    
    currentPlayer = 1;
}

resetGame();


function showWinMessage(player) {
    const winMessage = document.createElement('div');
    winMessage.id = 'win-message';
    winMessage.textContent = `¡Jugador ${player} ha ganado!`;
    document.body.appendChild(winMessage);

    // Style the win message (you can also do this in CSS)
    winMessage.style.position = 'absolute';
    winMessage.style.top = '50%';
    winMessage.style.left = '50%';
    winMessage.style.transform = 'translate(-50%, -50%)';
    if(player === 1){ 
        winMessage.style.backgroundColor = 'rgba(76, 175, 80, 0.7)';
    }else{
        winMessage.style.backgroundColor = 'rgba(244, 67, 54, 0.7)';
    }
    winMessage.style.color = 'white';
    winMessage.style.padding = '20px';
    winMessage.style.fontSize = '32px';
    winMessage.style.borderRadius = '10px';
    winMessage.style.zIndex = '1000'; // Ensure it's on top

    // Optional: Remove the message after a few seconds
    setTimeout(() => {
        resetGame();
        document.body.removeChild(winMessage);
    }, 3000);
}

const dart = document.getElementById('dart');
let previousX = 0;
let previousY = 0;

document.addEventListener('mousemove', (e) => {
    const rect = dart.getBoundingClientRect();
    const dartWidth = rect.width;

    dart.style.left = e.clientX + 'px';
    dart.style.top = e.clientY + 'px';

    // Calculate the angle of movement
    const deltaX = e.clientX - previousX;
    const deltaY = e.clientY - previousY;
    let angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);

    // Adjust the angle to be relative to the dart's initial orientation (pointing right)
    angle += 180;

    // Apply the rotation
    dart.style.transform = `rotate(${angle}deg)`;

    previousX = e.clientX;
    previousY = e.clientY;
});

/*document.addEventListener('click', (e) => {
    // Clone the dart
    const newDart = dart.cloneNode(true);
    newDart.id = 'static-dart-' + Date.now(); // Ensure unique ID
    newDart.style.pointerEvents = 'none'; // Make sure it doesn't interfere with clicks
    document.body.appendChild(newDart);
  
    // Position the cloned dart where the mouse was clicked
    newDart.style.left = dart.style.left;
    newDart.style.top = dart.style.top;
    newDart.style.transform = dart.style.transform;
  
    // Reset the original dart's position to follow the mouse again
    dart.style.left = e.clientX + 'px';
    dart.style.top = (e.clientY - 500) + 'px';
   });*/