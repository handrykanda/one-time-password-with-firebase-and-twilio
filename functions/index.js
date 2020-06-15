const functions = require("firebase-functions");

const express = require("express");
const app = express();

const cors = require("cors");
app.use(cors());

const {
  signup,
  requestOneTimePass,
  verifyoneTimePass,
} = require("./handlers/users");
//user routes
app.post("/signup", signup);
app.post("/requestOneTimePass", requestOneTimePass);
app.post("/verifyoneTimePass", verifyoneTimePass);

exports.api = functions.https.onRequest(app);
//+18027274125
