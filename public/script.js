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
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
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
    AI = false;
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

function updateScores() {
    document.querySelector('.x-wins').innerHTML = xWins;
    document.querySelector('.o-wins').innerHTML = oWins;
    document.querySelector('.draws').innerHTML = draws;
}

function recordGame(trn) {
    if (trn === 'X') {
        xWins++;
        updateScores();
        gameStatus = false;
    } else {
        oWins++;
        updateScores();
        gameStatus = false;
    }
}

function checkWin(brd, trn) {
    // Row check
    for (let i = 0; i < 3; i++) {
        let count = 0;
        for (let j = 0; j < 3; j++) {
            if (brd[i][j] === trn) count++;
        }
        if (count === 3) {
            console.log(`${trn} wins!`);
            recordGame(trn);
            return;
        }
    }

    // Column check
    for (let i = 0; i < 3; i++) {
        let count = 0;
        for (let j = 0; j < 3; j++) {
            if (brd[j][i] === trn) count++;
        }
        if (count === 3) {
            console.log(`${trn} wins!`);
            recordGame(trn);
            return;
        }
    }

    // Diagonal check
    if (brd[0][0] === trn && brd[1][1] === trn && brd[2][2] === trn) {
        console.log(`${trn} wins!`);
        recordGame(trn);
        return;
    }
    if (brd[0][2] === trn && brd[1][1] === trn && brd[2][0] === trn) {
        console.log(`${trn} wins!`);
        recordGame(trn);
        return;
    }
    // Draw check
    if (move === 9) {
        console.log('Draw!');
        draws++;
        updateScores();
        gameStatus = false;
    }
}

function randomPlay() {
    let allow = true;
    do {
        const randI = Math.floor(Math.random() * 3);
        const randJ = Math.floor(Math.random() * 3);
        if (gBoard[randI][randJ] === '') {
            gBoard[randI][randJ] = AITurn;
            const btn = document.querySelector(`[data-index="${randI}${randJ}"]`);
            btn.firstElementChild.innerHTML = AITurn;
            move++;
            checkWin(gBoard, AITurn);
            allow = false;
        }
    } while (allow);
}

function tacticalPlay(brd, trn, opTrn) {
    console.log('TacTical');
    // Win (2 in row)
    for (let i = 0; i < 3; i++) {
        let count = 0;
        let putI, putJ;
        for (let j = 0; j < 3; j++) {
            if (brd[i][j] === trn) count++;
            else {
                putI = i;
                putJ = j;
            }
        }
        if (count === 2 && brd[putI][putJ] === '') {
            console.log(`Has Two: ROW ${putI}, ${putJ}`);
            gBoard[putI][putJ] = trn;
            const btn = document.querySelector(`[data-index="${putI}${putJ}"]`);
            btn.firstElementChild.innerHTML = AITurn;
            move++;
            return;
        }
    }
    // Win (2 in column)
    for (let i = 0; i < 3; i++) {
        let count = 0;
        let putI, putJ;
        for (let j = 0; j < 3; j++) {
            if (brd[j][i] === trn) count++;
            else {
                putI = i;
                putJ = j;
            }
        }
        if (count === 2 && brd[putJ][putI] === '') {
            console.log(`Has Two: COL ${putJ}, ${putI}`);
            gBoard[putJ][putI] = trn;
            const btn = document.querySelector(`[data-index="${putJ}${putI}"]`);
            btn.firstElementChild.innerHTML = AITurn;
            move++;
            return;
        }
    }
    // Win (2 in diagonal)
    if (brd[0][0] === trn && brd[1][1] === trn && brd[2][2] === '') {
        console.log(`Has Two: DIA ${2}, ${2}`);
        gBoard[2][2] = trn;
        const btn = document.querySelector(`[data-index="${2}${2}"]`);
        btn.firstElementChild.innerHTML = AITurn;
        move++;
        return;
    } else if (brd[1][1] === trn && brd[2][2] === trn && brd[0][0] === '') {
        console.log(`Has Two: DIA ${0}, ${0}`);
        gBoard[0][0] = trn;
        const btn = document.querySelector(`[data-index="${0}${0}"]`);
        btn.firstElementChild.innerHTML = AITurn;
        move++;
        return;
    } else if (brd[0][0] === trn && brd[2][2] === trn && brd[1][1] === '') {
        console.log(`Has Two: DIA ${1}, ${1}`);
        gBoard[1][1] = trn;
        const btn = document.querySelector(`[data-index="${1}${1}"]`);
        btn.firstElementChild.innerHTML = AITurn;
        move++;
        return;
    }

    if (brd[0][2] === trn && brd[1][1] === trn && brd[2][0] === '') {
        console.log(`Has Two: DIA ${2}, ${0}`);
        gBoard[2][0] = trn;
        const btn = document.querySelector(`[data-index="${2}${0}"]`);
        btn.firstElementChild.innerHTML = AITurn;
        move++;
        return;
    } else if (brd[1][1] === trn && brd[2][0] === trn && brd[0][2] === '') {
        console.log(`Has Two: DIA ${0}, ${2}`);
        gBoard[0][2] = trn;
        const btn = document.querySelector(`[data-index="${0}${2}"]`);
        btn.firstElementChild.innerHTML = AITurn;
        move++;
        return;
    } else if (brd[0][2] === trn && brd[2][0] === trn && brd[1][1] === '') {
        console.log(`Has Two: DIA ${1}, ${1}`);
        gBoard[1][1] = trn;
        const btn = document.querySelector(`[data-index="${1}${1}"]`);
        btn.firstElementChild.innerHTML = AITurn;
        move++;
        return;
    }

    // Block (2 in row opp)
    for (let i = 0; i < 3; i++) {
        let count = 0;
        let putI, putJ;
        for (let j = 0; j < 3; j++) {
            if (brd[i][j] === opTrn) count++;
            else {
                putI = i;
                putJ = j;
            }
        }
        if (count === 2 && brd[putI][putJ] === '') {
            console.log(`Block Two: ROW ${putI}, ${putJ}`);
            gBoard[putI][putJ] = trn;
            const btn = document.querySelector(`[data-index="${putI}${putJ}"]`);
            btn.firstElementChild.innerHTML = AITurn;
            move++;
            return;
        }
    }
    // Block (2 in column)
    for (let i = 0; i < 3; i++) {
        let count = 0;
        let putI, putJ;
        for (let j = 0; j < 3; j++) {
            if (brd[j][i] === opTrn) count++;
            else {
                putI = i;
                putJ = j;
            }
        }
        if (count === 2 && brd[putJ][putI] === '') {
            console.log(`Block Two: COL ${putJ}, ${putI}`);
            gBoard[putJ][putI] = trn;
            const btn = document.querySelector(`[data-index="${putJ}${putI}"]`);
            btn.firstElementChild.innerHTML = AITurn;
            move++;
            return;
        }
    }
    // Block (2 in diagonal)
    if (brd[0][0] === opTrn && brd[1][1] === opTrn && brd[2][2] === '') {
        console.log(`Block Two: DIA ${2}, ${2}`);
        gBoard[2][2] = trn;
        const btn = document.querySelector(`[data-index="${2}${2}"]`);
        btn.firstElementChild.innerHTML = AITurn;
        move++;
        return;
    } else if (brd[1][1] === opTrn && brd[2][2] === opTrn && brd[0][0] === '') {
        console.log(`Block Two: DIA ${0}, ${0}`);
        gBoard[0][0] = trn;
        const btn = document.querySelector(`[data-index="${0}${0}"]`);
        btn.firstElementChild.innerHTML = AITurn;
        move++;
        return;
    } else if (brd[0][0] === opTrn && brd[2][2] === opTrn && brd[1][1] === '') {
        console.log(`Block Two: DIA ${1}, ${1}`);
        gBoard[1][1] = trn;
        const btn = document.querySelector(`[data-index="${1}${1}"]`);
        btn.firstElementChild.innerHTML = AITurn;
        move++;
        return;
    }

    if (brd[0][2] === opTrn && brd[1][1] === opTrn && brd[2][0] === '') {
        console.log(`Block Two: DIA ${2}, ${0}`);
        gBoard[2][0] = trn;
        const btn = document.querySelector(`[data-index="${2}${0}"]`);
        btn.firstElementChild.innerHTML = AITurn;
        move++;
        return;
    } else if (brd[1][1] === opTrn && brd[2][0] === opTrn && brd[0][2] === '') {
        console.log(`Block Two: DIA ${0}, ${2}`);
        gBoard[0][2] = trn;
        const btn = document.querySelector(`[data-index="${0}${2}"]`);
        btn.firstElementChild.innerHTML = AITurn;
        move++;
        return;
    } else if (brd[0][2] === opTrn && brd[2][0] === opTrn && brd[1][1] === '') {
        console.log(`Block Two: DIA ${1}, ${1}`);
        gBoard[1][1] = trn;
        const btn = document.querySelector(`[data-index="${1}${1}"]`);
        btn.firstElementChild.innerHTML = AITurn;
        move++;
        return;
    }

    console.log('No Win/Block go for random :\\');
    randomPlay();
}

let lessStupid = true;

function AIMove() {
    if (!lessStupid) {
        randomPlay();
        checkWin(gBoard, AITurn);
    } else {
        if (move < 3) { // Bucause there's no pair
            randomPlay();
        } else {
            tacticalPlay(gBoard, AITurn, turn);
            checkWin(gBoard, AITurn);
        }
    }
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
                    if (move < 9 && gameStatus) AIMove();
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
    xWins = 0;
    oWins = 0;
    draws = 0;
    updateScores();
    board.style.display = 'none';
    choose.style.display = 'none';
    options.style.display = 'flex';
});

resetIcon.addEventListener('click', clearBoard);

document.querySelector('.single').addEventListener('click', singlePlayer);
document.querySelector('.multi').addEventListener('click', multiPlayer);