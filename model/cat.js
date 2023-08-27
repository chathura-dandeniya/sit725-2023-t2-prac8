// const db = require('../dbConnection');

// function getAllCats(callback) {
//     const collection = db.getCollection();
//     console.log('getAllCats');
//     console.log('Collection:', collection);
//     collection.find({}).toArray(callback);
// }

// function postCat(cat, callback) {
//     const collection = db.getCollection();
//     console.log('postCat');
//     console.log('Collection:', collection);
//     collection.insertOne(cat, callback);
// }

// module.exports = { getAllCats, postCat };


const db = require('../dbConnection');

function getAllCats(callback) {
    const collection = db.getCollection('cats'); // Choose one naming convention
    if (!collection) {
        return callback(new Error('Database not initialized'));
    }
    collection.find({}).toArray(callback);
}

function postCat(cat, callback) {
    const collection = db.getCollection('cats');
    if (!collection) {
        return callback(new Error('Database not initialized'));
    }
    if (!cat.title || !cat.description) {
        return callback(new Error('Invalid cat data'));
    }
    collection.insertOne(cat, callback);
}

module.exports = { getAllCats, postCat };