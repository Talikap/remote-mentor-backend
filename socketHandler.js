const socketIO = require('socket.io');

const socketHandler = (server) => {
    const io = socketIO(server)
    let userCount = 0;

    io.on('connection', (socket) => {
        console.log(`User connected. Socket ID: ${socket.id}`);
        // Increment user count on connection
        userCount++;
        console.log(`User connected. Total users: ${userCount}`);
        
        //send user type to the client
        socket.emit('userType', {
            userType: userCount === 1 ? 'readOnly' : 'readWrite',
        })

        // listen for changes from the second user(student)
        if (userCount === 2) {
            socket.on('codeChange', (newCode) => {
                //broadcast the code change to the other clients (including the mentor)
                io.emit('codeChange', newCode)
                console.log('Emitted codeChange event:', newCode);
            })
        }

        // Decrement user count on disconnection
        socket.on('disconnect', () => {
            console.log(`User disconnected. Socket ID: ${socket.id}`);
            userCount = Math.max(0, userCount - 1)
            console.log(`User disconnected. Total users: ${userCount}`)
        })
    })

    return io;
}

module.exports = socketHandler