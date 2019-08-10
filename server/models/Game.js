const mongoose = require('mongoose');
const Schema = mongoose.Schema();

const GameSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  expired: {
    type: Boolean,
  },
  players: [
    {
      player: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'player',
      },
      position: {
        type: Number,
      },
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('games', GameSchema);
