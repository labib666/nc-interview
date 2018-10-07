var mongoose = require('mongoose');  
var timestamps = require('mongoose-timestamp');

var TokenSchema = new mongoose.Schema({  
    Name: String,
    Distance: {}
});

TokenSchema.plugin(timestamps);

module.exports = mongoose.model('Place', TokenSchema, 'places');
