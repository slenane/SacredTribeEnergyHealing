// APP SETUP
require('dotenv').config();
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
const url = require('url');
const shopify = require("./shopify");

// ROUTES FILES
const blogRouter = require("./routes/blogs");
// const contactRouter = require("./routes/contact");
const indexRouter = require("./routes/index");
const jewelleryRouter = require("./routes/jewellery");
const linkRouter = require("./routes/links");
const treatmentRouter = require("./routes/treatments");
const userRouter = require("./routes/users");

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
    secret: process.env.SESSION_SECRET,
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

app.use(async (req, res, next) => {
    // Show the cart on page load if query.cart is set to true
    res.locals.showCart = url.parse(req.url, true).query.cart === 'true' ? true : false;
    // Load the cart on every page
    res.locals.cart = await shopify.getCart(req.session) || {};
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
});

// ROUTES
app.use('/', indexRouter);
app.use('/', userRouter);
app.use("/blogs", blogRouter);
// app.use("/contact", contactRouter);
app.use("/jewellery", jewelleryRouter);
app.use("/links", linkRouter);
app.use("/treatments", treatmentRouter);

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