const express = require('express')
const router = express.Router();
const quizlms = require('../controllers/QuizLMS')


router.get('/', quizlms.getAll)
router.get('/using', quizlms.getUserUsing)
router.get('/html', quizlms.getHtml)
router.get('/self', quizlms.getQuizSelf)
router.post('/', quizlms.add)
router.get('/count', quizlms.count)
router.get('/:subject', quizlms.getBySubject)
router.post('/quiz', quizlms.getBySubjectPost)
router.delete('/deleteBySubject/:subjectId', quizlms.deleteBySubject)
router.post('/html', quizlms.addHtml)
router.post('/using', quizlms.addUserUsing)
router.post('/userusing', quizlms.addUserUsing)
router.post('/self', quizlms.addQuizSelf)


module.exports = router