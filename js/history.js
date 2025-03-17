let contador = 0;
function updateHistory(player, dartType, value, multiplier) {
 addHistoryItem(`Jugador ${player}: ${value / multiplier} ${dartType} - ${value}`, true);

 // Scroll to the bottom of the history
 historyList.scrollTop = historyList.scrollHeight;
}

function addHistoryItem(message, usaContador) {
    const historyList = document.getElementById('historyList');
    const historyItem = document.createElement('div');
    historyItem.classList.add('history-item');
    historyItem.textContent = message;
    historyList.appendChild(historyItem);
    historyList.scrollTop = historyList.scrollHeight;
    contador++;
    if (contador == 3 || !usaContador) {
     historyList.appendChild(document.createElement('hr'));
       contador = 0;
    }    
}

// Clear History Button
const clearHistoryButton = document.getElementById('clearHistoryButton');
clearHistoryButton.addEventListener('click', clearHistory);

function clearHistory() {
 const historyList = document.getElementById('historyList');
 historyList.innerHTML = ''; // Clear all child elements
}
