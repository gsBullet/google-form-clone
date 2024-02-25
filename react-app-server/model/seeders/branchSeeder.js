const mongoose = require("mongoose");
const dbConnector = require("../../config/dbConnector");
var bcrypt = require('bcryptjs');
const branchModel = require("../branchModel");

module.exports = () =>
  mongoose.connect(dbConnector).then(async () => {
  
    await branchModel.deleteMany({});
    console.log('branch email creating start');
    for (let index = 0; index < 50; index++) {
      const password = 10000+index;
      const email = 'branch'+index.toString()+'@gmail.com'
     
      console.log(email);
      console.log(password);
      const password2 = await bcrypt.hash(password.toString(), 10);
      await branchModel.create({
        email: email,
        password: password2,
        role: 'branch',
      });
      
      
    }

    console.log("Branch user is created");
  });
