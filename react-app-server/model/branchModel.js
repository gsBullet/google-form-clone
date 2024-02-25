const mongoose = require("mongoose");

module.exports = mongoose.model(
  "branch_users",
  mongoose.Schema({
    email: String,
    password: String,
    role: String,
  })
);
