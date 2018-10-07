const JWT = require('jsonwebtoken');
const createError = require('http-errors');

const Token = require('../models/Token');

const AuthController = {
    /**
     * Get user's information from the bearer token
     * Binds 'user' attribute to 'req'
     * req.user = null when missing/invalid bearer token
     */
    getUserData: (req, res, next) => {
        // user did not send a token
        if (!req.token) {
            req.user = null;

            return next();
        } 

        // verify the payload
        // payload contains decoded token
        let payload;
        const jwtSecret = process.env.JWT_SECRET;
        const jwtOptions = {
            ignoreExpiration: false
        };
        
        try {
            payload = JWT.verify(req.token, jwtSecret, jwtOptions);
        } catch (err) {
            // invalid JWT. Ignore it.
            req.user = null;
            
            return next();
        }

        // see if the token exists in database
        Token.findOne({ token: req.token })
            .then( (token) => {
                // no such token exists. user is logged out
                if (!token) {
                    req.user = null;

                    return next();
                }

                // if all is ok, attach the user id to req
                req.user = payload;

                // change the token to its id in token table
                req.token = token._id;

                return next();
            })
            .catch( (err) => {
                return next(err);
            });
    },

    /**
     * Middleware that only allows logged in users to pass
     * Responds:
     *      401: {}     // unauthorized for not logged in users
     */
    loggedIn: (req, res, next) => {
        // user is not logged in?
        if (!req.user) {
            return next(createError(401, 'user not logged in'));
        } else {
            return next();
        }
    },

    /**
     * Middleware that only allows not logged in users to pass
     * Responds:
     *      403: {}     // forbidden for logged in users
     */
    loggedOut: (req, res, next) => {
        // user is logged in?
        if (req.user) {
            return next(createError(403, 'user already logged in'));
        } else {
            return next();
        }
    },
};

module.exports = AuthController;