const express = require("express");
// const app = express()
const router = express.Router();
const db = require("../config/Db");
const bodyParser = require("body-parser");
const Books = require("../model/BookSchema");
const path = require("path");
const hbs = require("hbs");

// // static path
// const staticPath = path.join(__dirname, "../public");
// const templatesPath = path.join(__dirname, "../views/templates");
// const partialPath = path.join(__dirname, "../views/partials");
// router.set("view engine", "hbs");
// router.set("views", templatesPath);
// router.registerPartials(partialPath);
// router.use(express.static(staticPath));

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
// Home page
router.get("/home", (req, res) => {
  res.render("home", {
    title: "BookShelf.com",
  });
});

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
router.get("/allbooks", (req, res)=>{
  Books.find({}, (err, data)=>{
    res.status(200).send(data)
  })
})

// Search Latest
router.get("/latest", (req, res)=>{
  Books.find({latest:true}, (err, data)=>{
    if (err) throw err;
    res.status(200).send(data)
  })
})

module.exports = router;
