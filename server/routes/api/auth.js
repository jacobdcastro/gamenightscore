const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const config = require('config');

// @route   GET api/auth
// @desc    Get JWT for init player state
// access   Public
router.get('/', async (req, res) => {
  try {
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
        res.json({ token });
      }
    );
  } catch (error) {
    console.log('Server error');
    res.status(500).send('Error with the server. Big oops.');
  }
});
