const mongoose = require('mongoose');
const PlayerSchema = require('./Player');
const RoundSchema = require('./Round');

const GameSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  players: [PlayerSchema],
  maxNumberOfRounds: {
    type: Number,
    default: null,
  },
  rounds: [RoundSchema],
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

// GameSchema.methods.addPlayer(function(playerId) {});

module.exports = Game = mongoose.model('Game', GameSchema);
