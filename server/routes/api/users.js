const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

// Import User schema
const User = require('../../models/User');

// @route   POST api/users
// @desc    Register user
// access   Public
router.post(
  '/',
  [
    check('username', 'Name is required')
      .not()
      .isEmpty(),
    check('passcode', 'Please enter a password'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { fullName, username, email, password, time } = req.body;

    try {
      let user = await User.findOne({ username });
      if (user) {
        return res.status(400).json({ errors: [{ msg: 'Username taken' }] });
      }

      user = await User.findOne({ email });
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Email already exists' }] });
      }

      // Create new instance of user with User schema
      user = new User({
        fullName,
        username,
        email,
        password,
        time,
      });

      // Encrypt their password
      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const payload = {
        user: {
          id: user.id,
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
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error!');
    }
  }
);

module.exports = router;
