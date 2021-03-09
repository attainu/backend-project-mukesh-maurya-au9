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
    var usersName = localStorage.getItem("userData");
    return res.render("BooksUpdate", {
      allBooks: allBooks,
      usersName: usersName,
    });
  });
});
// all books at home
router.get("/libBooks", (req, res) => {
  Books.find({}, (err, allBooks) => {
    if (err) throw err;
    return res.render("Books", { data: allBooks });
  });
});

// search bar
router.get("/search", (req, res) => {
  let searchField = req.query.title;
  Books.find({title: searchField}, (err, data) => {
    console.log(data);
    if(err) throw err;
    res.render('search', {bookInfo: data});
  });
});

// Search Latest
router.get("/latest", (req, res) => {
  Books.find({ latest: true }, (err, data) => {
    if (err) throw err;
    return res.status(200).render("latestBooks", { data: data });
  });
});

router.get("/autocomplete/", (req, res) => {
  var regex = new RegExp(req.query["term"], "i");
  var bookFilter = Books.find({ title: regex }, { title: 1 })
    .sort({ "updated_at": -1 })
    .sort({ "created_at": -1 })
    .limit(10);
  bookFilter.exec(function (err, data) {
    var result = [];
    if (!err) {
      if (data && data.length && data.length > 0) {
        data.forEach((book) => {
          let obj = {
            id: book._id,
            label: book.title
          };

          result.push(obj);
        });
      }
    }
    res.jsonp(result);
    
  });
});
router.get("/description", (req, res) => {
  Books.find({}, (err, data) => {
    if (err) throw err;
    return res.status(200).render("description", {bookFields: data});
  });
});


router.get("/home", (req, res) => {
  res.render("home", {
    title: "BookShelf.com",
  });
});

module.exports = router;
