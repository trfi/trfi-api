const { Schema, model } = require('mongoose');

const UserUsing = new Schema({
  name: {
    type: String,
    required: true
  },
  studentCode: {
    type: String
  },
  term: {
    type: String
  },
  userServer: {
    type: String,
    required: true
  },
  getQuizType: {
    type: String,
    required: true
  },
  subjectName: {
    type: String,
    required: true
  },
  quizNumber: {
    type: Number
  },
  c: {
    type: String
  },
  date: {
    type: String,
    required: true
  }
}, {
  versionKey: false
})

module.exports = model('userusing', UserUsing, 'userusing');