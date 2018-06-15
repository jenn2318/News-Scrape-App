const router = require('express').Router();
const Models = require('../models/article');

//Scraping tools
const request = require("request");
const cheerio = require("cheerio");


module.exports = {
    scrapeWebsite: (req, res, next) => {
        request({
            url: "http://www.miamiherald.com/news/",}, (error, response, html) => {

            // Load the content for cheerio
            let $ = cheerio.load(html);
            console.log(html);
            $("div.h4.headline").each(function(i, element) {

                const result = {};
                result.title = $(this).children("h4.title").text().trim();
                result.summary = $(this).children("p.summary").text().trim();
                result.link = 'http://www.miamiherald.com' + $(this).find("h2.headline a").attr("href");


                // Using our article model this will create a new entry
                // Here we pass the result object to the entry and the title and link
                const entry = new Models.Article(result);

                // Now, save that entry to the db
                entry.save((err, doc) => {
                    console.log(err ? err : doc);
                });
            });
        });


        res.send('scrape complete');
    },

    renderHome: (req, res) => {
        console.log('renderHome');
        Models.find({}, (error, article) => {
            error ? console.log(error) : res.render('../views/index', {article});
        });
    },

    saveArticle: (req, res) => {
        Models.Article.findOneAndUpdate({"_id": (req.body._id)}, {saved: true},
            (error) => {
                error ? console.log(error) : res.redirect('back');
            });
    },

    unsaveArticle: (req, res) => {
        Models.Article.findOneAndUpdate({"_id": (req.body._id)}, {saved: false},
            (error) => {
                error ? console.log(error) : res.redirect('back');
            });
    },

    viewSaved:  (req, res) => {
        Models.Article.find({saved: true}).sort({updatedAt: -1}).populate("comment").exec((error, article) => {
            error ? console.log(error) : res.render('../views/saved', {article})
        });
    },

}


