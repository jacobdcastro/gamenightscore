const mongoose = require('mongoose');

const GameSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  players: [
    {
      player: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'player',
      },
      rank: {
        type: Number,
      },
    },
  ],
  maxNumberOfRounds: {
    type: Number,
  },
  rounds: [
    {
      roundNumber: {
        type: Number,
        required: true,
      },
      inProgress: {
        type: Boolean,
        required: true,
      },
      duration: {
        type: Date,
        default: Date.now,
      },
      winner: {
        player: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'player',
        },
      },
      playerScores: [
        {
          player: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'player',
          },
          roundScore: {
            type: Number,
            required: true,
          },
        },
      ],
    },
  ],
  hideScores: {
    type: Boolean,
    default: false,
  },
  startTime: {
    type: Date,
    default: Date.now,
  },
  endTime: {
    type: Date,
    default: Date.now,
  },
  expired: {
    type: Boolean,
  },
});

module.exports = Game = mongoose.model('game', GameSchema);
