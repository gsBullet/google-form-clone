const { default: mongoose } = require("mongoose");

module.exports = mongoose.model(
  "form_models_2024",
  mongoose.Schema({
    document_name: {
      type: String,
      required: true,
    },
    doc_desc: {
      type: String,
      required: true,
    },
    questions: [],
  })
);
