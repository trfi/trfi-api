const {transports, createLogger, format} = require('winston')
const { combine, timestamp, label, printf } = format
const path = require('path')

const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp}: ${message}`
})

const timezoned = () => {
  return new Date().toLocaleString('en-US', {
    timeZone: 'Asia/Shanghai'
  })
}

const logger = createLogger({
  level: 'info',
  format: combine(
    timestamp({format: 'YYYY-MM-DD HH:mm:ss'}),
    myFormat
  ),
  transports: [
    new transports.File({ filename: 'logs/error.log', level: 'error' }),
    new transports.File({ filename: 'logs/info.log', level: 'info' }),
    new transports.File({ filename: 'logs/debug.log', level: 'debug' })
  ]
})
 
// chỉ ghi log ra console nếu không phải là môi trường production
if (process.env.NODE_ENV !== 'production') {
  logger.add(new transports.Console({
    format: format.simple()
  }))
}
module.exports = logger