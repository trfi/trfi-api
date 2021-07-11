const { Schema, model } = require('mongoose');

const QuizzesSchema = new Schema({
  q: {
    type: String,
    required: true,
  },
  a: {
    type: Schema.Types.Mixed,
    required: true
  }
}, { _id: false, versionKey: false }
)


const QuizCmsSchema = new Schema({
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
}, { versionKey: false, timestamps: true })

QuizCmsSchema.index( { 'subjectId': 1, 'quizzes.q': 1, 'quizzes.a': 1 }, { unique: true } )


module.exports = model('quizcms', QuizCmsSchema);