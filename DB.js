const mongoose = require("mongoose");
const dotenv = require('dotenv')

dotenv.config()
const PASSWORD = process.env.PASSWORD
const DATABASE = process.env.DATABASE

const connectDB = async () => {
  const conn = await mongoose.connect(
    `mongodb+srv://AzizMG:${PASSWORD}@cluster0.esh0o.mongodb.net/${DATABASE}?retryWrites=true&w=majority`,
    {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    }
  );
  console.log(`mongo connected: ${conn.connection.host}`);
};
module.exports = connectDB;
