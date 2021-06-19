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
  seq: {
    type: Number
  },
}, { _id: false, versionKey: false }
)

const QuizSelfSchema = new Schema({
  subjectId: {
    type: String,
    required: true,
    index: true
  },
  subjectName: {
    type: String
  },
  quizId: {
    type: String
  },
  quizNumber: {
    type: Number
  },
  point: {
    type: Number
  },
  pointFull: {
    type: String
  },
  quizzes: [QuizzesSchema],
  created: {
    type: String,
    default: new Date().toLocaleString('vi-VN', {timeZone: 'Asia/Ho_Chi_Minh'})
  },

}, {
  versionKey: false
})

module.exports = model('quizself', QuizSelfSchema);