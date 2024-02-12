const { json } = require("body-parser");

const noticeboardController = {
  all: (req, res, next) => {
    res.json("create notice");
  },
  create: (req, res, next) => {
    
    console.log(req.body);
    return res.json(req.body);
  },
  update: (req, res, next) => {
    res.json("create notice");
  },
  show: (req, res, next) => {
    res.json("create notice");
  },
  delete: (req, res, next) => {
    res.json("create notice");
  },
};
module.exports = noticeboardController;
