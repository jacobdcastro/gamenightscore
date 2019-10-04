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
  roundsPlayed: [
    {
      roundScore: {
        type: Number,
        required: true,
      },
      round: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Round',
      },
    },
  ],
});

module.exports = PlayerSchema;
