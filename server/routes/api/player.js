const express = require('express');
const router = express.Router();

const Player = require('../../models/Player');

// @route   POST api/player/new
// @desc    Create new player
// access   Public
router.post('/new', async (req, res) => {
  // ? make sure username is unique
  let user = await Player.findOne({ username });
  if (user) {
    return res.status(400).json({ errors: [{ msg: 'Username taken' }] });
  }

  const { username, score, online, game, isGamemaster } = req.body;

  const playerData = { username, score, online, isGamemaster, time };
  if (game) playerData.game = game;

  try {
    const player = new Player(playerData);

    await player.save();

    player.save();
    res.json(player);
  } catch (error) {
    console.log('Server error');
    res.status(500).send('Error with the server. Big oops.');
  }
});

// @route   PUT api/player/:id/score
// @desc    Update player score
// access   Private
router.put('/:game_id/:player_id/score', (req, res) => {
  try {
    const hello = 'Hello world';
    res.json(hello);
  } catch (error) {
    console.log('Server error');
    res.status(500).send('Error with the server. Big oops.');
  }
});

// @route   PUT api/player/:id/username
// @desc    Update player score
// access   Private

module.exports = router;
