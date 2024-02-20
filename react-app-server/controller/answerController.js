const answerModel = require("../model/answerModel");

module.exports = {
  create: async (req, res) => {
    let data = req.body;

    const replay = [];
    data.answers.forEach((element) => {
      replay.push(element[element.length - 1]);
    });
    let resposnse = await answerModel.create({
      document_name: data.document_name,
      doc_desc: data.doc_desc,
      noticeId: req.params.id,
      answers: replay,
    });
    resposnse.save();

    return res.status(201).json("answer inserter successfully");
  },
};
