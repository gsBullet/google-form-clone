const mongoose = require("mongoose");
const dbConnector = require("../../config/dbConnector");

const bcrypt = require('bcrypt');
const thanaModel = require("../thanaModel");

module.exports = () =>
  mongoose.connect(dbConnector).then(async () => {
    await thanaModel.deleteMany({});
    console.log('thana user start ');
    for (let index = 0; index < 100; index++) {
      const password = 10000 + index;
      const email = 'user'+index.toString()+'@gmail.com'
      const password2 = await bcrypt.hash(password.toString(),10);
      console.log(password);
      console.log(email);
      await thanaModel.create({
        email: email,
        password: password2,
        role: 'thana',
      });
    }

    console.log("Thana user is created");
  });
