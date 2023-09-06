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
})();


// player factory
const player = (name, marker) => {
    return {name, marker};
};

drawBoard();