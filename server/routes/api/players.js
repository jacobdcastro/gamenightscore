const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../../middleware/auth');

const Player = require('../../models/Player');
const Game = require('../../models/Game');

// TODO add gamemaster ability to change/fix others' scores

// @route   POST api/player/:game_id/new
// @desc    Create new player in a game
// access   Private
router.post('/new/:game_id', async (req, res) => {
  const { isGamemaster, name, pin, game } = req.body;

  // make sure username is unique
  let user = await Player.findOne({ name });
  if (user) {
    return res.status(400).json({ errors: [{ msg: 'Username taken' }] });
  }

  const playerData = {
    isGamemaster,
    name,
    pin,
    totalScore: 0,
    connected: true,
  };
  if (game) playerData.game = game;

  try {
    const player = new Player(playerData);

    await player.save();

    const payload = {
      player: {
        id: player.id,
      },
    };

    jwt.sign(
      payload,
      config.get('jwtsecret'),
      { expiresIn: 360000 },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (error) {
    console.log('Server error');
    res.status(500).send('Error with the server. Big oops.');
  }
});

// @route   PUT api/player/:id/score
// @desc    Update player score
// access   Private
router.put('/:game_id/:player_id/score', auth, (req, res) => {
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
