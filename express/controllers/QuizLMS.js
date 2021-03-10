const QuizLMS = require('../models/QuizLMS')

module.exports = {
  async getAll(req, res, next) {
    try {
      const quizzes = await QuizLMS.find({}, {_id: 0, __v: 0});
      res.json({data: quizzes});
    } catch (err) {
      res.status(400).json({message: err});
    }
  },
  async count(req, res, next) {
    try {
      res.json(await QuizLMS.count())
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
      result = await QuizLMS.updateMany(
        { subjectId },
        {
          subjectId,
          subjectName,
          $addToSet: { quizzes }
        }, 
        {
          upsert: true
        }
      );
      const count = result.upserted == undefined ? result.nModified : quizzes.length
      res.json({message: `Added ${count} quiz success`})
    } catch (err) {
      res.status(400).json({message: err});
    }
  }
}