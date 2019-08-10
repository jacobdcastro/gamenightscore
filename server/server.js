const express = require('express');
const connectDB = require('./config/db');
const bodyParser = require('body-parser');
const config = require('config');
const Pusher = require('pusher');

const app = express();
const pusherConfig = config.get('pusher');

// Connect Pusher for live db streams
const pusher = new Pusher({
  ...pusherConfig,
});

// Connect Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.send('GameNight Score API Running Properly!'));

// Define routes
app.use('/api/game', require('./routes/api/game'));
app.use('/api/player', require('./routes/api/player'));
app.use('/api/user', require('./routes/api/user'));

const PORT = process.env.PORT || 1111;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
