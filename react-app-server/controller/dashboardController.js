const userModel = require("../model/userModel");

const dsashboardController = {
  all: async (req, res, next) => {
    const tokenData = req.userData 
    const user = await userModel.findOne().where({
      _id: tokenData._id
    })
    if(user){
      return res.status(200).json({user});

    }
   
  },
};

module.exports = dsashboardController;
