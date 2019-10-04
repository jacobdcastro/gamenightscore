const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../../middleware/auth');

const Game = require('../../models/Game');
const Player = require('../../models/Player');
const Round = require('../../models/Round');

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
          winner: {},
          playerScores: [],
        },
      ],
      hideScores: req.body.hideScores,
      startTime: Date.now(),
      endTime: Date.now(),
      expired: false,
    });

    await game.save();

    const payload = {
      game: {
        id: game.id,
      },
    };

    // once new game is created, return jwt to game creator so they can properly create player in private route
    jwt.sign(
      payload,
      config.get('jwtsecret'),
      { expiresIn: 360000 },
      (err, token) => {
        if (err) throw err;
        res.json({ token, game });
      }
    );
  } catch (error) {
    console.log('Server error');
    res.status(500).send('Error with the server. Big oops.');
  }
});

// @route   POST api/games/:game_id/newPlayer
// @desc    Create new player in a game
// access   Private
router.post('/:game_id/newPlayer', auth, async (req, res) => {
  let { isGamemaster, name, pin } = req.body;
  const gameId = req.params.game_id;

  // make sure username is unique
  const game = await Game.findById(gameId);
  const playerWithSameName = game.players.find(p => p.name === name);

  if (playerWithSameName) {
    return res.status(400).json({ errors: [{ msg: 'Name taken' }] });
  }

  const playerData = {
    isGamemaster,
    name,
    pin,
    totalScore: 0,
    connected: true,
    roundsPlayed: [],
  };

  try {
    const game = await Game.findById(gameId);

    await game.players.push(playerData);
    await game.save();

    let newPlayer = game.players.find(p => p.name === name);
    console.log(newPlayer);

    const payload = {
      player: {
        id: newPlayer._id,
      },
    };

    jwt.sign(
      payload,
      config.get('jwtsecret'),
      { expiresIn: 360000 },
      (err, token) => {
        if (err) throw err;
        res.json({ token, player: newPlayer });
      }
    );
  } catch (error) {
    console.log('Server error');
    res.status(500).send('Error with the server. Big oops.');
  }
});

// @route   POST api/games/:game_id/newRound
// @desc    Add new round to game
// access   Private
router.post('/:game_id/newRound', auth, async (req, res) => {
  const { roundNumber } = req.body;
  const gameId = req.params.game_id;

  const game = await Game.findById(gameId);
  const playerScores = await game.players.map(p => {
    return {
      id: p._id,
      name: p.name,
      roundScore: 0,
    };
  });

  const roundData = {
    roundNumber,
    inProgress: false,
    startTime: null,
    endTime: null,
    winner: {},
    playerScores, // array of player id's and scores
  };

  try {
    await game.rounds.push(roundData);
    await game.save();
    res.json(roundData);
  } catch (error) {
    console.log('Server Error', error);
    res.status(500).send('Error with server. Big oops.');
  }
});

// @route   PUT api/games/:game_id/startRound
// @desc    Start new round
// access   Private
router.put('/:game_id/startRound', auth, async (req, res) => {
  const gameId = req.params.game_id;
  try {
    const game = await Game.findById(gameId);
    game.rounds[game.rounds.length - 1].inProgress = true;
    game.rounds[game.rounds.length - 1].startTime = Date.now();
    await game.save();
    console.log(game.rounds[game.rounds.length - 1]);
    res.json('Begin!');
  } catch (error) {
    console.log('Server Error', error);
    res.status(500).send('Error with server. Big oops.');
  }
});

// @route   PUT api/games/:game_id/endRound
// @desc    Start new round
// access   Private
router.put('/:game_id/endRound', auth, async (req, res) => {
  const gameId = req.params.game_id;
  try {
    const game = await Game.findById(gameId);
    game.rounds[game.rounds.length - 1].inProgress = false;
    game.rounds[game.rounds.length - 1].endTime = Date.now();
    await game.save();
    res.json('round ended');
    console.log(game.rounds[game.rounds.length - 1]);
  } catch (error) {
    console.log('Server Error', error);
    res.status(500).send('Error with server. Big oops.');
  }
});

// @route   PUT api/games/:game_id/players/:player_id/postScore
// @desc    Update current player's score
// access   Private
router.put('/:game_id/players/:player_id/postScore', auth, async (req, res) => {
  const { roundScore } = req.body;
  const gameId = req.params.game_id;
  const playerId = req.params.player_id;

  try {
    const game = await Game.findById(gameId);
    // 1. find player in players array
    // 2. update roundsPlayed array and add total score
    // 3. update playerScores in Round document

    // ! await game.players.find(p => p._id === playerId) = roundScore ;

    await game.save();
    res.json(player);
  } catch (error) {
    console.log('Server Error', error);
    res.status(500).send('Error with server. Big oops.');
  }
});

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
