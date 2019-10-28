const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
// const _ = require('lodash');

const Game = require('../../models/Game');

// TODO 1. add checks to see if game is expired. Deny write access if it is

// @route   POST api/games/auth/sign
// @desc    Sign JWT for init player state
// access   Public
router.post('/auth/sign', async (req, res) => {
  const { gameId, isGamemaster } = req.body;

  try {
    const payload = {
      gameId: gameId,
      isGamemaster: isGamemaster,
    };

    // once new game is created, return jwt to game creator so they can properly create player in private route
    jwt.sign(
      payload,
      config.get('jwtsecret'),
      { expiresIn: 60 * 60 },
      (err, token) => {
        if (err) throw err;
        res.status(200).json({ token, ...payload });
      }
    );
  } catch (error) {
    console.log('Server error');
    res.status(500).send('Error with the server. Big oops.');
  }
});

// @route   POST api/games/auth/pusher
// @desc    Authenticate connected to pusher presence channel
// access   Public
router.post('/auth/pusher', async (req, res) => {
  const { socket_id, channel_name } = req.body;

  try {
    const presenceData = {
      user_id: 'unique_user_id',
      user_info: {
        name: 'Mr Channels',
        twitter_id: '@pusher',
      },
    };
    const auth = await pusher.authenticate(
      socket_id,
      channel_name,
      presenceData
    );
    res.send(auth);
  } catch (error) {
    console.log('Server error');
    res.status(500).send('Error with the server. Big oops.');
  }
});

// @route   POST api/games/new
// @desc    Create new game
// access   Public
router.post(
  '/new',
  [
    check('title', 'Title is required')
      .not()
      .isEmpty(),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 }),
    check(
      'maxNumberOfRounds',
      'Please choose at least one round and at most 50'
    ).isLength({ min: 1, max: 50 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, password, maxNumberOfRounds, hideScores } = req.body;

    try {
      // create game skeleton
      const game = new Game({
        title,
        password,
        players: [],
        maxNumberOfRounds,
        currentRound: null,
        rounds: [],
        hideScores,
        startTime: null,
        endTime: null,
        expired: false,
      });

      // create empty first round skeleton
      const firstRound = {
        roundNumber: 1,
        startTime: null,
        endTime: null,
        winner: null,
        playerScores: [],
        inProgress: false,
        finished: false,
        allGmPlayersScoresSubmitted: false,
        allScoresSubmitted: false,
        newRoundReady: false,
      };
      await game.rounds.push(firstRound); // add new round to [Rounds] to create id
      game.currentRound = game.rounds[0]._id; // grab first round id and set as currentRound
      await game.save(); // save it all
      res.json(game);
    } catch (error) {
      console.log('Server error');
      res.status(500).send('Error with the server. Big oops.');
    }
  }
);

// @route   GET api/games/join
// @desc    Join a game
// access   Public
router.post(
  '/join',
  [
    check('title', 'Title is required')
      .not()
      .isEmpty(),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { title, password } = req.body;

    try {
      const gameByTitle = await Game.findOne({ title: title });
      const gameByPassword = await Game.findOne({ password: password });
      const game = await Game.findOne({ title: title, password: password });

      if (!gameByTitle && !gameByPassword) {
        return res.status(404).send('Both title and password are incorrect');
      } else if (!gameByTitle && gameByPassword) {
        return res.status(404).send('Title is incorrect');
      } else if (gameByTitle && !gameByPassword) {
        return res.status(401).send('Password is incorrect');
      } else if (gameByTitle && gameByPassword && game.players.length === 8) {
        return res.status(401).send('Game is full!');
      } else if (game) {
        res.json(game);
      } else {
        console.log('Something went wrong...');
        res.status(500).send('Error with the server. Big oops.');
      }
    } catch (error) {
      console.log('Server error');
      res.status(500).send('Error with the server. Big oops.');
    }
  }
);

// @route   POST api/games/:game_id/newPlayer
// @desc    Create new player in a game
// access   Private
router.post('/:game_id/newPlayer', async (req, res) => {
  let { isGamemaster, name, gmCreated, deck } = req.body;
  const gameId = req.params.game_id;
  const game = await Game.findById(gameId);

  // if game is expired, deny acces
  if (game.expired)
    return res.status(405).json({ errors: [{ msg: 'Game is expired' }] });

  // check if game is full
  if (game.players.length === 8)
    return res
      .status(405)
      .json({ errors: [{ msg: 'Already 8 players in this game' }] });

  // make sure username is unique
  const playerWithSameName = game.players.find(p => p.name === name);
  if (playerWithSameName) {
    return res.status(400).json({ errors: [{ msg: 'Name taken' }] });
  }

  const playerData = {
    isGamemaster,
    name,
    totalScore: 0,
    connected: true,
    gmCreated,
    deck,
    roundsPlayed: [],
  };

  try {
    const game = await Game.findById(gameId);

    await game.players.push(playerData);
    await game.save();

    let newPlayer = game.players.find(p => p.name === name);

    res.json(newPlayer);
  } catch (error) {
    console.log('Server error');
    res.status(500).send('Error with the server. Big oops.');
  }
});

// @route   GET api/games/:game_id/newRound
// @desc    Add new round to game ("go to next round")
// access   Private
router.get('/:game_id/newRound', auth, async (req, res) => {
  const gameId = req.params.game_id;
  const game = await Game.findById(gameId);
  let round = game.rounds.id(game.currentRound);

  // if game is expired, deny acces
  if (game.expired)
    return res.status(405).json({ errors: [{ msg: 'Game is expired' }] });

  // check for any players who haven't submitted scores
  if (round.playerScores.length !== game.players.length)
    res.status(406).send('Not all players have submitted their scores');

  const roundData = {
    roundNumber: round.roundNumber + 1,
    startTime: null,
    endTime: null,
    winner: null,
    playerScores: [], // array of player id's and scores
    inProgress: false,
    finished: false,
    allGmPlayersScoresSubmitted: false,
    allScoresSubmitted: false,
    newRoundReady: false,
  };

  try {
    await game.rounds.push(roundData);
    const newCurrentRound = game.rounds[game.rounds.length - 1];
    game.currentRound = newCurrentRound._id;

    await game.save();
    res.json(game);
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
  const game = await Game.findById(gameId);

  // if game is expired, deny acces
  if (game.expired)
    return res.status(405).json({ errors: [{ msg: 'Game is expired' }] });

  try {
    const currentRound = game.rounds.id(game.currentRound);

    currentRound.inProgress = true;
    currentRound.startTime = startTime;

    await game.save();
    console.log(currentRound);
    res.json(game);
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
  const { endTime } = req.body;
  const game = await Game.findById(gameId);

  // if game is expired, deny access
  if (game.expired)
    return res.status(405).json({ errors: [{ msg: 'Game is expired' }] });

  try {
    const currentRound = game.rounds.id(game.currentRound);

    currentRound.inProgress = false;
    currentRound.finished = true;
    currentRound.endTime = endTime;

    await game.save();
    res.json(game);
  } catch (error) {
    console.log('Server Error', error);
    res.status(500).send('Error with server. Big oops.');
  }
});

// @route   PUT api/games/:game_id/setRoundWinner
// @desc    Set winner in round data
// access   Private
router.put('/:game_id/setRoundWinner', auth, async (req, res) => {
  const gameId = req.params.game_id;
  const { winnerId } = req.body;
  const game = await Game.findById(gameId);

  // if game is expired, deny access
  if (game.expired)
    return res.status(405).json({ errors: [{ msg: 'Game is expired' }] });

  try {
    const currentRound = game.rounds.id(game.currentRound);

    currentRound.winner = winnerId;
    currentRound.newRoundReady = true;

    await game.save();
    res.json(game);
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
  const game = await Game.findById(gameId);

  // if game is expired, deny acces
  if (game.expired)
    return res.status(405).json({ errors: [{ msg: 'Game is expired' }] });

  if (!playerId)
    return res.status(401).json({ errors: [{ msg: 'phantom request...' }] });

  try {
    const { currentRound } = game;

    // 1. find current player and round in game
    const player = await game.players.id(playerId);
    const round = await game.rounds.id(currentRound);

    // 2. add total score
    player.totalScore += parseInt(roundScore);

    // 3. update roundsPlayed array
    player.roundsPlayed.push({
      round: currentRound,
      roundNumber: round.roundNumber,
      roundScore,
    });

    // 4. update playerScores in Round document
    round.playerScores.push({ player: playerId, roundScore });

    // 5. sort players array based on standings
    game.players.sort((a, b) => b.totalScore - a.totalScore);

    // 6. check if gm has submitted all scores for gmCreated players
    let gmCreatedPlayersIds = [];
    let gmCreatedPlayersScored = [];
    const gmCreatedPlayers = game.players.filter(p => p.gmCreated === true);
    gmCreatedPlayers.map(p => gmCreatedPlayersIds.push(p._id));

    gmCreatedPlayersIds.forEach(id => {
      let foundPlayer = round.playerScores.find(
        p => id.toString() === p.player.toString()
      );
      if (foundPlayer) gmCreatedPlayersScored.push(foundPlayer);
    });

    if (gmCreatedPlayersIds.length === gmCreatedPlayersScored.length) {
      round.allGmPlayersScoresSubmitted = true;
    }

    // 7. check if all players have submitted scores
    if (game.players.length === round.playerScores.length) {
      round.allScoresSubmitted = true;
    }

    await game.save();
    res.json(game);
  } catch (error) {
    console.log('Server Error', error);
    res.status(500).send('Error with server. Big oops.');
  }
});

// @route   PUT api/games/:game_id/endGame
// @desc    End a game
// access   Private
router.put(':game_id/endGame', auth, async (req, res) => {
  router.get('/:game_id', async (req, res) => {
    const game = await Game.findById(req.params.game_id);
    let round = game.rounds.id(game.currentRound);

    // check for any players who haven't submitted scores
    if (round.playerScores.length !== game.players.length)
      res.status(406).send('Not all players have submitted their scores');

    try {
      game.endTime = Date.now();
      game.expired = true;
      game.save();
      res.json(game);
    } catch (error) {
      console.log('Server Error', error);
      res.status(500).send('Error with server. Big oops.');
    }
  });
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

// @route   GET api/games/:game_id
// @desc    Get single game data
// access   Public
router.get('/:game_id', async (req, res) => {
  try {
    const game = await Game.findById(req.params.game_id);
    res.json(game);
  } catch (error) {
    console.log('Server Error', error);
    res.status(500).send('Error with server. Big oops.');
  }
});

// @route   DELETE api/games
// @desc    Delete a game
// access   Private

module.exports = router;
