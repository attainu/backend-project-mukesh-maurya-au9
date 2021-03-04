const express = require('express');
const path = require('path');
const hbs = require('hbs');
// const db = require('./config/db');
const port = process.env.PORT || 5000;
// const cors = require('cors');
const app = express();
// app.use(cors());

const staticPath = path.join(__dirname, '../public');
const templatesPath = path.join(__dirname, '../templates/views');
const partialPath = path.join(__dirname, '../templates/partials');


app.set("view engine", "hbs");
app.set("views", templatesPath);
hbs.registerPartials(partialPath);

app.use(express.static(staticPath));

//homepage
app.get('/homePage', (req, res) => {
    res.render('navbar', {
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
});

// const AuthController = require('./controller/authcontroller');
// app.use('/api/auth', AuthController);


app.listen(port, () => {
    console.log(`server is running..`);
})
