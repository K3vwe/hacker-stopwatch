// Get all buttons
let startBtn = document.querySelector('#start');
let pauseBtn = document.querySelector('#pause');
let resetBtn = document.querySelector('#reset');
let screen = document.querySelector('#screen');
let timer;

// Function to make sure the value is 2-Digits
function pad(val){
    if(val<10){
        return '0' + val;
    }
    return val;
}

// Function to calculate and output the stopwatch timer to the DOM
function setTime(value){
    let hour = pad(Math.floor(value/3600));
    let minute = pad(Math.floor((value%3600)/60));
    let second = pad(Math.floor((value%3600)%60));
    screen.innerHTML = `${hour} : ${minute} : ${second}`
}

// Start listener to start the stop watch
startBtn.addEventListener('click', function(){
    startBtn.setAttribute('disabled', 'disabled');

    // Get current time in ms;
    startTime = Date.now();

    // Tag the time generator "timer"
    timer = setInterval( ()=> {
        let currentTime = Date.now() - startTime;
        setTime(currentTime/1000);
    }, 1000)
});

// pause button listener to pause and resume counter

// Reset stopwatch timer
resetBtn.addEventListener('click', function(){
    clearInterval(timer);
    startBtn.removeAttribute('disabled');
    setTime(0);
});