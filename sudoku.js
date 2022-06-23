let numSelected = null;

let mistakes = 0;

let board = [
    '---26-7-1',
    '68--7--9-',
    '19---45--',
    '82-1---4-',
    '--46-29--',
    '-5---3-28',
    '--93---74',
    '-4--5--36',
    '7-3-18---'
]

let solution = [
    '435269781',
    '682571493',
    '197834562',
    '826195347',
    '374682915',
    '951743628',
    '519326874',
    '248957136',
    '763418259'
]
let minutes = 0
let seconds = 0
let isStopped = false;

timer = () => {
    if (!isStopped) {
        seconds++;
        if (seconds == 60) {
            seconds = 0;
            minutes++;
        }
        document.getElementById('minutes').textContent = returnData(minutes);
        document.getElementById('seconds').textContent = returnData(seconds);
    }
}

startTimer = () => {
    setInterval(() => { timer() }, 1000);
}

returnData = (input) => {
    return input >= 10 ? input : `0${input}`
}
stopTimer = () => {
    isStopped = true;
    document.getElementById('minutes').textContent = returnData(minutes);
    document.getElementById('seconds').textContent = returnData(seconds);
}

window.onload = function () {
    setNumbers();
    setBoard();
    startTimer();
};

function setNumbers() {
    for (let i = 1; i <= 9; i++) {
        let number = document.createElement('div');
        number.id = i;
        number.textContent = i;
        number.classList.add('number');
        document.getElementById('digits').appendChild(number);
        number.addEventListener('click', select);
    }

}

function setBoard() {
    
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            let tile = document.createElement('div');
            tile.style.borderColor = 'white';
            tile.id = i + '-' + j;

            if (i % 3 == 0 && i > 0) {
                tile.style.borderTop = 'black 1px solid';
            }
            if (j % 3 == 0 && j > 0) {
                tile.style.borderLeft = 'black 1px solid'
            }
            if (board[i][j] == '-') {
                tile.addEventListener('click', apply);
                tile.textContent = '';
            } else {
                tile.style.backgroundColor = '#D3D3D3';
                tile.textContent = board[i][j];
            }
            tile.classList.add('tile');
            document.getElementById('board').appendChild(tile);
        }
    }
    
}

function select(e) {
    document.querySelectorAll('.number').forEach(e => e.style.background = '#F5F5F5')
    numSelected = e.target.textContent;
    e.target.style.background = '#FFFF8F';
}


function apply(e) {
    let desiredPosition = e.target.getAttribute('id').split('-');
    let x = desiredPosition[0];
    let y = desiredPosition[1];

    if (solution[x][y] == numSelected) {
        e.target.textContent = numSelected;
    } else if (numSelected != null) {
        mistakes++;
        document.getElementById('mistakes').textContent = 'Mistakes: ' + mistakes;
    }

    winGame();
}

function winGame() {
    
    let cells = Array.from(document.getElementById('board').children);
    let boardElement = document.getElementById('board');
    if (cells.filter(c => c.textContent == '').length == 0) {
        boardElement.style.border = 'green 5px solid'
        let winElement = document.createElement('div');
        winElement.textContent = 'You win!'
        winElement.classList.add('win');
        document.querySelector('body').appendChild(winElement);
        stopTimer();
    }
}


