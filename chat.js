const express = require('express');
const app = express();
// expose the server
const socketio = require('socket.io');

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/chat.html')
})

const expressServer = app.listen(8000);

const io = socketio(expressServer, {
    cors: {
        origin: true
    }
});

io.on('connection', (socket) => {
    console.log('user connected')

    socket.on('sendText', (text) => {
        socket.emit('newText', text)
    })
})