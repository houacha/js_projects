document.getElementById("field").innerHTML = "X";
document.getElementById("field").setAttribute("onclick", "move()");
function move() {
    document.getElementById("field").style.float = "left";
}