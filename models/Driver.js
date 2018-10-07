var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');

var DriverSchema = new mongoose.Schema({  
    name: String,
    username: {
        type: String,
        unique: true,
        dropDups: true
    },
    email: {
        type: String,
        unique: true,
        dropDups: true
    },
    password: String
});

DriverSchema.index({
    name: 'text',
    username: 'text',
    email: 'text'
});

DriverSchema.plugin(timestamps);

module.exports = mongoose.model('User', DriverSchema, 'users');