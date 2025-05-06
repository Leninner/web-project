const mongoose = require('mongoose');

const FavoriteSchema = mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  category: { type: String, required: true },
});

module.exports = mongoose.model('favorite', FavoriteSchema);
