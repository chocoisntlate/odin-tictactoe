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
        for (let j = 3; j >= 0; j--) {
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

    return { checkRow, checkColumn}
})()