const express = require('express')
const router = express.Router();
const quizlms = require('../controllers/QuizLMS')

router.get('/', quizlms.getAll)
router.get('/getBySubject/:subjectId', quizlms.getBySubject)
router.get('/deleteBySubject/:subjectId', quizlms.deleteBySubject)
router.post('/add', quizlms.add)


module.exports = router