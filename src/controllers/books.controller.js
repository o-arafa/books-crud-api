const mongoose = require("mongoose");
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

const getBook = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.bookId)) {
      return res.status(400).json({ message: "Invalid book ID" });
    }
    const book = await Book.findById(req.params.bookId);
    if (!book) {
      return res.status(404).json({ message: "book not found" });
    }
    res.status(200).json(book);
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

const deleteBook = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.bookId)) {
      return res.status(400).json({ message: "Invalid book ID" });
    }
    const deleteBook = await Book.findByIdAndDelete(req.params.bookId);
    if (!deleteBook) {
      return res.status(404).json({ message: "book not found" });
    }
    res.status(200).json({ message: "book has deleted" });
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
  getBook,
  createBook,
  deleteBook,
};
