const express = require('express')
const router = express.Router();
const quizlms = require('../controllers/QuizLMS')


router.get('/', quizlms.getAll)
router.post('/', quizlms.add)
router.get('/count', quizlms.count)
router.get('/getBySubject/:subjectId', quizlms.getBySubject)
router.delete('/deleteBySubject/:subjectId', quizlms.deleteBySubject)
router.post('/add', quizlms.add)
router.post('/test', quizlms.test)


module.exports = router