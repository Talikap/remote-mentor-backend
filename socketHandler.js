const socketIO = require('socket.io');

const socketHandler = (server) => {
    const io = socketIO(server);
    let userCount = 0;

    io.on('connection', (socket) => {
        
        // Increment user count on connection
        userCount++;

        // Send user type to the client
        socket.emit('userType', {
            userType: userCount === 1 ? 'readOnly' : 'readWrite',
        });

        // Listen for changes from the second user (student)
        if (userCount === 2) {
            socket.on('codeChange', (newCode) => {
                // Broadcast the code change to other clients (including the mentor)
                io.emit('codeChange', newCode);
            });
        }

        // Decrement user count on disconnection
        socket.on('disconnect', () => {
            userCount = Math.max(0, userCount - 1);
        });
    });

    return io;
};

module.exports = socketHandler;
