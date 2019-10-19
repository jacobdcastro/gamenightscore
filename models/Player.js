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
  deck: {
    type: String,
  },
  roundsPlayed: [
    {
      round: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Round',
      },
      roundNumber: {
        type: Number,
        required: true,
      },
      roundScore: {
        type: Number,
        required: true,
      },
    },
  ],
});

module.exports = PlayerSchema;
