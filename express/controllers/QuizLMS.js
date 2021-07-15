const QuizLMS = require('../models/QuizLMS')
const LmsHtml = require('../models/LmsHtml')
const QuizSelf = require('../models/QuizSelf')
const UserUsing = require('../models/UserUsing')
const { slug } = require('../../utils')

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
    let { subject } = req.params
    try {
      if (subject.includes(' ')) subject = slug(subject)
      const quizzes = await QuizLMS.findOne({subjectId: subject.toLowerCase()})
      res.json({data: quizzes})
    } catch (err) {
      console.error(err);
      res.status(400).json({message: err})
    }
  },
  async getBySubjectPost(req, res, next) {
    let { subject } = req.body
    try {
      if (subject.includes(' ')) subject = slug(subject)
      const quizzes = await QuizLMS.findOne({subjectId: subject.toLowerCase()})
      res.json({data: quizzes})
    } catch (err) {
      console.error(err);
      res.status(400).json({message: err})
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
        return (qa.ques && qa.ans)
      })
      const subjectId = slug(subjectName)
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
  async addQuizSelf(req, res, next) {
    console.log(`Request from ${req.headers['user-agent']}`);
    try {
      let {subjectName, quizzes} = req.body
      if (!subjectName) {
        console.log('subjectName null');
        res.status(400).json({message: 'subjectName null'});
      }
      quizzes = quizzes.filter((qa) => {
        return (qa.ques && qa.ans)
      })
      const subjectId = slug(subjectName)
      const result = await QuizSelf.updateMany(
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
      console.error(err)
      res.status(400).json({message: err});
    }
  },
  async getHtml(req, res, next) {
    try {
      const result = await LmsHtml.find({}, { _id: 0 }, { limit: 20, sort: { _id: -1 } });
      res.json(result);
    } catch (err) {
      res.status(400).json({ message: err });
    }
  },
  async addHtml(req, res, next) {
    const created = new Date().toLocaleString('vi-VN', {timeZone: 'Asia/Ho_Chi_Minh'})
    try {
      await LmsHtml.create({...req.body, created}).then(res => console.log(res._id))
      res.json({message: 'success'})
    } catch (err) {
      res.status(400).json({message: err})
    }
  },
  async getUserUsing(req, res, next) {
    try {
      const result = await UserUsing.find({}, { _id: 0 }, { limit: 200, sort: { _id: -1 } });
      res.json(result);
    } catch (err) {
      res.status(400).json({ message: err });
    }
  },
  async addUserUsing(req, res, next) {
    const date = new Date().toLocaleString('vi-VN', {timeZone: 'Asia/Ho_Chi_Minh'})
    try {
      await UserUsing.create({...req.body, date}).then(res => console.log(res._id))
      res.json({message: 'success'})
    } catch (err) {
      res.status(400).json({message: err})
    }
  },
  async getQuizSelf(req, res, next) {
    try {
      const result = await QuizSelf.find({}, { _id: 0 }, { limit: 50, sort: { _id: -1 } });
      res.json(result);
    } catch (err) {
      res.status(400).json({ message: err });
    }
  },
  async addQuizSelfsOld(req, res, next) {
    const created = new Date().toLocaleString('vi-VN', {timeZone: 'Asia/Ho_Chi_Minh'})
    try {
      let { subjectName, pointFull } = req.body
      if (!subjectName) {
        console.log('subjectName null');
        res.status(400).json({message: 'subjectName null'});
      }

      const subjectId = slug(subjectName)

      const point = Number(pointFull.split(' Of ')[0])

      await QuizSelf.create({subjectId, point, created, ...req.body})
      res.json({message: 'success'})
    } catch (err) {
      res.status(400).json({ message: err })
    }
  }
}