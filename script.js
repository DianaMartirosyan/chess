
let allChessSquare = [];

//make drawChessBoard function for drawing chessboard
function drawChessBoard() {
    const chessBoard = document.getElementById("chess-board");
    const boardSize = 8;
    //Draw row of chessboard
    for (let row = 0; row < boardSize; row++) {
        const chessRow = document.createElement("div");
        chessRow.classList.add("chess-row");

        //Draw column of chessboard
        for (let col = 0; col < boardSize; col++) {
            const chessSquare = document.createElement("div");
            chessSquare.classList.add("chess-square");
            chessSquare.setAttribute("col", col);
            chessSquare.setAttribute("row", row + 1);
            allChessSquare.push(chessSquare)
            if ((row + col) % 2 === 0) {
                chessSquare.classList.add("white-square");
            } else {
                chessSquare.classList.add("black-square");
            }
            chessSquare.addEventListener('click', getHorseSteps)
            chessRow.appendChild(chessSquare);
        }

        chessBoard.appendChild(chessRow);
    }
}


//Call getHorseSteps function when click on  chessSquare
function getHorseSteps(e) {
    //When click chessSquare the visualization of the previously clicked element will be deleted 
    allChessSquare.forEach(square => {
        const visiblePossition = square.querySelector('.visiblePossition');
        if (visiblePossition) {
            square.removeChild(visiblePossition);
        }
        const knightIcon = square.querySelector('.fa-chess-knight');
        if (knightIcon) {
            square.removeChild(knightIcon);
            square.removeAttribute('status');
        }
    });

    e.target.setAttribute('status', 'active')
    e.target.innerHTML = `<i style ="color: gray; font-size: 36px;" class="fa-solid fa-chess-knight"></i>`

    const moves = [];
    const row = Number(e.target.getAttribute("row"));
    const col = Number(e.target.getAttribute("col"));

    const potentialMoves = [
        [row + 2, col + 1],
        [row + 2, col - 1],
        [row - 2, col + 1],
        [row - 2, col - 1],
        [row + 1, col + 2],
        [row + 1, col - 2],
        [row - 1, col + 2],
        [row - 1, col - 2]
    ];

    for (let move of potentialMoves) {
        const [newRow, newCol] = move;
        if (newRow >= 1 && newRow <= 8 && newCol >= 0 && newCol <= 7) {
            const newSquare = String.fromCharCode(newCol + 97) + newRow;
            moves.push(newSquare);
        }

    }

    //Show visiblePossition
    for (let i = 0; i < moves.length; i++) {
        const row = parseInt(moves[i][1]);
        const col = moves[i].charCodeAt(0) - 97;
        let possiblePossition = allChessSquare.filter((div) => (div.getAttribute('row') == row) && div.getAttribute('col') == col)
        let visiblePossition = document.createElement('div')
        visiblePossition.setAttribute('class', 'visiblePossition')
        possiblePossition[0].appendChild(visiblePossition)
    }

}



drawChessBoard();


