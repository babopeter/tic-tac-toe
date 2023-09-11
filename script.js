// use a module or factory for everything
// if you need 1 (gameBoard, displayController) use a module
// if you need multiple (players) create them with factories

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
                    
                    console.info(gameboard);
                    checkWin();
                    playerSwitch();
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
        // check if any of the win combos are true
        // if true, end game
        // if false, continue
        if (winCombos.some(combo => {
            return combo.every(index => {
                return gameboard[index] === currentPlayer.marker;
            })
        })) {
            console.log(`${currentPlayer.name} wins!`);
        }
    }


    return {drawBoard, getBoard, placeMarker, checkWin};

})();



const Game = (function() {
    // game logic
    Gameboard.drawBoard();
    Gameboard.placeMarker();


    
})();