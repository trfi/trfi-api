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

function connect() {
  mongoose.connect(process.env.DB_CONNECTION,
    { useUnifiedTopology: true }, 
    { useNewUrlParser: true },
    { socketTimeoutMS: 86400000},
    { maxTimeMS: 30000 },
    { useCreateIndex: true },
    { serverSelectionTimeoutMS: 10000 },
  )
  .catch((err) => console.log(err));
}

const db = mongoose.connection;

db.on('connecting', () => {
  console.info('Connecting to MongoDB...');
});

db.on('error', (error) => {
  console.error(`MongoDB connection error: ${error}`);
  mongoose.disconnect();
});

db.on('connected', () => {
  console.info('Connected to MongoDB!');
});

db.once('open', () => {
  console.info('MongoDB connection opened!');
});

db.on('reconnected', () => {
  console.info('MongoDB reconnected!');
});

db.on('disconnected', () => {
  console.error(`MongoDB disconnected! Reconnecting in ${reconnectTimeout / 1000}s...`);
  setTimeout(() => connect(), reconnectTimeout);
});

connect();

module.exports = app;
module.exports.handler = serverless(app);