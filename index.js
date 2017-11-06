var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.urlencoded({ limit: '50mb', extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

var server = app.listen(process.env.port || '8002');
var io = require('socket.io')(server);

console.log('Visual debugging is available on port', server.address().port);

app.post('/', function(req, res) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
    res.header('Access-Control-Allow-Headers', 'Accept, Origin, X-Requested-With, Content-Type, Authorization');
    io.sockets.emit('img', req.body.img);
    res.end('');
});
