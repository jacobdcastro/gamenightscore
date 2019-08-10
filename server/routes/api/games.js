const express = require('express');
const router = express.Router();

const Player = require('../../models/Player');

// @route   POST api/game/new
// @desc    Create new game
// access   Public
router.post('/new', async (req, res) => {
  try {
    const game = new Game({
      title: req.body.title,
      password: req.body.password,
      expired: false,
      players: [],
      date: Date.now(),
    });

    await game.save();
    res.json(game);
  } catch (error) {
    console.log('Server error');
    res.status(500).send('Error with the server. Big oops.');
  }
});

// @route   GET api/game/new
// @desc    Get all games
// access   Public
router.get('/', async (req, res) => {
  try {
    const allGames = await Game.find().populate('game', ['title', 'players']);

    res.json(allGames);
  } catch (error) {
    console.log('Server error');
    res.status(500).send('Error with the server. Big oops.');
  }
});

module.exports = router;
