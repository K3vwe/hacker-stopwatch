"use strict"
// Get all buttons
let startBtn = document.querySelector('#start');
let pauseBtn = document.querySelector('#pause');
let resetBtn = document.querySelector('#reset');
let screen = document.querySelector('#screen');
let timer, currentTime, pauseSec, continueTime, timer2;
var startState = false, resetState = false, pauseState = false, resumeState = false;


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
    screen.innerHTML = `${hour}:${minute}:${second}`
}

// Start listener to start the stop watch
startBtn.addEventListener('click', function(){
    startState = true;
    startBtn.setAttribute('disabled', 'disabled');

    // Get current time in ms;
    var startTime = Date.now();

    // Tag the time generator "timer"
    timer = setInterval( ()=> {
        currentTime = Date.now() - startTime;
        setTime(currentTime/1000);
    }, 1000);
});

// pause button listener to pause and resume the stopwatch counter

// Add a pause btn feature to stop the current counter
let pause = true;       // Pause status flag
pauseBtn.addEventListener('click', function(){
    if(!startState){
        setTime(0);
    } else {
        if(!pause){  // When pause is clicked at second state
            // Continue stopwatch timer from where it left off
            var resumeTime = Date.now();
            // Get in ms not in sec;
            timer2 = setInterval( ()=> {
                continueTime = Date.now() - resumeTime;
                setTime( (continueTime/1000) + pauseSec);
            } ,1000)
            pauseBtn.textContent = "Pause";
    
        } else {    // When pause is clicked at first state
            pauseBtn.textContent = "Resume";
            pauseSec = currentTime/1000;    // Time in Sec timer was paused
            clearInterval(timer);
            clearInterval(timer2);
            // console.log(pauseSec);
        }
        pause = !pause;
    }
    
});

// Reset stopwatch timer
resetBtn.addEventListener('click', function(){
    startState = false;
    clearInterval(timer);
    clearInterval(timer2);
    pauseBtn.textContent = "Pause";
    startBtn.removeAttribute('disabled');
    setTime(0);
});