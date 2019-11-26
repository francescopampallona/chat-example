$(function () {
  var nickname;
  
    $('#chat').css("display", "none");
    $('#nickname').select();
    $('#loginform').submit(function(e){
      e.preventDefault();
      nickname=$('#nickname').val();
      checkNickname();
      return false;
    });
  function checkNickname(){
    if(nickname!="" && nickname.length>2){
      chatManagment();
    }

  }
  
  function chatManagment(){
    if(nickname){
    $('#login').css("display", "none");
    $('#chat').css("display", "block");
    $('#m').select();
    var socket = io();
    $('#chatform').submit(function(){
      msg ={
        nickname: nickname,
        testo: $('#m').val()
      }
      if(msg.testo!="") socket.emit('chat message', msg);
      $('#m').val('');
      return false;
    });
  
    socket.on('chat message', function(msg){
      message(msg);
    });
    socket.on('a user connected', function(){
      message("a user connected")
    });
    socket.on('a user disconnected', function(){
      message("a user disconnected")
    });
  }
  }
  
  

  function message(msg){
    if(msg.nickname){
      if (msg.nickname!==nickname){
        $('#messages').append($('<li style="border: 2px solid black">').text(`${msg.nickname}: ${msg.testo}`));
      }
      else{
        $('#messages').append($('<li style="border: 2px solid black; background: cyan;">').text(`${msg.nickname}: ${msg.testo}`));

      }
     
    }
    else{
      $('#messages').append($('<li>').text(msg));
    }


    $('#messages').scrollTop($('#messages').prop('scrollHeight'));
  }
});