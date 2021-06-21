const { Schema, model } = require('mongoose');

const UserUsing = new Schema({
  name: {
    type: String,
    required: true
  },
  studentCode: {
    type: String,
    required: true
  },
  term: {
    type: String,
    required: true
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
    type: Number,
    required: true
  },
  date: {
    type: String,
    required: true
  }
}, {
  versionKey: false
})

module.exports = model('userusing', UserUsing, 'userusing');