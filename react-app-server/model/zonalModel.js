const mongoose = require("mongoose");

module.exports = mongoose.model(
  "zonal_users",
  mongoose.Schema({
    email: String,
    password: String,
    role: String,
  })
);
