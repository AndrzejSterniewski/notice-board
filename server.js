const express = require('express');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');

const adsRoutes = require('./routes/ads.routes');
const usersRoutes = require('./routes/users.routes');

// start express server
const app = express();
const server = app.listen('8000', () => {
  console.log('Server is running on port: 8000');
});
//////////////////////

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//// routes
app.use('/api', adsRoutes);
app.use('/api', usersRoutes);
//////////////////////

app.use(express.static(path.join(__dirname, '/public')));

app.use((req, res, next) => {
  res.show = (name) => {
    res.sendFile(path.join(__dirname, `/views/${name}`));
  };
  next();
});

app.get('/', (req, res) => {
  res.show('home.html');
});

// database connection
mongoose.connect('mongodb://0.0.0.0:27017/noticeBoardDB', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.once('open', () => {
  console.log('Connected to the database');
});
db.on('error', err => console.log('Error ' + err));
//////////////////////

// catching wrong links
app.use((req, res) => {
  res.status(404).send('404 not found...');
});

module.exports = server;