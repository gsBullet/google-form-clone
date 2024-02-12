const mongoose = require("mongoose");

module.exports = mongoose.model(
  "users",
  mongoose.Schema({
    email: String,
    password: String,
    role: String,
  })
);
