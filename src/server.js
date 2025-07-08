const express = require("express");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middlewares
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.send("API is working...");
});

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
