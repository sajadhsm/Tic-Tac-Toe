// Global Selectors
const options = document.querySelector('#options');
const choose = document.querySelector('#choose');
const board = document.querySelector('#board');
const buttons = document.querySelectorAll('.flx');

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


let turn;
let total = 0;

buttons.forEach(btn => {
    btn.addEventListener('click', () => {
        const childTxt = btn.firstElementChild;
        
        if (childTxt.innerHTML === '') {
            childTxt.innerHTML = turn;
            turn = turn === 'X' ? 'O' : 'X';
        } else {
            alert('Choose another box dude!!!');
        }
        totalCheck(buttons);
    });
});

function totalCheck(btns) {
    if (total === btns.length) {
        btns.forEach(b => (
            b.firstElementChild.innerHTML = ''
        ));
        total = 0;
    } else total++;
}


// document.querySelector('.single').addEventListener('click', singlePlayer);
document.querySelector('.multi').addEventListener('click', multiPlayer);
// document.querySelector('.online').addEventListener('click', onlineGame);