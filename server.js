require('dotenv').config({ path: '.env' });
const express = require('express');
const connectDB = require('./config/db');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
const Pusher = require('pusher');
const Sentry = require('@sentry/node');
const PORT = process.env.PORT;

const app = express();

// Connect Sentry
Sentry.init({
  dsn: 'https://6e65f2d201604f81982f7b44aac823f1@sentry.io/1807897',
});

// Configure Pusher
const channel = 'games';
const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_APP_KEY,
  secret: process.env.PUSHER_APP_SECRET,
  cluster: process.env.PUSHER_APP_CLUSTER,
  useTLS: true,
});

// Connect MongoDB Database
connectDB();

// Init Middleware
app.use(Sentry.Handlers.requestHandler());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  next();
});

// Define API route
app.use('/api/games', require('./routes/api/games'));

// point to static folder
app.use(express.static(path.join(__dirname, 'client', 'build')));

// Sentry test route, purposely throws error
app.get('/debug-sentry', (req, res) => {
  throw new Error('Sentry error test');
});

// Catch all routes to index.html in react app
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});

// Sentry Error Handler
app.use(Sentry.Handlers.errorHandler());

// Once mongo database is open, start listening at port
// and connect the db collection to pusher to watch for changes
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Connection Error'));

db.once('open', () => {
  app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

  const taskCollection = db.collection('games');
  const changeStream = taskCollection.watch();
  if (changeStream) console.log('Pusher connected!!');

  changeStream.on('change', change => {
    if (change.operationType === 'insert') {
      const game = change.fullDocument;
      pusher.trigger(channel, 'inserted', {
        game,
      });
    } else if (change.operationType === 'delete') {
      pusher.trigger(channel, 'deleted', change.documentKey._id);
    } else if (change.operationType === 'update') {
      const { updateDescription } = change;
      pusher.trigger(channel, 'updated', updateDescription);
    }
  });
});
