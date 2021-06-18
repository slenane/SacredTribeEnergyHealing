// APP SETUP
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const session = require('express-session');
const flash = require('connect-flash');
const ExpressError = require("./utils/ExpressError");
const methodOverride = require('method-override');
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user");
require('dotenv').config();

// ROUTES FILES
const homeRoutes = require("./routes/home");
const userRoutes = require("./routes/users");
const jewelleryRoutes = require("./routes/jewelleries");
const blogRoutes = require("./routes/blogs");
const linkRoutes = require("./routes/links");
const contactRoutes = require("./routes/contact");
const remainingRoutes = require("./routes/routeFile");

// DATABASE SETUP
mongoose.connect("mongodb://localhost:27017/sacred-tribe-energy-healing", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const app = express();

// APP SETTINGS
app.engine('ejs', ejsMate)
app.set("view engine", "ejs");
app.set('views', path.join(__dirname, 'views'))

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

const sessionConfig = {
    secret: 'CarbonaraIsDelicious!',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}

app.use(session(sessionConfig))
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})

// ROUTES
app.use('/', homeRoutes);
app.use('/', userRoutes);
app.use("/jewellery", jewelleryRoutes);
app.use("/blogs", blogRoutes);
app.use("/contact", contactRoutes);
app.use("/links", linkRoutes);
// Remaining routes
app.use("/", remainingRoutes);

// ERROR SETTINGS
app.all("*", (req, res, next) => {
    next(new ExpressError("Page Not Found", 404))
});

app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message) err.message = "Oh no, something went wrong!";
    res.status(statusCode).render("error", { err });
});

// LISTENING
app.listen(3000, () => {
    console.log('Serving on port 3000')
})