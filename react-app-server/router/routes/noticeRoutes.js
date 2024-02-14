const express = require("express");
const noticeboardController = require("../../controller/noticeboardController");

const router = express.Router();

router.post(`/create-notice/:id`, noticeboardController.create),
  router.get("/get-notice/:id", noticeboardController.show),
  router.post("/update-notice/:id", noticeboardController.update),
  router.get("/delete-notice/:id", noticeboardController.deleteItem),
  router.get("/all-notice", noticeboardController.all),
  (module.exports = () => router);
