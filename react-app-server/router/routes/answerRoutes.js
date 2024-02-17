const express = require("express");
const answerController = require("../../controller/answerController");
const router = express.Router();

router.post(`/create-answer/:id`, answerController.create),
  // router.get("/get-answer/:id", answerController.show),
  // router.post("/update-answer/:id", answerController.update),
  // router.get("/delete-answer/:id", answerController.deleteItem),
  // router.get("/all-answer", answerController.all),
  (module.exports = () => router);
