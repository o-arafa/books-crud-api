const Joi = require("joi");

const bookSchema = Joi.object({
  title: Joi.string()
    .min(2)
    .max(100)
    .pattern(/^[\w\s\-',.!?‘’"():&]+$/u)
    .required()
    .messages({
      "string.empty": "Title is required",
      "string.min": "Title should have at least 2 characters",
      "string.pattern.base": "Title must contain at least one letter",
    }),

  author: Joi.string()
    .min(2)
    .max(50)
    .pattern(/[A-Za-z]/)
    .required()
    .messages({
      "string.empty": "Author is required",
      "string.min": "Author should have at least 2 characters",
      "string.pattern.base": "Author must contain at least one letter",
    }),

  publishedDate: Joi.date().iso().max('now').required().messages({
    "date.base": "Published date must be a valid date",
    "date.format": "Published date must be in ISO format (YYYY-MM-DD)",
    "date.max": "Published date cannot be in the future",
    "any.required": "Published date is required",
  }),

  isbn: Joi.string().optional().allow('').pattern(/^(?:ISBN(?:-1[03])?:? )?(?=[0-9X]{10}$|(?=(?:[0-9]+[- ]){3})[- 0-9X]{13}$|97[89][0-9]{10}$|(?=(?:[0-9]+[- ]){4})[- 0-9]{17}$)(?:97[89][- ]?)?[0-9]{1,5}[- ]?[0-9]+[- ]?[0-9]+[- ]?[0-9X]$/).messages({
    "string.pattern.base": "Invalid ISBN format"
  }),

  pages: Joi.number().integer().min(1).max(10000).optional().messages({
    "number.base": "Pages must be a number",
    "number.integer": "Pages must be a whole number",
    "number.min": "Pages must be at least 1",
    "number.max": "Pages cannot exceed 10,000"
  }),

  genre: Joi.string().max(30).optional().allow('').messages({
    "string.max": "Genre cannot exceed 30 characters"
  }),
});

const updateBookSchema = Joi.object({
  title: Joi.string()
    .min(2)
    .max(100)
    .pattern(/^[\w\s\-',.!?‘’"():&]+$/u)
    .messages({
      "string.min": "Title should have at least 2 characters",
      "string.pattern.base": "Title contains invalid characters",
    }),
  author: Joi.string()
    .min(2)
    .max(50)
    .pattern(/[A-Za-z]/)
    .messages({
      "string.min": "Author should have at least 2 characters",
      "string.pattern.base": "Author must contain at least one letter",
    }),
  publishedDate: Joi.date().iso().max('now').messages({
    "date.base": "Published date must be a valid date",
    "date.format": "Published date must be in ISO format (YYYY-MM-DD)",
    "date.max": "Published date cannot be in the future",
  }),

  isbn: Joi.string().optional().allow('').pattern(/^(?:ISBN(?:-1[03])?:? )?(?=[0-9X]{10}$|(?=(?:[0-9]+[- ]){3})[- 0-9X]{13}$|97[89][0-9]{10}$|(?=(?:[0-9]+[- ]){4})[- 0-9]{17}$)(?:97[89][- ]?)?[0-9]{1,5}[- ]?[0-9]+[- ]?[0-9]+[- ]?[0-9X]$/).messages({
    "string.pattern.base": "Invalid ISBN format"
  }),

  pages: Joi.number().integer().min(1).max(10000).optional().messages({
    "number.base": "Pages must be a number",
    "number.integer": "Pages must be a whole number",
    "number.min": "Pages must be at least 1",
    "number.max": "Pages cannot exceed 10,000"
  }),

  genre: Joi.string().max(30).optional().allow('').messages({
    "string.max": "Genre cannot exceed 30 characters"
  }),
});

module.exports = { bookSchema, updateBookSchema };
