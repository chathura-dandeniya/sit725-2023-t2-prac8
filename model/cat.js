const db = require('../dbConnection');

function getAllCats(callback) {
    const collection = db.getCollection();
    collection.find({}).toArray(callback);
}

function postCat(cat, callback) {
    const collection = db.getCollection();
    collection.insertOne(cat, callback);
}

module.exports = { getAllCats, postCat };
