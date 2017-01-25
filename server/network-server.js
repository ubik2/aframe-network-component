var socketio = require('socket.io');
var io = socketio(4000);
var clients = {};
var chat = io
    .of('/chat')
    .on('connection', function (socket) {
    console.log('got connection');
    // notify the new client about all existing clients
    for (var key in clients) {
        if (clients.hasOwnProperty(key)) {
            console.log("sending " + key);
            socket.emit('spawn', clients[key]);
        }
    }
    socket.on('disconnect', function () {
        var clientState = clients[socket.id];
        delete clients[socket.id];
        socket.broadcast.emit('despawn', clientState);
        console.log('user disconnected');
    }).on('message', function (data) {
        socket.broadcast.emit('message', {
            'data': data,
            'description': 'everyone else will get'
        });
        console.log(data);
    }).on('despawn', function (data) {
        var clientState = clients[socket.id];
        delete clients[socket.id];
        socket.broadcast.emit('despawn', clientState);
    }).on('spawn', function (data) {
        // add our client
        var clientState = {
            id: socket.id,
            position: data.position,
            rotation: data.rotation
        };
        clients[socket.id] = clientState;
        socket.broadcast.emit('spawn', clientState);
    }).on('position', function (data) {
        var clientState = clients[socket.id];
        clientState.position = data;
        var message = {
            id: socket.id,
            position: clientState.position
        };
        socket.broadcast.emit('position', message);
    }).on('rotation', function (data) {
        var clientState = clients[socket.id];
        clientState.rotation = data;
        var message = {
            id: socket.id,
            rotation: clientState.rotation
        };
        socket.broadcast.emit('rotation', message);
    });
});
