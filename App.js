const express = require("express");
const connectDB = require("./DB");
require("dotenv").config;
const cors = require("cors");
const path = require("path");
const userRoutes = require("./api/users/userRoutes");

app = express();
connectDB();

const PORT = process.env.PORT || 5000;

// middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// log url requests
app.use((req, res, next) => {
  console.log(
    `${req.method} ${req.protocol}://${req.get("host")}${req.originalUrl}`
  );
  next();
});

// routes
app.use("/api/users", userRoutes);

// error handling
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
  });
});

app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}`);
});
