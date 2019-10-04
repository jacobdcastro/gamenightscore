const express = require('express');
const connectDB = require('./config/db');
// const bodyParser = require('body-parser');
const config = require('config');
// const Pusher = require('pusher');
// const pusherConfig = config.get('pusher');

const app = express();

// // Connect Pusher for live db streams
// const pusher = new Pusher({
//   ...pusherConfig,
// });

// Connect Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.send('GameNight Score API Running Properly!'));

// Define routes
app.use('/api/games', require('./routes/api/games'));

const PORT = process.env.PORT || 1111;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
