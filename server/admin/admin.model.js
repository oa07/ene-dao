const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
  homeAddress: String,
  flatNo: String,
  identifier: String,
});

exports.locationModel = mongoose.model('location', locationSchema);
