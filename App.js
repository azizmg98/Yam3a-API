const express = require("express");
const connectDB = require("./DB");
const dotenv = require("dotenv");
const cors = require("cors");
const userRoutes = require("./api/users/userRoutes");
const path = require("path");
dotenv.config();

app = express();
connectDB;

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

// routes

app.use("/api/user", userRoutes);

// image path
app.use("/media", express.static(path.join(__dirname, "media")));
console.log("__dirname", __dirname);

app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}`);
});
