const mongoose = require('mongoose');

const OfferSchema = mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  discount: Number,
  startDate: Date,
  endDate: Date
});

module.exports = mongoose.model('offer', OfferSchema);
