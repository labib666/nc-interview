var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');

var DriverSchema = new mongoose.Schema({  
    username: {
        type: String
    },
    phone: {
        type: String,
        unique: true,
        dropDups: true
    },
    fair_per_kilo: Number,
    total_kilo_driven: Number,
    Cartype: Number,
    Carnumber: String,
    No_of_passengers: Number,
    CurrentLocation: {
        type: Number
    },
    No_of_times_fined: Number,
    Sum_of_fines: Number,
    Rating: Number
});

DriverSchema.index({
    name: 'text',
    username: 'text',
    email: 'text',
    CurrentLocation: '2dsphere'
});

DriverSchema.plugin(timestamps);

module.exports = mongoose.model('User', DriverSchema, 'users');