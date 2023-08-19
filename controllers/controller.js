const model = require('../model/cat');

function getCats(req, res) {
    model.getAllCats((err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Failed to fetch cats.', error: err.message });
        }
        res.json({ statusCode: 200, data: result, message: 'Get All Cats successful' });
    });
}

function addCat(req, res) {
    let cat = req.body;
    model.postCat(cat, (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Failed to post cat.', error: err.message });
        }
        res.json({ statusCode: 201, data: result, message: 'success' });
    });
}

module.exports = { getCats, addCat };
