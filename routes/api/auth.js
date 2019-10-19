const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const config = require('config');

// TODO 1. add checks to see if game is expired. Deny write access if it is

// @route   POST api/auth/
// @desc    Get JWT for init player state
// access   Public
router.post('/auth', async (req, res) => {
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
      { expiresIn: 360000 },
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
