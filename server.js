let express = require('express');
let app = express();
let router = require('./routers/router');
let db = require('./dbConnection');
let port = process.env.PORT || 8080;

let http = require('http').createServer(app);
let io = require('socket.io')(http);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/'));
app.use('/', router);

io.on('connection', (socket) => {
    console.log('A client has connected');
    socket.on('disconnect', () => {
        console.log('A client has disconnected');
    });

    setInterval(() => {
        socket.emit('number', parseInt(Math.random() * 10));
    }, 1000);
})

const serverInstance = http.listen(port, () => {
    console.log(`Server started on port ${port}`);
    db.connect();
});

// const serverInstance = app.listen(port, () => {
//     console.log(`Server started on port ${port}`);
//     db.connect();
// });

module.exports = serverInstance; // Export server for testing (newly added)