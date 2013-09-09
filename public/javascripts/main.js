$(function() {

  var socket = io.connect();

  // Display number of players
  socket.on('numberOfPlayers', function(data) {
    if(data.hasOwnProperty('number')) {
      if(data.number == 0)
        $('#numberOfPlayers').text("Nobody is currently playing"); 
      else if(data.number == 1)
        $('#numberOfPlayers').text("There is one player currently playing");
      else
        $('#numberOfPlayers').text("There are " + data.number + " players currently playing");
    }
  });

  // "Join the game" button behaviour
  $('#joinGame').on('click', function() {
    // Check if the name is written
    if($('#name').val().length > 2) {
      socket.emit(
        'newPlayer', 
        {name: $('#name').val()}
      );
    } else {
      console.log('The user name is incorrect');
    }
    return false;
  });

  // Response from the Node.js server
  socket.on('confirmPlayer', function(data) {
    if(data.hasOwnProperty('name')) {
      console.log('Server: welcome ' + data.name);
      $('form').hide();
    }
  });
});
