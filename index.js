var app = require('express')();
var http = require('http').Server(app);
var bodyParser = require('body-parser');
var io = require('socket.io')(http);
 
var Matrix = require('./modules/matrix/matrix');

app.use( bodyParser.json() );

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.get('/src/:file', function (req, res) {
    var file = req.params.file;
    res.sendFile(__dirname + '/src/' + file + '.js');
});

app.post('/send', function(req, res) {
});

io.on('connection', function(socket) {
    io.emit('message', { msg: Matrix.isMatrix([1, 2, 6]), for: 'everyone' });
    io.emit('message', { msg: Matrix.isMatrix([[]]), for: 'everyone' });
    io.emit('message', { msg: Matrix.isMatrix('qwe'), for: 'everyone' });
});

http.listen(4242, function(){
    console.log('listening on *:4242');
});
