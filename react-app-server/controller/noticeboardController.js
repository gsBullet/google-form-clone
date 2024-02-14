const { json } = require("body-parser");
const formModel = require("../model/formModel");
const noticeboardController = {
  all: async (req, res) => {
    let data = await formModel.find().sort({_id:-1});
    // console.log(data);
    return res.status(200).json(data);
  },
  create: async (req, res) => {
    try {
      const data = req.body;
      let response = await formModel.create({
        document_name: data.document_name,
        doc_desc: data.doc_desc,
        questions: data.question,
      });

      await response.save();
      console.log(response);
      // return res.json(response);
      return res.status(201).json({ message: "Form data saved successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error saving form data" });
    }
  },
  update: (req, res) => {
    res.json("create notice");
  },
  show: async (req, res) => {
    try {
      let data = await formModel.findOne().where({
        _id: req.params.id,
      });
      // console.log(data);
      return res.status(200).json(data);
    } catch (error) {
      console.error("Error retrieving data:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  },
  deleteItem: async(req, res) => {
    let {id} = req.params
    let data = await formModel.deleteOne({
      _id: id
    })
    if(data.deletedCount){
      return res.status(200).json("delete Item");

  }else{
      return res.status(400).json({
          msg:'does not delete Item', data});
  }
    
  },
};
module.exports = noticeboardController;
