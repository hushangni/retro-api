const express = require('express');
const router = express.Router();

// @route  POST api/users
// @desc   Register User
// @access Public
router.post('/', (req, res) => {

    return res.send("Posting posting");
})


router.get('/', (req, res) => {
    return res.send('Received a GET HTTP method');
});


module.exports = router;
