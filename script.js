const gameBoard = (function () {
    // Initialising the game board
    let gameBoardArray = new Array(3);
    for (let i = 0; i < 3; i++) {
        gameBoardArray[i] = new Array(3)
        for (let j = 0; j<3; j++) {
            gameBoardArray[i][j] = createCell(0)

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
        return "0";
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
        return "0";
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
        return "0";
    }

    const checkNoMoreMoves = () => {
        const maximumMoves = 3*3;
        if (count === maximumMoves) {
            return 3;
        }
        return 0;
    }

    const checkEndGame = () => {
        results = new Array(4)
        results[0] = checkRow()
        results[1] = checkColumn()
        results[2] = checkDiagonal()
        results[3] = checkNoMoreMoves()
        
        return Math.max.apply(null, results);
    }

    return {checkEndGame}
})()

let play = true;
let count = 0;
gameBoard.printBoard()
while (play===true) {
    // someone plays
    let value;
    if (count % 2 === 0) {
        console.log("Player 1's turn")
        value = 1
    } else {
        console.log("Player 2's turn")
        value = 2
    }

    let inputRow = prompt("Enter row:")
    let inputColumn = prompt("Enter column:")

    gameBoard.setCell(inputRow, inputColumn, value)
    count += 1

    gameBoard.printBoard()

    // checking state after play
    result = gameLogic.checkEndGame()
    if (result === 3) {
        // display draw
        gameBoard.resetBoard()
        count = 0;
        play = false
    }
    if (result === 1 || result === 2) {
        // display winner
        gameBoard.resetBoard()
        count = 0;
        // temp
        play = false;
    }
}


gameBoard.setCell(0,2,1)
gameBoard.setCell(1,1,1)
gameBoard.setCell(2,0,1)