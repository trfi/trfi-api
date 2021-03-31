'use strict';

const express = require('express');
const path = require('path');
const serverless = require('serverless-http');
const app = express();
const cors = require('cors')
const checkkey = require('./routes/checkkey');
const quizlms = require('./routes/quizlmsRoute');
const mongoose = require('mongoose');


app.use(express.json());
app.use(cors());

app.use('/api', checkkey);
app.use('/api/quizpoly/lms', quizlms);

app.use('/', (req, res) => res.sendFile(path.join(__dirname, '../index.html')));

// Connect to DB
mongoose.connect(process.env.DB_CONNECTION,
  { useUnifiedTopology: true }, 
  { useNewUrlParser: true },
  { socketTimeoutMS: 60000},
  { heartbeatFrequencyMS: 5000},
  { serverSelectionTimeoutMS: 30000 },
  { keepAlive: true},
  { useCreateIndex: true }
)
.then(() => console.log('DB Connected!'))
.catch((err) => console.log(err));

module.exports = app;
module.exports.handler = serverless(app);