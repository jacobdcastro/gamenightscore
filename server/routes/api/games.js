const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../../middleware/auth');
const _ = require('lodash');

const Game = require('../../models/Game');
const Player = require('../../models/Player');
const Round = require('../../models/Round');

// TODO add checks to see if game is expired. Deny write access if it is
// TODO add function to end game after final round

// @route   POST api/games/new
// @desc    Create new game
// access   Public
router.post('/new', async (req, res) => {
  const { title, password, maxNumberOfRounds, hideScores } = req.body;
  // create empty first round skeleton
  const firstRound = {
    roundNumber: 1,
    inProgress: false,
    startTime: null,
    endTime: null,
    winner: null,
    playerScores: [],
  };

  try {
    // create game skeleton
    const game = new Game({
      title: title,
      password: password,
      players: [],
      maxNumberOfRounds: maxNumberOfRounds,
      currentRound: null,
      rounds: [],
      hideScores: hideScores,
      startTime: null,
      endTime: null,
      expired: false,
    });
    await game.rounds.push(firstRound); // add new round to [Rounds] to create id
    game.currentRound = game.rounds[0]._id; // grab first round id and set as currentRound
    await game.save(); // save it all

    const payload = {
      game: {
        id: game._id,
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
// @desc    Add new round to game ("go to next round")
// access   Private
router.post('/:game_id/newRound', auth, async (req, res) => {
  const gameId = req.params.game_id;
  const game = await Game.findById(gameId);

  // check for any players who haven't submitted scores
  const scoredPlayers = game.players.filter(p =>
    p.roundsPlayed.find(r => r.round === game.currentRound)
  );
  if (scoredPlayers.length !== game.players.length)
    res.status(406).send('Not all players have submitted their scores');

  const playerScores = await game.players.map(p => {
    return {
      id: p._id,
      name: p.name,
      roundScore: 0,
    };
  });

  const roundData = {
    roundNumber: game.currentRound + 1,
    inProgress: false,
    startTime: null,
    endTime: null,
    winner: null,
    playerScores, // array of player id's and scores
  };

  try {
    await game.rounds.push(roundData);
    game.currentRound = game.currentRound + 1;
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
  const { startTime } = req.body;
  try {
    const game = await Game.findById(gameId);
    const currentRound = game.rounds.id(game.currentRound);

    currentRound.inProgress = true;
    currentRound.startTime = startTime;

    await game.save();
    console.log(currentRound);
    res.json('Begin!');
  } catch (error) {
    console.log('Server Error', error);
    res.status(500).send('Error with server. Big oops.');
  }
});

// @route   PUT api/games/:game_id/endRound
// @desc    End current round
// access   Private
router.put('/:game_id/endRound', auth, async (req, res) => {
  const gameId = req.params.game_id;
  const { endTime, winnerId } = req.body;
  try {
    const game = await Game.findById(gameId);
    const currentRound = game.rounds.id(game.currentRound);
    const winner = game.players.id(winnerId);

    currentRound.inProgress = false;
    currentRound.endTime = Date.now();
    currentRound.winner = winner;

    await game.save();
    const msg = `Congrats, ${winner.name} has won round ${currentRound.roundNumber}!!!`;
    res.json({ game, msg });
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
    const { currentRound } = game;

    // 1. find player in players array
    const player = await game.players.id(playerId);

    // 2. add total score
    player.totalScore += roundScore;

    // 3. update roundsPlayed array
    player.roundsPlayed.push({ round: currentRound, roundScore });

    // 4. update playerScores in Round document
    const round = game.rounds.id(currentRound);
    round.playerScores.push({ player: playerId, roundScore });

    await game.save();
    res.json(game);
  } catch (error) {
    console.log('Server Error', error);
    res.status(500).send('Error with server. Big oops.');
  }
});

// @route   PUT api/games/:game_id/players/:player_id/postScore
// @desc    Edit/adjust player score (in case of mistake)
// access   Private
// ? just won't push the new round

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

// @route   DELETE api/games
// @desc    Delete a game
// access   Private

module.exports = router;
