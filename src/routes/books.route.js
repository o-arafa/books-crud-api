const express = require("express");
const router = express.Router();
const booksController = require("../controllers/books.controller");

router.get("/", booksController.getAllBooks);
router.post("/", booksController.createBook);
router.get("/:bookId", booksController.getBook);
router.delete("/:bookId", booksController.deleteBook);

module.exports = router;
