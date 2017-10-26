// Global Selectors
const board = document.querySelector('#board');
const buttons = document.querySelectorAll('.flx');

let turn = 'X';
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