/**
 * Module dependencies.
 */

var express = require('express')
  , $       = require('jquery')
  , routes  = require('./routes')
  , user    = require('./routes/user')
  , app     = express()
  , http    = require('http').createServer(app)
  , io      = require('socket.io').listen(http)
  , path    = require('path');

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);
app.get('/users', user.list);

http.listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});

var players = [];
var maximumNumberOfPlayers = 2;

io.sockets.on('connection', function (socket) {
  // Check if there is enough place in the current game for a new player
  if(checkNumberOfPlayers()) {
    socket.emit('info', {info: 'waiting player'});

    socket.on('newPlayer', function (data) {
      if(data.hasOwnProperty("name")) {
        var player = createNewPlayer(socket, data.name);
        
        // Send an ACK to the client
        socket.emit('confirmPlayer', {name: player.name}); 

        // Check if we're ready to play
        if(!checkNumberOfPlayers()) {
          var playersName = [];
          $.each(players, function(index, value) {
            playersName.push(value.name);
          });
          informPlayers('info', 
            {'info':   'ready to play',
             'players': playersName}
          );
        }
        
        socket.on('disconnect', function () {
          players = $.grep(players, function(row) {
            return row != player;
          });
          console.log('Player nb: ' + players.length);
        });
      }
    });

  } else {
    socket.emit('info', {info: 'game full'});
  }
});

function createNewPlayer(socket, name) {
  var player = new Object();
  player.socket = socket;
  player.name = name;
  player.emit = function(dataName, data) {
    player.socket.emit(dataName, data);
  };
  players.push(player);
  return player;
}

function checkNumberOfPlayers() {
  if(players.length < maximumNumberOfPlayers) {
    return true;
  } else {
    return false;
  }
}

function informPlayers(dataName, data) {
  for(var i = 0; i < players.length; i++) {
    players[i].emit(dataName, data);
  }
}
