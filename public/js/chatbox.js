// Chatroom setup
const io = require('socket.io');

let numUsers = 0;

io.on('connection', socket = () => {
    let addedUser = false;

    // Sets timer for buyers
    socket.emit('currentEndTime', { time: timer.getEndTime() });

    socket.on('setTimer', data = () => {
        timer.setEndTime(data.time);
        socket.broadcast.emit('currentEndTime', { time: time.getEndTime });
    });

    // When the chatroom emits a new message, this listens for the message, and executes it
    socket.on('new message', data = () => {
        socket.broadcast.emit('new message', {
            username: socket.username,
            message: data
        });
    });

    // When the chatroom emits 'adding user', this listens for the action and executes it
    socket.on('add user', username = () => {
        if (addUser) return;

        // This stores the username in the socket session for the chatroom
        socket.username = username;
        ++numUsers;
        addedUser = true;
        socket.emit('login', {
            numUsers: numUsers
        });
    });

    // When the chatroom emits 'typing', this will broadcast to other users
    socket.on('typing', () => {
        socket.boradcast.emit(`${username} is typing`, {
            username: socket.username
        });
    });

    // When the chatroom emits 'stopped typing', this will broadcast to other users
    socket.on('stopped typing', () => {
        socket.broadcast.emti(`${username} has stopped typing`, {
            username: socket.username
        });
    });
    
    // When a user disconnect from the chatroom, this action will perform
    socket.on('disconnect', () => {
        if (addedUser) {
            --numUsers;

            // This will globally display the user has left
            socket.boradcast.emi(`${username} has left the chatroom`, {
                username: socket.username,
                numUsers: numUsers
            });
        }
    });
});