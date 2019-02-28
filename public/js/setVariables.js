
function setTime() {
    var input = document.getElementById("inputTime").value;
    var taskIn = document.getElementById("inputLog").value;
    console.log("message "+input+taskIn);
    sessionStorage.setItem("currentTask", taskIn);
    sessionStorage.setItem("current", input);
    window.location.href='/breath';
}
