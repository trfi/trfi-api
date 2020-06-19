const express = require('express')
const router = express.Router();
const cms_data = require('../data/cms_data.json')
const products = require('../data/products.json')
const {checkKey} = require('./controllers/BraveTool')
const fs = require('fs');

router.get('/api/cms', function(req, res) {
  res.json(cms_data);
})
router.get('/api/products', function(req, res) {
  res.json(products);
})
router.get('/api/toolbrave/checkkey', function (req, res) {
  res.send('nothing here')
})
router.post('/api/toolbrave/checkkey', checkKey)


module.exports = router