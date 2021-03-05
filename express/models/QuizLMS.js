const { Schema, model } = require('mongoose');

const QuizLmsSchema = new Schema({
  ques: {
    type: String,
    required: true,
  },
  ans: {
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

QuizLmsSchema.index( { "ques": 1, "ans": 1 }, { unique: true } )

module.exports = model('quizlms', QuizLmsSchema);