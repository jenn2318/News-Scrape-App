const articleController = require('../controllers/articleController.js');
const router = require('express').Router();

router.get("/scrape", (req, res, next) => {
    articleController.scrapeWebsite(req, res, next);
});

router.get("/", (req, res) => {
    articleController.renderHome(req, res);
});

router.post('/save', (req, res) => {
    articleController.saveArticle(req, res);
});

router.post('/unsave', (req, res) => {
    articleController.unsaveArticle(req, res);
});

router.get("/saved", (req, res) => {
    articleController.viewSaved(req, res);
});

// To get an article by it's ObjectId
router.get("/articles/:id", function(req, res) {
    // Here is the id passed in as an id parameter, this will make a query that finds the matching one in our db...
    Models.findOne({ "_id": req.params.id })
    // populate all of the comments
        .populate("comment")
        // do the query
        .exec(function(error, doc) {
            // show any errors
            if (error) {
                console.log(error);
            }
            // Otherwise, send this back to DOM as a json object
            else {
                res.json(doc);
            }
        });
});


module.exports = router;