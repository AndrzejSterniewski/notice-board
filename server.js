const express = require('express');
const cors = require('cors');
const path = require('path');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const mongoose = require('mongoose');

const adRoutes = require('./routes/ads.routes');
const userRoutes = require('./routes/users.routes');
const authRoutes = require('./routes/auth.routes');

// start express server
const app = express();
const server = app.listen(process.env.PORT || 8000, () => {
  console.log('Server is running on port: 8000');
});

// const NODE_ENV = process.env.NODE_ENV;
// let dbUri = '';

// db connection for different cases e.g. for tests
// if (NODE_ENV === 'production') dbUri = 'url to remote db';
// else if (NODE_ENV === 'test') dbUri = 'mongodb://0.0.0.0/NewWaveDBtest';
// else dbUri = 'mongodb+srv://Andrzej:${process.env.DB_PASS}@cluster0.mfattfu.mongodb.net/NewWaveDB?retryWrites=true&w=majority';

// connect to database
// const db = mongoose.connection;
mongoose.connect('mongodb://0.0.0.0:27017/noticeBoardDB', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.once('open', () => {
  console.log('Connected to the database');
});
db.on('error', err => console.log('Error ' + err));

// add middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// czy zamiast mongoose.connection mogę już użyć tej stałej db ustalonej wyżej?
app.use(session({
  secret: 'xyz567',
  store: MongoStore.create(mongoose.connection),
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV == 'production',
  },
}));

// serve static files from react app
app.use(express.static(path.join(__dirname, '/client/build')));
app.use(express.static(path.join(__dirname, '/public')));

// add routes
app.use('/api', adRoutes);
app.use('/api', userRoutes);
app.use('/auth', authRoutes);

// at any other link, serve react app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

// catching wrong links
app.use((req, res) => {
  res.status(404).send('404 not found...');
});

module.exports = server;