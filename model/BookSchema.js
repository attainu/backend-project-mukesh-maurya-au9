const mongoose = require("mongoose");
const col_books = "books";
const userSchema = new mongoose.Schema({
  name: String,
  author: String,
  // WrittenIn: Number,
  // price: Number,
  // pages: Number,
  // Language: String,
  // origin: String,
  // isActive: Boolean,
    latest: Boolean,
  // category: String,
  // genre: String,
  // image: String,
  // likes: Array,
  rating: Number,
  discription: String,
  image: String
});

mongoose.model(col_books, userSchema);
module.exports = mongoose.model(col_books);
