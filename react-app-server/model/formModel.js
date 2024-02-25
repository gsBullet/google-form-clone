const { Timestamp } = require("mongodb");
const { default: mongoose } = require("mongoose");

module.exports = mongoose.model(
  "form_models_2024",
  mongoose.Schema(
    {
      document_name: {
        type: String,
        required: true,
      },
      doc_desc: {
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
      thana: {
        type: Boolean,
        required: false,
      },
      branch: {
        type: Boolean,
        required: false,
      },
      zonal: {
        type: Boolean,
        required: false,
      },
      timeSelect: {
        type: String,
        required: true,
      },

      endDadeline: {
        type: String,
        required: true,
      },
      questions: [],
    },
    { timestamps: true }
  )
);
