const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://s222489357:Q3KNsvTCwWFqvO79@cluster0.p9i1kz5.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

let collection;

async function connect() {
    try {
        await client.connect();
        collection = client.db().collection('Cats');
        console.log('Connected to the database.');
    } catch (ex) {
        console.error('Error while connecting to the database:', ex);
    }
}

function getCollection() {
    return collection;
}

module.exports = { connect, getCollection };