const QuizLMS = require('../models/QuizLMS')

module.exports = {
  async getAll(req, res, next) {
    try {
      const quizzes = await QuizLMS.find();
      res.json(quizzes);
    } catch (err) {
      res.status(400).json({message: err});
    }
  },
  async deleteBySubject(req, res, next) {
    try {
      const {subjectId} = req.params
      const result = await QuizLMS.deleteMany({subjectId});
      res.json({message: `Deleted ${result.deletedCount} quiz`});
    } catch (err) {
      res.status(400).json({message: err});
    }
  },
  async getBySubject(req, res, next) {
    try {
      const {subjectId} = req.params
      const quizzes = await QuizLMS.find({subjectId});
      res.json({data: quizzes});
    } catch (err) {
      res.status(400).json({message: err});
    }
  },
  async add(req, res, next) {
    try {
      const {subjectId, subjectName, quizzes} = req.body;
      quizzes.forEach(item => {
        item.subjectId = subjectId
        item.subjectName = subjectName
      })
      result = await QuizLMS.insertMany(quizzes, { ordered: false })
      res.json({message: `Added ${result.length} quiz success`})
    } catch (err) {
      if (err.code = 11000) res.status(201).json({message: `Added ${err.result.nInserted} quiz`})
      else res.status(400).json({message: err})
    }
  }
}