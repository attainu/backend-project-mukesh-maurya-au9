const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;
const db = require("./Db");
const Auth = require("../controller/AuthController");

app.use(cors());
app.use("/auth", Auth);

app.get("/", (req, res) => {
  res.send("<h1>Helth is OK!!</h1>");
});

app.listen(port, (err) => {
  if (err) throw err;
  console.log("Server running at http://localhost:5000");
});
