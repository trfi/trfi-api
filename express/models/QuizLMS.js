const { Schema, model } = require('mongoose');

const QuizzesSchema = new Schema({
  ques: {
    type: String,
    required: true,
  },
  ans: {
    type: String,
    required: true
  },
}, { _id: false }
)


const QuizLmsSchema = new Schema({
  subjectId: {
    type: String,
    required: true,
    index: true
  },
  subjectName: {
    type: String,
    required: true
  },
  quizzes: [QuizzesSchema]
})

QuizLmsSchema.index( { 'subjectId': 1, 'quizzes.ques': 1, 'quizzes.ans': 1 }, { unique: true } )

module.exports = model('quizlms', QuizLmsSchema);