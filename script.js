const gameBoard = ( () => {
    const drawBoard = () => {
        const boardContainer = document.createElement('div');
        section.innerHTML = '';
        boardContainer.classList.add('game-container');

        for(let i=0; i<9; i++) {
            const spot = document.createElement('div');
            spot.classList.add('spot');
            spot.id = 'spot' + i;
            boardContainer.appendChild(spot);
            spot.addEventListener('click', () => {
                game.move(spot.id.substr(4));
            });
        }

        section.appendChild(boardContainer);
    }
    const markSpot = (spot, mark) => {
        const selectedSpot = document.querySelector('#spot' + spot);
        selectedSpot.textContent = mark;
        selectedSpot.classList.remove('spot');
        selectedSpot.classList.add('spot-taken');
    };

    return {drawBoard, markSpot};
})();

const player = ( (name, mark) => {
    const playerName = name;
    const playerMark = mark;
});

const game = ( () => {
    let onMove = 'X';

    let board = [
        ['','',''],
        ['','',''],
        ['','','']
    ];

    let moveCounter = 0;

    const move = (spot) => {
        const row = Math.floor(spot/3);
        const column = spot % 3;
        if(board[row][column] == '') {
            moveCounter++;
            gameBoard.markSpot(spot, onMove);
            board[row][column] = onMove;
            checkForWinner();
            console.log(board);
            if(onMove == 'X') onMove = 'O';
            else onMove = 'X';
            
        }
    }

    const checkForWinner = () => {
        for(let i=0; i<3; i++) {
            if(board[i][0] == board[i][1] && board[i][0] == board[i][2] && board[i][0] != '') {
                return (alert(`${onMove} Won!`),restartGame());
            }
        }
        for(let i=0; i<3; i++) {
            if(board[0][i] == board[1][i] && board[0][i] == board[2][i] && board[0][i] != '') {
                return (alert(`${onMove} Won!`),restartGame());
            }
        }
        if(board[0][0] == board[1][1] && board[0][0] == board[2][2] && board[0][0] != '') {
            return (alert(`${onMove} Won!`),restartGame());
        }
        if(board[0][2] == board[1][1] && board[0][2] == board[2][0] && board[0][2] != '') {
            return (alert(`${onMove} Won!`),restartGame());
        }
        else {
            if(moveCounter == 9) return (alert(`Draw`),restartGame());
        }
        return;       
    };

    const restartGame = () => {
        board = [
            ['','',''],
            ['','',''],
            ['','','']
        ];
        onMove = 'O';
        gameBoard.drawBoard();
        moveCounter = 0;
    };

    return {checkForWinner, move};
})();

/*--------------------- DOM elements ----------------------------------*/

const section = document.querySelector('section');

const startGameButton = document.querySelector('.start-game');
startGameButton.addEventListener('click', () => {
    section.removeChild(startGameButton);
    gameBoard.drawBoard();
});