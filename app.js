var app = require('express')();
var bodyParser = require('body-parser');
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(bodyParser.json());

io.on('connection', function (socket) {
  console.log('user connected');
});

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/templates/index.html');
});

app.post('/send-message/', function (req, res) {
  io.emit('notification', {
    message: req.body.message
  });
  res.send({
    status: 'ok'
  });
});

http.listen(3000, function () {
  console.log('Listening on port 3000');
});