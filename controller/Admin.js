const express = require("express");
const router = express.Router();
const db = require("../config/Db");
const bodyParser = require("body-parser");
const Books = require("../model/BookSchema");
const User = require("../model/UserSchema");
const Order = require("../model/OrderSchema");
const path = require("path");
const hbs = require("hbs");

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.get("/about", (req, res) => {
  res.render("About");
});

// http://localhost:5000/admin/dashboard
router.get("/dashboard", (req, res) => {
  var userName = localStorage.getItem("userData")
  Order.countDocuments({ isActive: true }, (err, count) => {
    return res.render("dashboard", {count: (+ count)});
  });
});
// http://localhost:5000/admin/allUsers
router.get("/allUsers", (req, res) => {
  let token = localStorage.getItem("token");
  let userData = localStorage.getItem("userData");
  let errMessage = req.query.errMessage ? req.query.errMessage : "";
  if (!token) {
    return res.send({ errMessage: "No session found" });
  }
  User.find({}, (err, data) => {
    if (err) throw err;
    return res.render("Users", {
      userRecord: data,
    });
  });
});

router.get("/books", (req, res) => {
  Books.find({}, (err, data) => {
    res.send(data);
  });
});
// getting All Orders
router.get("/allorders", (req, res) => {
  Order.countDocuments({ isActive: true }, (err, count) => {
    return res.status(200).send("Total order   is " + count);
  });
});

module.exports = router;
