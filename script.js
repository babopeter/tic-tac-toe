// use a module or factory for everything
// if you need 1 (gameBoard, displayController) use a module
// if you need multiple (players) create them with factories


// gameboard module

const gameBoard = (function () {
    let _board = new Array(9);

    drawBoard = function() {
        // create a div for each square
        for (let i = 0; i < _board.length; i++) {
            const square = document.createElement('div');
            square.classList.add('square');
            square.setAttribute('id', i);
            document.querySelector('.gameboard').appendChild(square);
        }
    }

    // create a function that adds an X to the squares on mouseclick
    addX = function() {
        const squares = document.querySelectorAll('.square');
        squares.forEach(square => {
            square.addEventListener('click', function() {
                square.textContent = 'X';
            })
        })
    }

    addO = function() {
        const squares = document.querySelectorAll('.square');
        squares.forEach(square => {
            square.addEventListener('click', function() {
                square.textContent = 'O';
            })
        })
    }
    
})();


// player factory
const player = (name, marker) => {
    return {name, marker};
};

const game = (function() {
    let _player1 = player('Player 1', 'X');
    let _player2 = player('Player 2', 'O');
    let _currentPlayer = _player1;
    playerTurn = function() {
        const squares = document.querySelectorAll('.square');
        squares.forEach(square => {
            square.addEventListener('click', function() {
                if (square.textContent === '') {
                    square.textContent = _currentPlayer.marker;
                    playerSwitch();
                }
            })
        })
    }

    playerSwitch = function() {
        if (_currentPlayer === _player1) {
            _currentPlayer = _player2;
        } else {
            _currentPlayer = _player1;
        }
    }
})();

drawBoard();
playerTurn();