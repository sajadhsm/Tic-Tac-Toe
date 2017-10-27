// Global Selectors
const options = document.querySelector('#options');
const choose = document.querySelector('#choose');
const board = document.querySelector('#board');
const buttons = document.querySelectorAll('.flx');
const menuIcon = document.querySelector('.menu-box');
const resetIcon = document.querySelector('.reset-box');

// Global variables
let gameStatus = true;
let AI = false;
let turn;
let AITurn;
let move = 0;

let xWins = 0;
let oWins = 0;
let draws = 0;

const gBoard = [
    ['', '' ,''],
    ['', '' ,''],
    ['', '' ,'']
];

// Hide game board at game start
board.style.display = 'none';
choose.style.display = 'none';

function singlePlayer() {
    options.style.display = 'none';
    AI = true;
    chooseTurn();
}

function multiPlayer() {
    options.style.display = 'none';
    chooseTurn();

}

function chooseTurn() {
    choose.style.display = 'flex';
    const xo = document.querySelectorAll('.xo div');
    xo.forEach(div => {
        div.addEventListener('click', () => {
            turn = div.innerHTML;
            if (AI) {
                turn === 'X' ? AITurn = 'O' : AITurn = 'X';
            }
            choose.style.display = 'none';
            board.style.display = 'flex';
        });
    });
}

function clearBoard() {
    // Clear gBoard
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) gBoard[i][j] = '';
    }
    // Clear buttons marks
    buttons.forEach(btn => {
        const childTxt = btn.firstElementChild;
        childTxt.innerHTML = '';
    });
    // Reset Status
    move = 0;
    gameStatus = true;
}

function recordGame(trn) {
    if (trn === 'X') {
        xWins++;
        document.querySelector('.x-wins').innerHTML = xWins;
        gameStatus = false;
    } else {
        oWins++;
        document.querySelector('.o-wins').innerHTML = oWins;
        gameStatus = false;
    }
}

function checkWin(brd, trn) {
    // Row check
    for(let i = 0; i < 3; i++) {
        let count = 0;
        for(let j = 0; j < 3; j++) {
            if (brd[i][j] === trn) count++;
        }
        if (count === 3) {
            console.log(`${trn} wins!`);
            recordGame(trn);
            return;
        }
    }

    // Column check
    for(let i = 0; i < 3; i++) {
        let count = 0;
        for(let j = 0; j < 3; j++) {
            if (brd[j][i] === trn) count++;
        }
        if (count === 3) {
            console.log(`${trn} wins!`);
            recordGame(trn);
            return;
        }
    }

    // Diagonal check
    if (brd[0][0]===trn && brd[1][1]===trn && brd[2][2]===trn) {
        console.log(`${trn} wins!`);
        recordGame(trn);
        return;
    }
    if (brd[0][2]===trn && brd[1][1]===trn && brd[2][0]===trn) {
        console.log(`${trn} wins!`);
        recordGame(trn);
        return;
    }

    if (move === 9) {
        console.log('Draw!');
        draws++;
        document.querySelector('.draws').innerHTML = draws;
        gameStatus = false;
    }
}

function AIMove() {
    let allow = true;
    do {
        const randI = Math.floor(Math.random() * 3);
        const randJ = Math.floor(Math.random() * 3);
        if (gBoard[randI][randJ] === '') {
            gBoard[randI][randJ] = AITurn;
            document.querySelector(`[data-index="${randI}${randJ}"]`).firstElementChild.innerHTML = AITurn;
            move++;
            checkWin(gBoard, AITurn);
            allow = false;
        }
    } while (allow);
}

buttons.forEach(btn => {
    btn.addEventListener('click', () => {
        if (gameStatus) {
            const childTxt = btn.firstElementChild;
            
            const bi = btn.dataset.index[0];
            const bj = btn.dataset.index[1];
            
            if (childTxt.innerHTML === '') {
                if (AI) {
                    childTxt.innerHTML = turn;
                    gBoard[bi][bj] = turn;
                    move++;
                    checkWin(gBoard, turn);
                    if (move < 9) AIMove();
                } else {
                    childTxt.innerHTML = turn;
                    gBoard[bi][bj] = turn;
                    move++;
                    checkWin(gBoard, turn);
                    turn = turn === 'X' ? 'O' : 'X';
                }
            } else {
                alert('Choose another box dude!!!');
            }
        }
    });
});

menuIcon.addEventListener('click', () => {
    clearBoard();
    board.style.display = 'none';
    choose.style.display = 'none';
    options.style.display = 'flex';
});

resetIcon.addEventListener('click', clearBoard);

document.querySelector('.single').addEventListener('click', singlePlayer);
document.querySelector('.multi').addEventListener('click', multiPlayer);
