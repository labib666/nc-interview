const createError = require('http-errors');

const User = require('../models/Driver');

const UserController = {
    
    register: (req, res, next) => {
        User.findOne({ $or:[ { phone: req.body.phone } ] })
            .then( (user) => {
                // same username or email exists
                if (user) {
                    return next(createError(409,'username or email already in use'));
                }

                // duplicate does not exist. create new user
                User.create({
                    username : req.body.username,
                    phone : req.body.phone,
                    fair_per_kilo : req.body.fair_per_kilo,
                    Cartype : req.body.Cartype,
                    Carnumber : req.body.Carnumber,
                    No_of_passengers : req.body.No_of_passengers,
                    CurrentLocation : req.body.CurrentLocation,
                    No_of_times_fined : 0,
                    Sum_of_fines : 0,
                    Rating : 5.0
                })
                    .then( (newUser) => {
                        // new user created
                        res.status(200).json({
                            message: 'registration successful',
                            user: newUser._id
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

    getAllProfiles: (req, res, next) => {
        // look up users in db
        User.find({}, {
            createdAt: false,
            updatedAt: false
        })
            .then( (entries) => {
                let users = [];
                entries.forEach( (user) => {
                    user = user.toObject();
                    users.push(user);
                });

                // reply with the user profiles
                res.status(200).json({
                    message: 'successfully retrieved users',
                    users: users
                });
            })
            .catch( (err) => {
                return next(err);
            });
    },
    
    getProfile: (req, res, next) => {
        // id is okay
        const targetUserId = req.params.id;

        // look up user in db
        User.findById(targetUserId, {
            password: false,
            createdAt: false,
            updatedAt: false
        })
            .then( (user) => {
                // user does not exist
                if (!user) {
                    return next(createError(404,'user not found'));
                }
                // reply with the user profile
                user = user.toObject();
                res.status(200).json({
                    message: 'successfully retrieved user data',
                    user: user
                });
            })
            .catch( (err) => {
                return next(err);
            });
    },
    
};

module.exports = UserController;
