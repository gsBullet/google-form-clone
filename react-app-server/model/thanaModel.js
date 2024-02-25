const mongoose = require("mongoose");

module.exports = mongoose.model(
  "thana_users",
  mongoose.Schema({
    email: String,
    password: String,
    role: String,
  })
);
