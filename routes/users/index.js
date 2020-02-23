const express = require('express');
const router = express.Router();
const passport = require('passport');

const userController = require('./indexController');

router
    .get('/:id', passport.authenticate('jwt', { session: false }), userController.getOneUser)

module.exports = router;