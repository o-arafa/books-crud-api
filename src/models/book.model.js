const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
    trim: true,
    minlength: [2, "Title must be at least 2 characters long"],
    maxlength: [100, "Title cannot exceed 100 characters"]
  },
  author: {
    type: String,
    required: [true, "Author is required"],
    trim: true,
    minlength: [2, "Author name must be at least 2 characters long"],
    maxlength: [50, "Author name cannot exceed 50 characters"]
  },
  publishedDate: {
    type: Date,
    required: [true, "Published date is required"],
    validate: {
      validator: function(date) {
        return date <= new Date();
      },
      message: "Published date cannot be in the future"
    }
  },
  isbn: {
    type: String,
    unique: true,
    sparse: true, // allows multiple null values
    validate: {
      validator: function(isbn) {
        if (!isbn) return true; // optional field
        return /^(?:ISBN(?:-1[03])?:? )?(?=[0-9X]{10}$|(?=(?:[0-9]+[- ]){3})[- 0-9X]{13}$|97[89][0-9]{10}$|(?=(?:[0-9]+[- ]){4})[- 0-9]{17}$)(?:97[89][- ]?)?[0-9]{1,5}[- ]?[0-9]+[- ]?[0-9]+[- ]?[0-9X]$/.test(isbn);
      },
      message: "Invalid ISBN format"
    }
  },
  pages: {
    type: Number,
    min: [1, "Pages must be at least 1"],
    max: [10000, "Pages cannot exceed 10,000"]
  },
  genre: {
    type: String,
    trim: true,
    maxlength: [30, "Genre cannot exceed 30 characters"]
  }
}, {
  timestamps: true, // adds createdAt and updatedAt automatically
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for book age
bookSchema.virtual('ageInYears').get(function() {
  if (!this.publishedDate) return null;
  const now = new Date();
  const published = new Date(this.publishedDate);
  return Math.floor((now - published) / (365.25 * 24 * 60 * 60 * 1000));
});

// Index for better query performance
bookSchema.index({ title: 1, author: 1 });
bookSchema.index({ publishedDate: -1 });

module.exports = mongoose.model("Book", bookSchema);
