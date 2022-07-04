const game = (() => {

    //DOM cache
    const grid = Array.from(document.querySelectorAll(".board-cell"));
    const message = document.querySelector(".message");
    const restart = document.querySelector(".restart");
    const singlePlayer = document.querySelector(".single-player");
    const player1Input = document.querySelector(".player1 input");
    const player2Input = document.querySelector(".player2 input");

    //bind events
    for (let cell in grid) {
        console.log(cell);
        grid[cell].addEventListener("click", () => {
            runGame.playerPlay(cell);
        });
    }
    restart.addEventListener("click", () => {
        runGame.restartGame();
    })

    singlePlayer.addEventListener("click", () => {
        runGame.playSinglePlayer();
    });

    player1Input.addEventListener("keydown", (event) => {
        if (event.code == "Enter") {
            runGame.changePlayerName("player1", player1Input.value);
        }
    });

    player2Input.addEventListener("keydown", (event) => {
        if (event.code == "Enter") {
            runGame.changePlayerName("player2", player2Input.value);
        }
    });
    

    const createPlayer = (name, symbol) => {
        let playerName = name;
        let playerSymbol = symbol;
        return {playerName, playerSymbol}
    };

    const gameBoard = (() => {
        function displayBoard(board) {
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
        return {displayBoard}
    })();

    const runGame = (() => {
        const player1 = createPlayer("john", "x");
        const player2 = createPlayer("jill", "o");
        let startingPlayer = player1;
        let turn = player1;
        let singlePlayer = false;
        
        const board = ["", "", "", "", "", "", "", "", ""];

        function changePlayerName(player, name) {
            player == "player1" ? player1.playerName = name : player2.playerName = name;
        }

        function getBoardCopy() {
            let boardCopy = [];
            for (let cell in board) {
                boardCopy.push(board[cell]);
            }
            return boardCopy;
        }

        function getTurn() {
            return turn === player1 ? "player1" : "player 2"
        }

        function _changeTurn(currentTurn) {
            currentTurn == player1 ? turn = player2 : turn = player1;
            
        }

        function _addMove(cell) {
            if (board[cell] === "") {
                const currentMove = turn.playerSymbol;
                board[cell] = currentMove;
            }
        }
    
        function checkValidMove(move) {
            if (board[move] === "") {
                console.log("ok");
                return true;
            };
        }

        function playerPlay(cell) {
            _addMove(cell);
            gameBoard.displayBoard(board);
            _isGameFinished(player1.playerName, player2.playerName);
            _changeTurn(turn);
            if (turn == player2 && singlePlayer === true && _isGameFinished(player1.playerName, player2.playerName) === false) {
                computerPlayer.computerPlay();
            }
        }

        function _isGameFinished(player1, player2) {
            if (board[0] == "x" && board[1] == "x" && board[2] == "x" ||
                board[3] == "x" && board[4] == "x" && board[5] == "x" ||
                board[6] == "x" && board[7] == "x" && board[8] == "x" ||
                board[0] == "x" && board[3] == "x" && board[6] == "x" ||
                board[1] == "x" && board[4] == "x" && board[7] == "x" ||
                board[2] == "x" && board[5] == "x" && board[8] == "x" ||
                board[0] == "x" && board[4] == "x" && board[8] == "x" ||
                board[2] == "x" && board[4] == "x" && board[6] == "x") {
                message.textContent = `${player1} wins!`;
                _finishGame();
                return true;
            } else if (board[0] == "o" && board[1] == "o" && board[2] == "o" ||
                board[3] == "o" && board[4] == "o" && board[5] == "o" ||
                board[6] == "o" && board[7] == "o" && board[8] == "o" ||
                board[0] == "o" && board[3] == "o" && board[6] == "o" ||
                board[1] == "o" && board[4] == "o" && board[7] == "o" ||
                board[2] == "o" && board[5] == "o" && board[8] == "o" ||
                board[0] == "o" && board[4] == "o" && board[8] == "o" ||
                board[2] == "o" && board[4] == "o" && board[6] == "o") {
                message.textContent =`${player2} wins!`;
                _finishGame();
                return true;
            } else if (!board.includes("")) {
                message.textContent ="It's a tie!";
                return true;
            } else { return false; }
        }

        function _finishGame() {
                //fill remaining cells to avoid more moves
            for (let cell in board) {
                 if (board[cell] === "") {
                    board[cell] = " ";
                 }
            }
        }
    
        function restartGame() {
            //let a different player start each game
            _changeTurn(startingPlayer);
            startingPlayer = turn;

            message.textContent = "";

            for (let cell in board) {
                board[cell] = "";
            }
            for (let cell in grid) {
                grid[cell].textContent = "";
            }
            gameBoard.displayBoard(board);
            if (turn === player2 && singlePlayer === true) {
                computerPlayer.computerPlay();
            }
        }

        function playSinglePlayer() {
            singlePlayer = true;
            player2.playerName = "Computer";
            restartGame();
            const computerName = document.createElement("div");
            computerName.textContent = "Computer"
            player2Input.parentElement.appendChild(computerName);
            player2Input.remove();
        }

        return {changePlayerName, getBoardCopy, getTurn, checkValidMove,
                playerPlay, restartGame, playSinglePlayer}
    })();

    const computerPlayer = (() => {
        function computerPlay() {
            let i = true;
            while(i) {
                move = Math.round(Math.random()*8);
                console.log(move);
                if (runGame.checkValidMove(move)) {
                    runGame.playerPlay(move);
                    i = false;
                }
            }    
        }

        return {computerPlay}
    })();
})();

