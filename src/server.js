const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

const booksRouter = require("./routes/books.route");

dotenv.config();

const app = express();
const port = process.env.PORT;

// Middlewares
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.send("API is working...");
});

app.use("/api/books", booksRouter);

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

const url = process.env.MONGO_URI;
mongoose
  .connect(url)
  .then(() => console.log("MongoDB connected successfully."))
  .catch((err) => console.error("MongoDB connection error:", err));
