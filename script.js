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
        switch (value) {
            case "0":
                gameBoardArray[row][column].setEmpty;
                break;
            case "1":
                gameBoardArray[row][column].setCross;
                break;

            case "2":
                gameBoardArray[row][column].setCircle;
        }
    }

    const resetBoard = () => {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j<3; j++) {
                gameBoardArray[i][j].setEmpty

            }
        }
    }
    
    return {setCell, resetBoard};
})

function createCell(inputMarker) {
    let marker = inputMarker;

    const setEmpty = () => {
        marker = 0;
    }
    
    const setCross = () => {
        marker = 1;
    }
    
    const setCircle = () => {
        marker = 2
    }
    const getMarker = () => marker;

    return { getMarker, setCircle, setCross, setEmpty };
}