const express = require("express");
const mongoos = require("mongoose");
const bcrypt = require("bcryptjs");
const bodyParser = require("body-parser");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../model/UserSchema");
const config = require("../config/Token");
const db = require("../config/Db");

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

// all Users
router.get("/users", (req, res) => {
  User.find({}, (err, allUser) => {
    if (err) throw err;
    return res.status(200).send(allUser);
  });
});

// Sign Up
router.post("/signup", (req, res) => {
  User.findOne({ email: req.body.email }, (err, sameEmail) => {
    if (sameEmail) return res.send("Account already exist. Please Login.");
    else {
      let hashPassword = bcrypt.hashSync(req.body.password, 8);
      let rePassword = bcrypt.hashSync(req.body.password, 8);
      User.create(
        {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          phone: req.body.phone,
          email: req.body.email,
          password: hashPassword,
          rePassword: rePassword,
        },
        (err, userData) => {
          if (err) throw err;
          res
            .status(200)
            .send(
              `You have register successfully. Please Login.\n ${userData}`
            );
        }
      );
    }
  });
});

// Login
router.post("/login", (req, res) => {
  User.findOne({ email: req.body.email }, (err, userData) => {
    if (err)
      return res
        .status(500)
        .send({ auth: false, Error: "Invalid login. Try again." });
    if (!userData)
      return res.status(500).send({
        auth: false,
        Error: "Account not Found. Please Signup first.",
      });
    else {
      var validPassword = bcrypt.compareSync(
        req.body.password,
        userData.password
      );
      if (!validPassword)
        return res.send({
          auth: false,
          Error: "Invalid password!! Try again.",
        });
      var token = jwt.sign({ id: userData._id }, config.secret, {
        expiresIn: 43200,
      });
      res.status(200).send({ auth: true, token });
    }
  });
});

// profile
router.get("/profile", (req, res) => {
  var token = req.headers[(x = access - token)];
  if (!token)
    return res.status(500).send("Token Not found! Please login again.");
  else {
    jwt.verify(token, config.secret, (err, result) => {
      if (err)
        return res.status(500).send({ auth: false, Error: "Invalid token." });
      User.findById(result.id, { password: 0 }, (err, data) => {
        if (err) throw err;
        res.send(data);
      });
    });
  }
});

// Update
router.put("/update", (req, res) => {
  let id = req.body._id;
  User.updateOne(
    { id: ObjectId(id) },
    {
      $set: {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phone: req.body.phone,
        email: req.body.email,
        password: hashPassword,
        rePassword: rePassword,
      },
    },
    (err, updatedData) => {
      if (err)
        return res
          .status(500)
          .send({ Error: "Error update. Please try again." });
      res.status(200).send(`Update success. \n ${updatedData}`);
    }
  );
});
module.exports = router;
