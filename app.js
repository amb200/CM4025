var express = require("express"),
    mongoose = require("mongoose"),
    passport = require("passport"),
    bodyParser = require("body-parser"),
    LocalStrategy = require("passport-local")
    passportLocalMongoose = require("passport-local-mongoose")

const User = require("./model/User");
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
var app = express();

mongoose.connect("mongodb://127.0.0.1:27017/lemeow");

// Set up session middleware
const store = new MongoDBStore({
    uri: 'mongodb://127.0.0.1:27017/lemeow',
    collection: 'sessions'
});
app.use(session({
    secret: 'mysecretkey',
    resave: false,
    saveUninitialized: false,
    store: store
}));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(require("express-session")({
    secret: "Rusty is a dog",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//=====================
// ROUTES
//=====================

// Showing home page
app.get("/", function (req, res) {
    res.render("home");
});

// Showing secret page
app.get("/secret", isLoggedIn, function (req, res) {
    res.render("secret");
});

app.use(express.static('public'))

// Showing register form
app.get("/register", function (req, res) {
    res.render("register");
});

// Handling user signup
app.post("/register", async (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    const user = await User.create({
        name: name,
        email: email,
        password: password
    });

    return res.redirect('/');
});

//Showing login form
app.get("/login", function (req, res) {
    res.render("login");
});

//Showing quote form
app.get("/quotePage", function (req, res) {
    res.render("quotePage");
});

//Handling user login
app.post("/login", async function (req, res) {
    try {
        // check if the user exists
        const user = await User.findOne({ email: req.body.email });
        if (user) {
            //check if password matches
            const result = req.body.password === user.password;
            if (result) {
                req.session.userId = user._id;
                res.redirect("/dashboard");
            } else {
                res.status(400).json({ error: "password doesn't match" });
            }
        } else {
            res.status(400).json({ error: "User doesn't exist" });
        }
    } catch (error) {
        res.status(400).json({ error });
    }
});

app.get('/dashboard',async function(req, res){
    const userId = req.session.userId;
  
    // Check if user is authenticated
    if (!userId) {
      // Redirect to login page if user is not authenticated
      res.redirect('/login');
      return;
    }
    // Retrieve user data from database
    const user = await User.findById(userId);
    res.render('dashboard', { user: user });
  });

//Handling user logout
app.get("/logout", function (req, res) {
    req.logout(function (err) {
        if (err) { return next(err); }
        res.redirect('/');
    });
});



function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect("/login");
}

var port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log("Server Has Started!");
});
