// Global Selectors
const options = document.querySelector('#options');
const choose = document.querySelector('#choose');
const board = document.querySelector('#board');
const buttons = document.querySelectorAll('.flx');

// Global variables
let turn;
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
            choose.style.display = 'none';
            board.style.display = 'flex';
        });
    });
}

function clearBoard() {
    buttons.forEach(btn => {
        const childTxt = btn.firstElementChild;
        childTxt.innerHTML = '';
    });

    move = 0;
}

function recordGame(trn) {
    trn === 'X' ? xWins++ : oWins++;

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) gBoard[i][j] = '';
    }

    clearBoard();
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
        clearBoard();
    }
}

buttons.forEach(btn => {
    btn.addEventListener('click', () => {
        const childTxt = btn.firstElementChild;

        const bi = btn.dataset.index[0];
        const bj = btn.dataset.index[1];
        
        if (childTxt.innerHTML === '') {
            childTxt.innerHTML = turn;
            gBoard[bi][bj] = turn;
            checkWin(gBoard, turn);
            turn = turn === 'X' ? 'O' : 'X';
        } else {
            alert('Choose another box dude!!!');
        }
        move++;
    });
});


// document.querySelector('.single').addEventListener('click', singlePlayer);
document.querySelector('.multi').addEventListener('click', multiPlayer);
// document.querySelector('.online').addEventListener('click', onlineGame);