const io = require('socket.io')(5000);
const users = {};

io.on('connection',(socket) => {
    console.log('Gaurav:: User Coonectd',socket.id);

    socket.on('new-user', name => {
        console.log('Gaurav:::new-user Socket ',name,socket.id );
        users[socket.id] = name;
        socket.broadcast.emit('user-connected', name);
    });

    socket.on('send-chat-message' , message => {
        console.log('Gaurav:::message',message,users[socket.id],users );
        socket.broadcast.emit('chat-message' , {message : message , name : users[socket.id] });
    });

    socket.on('disconnect', name => {
        socket.broadcast.emit('user-disconnected', users[socket.id]);
        delete users[socket.id];
    });


});

