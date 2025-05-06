const mongoose = require('mongoose');

const SellerSchema = mongoose.Schema({
  dni: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String },
  phone: { type: String },
  creationDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('seller', SellerSchema);
