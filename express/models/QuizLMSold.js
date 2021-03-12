const { Schema, model } = require('mongoose');


const QuizOld = new Schema({
  subjectId: {
    type: String,
    required: true,
    index: true
  },
  subjectName: {
    type: String,
    required: true
  },
  ques: {
    type: String,
    required: true,
  },
  ans: {
    type: String,
    required: true
  }
})

module.exports = model('quizlmsold', QuizOld, 'quizlmsold'); 