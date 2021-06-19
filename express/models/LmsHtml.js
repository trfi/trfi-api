const { Schema, model } = require('mongoose');

const LmsHtmlSchema = new Schema({
  html: {
    type: String,
    required: true
  },
  note: {
    type: String,
  },
  created: {
    type: String,
    default: new Date().toLocaleString('vi-VN', {timeZone: 'Asia/Ho_Chi_Minh'})
  }
}, {
  versionKey: false
})

module.exports = model('lmshtml', LmsHtmlSchema);