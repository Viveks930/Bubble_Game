const pbtm = document.querySelector('.game');
const hit = document.querySelector('#hit');
const timerbox = document.querySelector('#timer');
const scorebox = document.querySelector('#score');
const restart = document.querySelector('#restart');
const startpage = document.querySelector('.startpage');
const startbtn = document.querySelector('#start');
const lastpage = document.querySelector('.lastpage');

let score = 0;
let time = 30;
let interval;

startbtn.addEventListener('click', start);
restart.addEventListener('click', () => location.reload());

function start() {
    startpage.style.display = 'none';
    getnewhit();
    makeBubble();
    timer();
}

function makeBubble() {
    let counter = '';
    for (let i = 1; i <= 96; i++) {
        const rn = Math.floor(Math.random() * 10);
        counter += `<div id="bubble">${rn}</div>`;
    }
    pbtm.innerHTML = counter;
}

function timer() {
    interval = setInterval(() => {
        if (time > 0) {
            timerbox.textContent = --time;
        } else {
            clearInterval(interval);
            endGame();
        }
    }, 1000);
}

function endGame() {
    pbtm.style.display = 'none';
    lastpage.style.display = 'flex';
}

function getnewhit() {
    const random = Math.floor(Math.random() * 10);
    hit.textContent = random;
}

function getnewscore() {
    score += 10;
    scorebox.textContent = score;
}

function reduceScore() {
    score = Math.max(0, score - 5);
    scorebox.textContent = score;
}

function wrong(e) {
    if (e.target.id === 'bubble') {
        if (e.target.textContent === hit.textContent) {
            getnewscore();
            getnewhit();
            makeBubble();
        } else {
            e.target.style.backgroundColor = 'red';
            reduceScore();
        }
    }
}

pbtm.addEventListener('click', wrong);
