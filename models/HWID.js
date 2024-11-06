const mongoose = require('mongoose');

const hwidSchema = new mongoose.Schema({
  hwid: { type: String, required: true, unique: true }
});

const HWID = mongoose.model('HWID', hwidSchema);
module.exports = HWID;