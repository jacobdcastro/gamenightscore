const express = require('express');
const router = express.Router();

const Game = require('../../models/Game');

// @route   POST api/games/new
// @desc    Create new game
// access   Public
router.post('/new', async (req, res) => {
  try {
    const game = new Game({
      title: req.body.title,
      password: req.body.password,
      players: [],
      maxNumberOfRounds: req.body.maxNumberOfRounds,
      rounds: [
        {
          roundNumber: 1,
          inProgress: false,
          duration: '',
          winner: '',
          playerScores: [],
        },
      ],
      hideScores: req.body.hideScores,
      startTime: Date.now(),
      endTime: Date.now(),
      expired: false,
    });

    await game.save();
    res.json(game);
  } catch (error) {
    console.log('Server error');
    res.status(500).send('Error with the server. Big oops.');
  }
});

// @route   POST api/games/:game_id/joinGame
// @desc    Initial player joins game (for jwt)
// access   Public
router.post(':game_id/joinGame', async (req, res) => {
  try {
  } catch (error) {}
});

// @route   PUT api/games/:game_id/newRound
// @desc    Add new round to game
// access   Private
router.put('/:game_id/newRound', async (req, res) => {
  try {
    const roundData = {};

    await game.save();
  } catch (error) {
    console.log('Server Error', error);
    res.status(500).send('Error with server. Big oops.');
  }
});

// TODO add feature later
// @route   GET api/games
// @desc    Search all games
// access   Public
router.get('/', async (req, res) => {
  try {
    const allGames = await Game.find();
    res.json(allGames);
  } catch (error) {
    console.log('Server Error', error);
    res.status(500).send('Error with server. Big oops.');
  }
});

module.exports = router;
