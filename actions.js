document.addEventListener('DOMContentLoaded', () => {
    const startBtn = document.getElementById('start-btn');
    const restartBtn = document.getElementById('restart-btn');
    const gameContainer = document.getElementById('game-container');
    const cells = document.querySelectorAll('.cell');
    const messageContainer = document.getElementById('message-container');
    const restartContainer = document.getElementById('restart-container');
    let currentPlayer = '🧛';
    let board = ['1', '', '', '', '', '', '', '', ''];
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    startBtn.addEventListener('click', startGame);
    restartBtn.addEventListener('click', restartGame);

    function startGame() {
        gameContainer.style.display = 'block';
        startBtn.style.display = 'none';
        restartGame();
    }

    function handleCellClick(event) {
        const cell = event.target;
        const cellIndex = cell.getAttribute('data-index');

        if (board[cellIndex] !== '') {
            return;
        }

        board[cellIndex] = currentPlayer;
        cell.textContent = currentPlayer;

        if (checkWin()) {
            const mensagem = `O Jogador ${currentPlayer} venceu! Parabéns!!!`;
            const mensagemElement = document.createElement('div');
            mensagemElement.textContent = mensagem;
            messageContainer.appendChild(mensagemElement);

            restartContainer.style.display = 'block';
            
            cells.forEach(cell => {
                cell.removeEventListener('click', handleCellClick);
            });
        
            return;
        }

        if (board.every(cell => cell !== '')) { //every - boolean
            const mensagem = `Empate!! Tentem novamente`;
            const mensagemElement = document.createElement('div');
            mensagemElement.textContent = mensagem;
            messageContainer.appendChild(mensagemElement);

            restartContainer.style.display = 'block';
            
            cells.forEach(cell => {
                cell.removeEventListener('click', handleCellClick);
            });
        
            return;
        }

        currentPlayer = currentPlayer === '🧛' ? '🧙‍♂️' : '🧛';
    }

    function checkWin() {
        return winningCombinations.some(combination => {
            return combination.every(index => {
                return board[index] === currentPlayer;
            });
        });
    }

    function restartGame() {
        board = ['', '', '', '', '', '', '', '', ''];
        cells.forEach(cell => {
            cell.textContent = '';
            cell.addEventListener('click', handleCellClick);
        });

        messageContainer.innerHTML = ''; 
        restartContainer.style.display = 'none'; 
        
        currentPlayer = '🧛';
    }
});




