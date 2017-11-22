var path = require('path');
var port = 3131 + parseInt(process.env.NODE_APP_INSTANCE);
var app = require('express')();
var io = require('socket.io');
var ioStart = io.listen(app.listen(port));

ioStart.of('/ws')
  .on('connection', function(socket) {
    socket.on('disconnect', function() {
        console.log('disconnect-------->')
    });

    socket.on('connect:message', function(data) {
        console.log('connect:message: ' + JSON.stringify(data));
        socket.emit('port:message', port);
    });
});

app.get('/', function(req, res) {
    res.sendFile(path.join(process.cwd(), './index.html'));
});
