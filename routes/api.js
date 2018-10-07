var express = require('express');
var router = express.Router();
const createError = require('http-errors');

const DC = require('../controllers/DriverController');

const driverRouter = require('./driverRouter');
const placesRouter = require('./placesRouter');

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
router.post('/register', DC.register);

router.use('/drivers', driverRouter);
router.use('/places', placesRouter);

// could not find a good route. httpnotfound
router.use(HttpNotFound);

module.exports = router;
