var socketIO = require('socket.io'); // Loads the external module called 'socket.io'
var server = require('http').createServer().listen(7000, '0.0.0.0'); // Loads the external 
//module called 'http', creates a server and listens on port number 7000
var io = socketIO.listen(server);

// Super simple server:
// Currently works only for private internal networks under one router 

io.sockets.on('connection', function (client) {
    console.log('new connection: ' + client.id);

    client.on('offer', function (details) {
        client.broadcast.emit('offer', details);
        console.log('offer: ' + JSON.stringify(details));
    });

    client.on('answer', function (details) {
        client.broadcast.emit('answer', details);
        console.log('answer: ' + JSON.stringify(details));
    });
    
    client.on('candidate', function (details) {
        client.broadcast.emit('candidate', details);
        console.log('candidate: ' + JSON.stringify(details));
    });

    // Here starts evertyhing!
    // The first connection doesn't send anything (no other clients)
    // Second connection emits the message to start the SDP negotation
    client.broadcast.emit('createoffer', {});
});

