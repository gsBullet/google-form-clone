const express = require("express");
const userModel = require("../../model/userModel");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const authController = require("../../controller/authController");
const authMiddleware = require("../../middleware/authMiddleware");

// router.get("/login", (req, res, next) => {
//     res.json("login");
//   });

router.post(
  "/submit",
  [
    body("email")
      .not()
      .isEmpty()
      .withMessage("Email is empty")
      .normalizeEmail()
      .custom(async (value) => {
        let user = await userModel.findOne({ email: value });
        if (!user) {
          return Promise.reject("email not fouds");
        }
      }),
    body("password").not().isEmpty().withMessage("password is empty"),
  ],
  authController.form_submit
);
router.use(authMiddleware);
router.get('/check-user',authController.check);
router.get("/logout", authController.logout);



module.exports = () => router;
