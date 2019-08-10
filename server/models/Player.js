const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PlayerSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  score: {
    type: Number,
    required: true,
  },
  online: {
    type: Boolean,
  },
  game: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  isGamemaster: {
    type: Boolean,
  },
  time: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('players', PlayerSchema);
