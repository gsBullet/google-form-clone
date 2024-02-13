const { json } = require("body-parser");
const formModel = require("../model/formModel");
const noticeboardController = {
  all: async (req, res, next) => {
    let data = await formModel.find();
    return res.status(200).json(data);
  },
  create: async (req, res, next) => {
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
  update: (req, res, next) => {
    res.json("create notice");
  },
  show:async (req, res, next) => {
    const {id} = req.params.id
  let data = await formModel.findOne({id})
  // console.log(data);
  return res.status(201).json(data)
  },
  delete: (req, res, next) => {
    res.json("create notice");
  },
};
module.exports = noticeboardController;
