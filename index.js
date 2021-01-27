// APP SETUP
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const Treatment = require("./models/treatment");
const Jewellery = require("./models/jewellery");
const Blog = require("./models/blog");

// DATABASE SETUP
mongoose.connect("mongodb://localhost:27017/sacred-tribe-energy-healing", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const app = express();

// APP SETTINGS
app.set("view engine", "ejs");
app.set('views', path.join(__dirname, 'views'))

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

// ROUTES
app.get('/', (req, res) => {
    res.render('home')
});

// TREATMENT ROUTES
// INDEX
app.get("/treatments", (req, res) => {
    res.render("treatments/index");
});

// SHOW - ENERGY TREATMENT
app.get("/treatments/energy-treatment", (req, res) => {
    res.render("treatments/energy-treatment/show");
});

// SHOW - ABSENTEE TREATMENT
app.get("/treatments/absentee-treatment", (req, res) => {
    res.render("treatments/absentee-treatment/show");
});


// JEWELLERY ROUTES
// INDEX
app.get("/jewellery", async (req, res) => {
    const jewelleries = await Jewellery.find({}) || [];
    res.render("jewellery/index", { jewelleries });
});

// SHOW
app.get('/jewellery/:id', async (req, res,) => {
    const jewellery = await Jewellery.findById(req.params.id)
    res.render('jewellery/show', { jewellery });
});


// BLOG ROUTES
// INDEX
app.get("/blogs", async (req, res) => {
    const blogs = await Blog.find({}) || [];
    res.render("blogs/index", { blogs });
});

// SHOW
app.get('/blogs/:id', async (req, res,) => {
    const blog = await Blog.findById(req.params.id)
    res.render('blogs/show', { blog });
});

// AWARENESS ROUTE
app.get("/awareness", (req, res) => {
    res.render("awareness/index");
});

// ABOUT ROUTE
app.get("/about", (req, res) => {
    res.render("about/index");
});

// CONTACT ROUTE
app.get("/contact", (req, res) => {
    res.render("contact/index");
});

// LISTENING
app.listen(3000, () => {
    console.log('Serving on port 3000')
})