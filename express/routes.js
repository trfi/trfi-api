const express = require('express')
const router = express.Router();
const cms_data = require('../cms_data.json')

router.get('/cms', function(req, res) {
    res.json(cms_data);
});
router.get('/cms2', function(req, res) {
    res.json(cms_data);
});
router.get('/cms3', function(req, res) {
    res.json(cms_data);
});


module.exports = router;