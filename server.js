//// Import the express library
let express = require('express');

// // Initialize an express application
let app = express();
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://s222489357:Q3KNsvTCwWFqvO79@cluster0.p9i1kz5.mongodb.net/?retryWrites=true&w=majority";
let port = process.env.PORT || 3000;
let collection;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function runDBConnection() {
    try {
        await client.connect();
        collection = client.db().collection('Cats');
        console.log('Connected to the database.');
    } catch (ex) {
        console.error('Error while connecting to the database:', ex);
    }
}

app.use(express.static(__dirname + '/'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('/api/cats', (req, res) => {
    getAllCats((err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Failed to fetch cats.', error: err.message });
        }
        res.json({ statusCode: 200, data: result, message: 'Get All Cats successful' });
    });
});

app.post('/api/cat', (req, res) => {
    let cat = req.body;
    postCat(cat, (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Failed to post cat.', error: err.message });
        }
        res.json({ statusCode: 201, data: result, message: 'success' });
    });
});

function getAllCats(callback) {
    //collection.find({}).toArray(callback);
    collection.find({}).toArray((err, results) => {
        console.log(results); // Print the results to check them
        callback(err, results);
    });
}

function postCat(cat, callback) {
    collection.insertOne(cat, callback);
}

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
    runDBConnection();
});