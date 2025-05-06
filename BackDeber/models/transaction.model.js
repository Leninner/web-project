const mongoose = require('mongoose');

const TransactionSchema = mongoose.Schema({
  type: { type: String, enum: ['Ingreso', 'Gasto'], required: true },
  amount: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  description: String
});

module.exports = mongoose.model('transaction', TransactionSchema);
