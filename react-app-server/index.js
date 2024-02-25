const express = require("express");
const server = express();
const port = 5000;

const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const jwt = require("jsonwebtoken");
const formData = require("express-form-data");
const cors = require("cors");

const allRouter = require("./router/allRouter");
const dbConnector = require("./config/dbConnector");

server.use(cors());
server.set("json spaces", 4);
server.use(express.json());
server.use(bodyParser.json());
server.use(formData.parse());
server.use(
  bodyParser.urlencoded({
    extended: false,
  })
);



// routes
server.use(allRouter());

mongoose.connect(dbConnector).then(() => {
  server.listen(port, () => {
    console.log(`app is listening on http://localhost:${port}`);
  });
});

module.exports.server = server;
