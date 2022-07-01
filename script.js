let gameBoard = (() => {
    let board = ["", "", "", "", "", "", "", "", ""];

    //DOM cache
    const grid = document.querySelectorAll(".board-cell");  

    function addMove(move) {
        board.push(move);
    }

    function displayBoard() {
        for (let cell in grid) {
            //create new elements with classes to allow styling
            if (board[cell] == "x") {
                const cellContent = document.createElement("div");
                cellContent.setAttribute("class", "x");
                cellContent.textContent = "X";
                grid[cell].appendChild(cellContent);
            } else if (board[cell] == "o"){
                const cellContent = document.createElement("div");
                cellContent.setAttribute("class", "o");
                cellContent.textContent = "O";
                grid[cell].appendChild(cellContent);
            }   
        }
    }

    return {displayBoard}
})();

const playerFactory = (name) => {

};

gameBoard.displayBoard();

