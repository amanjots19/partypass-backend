var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

const Student = new Schema({
  name: String,
  enrollmentNo: String,
  email: String,
  passId: {type:String, required: true},
  number: Number
});

module.exports = mongoose.model('Student', Student)