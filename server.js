let express = require('express');
let app = express();
let router = require('./routers/router');
let db = require('./dbConnection');
let port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/'));
app.use('/', router);

const serverInstance = app.listen(port, () => {
    console.log(`Server started on port ${port}`);
    db.connect();
});

module.exports = serverInstance; // Export server for testing (newly added)