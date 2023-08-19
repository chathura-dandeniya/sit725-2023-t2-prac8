let express = require('express');
let router = express.Router();
const controller = require('../controllers/controller');

router.get('/api/cats', controller.getCats);
router.post('/api/cat', controller.addCat);
router.get('/', (req, res) => res.sendFile(__dirname + '/index.html'));

module.exports = router;