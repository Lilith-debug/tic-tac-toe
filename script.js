const gameBoard = (() => {
    let board = ["", "", "", "", "", "", "", "", ""];

    //DOM cache
    const grid = Array.from(document.querySelectorAll(".board-cell"));

    //bind events
    for (let cell in grid) {
        console.log(cell);
        grid[cell].addEventListener("click", () => {
            addMove(cell);
            displayBoard();
        });
    }

    function addMove(cellNumber) {
        const currentMove = playGame.getTurn();
        board[cellNumber] = currentMove;
    }

    function displayBoard() {
        for (let cell in grid) {
            //add classes classes to allow styling
            if (board[cell] == "x") {
                grid[cell].classList.add("x");
                grid[cell].textContent = "X";
            } else if (board[cell] == "o"){
                grid[cell].classList.add("o");
                grid[cell].textContent = "O";
            }   
        }
    }

    return {addMove, displayBoard}
})();

const createPlayer = (name, symbol) => {
    let playerName = name;
    let playerSymbol = symbol;
    return {playerName, playerSymbol}
};

const playGame = (() => {
    const player1 = createPlayer("john", "x");
    const player2 = createPlayer("jill", "o");
    let turn = player1;


    function getTurn() {
        return turn.playerSymbol;
    }
    

    return {getTurn}
})();

gameBoard.displayBoard();


