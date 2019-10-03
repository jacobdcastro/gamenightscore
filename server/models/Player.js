const mongoose = require('mongoose');

const PlayerSchema = new mongoose.Schema({
  isGamemaster: {
    type: Boolean,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  pin: {
    type: Number,
    required: true,
  },
  totalScore: {
    type: Number,
    required: true,
  },
  connected: {
    type: Boolean,
  },
  game: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  roundsPlayed: [
    {
      round: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'player',
      },
      roundScore: {
        type: Number,
        required: true,
      },
    },
  ],
});

module.exports = Player = mongoose.model('player', PlayerSchema);
