const { Timestamp } = require("mongodb");
const { default: mongoose } = require("mongoose");

module.exports = mongoose.model(
  "form_models_2024",
  mongoose.Schema({
    document_name: {
      type: String,
      required: true,
    },
    range: {
      type: String,
      required: true,
    },
    startDadeline: {
      type: String,
      required: true,
    },

    endDadeline: {
      type: String,
      required: true,
    },
    questions: [],
  },{timestamps:true})
);
