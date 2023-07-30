//// Import the express library
let express = require('express');

// // Initialize an express application
let app = express();

//pp.set('view engine', 'ejs');

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

// Handle GET requests to '/add', expecting 'num1' and 'num2' 
// as query parameters. The route adds these two numbers together and responds with the sum

/*
app.get('/add', (req, res) => {
    const number1 = Number(req.query.num1);
    const number2 = Number(req.query.num2);

    // If 'num1' and 'num2' are valid numbers, send back the sum
    if (!isNaN(number1) && !isNaN(number2)) {
        const sum = number1 + number2;
        res.render('result', { result: sum });

        // If 'num1' and/or 'num2' are not valid numbers, 
        // respond with a 400 (Bad Request) status code and an error message
    } else {
        res.status(400).json({ error: 'Invalid numbers provided' });
    }
});
*/

/*
app.get('/subtract', (req, res) => {
    const number1 = Number(req.query.num1);
    const number2 = Number(req.query.num2);

    if (!isNaN(number1) && !isNaN(number2)) {
        const subtraction = number1 - number2;
        res.render('result', { result: subtraction });
    } else {
        res.status(400).json({ error: 'Invalid numbers provided' });
    }
});
*/

app.listen(port, () => {
    console.log('server started');
});