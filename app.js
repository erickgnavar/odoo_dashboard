var app = require('express')();
var bodyParser = require('body-parser');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var Odoo = require('node-odoo');

app.use(bodyParser.json());

io.on('connection', function (socket) {
  var odoo = new Odoo({
    host: 'localhost',
    port: 8069,
    database: '',
    username: '',
    password: ''
  });

  odoo.connect(function (err, data) {
    odoo.search('res.partner', [['customer', '=', true], ['active', '=', true]], function (err, ids) {
      odoo.get('res.partner', ids, function (err, customers) {
        io.emit('load_customers', {
          customers: customers
        });
      });
    });
  });
});

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/templates/index.html');
});

app.post('/new-sale-order/', function (req, res) {
  io.emit('new_sale_order', req.body);
  res.send({
    status: 'ok'
  });
});

http.listen(3000, function () {
  console.log('Listening on port 3000');
});