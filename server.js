//// Import the express library
let express = require('express');

// // Initialize an express application
let app = express();

const sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('./myDB.db');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

db.run(`CREATE TABLE IF NOT EXISTS users (
    firstName TEXT,
    lastName TEXT,
    password TEXT,
    email TEXT
)`);

app.post('/submit-form', (req, res) => {
    let data = [req.body.firstName, req.body.lastName, req.body.password, req.body.email];
    let sql = `INSERT INTO users (firstName, lastName, password, email) VALUES(?,?,?,?)`;

    db.run(sql, data, function (err) {
        if (err) {
            return console.error(err.message);
        }
        console.log(`Row was added to the table with rowid ${this.lastID}`);
    });

    res.status(200).send('Data has been successfully saved.');
});

// Set the server port. First, it tries to use the PORT environment variable value, 
// but if it doesn't exist (undefined), it uses 3000 as a default port
let port = process.env.PORT || 3000;

// Serve static files (like HTML, CSS, images) from the current directory
app.use(express.static(__dirname + '/'));

// Handle GET requests to the server root ('/') by rendering 'index.html'
// (this assumes that a view engine is set up)
app.get('/', (req, res) => {
    res.render('index.html');
});

app.listen(port, () => {
    console.log('server started');
});