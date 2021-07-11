const express = require('express')
const router = express.Router();
const quizcms = require('../controllers/QuizCMS')


router.get('/', quizcms.getAll)
router.post('/', quizcms.add)


module.exports = router