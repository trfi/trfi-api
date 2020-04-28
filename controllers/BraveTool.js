const keys = require('../data/key-tool-brave.json')
const logger = require('../logger.js')

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
    finally {
      const ip = req.ip || 
      (req.headers['x-forwarded-for'] || '').split(',').pop() || 
      req.connection.remoteAddress || 
      req.socket.remoteAddress || 
      req.connection.socket.remoteAddress
      logger.info(`Check Key: ${req.body.key} - IP: ${ip} - UA: ${req.get('user-agent')}`)
    }
  }
}