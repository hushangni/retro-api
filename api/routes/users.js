const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator/check');

const { SECRET } = require('../utils/constants');
const User = require('../models/User');
// @route  POST api/users
// @desc   Register User
// @access Public
router.post('/',
[
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 })
], async (req, res) => {
    const errors = validationResult(req);
    // If there are errors, handle.
    // Send back the error messages, can handle in front end
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        // If user exists
        let user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({ errors: [{ msg: 'User already exists' }] });
        }

        // Check if user should be admin based on email
        // TODO
        ////////

        // Creates a new user
        user = new User({
            email,
            password
        });

        // Encrypt password using bcrypt
        // more gensalt more secure but could take longer
        const salt = await bcrypt.genSalt(10);

        // Creates a hash
        user.password = await bcrypt.hash(password, salt);

        await user.save();

        const payload = {
            user: {
                id: user.id
            }
        }

        // Get JWT with userId
        jwt.sign(
            payload,
            SECRET,
            { expiresIn: 360000 },
            (err, token) => {
                if (err) throw err;
                res.json({ token });
            }
        );
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server error');
    }
});

// test get
router.get('/', (req, res) => {
    return res.send('Receiving shit in api/users here.');
});


module.exports = router;
