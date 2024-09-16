
document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.cell');
    const messageDiv = document.getElementById('message');
    const restartButton = document.getElementById('restart');

    let currentPlayer = 'X';
    let board = ['', '', '', '', '', '', '', '', ''];
    let isGameOver = false;

    const winPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    function checkWin() {
        for (const pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                return board[a];
            }
        }
        return board.includes('') ? null : 'Tie';
    }

    function handleClick(event) {
        if (isGameOver) return;

        const cell = event.target;
        const index = cell.dataset.index;

        if (board[index] !== '') return;

        board[index] = currentPlayer;
        cell.textContent = currentPlayer;

        const winner = checkWin();
        if (winner) {
            isGameOver = true;
            messageDiv.textContent = winner === 'Tie' ? 'It\'s a Tie!' : `${winner} Wins!`;
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    }

    function restartGame() {
        board = ['', '', '', '', '', '', '', '', ''];
        isGameOver = false;
        currentPlayer = 'X';
        messageDiv.textContent = '';
        cells.forEach(cell => cell.textContent = '');
    }

    cells.forEach(cell => cell.addEventListener('click', handleClick));
    restartButton.addEventListener('click', restartGame);
});
