'use strict';

const express = require('express');
const app = express();
const cors = require('cors')
const checkkey = require('./express/routes/checkkey');
const quizlms = require('./express/routes/quizlmsRoute');
const mongoose = require('mongoose');
require('dotenv').config();


app.use(express.json());
app.use(cors());

app.use('/api', checkkey);
app.use('/api/quizpoly/lms', quizlms);

// Connect to DB
mongoose.connect(process.env.DB_CONNECTION,
  { useUnifiedTopology: true }, 
  { useNewUrlParser: true },
  { serverSelectionTimeoutMS: 5000 },
  { useCreateIndex: true }
)
.then(() => console.log('DB Connected!'))
.catch((err) => console.log(err));

app.listen(3000, () => console.log('Local app listening on port 3000!'));