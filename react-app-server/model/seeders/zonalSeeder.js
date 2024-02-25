const mongoose = require("mongoose");
const dbConnector = require("../../config/dbConnector");
var bcrypt = require('bcryptjs');
const zonalModel = require("../zonalModel");

module.exports = () =>
  mongoose.connect(dbConnector).then(async () => {
  
    await zonalModel.deleteMany({});
    for (let index = 0; index < 14; index++) {
      const password = 10000+index
      const email = 'zonal'+index.toString()+'@gmail.com'
      console.log(email);
      console.log(password);
      const password2 = await bcrypt.hash(password.toString(), 10);
      await zonalModel.create({
        email: email,
        password: password2,
        role: 'Zonal',
      });
      
    }

    console.log("Zonal user is created");
  });
