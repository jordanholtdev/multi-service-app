const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const requiredString = {
  type: String,
  required: true,
};

const bookSchema = new Schema(
  {
    title: requiredString,
    author: requiredString,
    isbn: requiredString,
    rating: {
      type: Number,
      required: true,
      min: 0,
      max: 5,
    },
    catogoery: requiredString,
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true },
);

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
