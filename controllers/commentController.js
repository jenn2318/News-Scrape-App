const router = require('express').Router();
const Models = require('../models');

//Scraping tools
const request = require("request");
const cheerio = require("cheerio");



module.exports = {
    addComment: (req, res) => {
        // Create a new comment or replace an existing comment
        // router.post("/articles/:id", function(req, res) {
        // Create a new comment and pass in the req.body
        console.log(req.body)
        let newComment = new Models.Comment(req.body);

        newComment.save(function (error, doc) {
            if (error) { console.log(error); }
            else {
                // Use the article id to find and update it's comment
                Models.Article.findOneAndUpdate({ "_id": req.params.id }, {$push:{ "comment": doc._id }})
                    .exec(function (err, doc) {
                        if (err) {
                            console.log(err);
                        } else {
                            res.redirect('../../saved');
                        }
                    });
            }
        });
    },
    removeComment: (req, res) => {
        console.log(req.body)
        Models.Comment.remove({ "_id": req.params.id }, (error, doc) => res.redirect('../../saved'));
    },
};