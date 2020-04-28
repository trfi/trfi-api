const {transports, createLogger, format} = require('winston')
const { combine, timestamp, label, printf } = format

const fs = require( 'fs' );
const path = require('path');
const logDir = 'log'; // directory path you want to set
if ( !fs.existsSync( logDir ) ) {
    // Create the directory if it does not exist
    fs.mkdirSync( logDir );
}

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
    new transports.File({ filename: path.join(__dirname, './logs/error.log'), level: 'error' }),
    new transports.File({ filename: path.join(__dirname, './logs/info.log'), level: 'info' }),
    new transports.File({ filename: path.join(__dirname, './logs/debug.log'), level: 'debug' })
  ]
})
 
// chỉ ghi log ra console nếu không phải là môi trường production
if (process.env.NODE_ENV !== 'production') {
  logger.add(new transports.Console({
    format: format.simple()
  }))
}
module.exports = logger