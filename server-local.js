'use strict';

const express = require('express');
const app = express();
const cors = require('cors')
const bodyParser = require('body-parser');
const checkkey = require('./express/routes/checkkey');
const quizlms = require('./express/routes/quizlmsRoute');
const mongoose = require('mongoose');
require('dotenv').config();


app.use(bodyParser.json());
app.use(cors())

app.use('/api', checkkey);
app.use('/api/quizpoly/lms', quizlms);

// Connect to DB
mongoose.connect(process.env.DB_CONNECTION,
  { useUnifiedTopology: false }, 
  { useNewUrlParser: true }
)
.then(() => console.log('DB Connected!'));

app.listen(3000, () => console.log('Local app listening on port 3000!'));