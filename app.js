/**
 * Module dependencies.
 */

var express = require('express')
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

io.sockets.on('connection', function (socket) {
  var player = {"name":""};

  // On connection, emit the current number of player
  socket.emit('numberOfPlayers', {number: players.length});

  socket.on('newPlayer', function (data) {
    console.log(data);
    if(data.hasOwnProperty("name")) {
      player.name = data.name;
      players.push(player);
      // Send a ACK to the client side
      socket.emit('confirmPlayer', {name: player.name}); 

      console.log(players);
    }
  });
});
