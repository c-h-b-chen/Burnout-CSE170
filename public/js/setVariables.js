
function setTime() {
    var input = document.getElementById("inputTime").value;
    var taskIn = document.getElementById("inputLog").value;
    console.log("message "+input+taskIn);
    sessionStorage.setItem("currentTask", taskIn);
    sessionStorage.setItem("currentTime", input);
    window.location.href='/breath';
}


function setTimeAlt() {
    var input = document.getElementById("inputTime").value;
    var taskIn = document.getElementById("inputLog").value;
    console.log("message "+input+taskIn);
    sessionStorage.setItem("currentTask", taskIn);
    sessionStorage.setItem("currentTime", input);
    window.location.href='/magnifyingglass';
}