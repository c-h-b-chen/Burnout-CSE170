//Timer
var timeChoice = 30; // jquery to get read time input read data from ID example (time) click listener runs a function. dont need to be inside jason file

function setTime() {
    var input = document.getElementById("inputTime").value;
    var taskIn = document.getElementById("inputLog").value;
    console.log("message "+input+taskIn);
    sessionStorage.setItem("currentTask", taskIn);
    sessionStorage.setItem("current", input);
    window.location.href='/breath';
}

function startTimer(duration, display) {
    var timer = duration, minutes, seconds;
    setInterval(function () {
        minutes = parseInt(timer / 60, 10)
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (--timer < 0) {
            window.location.href="/";
        }
    }, 1000);
}

window.onload = function () {
    //var timeChoice = document.getElementById("")
    var fiveMinutes = 60 * timeChoice,
        display = document.querySelector('#time');
    startTimer(fiveMinutes, display);
};
