const express = require('express');
const router = express.Router();
const passport = require('passport');
const indexController = require('./indexController');

router
    .post('/login', indexController.login)
    .post('/signup', indexController.signup)

module.exports = router;