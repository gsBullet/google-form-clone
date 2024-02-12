const { body, validationResult } = require("express-validator");
const userModel = require("../model/userModel");
var bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = {
  form_submit: async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    let user = await userModel.findOne({ email });
    if (user) {
      const pass = await bcrypt.compare(password, user.password);
      if (pass) {
        const { email, password, _id } = user;
        let token = jwt.sign(
          { email, password, _id },
          "3e9b2825-cfe3-422e-8177-bac1b129a320"
        );
        return res.status(200).json({ email, token });
      } else {
        let errors = {
          errors: [
            {
              path: "password",
              msg: "password does not match",
            },
          ],
          msg: "validation Error",
        };

        return res.status(422).json(errors);
      }
    } else {
      return res.status(404).json("user not found");
    }
  },
  check: async (req, res, next) => {
    // console.log(req);
    const id = req.userData._id;
    // console.log(id);
    const user = await userModel.findOne().where({
      _id: id,
    });
    if (user) {
      return res.status(200).json(user);
    } else {
      console.log("authorized fails");
    }
  },
  logout: async (req, res, next) => {
    req.isAuth = false;
    window.localStorage.removeItem("gsmToken");
    return res.render("/");
  },
};
