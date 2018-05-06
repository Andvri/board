var app = require('express')();
var express = require('express');
var http = require('http').Server(app);
var path = require('path');
var io = require('socket.io')(http);
var users = 0;

app.use(express.static(path.join(__dirname, 'public'))); 


app.get('/', function(req, res){
  res.sendFile('index.html');
});

io.on('connection', function(socket){
  socket.username = 'guest' + (users++);
  console.log('a user connected');
  console.log('socket.username: ' + socket.username);
  
  
  socket.on('disconnect', function(){
    console.log('user:' + socket.username + ' disconnected');
  });

  socket.on('clean', function (){
    console.log('user: ' + socket.username + ' clean board...');
    socket.broadcast.emit('clean',socket.username);
  });
  socket.on('start', function (e){
    console.log(socket.username + ' start draw...');
    e.username = socket.username;
    socket.broadcast.emit('start',e);
  })
  socket.on('draw', function (e){
    console.log(socket.username + '  drawing...');
    e.username = socket.username;
    socket.broadcast.emit('draw',e);
  })

  socket.on('close', function (e){
    console.log(socket.username + ' end draw...');
    e.username = socket.username;
    socket.broadcast.emit('close',e);
  })


});



http.listen(3000, function(){
  console.log('listening on *:3000');
});
    
