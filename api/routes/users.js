const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator/check');

const { SECRET } = require('../utils/constants');
const User = require('../models/User');

router.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});


// @route  POST api/users/register
// @desc   Register User
// @access Public
router.post('/register',
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

        // Creates a new user
        user = new User({
            email,
            password
        });

        if (user.email.includes('@hackeryou.com')) user.isAdmin = true;

        // Encrypt password using bcrypt
        const salt = await bcrypt.genSalt(10);

        user.password = await bcrypt.hash(password, salt);

        const payload = {
            user: {
                id: user.id
            }
        }

        // Get JWT with userId
        const token = jwt.sign(
            payload,
            SECRET,
            { expiresIn: (60*60*24*365) }, // expires in 90 days // TODO add a refresh
        );

        user.token = token;


        await user.save();

        // send token back
        res.status(201).json({
            token
        });
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server error');
    }
});

// @route  POST api/users/login
// @desc   Login User
// @access Public
router.post('/login',
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
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ errors: [{ msg: 'Email invalid.' }] });
        }
        const match = await user.comparePassword(password);
        if (match) {
            // send token back
            res.status(200).json({
               user
            });
        } else {
            return res.status(400).json({ errors: [{ msg: 'Password invalid.' }] });
        }

    } catch (err) {
        console.log(err.message);
        res.status(400).json({ errors: [{ msg: 'Login failed.' }] });
    }
});

// test get
router.get('/', (req, res) => {
    return res.send('Receiving shit in api/users here.');
});


module.exports = router;
