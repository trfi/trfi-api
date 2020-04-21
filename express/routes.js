const express = require('express')
const router = express.Router();
const cms_data = require('../data/cms_data.json')
const {checkKey} = require('../controllers/BraveTool')

router.get('/api/cms', function(req, res) {
    res.json(cms_data);
})
router.post('/api/toolbrave/checkkey', checkKey)

module.exports = router