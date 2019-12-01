
const express = require('express');
const path = require('path');
const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;

// Setup static public folder
app.use(express.static(path.join(__dirname, 'public')));


io.on('connection', function(socket){
  io.emit("a user connected");
  socket.on('disconnect', function(){
    io.emit("a user disconnected");
  });
  socket.on('chat message', function(msg){
    if(msg.nickname){
      io.emit('chat message', msg);
    }
  });
});

http.listen(port,function(){
  console.log('listening on *:' + port);
});
