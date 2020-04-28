const express = require('express')
const router = express.Router();
const cms_data = require('../data/cms_data.json')
const {checkKey} = require('./controllers/BraveTool')
const fs = require('fs');
const path = require('path');

router.get('/api/cms', function(req, res) {
    res.json(cms_data);
})
router.get('/api/toolbrave/checkkey', function (req, res) {
  res.send('nothing here')
})
router.post('/api/toolbrave/checkkey', checkKey)

router.get('/api/logs/info', function (req, res) {
  fs.readFile(('logs/info.log'), 'utf8', function(err, data) {
    if (err) throw err
    return res.send(`<pre>${data}</pre>`)
  })
})

router.get('/api/dir', function (req, res) {
  return res.send(`<pre>${__dirname}</pre>`)
})

module.exports = router