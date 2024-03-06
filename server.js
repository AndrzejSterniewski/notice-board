const express = require('express');
const cors = require('cors');
const path = require('path');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const mongoose = require('mongoose');

const adsRoutes = require('./routes/ads.routes');
const usersRoutes = require('./routes/users.routes');
const authRoutes = require('./routes/auth.routes');

// start express server
const app = express();
const server = app.listen(process.env.PORT || 8000, () => {
  console.log('Server is running on port: 8000');
});

// connect to database
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
  saveUninitialized: false
}));

// serve static files from react app
app.use(express.static(path.join(__dirname, '/client/build')));
// app.use(express.static(path.join(__dirname, '/public')));

// add routes
app.use('/api', require(adsRoutes));
app.use('/api', require(usersRoutes));
app.use('/auth', require(authRoutes));

// at any other link, serve react app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build/index.html'));
  res.sendFile(path.join(__dirname, '/public'));
})

// catching wrong links
app.use((req, res) => {
  res.status(404).send('404 not found...');
});

module.exports = server;