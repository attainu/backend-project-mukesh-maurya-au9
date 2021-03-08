const express = require("express");
// const app = express()
const router = express.Router();
const db = require("../config/Db");
const bodyParser = require("body-parser");
const Books = require("../model/BookSchema");
const path = require("path");
const hbs = require("hbs");

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

// Search by Query
router.get("/category/:id", (req, res) => {
  let query = req.body.param;
  if (query) {
    books = Books.find({ category: query }, (err, data) => {
      if (err) {
        return res.send("Books Not Found");
      }
      res.status(200).send(data);
    });
  }
  res.redirect("/recommanded");
});

// Search All Books
router.get("/allbooks", (req, res) => {
  Books.find({}, (err, allBooks) => {
    if (err) throw err;
    var usersName = localStorage.getItem("userData")
    return res.render("BooksUpdate", { allBooks: allBooks, usersName:usersName})
  });
});
// all books at home
router.get("/libBooks", (req, res) => {
  Books.find({}, (err, allBooks) => {
    if (err) throw err;
    return res.render("Books", {data:allBooks})
  });
});

// search bar
router.get("/searchBooks/:title", (req, res) => {
  let query = req.query.params ? req.query.params : "The Holy Bible";
  Books.find({ title: query }, (err, data) => {
    return res.status(200).send(data);
  });
});

// Search Latest
router.get("/latest", (req, res) => {
  Books.find({ latest: true }, (err, data) => {
    if (err) throw err;
    console.log(data)
    return res.status(200).render("latestBooks", {data:data});
  });
});

module.exports = router;
