const express = require('express');
const path = require('path');
const hbs = require('hbs');
const bodyParser = require('body-parser');
const db = require('./config/db');
const port = process.env.PORT || 5000;
const User = require('./model/userSchema');
const app = express();


const staticPath = path.join(__dirname, '../public');
const templatesPath = path.join(__dirname, '../templates/views');
const partialPath = path.join(__dirname, '../templates/partials');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine", "hbs");
app.set("views", templatesPath);
hbs.registerPartials(partialPath);

app.use(express.static(staticPath));

//homepage
app.get('/', (req, res) => {
    res.render('home', {
        title: "BookShelf.com"
    });
});

//login page
app.get('/login', (req, res) => {
    res.render('login', {
        title: "BookShelf.com"
    });
});

//signup page
app.get('/signup', (req, res) => {
    res.render('register', {
        title: "BookShelf.com"
    });

})

//search



app.listen(port, () => {
    console.log(`server is running at ${port}..`);
});
