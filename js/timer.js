window.gameTimeoutt = false;
window.timer = function (seconds) {
    var x = setInterval(function () {
        document.getElementById("timer").innerText = seconds;
        if(seconds < 0){
        clearInterval(x);
        document.getElementById("timer").innerText = "EXPIRED";
        this.gameTimeoutt = !gameTimeoutt;
    }
    seconds--;
    },1000)
}