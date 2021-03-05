const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;
const db = require("./Db");
const Auth = require("../controller/AuthController");
const BooksAPI = require("../controller/BooksAPI");
const path = require("path");
const hbs = require("hbs");

app.use(cors());
app.use("/auth", Auth);
app.use("/books", BooksAPI);
app.get("/", (req, res)=>{
  res.status(200).send("<h1>Helth is OK!!</h1>")
})
// app.get("/home", (req, res) => {
//   res.render("home", {
//     title: "BookShelf.com",
//   });
// });
// app.get("/auth/login", (req,res)=>{
//   let alert  = req.query.alert?req.query.alert:"";
//   res.render("login",{alert:alert})
// })
// app.get("/auth/signup", (req,res)=>{
//   let alert  = req.query.alert?req.query.alert:"";
//   res.render("register",{alert:alert})
// })

// static path
const staticPath = path.join(__dirname, "../public");
const templatesPath = path.join(__dirname, "../views/templates");
const partialPath = path.join(__dirname, "../views/partials");
app.set("view engine", "hbs");
app.set("views", templatesPath);
hbs.registerPartials(partialPath);
app.use(express.static(staticPath));

app.listen(port, (err) => {
  if (err) throw err;
  console.log(`Server running at http://localhost:${port}`);
});
