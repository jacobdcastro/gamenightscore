const express = require('express');
const connectDB = require('./config/db');
const bodyParser = require('body-parser');
const config = require('config');
const mongoose = require('mongoose');
const Pusher = require('pusher');
const pusherConfig = config.get('pusher');

const app = express();

// Configure pusher to connect
const channel = 'games';
const pusher = new Pusher({
  ...pusherConfig,
});

// Connect Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  next();
});

app.get('/', (req, res) => res.send('GameNight Score API Running Properly!'));

// Define routes
app.use('/api/games', require('./routes/api/games'));

const PORT = process.env.PORT || 1111;

// Once mongo database is open, start listening at post 111
// and connect the db collection to pusher to watch for changes
const db = mongoose.connection;

// db.once('open', () => {
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

//   const taskCollection = db.collection('games');
//   const changeStream = taskCollection.watch();

//   changeStream.on('change', change => {
//     console.log(change);

//     if (change.operationType === 'insert') {
//       const task = change.fullDocument;
//       pusher.trigger(channel, 'inserted', {
//         id: task._id,
//         task: task.task,
//       });
//     } else if (change.operationType === 'delete') {
//       pusher.trigger(channel, 'deleted', change.documentKey._id);
//     }
//   });
// });
