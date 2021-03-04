const express = require('express')
const router = express.Router();
const cms_data = require('../../data/cms_data.json')
const products = require('../../data/products.json')
const bravetool = require('../controllers/BraveTool')
const bravevps = require('../controllers/BraveVps')
const fs = require('fs');

router.get('/cms', function(req, res) {
  res.json(cms_data);
})
router.get('/products', function(req, res) {
  res.json(products);
})
router.get('/products', function(req, res) {
  res.json(products);
})
router.get('/toolbrave/checkkey', function (req, res) {
  res.send('nothing here')
})
router.post('/toolbrave/checkkey', bravetool.checkKey)
router.post('/bravevps/checkkey', bravevps.checkKey)


module.exports = router