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
    
    return {setCell, resetBoard, printBoard};
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