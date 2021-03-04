const mongoose = require('mongoose');

const QuizLmsSchema = mongoose.Schema({
  question: {
    type: String,
    required: true,
    unique: true
  },
  answer: {
    type: String,
    required: true
  },
  subjectId: {
    type: String,
    required: true,
    index: true
  },
  subjectName: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('quizlms', QuizLmsSchema);