const express = require("express");
const router = express.Router();
const db = require("../config/Db");
const bodyParser = require("body-parser");
// const Books = require("../model/BookSchema");
const path = require("path");
const hbs = require("hbs");

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.get("/about", (req, res)=>{
    res.render("About")
})

router.get("/dashboard", (req,res)=>{
    res.render("Admin")
})
router.get("/admin", (req,res)=>{
    res.render("Admin")
})

module.exports = router;