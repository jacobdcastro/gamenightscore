const mongoose = require('mongoose');

const RoundSchema = new mongoose.Schema({
  roundNumber: {
    type: Number,
    required: true,
  },
  inProgress: {
    type: Boolean,
    required: true,
  },
  startTime: {
    type: Date,
    default: Date.now,
  },
  endTime: {
    type: Date,
    default: Date.now,
  },
  winner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Player',
  },
  playerScores: [
    {
      player: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Player',
      },
      roundScore: {
        type: Number,
        required: true,
      },
    },
  ],
});

module.exports = RoundSchema;
