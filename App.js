const express = require("express");
const connectDB = require("./DB");

const dotenv = require("dotenv");
dotenv.config();

const cors = require("cors");
const path = require("path");
const mainRouter = require("./api/mainRouter");

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
app.use("/api", mainRouter);

// image path
app.use("/media", express.static(path.join(__dirname, "media")));
console.log("__dirname", __dirname);

// error handling
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
  });
});

app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}`);
});
