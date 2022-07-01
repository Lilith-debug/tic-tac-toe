const game = (() => {

    //DOM cache
    const grid = Array.from(document.querySelectorAll(".board-cell"));

    //bind events
    for (let cell in grid) {
        console.log(cell);
        grid[cell].addEventListener("click", () => {
            runGame.playerPlay(cell);
        });
    }
    
    const gameBoard = (() => {
        let board = ["", "", "", "", "", "", "", "", ""];

        function addMove(cell) {
            if (board[cell] === "") {
                const currentMove = runGame.getTurn();
                board[cell] = currentMove;
            }
        }

        function finishGame() {
            //fill remaining cells to avoid more moves
            for (let cell in board) {
                if (board[cell] === "") {
                    board[cell] = " ";
                }
            }
        }

        function isGameFinished(player1, player2) {
            if (board[0] == "x" && board[1] == "x" && board[2] == "x" ||
                board[3] == "x" && board[4] == "x" && board[5] == "x" ||
                board[6] == "x" && board[7] == "x" && board[8] == "x" ||
                board[0] == "x" && board[3] == "x" && board[6] == "x" ||
                board[1] == "x" && board[4] == "x" && board[7] == "x" ||
                board[2] == "x" && board[5] == "x" && board[8] == "x" ||
                board[0] == "x" && board[4] == "x" && board[8] == "x" ||
                board[2] == "x" && board[4] == "x" && board[6] == "x") {
                console.log(`${player1} wins!`);
                finishGame();
            } else if (board[0] == "o" && board[1] == "o" && board[2] == "o" ||
                board[3] == "o" && board[4] == "o" && board[5] == "o" ||
                board[6] == "o" && board[7] == "o" && board[8] == "o" ||
                board[0] == "o" && board[3] == "o" && board[6] == "o" ||
                board[1] == "o" && board[4] == "o" && board[7] == "o" ||
                board[2] == "o" && board[5] == "o" && board[8] == "o" ||
                board[0] == "o" && board[4] == "o" && board[8] == "o" ||
                board[2] == "o" && board[4] == "o" && board[6] == "o") {
                console.log(`${player2} wins!`);
                finishGame();
            } else if (!board.includes("")) {
                console.log("It's a tie!");
            }
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

        return {addMove, isGameFinished, displayBoard}
    })();

    const createPlayer = (name, symbol) => {
        let playerName = name;
        let playerSymbol = symbol;
        return {playerName, playerSymbol}
    };

    const runGame = (() => {
        const player1 = createPlayer("john", "x");
        const player2 = createPlayer("jill", "o");
        let turn = player1;

        function getTurn() {
            return turn.playerSymbol;
        }

        function changeTurn() {
            turn == player1 ? turn = player2 : turn = player1;
        }

        function playerPlay(cell) {
            gameBoard.addMove(cell);
            gameBoard.displayBoard();
            gameBoard.isGameFinished();
            changeTurn();
        }

        return {playerPlay, getTurn}
    })();

    gameBoard.displayBoard();
})();

