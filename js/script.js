const START_POINTS = 501;
const paths = document.querySelectorAll('path');
const circles = document.querySelectorAll('circle');
const textNumbers = document.querySelectorAll('text');
const elements = paths + circles;

paths.forEach(path => {
    if (path.getAttribute('value')) {

        path.addEventListener('click', () => {
            const id = path.getAttribute('id');
            const value = path.getAttribute('value');
            //alert(`ID: ${id}\nValue: ${value}`);
            updateScore(currentPlayer, value, false);
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
            updateScore(currentPlayer, value, false);
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
            updateScore(currentPlayer, value, true);
            //throwDart();
        });
    }
});

const board = document.getElementById('board');
const player1ScoreDisplay = document.getElementById('player1Score');
const player2ScoreDisplay = document.getElementById('player2Score');
const dart1 = document.getElementById('dart1');
const dart2 = document.getElementById('dart2');
const dart3 = document.getElementById('dart3');
const totalDartsDisplay = document.getElementById('totalDarts');
let currentPlayer = 1;
let currentThrows = 0;
let currentDart = 1;
let totalDarts = 0;

function updateScore(player, points, fix) {

    if (player === 1) {
        if (fix) {
            player1Score += parseInt(points);
        } else {
            if (player1Score - points >= 0) {
                player1Score -= points;
            }
        }
        player1ScoreDisplay.textContent = player1Score;
        if (player1Score === 0) {
            alert('¡Jugador 1 ha ganado!');
        }
    } else if (player === 2) {
        if (fix) {
            player2Score += parseInt(points);
        } else {
            if (player2Score - points >= 0) {
                player2Score -= points;
            }
        }
        player2ScoreDisplay.textContent = player2Score;
        if (player2Score === 0) {
            alert('¡Jugador 2 ha ganado!');
        }
    }
    switch (currentDart) {
        case 1:
            dart1.textContent = points;
            dart1.style.color = "green";
            dart3.style.color = "gray";
            dart3.textContent = 0;
            totalDarts = parseInt(points);
            break;
        case 2:
            dart2.textContent = points;
            dart2.style.color = "green";
            dart1.style.color = "gray";
            totalDarts += parseInt(points);
            break;
        case 3:
            dart3.textContent = points;
            dart3.style.color = "green";
            dart2.style.color = "gray";
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
        player1ScoreDisplay.style.color = "green";
        player2ScoreDisplay.style.color = "gray";
    } else {
        player2ScoreDisplay.style.color = "green";
        player1ScoreDisplay.style.color = "gray";
    }
    dart1.textContent = dart2.textContent = 0;
}

let player1Score = START_POINTS;
let player2Score = START_POINTS;
player1ScoreDisplay.textContent = player1Score;
player2ScoreDisplay.textContent = player2Score;
playerActive();