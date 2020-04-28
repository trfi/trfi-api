const express = require('express')
const router = express.Router();
const cms_data = require('../data/cms_data.json')
const {checkKey} = require('../controllers/BraveTool')
//const log_info = require('../logs/info.log')
const fs = require('fs');

router.get('/api/cms', function(req, res) {
    res.json(cms_data);
})
router.get('/api/toolbrave/checkkey', function (req, res) {
  res.send('nothing here')
})
router.post('/api/toolbrave/checkkey', checkKey)

router.get('/logs/info', function (req, res) {
  fs.readFile('./logs/info.log', 'utf8', function(err, data) {
    if (err) throw err
    return res.send(`<pre>${data}</pre>`)
  })
})

module.exports = router