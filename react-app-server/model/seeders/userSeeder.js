const mongoose = require("mongoose");
const dbConnector = require("../../config/dbConnector");
var bcrypt = require('bcryptjs');
const userModel = require("../userModel");

module.exports = () =>
  mongoose.connect(dbConnector).then(async () => {
    const email1 = "my@gamil.com";
    const password1 = "1122";
    const password2 = await bcrypt.hash(password1, 10);
    const userRole = "admin";
    await userModel.deleteMany({});
    await userModel.create({
      email: email1,
      password: password2,
      role: userRole,
    });

    console.log("user is created");
  });
