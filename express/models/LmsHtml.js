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
    required: true
  }
}, {
  versionKey: false
})

module.exports = model('lmshtml', LmsHtmlSchema);