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

  publishedDate: Joi.date().iso().required().messages({
    "date.base": "Published date must be a valid date",
    "date.format": "Published date must be in ISO format (YYYY-MM-DD)",
    "any.required": "Published date is required",
  }),
});

module.exports = { bookSchema };
