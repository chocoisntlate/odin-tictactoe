const gameBoard = (function () {
    // Initialising the game board
    let gameBoardArray = new Array(3);
    for (let i = 0; i < 3; i++) {
        gameBoardArray[i] = new Array(3)
        for (let j = 0; j<3; j++) {
            gameBoardArray[i][j] = createCell("0")

        }
    }

    const setCell = (row, column, value) => {
        switch (value.toString()) {
            case "0":
                gameBoardArray[row][column].setEmpty();
                break;
            case "1":
                gameBoardArray[row][column].setCross();
                break;

            case "2":
                gameBoardArray[row][column].setCircle();
                break;
        }
    }

    const getCellMarker = (row, column) => {
        return gameBoardArray[row][column].getMarker();
    }

    const resetBoard = () => {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j<3; j++) {
                gameBoardArray[i][j].setEmpty()
            }
        }
    }

    const printBoard = () => {
        for (let i = 0; i < 3; i++) {
            let outputString = "";
            for (let j = 0; j<3; j++) {
                outputString += "[" + gameBoardArray[i][j].getMarker() + "]"
            }
            console.log(outputString);
        }
    }
    
    return {setCell, resetBoard, printBoard, getCellMarker};
})()

function createCell(inputMarker) {
    let marker = inputMarker;

    const setEmpty = () => {
        marker = "0";
    }
    
    const setCross = () => {
        marker = "1";
    }
    
    const setCircle = () => {
        marker = "2";
    }
    const getMarker = () => {
        return marker
    };

    return { getMarker, setCircle, setCross, setEmpty };
}

const gameLogic = (function () {
    const checkRow = () => {
        for (let i = 0; i < 3; i++) {
            let currentPlayerMarker = gameBoard.getCellMarker(i, 0)
            let j = 1;
            let count = 0;

            while (j < 3 && count != 2) {
                if (currentPlayerMarker === gameBoard.getCellMarker(i,j) && currentPlayerMarker != 0) {
                  count += 1;

                } else {
                    count = 0;
                }
                currentPlayerMarker = gameBoard.getCellMarker(i,j)
                j += 1;
            }

            if (count === 2) {
                return gameBoard.getCellMarker(i,j-1)
            } 
        }
        return 0;
    }

    const checkColumn = () => {
        for (let i = 0; i < 3; i++) {
            let currentPlayerMarker = gameBoard.getCellMarker(0, i)
            let j = 1;
            let count = 0;

            while (j < 3 && count != 2) {
                if (currentPlayerMarker === gameBoard.getCellMarker(j, i) && currentPlayerMarker != 0) {
                  count += 1;

                } else {
                    count = 0;
                }
                currentPlayerMarker = gameBoard.getCellMarker(j, i)
                j += 1;
            }

            if (count === 2) {
                return gameBoard.getCellMarker(j-1, i)
            } 
        }
        return 0;
    }

    const checkDiagonal = () => {
        // Left to right diagonals
        for (let j = 0; j < 3; j++) {
            let count = 0;
            let i = 0;
            let currentPlayerMarker = gameBoard.getCellMarker(i, j)
            i += 1
            j += 1

            while (i < 3 && j < 3 && count != 2) {
                if (currentPlayerMarker === gameBoard.getCellMarker(i, j) && currentPlayerMarker != 0) {
                  count += 1;
                } else {
                    count = 0;
                }
                currentPlayerMarker = gameBoard.getCellMarker(i, j)
                i += 1;
                j += 1;
            
                if (count === 2) {
                    return gameBoard.getCellMarker(i-1, j-1)
                }
            }
        }
        // Right to left diagonals
        for (let j = 2; j >= 0; j--) {
            let count = 0;
            let i = 0;
            let currentPlayerMarker = gameBoard.getCellMarker(i, j)
            i += 1
            j -= 1

            while (i < 3 && j >= 0 && count != 2) {
                if (currentPlayerMarker === gameBoard.getCellMarker(i, j) && currentPlayerMarker != 0) {
                  count += 1;
                } else {
                    count = 0;
                }
                currentPlayerMarker = gameBoard.getCellMarker(i, j)
                i += 1;
                j -= 1;
            
                if (count === 2) {
                    return gameBoard.getCellMarker(i-1, j+1)
                }
            }
        }
        return 0;
    }

    const checkNoMoreMoves = () => {
        const maximumMoves = 3*3;
        if (count === maximumMoves) {
            return true;
        }
        return false;
    }

    const checkEndGame = () => {
        results = new Array(3)
        results[0] = parseInt(checkRow())
        results[1] = parseInt(checkColumn())
        results[2] = parseInt(checkDiagonal())
        return Math.max(...results);
    }

    return {checkEndGame, checkNoMoreMoves}
})()

const display = (function () {

    const displaySymbol = (cellElement, player) => {
        cellElement.textContent = ""
        const imgElem = document.createElement("img");
        imgElem.setAttribute("class", "cell-icon")
        if (player === 1) {
            imgElem.src = "icons/circle-regular.svg"
        } else {
            imgElem.src = "icons/xmark-solid.svg"
        }
        cellElement.appendChild(imgElem)
    }

    const resetBoard = () => {
        for (let cell of board.children) {
            cell.textContent = ""
        }
    }

    return {displaySymbol, resetBoard}
})()

let count = 0;

const board = document.getElementById("board")
const displayElem = document.getElementById("display")

board.addEventListener("click", function(e) {
    const cellClicked = e.target

    // prevent playing after game ends
    if (board.getAttribute("data-end") === "1") {
        return
    }

    // Ensure click on cell instead of symbol, if symbol can't add there anyway.
    if (!cellClicked.classList.contains("cell")) {
        return;
    }


    const row = cellClicked.getAttribute("data-row")
    const col = cellClicked.getAttribute("data-col")

    // Ensure clicked on empty cell
    if (gameBoard.getCellMarker(row, col) === "0") {

        // Figuring out who's turn it is
        if (count % 2 === 0) {
            displayElem.textContent = player2name + "'s Turn" // switching display message

            console.log("Player 1's played")
            value = 1
        } else {
            displayElem.textContent = player1name + "'s Turn" // switching display message

            console.log("Player 2's played")
            value = 2
        }

        // Set and Display
        gameBoard.setCell(row, col, value)
        display.displaySymbol(cellClicked, value)
        count += 1

        // Checking for end game scenarios
        result = gameLogic.checkEndGame()
        draw = gameLogic.checkNoMoreMoves()
        if (result === 1 || result === 2) {
            // display winner
            if (result === 1) {
                displayElem.textContent = player1name + " Won!"

            } else {
                displayElem.textContent = player2name + " Won!"
            }
            board.setAttribute("data-end", "1")
            return;
        }
        if (draw) {
            displayElem.textContent = "Draw"
            board.setAttribute("data-end", "1")
            return;
        }
    }
})

const form = document.querySelector("form")

let player1name;
let player2name;
form.addEventListener("submit", function(e) {
    e.preventDefault()
    player1name = document.getElementById("player1").value
    player2name = document.getElementById("player2").value
    form.setAttribute("class", "hide")
    restartButton.setAttribute("class", "")
    board.setAttribute("class", "")
    displayElem.textContent = player1name +"'s Turn"
})

const restartButton = document.getElementById("restart-button")
restartButton.addEventListener("click", function(e) {
    gameBoard.resetBoard()
    display.resetBoard()
    count = 0;
    displayElem.textContent = player1name +"'s Turn"
    board.setAttribute("data-end", "0")
})