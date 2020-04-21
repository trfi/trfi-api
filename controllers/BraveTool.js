const keys = require('../data/key-tool-brave.json')


function check(key) {
  for (key_ of keys) {
    if (key_ === key) return true
  }
  return false
}


module.exports = {
  async checkKey (req, res, next) {
    try {
      console.log(req.body);
      const {key} = req.body
      if (check(key)) res.send({ status: 'success' })
      else res.status(403).send({status: 'error', msg: 'Invalid Key'})
    }
    catch (err) {
      console.log(err)
      res.status(400).send({
        error: err
      })
    }
  }
}