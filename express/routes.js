const express = require('express')
const router = express.Router();
const cms_data = require('../cms_data.json')

router.get('/cms', function(req, res) {
    res.json(cms_data);
});


module.exports = router;