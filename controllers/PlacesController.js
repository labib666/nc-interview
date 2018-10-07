const createError = require('http-errors');

const Place = require('../models/Place');

const PlacesController = {

    register: (req, res, next) => {
        Place.findOne({ $or:[ { Name: req.body.Name } ] })
            .then( (user) => {
                // same username or email exists
                if (user) {
                    return next(createError(409,'username or email already in use'));
                }

                // duplicate does not exist. create new user
                Place.create({
                    Name: req.body.Name
                })
                    .then( (newUser) => {
                        // new user created
                        res.status(200).json({
                            message: 'registration successful',
                            place: newUser._id
                        });
                    })
                    .catch( (err) => {
                        return next(err);
                    });
            })
            .catch( (err) => {
                return next(err);
            });
    },

    getAllPlaces: (req, res, next) => {
        // look up users in db
        Place.find({}, {
            createdAt: false,
            updatedAt: false
        })
            .then( (entries) => {
                let places = [];
                entries.forEach( (user) => {
                    user = user.toObject();
                    places.push(user);
                });

                // reply with the user profiles
                res.status(200).json({
                    message: 'successfully retrieved users',
                    places: places
                });
            })
            .catch( (err) => {
                return next(err);
            });
    },
    
};

module.exports = PlacesController;
