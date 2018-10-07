var express = require('express');
var router = express.Router();
const createError = require('http-errors');

const AC = require('../controllers/AuthController');
const DC = require('../controllers/DriverController');

const driverRouter = require('./driverRouter');

const HttpNotFound = (req, res, next) => {
    return next(createError(404, 'Not Found'));
};

/* GET users listing. */
router.get('/', function(req, res) {
    res.status(200).json({
        message: 'Hello from API'
    });
});

// authentication
router.post('/register', AC.loggedOut, DC.register);
router.post('/login', AC.loggedOut, DC.login);

// request from logged-in user
router.post('/logout', AC.loggedIn, DC.logout);
router.use('/drivers', AC.loggedIn, driverRouter);

// could not find a good route. httpnotfound
router.use(HttpNotFound);

module.exports = router;
