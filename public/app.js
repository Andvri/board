var c = document.getElementById("board"),
    ctx = c.getContext("2d"),
    click = false,
    buttonClean = document.getElementById("clean");


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
buttonClean.addEventListener("click",function(){
  clean();
  socket.emit('clean');
}  
);
c.addEventListener('mousedown', function (e){
  click = true;
  let data = {
    x : e.clientX,
    y : e.clientY
  }
  socket.emit('start',data);
 
  start(data);
},false)
c.addEventListener('mousemove', function (e){
if(click)
{
  let data = {
    x : e.clientX,
    y : e.clientY
  }
  
  socket.emit('draw',data);
  draw(data);
}  

},false)
window.addEventListener('mouseup', function (e){
click = false;
let data = {
  x : e.clientX,
  y : e.clientY
}
socket.emit('close',data);
close(data);
},false)

socket.on('start', function(e){
  console.log(e);
  start(e);
})


socket.on('draw', function(e){
  console.log(e);
  draw(e);
})


socket.on('close', function(e){
  console.log(e);
  close(e);
})


socket.on('clean', function (e){
  console.log('user: ' + e);
  clean();
})
