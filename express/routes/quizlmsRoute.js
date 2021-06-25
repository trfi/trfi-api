const express = require('express')
const router = express.Router();
const quizlms = require('../controllers/QuizLMS')


router.get('/', quizlms.getAll)
router.get('/userusing', quizlms.getUserUsing)
router.get('/html', quizlms.getHtml)
router.post('/', quizlms.add)
router.get('/count', quizlms.count)
router.get('/:subject', quizlms.getBySubject)
router.post('/quiz', quizlms.getBySubjectPost)
router.delete('/deleteBySubject/:subjectId', quizlms.deleteBySubject)
router.post('/add', quizlms.add)
router.post('/html', quizlms.addHtml)
router.post('/userusing', quizlms.addUserUsing)
router.post('/quizself', quizlms.addQuizSelf)


module.exports = router