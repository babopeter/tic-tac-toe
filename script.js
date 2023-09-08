// use a module or factory for everything
// if you need 1 (gameBoard, displayController) use a module
// if you need multiple (players) create them with factories

// player factory
const Player = (name, marker) => {
    return {name, marker};
};

// gameboard module

const Gameboard = (function () {
    let gameboard = new Array(9);
    let player1 = Player('Player 1', 'X');
    let player2 = Player('Player 2', 'O');
    let currentPlayer = player1;

    drawBoard = function() {
        // create a div for each square
        for (let i = 0; i < gameboard.length; i++) {
            const square = document.createElement('div');
            square.classList.add('square');
            square.setAttribute('id', i);
            document.querySelector('.gameboard').appendChild(square);
        }
    }

    placeMarker = function() {
        const squares = document.querySelectorAll('.square');
        squares.forEach(square => {
            square.addEventListener('click', function() {
                if (square.textContent === '') {
                    square.textContent = currentPlayer.marker;
                    gameboard[square.id] = currentPlayer.marker;
                    
                    console.info(gameboard);

                    playerSwitch();
                }
            })
        })
    }

    playerSwitch = function() {
        if (currentPlayer === player1) {
            currentPlayer = player2;
        } else {
            currentPlayer = player1;
        }
    }
})();



const Game = (function() {
    // game logic
    
})();


drawBoard();
placeMarker();