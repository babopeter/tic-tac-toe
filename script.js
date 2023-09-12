// player factory
const Player = (name, marker) => {
    return {name, marker};
};

// gameboard module
const Gameboard = (() =>{
    let gameboard = new Array(9);
    let player1 = Player('Player 1', 'X');
    let player2 = Player('Player 2', 'O');
    let currentPlayer = player1;
    let gameOver = false;
    const winner = document.querySelector('.announce-winner-text');
    const winCombos = [
        [0,1,2], [3,4,5], [6,7,8], // horizontal
        [0,3,6], [1,4,7], [2,5,8], // vertical
        [0,4,8], [2,4,6] // diagonal
    ];

    const drawBoard = () => {
        // create a div for each square
        for (let i = 0; i < gameboard.length; i++) {
            const square = document.createElement('div');
            square.classList.add('square');
            square.setAttribute('id', i);
            document.querySelector('.gameboard').appendChild(square);
        }
    }
    
    const getBoard = () => gameboard;

    const placeMarker = () =>{
        const squares = document.querySelectorAll('.square');
        squares.forEach(square => {
            square.addEventListener('click', function() {
                if (square.textContent === '') {
                    square.textContent = currentPlayer.marker;
                    gameboard[square.id] = currentPlayer.marker;
                    checkWin();
                    playerSwitch();
                    if (gameOver) {
                        setTimeout(resetBoard, 2000);
                    }
                }
            })
        })
    }

    const playerSwitch = () => {
        if (currentPlayer === player1) {
            currentPlayer = player2;
        } else {
            currentPlayer = player1;
        }
    }

    const checkWin = () => {
        if (winCombos.some(combo => {
            return combo.every(index => {
                return gameboard[index] === currentPlayer.marker;
            })
        })) {
            gameOver = true;
            winner.textContent = `${currentPlayer.name} wins!`;
        } else if (!gameboard.includes(undefined)) {
            gameOver = true;
            winner.textContent = 'Tie game!';
        }

    }

    const resetBoard = () => {
        gameboard = new Array(9);
        currentPlayer = player1;
        gameOver = false;
        document.querySelectorAll('.square').forEach(square => {
            square.textContent = '';
        });
        winner.textContent = '';
    }
    return {drawBoard, getBoard, placeMarker, checkWin, resetBoard};

})();



const Game = (function() {
    const showForm = document.getElementById('show-form');
    const playerDialog = document.getElementById('player-dialog');
    const startGame = document.getElementById('start-game');
    const player1 = document.getElementById('player1');
    const player2 = document.getElementById('player2');
    const player1Name = document.getElementById('player1-name');
    const player2Name = document.getElementById('player2-name');

    Gameboard.drawBoard();
    Gameboard.placeMarker();

    showForm.addEventListener('click', function() {
        playerDialog.showModal();
    });

    startGame.addEventListener('click', (event) => {
        playerDialog.close();
        event.preventDefault();
        player1Name.textContent = player1.value;
        player2Name.textContent = player2.value;
    });
})();