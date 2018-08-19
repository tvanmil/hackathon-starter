//const bcrypt = require('bcrypt-nodejs');
//const crypto = require('crypto');
const mongoose = require('mongoose');

const CaredaySchema = new mongoose.Schema({
  email: String,
  day: Date,
  used: Boolean,
}, { timestamps: true });



const Careday = mongoose.model('Careday', CaredaySchema);

module.exports = Careday;
