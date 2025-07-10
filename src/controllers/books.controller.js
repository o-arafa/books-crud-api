const Book = require("../models/book.model");
const { bookSchema } = require("../validators/book.validator");

const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

const createBook = async (req, res) => {
  try {
    const { error } = bookSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const newBook = new Book(req.body);
    await newBook.save();
    res.status(201).json({ newBook });
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

module.exports = {
  getAllBooks,
  createBook,
};
