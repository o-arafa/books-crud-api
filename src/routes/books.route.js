const express = require("express");
const router = express.Router();
const booksController = require("../controllers/books.controller");
const validateSchema = require("../middlewares/validateSchema");
const validateObjectId = require("../middlewares/validateObjectId");
const {
  bookSchema,
  updateBookSchema,
} = require("../validators/book.validator");

router.get("/", booksController.getAllBooks);
router.post("/", validateSchema(bookSchema), booksController.createBook);
router.get("/:bookId", validateObjectId("bookId"), booksController.getBook);
router.patch(
  "/:bookId",
  validateObjectId("bookId"),
  validateSchema(updateBookSchema),
  booksController.updateBook
);
router.delete(
  "/:bookId",
  validateObjectId("bookId"),
  booksController.deleteBook
);

module.exports = router;
