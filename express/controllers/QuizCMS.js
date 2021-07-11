const QuizCMS = require('../models/QuizCMS')
const { slug } = require('../../utils')

module.exports = {
  async getAll(req, res, next) {
    try {
      const quizzes = await QuizCMS.find({}, { quizzes: 1, subjectName: 1 });
      let data = {}
      quizzes.forEach(q => {
        data[q.subjectName] = q.quizzes
      })
      res.json(data);
    } catch (err) {
      res.status(400).json({message: err});
    }
  },
  async add(req, res, next) {
    console.log(`Request from ${req.headers['user-agent']}`);
    try {
      let {subjectName, quizzes} = req.body
      if (!subjectName) {
        console.log('subjectName null');
        res.status(400).json({message: 'subjectName null'});
      }
      quizzes = quizzes.filter((qa) => {
        return (qa.q && qa.a)
      })
      const subjectId = slug(subjectName)
      const result = await QuizCMS.updateMany(
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
      const count = result.upserted == undefined ? result.nModified : quizzes.length;
      const message = `${subjectName}: Added ${count} quiz success`;
      console.log(message);
      res.json({message});
    } catch (e) {
      console.error(e)
      res.status(400).json({message: e});
    }
  }
}