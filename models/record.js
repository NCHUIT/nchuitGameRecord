var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var Record = new Schema({
  name: String,
  time: Number,
  text: String
})

module.exports = mongoose.model('Record', Record);
