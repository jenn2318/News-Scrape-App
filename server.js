// Dependencies
const express = require("express");
const bodyParser = require("body-parser");
const cheerio = require("cheerio");
const request = require("request");
const mongoose = require("mongoose");
const exphbs = require('express-handlebars');
const app = express();


const PORT = process.env.PORT || 3000;
// Set mongoose to leverage built in JavaScript ES6 Promises
mongoose.Promise = Promise;

// Database configuration with mongoose
let MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";
let db = mongoose.connection;

// Usen body-parser with this app
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static("public"));


//Import the routes and let the server access them.
let router = require('./controllers/articleController.js');
//let routes = require('./controllers/commentController.js');
app.use('/', router);

// Show any mongoose errors
db.on("error", (error) => {
    console.log("Mongoose Error:", error);
});

// Once logged in to the db through mongoose, log a success message
db.once("open", () => {
    console.log("Mongoose connection successful.");
});

//Set template engine
app.engine(
    "handlebars",
    exphbs(
        { defaultLayout: "main" }
    )
);
app.set("view engine", "handlebars");

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`);
});