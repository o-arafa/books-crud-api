const mongoose = require("mongoose");
const Book = require("../models/book.model");
const {
  bookSchema,
  updateBookSchema,
} = require("../validators/book.validator");

const getAllBooks = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    
    // Build filter object
    const filter = {};
    if (req.query.author) {
      filter.author = { $regex: req.query.author, $options: 'i' };
    }
    if (req.query.title) {
      filter.title = { $regex: req.query.title, $options: 'i' };
    }
    if (req.query.genre) {
      filter.genre = { $regex: req.query.genre, $options: 'i' };
    }
    
    // Sorting
    const sortBy = req.query.sortBy || 'createdAt';
    const sortOrder = req.query.sortOrder === 'asc' ? 1 : -1;
    const sort = { [sortBy]: sortOrder };
    
    const books = await Book.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .lean(); // Better performance
    
    const total = await Book.countDocuments(filter);
    const totalPages = Math.ceil(total / limit);
    
    res.status(200).json({
      books,
      pagination: {
        currentPage: page,
        totalPages,
        totalBooks: total,
        hasNext: page < totalPages,
        hasPrev: page > 1
      }
    });
  } catch (err) {
    console.error('Get all books error:', err);
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

const getBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.bookId);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.status(200).json(book);
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

const createBook = async (req, res) => {
  try {
    const newBook = new Book(req.body);
    await newBook.save();
    res.status(201).json(newBook);
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

const updateBook = async (req, res) => {
  try {
    const { bookId } = req.params;

    if (!req.body || Object.keys(req.body).length === 0) {
      return res
        .status(400)
        .json({ message: "You must provide at least one field to update" });
    }

    const updatedBook = await Book.findByIdAndUpdate(bookId, req.body, {
      new: true,
    });

    if (!updatedBook) {
      return res.status(404).json({ message: "Book not found" });
    }

    return res.status(200).json(updatedBook);
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

const deleteBook = async (req, res) => {
  try {
    const deleteBook = await Book.findByIdAndDelete(req.params.bookId);
    if (!deleteBook) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.status(200).json({ message: "Book has been deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

module.exports = {
  getAllBooks,
  getBook,
  createBook,
  updateBook,
  deleteBook,
};
