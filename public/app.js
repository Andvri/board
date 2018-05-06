var c = document.getElementById("board"),
    ctx = c.getContext("2d"),
    click = false,
    buttonClean = document.getElementById("clean");
ctx.moveTo(0, 0);
ctx.lineTo(200, 100);
ctx.stroke(); 

function clean () {
console.log('clean');
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}
function start (e) {
  ctx.beginPath();
  ctx.strokeStyle = "#fff#";
  ctx.lineCap = "round";
  ctx.lineWidth = 5;
  ctx.moveTo(e.x - c.offsetLeft, e.y - c.offsetTop);
}
function draw (e) {
  ctx.lineTo(e.x - c.offsetLeft, e.y - c.offsetTop);
  ctx.stroke();
}
function close (e) {
  ctx.closePath();
}
buttonClean.addEventListener("click", clean);
c.addEventListener('mousedown', function (e){
  click = true;
  let data = {
    x : e.clientX,
    y : e.clientY
  }
  console.log(e);
  start(data);
},false)
c.addEventListener('mousemove', function (e){
if(click)
{
  let data = {
    x : e.clientX,
    y : e.clientY
  }
  console.log(e);
  draw(data);
}  

},false)
window.addEventListener('mouseup', function (e){
click = false;
let data = {
  x : e.clientX,
  y : e.clientY
}
  console.log(e);
close(data);
},false)
