const QuizLMS = require('../models/QuizLMS')
const QuizLMSold = require('../models/QuizLMSold')


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
      const result = await QuizLMS.aggregate([{$group : {_id : "$subjectName", count: {$sum: {$size: "$quizzes"}}}}])
      res.json(result)
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
    console.log(`Request from ${req.headers['user-agent']}`);
    try {
      const {subjectId, subjectName, quizzes} = req.body;
      const result = await QuizLMS.updateMany(
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
    } catch (err) {
      res.status(400).json({message: err});
    }
  },
  async test(req, res, next) {
    const {subjectId} = req.body;
    let quizzes = await QuizLMSold.find({subjectId}, {'ques': 1, 'ans': 1, 'subjectName': 1, '_id': 0})
    const subjectName = quizzes[0].subjectName
    let quizzesNew = []
    quizzes.map(item => {
      let ques = item.ques
      let ans = item.ans
      let oj = {ques, ans}
      quizzesNew.push(oj)
    })
    // Add quiz
    const result = await QuizLMS.updateMany(
      { subjectId },
      {
        subjectId,
        subjectName,
        $addToSet: { quizzes: quizzesNew }
      }, 
      {
        upsert: true
      }
    );
    console.log(result)
    const count = result.upserted == undefined ? result.nModified : quizzes.length
    res.json({message: `Added ${count} quiz success`})
  }
}