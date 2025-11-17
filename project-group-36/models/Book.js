const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: String,
  borrower: String,          // can be email, name, or both
  due: String,               // Store as String for simplicity
  genre: String,
  borrowerEmail: String,
  notes: String
});

module.exports = mongoose.model('Book', bookSchema);
