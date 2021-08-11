const inputContainer = document.getElementById('input-container');
const countdownForm = document.getElementById('countdownForm');
const dateElem = document.getElementById('date-picker');

const countdownElem = document.getElementById('countdown');
const countdownElemTitle = document.getElementById('countdown-title');
const countdownBtn = document.getElementById('countdown-button');
const timeElems = document.querySelectorAll('span');

const completeElem = document.getElementById('complete');
const completeBtn = document.getElementById('complete-button');
const completeInfo = document.getElementById('complete-info');


let countdownTitle = '';
let countdownDate = '';
// Set countdownValue in ms
let countdownValue = Date;
let countdownActive;

let saveCountdown;

const today = new Date().toISOString().split('T', 2)[0];
const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;

// Set Date Input Minimum with Today's Date
function setDate() {
    dateElem.value = today;
    dateElem.setAttribute('min', today);
}

// updateDOM
function updateDOM() {
    countdownActive = setInterval(() => {
        const now = new Date().getTime();
        const remain = countdownValue - now;

        remain > 0 ? showCountdownElem(remain) : showCompleteElem();
    }, second);
}

// Show Countdown Elem
function showCountdownElem(remain) {
    inputContainer.hidden = true;
    completeElem.hidden = true;
    countdownElem.hidden = false;

    const days = Math.floor(remain / day);
    const hours = Math.floor((remain % day) / hour);
    const minutes = Math.floor((remain % hour) / minute);
    const seconds = Math.floor((remain % minute) / second);

    timeElems[0].textContent = days;
    timeElems[1].textContent = hours;
    timeElems[2].textContent = minutes;
    timeElems[3].textContent = seconds;
    countdownElemTitle.textContent = countdownTitle;
}

// Show Complete Elem
function showCompleteElem() {
    clearInterval(countdownActive);
    inputContainer.hidden = true;
    completeElem.hidden = false;
    countdownElem.hidden = true;

    const cdInfo = countdownDate.split('-', 3);

    completeInfo.textContent = `${countdownTitle} finished on ${cdInfo[2]}-${cdInfo[1]}-${cdInfo[0]}`;
}

// Show Create Countdown Elem aka reset countdown
function resetCountdown() {
    clearInterval(countdownActive);
    inputContainer.hidden = false;
    completeElem.hidden = true;
    countdownElem.hidden = true;
    countdownForm.reset();
    localStorage.removeItem('countdown');
    setDate();
}

// Get Values from Input
function createCountdown(e) {
    e.preventDefault();
    let titleStr = e.srcElement[0].value;
    let dateStr = e.srcElement[1].value;
    countdownDate = dateStr === '' ? today : dateStr;
    countdownTitle = titleStr === '' ? 'Your countdown' : titleStr;

    saveCountdown = {
        title: countdownTitle,
        date: countdownDate
    };
    localStorage.setItem('countdown', JSON.stringify(saveCountdown));

    // Get number version of current Date and update DOM.
    countdownValue = new Date(countdownDate).getTime();
    updateDOM();
}

// restore Previous Countdown from Local storage
function restorePreviousCountdown(){
    if(localStorage.getItem('countdown')){
        inputContainer.hidden = true;
        saveCountdown = JSON.parse(localStorage.getItem('countdown'));
        countdownTitle = saveCountdown.title;
        countdownDate = saveCountdown.date;
        countdownValue = new Date(countdownDate).getTime();
        updateDOM();    
    }
}

// Event Listeners
countdownForm.addEventListener('submit', createCountdown);
countdownBtn.addEventListener('click', resetCountdown);
completeBtn.addEventListener('click', resetCountdown);


// Onload
function Onload(){
    setDate();
    restorePreviousCountdown();
}

Onload();