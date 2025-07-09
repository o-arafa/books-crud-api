const Book = require("../models/book.model");

const getAllBooks = async (req, res) => {
  const books = await Book.find();
  res.status(200).json(books);
};

module.exports = {
  getAllBooks,
};
