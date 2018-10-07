var express = require('express');
var router = express.Router();
const createError = require('http-errors');

const AC = require('../controllers/AuthController');
const UC = require('../controllers/UserController');

const userRouter = require('./userRouter');

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
router.post('/register', AC.loggedOut, UC.register);
router.post('/login', AC.loggedOut, UC.login);

// request from logged-in user
router.post('/logout', AC.loggedIn, UC.logout);
router.use('/users', AC.loggedIn, userRouter);

// could not find a good route. httpnotfound
router.use(HttpNotFound);

module.exports = router;
