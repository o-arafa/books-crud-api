# 📚 Book API

A RESTful API for managing books built with Node.js, Express, and MongoDB.

## 🚀 Features

- ✅ CRUD operations for books
- ✅ Input validation with Joi
- ✅ MongoDB integration with Mongoose
- ✅ Pagination and filtering
- ✅ Search by title, author, or genre
- ✅ Sorting capabilities
- ✅ Error handling and validation
- ✅ ISBN validation
- ✅ CORS support

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

## 🛠️ Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd book-api
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/bookapi
NODE_ENV=development
```

4. Start the server:
```bash
# Development mode
npm run dev

# Production mode
npm start
```

## 📚 API Endpoints

### Base URL: `http://localhost:3000/api/books`

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Get all books with pagination and filtering |
| POST | `/` | Create a new book |
| GET | `/:bookId` | Get a specific book by ID |
| PATCH | `/:bookId` | Update a specific book |
| DELETE | `/:bookId` | Delete a specific book |

## 📖 API Usage Examples

### Get All Books
```bash
GET /api/books

# With pagination
GET /api/books?page=1&limit=5

# With filtering
GET /api/books?author=tolkien&genre=fantasy

# With sorting
GET /api/books?sortBy=publishedDate&sortOrder=desc
```

### Create a Book
```bash
POST /api/books
Content-Type: application/json

{
  "title": "The Lord of the Rings",
  "author": "J.R.R. Tolkien",
  "publishedDate": "1954-07-29",
  "isbn": "978-0544003415",
  "pages": 1216,
  "genre": "Fantasy"
}
```

### Get a Specific Book
```bash
GET /api/books/64f8a1b2c3d4e5f6789012ab
```

### Update a Book
```bash
PATCH /api/books/64f8a1b2c3d4e5f6789012ab
Content-Type: application/json

{
  "pages": 1178,
  "genre": "Epic Fantasy"
}
```

### Delete a Book
```bash
DELETE /api/books/64f8a1b2c3d4e5f6789012ab
```

## 📊 Response Format

### Success Response
```json
{
  "books": [...],
  "pagination": {
    "currentPage": 1,
    "totalPages": 5,
    "totalBooks": 25,
    "hasNext": true,
    "hasPrev": false
  }
}
```

### Error Response
```json
{
  "message": "Error description",
  "error": "Detailed error message (development only)"
}
```

## 🏗️ Project Structure

```
src/
├── controllers/        # Request handlers
│   └── books.controller.js
├── middlewares/        # Custom middleware
│   ├── validateObjectId.js
│   └── validateSchema.js
├── models/            # Database models
│   └── book.model.js
├── routes/            # API routes
│   └── books.route.js
├── validators/        # Input validation schemas
│   └── book.validator.js
└── server.js          # Application entry point
```

## 🔧 Technologies Used

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **Joi** - Input validation
- **dotenv** - Environment variables
- **nodemon** - Development server

## 🚦 Error Handling

The API includes comprehensive error handling for:
- Invalid ObjectId format
- Validation errors
- Database connection errors
- 404 Not Found errors
- 500 Internal Server errors

## 🧪 Testing

To test the API, you can use tools like:
- Postman
- Thunder Client (VS Code extension)
- curl commands
- Any HTTP client

## 🔮 Future Enhancements

- [ ] User authentication and authorization
- [ ] Book categories and tags
- [ ] Book reviews and ratings
- [ ] File upload for book covers
- [ ] Advanced search with full-text search
- [ ] API rate limiting
- [ ] Unit and integration tests
- [ ] API documentation with Swagger

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the ISC License.

---

**Happy coding! 🚀**